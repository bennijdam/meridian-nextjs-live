/**
 * POST /api/stripe/portal
 *
 * Body: { customerId: string }   — typically read from your authenticated session
 * Returns: { url: string }       — redirect the browser to this URL.
 *
 * In production wire this behind your auth middleware so users can only open
 * the portal for their own customer ID. The current implementation trusts the
 * caller — replace with `auth()` from your session helper before going live.
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createPortalSession } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  customerId: z.string().min(1).max(120),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const session = await createPortalSession(parsed.data.customerId);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[stripe/portal]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 }
    );
  }
}
