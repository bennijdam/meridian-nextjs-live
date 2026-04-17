'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Self-hosted cookie consent banner.
 * UK PECR + GDPR compliant. No third-party dependency.
 *
 * Stores consent in localStorage as 'meridian-cookies'.
 * GA4 only fires if consent is given (handled in layout.tsx via the
 * NEXT_PUBLIC_GA4_MEASUREMENT_ID env var — this banner controls the
 * cookie preference, not the script injection).
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('meridian-cookies');
      if (!consent) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem('meridian-cookies', 'accepted'); } catch {}
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem('meridian-cookies', 'declined'); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '540px',
        zIndex: 9999,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '20px 24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}
    >
      <p style={{ fontSize: '13.5px', color: 'var(--ink)', lineHeight: '1.55', margin: '0 0 14px' }}>
        We use essential cookies for site functionality and optional analytics cookies to improve your experience.{' '}
        <Link href="/cookies" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Cookie policy</Link>
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={accept}
          className="btn btn-primary"
          style={{ flex: 1, justifyContent: 'center', padding: '10px 16px', fontSize: '13px' }}
        >
          Accept all
        </button>
        <button
          onClick={decline}
          className="btn btn-ghost"
          style={{ flex: 1, justifyContent: 'center', padding: '10px 16px', fontSize: '13px' }}
        >
          Essential only
        </button>
      </div>
    </div>
  );
}
