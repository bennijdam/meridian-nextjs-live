/**
 * /platforms/[platform] — Platform-specific landing pages.
 * 15 pages targeting "shopify agency london", "wordpress developer london" etc.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PLATFORMS, getPlatform, ALL_PLATFORM_SLUGS } from '@/lib/platforms';
import { RETAINERS, PROJECTS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';

export function generateStaticParams() {
  return ALL_PLATFORM_SLUGS.map((platform) => ({ platform }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ platform: string }> }
): Promise<Metadata> {
  const { platform } = await params;
  const p = getPlatform(platform);
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: `/platforms/${p.slug}` },
    openGraph: { title: p.metaTitle, description: p.metaDescription, url: `/platforms/${p.slug}`, type: 'website', locale: 'en_GB' },
  };
}

export default async function PlatformPage(
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  const p = getPlatform(platform);
  if (!p) notFound();

  const otherPlatforms = PLATFORMS.filter(x => x.slug !== p.slug).slice(0, 8);
  const popularRetainers = RETAINERS.filter(r => r.popular).slice(0, 2);
  const popularProjects = PROJECTS.filter(pr => pr.popular).slice(0, 2);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Platforms', url: '/platforms' },
    { name: p.name, url: `/platforms/${p.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(p.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />

      <header role="banner">
        <Link href="/" className="logo" aria-label="Meridian — home"><span className="logo-mark" aria-hidden="true"></span><span>Meridian</span></Link>
        <nav role="navigation" aria-label="Primary"><Link href="/services">Services</Link><Link href="/pricing">Pricing</Link><Link href="/audit">Free Audit</Link><Link href="/reviews">Reviews</Link><Link href="/london">London</Link><Link href="/faq">FAQ</Link></nav>
        <button className="theme-toggle" id="themeToggle" aria-label="Toggle light/dark theme" type="button"><svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg><svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></button>
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>{p.icon} {p.name.toUpperCase()} · {p.category.toUpperCase()}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(44px,6.5vw,84px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            <span className="accent">{p.name}</span> agency London.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>{p.intro}</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
            <Link href="#pricing" className="btn btn-ghost">See Pricing</Link>
          </div>
          <div className="trust-pill-row">
            {p.keywords.slice(0, 3).map((kw, i) => (
              <span key={i} className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>{kw}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{p.name.toUpperCase()} SERVICES</span>
            <h2 className="section-title">What we do with <span className="accent">{p.name}</span>.</h2>
          </div>
          <div className="includes-grid reveal">
            {p.bullets.map((b, i) => (
              <article key={i} className="include-card">
                <div className="include-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
                <p className="include-p">{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
            <h2 className="section-title">{p.name} pricing. <span className="accent">40% less.</span></h2>
          </div>
          <div className="includes-grid reveal">
            {[...popularRetainers, ...popularProjects].slice(0, 3).map((item) => {
              const isRetainer = 'paygMonthly' in item;
              const price = isRetainer ? (item as typeof popularRetainers[0]).paygMonthly : (item as typeof popularProjects[0]).price;
              const market = isRetainer ? (item as typeof popularRetainers[0]).marketAvgMonthly : (item as typeof popularProjects[0]).marketAvg;
              return (
                <article key={item.id} className="include-card">
                  <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', marginBottom: '6px' }}>{item.serviceName.toUpperCase()}</div>
                  <h3 className="include-h">{item.serviceName} for {p.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0 4px' }}>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: '36px', letterSpacing: '-0.02em', background: 'linear-gradient(180deg, var(--ink), var(--ink-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{formatGBP(price)}</span>
                    <span style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{isRetainer ? '/mo' : 'fixed'}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginBottom: '14px' }}>vs <s style={{ color: 'var(--ink-3)' }}>{formatGBP(market)}</s> · <strong style={{ color: 'var(--accent-3)' }}>save {calcSavingsVsMarket(price, market)}%</strong></p>
                  <Link href="/pricing" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}>Get Started →</Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{p.name.toUpperCase()} FAQ</span>
            <h2 className="section-title">Questions about <span className="accent">{p.name}</span>.</h2>
          </div>
          <div className="faq-list reveal">
            {p.faqs.map((f, i) => (
              <details key={i} className="faq-item"><summary className="faq-q">{f.q}</summary><div className="faq-a">{f.a}</div></details>
            ))}
          </div>
        </div>
      </section>

      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">ALL PLATFORMS</span><h2 className="section-title">Other platforms we <span className="accent">work with</span>.</h2></div>
          <div className="borough-track reveal">
            {otherPlatforms.map((o) => (<Link key={o.slug} href={`/platforms/${o.slug}`} className="borough"><span className="dot"></span>{o.name}</Link>))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap"><div className="final-card reveal">
          <h2 className="final-h">Need {p.name} help?</h2>
          <p className="final-p">Free audit + consultation. No obligation.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}><Link href="/audit" className="btn btn-primary">Get Free Audit →</Link><Link href="/contact" className="btn btn-ghost">Book a Call</Link></div>
        </div></div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
      <div className="mobile-cta" role="complementary"><span className="mobile-cta-text">Free SEO audit, 90s.</span><Link href="/audit" className="mobile-cta-btn">Get Audit →</Link></div>
    </>
  );
}
