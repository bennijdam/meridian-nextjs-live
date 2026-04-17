/**
 * /compare/[slug] — Comparison pages targeting "X vs Y" keywords.
 * 5 pages targeting high-value commercial investigation queries.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COMPARISONS, getComparison, ALL_COMPARISON_SLUGS } from '@/lib/comparisons';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';

export function generateStaticParams() {
  return ALL_COMPARISON_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/compare/${c.slug}` },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: `/compare/${c.slug}`, type: 'article', locale: 'en_GB' },
    keywords: c.keywords,
  };
}

export default async function ComparePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const otherComparisons = COMPARISONS.filter(x => x.slug !== c.slug);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Compare', url: '/compare' },
    { name: c.title, url: `/compare/${c.slug}` },
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

      <section className="service-hero" style={{ paddingBottom: '40px' }}>
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>COMPARISON · 2026</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(40px,6vw,76px)', maxWidth: '900px', margin: '0 auto 22px' }}>{c.title}</h1>
          <p className="hero-sub" style={{ margin: '0 auto 32px', maxWidth: '660px', textAlign: 'center' }}>{c.intro}</p>
        </div>
      </section>

      {/* Side-by-side comparison */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Desktop: side by side */}
            <div className="includes-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {/* Option A */}
              <div className="include-card reveal" style={{ borderColor: 'rgba(91,140,255,0.3)' }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', marginBottom: '16px', letterSpacing: '-0.015em' }}>{c.optionA.name}</h2>
                <h3 style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--accent-3)', letterSpacing: '0.06em', marginBottom: '12px' }}>PROS</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {c.optionA.pros.map((p, i) => (
                    <li key={i} style={{ fontSize: '13.5px', color: 'var(--ink-2)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: '1.45' }}><span style={{ color: 'var(--accent-3)', flexShrink: 0 }}>✓</span> {p}</li>
                  ))}
                </ul>
                <h3 style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--accent-2)', letterSpacing: '0.06em', marginBottom: '12px' }}>CONS</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {c.optionA.cons.map((con, i) => (
                    <li key={i} style={{ fontSize: '13.5px', color: 'var(--ink-2)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: '1.45' }}><span style={{ color: 'var(--accent-2)', flexShrink: 0 }}>✗</span> {con}</li>
                  ))}
                </ul>
                <div style={{ padding: '14px', borderRadius: 'var(--r-sm)', background: 'var(--surface)', border: '1px solid var(--border)', fontSize: '13px', color: 'var(--ink-2)' }}>
                  <strong style={{ color: 'var(--ink)' }}>Best for:</strong> {c.optionA.bestFor}
                </div>
              </div>

              {/* Option B */}
              <div className="include-card reveal" style={{ borderColor: 'rgba(255,91,227,0.3)' }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', marginBottom: '16px', letterSpacing: '-0.015em' }}>{c.optionB.name}</h2>
                <h3 style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--accent-3)', letterSpacing: '0.06em', marginBottom: '12px' }}>PROS</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {c.optionB.pros.map((p, i) => (
                    <li key={i} style={{ fontSize: '13.5px', color: 'var(--ink-2)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: '1.45' }}><span style={{ color: 'var(--accent-3)', flexShrink: 0 }}>✓</span> {p}</li>
                  ))}
                </ul>
                <h3 style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--accent-2)', letterSpacing: '0.06em', marginBottom: '12px' }}>CONS</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {c.optionB.cons.map((con, i) => (
                    <li key={i} style={{ fontSize: '13.5px', color: 'var(--ink-2)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: '1.45' }}><span style={{ color: 'var(--accent-2)', flexShrink: 0 }}>✗</span> {con}</li>
                  ))}
                </ul>
                <div style={{ padding: '14px', borderRadius: 'var(--r-sm)', background: 'var(--surface)', border: '1px solid var(--border)', fontSize: '13px', color: 'var(--ink-2)' }}>
                  <strong style={{ color: 'var(--ink)' }}>Best for:</strong> {c.optionB.bestFor}
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div className="audit-card reveal" style={{ maxWidth: '800px', margin: '0 auto', padding: '32px' }}>
              <span className="audit-eye">OUR VERDICT</span>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.65', marginTop: '12px' }}>{c.verdict}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">FAQ</span><h2 className="section-title">Common <span className="accent">questions</span>.</h2></div>
          <div className="faq-list reveal">
            {c.faqs.map((f, i) => (<details key={i} className="faq-item"><summary className="faq-q">{f.q}</summary><div className="faq-a">{f.a}</div></details>))}
          </div>
        </div>
      </section>

      {/* Other comparisons */}
      <section className="locations-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">MORE COMPARISONS</span><h2 className="section-title">Other <span className="accent">comparisons</span>.</h2></div>
          <div className="borough-track reveal">
            {otherComparisons.map((o) => (<Link key={o.slug} href={`/compare/${o.slug}`} className="borough featured"><span className="dot"></span>{o.optionA.name} vs {o.optionB.name}</Link>))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap"><div className="final-card reveal">
          <h2 className="final-h">Still not sure?</h2>
          <p className="final-p">Get a free audit — we&apos;ll recommend the right approach for your business. No obligation.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}><Link href="/audit" className="btn btn-primary">Get Free Audit →</Link><Link href="/contact" className="btn btn-ghost">Book a Call</Link></div>
        </div></div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
      <div className="mobile-cta" role="complementary"><span className="mobile-cta-text">Free SEO audit, 90s.</span><Link href="/audit" className="mobile-cta-btn">Get Audit →</Link></div>
    </>
  );
}
