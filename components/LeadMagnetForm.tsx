'use client';

import { useState } from 'react';

type Props = {
  magnetSlug: string;
  downloadFilename: string;
  magnetTitle: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Email-gated download form.
 *
 * POSTs to /api/download. On success, shows the confirmation state plus a
 * direct download link (/api/download/{filename}?email=...).
 */
export default function LeadMagnetForm({ magnetSlug, downloadFilename, magnetTitle }: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          company: company || undefined,
          magnetSlug,
          website,
          source: `download_${magnetSlug}`,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        const url =
          data.downloadUrl ||
          `/api/download/${encodeURIComponent(downloadFilename)}?email=${encodeURIComponent(email)}`;
        setDownloadUrl(url);
        setStatus('success');
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error — please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="include-card" style={{ padding: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>✓</div>
        <h3 className="include-h" style={{ fontSize: '22px', marginBottom: '8px' }}>
          Check your inbox — your download is on the way
        </h3>
        <p className="include-p" style={{ marginBottom: '20px' }}>
          We&apos;ve sent a copy of <strong>{magnetTitle}</strong> to <strong>{email}</strong>.
          You can also download it directly below.
        </p>
        <a
          href={downloadUrl}
          className="btn btn-primary"
          style={{ display: 'inline-block' }}
          download={downloadFilename}
        >
          Download now →
        </a>
        <p style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '14px' }}>
          Didn&apos;t receive it? Check spam, or <a href="mailto:hello@meridianweb.co.uk">email us</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="include-card" style={{ padding: '32px' }}>
      <h3 className="include-h" style={{ fontSize: '22px', marginBottom: '8px' }}>
        Get your free copy
      </h3>
      <p className="include-p" style={{ marginBottom: '20px' }}>
        Drop your email and we&apos;ll send <strong>{magnetTitle}</strong> straight to your inbox. No spam, no follow-up calls — unsubscribe any time.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="field-wrap">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.co.uk"
            required
            autoComplete="email"
            aria-label="Email address"
            style={{ flex: 1, fontSize: '15px', color: 'var(--ink)' }}
          />
        </div>
        <div className="field-wrap">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            autoComplete="name"
            aria-label="Name"
            style={{ flex: 1, fontSize: '15px', color: 'var(--ink)' }}
          />
        </div>
        <div className="field-wrap">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (optional)"
            autoComplete="organization"
            aria-label="Company"
            style={{ flex: 1, fontSize: '15px', color: 'var(--ink)' }}
          />
        </div>

        {/* Honeypot — hidden from humans, tempting for bots */}
        <div style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'loading'}
          style={{
            opacity: status === 'loading' ? 0.7 : 1,
            cursor: status === 'loading' ? 'wait' : 'pointer',
            width: '100%',
          }}
        >
          {status === 'loading' ? 'Sending…' : 'Send me the download →'}
        </button>

        {status === 'error' && (
          <p style={{ fontSize: '12px', color: 'var(--accent-2)', textAlign: 'center' }}>
            {errorMsg}
          </p>
        )}
      </form>

      <p style={{ fontSize: '11px', color: 'var(--ink-3)', textAlign: 'center', marginTop: '12px' }}>
        GDPR compliant · One email, then silence · Instant delivery
      </p>
    </div>
  );
}
