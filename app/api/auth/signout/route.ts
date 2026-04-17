/**
 * POST /api/auth/signout
 * Revokes the current session and clears the cookie. Redirects to /.
 */

import { NextResponse } from 'next/server';
import { signOut } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meridianweb.co.uk';

export async function POST() {
  await signOut();
  return NextResponse.redirect(`${SITE}/`, { status: 303 });
}

export async function GET() {
  await signOut();
  return NextResponse.redirect(`${SITE}/`);
}
