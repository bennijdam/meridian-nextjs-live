/**
 * /cost/[service] — "How much does X cost in London" pages.
 * AI Overview magnets targeting informational pricing queries.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COST_PAGES, getCostPage, ALL_COST_SLUGS } from '@/lib/cost-pages';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export function generateStaticParams() {
  return ALL_COST_SLUGS.map((service) => ({ service }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ service: string }> }
): Promise<Metadata> {
  const { service } = await params;
  const c = getCostPage(service);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/cost/${c.slug}` },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: `/cost/${c.slug}`, type: 'article', locale: 'en_GB' },
    keywords: c.keywords,
  };
}

export default async function CostPageRoute(
  { params }: { params: Promise<{ service: string }> }
) {
  const { service } = await params;
  const c = getCostPage(service);
  if (!c) notFound();

  const otherCostPages = COST_PAGES.filter(x => x.slug !== c.slug);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pricing', url: '/pricing' },
    { name: `${c.service} Cost`, url: `/cost/${c.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(c.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />

      <header role="banner">
        <Link href="/" className="logo" aria-label="Meridian — home"><span className="logo-mark" aria-hidden="true"></span><span>Meridian</span></Link>
        <nav role="navigation" aria-label="Primary"><Link href="/services">Services</Link><Link href="/pricing">Pricing</Link><Link href="/audit">Free Audit</Link><Link href="/reviews">Reviews</Link><Link href="/london">London</Link><Link href="/faq">FAQ</Link></nav>
        <button className="theme-toggle" id="themeToggle" aria-label="Toggle light/dark theme" type="button"><svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg><svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></button>
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      {/* Hero — leads with the answer (AEO requirement) */}
      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>{c.service.toUpperCase()} PRICING · LONDON 2026</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(40px,6vw,76px)', maxWidth: '900px', margin: '0 auto 22px' }}>{c.title}</h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '700px', textAlign: 'center' }}>
            <strong>{c.heroAnswer}</strong>
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="#pricing" className="btn btn-primary">See Pricing Breakdown →</Link>
            <Link href="/audit" className="btn btn-ghost">Get Free Audit</Link>
          </div>
        </div>
      </section>

      {/* Hero image with floating badges */}
      <section style={{ padding: '0 0 40px' }}>
        <div className="wrap" style={{ maxWidth: '900px' }}>
          <div className="hero-image-section reveal">
            <picture>
              <source type="image/avif" srcSet={`/img/${c.image}-480w.avif 480w, /img/${c.image}-768w.avif 768w, /img/${c.image}-1200w.avif 1200w, /img/${c.image}-1920w.avif 1920w`} sizes="(min-width: 900px) 900px, 100vw" />
              <source type="image/webp" srcSet={`/img/${c.image}-480w.webp 480w, /img/${c.image}-768w.webp 768w, /img/${c.image}-1200w.webp 1200w, /img/${c.image}-1920w.webp 1920w`} sizes="(min-width: 900px) 900px, 100vw" />
              <img src={`/img/${c.image}-1200w.webp`} alt={`${c.service} cost guide London 2026`} width="900" height="400" loading="eager" />
            </picture>
            <div className="img-stat-badge" style={{ bottom: '24px', left: '24px', animation: 'float1 6s ease-in-out infinite' }}>
              <div><div className="badge-num">{c.tiers[0].meridianPrice}</div><div className="badge-cap">From</div></div>
            </div>
            <div className="img-stat-badge" style={{ top: '24px', right: '24px', animation: 'float2 7s ease-in-out infinite' }}>
              <div><div className="badge-num">40%</div><div className="badge-cap">Below market</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section id="pricing" style={{ padding: '60px 0 80px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{c.service.toUpperCase()} PRICING BREAKDOWN</span>
            <h2 className="section-title">{c.service} pricing tiers. <span className="accent">40% below market.</span></h2>
          </div>
          <div className="includes-grid stagger-grid reveal">
            {c.tiers.map((tier, i) => (
              <div key={i} className="cost-card">
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>{tier.name.toUpperCase()}</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', letterSpacing: '-0.015em', marginBottom: '4px' }}>{tier.name}</h3>
                <div className="cost-price">{tier.meridianPrice}</div>
                <div className="cost-market">vs <s>{tier.marketPrice}</s> market · <strong>save 40%</strong></div>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', margin: '14px 0', lineHeight: '1.5' }}>{tier.description}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                  {tier.features.map((f, fi) => (
                    <li key={fi} style={{ fontSize: '12.5px', color: 'var(--ink-2)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: '1.45' }}>
                      <span style={{ color: 'var(--accent-3)', flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}>Get Started →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What affects cost */}
      <section className="method-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">WHAT AFFECTS COST</span>
            <h2 className="section-title">Why {c.service.toLowerCase()} costs <span className="accent">vary</span>.</h2>
          </div>
          <div className="method-grid reveal">
            {c.factors.map((factor, i) => (
              <div key={i} className="method-step">
                <div className="method-num"><strong>{String(i + 1).padStart(2, '0')}</strong></div>
                <h3 className="method-h">{factor.title}</h3>
                <p className="method-p">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section style={{ padding: '80px 0' }}>
        <div className="wrap" style={{ maxWidth: '540px' }}>
          <div className="reveal">
            <LeadCaptureForm
              source={`cost-page-${c.slug}`}
              heading={`Get your free ${c.service} audit`}
              subtext={`We'll analyse your site and tell you exactly what ${c.service.toLowerCase()} scope and budget you need. 12-page PDF in 90 seconds.`}
              dark
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{c.service.toUpperCase()} COST FAQ</span>
            <h2 className="section-title">{c.service} pricing <span className="accent">questions</span>.</h2>
          </div>
          <div className="faq-list reveal">
            {c.faqs.map((f, i) => (<details key={i} className="faq-item"><summary className="faq-q">{f.q}</summary><div className="faq-a">{f.a}</div></details>))}
          </div>
        </div>
      </section>

      {/* Other cost guides */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">MORE PRICING GUIDES</span><h2 className="section-title">Other <span className="accent">cost guides</span>.</h2></div>
          <div className="borough-track reveal">
            {otherCostPages.map((o) => (<Link key={o.slug} href={`/cost/${o.slug}`} className="borough featured"><span className="dot"></span>{o.service} Cost Guide</Link>))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap"><div className="final-card reveal">
          <h2 className="final-h">Know your {c.service.toLowerCase()} budget?</h2>
          <p className="final-p">Get started today — 40% below London market average. Free audit available.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}><Link href="/pricing" className="btn btn-primary">View Full Pricing →</Link><Link href="/audit" className="btn btn-ghost">Free Audit →</Link></div>
        </div></div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
      <div className="mobile-cta" role="complementary"><span className="mobile-cta-text">Free SEO audit, 90s.</span><Link href="/audit" className="mobile-cta-btn">Get Audit →</Link></div>
    </>
  );
}
