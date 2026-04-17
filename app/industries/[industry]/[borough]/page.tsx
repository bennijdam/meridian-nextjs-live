/**
 * /industries/[industry]/[borough] — Industry × borough matrix.
 * 15 industries × 44 boroughs = 660 ultra-long-tail pages.
 * Targets: "fintech marketing shoreditch", "healthcare seo marylebone" etc.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { INDUSTRIES, getIndustry, ALL_INDUSTRY_SLUGS } from '@/lib/industries';
import { BOROUGHS, getBorough, ALL_BOROUGH_SLUGS } from '@/lib/boroughs';
import { SERVICES } from '@/lib/services';
import { RETAINERS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export function generateStaticParams() {
  const params: { industry: string; borough: string }[] = [];
  for (const industry of ALL_INDUSTRY_SLUGS) {
    for (const borough of ALL_BOROUGH_SLUGS) {
      params.push({ industry, borough });
    }
  }
  return params;
}

export async function generateMetadata(
  { params }: { params: Promise<{ industry: string; borough: string }> }
): Promise<Metadata> {
  const { industry, borough } = await params;
  const ind = getIndustry(industry);
  const b = getBorough(borough);
  if (!ind || !b) return {};
  const title = `${ind.shortName} Digital Marketing in ${b.name}, London | Meridian`;
  const description = `${ind.shortName} SEO, PPC, web design and digital marketing for ${b.name} businesses. 40% below London market rate. Free audit.`;
  return {
    title, description,
    alternates: { canonical: `/industries/${ind.slug}/${b.slug}` },
    openGraph: { title, description, url: `/industries/${ind.slug}/${b.slug}`, type: 'website', locale: 'en_GB' },
  };
}

export default async function IndustryBoroughPage(
  { params }: { params: Promise<{ industry: string; borough: string }> }
) {
  const { industry, borough } = await params;
  const ind = getIndustry(industry);
  const b = getBorough(borough);
  if (!ind || !b) notFound();

  const relatedServices = SERVICES.filter(s => ind.relatedServices.includes(s.slug)).slice(0, 4);
  const popularRetainers = RETAINERS.filter(r => r.popular).slice(0, 3);
  const neighbourBoroughs = BOROUGHS.filter(x => x.slug !== b.slug).slice(0, 6);
  const otherIndustries = INDUSTRIES.filter(i => i.slug !== ind.slug).slice(0, 6);

  // Pick image based on industry
  const imageMap: Record<string, string> = {
    fintech: 'seo-search-optimisation', saas: 'digital-marketing-team', healthcare: 'ux-ui-design',
    ecommerce: 'web-hosting-domain', property: 'branding-strategy', legal: 'branding-strategy',
    hospitality: 'social-media-management', education: 'ux-ui-design',
  };
  const heroImage = imageMap[ind.slug] || 'digital-marketing-team';

  const faqs = [
    { q: `How much does ${ind.shortName.toLowerCase()} marketing cost in ${b.name}?`, a: `${ind.shortName} digital marketing retainers start from £490/month. Meridian prices all services 40% below the London market average. We have experience with ${ind.shortName.toLowerCase()} businesses in ${b.name} and across London.` },
    { q: `Which services do ${ind.shortName.toLowerCase()} businesses in ${b.name} need most?`, a: `Most ${ind.shortName.toLowerCase()} businesses in ${b.name} start with ${relatedServices.map(s => s.shortName.toLowerCase()).join(', ')}. We recommend starting with a free audit to identify your highest-impact opportunities.` },
    { q: `Do you have experience with ${ind.shortName.toLowerCase()} companies?`, a: `Yes. ${ind.shortName} is one of our core verticals. ${ind.intro.slice(0, 150)}.` },
  ];

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Industries', url: '/industries' },
    { name: ind.shortName, url: `/industries/${ind.slug}` },
    { name: b.name, url: `/industries/${ind.slug}/${b.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />

      <header role="banner">
        <Link href="/" className="logo" aria-label="Meridian — home"><span className="logo-mark" aria-hidden="true"></span><span>Meridian</span></Link>
        <nav role="navigation" aria-label="Primary"><Link href="/services">Services</Link><Link href="/pricing">Pricing</Link><Link href="/audit">Free Audit</Link><Link href="/reviews">Reviews</Link><Link href="/london">London</Link><Link href="/faq">FAQ</Link></nav>
        <button className="theme-toggle" id="themeToggle" aria-label="Toggle light/dark theme" type="button"><svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg><svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></button>
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      {/* Hero */}
      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>{ind.icon} {ind.shortName.toUpperCase()} · {b.postcodes[0]}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(40px,6vw,76px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            {ind.shortName} marketing in <span className="accent">{b.name}</span>.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>
            Specialist {ind.name.toLowerCase()} digital marketing for {b.name} businesses. SEO, PPC, web design and more — <strong>40% below London market rate</strong>.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
            <Link href="#services" className="btn btn-ghost">Our Services</Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>{ind.shortName} specialists</span>
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>4.9★ verified</span>
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>40% below market</span>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section style={{ padding: '0 0 40px' }}>
        <div className="wrap" style={{ maxWidth: '900px' }}>
          <div className="hero-image-section reveal">
            <picture>
              <source type="image/avif" srcSet={`/img/${heroImage}-480w.avif 480w, /img/${heroImage}-768w.avif 768w, /img/${heroImage}-1200w.avif 1200w`} sizes="(min-width: 900px) 900px, 100vw" />
              <source type="image/webp" srcSet={`/img/${heroImage}-480w.webp 480w, /img/${heroImage}-768w.webp 768w, /img/${heroImage}-1200w.webp 1200w`} sizes="(min-width: 900px) 900px, 100vw" />
              <img src={`/img/${heroImage}-1200w.webp`} alt={`${ind.shortName} digital marketing in ${b.name}`} width="900" height="400" loading="eager" />
            </picture>
            <div className="img-stat-badge" style={{ bottom: '20px', left: '20px', animation: 'float1 6s ease-in-out infinite' }}>
              <div><div className="badge-num">{ind.icon} {ind.shortName}</div><div className="badge-cap">{b.name}</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for this industry in this borough */}
      <section id="services" className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">SERVICES</span>
            <h2 className="section-title">{ind.shortName} services in <span className="accent">{b.name}</span>.</h2>
          </div>
          <div className="includes-grid stagger-grid reveal">
            {relatedServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/${b.slug}`} className="include-card" style={{ cursor: 'pointer' }}>
                <div className="include-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
                <h3 className="include-h">{s.shortName} for {ind.shortName}</h3>
                <p className="include-p">{s.intro}</p>
                <span style={{ fontSize: '13px', color: 'var(--accent)', marginTop: '12px', display: 'block' }}>From {s.priceFrom}/{s.priceUnit} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
            <h2 className="section-title">{ind.shortName} pricing in <span className="accent">{b.name}</span>.</h2>
          </div>
          <div className="includes-grid stagger-grid reveal">
            {popularRetainers.map((r) => (
              <div key={r.id} className="cost-card">
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', marginBottom: '6px' }}>{r.serviceName.toUpperCase()} · {r.tierName.toUpperCase()}</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '4px' }}>{r.serviceName} for {ind.shortName}</h3>
                <div className="cost-price" style={{ fontSize: '36px' }}>{formatGBP(r.paygMonthly)}<span style={{ fontSize: '14px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>/mo</span></div>
                <div className="cost-market">vs <s>{formatGBP(r.marketAvgMonthly)}</s> · <strong>save {calcSavingsVsMarket(r.paygMonthly, r.marketAvgMonthly)}%</strong></div>
                <Link href={`/pricing?service=${r.serviceSlug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px', marginTop: '16px' }}>Get Started →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: '540px' }}>
          <div className="reveal">
            <LeadCaptureForm
              source={`industry-borough-${ind.slug}-${b.slug}`}
              heading={`Free ${ind.shortName} audit for ${b.name}`}
              subtext={`We'll audit your site against top ${ind.shortName.toLowerCase()} competitors in ${b.name}. 12-page PDF in 90 seconds.`}
              dark
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">FAQ</span><h2 className="section-title">{ind.shortName} in {b.name} — <span className="accent">questions</span>.</h2></div>
          <div className="faq-list reveal">
            {faqs.map((f, i) => (<details key={i} className="faq-item"><summary className="faq-q">{f.q}</summary><div className="faq-a">{f.a}</div></details>))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">{ind.shortName.toUpperCase()} IN OTHER BOROUGHS</span><h2 className="section-title">{ind.shortName} in <span className="accent">other areas</span>.</h2></div>
          <div className="borough-track reveal">
            {neighbourBoroughs.map((n) => (<Link key={n.slug} href={`/industries/${ind.slug}/${n.slug}`} className={`borough${n.featured ? ' featured' : ''}`}><span className="dot"></span>{ind.shortName} in {n.name}</Link>))}
            <Link href={`/industries/${ind.slug}`} className="borough featured"><span className="dot"></span>All {ind.shortName} areas →</Link>
          </div>
        </div>
      </section>

      <section className="locations-section" style={{ paddingTop: '20px' }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">OTHER INDUSTRIES IN {b.name.toUpperCase()}</span><h2 className="section-title">Other industries in <span className="accent">{b.name}</span>.</h2></div>
          <div className="borough-track reveal">
            {otherIndustries.map((i) => (<Link key={i.slug} href={`/industries/${i.slug}/${b.slug}`} className="borough"><span className="dot"></span>{i.shortName} in {b.name}</Link>))}
            <Link href={`/london/${b.slug}`} className="borough featured"><span className="dot"></span>All services in {b.name} →</Link>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap"><div className="final-card reveal">
          <h2 className="final-h">{ind.shortName} in {b.name}. Sorted.</h2>
          <p className="final-p">Free audit tailored for {ind.name.toLowerCase()} businesses. No obligation.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}><Link href="/audit" className="btn btn-primary">Get Free Audit →</Link><Link href="/contact" className="btn btn-ghost">Book a Call</Link></div>
        </div></div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
      <div className="mobile-cta" role="complementary"><span className="mobile-cta-text">Free SEO audit, 90s.</span><Link href="/audit" className="mobile-cta-btn">Get Audit →</Link></div>
    </>
  );
}
