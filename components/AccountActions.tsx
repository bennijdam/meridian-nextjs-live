'use client';

import { useState } from 'react';
import Link from 'next/link';

type Props = { email: string };

/**
 * Client component for account self-service actions.
 * - Open Stripe customer portal
 * - Quick-access panels for subscriptions, invoices, resources
 */
export default function AccountActions({ email }: Props) {
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState('');

  const openPortal = async () => {
    setPortalLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'No subscription found. If you just signed up, it may take a moment to sync.');
        setPortalLoading(false);
      }
    } catch {
      setError('Network error — please try again.');
      setPortalLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
      {/* Stripe Portal card */}
      <div className="include-card" style={{ padding: '24px' }}>
        <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>
          BILLING
        </div>
        <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>Subscription &amp; invoices</h3>
        <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', marginBottom: '16px', lineHeight: 1.5 }}>
          Manage your plan, switch billing cycle, update payment methods, or download invoices.
        </p>
        <button
          onClick={openPortal}
          disabled={portalLoading}
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', fontSize: '14px', opacity: portalLoading ? 0.7 : 1, cursor: portalLoading ? 'wait' : 'pointer' }}
        >
          {portalLoading ? 'Opening portal...' : 'Open billing portal →'}
        </button>
        {error && (
          <p style={{ fontSize: '12.5px', color: 'var(--accent-2)', marginTop: '10px' }}>{error}</p>
        )}
      </div>

      {/* Audits card */}
      <div className="include-card" style={{ padding: '24px' }}>
        <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>
          REPORTS
        </div>
        <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>SEO audits</h3>
        <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', marginBottom: '16px', lineHeight: 1.5 }}>
          Your audit results are emailed as they complete. Run a new audit any time.
        </p>
        <Link
          href="/audit"
          className="btn btn-ghost"
          style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}
        >
          Run a new audit →
        </Link>
      </div>
    </div>
  );
}
