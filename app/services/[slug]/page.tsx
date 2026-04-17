/**
 * /services/[slug] — Service landing pages with full pricing + Stripe checkout.
 *
 * Each page targets the hero "[service] london" keyword and includes:
 * - Service-page design (centered hero, stats, includes, methodology)
 * - Full pricing tiers with billing toggle (PAYG / Monthly / Annual)
 * - Stripe checkout buttons for instant payment
 * - Borough cross-links for long-tail SEO
 * - FAQ with schema
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, getService, ALL_SERVICE_SLUGS } from '@/lib/services';
import { FEATURED_BOROUGHS, BOROUGHS } from '@/lib/boroughs';
import { RETAINERS, PROJECTS, formatGBP, calcSavingsVsMarket } from '@/lib/pricing';
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';
import PricingCards from '@/components/PricingCards';
import InternalLinks from '@/components/InternalLinks';

export function generateStaticParams() {
  return ALL_SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: `/services/${s.slug}`, type: 'website' },
  };
}

const PRICING_SLUG_MAP: Record<string, string> = {
  'seo-london': 'seo',
  'ppc-london': 'ppc',
  'web-design-london': 'web-design',
  'app-development-london': 'app-development',
  'social-media-london': 'social-media',
  'branding-london': 'branding',
  'business-plan-london': 'business-plans',
  'copywriting-london': 'copywriting',
  'email-marketing-london': 'email-marketing',
  'video-production-london': 'video-production',
  'ecommerce-london': 'ecommerce',
};

export default async function ServicePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const pricingSlug = PRICING_SLUG_MAP[s.slug] || '';
  const serviceRetainers = RETAINERS.filter(r => r.serviceSlug === pricingSlug);
  const serviceProjects = PROJECTS.filter(p => p.serviceSlug === pricingSlug);
  const otherServices = SERVICES.filter((x) => x.slug !== s.slug);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: s.shortName, url: `/services/${s.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema(s)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(s.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />

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
          <span className="service-eyebrow"><span className="pulse"></span>{s.tag}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(48px,7vw,88px)', maxWidth: '980px', margin: '0 auto 22px' }}>
            {s.name}. <span className="accent">40% less.</span>
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>
            {s.intro} <strong>From {s.priceFrom}/{s.priceUnit}</strong> — 40% below the London market average. No hidden fees. Pay as you go or commit for bigger savings.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="#pricing" className="btn btn-primary">See Pricing &amp; Pay →</Link>
            <Link href="/audit" className="btn btn-ghost">Free Audit First</Link>
          </div>
          <div className="trust-pill-row">
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>From {s.priceFrom}/{s.priceUnit}</span>
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>4.9★ · 127 verified reviews</span>
            <span className="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>94% client retention 24mo+</span>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="wrap">
          <div className="stats-grid reveal">
            <div className="stat-block"><div className="stat-num">+342%</div><div className="stat-label">Avg organic uplift</div></div>
            <div className="stat-block"><div className="stat-num">94%</div><div className="stat-label">Client retention 24mo+</div></div>
            <div className="stat-block"><div className="stat-num">200+</div><div className="stat-label">London brands served</div></div>
            <div className="stat-block"><div className="stat-num">2.1s</div><div className="stat-label">Avg LCP, sites we ship</div></div>
          </div>
        </div>
      </section>

      <section className="includes-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">WHAT&apos;S INCLUDED</span>
            <h2 className="section-title">{s.shortName} — <span className="accent">what you get</span>.</h2>
          </div>
          <div className="includes-grid reveal">
            {s.bullets.map((bullet, i) => (
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

      {/* ========================= PRICING + STRIPE CHECKOUT ========================= */}
      <section id="pricing" style={{ padding: '100px 0 60px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">PRICING · 40% BELOW MARKET · PAY NOW</span>
            <h2 className="section-title">{s.shortName} pricing. <span className="accent">Start today.</span></h2>
            <p className="section-sub">Every tier priced 40% below London market average. Choose your billing cycle. Secure checkout via Stripe.</p>
          </div>

          <PricingCards
            retainers={serviceRetainers}
            projects={serviceProjects}
            formatGBP={formatGBP}
            calcSavings={calcSavingsVsMarket}
          />

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/pricing" className="btn btn-ghost">Compare All Services →</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '16/9', position: 'relative' }}>
            <Image src={`/img/${s.imageSlug}-1200w.webp`} alt={s.imageAlt} fill sizes="(min-width: 800px) 800px, 100vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section className="method-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">HOW WE WORK</span>
            <h2 className="section-title">From kickoff to <span className="accent">compounding results</span>.</h2>
          </div>
          <div className="method-grid reveal">
            <div className="method-step"><div className="method-num"><strong>01</strong> WEEK 1</div><h3 className="method-h">Audit</h3><p className="method-p">Full technical audit, competitive analysis, strategy document. You approve before any work begins.</p></div>
            <div className="method-step"><div className="method-num"><strong>02</strong> WEEK 2–4</div><h3 className="method-h">Foundation</h3><p className="method-p">Technical fixes, tracking setup, account architecture. The unglamorous work that makes everything compound.</p></div>
            <div className="method-step"><div className="method-num"><strong>03</strong> MONTH 2–3</div><h3 className="method-h">Velocity</h3><p className="method-p">Content, campaigns, link building, paid media optimisation. Weekly reporting against real metrics.</p></div>
            <div className="method-step"><div className="method-num"><strong>04</strong> MONTH 4+</div><h3 className="method-h">Compound</h3><p className="method-p">Results compound. We reinvest gains into new verticals and channels. Monthly business reviews.</p></div>
          </div>
        </div>
      </section>

      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{s.shortName.toUpperCase()} ACROSS LONDON</span>
            <h2 className="section-title">{s.shortName} in <span className="accent">every borough</span>.</h2>
          </div>
          <div className="borough-track reveal">
            {FEATURED_BOROUGHS.map((b) => (
              <Link key={b.slug} href={`/services/${s.slug}/${b.slug}`} className="borough featured"><span className="dot" />{s.shortName} in {b.name}</Link>
            ))}
            {BOROUGHS.filter(b => !b.featured).slice(0, 6).map((b) => (
              <Link key={b.slug} href={`/services/${s.slug}/${b.slug}`} className="borough"><span className="dot" />{s.shortName} in {b.name}</Link>
            ))}
            <Link href="/london" className="borough featured"><span className="dot" />All 44 areas →</Link>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">{s.shortName.toUpperCase()} FAQ</span>
            <h2 className="section-title">Questions about <span className="accent">{s.shortName.toLowerCase()}</span>.</h2>
          </div>
          <div className="faq-list reveal">
            {s.faqs.map((f, i) => (
              <details key={i} className="faq-item"><summary className="faq-q">{f.q}</summary><div className="faq-a">{f.a}</div></details>
            ))}
          </div>
        </div>
      </section>

      <section className="locations-section" style={{ paddingTop: '20px' }}>
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">ALL SERVICES</span><h2 className="section-title">Other services we <span className="accent">offer</span>.</h2></div>
          <div className="borough-track reveal">
            {otherServices.map((o) => (<Link key={o.slug} href={`/services/${o.slug}`} className="borough"><span className="dot" />{o.shortName}</Link>))}
          </div>
        </div>
      </section>

      <InternalLinks currentService={s.slug} />

      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready for {s.shortName.toLowerCase()}?</h2>
            <p className="final-p">Get a free audit first, or go straight to checkout. No call required.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="#pricing" className="btn btn-primary">Choose a Plan →</Link>
              <Link href="/audit" className="btn btn-ghost">Free Audit First</Link>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-col footer-brand"><Link href="/" className="logo"><span className="logo-mark"></span><span>Meridian</span></Link><p>London&apos;s boutique digital performance studio since 2014.</p></div>
            <div className="footer-col"><h4>Services</h4><ul>{SERVICES.slice(0, 6).map(sv => (<li key={sv.slug}><Link href={`/services/${sv.slug}`}>{sv.shortName}</Link></li>))}</ul></div>
            <div className="footer-col"><h4>Company</h4><ul><li><Link href="/pricing">Pricing</Link></li><li><Link href="/reviews">Reviews</Link></li><li><Link href="/blog">Blog</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
            <div className="footer-col"><h4>Get Started</h4><ul><li><Link href="/audit">Free SEO Audit</Link></li><li><Link href="/pricing">View Pricing</Link></li></ul></div>
          </div>
          <div className="footer-bottom"><span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span><span>Cyber Essentials Plus · ISO 27001 · GDPR Compliant</span></div>
        </div>
      </footer>
      <div className="mobile-cta" role="complementary"><span className="mobile-cta-text">Free SEO audit, 90s.</span><Link href="/audit" className="mobile-cta-btn">Get Audit →</Link></div>
    </>
  );
}
