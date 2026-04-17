'use client';

import { useState } from 'react';

/**
 * Client component for the bottom-of-page email capture CTA.
 * POSTs to /api/leads with source: 'homepage_footer'.
 */
export default function FinalCTAForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fd.get('email'), source: 'homepage_footer' }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '480px', margin: '0 auto' }}>
      <input
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        className="audit-input"
        style={{ flex: 1 }}
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'loading'}
        style={status === 'success' ? { background: '#c4ff5b', color: '#000' } : undefined}
      >
        {status === 'idle' && 'Get Started →'}
        {status === 'loading' && 'Sending...'}
        {status === 'success' && '✓ Sent!'}
        {status === 'error' && '⚠ Try again'}
      </button>
    </form>
  );
}
