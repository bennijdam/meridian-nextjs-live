/**
 * Stripe integration — shared helpers.
 *
 * Setup steps (full instructions in CODEX.md §12):
 *   1. Create account at stripe.com, switch to Live mode when ready
 *   2. Create the Products + Prices in Stripe dashboard:
 *      - Subscriptions: each Retainer × 3 periods (PAYG / Monthly / Annual)
 *      - One-time: each Project from lib/pricing.ts
 *   3. For each Stripe Price ID, set the matching env var (see lib/pricing.ts)
 *      e.g. STRIPE_PRICE_SEO_GROWTH_MONTHLY=price_1Abc...
 *   4. Add STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
 *      STRIPE_WEBHOOK_SECRET to .env.local + Vercel env
 *   5. In Stripe dashboard → Webhooks → add endpoint
 *      https://your-domain.com/api/stripe/webhook
 *      Subscribe to: checkout.session.completed,
 *                    customer.subscription.created/updated/deleted,
 *                    invoice.payment_failed, invoice.payment_succeeded
 */

import Stripe from 'stripe';
import { getProject, getRetainer, resolveStripePriceEnv, type ProductKind, type Period } from './pricing';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('[stripe] STRIPE_SECRET_KEY not set — checkout will fail until configured.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_PLACEHOLDER', {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
  appInfo: {
    name: 'Meridian London',
    version: '1.0.0',
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
});

export const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

/**
 * Create a Stripe Checkout session.
 *
 * Resolves productId + kind + period → Stripe Price ID via env var lookup,
 * then constructs the appropriate session (subscription or one-time payment).
 */
export async function createCheckoutSession(args: {
  productId: string;
  productKind: ProductKind;
  period?: Period;
  email?: string;
  metadata?: Record<string, string>;
  successUrl?: string;
  cancelUrl?: string;
}) {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meridianweb.co.uk';
  const success = args.successUrl || `${SITE}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancel  = args.cancelUrl  || `${SITE}/pricing?cancelled=1`;

  // Resolve Stripe Price ID via env-var indirection
  const priceEnvName = resolveStripePriceEnv(args.productId, args.productKind, args.period);
  if (!priceEnvName) {
    throw new Error(`Unknown product: ${args.productKind}/${args.productId}`);
  }
  const priceId = process.env[priceEnvName];
  if (!priceId || priceId === 'price_xxx') {
    throw new Error(`Stripe price not configured: ${priceEnvName}. Add the real Stripe Price ID to env.`);
  }

  const product = args.productKind === 'retainer'
    ? getRetainer(args.productId)
    : getProject(args.productId);
  const productLabel = product
    ? `${product.serviceName} ${product.tierName}`.trim()
    : args.productId;

  // Subscription mode for retainers (any period); payment mode for projects
  const mode: Stripe.Checkout.SessionCreateParams.Mode =
    args.productKind === 'retainer' ? 'subscription' : 'payment';

  const params: Stripe.Checkout.SessionCreateParams = {
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: success,
    cancel_url:  cancel,
    customer_email: args.email,
    metadata: {
      productId: args.productId,
      productKind: args.productKind,
      productLabel,
      period: args.period || 'oneoff',
      ...args.metadata,
    },
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    automatic_tax: { enabled: true }, // requires tax setup in Stripe dashboard
  };

  if (mode === 'subscription') {
    params.subscription_data = {
      metadata: {
        productId: args.productId,
        productKind: args.productKind,
        productLabel,
        period: args.period || 'monthly',
        email: args.email || '',
      },
      trial_period_days: 0,
    };
  } else {
    params.invoice_creation = { enabled: true };
  }

  return stripe.checkout.sessions.create(params);
}

/**
 * Create a Stripe Billing Portal session so customers can manage their
 * subscription (upgrade / downgrade / cancel / update card / view invoices).
 *
 * Accepts either a customer ID string or an args object — for compatibility
 * with both `createPortalSession(custId)` and `createPortalSession({customerId})`.
 */
export async function createPortalSession(
  argsOrCustomerId: string | { customerId: string; returnUrl?: string }
) {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meridianweb.co.uk';
  const args = typeof argsOrCustomerId === 'string'
    ? { customerId: argsOrCustomerId }
    : argsOrCustomerId;
  return stripe.billingPortal.sessions.create({
    customer: args.customerId,
    return_url: args.returnUrl || `${SITE}/account`,
  });
}

/**
 * Verify and parse an incoming Stripe webhook event.
 * Throws if signature is invalid — DO NOT trust webhooks without this.
 */
export function constructWebhookEvent(payload: string | Buffer, signature: string): Stripe.Event {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET not set');
  return stripe.webhooks.constructEvent(payload, signature, secret);
}

/** Alias used by app/api/stripe/webhook/route.ts */
export const verifyWebhook = constructWebhookEvent;
