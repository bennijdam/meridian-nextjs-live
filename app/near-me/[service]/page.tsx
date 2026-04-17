/**
 * /near-me/[service] — "[Service] near me" landing pages.
 *
 * Each page targets the high-intent "[service] near me" query and
 * presents an interactive grid of all 44 London boroughs, each linking
 * to the corresponding /services/[service]/[borough] landing page.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES, getService, ALL_SERVICE_SLUGS } from '@/lib/services';
import { BOROUGHS, FEATURED_BOROUGHS } from '@/lib/boroughs';
import { RETAINERS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { breadcrumbSchema, faqSchema, jsonLd } from '@/lib/schema';

export function generateStaticParams() {
  return ALL_SERVICE_SLUGS.map((service) => ({ service }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ service: string }> }
): Promise<Metadata> {
  const { service } = await params;
  const s = getService(service);
  if (!s) return {};

  const title = `${s.shortName} Near Me in London | 44 Boroughs Covered | Meridian`;
  const description = `${s.shortName.toLowerCase()} near you in London — all 32 boroughs + the City + Croydon, Ealing and outer London. From ${s.priceFrom}/${s.priceUnit}. Free audit.`;

  return {
    title,
    description,
    alternates: { canonical: `/near-me/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `/near-me/${s.slug}`,
      type: 'website',
      locale: 'en_GB',
    },
  };
}

function nearMeFaqs(serviceName: string) {
  return [
    { q: `How do I find a good ${serviceName.toLowerCase()} near me in London?`, a: `Start with Google's local 3-pack and filter by review count (80+) and average rating (4.8+). Check the agency publishes transparent pricing, has verifiable London case studies, and lists a senior team on the site — not just account managers. Meridian satisfies all three: we publish every price, we list 6 case studies with results, and every engagement is led by a senior specialist.` },
    { q: `Do I need to pick a ${serviceName.toLowerCase()} in my specific borough?`, a: `No. For most services, the team does not need to be based in your borough — London's tube network makes on-site meetings trivial from any zone-1 or zone-2 office. What matters is borough-level knowledge: local keyword research, Google Business Profile expertise, and familiarity with your catchment. Our borough pages detail the sector knowledge we bring to each area.` },
    { q: `How much does ${serviceName.toLowerCase()} cost in London?`, a: `Retainer services typically start from £490–£2,500/month depending on scope; project work from £1,950–£25,000+. Every Meridian price is set 40% below the London market average and published on the service pages. You can pay-as-you-go, commit for 6 months (10% off) or pay annually (17% off).` },
    { q: `Can you work remotely with businesses outside zone 1?`, a: `Yes. We deliver fully remotely or hybrid — video calls, shared Slack, async updates — across every London borough. On-site visits are included in Growth and Scale retainers for any London borough at no extra charge.` },
    { q: `Do you cover all 32 London boroughs?`, a: `Yes. All 32 boroughs plus the City of London. Our borough pages detail the sector focus in each — Shoreditch (tech/fintech), Mayfair (finance/luxury), Canary Wharf (enterprise), through to Croydon (SME tech) and Richmond (affluent professional services).` },
  ];
}

export default async function NearMePage(
  { params }: { params: Promise<{ service: string }> }
) {
  const { service } = await params;
  const s = getService(service);
  if (!s) notFound();

  const faqs = nearMeFaqs(s.shortName);
  const otherServices = SERVICES.filter(x => x.slug !== s.slug);

  const pricingSlugGuess = s.slug.replace('-london', '');
  const matchingRetainers = RETAINERS.filter(r => r.serviceSlug === pricingSlugGuess);
  const popularMatching = matchingRetainers.filter(r => r.popular).slice(0, 1);
  const retainerTeaser = popularMatching[0] || matchingRetainers[0] || RETAINERS.filter(r => r.popular)[0];

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Near Me', url: `/near-me/${s.slug}` },
    { name: s.shortName, url: `/near-me/${s.slug}` },
  ]);

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
          <span className="service-eyebrow"><span className="pulse"></span>{s.shortName.toUpperCase()} NEAR YOU · 44 LONDON AREAS</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(48px,7vw,88px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            {s.shortName} <span className="accent">near you</span> in London.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '700px', textAlign: 'center' }}>
            Find {s.shortName.toLowerCase()} services across all 32 London boroughs plus the City. <strong>From {s.priceFrom}/{s.priceUnit}</strong>, 40% below London market average. Pick your area below — every link opens a borough-specific page with pricing, case studies and FAQs.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="#areas" className="btn btn-primary">Find Your Borough →</Link>
            <Link href="/audit" className="btn btn-ghost">Free Audit First</Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              44 London areas covered
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              From {s.priceFrom}/{s.priceUnit}
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              4.9★ · 127 verified reviews
            </span>
          </div>
        </div>
      </section>

      {/* ========================= FEATURED AREAS ========================= */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">FEATURED AREAS</span>
            <h2 className="section-title">Our highest-demand <span className="accent">London boroughs</span>.</h2>
            <p className="section-sub">Where we run the most {s.shortName.toLowerCase()} programmes. Pick a featured borough — or scroll for the full 44-area picker.</p>
          </div>
          <div className="includes-grid reveal">
            {FEATURED_BOROUGHS.map((b) => (
              <article key={b.slug} className="include-card">
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{b.postcodes.join(' · ')} · {b.hub.toUpperCase()}</div>
                <h3 className="include-h">
                  <Link href={`/services/${s.slug}/${b.slug}`} style={{ color: 'inherit' }}>
                    {s.shortName} in {b.name}
                  </Link>
                </h3>
                <p className="include-p" style={{ marginBottom: '16px' }}>{b.tagline}. {b.industries.slice(0, 2).join(' and ')} specialists.</p>
                <Link href={`/services/${s.slug}/${b.slug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '14px' }}>
                  View {b.name} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= INTERACTIVE BOROUGH GRID ========================= */}
      <section id="areas" className="locations-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">ALL 44 LONDON AREAS</span>
            <h2 className="section-title">Pick your <span className="accent">borough</span>.</h2>
            <p className="section-sub">Every borough has its own pricing, pain points and landscape. Click your area for a dedicated {s.shortName.toLowerCase()} page.</p>
          </div>
          <div className="borough-track reveal">
            {BOROUGHS.map((b) => (
              <Link
                key={b.slug}
                href={`/services/${s.slug}/${b.slug}`}
                className={`borough${b.featured ? ' featured' : ''}`}
              >
                <span className="dot"></span>{s.shortName} in {b.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= PRICING TEASER ========================= */}
      {retainerTeaser && (
        <section id="pricing" style={{ padding: '100px 0 60px' }}>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
              <h2 className="section-title">{s.shortName} pricing <span className="accent">near you</span>.</h2>
              <p className="section-sub">Transparent, published pricing. Same team, same rate, every London borough.</p>
            </div>
            <div className="includes-grid reveal" style={{ maxWidth: '720px', margin: '0 auto' }}>
              <article className="include-card" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '3px 10px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', fontSize: '10px', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>POPULAR</div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{retainerTeaser.serviceName.toUpperCase()} · {retainerTeaser.tierName.toUpperCase()}</div>
                <h3 className="include-h">{retainerTeaser.serviceName} — {retainerTeaser.tierName}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0 4px' }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '36px', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, var(--ink), var(--ink-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{formatGBP(retainerTeaser.paygMonthly)}</span>
                  <span style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>/mo</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginBottom: '14px' }}>vs <s style={{ color: 'var(--ink-3)' }}>{formatGBP(retainerTeaser.marketAvgMonthly)}</s> market avg · <strong style={{ color: 'var(--accent-3)' }}>save {calcSavingsVsMarket(retainerTeaser.paygMonthly, retainerTeaser.marketAvgMonthly)}%</strong></p>
                <p className="include-p" style={{ marginBottom: '16px' }}>{retainerTeaser.tagline}</p>
                <Link href={`/services/${s.slug}#pricing`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '14px' }}>
                  See All Pricing →
                </Link>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* ========================= FAQ ========================= */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">FINDING A LOCAL AGENCY</span>
            <h2 className="section-title">Questions about <span className="accent">finding {s.shortName.toLowerCase()} nearby</span>.</h2>
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

      {/* ========================= OTHER SERVICES ========================= */}
      <section className="locations-section" style={{ paddingTop: '20px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">OTHER NEAR-ME SERVICES</span>
            <h2 className="section-title">More services <span className="accent">near you</span>.</h2>
          </div>
          <div className="borough-track reveal">
            {otherServices.map((o) => (
              <Link key={o.slug} href={`/near-me/${o.slug}`} className="borough">
                <span className="dot"></span>{o.shortName} near me
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= FINAL CTA ========================= */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready to find {s.shortName.toLowerCase()} near you?</h2>
            <p className="final-p">Free 90-second audit — no call required. Or pick your borough above and go straight to pricing.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
              <Link href="#areas" className="btn btn-ghost">Pick a Borough</Link>
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
