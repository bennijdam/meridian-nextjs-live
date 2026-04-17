/**
 * /targeted/[combo] — Triple matrix (service × industry × borough) pages.
 *
 * 20 strategic service+industry pairs × 10 top-tier London boroughs = 200
 * ultra-long-tail pages. Targets queries like:
 *   - "fintech seo agency shoreditch"
 *   - "saas web design canary wharf"
 *   - "ecommerce ppc mayfair"
 *
 * Combo slug format: "{serviceRoot}-{industry}-{borough}"
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ALL_TARGETED_SLUGS,
  getTargeted,
  sameServiceIndustryOtherBoroughs,
  sameIndustryBoroughOtherServices,
  sameServiceBoroughOtherIndustries,
} from '@/lib/targeted';
import { SERVICES } from '@/lib/services';
import { RETAINERS, PROJECTS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import {
  serviceSchema, faqSchema, breadcrumbSchema, jsonLd,
} from '@/lib/schema';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export function generateStaticParams() {
  return ALL_TARGETED_SLUGS.map(combo => ({ combo }));
}

/** Map a full service slug (e.g. "seo-london") to the pricing serviceSlug
 *  used in lib/pricing.ts (e.g. "seo"). */
const PRICING_SLUG_MAP: Record<string, string> = {
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

export async function generateMetadata(
  { params }: { params: Promise<{ combo: string }> }
): Promise<Metadata> {
  const { combo } = await params;
  const c = getTargeted(combo);
  if (!c) return {};
  const { service: s, industry: ind, borough: b } = c;
  const title = `${s.shortName} for ${ind.shortName} in ${b.name}, London | Meridian`;
  const description = `${s.shortName} for ${ind.name.toLowerCase()} businesses in ${b.name}. Specialist ${ind.shortName.toLowerCase()} experience, ${b.name} coverage, from ${s.priceFrom}/${s.priceUnit}. 40% below London market. Free audit.`;
  return {
    title,
    description,
    alternates: { canonical: `/targeted/${combo}` },
    openGraph: {
      title,
      description,
      url: `/targeted/${combo}`,
      type: 'website',
      locale: 'en_GB',
    },
  };
}

export default async function TargetedPage(
  { params }: { params: Promise<{ combo: string }> }
) {
  const { combo } = await params;
  const c = getTargeted(combo);
  if (!c) notFound();
  const { service: s, industry: ind, borough: b } = c;

  const pricingSlug = PRICING_SLUG_MAP[s.slug] || '';
  const retainer = RETAINERS.find(r => r.serviceSlug === pricingSlug && r.popular)
    || RETAINERS.find(r => r.serviceSlug === pricingSlug);
  const project = PROJECTS.find(p => p.serviceSlug === pricingSlug && p.popular)
    || PROJECTS.find(p => p.serviceSlug === pricingSlug);

  const boroughIndustryLine = b.industries.slice(0, 2).join(' and ').toLowerCase();

  const faqs = [
    {
      q: `How much does ${s.shortName.toLowerCase()} for ${ind.shortName.toLowerCase()} cost in ${b.name}?`,
      a: `${s.shortName} for ${ind.name.toLowerCase()} businesses in ${b.name} starts from ${s.priceFrom} per ${s.priceUnit}. Meridian prices all services 40% below the London market average. ${s.cadence}.`,
    },
    {
      q: `Why hire a ${s.shortName.toLowerCase()} specialist for ${ind.shortName.toLowerCase()} in ${b.name}?`,
      a: `${ind.shortName} businesses in ${b.name} face specific competitive, regulatory and audience dynamics that a generalist agency won't understand. We've served ${ind.stats[0]?.num || '40+'} ${ind.shortName.toLowerCase()} clients and work inside ${b.name}'s ${boroughIndustryLine} cluster every week.`,
    },
    {
      q: `How quickly can ${s.shortName.toLowerCase()} show results for a ${ind.shortName.toLowerCase()} business in ${b.name}?`,
      a: `Borough-level keywords for ${b.name} typically show gains in 6-8 weeks. For ${ind.shortName.toLowerCase()}-specific commercial terms in ${b.name}, expect meaningful traction in 3-4 months and full ROI by month 9-12.`,
    },
    {
      q: `Do you have ${ind.shortName} experience?`,
      a: `Yes. ${ind.shortName} is one of our core verticals — ${ind.stats[0]?.num || 'dozens of'} clients served. ${ind.faqs[0]?.a || ''}`,
    },
    {
      q: `Which other ${ind.shortName.toLowerCase()} services does Meridian offer in ${b.name}?`,
      a: `Alongside ${s.shortName.toLowerCase()}, we offer ${ind.relatedServices.slice(0, 3).map(sl => SERVICES.find(x => x.slug === sl)?.shortName || sl).filter(Boolean).join(', ')} — all tailored to ${ind.shortName.toLowerCase()} businesses in ${b.name}.`,
    },
    ...s.faqs.slice(0, 1),
  ];

  const otherBoroughs = sameServiceIndustryOtherBoroughs(c).slice(0, 8);
  const otherServices = sameIndustryBoroughOtherServices(c).slice(0, 6);
  const otherIndustries = sameServiceBoroughOtherIndustries(c).slice(0, 6);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Targeted', url: '/targeted' },
    { name: `${s.shortName} · ${ind.shortName} · ${b.name}`, url: `/targeted/${combo}` },
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
          <span className="service-eyebrow">
            <span className="pulse"></span>
            {s.tag} · {ind.icon} {ind.shortName.toUpperCase()} · {b.postcodes[0]}
          </span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(36px,5.5vw,68px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            {s.shortName} for <span className="accent">{ind.shortName.toLowerCase()}</span> in {b.name}.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '680px', textAlign: 'center' }}>
            Specialist {s.shortName.toLowerCase()} for {ind.name.toLowerCase()} businesses in {b.name}. {b.tagline}. <strong>From {s.priceFrom}/{s.priceUnit}</strong> — 40% below London market average.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
            <Link href="#pricing" className="btn btn-ghost">See Pricing</Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              {ind.shortName} specialists
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              {b.name} coverage
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              40% below market
            </span>
          </div>
        </div>
      </section>

      {/* ========================= STATS (from industry) ========================= */}
      <section className="stats-strip">
        <div className="wrap">
          <div className="stats-grid reveal">
            {ind.stats.slice(0, 4).map((st, i) => (
              <div key={i} className="stat-block">
                <div className="stat-num">{st.num}</div>
                <div className="stat-label">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= WHAT'S INCLUDED ========================= */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">WHAT YOU GET</span>
            <h2 className="section-title">
              {s.shortName} for {ind.shortName.toLowerCase()} in <span className="accent">{b.name}</span>.
            </h2>
          </div>
          <div className="includes-grid stagger-grid reveal">
            {s.bullets.slice(0, 6).map((bullet, i) => (
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

      {/* ========================= BOROUGH CONTEXT ========================= */}
      <section style={{ padding: '60px 0' }}>
        <div className="wrap" style={{ maxWidth: '760px' }}>
          <div className="reveal">
            <span className="section-eyebrow">{b.name.toUpperCase()} CONTEXT</span>
            <h2 className="section-title" style={{ marginTop: '8px', marginBottom: '16px' }}>
              Why <span className="accent">{b.name}</span> for {ind.shortName.toLowerCase()}.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.7 }}>
              {b.intro}
            </p>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.7, marginTop: '14px' }}>
              {ind.intro}
            </p>
          </div>
        </div>
      </section>

      {/* ========================= PRICING ========================= */}
      <section id="pricing" style={{ padding: '60px 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
            <h2 className="section-title">
              {s.shortName} for {ind.shortName.toLowerCase()} in <span className="accent">{b.name}</span>.
            </h2>
          </div>
          {retainer ? (
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <article className="include-card reveal" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '3px 10px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', fontSize: '10px', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>MOST POPULAR</div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  {retainer.serviceName.toUpperCase()} · {retainer.tierName.toUpperCase()} · {ind.shortName.toUpperCase()}
                </div>
                <h3 className="include-h">{s.shortName} for {ind.shortName.toLowerCase()} · {b.name}</h3>
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
          ) : project ? (
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <article className="include-card reveal">
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  {project.serviceName.toUpperCase()} · {project.tierName.toUpperCase()} · {ind.shortName.toUpperCase()}
                </div>
                <h3 className="include-h">{s.shortName} for {ind.shortName.toLowerCase()} · {b.name}</h3>
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
          ) : null}
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link href="/pricing" className="btn btn-ghost">View All Tiers & Plans →</Link>
          </div>
        </div>
      </section>

      {/* ========================= LEAD CAPTURE ========================= */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="wrap" style={{ maxWidth: '540px' }}>
          <div className="reveal">
            <LeadCaptureForm
              source={`targeted-${s.slug}-${ind.slug}-${b.slug}`}
              heading={`Free ${ind.shortName.toLowerCase()} audit for ${b.name}`}
              subtext={`Benchmarked against ${ind.shortName.toLowerCase()} competitors in ${b.name}. Delivered in 90 seconds.`}
              dark
            />
          </div>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{s.shortName.toUpperCase()} · {ind.shortName.toUpperCase()} · {b.name.toUpperCase()}</span>
            <h2 className="section-title">
              Questions <span className="accent">answered</span>.
            </h2>
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

      {/* ========================= CROSS-LINKS: SAME SERVICE+INDUSTRY, OTHER BOROUGHS ========================= */}
      {otherBoroughs.length > 0 && (
        <section className="locations-section">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="section-eyebrow">{s.shortName.toUpperCase()} · {ind.shortName.toUpperCase()} · OTHER BOROUGHS</span>
              <h2 className="section-title">
                {s.shortName} for {ind.shortName.toLowerCase()} in <span className="accent">other boroughs</span>.
              </h2>
            </div>
            <div className="borough-track reveal">
              {otherBoroughs.map(x => (
                <Link key={x.slug} href={`/targeted/${x.slug}`} className={`borough${x.borough.featured ? ' featured' : ''}`}>
                  <span className="dot"></span>{x.borough.name}
                </Link>
              ))}
              <Link href={`/services/${s.slug}`} className="borough featured">
                <span className="dot"></span>{s.shortName} — all London →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========================= CROSS-LINKS: SAME INDUSTRY+BOROUGH, OTHER SERVICES ========================= */}
      {otherServices.length > 0 && (
        <section className="locations-section" style={{ paddingTop: '20px' }}>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="section-eyebrow">OTHER SERVICES · {ind.shortName.toUpperCase()} · {b.name.toUpperCase()}</span>
              <h2 className="section-title">
                Other services for {ind.shortName.toLowerCase()} in <span className="accent">{b.name}</span>.
              </h2>
            </div>
            <div className="borough-track reveal">
              {otherServices.map(x => (
                <Link key={x.slug} href={`/targeted/${x.slug}`} className="borough">
                  <span className="dot"></span>{x.service.shortName}
                </Link>
              ))}
              <Link href={`/industries/${ind.slug}/${b.slug}`} className="borough featured">
                <span className="dot"></span>All {ind.shortName.toLowerCase()} services · {b.name} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========================= CROSS-LINKS: SAME SERVICE+BOROUGH, OTHER INDUSTRIES ========================= */}
      {otherIndustries.length > 0 && (
        <section className="locations-section" style={{ paddingTop: '20px' }}>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="section-eyebrow">{s.shortName.toUpperCase()} · {b.name.toUpperCase()} · OTHER INDUSTRIES</span>
              <h2 className="section-title">
                {s.shortName} in {b.name} for <span className="accent">other industries</span>.
              </h2>
            </div>
            <div className="borough-track reveal">
              {otherIndustries.map(x => (
                <Link key={x.slug} href={`/targeted/${x.slug}`} className="borough">
                  <span className="dot"></span>{x.industry.shortName}
                </Link>
              ))}
              <Link href={`/services/${s.slug}/${b.slug}`} className="borough featured">
                <span className="dot"></span>{s.shortName} in {b.name} — all industries →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========================= FINAL CTA ========================= */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready for {s.shortName.toLowerCase()} for {ind.shortName.toLowerCase()} in {b.name}?</h2>
            <p className="final-p">Free audit. No obligation. 40% below London market average.</p>
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
                <li><Link href="/targeted">All Targeted Pages</Link></li>
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
