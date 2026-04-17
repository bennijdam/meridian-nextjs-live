/**
 * /best/[service] — "Best X in London" pages.
 * 7 pages targeting commercial investigation keywords (KD 36-48).
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BEST_PAGES, getBestPage, ALL_BEST_SLUGS } from '@/lib/best-pages';
import { RETAINERS, PROJECTS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export function generateStaticParams() {
  return ALL_BEST_SLUGS.map((service) => ({ service }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ service: string }> }
): Promise<Metadata> {
  const { service } = await params;
  const bp = getBestPage(service);
  if (!bp) return {};
  return {
    title: bp.metaTitle, description: bp.metaDescription,
    alternates: { canonical: `/best/${bp.slug}` },
    openGraph: { title: bp.metaTitle, description: bp.metaDescription, url: `/best/${bp.slug}`, type: 'article', locale: 'en_GB' },
    keywords: bp.keywords,
  };
}

export default async function BestPageRoute(
  { params }: { params: Promise<{ service: string }> }
) {
  const { service } = await params;
  const bp = getBestPage(service);
  if (!bp) notFound();

  const otherBestPages = BEST_PAGES.filter(x => x.slug !== bp.slug);
  const popularRetainers = RETAINERS.filter(r => r.popular).slice(0, 2);
  const popularProjects = PROJECTS.filter(p => p.popular).slice(0, 2);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: `Best ${bp.service}`, url: `/best/${bp.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(bp.faqs)) }} />
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
          <span className="service-eyebrow"><span className="pulse"></span>EXPERT GUIDE · {bp.service.toUpperCase()} · LONDON 2026</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(38px,5.5vw,72px)', maxWidth: '900px', margin: '0 auto 22px' }}>{bp.title}</h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>{bp.intro}</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <a href="#why-meridian" className="btn btn-primary">Why Meridian? ↓</a>
            <Link href="/audit" className="btn btn-ghost">Get Free Audit</Link>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section style={{ padding: '0 0 40px' }}>
        <div className="wrap" style={{ maxWidth: '900px' }}>
          <div className="hero-image-section reveal">
            <picture>
              <source type="image/avif" srcSet={`/img/${bp.image}-480w.avif 480w, /img/${bp.image}-768w.avif 768w, /img/${bp.image}-1200w.avif 1200w`} sizes="900px" />
              <source type="image/webp" srcSet={`/img/${bp.image}-480w.webp 480w, /img/${bp.image}-768w.webp 768w, /img/${bp.image}-1200w.webp 1200w`} sizes="900px" />
              <img src={`/img/${bp.image}-1200w.webp`} alt={bp.title} width="900" height="400" loading="eager" />
            </picture>
            <div className="img-stat-badge" style={{ top: '20px', right: '20px', animation: 'float2 7s ease-in-out infinite' }}>
              <div><div className="badge-num">2026</div><div className="badge-cap">Updated</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* What to look for */}
      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">WHAT TO LOOK FOR</span>
            <h2 className="section-title">How to spot the <span className="accent">best {bp.service.toLowerCase()} agency</span>.</h2>
          </div>
          <div className="includes-grid stagger-grid reveal">
            {bp.criteria.map((c, i) => (
              <article key={i} className="include-card">
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 700, marginBottom: '14px', fontFamily: 'var(--serif)' }}>{i + 1}</div>
                <h3 className="include-h" style={{ fontSize: '18px' }}>{c.title}</h3>
                <p className="include-p">{c.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Market context */}
      <section style={{ padding: '60px 0' }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <div className="audit-card reveal" style={{ padding: '32px' }}>
            <span className="audit-eye">MARKET CONTEXT</span>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.7', marginTop: '16px' }}>{bp.marketContext}</p>
          </div>
        </div>
      </section>

      {/* Why Meridian */}
      <section id="why-meridian" style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">WHY MERIDIAN</span>
            <h2 className="section-title">Why choose <span className="accent">Meridian</span> for {bp.service.toLowerCase()}.</h2>
          </div>
          <div className="includes-grid stagger-grid reveal" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {bp.whyMeridian.map((reason, i) => (
              <div key={i} className="include-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ color: 'var(--accent-3)', fontSize: '18px', flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: '14.5px', color: 'var(--ink)', lineHeight: '1.5' }}>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing snapshot */}
      <section style={{ padding: '60px 0' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET</span>
            <h2 className="section-title">Meridian pricing. <span className="accent">40% less.</span></h2>
          </div>
          <div className="includes-grid stagger-grid reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {popularRetainers.map((r) => (
              <div key={r.id} className="cost-card">
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', marginBottom: '6px' }}>{r.serviceName.toUpperCase()} · {r.tierName.toUpperCase()}</div>
                <div className="cost-price" style={{ fontSize: '36px' }}>{formatGBP(r.paygMonthly)}<span style={{ fontSize: '14px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>/mo</span></div>
                <div className="cost-market">vs <s>{formatGBP(r.marketAvgMonthly)}</s> · <strong>save {calcSavingsVsMarket(r.paygMonthly, r.marketAvgMonthly)}%</strong></div>
                <Link href={`/pricing?service=${r.serviceSlug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px', marginTop: '16px' }}>Get Started →</Link>
              </div>
            ))}
            {popularProjects.slice(0, 1).map((p) => (
              <div key={p.id} className="cost-card">
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', marginBottom: '6px' }}>{p.serviceName.toUpperCase()} · {p.tierName.toUpperCase()}</div>
                <div className="cost-price" style={{ fontSize: '36px' }}>{formatGBP(p.price)}<span style={{ fontSize: '14px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}> fixed</span></div>
                <div className="cost-market">vs <s>{formatGBP(p.marketAvg)}</s> · <strong>save {calcSavingsVsMarket(p.price, p.marketAvg)}%</strong></div>
                <Link href="/pricing" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '14px', marginTop: '16px' }}>View Details →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: '540px' }}>
          <div className="reveal">
            <LeadCaptureForm source={`best-${bp.slug}`} heading={`Free ${bp.service} audit`} subtext={`See how you compare to the top ${bp.service.toLowerCase()} businesses in London. 12-page PDF in 90 seconds.`} dark />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">FAQ</span><h2 className="section-title">Common <span className="accent">questions</span>.</h2></div>
          <div className="faq-list reveal">
            {bp.faqs.map((f, i) => (<details key={i} className="faq-item"><summary className="faq-q">{f.q}</summary><div className="faq-a">{f.a}</div></details>))}
          </div>
        </div>
      </section>

      {/* Other best-of guides */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">MORE GUIDES</span><h2 className="section-title">Other <span className="accent">&ldquo;best of&rdquo;</span> guides.</h2></div>
          <div className="borough-track reveal">
            {otherBestPages.map((o) => (<Link key={o.slug} href={`/best/${o.slug}`} className="borough featured"><span className="dot"></span>Best {o.service}</Link>))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap"><div className="final-card reveal">
          <h2 className="final-h">Found the right agency?</h2>
          <p className="final-p">Start with a free audit — no call, no obligation, just data.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}><Link href="/audit" className="btn btn-primary">Get Free Audit →</Link><Link href="/pricing" className="btn btn-ghost">View Pricing</Link></div>
        </div></div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
      <div className="mobile-cta" role="complementary"><span className="mobile-cta-text">Free SEO audit, 90s.</span><Link href="/audit" className="mobile-cta-btn">Get Audit →</Link></div>
    </>
  );
}
