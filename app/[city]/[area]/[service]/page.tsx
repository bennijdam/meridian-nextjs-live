/**
 * /[city]/[area]/[service] — Service x city area pages (~528 pages).
 *
 * 4 cities x ~12 avg areas x 11 services = ~528 long-tail landing pages.
 * Each targets "[service] [area], [city]" keywords (KD 5–20)
 * e.g. "seo agency ancoats, manchester", "web design leith, edinburgh".
 *
 * Mirrors /services/[slug]/[borough] pattern: hero, stats, includes,
 * pricing, FAQ, cross-links, CTA.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CITIES, getCity, getCityArea, getAllCityAreas, type CityArea, type City } from '@/lib/cities';
import { SERVICES, getService, ALL_SERVICE_SLUGS, type Service } from '@/lib/services';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';

export function generateStaticParams() {
  const params: { city: string; area: string; service: string }[] = [];
  for (const cityArea of getAllCityAreas()) {
    for (const serviceSlug of ALL_SERVICE_SLUGS) {
      params.push({
        city: cityArea.citySlug,
        area: cityArea.areaSlug,
        service: serviceSlug,
      });
    }
  }
  return params;
}

export async function generateMetadata(
  { params }: { params: Promise<{ city: string; area: string; service: string }> }
): Promise<Metadata> {
  const { city, area, service } = await params;
  const c = getCity(city);
  const a = getCityArea(city, area);
  const s = getService(service);
  if (!c || !a || !s) return {};

  const title = `${s.shortName} in ${a.name}, ${c.name} | Meridian`;
  const description = `${s.shortName} for ${a.name}, ${c.name} businesses. ${s.intro} From ${s.priceFrom}/${s.priceUnit}. Free 90-second audit. 40% below market average.`;

  return {
    title,
    description,
    alternates: { canonical: `/${c.slug}/${a.slug}/${s.slug}` },
    openGraph: { title, description, url: `/${c.slug}/${a.slug}/${s.slug}`, type: 'website', locale: 'en_GB' },
  };
}

/** Generate area-specific FAQs for a service */
function serviceAreaFaqs(s: Service, a: CityArea, c: City) {
  return [
    { q: `How much does ${s.shortName.toLowerCase()} cost in ${a.name}, ${c.name}?`, a: `${s.shortName} starts from ${s.priceFrom} per ${s.priceUnit}. Meridian prices all services 40% below market average. No hidden fees, no minimum contracts beyond 90 days. ${s.cadence}.` },
    { q: `What's included in ${s.shortName.toLowerCase()} for ${a.name} businesses?`, a: s.bullets.slice(0, 3).join(' ') },
    { q: `How long does ${s.shortName.toLowerCase()} take to show results in ${a.name}?`, a: s.faqs[0]?.a || `Results timelines vary by scope. Area-level keywords for ${a.name} typically show faster gains than ${c.name}-wide hero terms due to lower competition.` },
    ...s.faqs.slice(0, 2),
  ];
}

