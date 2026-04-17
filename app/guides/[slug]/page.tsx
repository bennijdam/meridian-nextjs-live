/**
 * /guides/[slug] — In-depth guide pages targeting high-volume informational queries.
 * AI citation builders with checklists, structured content, and lead capture.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GUIDES, getGuide, ALL_GUIDE_SLUGS } from '@/lib/guides';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export function generateStaticParams() {
  return ALL_GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { title: g.metaTitle, description: g.metaDescription, url: `/guides/${g.slug}`, type: 'article', locale: 'en_GB' },
    keywords: g.keywords,
  };
}

export default async function GuidePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const otherGuides = GUIDES.filter(x => x.slug !== g.slug);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: g.title, url: `/guides/${g.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(g.faqs)) }} />
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
          <span className="service-eyebrow"><span className="pulse"></span>{g.category.toUpperCase()} GUIDE · {g.readTime.toUpperCase()}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(36px,5.5vw,72px)', maxWidth: '900px', margin: '0 auto 22px' }}>{g.title}</h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>{g.intro}</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <a href="#checklist" className="btn btn-primary">Jump to Checklist ↓</a>
            <Link href="/audit" className="btn btn-ghost">Get Free Audit</Link>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section style={{ padding: '0 0 40px' }}>
        <div className="wrap" style={{ maxWidth: '900px' }}>
          <div className="hero-image-section reveal">
            <picture>
              <source type="image/avif" srcSet={`/img/${g.image}-480w.avif 480w, /img/${g.image}-768w.avif 768w, /img/${g.image}-1200w.avif 1200w`} sizes="(min-width: 900px) 900px, 100vw" />
              <source type="image/webp" srcSet={`/img/${g.image}-480w.webp 480w, /img/${g.image}-768w.webp 768w, /img/${g.image}-1200w.webp 1200w`} sizes="(min-width: 900px) 900px, 100vw" />
              <img src={`/img/${g.image}-1200w.webp`} alt={g.title} width="900" height="400" loading="eager" />
            </picture>
            <div className="img-stat-badge" style={{ bottom: '20px', right: '20px', animation: 'float2 7s ease-in-out infinite' }}>
              <div><div className="badge-num">{g.readTime}</div><div className="badge-cap">{g.category}</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <div className="blog-content">
            {g.sections.map((section, i) => (
              <div key={i} className="reveal" style={{ marginBottom: '48px' }}>
                <h2>{section.heading}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      {g.checklist && g.checklist.length > 0 && (
        <section id="checklist" style={{ padding: '60px 0 80px' }}>
          <div className="wrap" style={{ maxWidth: '780px' }}>
            <div className="section-head reveal">
              <span className="section-eyebrow">CHECKLIST</span>
              <h2 className="section-title">The <span className="accent">complete checklist</span>.</h2>
            </div>
            <div className="includes-grid stagger-grid reveal" style={{ gridTemplateColumns: '1fr' }}>
              {g.checklist.map((item, i) => (
                <div key={i} className="include-card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent-3), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', fontSize: '14px', fontWeight: 700 }}>{i + 1}</div>
                  <span style={{ fontSize: '14.5px', color: 'var(--ink)', lineHeight: '1.5' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead capture mid-article */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: '540px' }}>
          <div className="reveal">
            <LeadCaptureForm
              source={`guide-${g.slug}`}
              heading="Want personalised advice?"
              subtext="Get a free audit — we'll tell you exactly which items from this checklist apply to your business."
              dark
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">FAQ</span><h2 className="section-title">Common <span className="accent">questions</span>.</h2></div>
          <div className="faq-list reveal">
            {g.faqs.map((f, i) => (<details key={i} className="faq-item"><summary className="faq-q">{f.q}</summary><div className="faq-a">{f.a}</div></details>))}
          </div>
        </div>
      </section>

      {/* Other guides */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">MORE GUIDES</span><h2 className="section-title">Other <span className="accent">guides</span>.</h2></div>
          <div className="borough-track reveal">
            {otherGuides.map((o) => (<Link key={o.slug} href={`/guides/${o.slug}`} className="borough featured"><span className="dot"></span>{o.category}: {o.title.slice(0, 40)}...</Link>))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap"><div className="final-card reveal">
          <h2 className="final-h">Ready to put this into action?</h2>
          <p className="final-p">Free 90-second audit. We&apos;ll apply this guide to your specific business.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}><Link href="/audit" className="btn btn-primary">Get Free Audit →</Link><Link href="/contact" className="btn btn-ghost">Book a Call</Link></div>
        </div></div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
      <div className="mobile-cta" role="complementary"><span className="mobile-cta-text">Free SEO audit, 90s.</span><Link href="/audit" className="mobile-cta-btn">Get Audit →</Link></div>
    </>
  );
}
