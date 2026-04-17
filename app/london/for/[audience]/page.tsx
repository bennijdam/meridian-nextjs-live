/**
 * /london/for/[audience] — London audience landing pages.
 *
 * Each page targets a buyer segment (startups, restaurants, law firms,
 * etc.) with audience-specific messaging, pain points, proof and
 * pricing. Cross-links to related services and matching case studies.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAudience, ALL_AUDIENCE_SLUGS } from '@/lib/audiences';
import { SERVICES, getService, type Service } from '@/lib/services';
import { RETAINERS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { CASE_STUDIES } from '@/lib/case-studies';
import { breadcrumbSchema, faqSchema, jsonLd } from '@/lib/schema';

export function generateStaticParams() {
  return ALL_AUDIENCE_SLUGS.map((audience) => ({ audience }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ audience: string }> }
): Promise<Metadata> {
  const { audience } = await params;
  const a = getAudience(audience);
  if (!a) return {};
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: `/london/for/${a.slug}` },
    openGraph: {
      title: a.metaTitle,
      description: a.metaDescription,
      url: `/london/for/${a.slug}`,
      type: 'website',
      locale: 'en_GB',
    },
  };
}

/** Map an audience slug to industries from lib/case-studies.ts */
const AUDIENCE_INDUSTRIES: Record<string, string[]> = {
  startups: ['Fintech', 'SaaS'],
  'ecommerce-brands': ['Beauty & Wellness', 'Hospitality'],
  agencies: [],
  'saas-companies': ['SaaS', 'Fintech'],
  restaurants: ['Hospitality'],
  'law-firms': ['Legal'],
  'estate-agents': ['Construction'],
  dentists: [],
  'non-profits': [],
  'small-businesses': ['Construction', 'Hospitality'],
};

export default async function AudiencePage(
  { params }: { params: Promise<{ audience: string }> }
) {
  const { audience } = await params;
  const a = getAudience(audience);
  if (!a) notFound();

  const industries = AUDIENCE_INDUSTRIES[a.slug] || [];
  const matchedCaseStudies = CASE_STUDIES.filter(cs => industries.includes(cs.industry)).slice(0, 3);
  const fallbackCaseStudies = CASE_STUDIES.slice(0, 3);
  const caseStudies = matchedCaseStudies.length > 0 ? matchedCaseStudies : fallbackCaseStudies;

  const relatedRetainers = RETAINERS.filter(r => r.popular).filter(r => {
    const matchedSlug = a.relatedServices.find(rs => rs.includes(r.serviceSlug));
    return !!matchedSlug;
  });
  const displayRetainers = relatedRetainers.length > 0 ? relatedRetainers.slice(0, 3) : RETAINERS.filter(r => r.popular).slice(0, 3);

  const resolvedRelatedServices: Service[] = a.relatedServices
    .map(slug => getService(slug))
    .filter((s): s is Service => Boolean(s));

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'London', url: '/london' },
    { name: `For ${a.name}`, url: `/london/for/${a.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(a.faqs)) }} />

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
          <span className="service-eyebrow"><span className="pulse"></span>FOR LONDON {a.name.toUpperCase()}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(48px,7vw,88px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            <span aria-hidden="true">{a.icon}</span> Digital marketing for <span className="accent">{a.name.toLowerCase()}</span>.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '720px', textAlign: 'center' }}>
            {a.intro}
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
            <Link href="/pricing" className="btn btn-ghost">See Pricing</Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              40% below London market
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              4.9★ · 127 verified reviews
            </span>
            <span className="trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              90-day minimum, then monthly
            </span>
          </div>
        </div>
      </section>

      {/* ========================= STATS STRIP ========================= */}
      <section className="stats-strip">
        <div className="wrap">
          <div className="stats-grid reveal">
            {a.stats.map((s, i) => (
              <div key={i} className="stat-block">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= WHAT WE DO ========================= */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">WHAT WE DO</span>
            <h2 className="section-title">How we help <span className="accent">{a.name.toLowerCase()}</span>.</h2>
            <p className="section-sub">Built for the pain points {a.name.toLowerCase()} actually face — not a generic digital-marketing pitch.</p>
          </div>
          <div className="includes-grid reveal">
            {a.bullets.map((bullet, i) => (
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

      {/* ========================= POPULAR RETAINERS ========================= */}
      <section id="pricing" style={{ padding: '100px 0 60px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
            <h2 className="section-title">Pricing for <span className="accent">{a.name.toLowerCase()}</span>.</h2>
            <p className="section-sub">Every retainer priced 40% below London market average. No hidden setup fees. 90-day minimum, then month-to-month.</p>
          </div>
          <div className="includes-grid reveal">
            {displayRetainers.map((r) => (
              <article key={r.id} className="include-card" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '3px 10px', borderRadius: '999px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', fontSize: '10px', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>POPULAR</div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{r.serviceName.toUpperCase()} · {r.tierName.toUpperCase()}</div>
                <h3 className="include-h">{r.serviceName} for {a.name}</h3>
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

      {/* ========================= CASE STUDIES ========================= */}
      {caseStudies.length > 0 && (
        <section className="includes-section">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="section-eyebrow">PROOF</span>
              <h2 className="section-title">Case studies from the <span className="accent">same playbook</span>.</h2>
            </div>
            <div className="includes-grid reveal">
              {caseStudies.map((cs) => (
                <article key={cs.slug} className="include-card">
                  <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{cs.industry.toUpperCase()} · {cs.service.toUpperCase()}</div>
                  <h3 className="include-h">
                    <Link href={`/case-studies/${cs.slug}`} style={{ color: 'inherit' }}>{cs.title}</Link>
                  </h3>
                  <p className="include-p" style={{ marginBottom: '16px' }}>{cs.description}</p>
                  <Link href={`/case-studies/${cs.slug}`} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: '13px' }}>
                    Read the study →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================= FAQ ========================= */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{a.name.toUpperCase()} FAQ</span>
            <h2 className="section-title">Questions {a.name.toLowerCase()} <span className="accent">ask us</span>.</h2>
          </div>
          <div className="faq-list reveal">
            {a.faqs.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q">{f.q}</summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= RELATED SERVICES ========================= */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">RELATED SERVICES</span>
            <h2 className="section-title">Services <span className="accent">{a.name.toLowerCase()}</span> buy from us.</h2>
          </div>
          <div className="borough-track reveal">
            {(resolvedRelatedServices.length > 0 ? resolvedRelatedServices : SERVICES.slice(0, 6)).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="borough featured">
                <span className="dot"></span>{s.shortName}
              </Link>
            ))}
            <Link href="/services" className="borough">
              <span className="dot"></span>All services →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= FINAL CTA ========================= */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready to market like the best {a.name.toLowerCase()} in London?</h2>
            <p className="final-p">Free 90-second audit. 12-page PDF with your top 10 quick wins. No call required, no spam.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
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
