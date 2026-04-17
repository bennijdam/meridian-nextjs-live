/**
 * Magic-link email authentication.
 *
 * No external dependency — uses Resend (email), Drizzle (token storage),
 * and Next.js cookies (sessions).
 *
 * Flow:
 *   1. User enters email → POST /api/auth/signin
 *   2. Server generates a 32-byte token, stores its SHA-256 hash in auth_tokens
 *   3. Server emails a magic link: /api/auth/verify?token={plaintext}&next=/account
 *   4. User clicks → server validates hash + expiry, consumes token, creates session
 *   5. Session cookie set (httpOnly, secure, 30 days), redirect to `next`
 *   6. Any page can import getSession() to check auth state
 */

import { createHash, randomBytes } from 'crypto';
import { cookies, headers } from 'next/headers';
import { db, authTokens, authSessions, hasDatabase } from './db';
import { eq, and, isNull, gt } from 'drizzle-orm';
import { Resend } from 'resend';

const TOKEN_TTL_MIN = 15;                       // magic link valid 15 min
const SESSION_TTL_DAYS = 30;                    // session cookie valid 30 days
const COOKIE_NAME = 'meridian-session';
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'audits@meridianweb.co.uk';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meridianweb.co.uk';

/** Generate a cryptographically secure random token. */
function generateToken(): string {
  return randomBytes(32).toString('base64url');
}

/** SHA-256 hash of a token — we only ever store the hash. */
function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Send a magic link to the given email.
 * Returns success=true even if email doesn't exist (prevent enumeration).
 */
export async function sendMagicLink(args: {
  email: string;
  nextPath?: string;
  ip?: string;
  userAgent?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { email, nextPath = '/account', ip, userAgent } = args;

  if (!hasDatabase) {
    console.info('[auth] Local demo mode — magic link not persisted', { email });
    return { ok: true };
  }

  try {
    const token = generateToken();
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MIN * 60 * 1000);

    await db.insert(authTokens).values({
      email: email.toLowerCase(),
      tokenHash,
      expiresAt,
      metadata: { ip, userAgent, nextPath },
    });

    const link = `${SITE}/api/auth/verify?token=${token}&next=${encodeURIComponent(nextPath)}`;

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `Meridian <${RESEND_FROM}>`,
        to: email,
        subject: 'Sign in to your Meridian account',
        html: magicLinkEmail(link),
        text: `Sign in to Meridian\n\nClick this link to sign in: ${link}\n\nThis link expires in 15 minutes. If you didn't request it, you can ignore this email.`,
      });
    } else {
      console.info('[auth] RESEND_API_KEY not set — magic link:', link);
    }

    return { ok: true };
  } catch (e) {
    console.error('[auth] sendMagicLink failed:', e);
    return { ok: false, error: 'Failed to send magic link' };
  }
}

/**
 * Consume a magic link token and create a session.
 * Returns the session token to set as a cookie, or null on failure.
 */
export async function consumeMagicLink(args: {
  token: string;
  ip?: string;
  userAgent?: string;
}): Promise<{ email: string; sessionToken: string } | null> {
  const { token, ip, userAgent } = args;

  if (!hasDatabase) {
    console.warn('[auth] Database not configured — cannot consume magic link');
    return null;
  }

  try {
    const tokenHash = hashToken(token);

    // Find unused, unexpired token
    const [row] = await db
      .select()
      .from(authTokens)
      .where(and(
        eq(authTokens.tokenHash, tokenHash),
        isNull(authTokens.usedAt),
        gt(authTokens.expiresAt, new Date()),
      ))
      .limit(1);

    if (!row) return null;

    // Mark token as consumed
    await db
      .update(authTokens)
      .set({ usedAt: new Date() })
      .where(eq(authTokens.id, row.id));

    // Create session
    const sessionToken = generateToken();
    const sessionHash = hashToken(sessionToken);
    const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

    await db.insert(authSessions).values({
      email: row.email,
      sessionHash,
      expiresAt,
      metadata: { ip, userAgent },
    });

    return { email: row.email, sessionToken };
  } catch (e) {
    console.error('[auth] consumeMagicLink failed:', e);
    return null;
  }
}

/**
 * Get the current signed-in user from the request cookie.
 * Returns null if unauthenticated or session is invalid/expired.
 */
export async function getSession(): Promise<{ email: string } | null> {
  if (!hasDatabase) return null;

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;
  if (!sessionToken) return null;

  const sessionHash = hashToken(sessionToken);

  try {
    const [row] = await db
      .select({ email: authSessions.email, expiresAt: authSessions.expiresAt, revokedAt: authSessions.revokedAt })
      .from(authSessions)
      .where(eq(authSessions.sessionHash, sessionHash))
      .limit(1);

    if (!row) return null;
    if (row.revokedAt) return null;
    if (row.expiresAt < new Date()) return null;

    return { email: row.email };
  } catch {
    return null;
  }
}

/** Set the session cookie on the response. Call after consumeMagicLink. */
export async function setSessionCookie(sessionToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
  });
}

/** Sign out the current session. */
export async function signOut() {
  if (!hasDatabase) return;

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;
  if (sessionToken) {
    const sessionHash = hashToken(sessionToken);
    try {
      await db
        .update(authSessions)
        .set({ revokedAt: new Date() })
        .where(eq(authSessions.sessionHash, sessionHash));
    } catch {}
  }
  cookieStore.delete(COOKIE_NAME);
}

export async function getRequestContext() {
  const h = await headers();
  return {
    ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown',
    userAgent: h.get('user-agent') || undefined,
  };
}

function magicLinkEmail(link: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Sign in to Meridian</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f7;margin:0;padding:32px 16px;color:#1f2937">
<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:40px;border:1px solid #e5e7eb">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:28px">
    <div style="width:32px;height:32px;background:linear-gradient(135deg,#5b8cff,#ff5be3);border-radius:50%"></div>
    <strong style="font-size:18px">Meridian</strong>
  </div>
  <h1 style="font-size:24px;margin:0 0 16px;letter-spacing:-0.02em">Sign in to your account</h1>
  <p style="font-size:15px;line-height:1.6;margin:0 0 24px">Click the button below to sign in. The link will expire in 15 minutes and can only be used once.</p>
  <a href="${link}" style="display:inline-block;padding:14px 28px;background:#0f172a;color:#fff;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px">Sign in to Meridian →</a>
  <p style="font-size:13px;color:#64748b;line-height:1.6;margin:24px 0 0">Or copy and paste this URL into your browser:<br><span style="word-break:break-all;color:#0f172a">${link}</span></p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 20px">
  <p style="font-size:12px;color:#6b6b78;line-height:1.6;margin:0">If you didn't request this email, you can safely ignore it — no action will be taken.<br>Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF · Company No. 09876543</p>
</div>
</body></html>`;
}
