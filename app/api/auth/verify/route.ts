/**
 * GET /api/auth/verify?token={token}&next={path}
 * Consumes a magic-link token, creates a session, sets cookie, redirects.
 */

import { NextResponse } from 'next/server';
import { consumeMagicLink, setSessionCookie, getRequestContext } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://meridian.london';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token') || '';
    const next = url.searchParams.get('next') || '/account';

    if (!token || token.length < 20 || token.length > 256) {
      return NextResponse.redirect(`${SITE}/account/signin?error=invalid_link`);
    }

    const ctx = await getRequestContext();
    const result = await consumeMagicLink({
      token,
      ip: ctx.ip,
      userAgent: ctx.userAgent,
    });

    if (!result) {
      return NextResponse.redirect(`${SITE}/account/signin?error=expired_or_used`);
    }

    await setSessionCookie(result.sessionToken);

    // Only allow relative redirects to prevent open redirect attacks
    const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/account';
    return NextResponse.redirect(`${SITE}${safeNext}`);
  } catch (err) {
    console.error('[auth/verify]', err);
    return NextResponse.redirect(`${SITE}/account/signin?error=server_error`);
  }
}
