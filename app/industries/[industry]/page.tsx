/**
 * /industries/[industry] — Industry vertical landing pages.
 * 15 pages targeting "[industry] digital marketing london" keywords.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { INDUSTRIES, getIndustry, ALL_INDUSTRY_SLUGS } from '@/lib/industries';
import { SERVICES } from '@/lib/services';
import { FEATURED_BOROUGHS } from '@/lib/boroughs';
import { RETAINERS, PROJECTS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';

export function generateStaticParams() {
  return ALL_INDUSTRY_SLUGS.map((industry) => ({ industry }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ industry: string }> }
): Promise<Metadata> {
  const { industry } = await params;
  const ind = getIndustry(industry);
  if (!ind) return {};
  return {
    title: ind.metaTitle,
    description: ind.metaDescription,
    alternates: { canonical: `/industries/${ind.slug}` },
    openGraph: { title: ind.metaTitle, description: ind.metaDescription, url: `/industries/${ind.slug}`, type: 'website', locale: 'en_GB' },
  };
}

export default async function IndustryPage(
  { params }: { params: Promise<{ industry: string }> }
) {
  const { industry } = await params;
  const ind = getIndustry(industry);
  if (!ind) notFound();

  const relatedServices = SERVICES.filter(s => ind.relatedServices.includes(s.slug));
  const topBoroughs = FEATURED_BOROUGHS.slice(0, 5);
  const popularRetainers = RETAINERS.filter(r => r.popular).slice(0, 3);
  const popularProjects = PROJECTS.filter(p => p.popular).slice(0, 3);
  const otherIndustries = INDUSTRIES.filter(i => i.slug !== ind.slug).slice(0, 8);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Industries', url: '/industries' },
    { name: ind.name, url: `/industries/${ind.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(ind.faqs)) }} />
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
          <span className="service-eyebrow"><span className="pulse"></span>{ind.icon} {ind.shortName.toUpperCase()} · LONDON</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(44px,6.5vw,84px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            Digital marketing for <span className="accent">{ind.name.toLowerCase()}</span>.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>{ind.intro}</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
            <Link href="#pricing" className="btn btn-ghost">See Pricing</Link>
          </div>
          <div className="trust-pill-row">
            {ind.stats.slice(0, 3).map((s, i) => (
              <span key={i} className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>{s.num} {s.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-strip">
        <div className="wrap">
          <div className="stats-grid reveal">
            {ind.stats.map((s, i) => (
              <div key={i} className="stat-block"><div className="stat-num">{s.num}</div><div className="stat-label">{s.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* What we deliver */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">FOR {ind.shortName.toUpperCase()}</span>
            <h2 className="section-title">What we deliver for <span className="accent">{ind.name.toLowerCase()}</span> businesses.</h2>
          </div>
          <div className="includes-grid reveal">
            {ind.bullets.map((b, i) => (
              <article key={i} className="include-card">
                <div className="include-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
                <p className="include-p">{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">SERVICES</span>
            <h2 className="section-title">Services for <span className="accent">{ind.name.toLowerCase()}</span>.</h2>
          </div>
          <div className="includes-grid reveal">
            {relatedServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="include-card" style={{ cursor: 'pointer' }}>
                <h3 className="include-h">{s.shortName}</h3>
                <p className="include-p">{s.intro}</p>
                <span style={{ fontSize: '13px', color: 'var(--accent)', marginTop: '12px', display: 'block' }}>From {s.priceFrom}/{s.priceUnit} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
            <h2 className="section-title">{ind.shortName} pricing. <span className="accent">40% less.</span></h2>
          </div>
          <div className="includes-grid reveal">
            {popularRetainers.map((r) => (
              <article key={r.id} className="include-card" style={{ position: 'relative' }}>
                {r.popular && <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '3px 10px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', fontSize: '10px', fontFamily: 'var(--mono)' }}>POPULAR</div>}
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', marginBottom: '6px' }}>{r.serviceName.toUpperCase()} · {r.tierName.toUpperCase()}</div>
                <h3 className="include-h">{r.serviceName} for {ind.shortName}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0 4px' }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '36px', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, var(--ink), var(--ink-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{formatGBP(r.paygMonthly)}</span>
                  <span style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>/mo</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginBottom: '14px' }}>vs <s style={{ color: 'var(--ink-3)' }}>{formatGBP(r.marketAvgMonthly)}</s> market · <strong style={{ color: 'var(--accent-3)' }}>save {calcSavingsVsMarket(r.paygMonthly, r.marketAvgMonthly)}%</strong></p>
                <Link href={`/pricing?service=${r.serviceSlug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}>Get Started →</Link>
              </article>
            ))}
          </div>
          {popularProjects.length > 0 && (
            <>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', textAlign: 'center', margin: '40px 0 24px' }}>One-off projects</h3>
              <div className="includes-grid reveal">
                {popularProjects.map((p) => (
                  <article key={p.id} className="include-card">
                    <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', marginBottom: '6px' }}>{p.serviceName.toUpperCase()}</div>
                    <h3 className="include-h">{p.serviceName} for {ind.shortName}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0 4px' }}>
                      <span style={{ fontFamily: 'var(--serif)', fontSize: '36px', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, var(--ink), var(--ink-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{formatGBP(p.price)}</span>
                      <span style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>fixed</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginBottom: '14px' }}>vs <s style={{ color: 'var(--ink-3)' }}>{formatGBP(p.marketAvg)}</s> · <strong style={{ color: 'var(--accent-3)' }}>save {calcSavingsVsMarket(p.price, p.marketAvg)}%</strong></p>
                    <Link href={`/pricing?service=${p.serviceSlug}`} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}>View Details →</Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Boroughs */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{ind.shortName.toUpperCase()} ACROSS LONDON</span>
            <h2 className="section-title">{ind.shortName} in <span className="accent">every borough</span>.</h2>
          </div>
          <div className="borough-track reveal">
            {topBoroughs.map((b) => (
              <Link key={b.slug} href={`/london/${b.slug}`} className="borough featured"><span className="dot"></span>{ind.shortName} in {b.name}</Link>
            ))}
            <Link href="/london" className="borough featured"><span className="dot"></span>All boroughs →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{ind.shortName.toUpperCase()} FAQ</span>
            <h2 className="section-title">Questions about <span className="accent">{ind.name.toLowerCase()}</span> marketing.</h2>
          </div>
          <div className="faq-list reveal">
            {ind.faqs.map((f, i) => (
              <details key={i} className="faq-item"><summary className="faq-q">{f.q}</summary><div className="faq-a">{f.a}</div></details>
            ))}
          </div>
        </div>
      </section>

      {/* Other industries */}
      <section className="locations-section" style={{ paddingTop: '20px' }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">ALL INDUSTRIES</span><h2 className="section-title">Other industries we <span className="accent">serve</span>.</h2></div>
          <div className="borough-track reveal">
            {otherIndustries.map((i) => (<Link key={i.slug} href={`/industries/${i.slug}`} className="borough"><span className="dot"></span>{i.shortName}</Link>))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">{ind.shortName} marketing sorted.</h2>
            <p className="final-p">Free 90-second SEO audit tailored for {ind.name.toLowerCase()} businesses. No obligation.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
              <Link href="/contact" className="btn btn-ghost">Book a Call</Link>
            </div>
          </div>
        </div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
      <div className="mobile-cta" role="complementary"><span className="mobile-cta-text">Free SEO audit, 90s.</span><Link href="/audit" className="mobile-cta-btn">Get Audit →</Link></div>
    </>
  );
}
