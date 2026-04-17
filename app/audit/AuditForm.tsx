
'use client';
import { useState } from 'react';

export function AuditForm() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: fd.get('url'),
          email: fd.get('email'),
          industry: fd.get('industry') || undefined,
        }),
      });
      if (res.ok) setStatus('success');
      else { setError((await res.json()).error || 'Try again'); setStatus('error'); }
    } catch {
      setError('Network error — try again'); setStatus('error');
    }
  }

  return (
    <form className="audit-form" onSubmit={onSubmit}>
      <label className="field-label" htmlFor="url">Your website URL</label>
      <div className="field-wrap">
        <span className="field-prefix">https://</span>
        <input type="text" id="url" name="url" placeholder="yourdomain.co.uk" autoComplete="url" required />
      </div>
      <label className="field-label" htmlFor="email">Where shall we send your audit?</label>
      <div className="field-wrap">
        <input type="email" id="email" name="email" placeholder="you@company.co.uk" autoComplete="email" required />
      </div>
      <label className="field-label" htmlFor="industry">Your industry (optional)</label>
      <div className="field-wrap" style={{ height: '54px', padding: '0 16px' }}>
        <select id="industry" name="industry" style={{ flex: 1, background: 'transparent', border: 0, color: 'var(--ink)', fontSize: '15.5px', outline: 'none', height: '54px', width: '100%' }}>
          <option value="">Select to benchmark vs your niche</option>
          <option value="ecommerce">E-commerce / Retail</option>
          <option value="saas">SaaS / Software</option>
          <option value="fintech">Fintech / Financial Services</option>
          <option value="legal">Legal / Professional Services</option>
          <option value="healthcare">Healthcare / Medical</option>
          <option value="property">Property / Real Estate</option>
          <option value="b2b">B2B Services</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" className="audit-btn" disabled={status==='loading'}>
        {status==='loading' && '⏳ Analysing...'}
        {status==='success' && '✓ Audit on the way! Check your inbox.'}
        {status==='error'   && '⚠ ' + (error || 'Try again')}
        {status==='idle'    && (<>Run My Free Audit <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'18px',height:'18px'}}><path d="M5 12h14M13 5l7 7-7 7"/></svg></>)}
      </button>
      <p className="audit-meta">No obligation · GDPR-compliant · Audit delivered in 90 seconds</p>
    </form>
  );
}
