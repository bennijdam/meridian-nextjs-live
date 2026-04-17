'use client';

import { useState } from 'react';

type Props = { nextPath?: string };

export default function SignInForm({ nextPath }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, next: nextPath }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>✉️</div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Check your inbox</h3>
        <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
          We sent a sign-in link to <strong>{email}</strong>. Click the link in the email to sign in. The link expires in 15 minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ display: 'block', fontSize: '12px', color: 'var(--ink-3)', fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
        Email address
      </label>
      <div className="field-wrap">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.co.uk"
          required
          autoComplete="email"
          style={{ flex: 1, fontSize: '15.5px', color: 'var(--ink)' }}
        />
      </div>
      <button
        type="submit"
        className="audit-btn"
        disabled={status === 'loading'}
        style={{ marginTop: '8px', opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'wait' : 'pointer' }}
      >
        {status === 'loading' ? 'Sending magic link...' : 'Send magic link →'}
      </button>
      {status === 'error' && (
        <p style={{ fontSize: '13px', color: 'var(--accent-2)', marginTop: '12px', textAlign: 'center' }}>
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
