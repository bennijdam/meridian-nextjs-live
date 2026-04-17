/**
 * /targeted — Index page for the 200 ultra-long-tail triple-matrix combos.
 * Groups every combination by service so visitors can drill into
 * service × industry × borough pages quickly.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { TARGETED_COMBOS, groupTargetedByService } from '@/lib/targeted';
import { SERVICES } from '@/lib/services';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Targeted London Agency Pages | Service × Industry × Borough | Meridian',
  description: `${TARGETED_COMBOS.length} ultra-long-tail landing pages combining Meridian's 11 services, 15 industries and 10 top-tier London boroughs. Find the specialist page for your exact need.`,
  alternates: { canonical: '/targeted' },
  openGraph: {
    title: 'Targeted London Agency Pages | Meridian',
    description: `${TARGETED_COMBOS.length} ultra-long-tail landing pages combining services, industries and boroughs.`,
    url: '/targeted',
    type: 'website',
    locale: 'en_GB',
  },
};

export default function TargetedIndexPage() {
  const groups = groupTargetedByService();
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Targeted', url: '/targeted' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />

      {/* ========================= HEADER ========================= */}
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

      {/* ========================= HERO ========================= */}
      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow">
            <span className="pulse"></span>
            SERVICE × INDUSTRY × BOROUGH · {TARGETED_COMBOS.length} PAGES
          </span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(40px,6vw,76px)', maxWidth: '900px', margin: '0 auto 22px' }}>
            Targeted <span className="accent">London agency</span> pages.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '700px', textAlign: 'center' }}>
            {TARGETED_COMBOS.length} ultra-long-tail pages combining our services, industry verticals and top-tier London boroughs. Find the specialist page for your exact need — or <Link href="/contact">tell us what you&apos;re after</Link>.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
            <Link href="/pricing" className="btn btn-ghost">See Pricing</Link>
          </div>
        </div>
      </section>

      {/* ========================= GROUPED LISTS ========================= */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">BROWSE BY SERVICE</span>
            <h2 className="section-title">
              All <span className="accent">{TARGETED_COMBOS.length} targeted pages</span>, grouped.
            </h2>
          </div>

          {groups.map(({ service, combos }) => (
            <div key={service.slug} className="reveal" style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', letterSpacing: '-0.02em' }}>
                  {service.shortName}
                </h3>
                <Link href={`/services/${service.slug}`} style={{ fontSize: '13px', fontFamily: 'var(--mono)', color: 'var(--ink-3)' }}>
                  View {service.shortName} hub →
                </Link>
              </div>
              <div className="borough-track">
                {combos.map(c => (
                  <Link
                    key={c.slug}
                    href={`/targeted/${c.slug}`}
                    className={`borough${c.borough.featured ? ' featured' : ''}`}
                  >
                    <span className="dot"></span>
                    {c.industry.shortName} · {c.borough.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= FINAL CTA ========================= */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Don&apos;t see your exact combination?</h2>
            <p className="final-p">We cover all 32 London boroughs, 11 services and 15 industries. Tell us what you need.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary">Get in Touch →</Link>
              <Link href="/services" className="btn btn-ghost">All Services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <Link href="/" className="logo"><span className="logo-mark"></span><span>Meridian</span></Link>
              <p>London&apos;s boutique digital performance studio. Engineering compounding growth since 2014.</p>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                {SERVICES.slice(0, 6).map(sv => (
                  <li key={sv.slug}><Link href={`/services/${sv.slug}`}>{sv.shortName}</Link></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/reviews">Reviews</Link></li>
                <li><Link href="/london">London</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Started</h4>
              <ul>
                <li><Link href="/audit">Free SEO Audit</Link></li>
                <li><Link href="/pricing">View Pricing</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Meridian Digital Ltd · Company No. 09876543 · 1 Finsbury Avenue, London EC2M 2PF</span>
            <span>Cyber Essentials Plus · ISO 27001 · GDPR Compliant</span>
          </div>
        </div>
      </footer>

      <div className="mobile-cta" role="complementary">
        <span className="mobile-cta-text">Free SEO audit, 90s.</span>
        <Link href="/audit" className="mobile-cta-btn">Get Audit →</Link>
      </div>
    </>
  );
}
