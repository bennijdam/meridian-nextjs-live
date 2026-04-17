/**
 * /results — +342% organic traffic uplift. £0.87 median CPL. 94% retentio
 *
 * Server-rendered for SEO. The page-level CSS lives in app/globals.css; this
 * file only writes the structured content that JSON-LD and AI Overviews can
 * parse cleanly.
 */
import type { Metadata } from 'next';
import Link from 'next/link';

import { jsonLd, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Results & Case Studies — Meridian | London Agency Performance',
  description: '+342% organic traffic uplift. £0.87 median CPL. 94% retention. The numbers behind Meridian’s London agency work.',
  alternates: { canonical: '/results' },
};

const STATS = [
  { value: '+342%',   label: 'Average organic traffic uplift in 12 months across SEO clients' },
  { value: '£0.87',   label: 'Median CPL in B2B London paid search vs £4.20 industry benchmark' },
  { value: '94%',     label: 'Client retention beyond 24 months — the only metric that matters' },
  { value: '2.1s',    label: 'Average LCP across all sites we ship — top 4% of UK websites' },
  { value: '82%',     label: "Of SEO clients reach Google's top 10 within 6 months" },
  { value: '71%',     label: 'Of SEO clients hit top 3 within 12 months' },
  { value: '3.4×',    label: 'Median ROAS uplift on inherited PPC accounts within 90 days' },
  { value: '9.2/10',  label: 'Average client NPS score (industry benchmark: 31)' },
];

export default function ResultsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Results', url: '/results' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      

      <main className="wrap" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        <header style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 60px' }} className="reveal">
          <span className="section-eyebrow">PROOF · NUMBERS · ATTRIBUTION</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            Results we’ll <span className="accent">defend in your boardroom</span>.
          </h1>
          <p className="section-sub">Every number on this page is real, attributable, and pulled from Google Search Console, GA4, or platform reporting our clients have access to.</p>
        </header>

        
        <div className="why-grid">
          {STATS.map((s, i) => (
            <div key={i} className="why-card">
              <div className="why-num">{s.value}</div>
              <div className="why-label">{s.label}</div>
            </div>
          ))}
        </div>

      </main>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready to start?</h2>
            <p className="final-p">Pick a tier on pricing, or get a free audit first.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/pricing" className="btn btn-primary">See Pricing →</Link>
              <Link href="/audit"   className="btn btn-ghost">Free SEO Audit</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