export default async function CityAreaServicePage(
  { params }: { params: Promise<{ city: string; area: string; service: string }> }
) {
  const { city, area, service } = await params;
  const c = getCity(city);
  const a = getCityArea(city, area);
  const s = getService(service);
  if (!c || !a || !s) notFound();

  const faqs = serviceAreaFaqs(s, a, c);
  const neighbourAreas = c.areas.filter(x => x.slug !== a.slug).slice(0, 6);
  const otherServices = SERVICES.filter(x => x.slug !== s.slug);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: c.name, url: `/${c.slug}` },
    { name: a.name, url: `/${c.slug}/${a.slug}` },
    { name: s.shortName, url: `/${c.slug}/${a.slug}/${s.slug}` },
  ]);

  // Service schema adapted for this city area
  const cityServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://meridian.london/${c.slug}/${a.slug}/${s.slug}/#service`,
    "name": `${s.shortName} in ${a.name}, ${c.name}`,
    "description": `${s.shortName} for ${a.name}, ${c.name} businesses. ${s.intro}`,
    "url": `https://meridian.london/${c.slug}/${a.slug}/${s.slug}`,
    "provider": { "@id": "https://meridian.london/#organization" },
    "areaServed": {
      "@type": "Place",
      "name": `${a.name}, ${c.name}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": a.name,
        "addressRegion": c.name,
        "postalCode": a.postcodes[0],
        "addressCountry": "GB",
      },
    },
    "serviceType": s.shortName,
    "category": s.tag,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "GBP",
      "price": s.priceFrom.replace(/[\u00A3,]/g, ''),
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "GBP",
        "price": s.priceFrom.replace(/[\u00A3,]/g, ''),
        "unitText": `per ${s.priceUnit}`,
        "valueAddedTaxIncluded": false,
      },
      "availability": "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(cityServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(faqs)) }} />
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

      {/* ========================= HERO ========================= */}
      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>{s.tag} &middot; {a.postcodes[0]}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(44px,6.5vw,84px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            {s.shortName} in <span className="accent">{a.name}</span>, {c.name}.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>
            {s.intro} Tailored for {a.name}&apos;s {a.industries.slice(0, 2).join(' and ').toLowerCase()} businesses. <strong>From {s.priceFrom}/{s.priceUnit}</strong> &mdash; 40% below market average.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free SEO Audit &rarr;</Link>
            <Link href="/pricing" className="btn btn-ghost">See Pricing</Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              From {s.priceFrom}/{s.priceUnit}
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              4.9&#9733; &middot; 127 verified reviews
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              {a.industries[0]} specialists
            </span>
          </div>
        </div>
      </section>

      {/* ========================= STATS ========================= */}
      <section className="stats-strip">
        <div className="wrap">
          <div className="stats-grid reveal">
            <div className="stat-block"><div className="stat-num">+342%</div><div className="stat-label">Avg organic traffic uplift</div></div>
            <div className="stat-block"><div className="stat-num">94%</div><div className="stat-label">Client retention 24mo+</div></div>
            <div className="stat-block"><div className="stat-num">200+</div><div className="stat-label">UK brands served</div></div>
            <div className="stat-block"><div className="stat-num">2.1s</div><div className="stat-label">Avg LCP, sites we ship</div></div>
          </div>
        </div>
      </section>

      {/* ========================= WHAT'S INCLUDED ========================= */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">WHAT&apos;S INCLUDED</span>
            <h2 className="section-title">{s.shortName} in {a.name} &mdash; <span className="accent">what you get</span>.</h2>
          </div>
          <div className="includes-grid reveal">
            {s.bullets.map((bullet, i) => (
              <article key={i} className="include-card">
                <div className="include-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <p className="include-p">{bullet}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= PRICING TEASER ========================= */}
      <section id="pricing" style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING &middot; 40% BELOW MARKET</span>
            <h2 className="section-title">{s.shortName} pricing for <span className="accent">{a.name}, {c.name}</span>.</h2>
          </div>

          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <article className="include-card reveal" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '3px 10px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', fontSize: '10px', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>STARTING FROM</div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{s.tag}</div>
              <h3 className="include-h">{s.shortName} in {a.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '12px 0 4px' }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '48px', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, var(--ink), var(--ink-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{s.priceFrom}</span>
                <span style={{ fontSize: '14px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>/{s.priceUnit}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--ink-2)', marginBottom: '16px' }}>
                {s.cadence} &middot; <strong style={{ color: 'var(--accent-3)' }}>40% below market average</strong>
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {s.bullets.slice(0, 4).map((f, i) => (
                  <li key={i} style={{ fontSize: '13.5px', color: 'var(--ink-2)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent-3)', flexShrink: 0 }}>&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>View Full Pricing &rarr;</Link>
            </article>
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link href="/pricing" className="btn btn-ghost">View All Tiers &amp; Plans &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{s.shortName.toUpperCase()} IN {a.name.toUpperCase()}</span>
            <h2 className="section-title">Questions about {s.shortName.toLowerCase()} in <span className="accent">{a.name}</span>.</h2>
          </div>
          <div className="faq-list reveal">
            {faqs.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q">{f.q}</summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= SAME SERVICE, OTHER AREAS ========================= */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{s.shortName.toUpperCase()} ACROSS {c.name.toUpperCase()}</span>
            <h2 className="section-title">{s.shortName} in <span className="accent">other {c.name} areas</span>.</h2>
          </div>
          <div className="borough-track reveal">
            {neighbourAreas.map((n) => (
              <Link key={n.slug} href={`/${c.slug}/${n.slug}/${s.slug}`} className="borough">
                <span className="dot"></span>{s.shortName} in {n.name}
              </Link>
            ))}
            <Link href={`/${c.slug}`} className="borough featured">
              <span className="dot"></span>All {c.name} areas &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= OTHER SERVICES IN THIS AREA ========================= */}
      <section className="locations-section" style={{ paddingTop: '20px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">ALL SERVICES IN {a.name.toUpperCase()}</span>
            <h2 className="section-title">Other services in <span className="accent">{a.name}</span>.</h2>
          </div>
          <div className="borough-track reveal">
            {otherServices.map((o) => (
              <Link key={o.slug} href={`/${c.slug}/${a.slug}/${o.slug}`} className="borough">
                <span className="dot"></span>{o.shortName} in {a.name}
              </Link>
            ))}
            <Link href={`/${c.slug}/${a.slug}`} className="borough featured">
              <span className="dot"></span>All services in {a.name} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= LONDON EQUIVALENT CROSS-LINK ========================= */}
      <section className="locations-section" style={{ paddingTop: '20px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">ALSO IN LONDON</span>
            <h2 className="section-title">{s.shortName} in <span className="accent">London</span>.</h2>
          </div>
          <div className="borough-track reveal">
            <Link href={`/services/${s.slug}`} className="borough featured">
              <span className="dot"></span>{s.shortName} &mdash; London
            </Link>
            <Link href="/london" className="borough">
              <span className="dot"></span>All London boroughs
            </Link>
            {CITIES.filter(x => x.slug !== c.slug).map(oc => (
              <Link key={oc.slug} href={`/${oc.slug}`} className="borough">
                <span className="dot"></span>{oc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= FINAL CTA ========================= */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready for {s.shortName.toLowerCase()} in {a.name}?</h2>
            <p className="final-p">Free 90-second SEO audit. 12-page PDF with your top 10 quick wins. No call required, no obligation.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free Audit &rarr;</Link>
              <Link href="/contact" className="btn btn-ghost">Book a Call</Link>
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
              <p>UK digital performance studio. Engineering compounding growth since 2014.</p>
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

      <div className="mobile-cta" role="complementary">
        <span className="mobile-cta-text">Free SEO audit, 90s.</span>
        <Link href="/audit" className="mobile-cta-btn">Get Audit &rarr;</Link>
      </div>
    </>
  );
}
