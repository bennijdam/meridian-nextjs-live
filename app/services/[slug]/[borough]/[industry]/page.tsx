/**
 * /services/[slug]/[borough]/[industry] — Triple matrix pages.
 * 7 services × 44 boroughs × 15 industries = 4,620 ultra-long-tail pages.
 * Uses ISR (revalidate) instead of full SSG to keep build times manageable.
 * Targets: "seo for fintech in shoreditch" (KD 0-10).
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getService, SERVICES } from '@/lib/services';
import { getBorough, BOROUGHS } from '@/lib/boroughs';
import { getIndustry, INDUSTRIES } from '@/lib/industries';
import { RETAINERS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';
import LeadCaptureForm from '@/components/LeadCaptureForm';

// ISR: generate on-demand, cache for 24 hours
export const revalidate = 86400;

// Pre-generate top 50 combinations (featured boroughs × popular services × top industries)
export function generateStaticParams() {
  const params: { slug: string; borough: string; industry: string }[] = [];
  const topServices = ['seo-london', 'ppc-london', 'web-design-london'];
  const topBoroughs = ['shoreditch', 'mayfair', 'canary-wharf', 'kings-cross', 'soho'];
  const topIndustries = ['fintech', 'saas', 'healthcare', 'ecommerce', 'legal'];

  for (const slug of topServices) {
    for (const borough of topBoroughs) {
      for (const industry of topIndustries) {
        params.push({ slug, borough, industry });
      }
    }
  }
  return params; // 3 × 5 × 5 = 75 pre-built, rest on-demand
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; borough: string; industry: string }> }
): Promise<Metadata> {
  const { slug, borough, industry } = await params;
  const s = getService(slug);
  const b = getBorough(borough);
  const ind = getIndustry(industry);
  if (!s || !b || !ind) return {};
  const title = `${s.shortName} for ${ind.shortName} in ${b.name} | Meridian`;
  const description = `${s.shortName} for ${ind.name.toLowerCase()} businesses in ${b.name}, London. From ${s.priceFrom}/${s.priceUnit}. 40% below market. Free audit.`;
  return {
    title, description,
    alternates: { canonical: `/services/${s.slug}/${b.slug}/${ind.slug}` },
    openGraph: { title, description, url: `/services/${s.slug}/${b.slug}/${ind.slug}`, type: 'website', locale: 'en_GB' },
  };
}

export default async function TripleMatrixPage(
  { params }: { params: Promise<{ slug: string; borough: string; industry: string }> }
) {
  const { slug, borough, industry } = await params;
  const s = getService(slug);
  const b = getBorough(borough);
  const ind = getIndustry(industry);
  if (!s || !b || !ind) notFound();

  const popularRetainer = RETAINERS.find(r => r.popular && r.serviceSlug === (slug === 'seo-london' ? 'seo' : slug === 'ppc-london' ? 'ppc' : slug === 'social-media-london' ? 'social-media' : ''));
  const otherServices = SERVICES.filter(x => x.slug !== s.slug).slice(0, 4);
  const otherBoroughs = BOROUGHS.filter(x => x.slug !== b.slug).slice(0, 4);
  const otherIndustries = INDUSTRIES.filter(x => x.slug !== ind.slug).slice(0, 4);

  const faqs = [
    { q: `How much does ${s.shortName.toLowerCase()} cost for ${ind.shortName.toLowerCase()} in ${b.name}?`, a: `${s.shortName} for ${ind.shortName.toLowerCase()} businesses starts from ${s.priceFrom}/${s.priceUnit}. Meridian prices all services 40% below the London market average.` },
    { q: `Do you have ${ind.shortName.toLowerCase()} experience?`, a: `Yes. ${ind.shortName} is one of our core verticals. We understand the specific compliance, audience, and competitive dynamics of ${ind.name.toLowerCase()} businesses in ${b.name}.` },
    { q: `How quickly can ${s.shortName.toLowerCase()} show results in ${b.name}?`, a: `Borough-level keywords for ${b.name} typically show faster gains (6-8 weeks) than London-wide hero terms (4-6 months) due to lower competition.` },
  ];

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: s.shortName, url: `/services/${s.slug}` },
    { name: b.name, url: `/services/${s.slug}/${b.slug}` },
    { name: ind.shortName, url: `/services/${s.slug}/${b.slug}/${ind.slug}` },
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

      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>{s.tag} · {ind.icon} {ind.shortName.toUpperCase()} · {b.postcodes[0]}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(36px,5.5vw,68px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            {s.shortName} for <span className="accent">{ind.shortName.toLowerCase()}</span> in {b.name}.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>
            Specialist {s.shortName.toLowerCase()} for {ind.name.toLowerCase()} businesses in {b.name}. <strong>From {s.priceFrom}/{s.priceUnit}</strong> — 40% below London market average.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
            <Link href="/pricing" className="btn btn-ghost">See Pricing</Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>{ind.shortName} specialists</span>
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>{b.name} coverage</span>
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>40% below market</span>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">WHAT YOU GET</span>
            <h2 className="section-title">{s.shortName} for {ind.shortName.toLowerCase()} in <span className="accent">{b.name}</span>.</h2>
          </div>
          <div className="includes-grid stagger-grid reveal">
            {s.bullets.slice(0, 4).map((bullet, i) => (
              <article key={i} className="include-card">
                <div className="include-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
                <p className="include-p">{bullet}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      {popularRetainer && (
        <section style={{ padding: '60px 0' }}>
          <div className="wrap" style={{ maxWidth: '480px' }}>
            <div className="cost-card reveal" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', marginBottom: '8px' }}>{popularRetainer.serviceName.toUpperCase()} FOR {ind.shortName.toUpperCase()}</div>
              <div className="cost-price">{formatGBP(popularRetainer.paygMonthly)}<span style={{ fontSize: '16px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>/mo</span></div>
              <div className="cost-market">vs <s>{formatGBP(popularRetainer.marketAvgMonthly)}</s> · <strong>save {calcSavingsVsMarket(popularRetainer.paygMonthly, popularRetainer.marketAvgMonthly)}%</strong></div>
              <Link href={`/pricing?service=${popularRetainer.serviceSlug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>Get Started →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Lead capture */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="wrap" style={{ maxWidth: '540px' }}>
          <div className="reveal">
            <LeadCaptureForm source={`triple-${s.slug}-${b.slug}-${ind.slug}`} heading={`Free ${ind.shortName} audit for ${b.name}`} subtext={`Benchmarked against ${ind.shortName.toLowerCase()} competitors in ${b.name}.`} dark />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">FAQ</span><h2 className="section-title"><span className="accent">Questions</span> answered.</h2></div>
          <div className="faq-list reveal">
            {faqs.map((f, i) => (<details key={i} className="faq-item"><summary className="faq-q">{f.q}</summary><div className="faq-a">{f.a}</div></details>))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="locations-section">
        <div className="wrap">
          <div className="borough-track reveal">
            {otherServices.map((o) => (<Link key={o.slug} href={`/services/${o.slug}/${b.slug}/${ind.slug}`} className="borough"><span className="dot"></span>{o.shortName}</Link>))}
            {otherBoroughs.map((n) => (<Link key={n.slug} href={`/services/${s.slug}/${n.slug}/${ind.slug}`} className="borough"><span className="dot"></span>{n.name}</Link>))}
            {otherIndustries.map((i) => (<Link key={i.slug} href={`/services/${s.slug}/${b.slug}/${i.slug}`} className="borough featured"><span className="dot"></span>{i.shortName}</Link>))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap"><div className="final-card reveal">
          <h2 className="final-h">{s.shortName} for {ind.shortName.toLowerCase()} in {b.name}.</h2>
          <p className="final-p">Free audit. No obligation. 40% below market.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}><Link href="/audit" className="btn btn-primary">Get Free Audit →</Link><Link href="/contact" className="btn btn-ghost">Book a Call</Link></div>
        </div></div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
      <div className="mobile-cta" role="complementary"><span className="mobile-cta-text">Free SEO audit, 90s.</span><Link href="/audit" className="mobile-cta-btn">Get Audit →</Link></div>
    </>
  );
}
