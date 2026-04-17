/**
 * /london/for — Index of audience landing pages.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { AUDIENCES } from '@/lib/audiences';
import { SERVICES } from '@/lib/services';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Digital Marketing For London Startups, DTC, SaaS & More | Meridian',
  description: "Specialised digital marketing for London startups, eCommerce brands, SaaS companies, restaurants, law firms, dentists and more. Pick your audience.",
  alternates: { canonical: '/london/for' },
};

export default function AudiencesIndexPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'London', url: '/london' },
    { name: 'For Audiences', url: '/london/for' },
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
          <span className="service-eyebrow"><span className="pulse"></span>10 LONDON AUDIENCES</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(44px,6vw,80px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            Digital marketing for <span className="accent">your kind</span> of London business.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '700px', textAlign: 'center' }}>
            Generic agencies treat a law firm like a DTC brand. We don&apos;t. Each playbook below is built for the actual commercial reality of that segment.
          </p>
        </div>
      </section>

      <section className="includes-section">
        <div className="wrap">
          <div className="includes-grid reveal">
            {AUDIENCES.map((a) => (
              <article key={a.slug} className="include-card">
                <div className="include-icon" aria-hidden="true" style={{ fontSize: '20px' }}>{a.icon}</div>
                <h3 className="include-h">
                  <Link href={`/london/for/${a.slug}`} style={{ color: 'inherit' }}>
                    For {a.name}
                  </Link>
                </h3>
                <p className="include-p" style={{ marginBottom: '16px' }}>{a.intro}</p>
                <Link href={`/london/for/${a.slug}`} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: '13px' }}>
                  See the playbook →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Not sure which fits?</h2>
            <p className="final-p">Tell us about your business and we&apos;ll point you at the right playbook — or build a bespoke one if none of these fit.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
              <Link href="/contact" className="btn btn-ghost">Contact Us</Link>
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
