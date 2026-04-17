/**
 * /near-me — Index page for "[service] near me" London landing pages.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/services';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Digital Marketing Near Me in London | SEO, PPC, Web | Meridian',
  description: "Find digital marketing services near you in London — SEO, PPC, web design, app development, social media. All 32 boroughs + the City. Free audit.",
  alternates: { canonical: '/near-me' },
};

export default function NearMeIndexPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Near Me', url: '/near-me' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />

      <header role="banner">
        <Link href="/" className="logo" aria-label="Meridian — home">
          <span className="logo-mark" aria-hidden="true"></span>
          <span>Meridian</span>
        </Link>
        <nav role="navigation" aria-label="Primary">
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/audit">Free Audit</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/london">London</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
        <button className="theme-toggle" id="themeToggle" aria-label="Toggle light/dark theme" type="button">
          <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>LONDON · 44 AREAS COVERED</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(44px,6vw,80px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            Digital marketing <span className="accent">near you</span>.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '700px', textAlign: 'center' }}>
            Pick your service — each page lists every London borough and links through to a dedicated landing page with pricing and case studies.
          </p>
        </div>
      </section>

      <section className="includes-section">
        <div className="wrap">
          <div className="includes-grid reveal">
            {SERVICES.map((s) => (
              <article key={s.slug} className="include-card">
                <div className="include-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3 className="include-h">
                  <Link href={`/near-me/${s.slug}`} style={{ color: 'inherit' }}>
                    {s.shortName} near me
                  </Link>
                </h3>
                <p className="include-p" style={{ marginBottom: '16px' }}>{s.intro}</p>
                <Link href={`/near-me/${s.slug}`} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: '13px' }}>
                  Find {s.shortName.toLowerCase()} nearby →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Don&apos;t know where to start?</h2>
            <p className="final-p">Free 90-second audit. 12-page PDF with your top 10 quick wins. No call required.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
              <Link href="/london" className="btn btn-ghost">Browse Boroughs</Link>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <Link href="/" className="logo"><span className="logo-mark"></span><span>Meridian</span></Link>
              <p>London&apos;s boutique digital performance studio since 2014.</p>
            </div>
            <div className="footer-col"><h4>Services</h4><ul>{SERVICES.slice(0, 6).map(sv => (<li key={sv.slug}><Link href={`/services/${sv.slug}`}>{sv.shortName}</Link></li>))}</ul></div>
            <div className="footer-col"><h4>Company</h4><ul><li><Link href="/pricing">Pricing</Link></li><li><Link href="/reviews">Reviews</Link></li><li><Link href="/blog">Blog</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
            <div className="footer-col"><h4>Get Started</h4><ul><li><Link href="/audit">Free SEO Audit</Link></li><li><Link href="/pricing">View Pricing</Link></li></ul></div>
          </div>
          <div className="footer-bottom"><span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span><span>Cyber Essentials Plus · ISO 27001 · GDPR Compliant</span></div>
        </div>
      </footer>

      <div className="mobile-cta" role="complementary">
        <span className="mobile-cta-text">Free SEO audit, 90s.</span>
        <Link href="/audit" className="mobile-cta-btn">Get Audit →</Link>
      </div>
    </>
  );
}
