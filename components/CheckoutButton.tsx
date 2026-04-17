'use client';

import { useState } from 'react';

type Props = {
  productId: string;
  productKind: 'retainer' | 'project';
  period?: 'payg' | 'monthly' | 'annual';
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Client component that initiates Stripe Checkout.
 * Posts to /api/stripe/checkout, gets back a Stripe URL, redirects.
 */
export default function CheckoutButton({
  productId,
  productKind,
  period,
  label = 'Get Started →',
  className = 'btn btn-primary',
  style,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, productKind, period }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Something went wrong');
        setLoading(false);
      }
    } catch {
      setError('Network error — please try again');
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className={className}
        style={{ width: '100%', justifyContent: 'center', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1, ...style }}
      >
        {loading ? 'Redirecting to checkout...' : label}
      </button>
      {error && (
        <p style={{ fontSize: '12px', color: 'var(--accent-2)', marginTop: '8px', textAlign: 'center' }}>{error}</p>
      )}
    </>
  );
}
