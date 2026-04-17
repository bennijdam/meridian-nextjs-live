'use client';

import { useState } from 'react';

type Props = {
  source: string;
  heading?: string;
  subtext?: string;
  buttonLabel?: string;
  dark?: boolean;
};

/**
 * Inline lead capture form — posts to /api/leads.
 * Used on cost pages, guides, and industry pages.
 */
export default function LeadCaptureForm({
  source,
  heading = 'Get your free SEO audit',
  subtext = '12-page PDF with your top 10 quick wins. Delivered in 90 seconds.',
  buttonLabel = 'Send My Audit →',
  dark = false,
}: Props) {
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email, source }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({ error: 'Something went wrong' }));
        setErrorMsg(data.error || 'Please try again');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error — please try again');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="audit-card" style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', marginBottom: '8px' }}>Audit on the way!</h3>
        <p style={{ color: 'var(--ink-2)', fontSize: '15px' }}>Check your inbox in 90 seconds. If it doesn&apos;t arrive, check spam.</p>
      </div>
    );
  }

  return (
    <div className={dark ? 'audit-card' : 'include-card'} style={{ padding: '32px' }}>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 28px)', letterSpacing: '-0.015em', marginBottom: '8px' }}>{heading}</h3>
      <p style={{ color: 'var(--ink-2)', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>{subtext}</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="field-wrap">
          <span className="field-prefix">https://</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourdomain.co.uk"
            required
            style={{ flex: 1, fontSize: '15px', color: 'var(--ink)' }}
          />
        </div>
        <div className="field-wrap">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.co.uk"
            required
            autoComplete="email"
            style={{ flex: 1, fontSize: '15px', color: 'var(--ink)' }}
          />
        </div>
        <button
          type="submit"
          className="audit-btn"
          disabled={status === 'loading'}
          style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'wait' : 'pointer' }}
        >
          {status === 'loading' ? 'Analysing...' : buttonLabel}
        </button>
        {status === 'error' && (
          <p style={{ fontSize: '12px', color: 'var(--accent-2)', textAlign: 'center' }}>{errorMsg}</p>
        )}
      </form>
      <p style={{ fontSize: '11px', color: 'var(--ink-3)', textAlign: 'center', marginTop: '12px' }}>No obligation · GDPR compliant · Delivered in 90 seconds</p>
    </div>
  );
}
