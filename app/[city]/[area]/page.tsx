/**
 * /[city]/[area] — City x area pages (~49 pages).
 *
 * Mirrors /london/[borough] pattern: hero with area info, stats strip,
 * industries, services grid, methodology, FAQ, nearby areas, CTA.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CITIES, getCity, getCityArea, getAllCityAreas } from '@/lib/cities';
import { SERVICES } from '@/lib/services';
import { RETAINERS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { breadcrumbSchema, faqSchema, jsonLd } from '@/lib/schema';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import InternalLinks from '@/components/InternalLinks';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meridianweb.co.uk';

export function generateStaticParams() {
  return getAllCityAreas().map(({ citySlug, areaSlug }) => ({
    city: citySlug,
    area: areaSlug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ city: string; area: string }> }
): Promise<Metadata> {
  const { city, area } = await params;
  const c = getCity(city);
  const a = getCityArea(city, area);
  if (!c || !a) return {};

  const title = `Digital Marketing Agency in ${a.name}, ${c.name} | SEO, PPC, Web & App | Meridian`;
  const description = `${a.tagline}. Meridian delivers SEO, PPC, web design, app development and social media for ${a.name} businesses. Free 90-second SEO audit. 40% below market rate.`;

  return {
    title,
    description,
    alternates: { canonical: `/${c.slug}/${a.slug}` },
    openGraph: {
      title,
      description,
      url: `/${c.slug}/${a.slug}`,
      type: 'website',
      locale: 'en_GB',
    },
  };
}

function areaFaqs(areaName: string, cityName: string) {
  return [
    { q: `How much does digital marketing cost in ${areaName}, ${cityName}?`, a: `Digital marketing retainers typically start at \u00A32,500/month for SEO and PPC. Project-based work like web design starts from \u00A38,500. Meridian prices all services 40% below market average with transparent pricing \u2014 no hidden fees, no minimum contracts beyond 90 days.` },
    { q: `Which services do you offer in ${areaName}?`, a: `We deliver the full digital stack: SEO (including AI Overview and ChatGPT citation engineering), PPC and paid media, web design and development, app development, social media management, branding, copywriting, email marketing, video production and eCommerce. All services are available to ${areaName} businesses.` },
    { q: `How long does SEO take to work in ${areaName}, ${cityName}?`, a: `For competitive ${cityName} terms, expect meaningful organic gains in 3\u20135 months and full ROI by month 8\u201312. Local SEO and long-tail keywords specific to ${areaName} often produce results within 4\u20136 weeks \u2014 area-level terms typically have lower competition than city-wide hero terms.` },
    { q: `Do you work with small businesses in ${areaName}?`, a: `Yes. We have a dedicated SME track with retainers from \u00A32,500/month alongside enterprise programmes. Many of our ${areaName} clients are founder-led businesses and scale-ups. The methodology is the same \u2014 we calibrate scope and channel mix to your budget.` },
    { q: `Can I get a free SEO audit for my ${areaName} business?`, a: `Absolutely. Our free 90-second audit scans your site against Core Web Vitals, benchmarks you against top ${areaName} and ${cityName} competitors, checks AI Overview citation readiness, and delivers a 12-page PDF with a 90-day action plan. No obligation, no call required.` },
    { q: `What is GEO and AEO and why does it matter for ${areaName} businesses?`, a: `GEO (Generative Engine Optimisation) and AEO (Answer Engine Optimisation) are the disciplines for getting your brand cited in AI search results \u2014 Google AI Overviews, ChatGPT, Perplexity. Around 60% of Google searches now end without a click. Being the answer the AI quotes is increasingly more valuable than ranking #1. Every SEO retainer includes structured GEO/AEO work.` },
  ];
}

function industryEmoji(ind: string): string {
  const map: Record<string, string> = {
    'Fintech': '\uD83D\uDCB3', 'SaaS': '\u2601\uFE0F', 'Creative': '\uD83C\uDFA8', 'Hospitality': '\uD83C\uDF7D\uFE0F',
    'Tech': '\uD83D\uDCBB', 'E-commerce': '\uD83D\uDED2', 'Healthcare': '\uD83C\uDFE5', 'Property': '\uD83C\uDFE0',
    'Legal': '\u2696\uFE0F', 'Education': '\uD83D\uDCDA', 'B2B': '\uD83E\uDD1D', 'Retail': '\uD83C\uDFEA',
    'Music': '\uD83C\uDFB5', 'Fashion': '\uD83D\uDC57', 'Media': '\uD83D\uDCFA', 'Wellness': '\uD83E\uDDD8',
    'Tourism': '\uD83D\uDDFA\uFE0F', 'Cultural': '\uD83C\uDFAD', 'Finance': '\uD83D\uDCB0', 'Professional services': '\uD83D\uDCBC',
    'Manufacturing': '\uD83C\uDFED', 'Logistics': '\uD83D\uDE9A', 'Automotive': '\uD83D\uDE97', 'Entertainment': '\uD83C\uDFAC',
    'Broadcast': '\uD83D\uDCE1', 'Sport': '\u26BD', 'Food': '\uD83C\uDF54',
  };
  return map[ind] || '\uD83C\uDFE2';
}

export default async function CityAreaPage(
  { params }: { params: Promise<{ city: string; area: string }> }
) {
  const { city, area } = await params;
  const c = getCity(city);
  const a = getCityArea(city, area);
  if (!c || !a) notFound();

  const neighbours = c.areas.filter(x => x.slug !== a.slug).slice(0, 8);
  const faqs = areaFaqs(a.name, c.name);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: c.name, url: `/${c.slug}` },
    { name: a.name, url: `/${c.slug}/${a.slug}` },
  ]);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/${c.slug}/${a.slug}/#service`,
    "name": `Meridian \u2014 ${a.name}, ${c.name}`,
    "description": a.intro,
    "url": `${SITE}/${c.slug}/${a.slug}`,
    "parentOrganization": { "@id": `${SITE}/#organization` },
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
  };

  return (
    <>
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(faqs)) }} />

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
          <span className="service-eyebrow"><span className="pulse"></span>{a.postcodes.join(' \u00B7 ')} \u00B7 {a.hub.toUpperCase()}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(48px,7vw,88px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            Digital marketing in <span className="accent">{a.name}</span>, {c.name}. Results from month&nbsp;one.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>
            {a.intro} <strong>SEO, PPC, web design, app development, social media and branding</strong> &mdash; London-grade disciplines, one accountable team. 40% below market rate.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">
              Get Free SEO Audit &rarr;
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              See Pricing
            </Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              200+ UK brands served
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              4.9&#9733; Google &amp; Trustpilot
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              {a.industries.slice(0, 2).join(', ')} specialists
            </span>
          </div>
        </div>
      </section>

      {/* ========================= STATS STRIP ========================= */}
      <section className="stats-strip">
        <div className="wrap">
          <div className="stats-grid reveal">
            <div className="stat-block"><div className="stat-num">+342%</div><div className="stat-label">Avg organic traffic uplift in 12 months</div></div>
            <div className="stat-block"><div className="stat-num">&pound;0.87</div><div className="stat-label">Median CPL in B2B paid search</div></div>
            <div className="stat-block"><div className="stat-num">94%</div><div className="stat-label">Client retention beyond 24 months</div></div>
            <div className="stat-block"><div className="stat-num">2.1s</div><div className="stat-label">Avg LCP across sites we ship</div></div>
          </div>
        </div>
      </section>

      {/* ========================= INDUSTRIES ========================= */}
      <section style={{ padding: '40px 0 0' }}>
        <div className="wrap">
          <div className="section-head reveal" style={{ marginBottom: 0 }}>
            <span className="section-eyebrow">INDUSTRIES IN {a.name.toUpperCase()}</span>
            <h2 className="section-title">Deep sector knowledge. <span className="accent">Your industry, covered.</span></h2>
          </div>
          <div className="platform-row reveal" style={{ maxWidth: a.industries.length > 3 ? '1200px' : '900px', gridTemplateColumns: `repeat(${Math.min(a.industries.length, 4)}, 1fr)` }}>
            {a.industries.map((ind) => (
              <div key={ind} className="platform-card">
                <span className="platform-emoji" aria-hidden="true">{industryEmoji(ind)}</span>
                <h3 className="platform-name">{ind}</h3>
                <p className="platform-desc">{ind} businesses in {a.name}, {c.name} trust us with SEO, PPC, web and digital strategy.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= SERVICES ========================= */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">SERVICES FOR {a.name.toUpperCase()}</span>
            <h2 className="section-title">Everything your {a.name} business needs to <span className="accent">dominate search</span>.</h2>
            <p className="section-sub">Eleven disciplines, one accountable team. Tailored for {a.name}&apos;s {a.industries[0]?.toLowerCase()} and {a.industries[1]?.toLowerCase()} landscape.</p>
          </div>
          <div className="includes-grid reveal">
            {SERVICES.map((s) => (
              <article key={s.slug} className="include-card">
                <div className="include-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.slug === 'seo-london' && <><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></>}
                    {s.slug === 'ppc-london' && <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>}
                    {s.slug === 'web-design-london' && <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></>}
                    {s.slug === 'app-development-london' && <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></>}
                    {s.slug === 'social-media-london' && <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>}
                    {s.slug === 'branding-london' && <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>}
                    {s.slug === 'business-plan-london' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>}
                    {(s.slug === 'copywriting-london' || s.slug === 'email-marketing-london' || s.slug === 'video-production-london' || s.slug === 'ecommerce-london') && <><path d="M20 6L9 17l-5-5"/></>}
                  </svg>
                </div>
                <h3 className="include-h">
                  <Link href={`/${c.slug}/${a.slug}/${s.slug}`} style={{ color: 'inherit' }}>
                    {s.shortName} in {a.name}
                  </Link>
                </h3>
                <p className="include-p">{s.intro}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= METHODOLOGY ========================= */}
      <section className="method-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">HOW WE WORK</span>
            <h2 className="section-title">From audit to <span className="accent">compounding results</span>.</h2>
            <p className="section-sub">A proven four-phase methodology. Weekly reporting. No handwaving.</p>
          </div>
          <div className="method-grid reveal">
            <div className="method-step">
              <div className="method-num"><strong>01</strong> WEEK 1&ndash;2</div>
              <h3 className="method-h">Audit &amp; Strategy</h3>
              <p className="method-p">Full technical SEO audit, competitive analysis, keyword mapping for {a.name} and {c.name}-wide terms. Channel strategy and budget allocation.</p>
            </div>
            <div className="method-step">
              <div className="method-num"><strong>02</strong> WEEK 3&ndash;4</div>
              <h3 className="method-h">Foundation</h3>
              <p className="method-p">Technical fixes deployed. Schema markup, Core Web Vitals optimisation, Google Business Profile setup for {a.name}. Paid campaigns live.</p>
            </div>
            <div className="method-step">
              <div className="method-num"><strong>03</strong> MONTH 2&ndash;3</div>
              <h3 className="method-h">Velocity</h3>
              <p className="method-p">Content production, link building, paid media optimisation. Area-level keyword targeting. AI Overview citation engineering.</p>
            </div>
            <div className="method-step">
              <div className="method-num"><strong>04</strong> MONTH 4+</div>
              <h3 className="method-h">Compound</h3>
              <p className="method-p">Rankings compound. CPL drops. Organic traffic grows month-on-month. We reinvest gains into new keyword verticals and channels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= LONG-TAIL SERVICE KEYWORDS ========================= */}
      <section className="locations-section" style={{ paddingBottom: '60px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">ALL SERVICES IN {a.name.toUpperCase()}</span>
            <h2 className="section-title">What we do in <span className="accent">{a.name}</span>.</h2>
            <p className="section-sub">Every digital service available for {a.name} businesses &mdash; from SEO to eCommerce.</p>
          </div>
          <div className="borough-track reveal">
            {[
              `SEO Agency in ${a.name}`,
              `Local SEO in ${a.name}`,
              `Technical SEO in ${a.name}`,
              `PPC Agency in ${a.name}`,
              `Google Ads in ${a.name}`,
              `Web Design in ${a.name}`,
              `App Development in ${a.name}`,
              `Social Media in ${a.name}`,
              `Instagram Marketing in ${a.name}`,
              `TikTok Marketing in ${a.name}`,
              `Branding in ${a.name}`,
              `Logo Design in ${a.name}`,
              `Business Plan in ${a.name}`,
              `Copywriting in ${a.name}`,
              `Email Marketing in ${a.name}`,
              `Video Production in ${a.name}`,
              `eCommerce in ${a.name}`,
            ].map((kw) => (
              <span key={kw} className="borough">
                <span className="dot"></span>{kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= MINI CASE STUDY ========================= */}
      <section className="case-mini-section">
        <div className="wrap">
          <div className="case-mini reveal">
            <div>
              <p style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '14px' }}>VERIFIED &middot; GOOGLE REVIEW</p>
              <p className="case-mini-quote">&ldquo;Meridian rebuilt our SEO from scratch. Six months in we&apos;re #1 for our three commercial terms and organic traffic is up 380%. Worth every pound.&rdquo;</p>
              <p className="case-mini-author"><strong>James Mitchell</strong> &middot; Founder &middot; Apex Wealth</p>
            </div>
            <div className="case-mini-stats">
              <div><div className="case-mini-stat-num">+380%</div><div className="case-mini-stat-label">Organic traffic</div></div>
              <div><div className="case-mini-stat-num">#1</div><div className="case-mini-stat-label">Three commercial terms</div></div>
              <div><div className="case-mini-stat-num">94%</div><div className="case-mini-stat-label">Client retention</div></div>
              <div><div className="case-mini-stat-num">6 mo</div><div className="case-mini-stat-label">Time to page 1</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= PRICING ========================= */}
      <section style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
            <h2 className="section-title">Pricing for <span className="accent">{a.name}</span> businesses.</h2>
          </div>
          <div className="includes-grid stagger-grid reveal">
            {RETAINERS.filter(r => r.popular).slice(0, 3).map((r) => (
              <div key={r.id} className="cost-card">
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', marginBottom: '6px' }}>{r.serviceName.toUpperCase()} · {r.tierName.toUpperCase()}</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: '4px' }}>{r.serviceName} in {a.name}</h3>
                <div className="cost-price" style={{ fontSize: '36px' }}>{formatGBP(r.paygMonthly)}<span style={{ fontSize: '14px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>/mo</span></div>
                <div className="cost-market">vs <s>{formatGBP(r.marketAvgMonthly)}</s> · <strong>save {calcSavingsVsMarket(r.paygMonthly, r.marketAvgMonthly)}%</strong></div>
                <Link href={`/pricing?service=${r.serviceSlug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px', marginTop: '16px' }}>Get Started →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= LEAD CAPTURE ========================= */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: '540px' }}>
          <div className="reveal">
            <LeadCaptureForm
              source={`city-area-${c.slug}-${a.slug}`}
              heading={`Free audit for ${a.name} businesses`}
              subtext={`We'll benchmark you against competitors in ${a.name}, ${c.name}. 12-page PDF in 90 seconds.`}
              dark
            />
          </div>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{a.name.toUpperCase()} FAQ</span>
            <h2 className="section-title">Questions {a.name} businesses <span className="accent">ask us</span>.</h2>
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

      {/* ========================= NEARBY AREAS ========================= */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">COVERAGE</span>
            <h2 className="section-title">Nearby areas we <span className="accent">also cover</span>.</h2>
          </div>
          <div className="borough-track reveal">
            {neighbours.map((n) => (
              <Link key={n.slug} href={`/${c.slug}/${n.slug}`} className="borough">
                <span className="dot"></span>{n.name}
              </Link>
            ))}
            <Link href={`/${c.slug}`} className="borough featured">
              <span className="dot"></span>All {c.name} areas &rarr;
            </Link>
            <Link href="/london" className="borough">
              <span className="dot"></span>London
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= RELATED INTERNAL LINKS ========================= */}
      <InternalLinks currentBorough={a.slug} />

      {/* ========================= FINAL CTA ========================= */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready to dominate {a.name} search?</h2>
            <p className="final-p">Free 90-second SEO audit. 12-page PDF with your top 10 quick wins. No call required, no obligation, no spam.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free SEO Audit &rarr;</Link>
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
