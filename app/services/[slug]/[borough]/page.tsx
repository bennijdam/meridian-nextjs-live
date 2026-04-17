/**
 * /services/[slug]/[borough] — Service × borough matrix pages.
 *
 * 7 services × 44 boroughs = 308 long-tail landing pages.
 * Each targets "[service] [borough]" keywords (KD 15–35)
 * e.g. "seo agency shoreditch", "web design mayfair".
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES, getService, ALL_SERVICE_SLUGS, type Service } from '@/lib/services';
import { BOROUGHS, getBorough, ALL_BOROUGH_SLUGS, type Borough } from '@/lib/boroughs';
import { RETAINERS, PROJECTS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';

export function generateStaticParams() {
  const params: { slug: string; borough: string }[] = [];
  for (const slug of ALL_SERVICE_SLUGS) {
    for (const borough of ALL_BOROUGH_SLUGS) {
      params.push({ slug, borough });
    }
  }
  return params;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; borough: string }> }
): Promise<Metadata> {
  const { slug, borough } = await params;
  const s = getService(slug);
  const b = getBorough(borough);
  if (!s || !b) return {};

  const title = `${s.shortName} in ${b.name}, London | Meridian`;
  const description = `${s.shortName} for ${b.name} businesses. ${s.intro} From ${s.priceFrom}/${s.priceUnit}. Free 90-second audit. 40% below London market average.`;

  return {
    title,
    description,
    alternates: { canonical: `/services/${s.slug}/${b.slug}` },
    openGraph: { title, description, url: `/services/${s.slug}/${b.slug}`, type: 'website', locale: 'en_GB' },
  };
}

/** Get pricing for a service — returns the "popular" retainer or project */
function getServicePricing(s: Service) {
  const serviceSlugMap: Record<string, string> = {
    'seo-london': 'seo',
    'ppc-london': 'ppc',
    'web-design-london': 'web-design',
    'app-development-london': 'app-development',
    'social-media-london': 'social-media',
    'branding-london': 'branding',
    'business-plan-london': 'business-plans',
    'copywriting-london': 'copywriting',
    'email-marketing-london': 'email-marketing',
    'video-production-london': 'video-production',
    'ecommerce-london': 'ecommerce',
  };
  const pricingSlug = serviceSlugMap[s.slug] || '';
  const retainer = RETAINERS.find(r => r.serviceSlug === pricingSlug && r.popular);
  const project = PROJECTS.find(p => p.serviceSlug === pricingSlug && p.popular);
  return { retainer, project };
}

/** Generate borough-specific FAQs for a service */
function serviceBoroughFaqs(s: Service, b: Borough) {
  return [
    { q: `How much does ${s.shortName.toLowerCase()} cost in ${b.name}?`, a: `${s.shortName} starts from ${s.priceFrom} per ${s.priceUnit}. Meridian prices all services 40% below the London market average. No hidden fees, no minimum contracts beyond 90 days. ${s.cadence}.` },
    { q: `What's included in ${s.shortName.toLowerCase()} for ${b.name} businesses?`, a: s.bullets.slice(0, 3).join(' ') },
    { q: `How long does ${s.shortName.toLowerCase()} take to show results in ${b.name}?`, a: s.faqs[0]?.a || `Results timelines vary by scope. Borough-level keywords for ${b.name} typically show faster gains than London-wide hero terms due to lower competition.` },
    ...s.faqs.slice(0, 2),
  ];
}

