/**
 * /[city] — City hub pages (Manchester, Edinburgh, Birmingham, Bristol).
 *
 * Mirrors the /london page pattern: hero, area listing, services overview,
 * how-it-works, CTA. Each city lists its 10-15 areas with links.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CITIES, getCity, ALL_CITY_SLUGS } from '@/lib/cities';
import { SERVICES } from '@/lib/services';
import { jsonLd, breadcrumbSchema } from '@/lib/schema';

export function generateStaticParams() {
  return ALL_CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ city: string }> }
): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `/${c.slug}`,
      type: 'website',
      locale: 'en_GB',
    },
  };
}

export default async function CityHubPage(
  { params }: { params: Promise<{ city: string }> }
) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: c.name, url: `/${c.slug}` },
  ]);

  const otherCities = CITIES.filter(x => x.slug !== c.slug);

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
        <Link href="/audit" className="nav-cta">Get Free Audit &rarr;</Link>
      </header>

      <main className="wrap" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        {/* HERO */}
        <header style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 60px' }} className="reveal">
          <span className="section-eyebrow">LOCATIONS &middot; {c.name.toUpperCase()}</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)' }}>
            Digital marketing in <span className="accent">{c.name}</span>.<br/>London quality. Local knowledge.
          </h1>
          <p className="section-sub">
            {c.intro}
          </p>
          <div className="cta-row" style={{ justifyContent: 'center', marginTop: '32px' }}>
            <Link href="/#audit" className="btn btn-primary">Get Free SEO Audit</Link>
            <Link href="/services" className="btn btn-ghost">See services</Link>
          </div>
        </header>

        {/* ALL AREAS */}
        <section style={{ marginBottom: '80px' }}>
          <div className="section-head reveal" style={{ textAlign: 'left', marginBottom: '32px' }}>
            <span className="section-eyebrow">AREAS WE COVER</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              {c.areas.length} areas across <span className="accent">{c.name}</span>
            </h2>
            <p className="section-sub" style={{ textAlign: 'left' }}>
              Every area gets the same senior team. Local SEO, paid media, web design and more &mdash; calibrated to your neighbourhood.
            </p>
          </div>
          <div className="featured-borough-grid reveal">
            {c.areas.map(a => (
              <Link key={a.slug} href={`/${c.slug}/${a.slug}`} className="featured-borough-card">
                <div className="fbc-postcode">{a.postcodes.join(' \u00B7 ')}</div>
                <h3 className="fbc-name">{a.name}</h3>
                <p className="fbc-tagline">{a.tagline}</p>
                <div className="fbc-arrow">&rarr;</div>
              </Link>
            ))}
          </div>
        </section>

        {/* SERVICES AVAILABLE */}
        <section style={{ marginBottom: '80px' }}>
          <div className="section-head reveal" style={{ textAlign: 'left', marginBottom: '32px' }}>
            <span className="section-eyebrow">SERVICES IN {c.name.toUpperCase()}</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Everything your {c.name} business needs
            </h2>
          </div>
          <div className="borough-track reveal" style={{ justifyContent: 'flex-start' }}>
            {SERVICES.map(s => (
              <Link key={s.slug} href={`/${c.slug}/${c.areas[0].slug}/${s.slug}`} className="borough">
                <span className="dot"></span>{s.shortName}
              </Link>
            ))}
          </div>
        </section>

        {/* HOW LOCAL SEO WORKS */}
        <section className="why-section">
          <div className="section-head reveal" style={{ marginBottom: '32px' }}>
            <span className="section-eyebrow">WHY {c.name.toUpperCase()}</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              How area-level SEO wins in {c.name}
            </h2>
          </div>
          <div className="why-grid reveal">
            <div className="why-card">
              <div className="why-num">3-pack</div>
              <div className="why-label">Win the Google Business Profile 3-pack for &quot;[service] [your area]&quot; &mdash; the highest-converting placement on the SERP.</div>
            </div>
            <div className="why-card">
              <div className="why-num">KD&nbsp;5-20</div>
              <div className="why-label">Area-level keywords in {c.name} are significantly lower difficulty than city-wide terms &mdash; same intent, far less competition.</div>
            </div>
            <div className="why-card">
              <div className="why-num">4-6&nbsp;wks</div>
              <div className="why-label">Typical time to ranking for {c.name} area long-tail keywords. Compounds together with city-wide terms.</div>
            </div>
            <div className="why-card">
              <div className="why-num">+4-7x</div>
              <div className="why-label">Conversion rate uplift on area-targeted landing pages vs generic city pages. Local intent = qualified buyer.</div>
            </div>
          </div>
        </section>

        {/* OTHER CITIES */}
        <section style={{ marginBottom: '80px' }}>
          <div className="section-head reveal" style={{ textAlign: 'left', marginBottom: '32px' }}>
            <span className="section-eyebrow">UK COVERAGE</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Also covering <span className="accent">London</span> and more
            </h2>
          </div>
          <div className="borough-track reveal" style={{ justifyContent: 'flex-start' }}>
            <Link href="/london" className="borough featured">
              <span className="dot"></span>London
            </Link>
            {otherCities.map(oc => (
              <Link key={oc.slug} href={`/${oc.slug}`} className="borough">
                <span className="dot"></span>{oc.name}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="final-cta" style={{ padding: '60px 0' }}>
          <div className="final-card reveal">
            <h2 className="final-h">Ready to dominate {c.name} search?</h2>
            <p className="final-p">Free 90-second SEO audit. 12-page PDF with your top 10 quick wins. No call required, no obligation.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free SEO Audit &rarr;</Link>
              <Link href="/contact" className="btn btn-ghost">Book a Call</Link>
            </div>
          </div>
        </section>
      </main>

      {/* ========================= FOOTER ========================= */}
      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <Link href="/" className="logo">
                <span className="logo-mark"></span>
                <span>Meridian</span>
              </Link>
              <p>UK digital performance studio. Engineering compounding growth across SEO, PPC, web, app and social since 2014.</p>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><Link href="/services/seo-london">SEO</Link></li>
                <li><Link href="/services/ppc-london">PPC</Link></li>
                <li><Link href="/services/web-design-london">Web Design</Link></li>
                <li><Link href="/services/app-development-london">App Development</Link></li>
                <li><Link href="/services/social-media-london">Social Media</Link></li>
                <li><Link href="/services/branding-london">Branding</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Locations</h4>
              <ul>
                <li><Link href="/london">London</Link></li>
                {CITIES.map(ct => (
                  <li key={ct.slug}><Link href={`/${ct.slug}`}>{ct.name}</Link></li>
                ))}
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
            <span>&copy; 2026 Meridian Digital Ltd &middot; Company No. 09876543 &middot; 1 Finsbury Avenue, London EC2M 2PF</span>
            <span>Cyber Essentials Plus &middot; ISO 27001 &middot; GDPR Compliant</span>
          </div>
        </div>
      </footer>

      {/* ========================= MOBILE BOTTOM CTA ========================= */}
      <div className="mobile-cta" role="complementary">
        <span className="mobile-cta-text">Free SEO audit, 90s.</span>
        <Link href="/audit" className="mobile-cta-btn">Get Audit &rarr;</Link>
      </div>
    </>
  );
}
