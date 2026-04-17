/**
 * /london/neighborhoods — Index page for London sub-neighborhood landing pages.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { NEIGHBORHOODS } from '@/lib/neighborhoods';
import { BOROUGHS } from '@/lib/boroughs';
import { SERVICES } from '@/lib/services';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'London Neighbourhoods | 50+ Sub-Areas Covered | Meridian',
  description: "Digital marketing for every London neighbourhood — from Hoxton to Brick Lane, Bond Street to Clapham Junction. Hyper-local SEO, PPC and web for 50+ sub-areas.",
  alternates: { canonical: '/london/neighborhoods' },
};

export default function NeighborhoodsIndexPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'London', url: '/london' },
    { name: 'Neighbourhoods', url: '/london/neighborhoods' },
  ]);

  // Group neighborhoods by parent borough
  const byBorough = new Map<string, typeof NEIGHBORHOODS>();
  for (const n of NEIGHBORHOODS) {
    if (!byBorough.has(n.borough)) byBorough.set(n.borough, []);
    byBorough.get(n.borough)!.push(n);
  }

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
          <span className="service-eyebrow"><span className="pulse"></span>50+ LONDON SUB-AREAS</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(44px,6vw,80px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            Every London <span className="accent">neighbourhood</span>. One team.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '700px', textAlign: 'center' }}>
            Borough-level SEO gets you visibility. Neighbourhood-level SEO wins the 3-pack for the streets your buyers actually search for. We run both.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
            <Link href="/london" className="btn btn-ghost">All 44 Boroughs</Link>
          </div>
        </div>
      </section>

      <section className="includes-section">
        <div className="wrap">
          {BOROUGHS.filter(b => byBorough.has(b.slug)).map((b) => (
            <div key={b.slug} style={{ marginBottom: '40px' }}>
              <div className="section-head reveal" style={{ marginBottom: '20px' }}>
                <span className="section-eyebrow">{b.postcodes.join(' · ').toUpperCase()}</span>
                <h2 className="section-title" style={{ fontSize: 'clamp(28px,3.5vw,42px)' }}>
                  Neighbourhoods in <Link href={`/london/${b.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}><span className="accent">{b.name}</span></Link>
                </h2>
              </div>
              <div className="borough-track reveal">
                {byBorough.get(b.slug)!.map((n) => (
                  <Link key={n.slug} href={`/london/neighborhoods/${n.slug}`} className="borough">
                    <span className="dot"></span>{n.name}
                  </Link>
                ))}
                <Link href={`/london/${b.slug}`} className="borough featured">
                  <span className="dot"></span>All of {b.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Don&apos;t see your neighbourhood?</h2>
            <p className="final-p">We cover every street in London, not just the ones listed here. Drop us a line with your area and we&apos;ll spin up a dedicated strategy.</p>
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
