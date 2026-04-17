/**
 * POST /api/stripe/checkout
 *
 * Body: { productId, productKind: 'retainer'|'project', period?: 'payg'|'monthly'|'annual', email? }
 * Returns: { url: string }  — redirect the browser to this URL.
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createCheckoutSession } from '@/lib/stripe';
import { leadLimiter, getClientIp } from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  productId:   z.string().min(1).max(64),
  productKind: z.enum(['retainer', 'project']),
  period:      z.enum(['payg', 'monthly', 'annual', 'oneoff']).optional(),
  email:       z.string().email().max(320).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }

    // Rate-limit by IP — prevents accidental hammering on retry loops
    const ip = getClientIp(req.headers);
    const limit = await leadLimiter.limit(`ip:${ip}`);
    if (!limit.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const session = await createCheckoutSession({
      productId:   parsed.data.productId,
      productKind: parsed.data.productKind,
      period:      parsed.data.period,
      email:       parsed.data.email,
      metadata: {
        ip,
        ua: req.headers.get('user-agent') || '',
        referer: req.headers.get('referer') || '',
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return a session URL' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('[stripe/checkout]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 }
    );
  }
}
