/**
 * /account — Authenticated customer self-service dashboard.
 *
 * Session-gated via magic-link auth (see lib/auth.ts).
 * Unauthenticated visitors are redirected to /account/signin.
 *
 * Actions available once signed in:
 *   - Open Stripe customer portal (manage subscription, invoices, cards)
 *   - Download past audit reports
 *   - Access lead-magnet resources
 *   - Sign out
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AccountActions from '@/components/AccountActions';

export const metadata: Metadata = {
  title: 'Your account | Meridian',
  description: 'Manage your Meridian subscription, view invoices, update payment methods, or access your resources.',
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect('/account/signin?next=/account');

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
        <button className="theme-toggle" id="themeToggle" aria-label="Toggle light/dark theme" type="button">
          <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      <main style={{ paddingTop: '160px', paddingBottom: '120px', minHeight: '80vh' }}>
        <div className="wrap" style={{ maxWidth: '720px' }}>
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.08em' }}>SIGNED IN AS</span>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,5vw,48px)', letterSpacing: '-0.025em', margin: '6px 0 8px' }}>
              {session.email}
            </h1>
            <p style={{ color: 'var(--ink-2)', fontSize: '15px' }}>
              Manage your subscription, view invoices, or access your resources. <form action="/api/auth/signout" method="post" style={{ display: 'inline' }}><button type="submit" style={{ background: 'none', border: 0, color: 'var(--accent)', cursor: 'pointer', padding: 0, font: 'inherit' }}>Sign out</button></form>.
            </p>
          </div>

          <AccountActions email={session.email} />

          <div style={{ marginTop: '32px', padding: '20px 24px', borderRadius: '14px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px' }}>Quick links</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link href="/resources" className="borough">
                <span className="dot" />Free resources
              </Link>
              <Link href="/audit" className="borough">
                <span className="dot" />Run a new audit
              </Link>
              <Link href="/pricing" className="borough">
                <span className="dot" />Upgrade plan
              </Link>
              <Link href="/contact" className="borough">
                <span className="dot" />Contact support
              </Link>
            </div>
          </div>
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
