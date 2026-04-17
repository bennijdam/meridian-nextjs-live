/**
 * /london/[borough] — Rich borough landing pages.
 *
 * Matches the service-page design language (app-development-v3.html):
 * centered hero, stats strip, icon-card grid, methodology timeline,
 * pricing teaser, mini case study, FAQ, final CTA.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BOROUGHS, getBorough, ALL_BOROUGH_SLUGS } from '@/lib/boroughs';
import { SERVICES } from '@/lib/services';
import { RETAINERS, PROJECTS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { breadcrumbSchema, localBusinessForBorough, faqSchema, jsonLd } from '@/lib/schema';
import BoroughClient from './BoroughClient';
import InternalLinks from '@/components/InternalLinks';

export function generateStaticParams() {
  return ALL_BOROUGH_SLUGS.map((borough) => ({ borough }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ borough: string }> }
): Promise<Metadata> {
  const { borough } = await params;
  const b = getBorough(borough);
  if (!b) return {};

  const title = `Digital Marketing Agency in ${b.name}, London | SEO, PPC, Web & App | Meridian`;
  const description = `${b.tagline}. Meridian delivers SEO, PPC, web design, app development and social media for ${b.name} businesses. Free 90-second SEO audit. Trusted by 200+ London brands.`;

  return {
    title,
    description,
    alternates: { canonical: `/london/${b.slug}` },
    openGraph: {
      title,
      description,
      url: `/london/${b.slug}`,
      type: 'website',
      locale: 'en_GB',
    },
  };
}

function boroughFaqs(name: string) {
  return [
    { q: `How much does digital marketing cost in ${name}?`, a: `London digital marketing retainers typically start at £2,500/month for SEO and PPC. Project-based work like web design starts from £8,500. Meridian prices all services 40% below the London market average with transparent pricing — no hidden fees, no minimum contracts beyond 90 days.` },
    { q: `Which services do you offer in ${name}?`, a: `We deliver the full digital stack: SEO (including AI Overview and ChatGPT citation engineering), PPC and paid media, web design and development, app development, social media management, branding, and business plan writing. All services are available to ${name} businesses.` },
    { q: `How long does SEO take to work in ${name}?`, a: `For competitive London borough terms, expect meaningful organic gains in 4–6 months and full ROI by month 9–12. Local SEO and long-tail keywords specific to ${name} often produce results within 6–8 weeks — borough-level terms typically have lower competition than "london" hero terms.` },
    { q: `Do you work with small businesses in ${name}?`, a: `Yes. We have a dedicated SME track with retainers from £2,500/month alongside enterprise programmes. Many of our ${name} clients are founder-led businesses and scale-ups. The methodology is the same — we calibrate scope and channel mix to your budget.` },
    { q: `Can I get a free SEO audit for my ${name} business?`, a: `Absolutely. Our free 90-second audit scans your site against Core Web Vitals, benchmarks you against top ${name} and London competitors, checks AI Overview citation readiness, and delivers a 12-page PDF with a 90-day action plan. No obligation, no call required.` },
    { q: `What is GEO and AEO and why does it matter for ${name} businesses?`, a: `GEO (Generative Engine Optimisation) and AEO (Answer Engine Optimisation) are the disciplines for getting your brand cited in AI search results — Google AI Overviews, ChatGPT, Perplexity. Around 60% of Google searches now end without a click. Being the answer the AI quotes is increasingly more valuable than ranking #1. Every SEO retainer includes structured GEO/AEO work.` },
  ];
}

export default async function BoroughPage(
  { params }: { params: Promise<{ borough: string }> }
) {
  const { borough } = await params;
  const b = getBorough(borough);
  if (!b) notFound();

  const neighbours = BOROUGHS
    .filter((x) => x.slug !== b.slug)
    .slice(0, 8);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'London', url: '/london' },
    { name: b.name, url: `/london/${b.slug}` },
  ]);

  const faqs = boroughFaqs(b.name);

  return (
    <>
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessForBorough(b)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(faqs)) }} />

      <BoroughClient />

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

      {/* ========================= HERO (centered, service-page style) ========================= */}
      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>{b.postcodes.join(' · ')} · {b.hub.toUpperCase()}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(48px,7vw,88px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            Digital marketing in <span className="accent">{b.name}</span>. Results from month&nbsp;one.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>
            {b.intro} <strong>SEO, PPC, web design, app development, social media and branding</strong> — seven disciplines, one accountable London team. 40% below market rate.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">
              Get Free SEO Audit →
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              See Pricing
            </Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              200+ London brands served
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              4.9★ Google &amp; Trustpilot
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              {b.industries.slice(0, 2).join(', ')} specialists
            </span>
          </div>
        </div>
      </section>

      {/* ========================= STATS STRIP ========================= */}
      <section className="stats-strip">
        <div className="wrap">
          <div className="stats-grid reveal">
            <div className="stat-block"><div className="stat-num">+342%</div><div className="stat-label">Avg organic traffic uplift in 12 months</div></div>
            <div className="stat-block"><div className="stat-num">£0.87</div><div className="stat-label">Median CPL in B2B London paid search</div></div>
            <div className="stat-block"><div className="stat-num">94%</div><div className="stat-label">Client retention beyond 24 months</div></div>
            <div className="stat-block"><div className="stat-num">2.1s</div><div className="stat-label">Avg LCP across sites we ship</div></div>
          </div>
        </div>
      </section>

      {/* ========================= INDUSTRIES (platform-card style) ========================= */}
      <section style={{ padding: '40px 0 0' }}>
        <div className="wrap">
          <div className="section-head reveal" style={{ marginBottom: 0 }}>
            <span className="section-eyebrow">INDUSTRIES IN {b.name.toUpperCase()}</span>
            <h2 className="section-title">Deep sector knowledge. <span className="accent">Your industry, covered.</span></h2>
          </div>
          <div className="platform-row reveal" style={{ maxWidth: b.industries.length > 3 ? '1200px' : '900px', gridTemplateColumns: `repeat(${Math.min(b.industries.length, 4)}, 1fr)` }}>
            {b.industries.map((ind) => (
              <div key={ind} className="platform-card">
                <span className="platform-emoji" aria-hidden="true">
                  {ind === 'Fintech' ? '💳' : ind === 'SaaS' ? '☁️' : ind === 'Crypto' ? '🔗' : ind === 'Creative' ? '🎨' : ind === 'Hospitality' ? '🍽️' : ind === 'Tech' ? '💻' : ind === 'E-commerce' ? '🛒' : ind === 'Healthcare' ? '🏥' : ind === 'Property' ? '🏠' : ind === 'Legal' ? '⚖️' : ind === 'Education' ? '📚' : ind === 'B2B' ? '🤝' : ind === 'Retail' ? '🏪' : ind === 'Music' ? '🎵' : ind === 'Fashion' ? '👗' : ind === 'AI' ? '🤖' : ind === 'Media' ? '📺' : ind === 'Wellness' ? '🧘' : ind === 'Sport' ? '⚽' : ind === 'Tourism' ? '🗺️' : ind === 'Cultural' ? '🎭' : ind === 'Art' ? '🖼️' : ind === 'Deeptech' ? '🔬' : ind === 'Healthtech' ? '💊' : ind === 'Maritime' ? '⚓' : ind === 'Insurance' ? '🛡️' : ind === 'Banking' ? '🏦' : ind === 'Asset management' ? '📊' : ind === 'Advertising' ? '📢' : ind === 'Production' ? '🎬' : ind === 'Hedge funds' ? '📈' : ind === 'Private equity' ? '💎' : ind === 'Luxury retail' ? '👑' : ind === 'Architecture' ? '🏛️' : ind === 'Design' ? '✏️' : ind === 'Publishing' ? '📖' : ind === 'Professional services' ? '💼' : '🏢'}
                </span>
                <h3 className="platform-name">{ind}</h3>
                <p className="platform-desc">{ind} businesses in {b.name} trust us with SEO, PPC, web and digital strategy.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= SERVICES (includes-grid style) ========================= */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">SERVICES FOR {b.name.toUpperCase()}</span>
            <h2 className="section-title">Everything your {b.name} business needs to <span className="accent">dominate search</span>.</h2>
            <p className="section-sub">Seven disciplines, one accountable team. Tailored for {b.name}&apos;s {b.industries[0]?.toLowerCase()} and {b.industries[1]?.toLowerCase()} landscape.</p>
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
                  </svg>
                </div>
                <h3 className="include-h">
                  <Link href={`/services/${s.slug}`} style={{ color: 'inherit' }}>
                    {s.shortName} in {b.name}
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
              <div className="method-num"><strong>01</strong> WEEK 1–2</div>
              <h3 className="method-h">Audit &amp; Strategy</h3>
              <p className="method-p">Full technical SEO audit, competitive analysis, keyword mapping for {b.name} and London-wide terms. Channel strategy and budget allocation.</p>
            </div>
            <div className="method-step">
              <div className="method-num"><strong>02</strong> WEEK 3–4</div>
              <h3 className="method-h">Foundation</h3>
              <p className="method-p">Technical fixes deployed. Schema markup, Core Web Vitals optimisation, Google Business Profile setup for {b.name}. Paid campaigns live.</p>
            </div>
            <div className="method-step">
              <div className="method-num"><strong>03</strong> MONTH 2–3</div>
              <h3 className="method-h">Velocity</h3>
              <p className="method-p">Content production, link building, paid media optimisation. Borough-level keyword targeting. AI Overview citation engineering.</p>
            </div>
            <div className="method-step">
              <div className="method-num"><strong>04</strong> MONTH 4+</div>
              <h3 className="method-h">Compound</h3>
              <p className="method-p">Rankings compound. CPL drops. Organic traffic grows month-on-month. We reinvest gains into new keyword verticals and channels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= PRICING — RETAINERS ========================= */}
      <section id="pricing" style={{ padding: '100px 0 60px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
            <h2 className="section-title">Transparent pricing for <span className="accent">{b.name}</span> businesses.</h2>
            <p className="section-sub">Every retainer is priced 40% below the London market average. No hidden setup fees. 90-day minimum, then month-to-month.</p>
          </div>

          {/* Retainer cards — show the "Growth" (popular) tier per service */}
          <div className="includes-grid reveal">
            {RETAINERS.filter(r => r.popular).map((r) => (
              <article key={r.id} className="include-card" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '3px 10px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', fontSize: '10px', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>POPULAR</div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{r.serviceName.toUpperCase()} · {r.tierName.toUpperCase()}</div>
                <h3 className="include-h">{r.serviceName} in {b.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0 4px' }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '36px', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, var(--ink), var(--ink-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{formatGBP(r.paygMonthly)}</span>
                  <span style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>/mo</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginBottom: '14px' }}>vs <s style={{ color: 'var(--ink-3)' }}>{formatGBP(r.marketAvgMonthly)}</s> market avg · <strong style={{ color: 'var(--accent-3)' }}>save {calcSavingsVsMarket(r.paygMonthly, r.marketAvgMonthly)}%</strong></p>
                <p className="include-p" style={{ marginBottom: '16px' }}>{r.tagline}</p>
                <Link href={`/pricing?service=${r.serviceSlug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '14px' }}>
                  Get Started →
                </Link>
              </article>
            ))}
          </div>

          {/* Project cards — show the "popular" tier per service */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px,3vw,32px)', textAlign: 'center', marginBottom: '28px', letterSpacing: '-0.015em' }}>One-off projects</h3>
            <div className="includes-grid reveal">
              {PROJECTS.filter(p => p.popular).map((p) => (
                <article key={p.id} className="include-card">
                  <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{p.serviceName.toUpperCase()} · {p.tierName.toUpperCase()}</div>
                  <h3 className="include-h">{p.serviceName} in {b.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0 4px' }}>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: '36px', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, var(--ink), var(--ink-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{formatGBP(p.price)}</span>
                    <span style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>fixed</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginBottom: '14px' }}>vs <s style={{ color: 'var(--ink-3)' }}>{formatGBP(p.marketAvg)}</s> market avg · <strong style={{ color: 'var(--accent-3)' }}>save {calcSavingsVsMarket(p.price, p.marketAvg)}%</strong></p>
                  <p className="include-p" style={{ marginBottom: '16px' }}>{p.description}</p>
                  <Link href={`/pricing?service=${p.serviceSlug}`} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '14px' }}>
                    View Details →
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/pricing" className="btn btn-primary">View Full Pricing →</Link>
          </div>
        </div>
      </section>

      {/* ========================= LONG-TAIL SERVICE KEYWORDS ========================= */}
      <section className="locations-section" style={{ paddingBottom: '60px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">ALL SERVICES IN {b.name.toUpperCase()}</span>
            <h2 className="section-title">What we do in <span className="accent">{b.name}</span>.</h2>
            <p className="section-sub">Every digital service available for {b.name} businesses — from SEO to business plans.</p>
          </div>
          <div className="borough-track reveal">
            {[
              `SEO Agency in ${b.name}`,
              `Local SEO in ${b.name}`,
              `Technical SEO in ${b.name}`,
              `PPC Agency in ${b.name}`,
              `Google Ads in ${b.name}`,
              `Facebook Ads in ${b.name}`,
              `Web Design in ${b.name}`,
              `Shopify Design in ${b.name}`,
              `WordPress Design in ${b.name}`,
              `App Development in ${b.name}`,
              `iOS Development in ${b.name}`,
              `Android Development in ${b.name}`,
              `Social Media in ${b.name}`,
              `Instagram Marketing in ${b.name}`,
              `TikTok Marketing in ${b.name}`,
              `LinkedIn Marketing in ${b.name}`,
              `Branding in ${b.name}`,
              `Logo Design in ${b.name}`,
              `Graphic Design in ${b.name}`,
              `Business Plan in ${b.name}`,
              `Pitch Deck in ${b.name}`,
              `Content Marketing in ${b.name}`,
              `Email Marketing in ${b.name}`,
              `Video Production in ${b.name}`,
              `eCommerce in ${b.name}`,
              `UX Design in ${b.name}`,
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
              <p style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '14px' }}>VERIFIED · GOOGLE REVIEW</p>
              <p className="case-mini-quote">&ldquo;Meridian rebuilt our SEO from scratch. Six months in we&apos;re #1 for our three commercial terms and organic traffic is up 380%. Worth every pound.&rdquo;</p>
              <p className="case-mini-author"><strong>James Mitchell</strong> · Founder · Apex Wealth, Mayfair</p>
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

      {/* ========================= FAQ ========================= */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{b.name.toUpperCase()} FAQ</span>
            <h2 className="section-title">Questions {b.name} businesses <span className="accent">ask us</span>.</h2>
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

      {/* ========================= NEARBY BOROUGHS ========================= */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">COVERAGE</span>
            <h2 className="section-title">Nearby areas we <span className="accent">also cover</span>.</h2>
          </div>
          <div className="borough-track reveal">
            {neighbours.map((n) => (
              <Link key={n.slug} href={`/london/${n.slug}`} className={`borough${n.featured ? ' featured' : ''}`}>
                <span className="dot"></span>{n.name}
              </Link>
            ))}
            <Link href="/london" className="borough featured">
              <span className="dot"></span>All boroughs →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= RELATED INTERNAL LINKS ========================= */}
      <InternalLinks currentBorough={b.slug} />

      {/* ========================= FINAL CTA ========================= */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready to dominate {b.name} search?</h2>
            <p className="final-p">Free 90-second SEO audit. 12-page PDF with your top 10 quick wins. No call required, no obligation, no spam.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free SEO Audit →</Link>
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
              <p>London&apos;s boutique digital performance studio. Engineering compounding growth across SEO, PPC, web, app and social since 2014.</p>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><Link href="/services/seo-london">SEO Agency London</Link></li>
                <li><Link href="/services/ppc-london">PPC Agency London</Link></li>
                <li><Link href="/services/web-design-london">Web Design London</Link></li>
                <li><Link href="/services/app-development-london">App Development London</Link></li>
                <li><Link href="/services/social-media-london">Social Media London</Link></li>
                <li><Link href="/services/branding-london">Branding London</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/reviews">Reviews</Link></li>
                <li><Link href="/results">Results &amp; Case Studies</Link></li>
                <li><Link href="/london">London Coverage</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
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

      {/* ========================= MOBILE BOTTOM CTA ========================= */}
      <div className="mobile-cta" role="complementary">
        <span className="mobile-cta-text">Free SEO audit, 90s.</span>
        <Link href="/audit" className="mobile-cta-btn">Get Audit →</Link>
      </div>
    </>
  );
}
