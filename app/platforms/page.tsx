/**
 * /platforms — Platform/technology index page.
 *
 * Lists all 15 platforms grouped by category (eCommerce, CMS, Mobile, etc.).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { PLATFORMS } from '@/lib/platforms';
import { SERVICES } from '@/lib/services';
import { jsonLd, breadcrumbSchema, organizationSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Platforms & Technologies — Shopify, WordPress, Flutter & More | Meridian',
  description: 'Meridian is a certified agency for Shopify, WordPress, Webflow, Flutter, React Native, HubSpot, Klaviyo and 8 more platforms. London expertise across every major technology stack.',
  alternates: { canonical: '/platforms' },
};

/** Group platforms by category. */
function groupByCategory(platforms: typeof PLATFORMS) {
  const groups: Record<string, typeof PLATFORMS> = {};
  for (const p of platforms) {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  }
  return groups;
}

export default function PlatformsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Platforms', url: '/platforms' },
  ]);

  const grouped = groupByCategory(PLATFORMS);
  const categoryOrder = ['eCommerce', 'CMS', 'Mobile', 'Framework', 'CRM', 'Email', 'Design'];
  const sortedCategories = categoryOrder.filter(c => grouped[c]);

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
          <span className="section-eyebrow">CERTIFIED EXPERTISE</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            Platforms &amp; <span className="accent">technologies</span>.
          </h1>
          <p className="section-sub">
            We are certified partners and deep practitioners across 15 platforms.
            We choose the right tool for the job, not the one we like building in.
          </p>
        </header>

        {sortedCategories.map((category) => (
          <section key={category} style={{ marginBottom: '60px' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', textAlign: 'left', marginBottom: '24px' }}>
              {category}
            </h2>
            <div className="includes-grid">
              {grouped[category].map((platform) => (
                <Link
                  key={platform.slug}
                  href={`/platforms/${platform.slug}`}
                  className="include-card"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '32px' }} aria-hidden="true">{platform.icon}</span>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>{platform.name}</h3>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, flex: 1 }}>
                    {platform.intro.length > 120 ? platform.intro.slice(0, 120) + '...' : platform.intro}
                  </p>
                  <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>
                    Learn more &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Not sure which platform is right?</h2>
            <p className="final-p">We help you choose the right technology for your business. No vendor bias.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary">Talk to Us &rarr;</Link>
              <Link href="/audit" className="btn btn-ghost">Free SEO Audit</Link>
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
