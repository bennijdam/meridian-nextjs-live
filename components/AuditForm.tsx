'use client';

import { useState } from 'react';

/**
 * Client component for the SEO audit form.
 * POSTs to /api/audit, shows loading/success/error states.
 */
export default function AuditForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
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
      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({ error: 'Server error' }));
        setErrorMsg(data.error || 'Something went wrong');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error — please try again');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="audit-field">
        <label className="audit-label" htmlFor="auditUrl">Website URL</label>
        <input className="audit-input" id="auditUrl" name="url" type="url" placeholder="https://yoursite.com" required />
      </div>
      <div className="audit-field">
        <label className="audit-label" htmlFor="auditEmail">Email</label>
        <input className="audit-input" id="auditEmail" name="email" type="email" placeholder="you@company.com" required />
      </div>
      <div className="audit-field">
        <label className="audit-label" htmlFor="auditIndustry">Industry <span style={{ color: 'var(--ink-3)' }}>(optional)</span></label>
        <select className="audit-input" id="auditIndustry" name="industry">
          <option value="">Select industry...</option>
          <option value="fintech">Fintech</option>
          <option value="saas">SaaS</option>
          <option value="ecommerce">eCommerce</option>
          <option value="healthcare">Healthcare</option>
          <option value="legal">Legal</option>
          <option value="property">Property</option>
          <option value="hospitality">Hospitality</option>
          <option value="education">Education</option>
          <option value="construction">Construction</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" className="audit-btn" disabled={status === 'loading'}>
        {status === 'idle' && <>Get Free Audit <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg></>}
        {status === 'loading' && <><span style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Analysing...</>}
        {status === 'success' && '✓ Audit on the way! Check your inbox.'}
        {status === 'error' && `⚠ ${errorMsg}`}
      </button>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </form>
  );
}
