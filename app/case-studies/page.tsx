/**
 * /case-studies — Case studies index page.
 *
 * Shows cards with key metric, industry badge, and client name.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { CASE_STUDIES } from '@/lib/case-studies';
import { SERVICES } from '@/lib/services';
import { jsonLd, breadcrumbSchema, organizationSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Case Studies — Measurable Results for London Brands | Meridian',
  description: 'Real results from real London brands. Case studies across fintech, hospitality, legal, SaaS, beauty, and construction. Before-and-after metrics, client testimonials, and the strategies behind the numbers.',
  alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }} />

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
        <Link href="/audit" className="nav-cta">Get Free Audit &rarr;</Link>
      </header>

      <main className="wrap" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        <header style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 60px' }} className="reveal">
          <span className="section-eyebrow">PROVEN RESULTS</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            Case <span className="accent">studies</span>.
          </h1>
          <p className="section-sub">
            Real results from real London brands. Before-and-after metrics, the strategies behind the numbers,
            and the client testimonials to back them up.
          </p>
        </header>

        <div className="includes-grid" style={{ marginBottom: '80px' }}>
          {CASE_STUDIES.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="include-card"
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '3px 10px',
                  borderRadius: '100px',
                  background: 'var(--accent)',
                  color: '#000',
                }}>
                  {cs.industry}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{cs.service}</span>
              </div>
              <div style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, lineHeight: 1.2, color: 'var(--accent)' }}>
                {cs.title}
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{cs.client}</h2>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, flex: 1 }}>
                {cs.description.length > 140 ? cs.description.slice(0, 140) + '...' : cs.description}
              </p>
              <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>
                Read case study &rarr;
              </span>
            </Link>
          ))}
        </div>
      </main>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Want results like these?</h2>
            <p className="final-p">Get a free SEO audit or explore our pricing to get started.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Free SEO Audit &rarr;</Link>
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
              <p>London&apos;s boutique digital performance studio. Engineering compounding growth since 2014.</p>
            </div>
            <div className="footer-col"><h4>Services</h4><ul>{SERVICES.slice(0, 6).map(sv => (<li key={sv.slug}><Link href={`/services/${sv.slug}`}>{sv.shortName}</Link></li>))}</ul></div>
            <div className="footer-col"><h4>Company</h4><ul><li><Link href="/pricing">Pricing</Link></li><li><Link href="/reviews">Reviews</Link></li><li><Link href="/london">London</Link></li><li><Link href="/faq">FAQ</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
            <div className="footer-col"><h4>Get Started</h4><ul><li><Link href="/audit">Free SEO Audit</Link></li><li><Link href="/pricing">View Pricing</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Meridian Digital Ltd &middot; Company No. 09876543 &middot; 1 Finsbury Avenue, London EC2M 2PF</span>
            <span>Cyber Essentials Plus &middot; ISO 27001 &middot; GDPR Compliant</span>
          </div>
        </div>
      </footer>
      <div className="mobile-cta" role="complementary">
        <span className="mobile-cta-text">Free SEO audit, 90s.</span>
        <Link href="/audit" className="mobile-cta-btn">Get Audit &rarr;</Link>
      </div>
    </>
  );
}
