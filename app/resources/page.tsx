/**
 * /resources — Free resources index page.
 *
 * Top-of-funnel conversion hub. Each card links to an email-gated lead
 * magnet page at /resources/[slug].
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { LEAD_MAGNETS } from '@/lib/lead-magnets';
import { SERVICES } from '@/lib/services';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import LeadMagnetGrid from '@/components/LeadMagnetGrid';

export const metadata: Metadata = {
  title: 'Free Resources for London Founders & Marketers | Meridian',
  description:
    'Free playbooks, checklists, templates and calculators from Meridian — the London SEO Playbook, Shopify SEO Checklist, eCommerce email templates, app cost calculator and more.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Free Resources for London Founders & Marketers | Meridian',
    description:
      'Playbooks, checklists, templates and calculators from Meridian. Free to download. No follow-up calls.',
    url: '/resources',
    type: 'website',
    locale: 'en_GB',
  },
};

export default function ResourcesIndexPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }}
      />

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
          <span className="service-eyebrow"><span className="pulse"></span>FREE RESOURCES · NO CALL REQUIRED</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(40px,6vw,72px)', maxWidth: '960px', margin: '0 auto 22px' }}>
            Free resources for London <span className="accent">founders and marketers</span>.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '680px', textAlign: 'center' }}>
            Playbooks, checklists, templates and calculators built from real London engagements. Download any of them free — we&apos;ll email you the file and then leave you alone.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="#resources" className="btn btn-primary">Browse resources →</Link>
            <Link href="/audit" className="btn btn-ghost">Or get a free audit</Link>
          </div>
        </div>
      </section>

      <section id="resources" style={{ padding: '60px 0 80px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{LEAD_MAGNETS.length} FREE DOWNLOADS</span>
            <h2 className="section-title">
              Pick a resource. <span className="accent">Download free</span>.
            </h2>
          </div>

          <LeadMagnetGrid magnets={LEAD_MAGNETS} />
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Want these applied to your business?</h2>
            <p className="final-p">Free 90-second SEO audit — we&apos;ll apply our frameworks to your site and send back a PDF with your top 10 quick wins.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
              <Link href="/pricing" className="btn btn-ghost">View Pricing</Link>
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
            <div className="footer-col">
              <h4>Services</h4>
              <ul>{SERVICES.slice(0, 6).map(sv => (<li key={sv.slug}><Link href={`/services/${sv.slug}`}>{sv.shortName}</Link></li>))}</ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/reviews">Reviews</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Started</h4>
              <ul>
                <li><Link href="/audit">Free SEO Audit</Link></li>
                <li><Link href="/resources">Free Resources</Link></li>
                <li><Link href="/pricing">View Pricing</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span>
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
