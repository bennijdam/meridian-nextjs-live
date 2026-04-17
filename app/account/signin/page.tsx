/**
 * /account/signin — Magic-link sign-in page.
 * Server component wrapping a client form.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SignInForm from '@/components/SignInForm';

export const metadata: Metadata = {
  title: 'Sign in to your account | Meridian',
  description: 'Sign in to your Meridian account to manage subscriptions, view invoices, and access your SEO audits.',
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ error?: string; next?: string }>;

export default async function SignInPage({ searchParams }: { searchParams: SearchParams }) {
  const { error, next } = await searchParams;

  // If already signed in, redirect to account
  const session = await getSession();
  if (session) redirect(next || '/account');

  const errorMessages: Record<string, string> = {
    invalid_link: 'That sign-in link is invalid. Please request a new one.',
    expired_or_used: 'That sign-in link has expired or was already used. Please request a new one.',
    server_error: 'Something went wrong. Please try again.',
  };
  const errorMessage = error ? errorMessages[error] : undefined;

  return (
    <>
      <header role="banner">
        <Link href="/" className="logo" aria-label="Meridian — home">
          <span className="logo-mark" aria-hidden="true"></span>
          <span>Meridian</span>
        </Link>
        <nav role="navigation" aria-label="Primary">
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/audit">Free Audit</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/london">London</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      <main style={{ paddingTop: '180px', paddingBottom: '120px', minHeight: '80vh' }}>
        <div className="wrap" style={{ maxWidth: '440px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,5vw,44px)', letterSpacing: '-0.025em', marginBottom: '10px' }}>Sign in</h1>
            <p style={{ color: 'var(--ink-2)', fontSize: '15px' }}>We&apos;ll email you a magic link. No passwords, no fuss.</p>
          </div>

          {errorMessage && (
            <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '14px', background: 'rgba(255,91,227,0.08)', border: '1px solid rgba(255,91,227,0.3)', fontSize: '13.5px', color: 'var(--ink)' }}>
              {errorMessage}
            </div>
          )}

          <div className="audit-card" style={{ padding: '28px' }}>
            <SignInForm nextPath={next} />
          </div>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--ink-3)' }}>
            Don&apos;t have an account? <Link href="/pricing" style={{ color: 'var(--accent)' }}>Get started with a plan</Link> or <Link href="/audit" style={{ color: 'var(--accent)' }}>grab a free audit</Link>.
          </p>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-bottom">
            <span>© 2026 Meridian Digital Ltd</span>
            <span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span>
          </div>
        </div>
      </footer>
    </>
  );
}
