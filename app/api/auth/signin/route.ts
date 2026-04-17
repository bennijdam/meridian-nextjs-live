/**
 * POST /api/auth/signin
 * Body: { email, next? }
 * Sends a magic-link email. Returns 202 regardless of whether the email exists
 * (to prevent account enumeration).
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendMagicLink, getRequestContext } from '@/lib/auth';
import { leadLimiter, getClientIp } from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  email: z.string().email().max(320),
  next: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Rate limit by IP
    const ip = getClientIp(req.headers);
    const limit = await leadLimiter.limit(`auth:${ip}`);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Too many sign-in requests. Please try again later.' },
        { status: 429 }
      );
    }

    const ctx = await getRequestContext();
    await sendMagicLink({
      email: parsed.data.email,
      nextPath: parsed.data.next,
      ip: ctx.ip,
      userAgent: ctx.userAgent,
    });

    // Always return success to prevent enumeration
    return NextResponse.json(
      { ok: true, message: 'If that email is registered, a sign-in link has been sent.' },
      { status: 202 }
    );
  } catch (err) {
    console.error('[auth/signin]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
