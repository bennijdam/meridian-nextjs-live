/**
 * /london/neighborhoods/[slug] — Hyper-local neighborhood landing pages.
 *
 * Targets "[service] [neighborhood]" long-tail queries (e.g. "seo agency
 * hoxton"). Each page is nested inside a parent borough and cross-links
 * back to the borough hub plus four nearby neighborhoods.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NEIGHBORHOODS, getNeighborhood, ALL_NEIGHBORHOOD_SLUGS } from '@/lib/neighborhoods';
import { getBorough } from '@/lib/boroughs';
import { SERVICES } from '@/lib/services';
import { RETAINERS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { breadcrumbSchema, faqSchema, jsonLd } from '@/lib/schema';

export function generateStaticParams() {
  return ALL_NEIGHBORHOOD_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const n = getNeighborhood(slug);
  if (!n) return {};

  const title = `Digital Marketing in ${n.name}, London | SEO, PPC, Web | Meridian`;
  const description = `${n.description} Meridian delivers SEO, PPC, web design and social media for ${n.name} businesses. 40% below London market rate. Free audit.`;

  return {
    title,
    description,
    alternates: { canonical: `/london/neighborhoods/${n.slug}` },
    openGraph: {
      title,
      description,
      url: `/london/neighborhoods/${n.slug}`,
      type: 'website',
      locale: 'en_GB',
    },
  };
}

function neighborhoodFaqs(name: string, station: string, boroughName: string) {
  return [
    { q: `Do you have clients in ${name}?`, a: `Yes. ${name} sits within ${boroughName} where we already run multiple programmes. Our nearest client cluster works out of ${station}-adjacent offices, so we know the catchment, footfall patterns and commercial landscape well.` },
    { q: `How much does SEO cost for a ${name} business?`, a: `Retainers start at £490/month for a Starter local SEO programme and £1,490/month for Growth. Project work (new site, branding sprint) starts at £1,950. Every line is priced 40% below the London market average.` },
    { q: `Can you help us rank in the ${name} 3-pack?`, a: `Yes — local 3-pack work is a core deliverable of our Growth SEO retainer. Google Business Profile optimisation, review generation, borough-level citations and service-area content all contribute. Expect 3-pack visibility in 8–12 weeks for most categories in ${name}.` },
    { q: `Do you cover the whole ${boroughName} borough?`, a: `Yes. Whether your office is in ${name} specifically or elsewhere in ${boroughName}, the same senior team supports you. We also run dedicated sub-area pages so your SEO targets the streets, stations and postcodes closest to your catchment.` },
    { q: `How quickly can we start?`, a: `Kickoff within 5 working days of signup. First audit and strategy document delivered by end of week 2. For project work (sites, branding) we open a sprint slot within 10 working days and deliver in 2–6 weeks depending on scope.` },
  ];
}

export default async function NeighborhoodPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const n = getNeighborhood(slug);
  if (!n) notFound();

  const parent = getBorough(n.borough);

  // 4 nearest other neighborhoods — prefer those in the same borough, then fall back
  const siblings = NEIGHBORHOODS.filter(x => x.slug !== n.slug && x.borough === n.borough);
  const others = NEIGHBORHOODS.filter(x => x.slug !== n.slug && x.borough !== n.borough);
  const nearby = [...siblings, ...others].slice(0, 4);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'London', url: '/london' },
    ...(parent ? [{ name: parent.name, url: `/london/${parent.slug}` }] : []),
    { name: n.name, url: `/london/neighborhoods/${n.slug}` },
  ]);

  const faqs = neighborhoodFaqs(n.name, n.nearestStation, parent?.name || 'London');

  const popularRetainers = RETAINERS.filter(r => r.popular).slice(0, 6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(faqs)) }} />

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

      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>{n.postcodes.join(' · ')} · {n.nearestStation.toUpperCase()}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(48px,7vw,88px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            Digital marketing in <span className="accent">{n.name}</span>.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '680px', textAlign: 'center' }}>
            {n.description} <strong>SEO, PPC, web design and social media</strong> for {n.name} businesses — 40% below London market rate, no long contracts.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
            <Link href="/pricing" className="btn btn-ghost">See Pricing</Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              Nearest station: {n.nearestStation}
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              4.9★ · 127 verified reviews
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              {n.industries.slice(0, 2).join(', ')} specialists
            </span>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="wrap">
          <div className="stats-grid reveal">
            <div className="stat-block"><div className="stat-num">+342%</div><div className="stat-label">Avg organic uplift in 12 months</div></div>
            <div className="stat-block"><div className="stat-num">94%</div><div className="stat-label">Client retention beyond 24 months</div></div>
            <div className="stat-block"><div className="stat-num">200+</div><div className="stat-label">London brands served</div></div>
            <div className="stat-block"><div className="stat-num">2.1s</div><div className="stat-label">Avg LCP, sites we ship</div></div>
          </div>
        </div>
      </section>

      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">SERVICES IN {n.name.toUpperCase()}</span>
            <h2 className="section-title">What we do for <span className="accent">{n.name}</span> businesses.</h2>
            <p className="section-sub">Seven disciplines, one accountable team. Calibrated to {n.name}&apos;s {n.industries[0]?.toLowerCase()} and {n.industries[1]?.toLowerCase()} landscape.</p>
          </div>
          <div className="includes-grid reveal">
            {SERVICES.slice(0, 6).map((s) => (
              <article key={s.slug} className="include-card">
                <div className="include-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3 className="include-h">
                  <Link href={`/services/${s.slug}`} style={{ color: 'inherit' }}>
                    {s.shortName} in {n.name}
                  </Link>
                </h3>
                <p className="include-p">{s.intro}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= POPULAR RETAINERS ========================= */}
      <section id="pricing" style={{ padding: '100px 0 60px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
            <h2 className="section-title">Popular retainers for <span className="accent">{n.name}</span> businesses.</h2>
            <p className="section-sub">Every retainer priced 40% below London market average. No hidden setup fees, 90-day minimum, then month-to-month.</p>
          </div>
          <div className="includes-grid reveal">
            {popularRetainers.map((r) => (
              <article key={r.id} className="include-card" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '3px 10px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', fontSize: '10px', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>POPULAR</div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{r.serviceName.toUpperCase()} · {r.tierName.toUpperCase()}</div>
                <h3 className="include-h">{r.serviceName} in {n.name}</h3>
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
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/pricing" className="btn btn-ghost">View Full Pricing →</Link>
          </div>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{n.name.toUpperCase()} FAQ</span>
            <h2 className="section-title">Questions {n.name} businesses <span className="accent">ask us</span>.</h2>
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

      {/* ========================= PARENT BOROUGH + NEARBY ========================= */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">COVERAGE</span>
            <h2 className="section-title">Nearby areas we <span className="accent">also cover</span>.</h2>
          </div>
          <div className="borough-track reveal">
            {parent && (
              <Link href={`/london/${parent.slug}`} className="borough featured">
                <span className="dot"></span>All of {parent.name}
              </Link>
            )}
            {nearby.map((x) => (
              <Link key={x.slug} href={`/london/neighborhoods/${x.slug}`} className="borough">
                <span className="dot"></span>{x.name}
              </Link>
            ))}
            <Link href="/london" className="borough featured">
              <span className="dot"></span>All 44 London areas →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= FINAL CTA ========================= */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready to dominate {n.name} search?</h2>
            <p className="final-p">Free 90-second SEO audit. 12-page PDF with your top 10 quick wins. No call required, no obligation.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free SEO Audit →</Link>
              <Link href="/contact" className="btn btn-ghost">Book a Call</Link>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <Link href="/" className="logo">
                <span className="logo-mark"></span>
                <span>Meridian</span>
              </Link>
              <p>London&apos;s boutique digital performance studio since 2014.</p>
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
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Started</h4>
              <ul>
                <li><Link href="/audit">Free SEO Audit</Link></li>
                <li><Link href="/pricing">View Pricing</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span>
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
