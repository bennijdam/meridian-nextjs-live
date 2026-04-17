/**
 * /audit — Free instant SEO audit for your London business. Full techni
 *
 * Server-rendered for SEO. The page-level CSS lives in app/globals.css; this
 * file only writes the structured content that JSON-LD and AI Overviews can
 * parse cleanly.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { AuditForm } from './AuditForm';
import { jsonLd, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Free SEO Audit — Meridian | 90-Second Site Analysis',
  description: 'Free instant SEO audit for your London business. Full technical scan, Core Web Vitals, AI Overview readiness, top 10 quick-win keywords. PDF in your inbox in 90 seconds.',
  alternates: { canonical: '/audit' },
};

export default function AuditPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Audit', url: '/audit' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      

      <main className="wrap" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        <header style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 60px' }} className="reveal">
          <span className="section-eyebrow">⚡ FREE INSTANT TOOL · NO CREDIT CARD</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            Audit your site against London’s top 100 ranking sites — in <span className="accent">90 seconds</span>.
          </h1>
          <p className="section-sub">Drop in your URL. We’ll run a full technical SEO scan, score you against Core Web Vitals, surface your top 10 quick-win keywords, and email you a 12-page PDF audit with a 90-day action plan.</p>
        </header>

        
        <div className="audit-grid">
          <div>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', textAlign: 'left', marginBottom: '20px' }}>What you'll get</h2>
            <ul className="audit-features-list">
              <li><span className="check">✓</span> Full technical audit: schema, Core Web Vitals, INP, CLS, mobile-first signals</li>
              <li><span className="check">✓</span> Keyword gap report vs top 5 London competitors in your niche</li>
              <li><span className="check">✓</span> AI Overview &amp; ChatGPT citation readiness check (GEO/AEO)</li>
              <li><span className="check">✓</span> 90-day quick-win roadmap with effort + impact scoring</li>
              <li><span className="check">✓</span> Backlink profile audit + toxic link flagging</li>
              <li><span className="check">✓</span> Borough-level local SEO opportunity map</li>
            </ul>
            <div style={{ marginTop: '32px', padding: '20px', background: 'var(--surface)', borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>JOIN 14,800 LONDON BUSINESSES</p>
              <p style={{ fontSize: '14px' }}><strong>4.9</strong> from 127 reviews · Google &amp; Trustpilot verified</p>
            </div>
          </div>

          <AuditForm />
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
