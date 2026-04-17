/**
 * /near/[borough] — "Near me" local intent pages.
 * 44 pages targeting "digital marketing near me [borough]" searches.
 * Mobile-first — 70% of London service discovery is mobile.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BOROUGHS, getBorough, ALL_BOROUGH_SLUGS } from '@/lib/boroughs';
import { SERVICES } from '@/lib/services';
import { RETAINERS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export function generateStaticParams() {
  return ALL_BOROUGH_SLUGS.map((borough) => ({ borough }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ borough: string }> }
): Promise<Metadata> {
  const { borough } = await params;
  const b = getBorough(borough);
  if (!b) return {};
  const title = `Digital Marketing Agency Near ${b.name} | SEO, PPC, Web | Meridian`;
  const description = `Looking for a digital marketing agency near ${b.name}? Meridian delivers SEO, PPC, web design and more for ${b.name} businesses. 40% below market. Free audit.`;
  return {
    title, description,
    alternates: { canonical: `/near/${b.slug}` },
    openGraph: { title, description, url: `/near/${b.slug}`, type: 'website', locale: 'en_GB' },
  };
}

export default async function NearPage(
  { params }: { params: Promise<{ borough: string }> }
) {
  const { borough } = await params;
  const b = getBorough(borough);
  if (!b) notFound();

  const popularRetainers = RETAINERS.filter(r => r.popular).slice(0, 3);
  const neighbours = BOROUGHS.filter(x => x.slug !== b.slug).slice(0, 8);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Near Me', url: '/london' },
    { name: `Near ${b.name}`, url: `/near/${b.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />

      <header role="banner">
        <Link href="/" className="logo" aria-label="Meridian — home"><span className="logo-mark" aria-hidden="true"></span><span>Meridian</span></Link>
        <nav role="navigation" aria-label="Primary"><Link href="/services">Services</Link><Link href="/pricing">Pricing</Link><Link href="/audit">Free Audit</Link><Link href="/reviews">Reviews</Link><Link href="/london">London</Link><Link href="/faq">FAQ</Link></nav>
        <button className="theme-toggle" id="themeToggle" aria-label="Toggle light/dark theme" type="button"><svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg><svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></button>
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      {/* Hero — location-first messaging */}
      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>📍 NEAR {b.name.toUpperCase()} · {b.postcodes[0]}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(40px,6vw,76px)', maxWidth: '900px', margin: '0 auto 22px' }}>
            Digital marketing near <span className="accent">{b.name}</span>.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>
            London digital marketing agency serving {b.name} and surrounding areas. SEO, PPC, web design, app development and social media — <strong>40% below market rate</strong>.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
            <Link href={`/london/${b.slug}`} className="btn btn-ghost">{b.name} Services</Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>{b.postcodes.join(', ')}</span>
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>4.9★ · 127 reviews</span>
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>{b.hub}</span>
          </div>
        </div>
      </section>

      {/* Services near you */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">SERVICES NEAR {b.name.toUpperCase()}</span>
            <h2 className="section-title">What we do near <span className="accent">{b.name}</span>.</h2>
          </div>
          <div className="includes-grid stagger-grid reveal">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/${b.slug}`} className="include-card" style={{ cursor: 'pointer' }}>
                <div className="include-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
                <h3 className="include-h">{s.shortName} near {b.name}</h3>
                <p className="include-p">{s.intro}</p>
                <span style={{ fontSize: '13px', color: 'var(--accent)', marginTop: '10px', display: 'block' }}>From {s.priceFrom}/{s.priceUnit} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick pricing */}
      <section style={{ padding: '60px 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
            <h2 className="section-title">Pricing near <span className="accent">{b.name}</span>.</h2>
          </div>
          <div className="includes-grid stagger-grid reveal" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {popularRetainers.map((r) => (
              <div key={r.id} className="cost-card">
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', marginBottom: '6px' }}>{r.serviceName.toUpperCase()}</div>
                <div className="cost-price" style={{ fontSize: '32px' }}>{formatGBP(r.paygMonthly)}<span style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>/mo</span></div>
                <div className="cost-market">vs <s>{formatGBP(r.marketAvgMonthly)}</s> · <strong>save {calcSavingsVsMarket(r.paygMonthly, r.marketAvgMonthly)}%</strong></div>
                <Link href={`/pricing?service=${r.serviceSlug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '13px', marginTop: '14px', padding: '10px 16px' }}>Get Started →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: '540px' }}>
          <div className="reveal">
            <LeadCaptureForm source={`near-${b.slug}`} heading={`Free audit for ${b.name} businesses`} subtext={`We'll benchmark you against competitors near ${b.name}. 12-page PDF in 90 seconds.`} dark />
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">ALSO NEAR YOU</span><h2 className="section-title">Other areas <span className="accent">near {b.name}</span>.</h2></div>
          <div className="borough-track reveal">
            {neighbours.map((n) => (<Link key={n.slug} href={`/near/${n.slug}`} className={`borough${n.featured ? ' featured' : ''}`}><span className="dot"></span>Near {n.name}</Link>))}
            <Link href="/london" className="borough featured"><span className="dot"></span>All London areas →</Link>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap"><div className="final-card reveal">
          <h2 className="final-h">Digital marketing near {b.name}.</h2>
          <p className="final-p">Free 90-second audit. No call, no obligation.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}><Link href="/audit" className="btn btn-primary">Get Free Audit →</Link><Link href="/contact" className="btn btn-ghost">Book a Call</Link></div>
        </div></div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
      <div className="mobile-cta" role="complementary"><span className="mobile-cta-text">Free SEO audit, 90s.</span><Link href="/audit" className="mobile-cta-btn">Get Audit →</Link></div>
    </>
  );
}
