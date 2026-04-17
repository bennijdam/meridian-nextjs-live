/**
 * POST /api/stripe/webhook
 *
 * Stripe will hit this endpoint whenever a payment succeeds, a subscription
 * is created/updated/cancelled, or an invoice fails. We verify the signature,
 * then update our local DB.
 *
 * IMPORTANT: this route reads the raw body for signature verification. Don't
 * use req.json() — it eats the raw body and breaks the HMAC check.
 *
 * Local testing:
 *   stripe listen --forward-to localhost:3000/api/stripe/webhook
 *   stripe trigger checkout.session.completed
 */

import type Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { verifyWebhook } from '@/lib/stripe';
import { db, hasDatabase, leads, payments, subscriptions } from '@/lib/db';
import { notifySlackOfLead } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 });

  const rawBody = await req.text();

  let event;
  try {
    event = verifyWebhook(rawBody, sig);
  } catch (err) {
    console.error('[stripe/webhook] signature failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    if (!hasDatabase) {
      console.info(`[stripe/webhook] Local demo mode — skipping DB writes for ${event.type}`);
      return NextResponse.json({ received: true, localDemo: true });
    }

    switch (event.type) {
      // ===== Checkout completed =====
      case 'checkout.session.completed': {
        const s = event.data.object as Stripe.Checkout.Session;
        console.log(`✓ Checkout completed: ${s.id} — ${s.customer_email} — ${s.metadata?.productLabel}`);

        if (s.customer_email) {
          await db.insert(leads).values({
            email: s.customer_email,
            source: 'stripe_checkout',
            metadata: {
              sessionId: s.id,
              customerId: typeof s.customer === 'string' ? s.customer : s.customer?.id ?? null,
              subscriptionId: typeof s.subscription === 'string' ? s.subscription : s.subscription?.id ?? null,
              amountTotal: s.amount_total,
              currency: s.currency,
              productId: s.metadata?.productId ?? null,
              productKind: s.metadata?.productKind ?? null,
              productLabel: s.metadata?.productLabel ?? null,
              ip: s.metadata?.ip ?? null,
            },
          });

          await db.insert(payments).values({
            stripePaymentIntentId: typeof s.payment_intent === 'string' ? s.payment_intent : s.payment_intent?.id ?? null,
            stripeSessionId: s.id,
            stripeCustomerId: typeof s.customer === 'string' ? s.customer : s.customer?.id ?? null,
            email: s.customer_email,
            amount: s.amount_total ?? 0,
            currency: s.currency ?? 'gbp',
            status: s.payment_status ?? 'completed',
            productId: s.metadata?.productId ?? null,
            productKind: s.metadata?.productKind ?? null,
            metadata: s.metadata ?? {},
          });

          await notifySlackOfLead({
            email: s.customer_email,
            url: '',
            industry: s.metadata?.productLabel ?? '',
            source: `🎉 PAID: ${s.metadata?.productLabel ?? s.metadata?.productId ?? 'Meridian order'} — £${(s.amount_total ?? 0) / 100}`,
          }).catch(() => null);

          // Fire-and-forget HubSpot sync: upsert contact, create deal at
          // `contractsent` stage with the Stripe amount (in GBP), and log
          // a "Completed checkout" timeline event.
          import('@/lib/hubspot').then(async ({ syncLeadToHubSpot, logTimelineEvent }) => {
            const amountGbp = (s.amount_total ?? 0) / 100;
            await syncLeadToHubSpot({
              email: s.customer_email!,
              source: 'pricing_checkout',
              createDeal: true,
              dealAmount: amountGbp,
              metadata: {
                sessionId: s.id,
                productId: s.metadata?.productId ?? null,
                productKind: s.metadata?.productKind ?? null,
                productLabel: s.metadata?.productLabel ?? null,
                currency: s.currency ?? 'gbp',
              },
            });
            await logTimelineEvent({
              contactEmail: s.customer_email!,
              eventType: 'Completed checkout',
              details: {
                sessionId: s.id,
                productLabel: s.metadata?.productLabel ?? null,
                amountGbp,
                currency: s.currency ?? 'gbp',
              },
            });
          }).catch((err) => console.error('[stripe/webhook] HubSpot sync failed:', err));
        }
        break;
      }

      // ===== Subscription lifecycle =====
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        console.log(`Subscription ${event.type.split('.').pop()}: ${sub.id} — status=${sub.status}`);

        await db.insert(subscriptions).values({
          stripeSubscriptionId: sub.id,
          stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : sub.customer?.id ?? 'unknown',
          stripePriceId: sub.items?.data?.[0]?.price?.id ?? 'unknown',
          productId: sub.metadata?.productId ?? null,
          email: sub.metadata?.email || 'unknown@stripe.local',
          status: sub.status,
          billingPeriod: sub.metadata?.period || (sub.items?.data?.[0]?.price?.recurring?.interval === 'year' ? 'annual' : 'monthly'),
          currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
          cancelAtPeriodEnd: String(Boolean(sub.cancel_at_period_end)),
          metadata: sub.metadata ?? {},
        }).onConflictDoUpdate({
          target: subscriptions.stripeSubscriptionId,
          set: {
            stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : sub.customer?.id ?? 'unknown',
            stripePriceId: sub.items?.data?.[0]?.price?.id ?? 'unknown',
            productId: sub.metadata?.productId ?? null,
            email: sub.metadata?.email || 'unknown@stripe.local',
            status: sub.status,
            billingPeriod: sub.metadata?.period || (sub.items?.data?.[0]?.price?.recurring?.interval === 'year' ? 'annual' : 'monthly'),
            currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
            cancelAtPeriodEnd: String(Boolean(sub.cancel_at_period_end)),
            metadata: sub.metadata ?? {},
            updatedAt: new Date(),
          },
        });
        break;
      }

      // ===== Invoice events (renewals, failures) =====
      case 'invoice.payment_succeeded': {
        const inv = event.data.object as Stripe.Invoice;
        console.log(`✓ Invoice paid: ${inv.id} — £${(inv.amount_paid ?? 0) / 100}`);
        await db.insert(payments).values({
          stripePaymentIntentId: typeof inv.payment_intent === 'string' ? inv.payment_intent : inv.payment_intent?.id ?? null,
          stripeInvoiceId: inv.id,
          stripeCustomerId: typeof inv.customer === 'string' ? inv.customer : inv.customer?.id ?? null,
          email: inv.customer_email ?? null,
          amount: inv.amount_paid ?? inv.amount_due ?? 0,
          currency: inv.currency ?? 'gbp',
          status: 'succeeded',
          productId: inv.metadata?.productId ?? null,
          productKind: inv.subscription ? 'retainer' : 'project',
          metadata: inv.metadata ?? {},
        });
        break;
      }

      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice;
        console.warn(`✗ Invoice failed: ${inv.id} — ${inv.customer_email}`);
        await db.insert(payments).values({
          stripePaymentIntentId: typeof inv.payment_intent === 'string' ? inv.payment_intent : inv.payment_intent?.id ?? null,
          stripeInvoiceId: inv.id,
          stripeCustomerId: typeof inv.customer === 'string' ? inv.customer : inv.customer?.id ?? null,
          email: inv.customer_email ?? null,
          amount: inv.amount_due ?? 0,
          currency: inv.currency ?? 'gbp',
          status: 'failed',
          productId: inv.metadata?.productId ?? null,
          productKind: inv.subscription ? 'retainer' : 'project',
          metadata: inv.metadata ?? {},
        });
        break;
      }

      default:
        // Stripe sends many events we don't care about — silently acknowledge
        break;
    }
  } catch (err) {
    console.error(`[stripe/webhook] handler failed for ${event.type}:`, err);
    // Return 500 so Stripe retries — IF the failure was transient.
    // For business-logic failures, return 200 so it doesn't retry forever.
    return NextResponse.json({ received: true, error: 'handler_failed' }, { status: 200 });
  }

  return NextResponse.json({ received: true });
}