export default async function ServiceBoroughPage(
  { params }: { params: Promise<{ slug: string; borough: string }> }
) {
  const { slug, borough } = await params;
  const s = getService(slug);
  const b = getBorough(borough);
  if (!s || !b) notFound();

  const { retainer, project } = getServicePricing(s);
  const faqs = serviceBoroughFaqs(s, b);
  const neighbourBoroughs = BOROUGHS.filter(x => x.slug !== b.slug).slice(0, 6);
  const otherServices = SERVICES.filter(x => x.slug !== s.slug);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: s.shortName, url: `/services/${s.slug}` },
    { name: b.name, url: `/services/${s.slug}/${b.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema(s)) }} />
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
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      {/* ========================= HERO ========================= */}
      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>{s.tag} · {b.postcodes[0]}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(44px,6.5vw,84px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            {s.shortName} in <span className="accent">{b.name}</span>.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>
            {s.intro} Tailored for {b.name}&apos;s {b.industries.slice(0, 2).join(' and ').toLowerCase()} businesses. <strong>From {s.priceFrom}/{s.priceUnit}</strong> — 40% below London market average.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free SEO Audit →</Link>
            <Link href="#pricing" className="btn btn-ghost">See Pricing</Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              From {s.priceFrom}/{s.priceUnit}
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              4.9★ · 127 verified reviews
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              {b.industries[0]} specialists
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
            <div className="stat-block"><div className="stat-num">200+</div><div className="stat-label">London brands served</div></div>
            <div className="stat-block"><div className="stat-num">2.1s</div><div className="stat-label">Avg LCP, sites we ship</div></div>
          </div>
        </div>
      </section>

      {/* ========================= WHAT'S INCLUDED ========================= */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">WHAT&apos;S INCLUDED</span>
            <h2 className="section-title">{s.shortName} in {b.name} — <span className="accent">what you get</span>.</h2>
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

      {/* ========================= PRICING ========================= */}
      <section id="pricing" style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
            <h2 className="section-title">{s.shortName} pricing for <span className="accent">{b.name}</span>.</h2>
          </div>

          {retainer && (
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <article className="include-card reveal" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '3px 10px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', fontSize: '10px', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>MOST POPULAR</div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{retainer.serviceName.toUpperCase()} · {retainer.tierName.toUpperCase()}</div>
                <h3 className="include-h">{s.shortName} in {b.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '12px 0 4px' }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '48px', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, var(--ink), var(--ink-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{formatGBP(retainer.paygMonthly)}</span>
                  <span style={{ fontSize: '14px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>/mo</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', marginBottom: '16px' }}>
                  vs <s style={{ color: 'var(--ink-3)' }}>{formatGBP(retainer.marketAvgMonthly)}</s> London market avg · <strong style={{ color: 'var(--accent-3)' }}>save {calcSavingsVsMarket(retainer.paygMonthly, retainer.marketAvgMonthly)}%</strong>
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {retainer.features.slice(0, 5).map((f, i) => (
                    <li key={i} style={{ fontSize: '13.5px', color: 'var(--ink-2)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent-3)', flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/pricing?service=${retainer.serviceSlug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get Started →</Link>
              </article>
            </div>
          )}

          {project && !retainer && (
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <article className="include-card reveal">
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{project.serviceName.toUpperCase()} · {project.tierName.toUpperCase()}</div>
                <h3 className="include-h">{s.shortName} in {b.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '12px 0 4px' }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '48px', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, var(--ink), var(--ink-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{formatGBP(project.price)}</span>
                  <span style={{ fontSize: '14px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>fixed</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', marginBottom: '16px' }}>
                  vs <s style={{ color: 'var(--ink-3)' }}>{formatGBP(project.marketAvg)}</s> market avg · <strong style={{ color: 'var(--accent-3)' }}>save {calcSavingsVsMarket(project.price, project.marketAvg)}%</strong>
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {project.features.slice(0, 5).map((f, i) => (
                    <li key={i} style={{ fontSize: '13.5px', color: 'var(--ink-2)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent-3)', flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/pricing?service=${project.serviceSlug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get Started →</Link>
              </article>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link href="/pricing" className="btn btn-ghost">View All Tiers & Plans →</Link>
          </div>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{s.shortName.toUpperCase()} IN {b.name.toUpperCase()}</span>
            <h2 className="section-title">Questions about {s.shortName.toLowerCase()} in <span className="accent">{b.name}</span>.</h2>
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

      {/* ========================= OTHER BOROUGHS FOR THIS SERVICE ========================= */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{s.shortName.toUpperCase()} ACROSS LONDON</span>
            <h2 className="section-title">{s.shortName} in <span className="accent">other boroughs</span>.</h2>
          </div>
          <div className="borough-track reveal">
            {neighbourBoroughs.map((n) => (
              <Link key={n.slug} href={`/services/${s.slug}/${n.slug}`} className={`borough${n.featured ? ' featured' : ''}`}>
                <span className="dot"></span>{s.shortName} in {n.name}
              </Link>
            ))}
            <Link href={`/services/${s.slug}`} className="borough featured">
              <span className="dot"></span>{s.shortName} — all boroughs →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= OTHER SERVICES IN THIS BOROUGH ========================= */}
      <section className="locations-section" style={{ paddingTop: '20px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">ALL SERVICES IN {b.name.toUpperCase()}</span>
            <h2 className="section-title">Other services in <span className="accent">{b.name}</span>.</h2>
          </div>
          <div className="borough-track reveal">
            {otherServices.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}/${b.slug}`} className="borough">
                <span className="dot"></span>{o.shortName} in {b.name}
              </Link>
            ))}
            <Link href={`/london/${b.slug}`} className="borough featured">
              <span className="dot"></span>All services in {b.name} →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= FINAL CTA ========================= */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready for {s.shortName.toLowerCase()} in {b.name}?</h2>
            <p className="final-p">Free 90-second SEO audit. 12-page PDF with your top 10 quick wins. No call required, no obligation.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
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
