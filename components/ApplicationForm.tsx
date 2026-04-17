'use client';

import { useState } from 'react';

type Props = {
  source: string;
  heading: string;
  subtext: string;
  fields: ('company' | 'role' | 'website' | 'message' | 'cv' | 'linkedin')[];
  buttonLabel?: string;
};

/**
 * Application form for partners, careers, or custom lead capture.
 * Posts to /api/leads with form data.
 */
export default function ApplicationForm({ source, heading, subtext, fields, buttonLabel = 'Submit Application →' }: Props) {
  const [form, setForm] = useState({
    name: '', email: '', company: '', role: '', website: '', message: '', linkedin: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
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
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', marginBottom: '8px' }}>Application received!</h3>
        <p style={{ color: 'var(--ink-2)', fontSize: '15px' }}>We&apos;ll review within 48 hours and get back to you.</p>
      </div>
    );
  }

  return (
    <div className="audit-card" style={{ padding: '32px' }}>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 28px)', letterSpacing: '-0.015em', marginBottom: '8px' }}>{heading}</h3>
      <p style={{ color: 'var(--ink-2)', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>{subtext}</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="field-wrap">
          <input type="text" value={form.name} onChange={handleChange('name')} placeholder="Your name" required style={{ flex: 1, fontSize: '15px', color: 'var(--ink)' }} />
        </div>
        <div className="field-wrap">
          <input type="email" value={form.email} onChange={handleChange('email')} placeholder="you@company.co.uk" required autoComplete="email" style={{ flex: 1, fontSize: '15px', color: 'var(--ink)' }} />
        </div>
        {fields.includes('company') && (
          <div className="field-wrap">
            <input type="text" value={form.company} onChange={handleChange('company')} placeholder="Company name" style={{ flex: 1, fontSize: '15px', color: 'var(--ink)' }} />
          </div>
        )}
        {fields.includes('role') && (
          <div className="field-wrap">
            <input type="text" value={form.role} onChange={handleChange('role')} placeholder="Your role" style={{ flex: 1, fontSize: '15px', color: 'var(--ink)' }} />
          </div>
        )}
        {fields.includes('website') && (
          <div className="field-wrap">
            <span className="field-prefix">https://</span>
            <input type="text" value={form.website} onChange={handleChange('website')} placeholder="yourdomain.co.uk" style={{ flex: 1, fontSize: '15px', color: 'var(--ink)' }} />
          </div>
        )}
        {fields.includes('linkedin') && (
          <div className="field-wrap">
            <input type="url" value={form.linkedin} onChange={handleChange('linkedin')} placeholder="LinkedIn URL" style={{ flex: 1, fontSize: '15px', color: 'var(--ink)' }} />
          </div>
        )}
        {fields.includes('message') && (
          <div className="field-wrap" style={{ height: 'auto', padding: '12px 16px' }}>
            <textarea
              value={form.message}
              onChange={handleChange('message')}
              placeholder="Tell us about yourself..."
              rows={4}
              style={{ flex: 1, fontSize: '15px', color: 'var(--ink)', resize: 'vertical', minHeight: '80px', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit' }}
            />
          </div>
        )}

        <button type="submit" className="audit-btn" disabled={status === 'loading'} style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'wait' : 'pointer' }}>
          {status === 'loading' ? 'Sending...' : buttonLabel}
        </button>
        {status === 'error' && (
          <p style={{ fontSize: '12px', color: 'var(--accent-2)', textAlign: 'center' }}>{errorMsg}</p>
        )}
      </form>
      <p style={{ fontSize: '11px', color: 'var(--ink-3)', textAlign: 'center', marginTop: '12px' }}>GDPR compliant · Response within 48 hours</p>
    </div>
  );
}
