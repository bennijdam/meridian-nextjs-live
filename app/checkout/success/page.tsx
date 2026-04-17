import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank you — Meridian',
  description: 'Your purchase was successful.',
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <main className="wrap" style={{ paddingTop: '180px', paddingBottom: '80px', textAlign: 'center', maxWidth: '720px' }}>
      <div className="reveal in">
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
        <span className="section-eyebrow">PAYMENT CONFIRMED</span>
        <h1 className="section-title" style={{ fontSize: 'clamp(40px, 6vw, 64px)' }}>
          You&apos;re in. <span className="accent">Welcome.</span>
        </h1>
        <p className="section-sub" style={{ marginTop: '24px' }}>
          Your subscription is active. We&apos;ll be in touch within four working hours to schedule your kick-off call. The first invoice and welcome pack are already in your inbox.
        </p>
        <div className="cta-row" style={{ justifyContent: 'center', marginTop: '36px' }}>
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/account" className="btn btn-ghost">Manage subscription</Link>
        </div>
      </div>
    </main>
  );
}
