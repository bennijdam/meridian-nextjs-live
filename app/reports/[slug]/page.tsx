/**
 * /reports/[slug] — Annual market report pages.
 * Link bait + AI citation magnets with real data.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getReport, ALL_REPORT_SLUGS } from '@/lib/reports';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export function generateStaticParams() {
  return ALL_REPORT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const r = getReport(slug);
  if (!r) return {};
  return {
    title: r.metaTitle, description: r.metaDescription,
    alternates: { canonical: `/reports/${r.slug}` },
    openGraph: { title: r.metaTitle, description: r.metaDescription, url: `/reports/${r.slug}`, type: 'article', locale: 'en_GB', publishedTime: r.date },
    keywords: r.keywords,
  };
}

function reportSchema(r: { title: string; summary: string; slug: string; date: string }) {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meridianweb.co.uk';
  return {
    "@context": "https://schema.org",
    "@type": "Report",
    "headline": r.title,
    "description": r.summary,
    "url": `${SITE}/reports/${r.slug}`,
    "datePublished": r.date,
    "dateModified": r.date,
    "author": { "@type": "Organization", "name": "Meridian", "url": SITE },
    "publisher": { "@type": "Organization", "name": "Meridian Digital Ltd", "url": SITE },
    "isAccessibleForFree": true,
  };
}

export default async function ReportPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const r = getReport(slug);
  if (!r) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Reports', url: '/reports' },
    { name: r.title, url: `/reports/${r.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(reportSchema(r)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(r.faqs)) }} />
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
          <span className="service-eyebrow"><span className="pulse"></span>ANNUAL REPORT · {r.year}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(36px,5.5vw,72px)', maxWidth: '900px', margin: '0 auto 22px' }}>{r.title}</h1>
          <p className="hero-sub" style={{ margin: '0 auto 24px', maxWidth: '700px', textAlign: 'center' }}>{r.summary}</p>
          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>Published {new Date(r.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · Free to read · Free to cite</p>
        </div>
      </section>

      {/* Hero image */}
      <section style={{ padding: '0 0 40px' }}>
        <div className="wrap" style={{ maxWidth: '900px' }}>
          <div className="hero-image-section reveal">
            <picture>
              <source type="image/avif" srcSet={`/img/${r.image}-480w.avif 480w, /img/${r.image}-768w.avif 768w, /img/${r.image}-1200w.avif 1200w`} sizes="900px" />
              <source type="image/webp" srcSet={`/img/${r.image}-480w.webp 480w, /img/${r.image}-768w.webp 768w, /img/${r.image}-1200w.webp 1200w`} sizes="900px" />
              <img src={`/img/${r.image}-1200w.webp`} alt={r.title} width="900" height="400" loading="eager" />
            </picture>
            <div className="img-stat-badge" style={{ top: '20px', right: '20px', animation: 'float2 7s ease-in-out infinite' }}>
              <div><div className="badge-num">{r.year}</div><div className="badge-cap">Annual Report</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Key findings */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: '900px' }}>
          <div className="section-head reveal">
            <span className="section-eyebrow">KEY FINDINGS</span>
            <h2 className="section-title">What the data <span className="accent">shows</span>.</h2>
          </div>
          <div className="includes-grid stagger-grid reveal" style={{ gridTemplateColumns: '1fr' }}>
            {r.keyFindings.map((finding, i) => (
              <div key={i} className="include-card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <span style={{ fontSize: '15px', color: 'var(--ink)', lineHeight: '1.55' }}>{finding}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data sections */}
      {r.sections.map((section, si) => (
        <section key={si} style={{ padding: '60px 0', background: si % 2 === 1 ? 'radial-gradient(ellipse 80% 50% at 50% 50%, color-mix(in srgb, var(--accent) 3%, transparent), transparent 70%)' : undefined }}>
          <div className="wrap" style={{ maxWidth: '900px' }}>
            <div className="section-head reveal">
              <span className="section-eyebrow">SECTION {si + 1}</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>{section.heading}</h2>
            </div>
            <div className="blog-content reveal" style={{ maxWidth: '780px', margin: '0 auto' }}>
              <p>{section.content}</p>
            </div>
            {section.stats && section.stats.length > 0 && (
              <div className="stats-grid reveal" style={{ marginTop: '32px' }}>
                {section.stats.map((stat, sti) => (
                  <div key={sti} className="stat-block">
                    <div className="stat-num">{stat.num}</div>
                    <div className="stat-label">{stat.label}</div>
                    {stat.source && <div style={{ fontSize: '10px', color: 'var(--ink-3)', fontFamily: 'var(--mono)', marginTop: '4px', opacity: 0.7 }}>{stat.source}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Methodology */}
      <section style={{ padding: '60px 0' }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <div className="audit-card reveal" style={{ padding: '32px' }}>
            <span className="audit-eye">METHODOLOGY</span>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', marginTop: '16px' }}>{r.methodology}</p>
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="wrap" style={{ maxWidth: '540px' }}>
          <div className="reveal">
            <LeadCaptureForm source={`report-${r.slug}`} heading="How does your business compare?" subtext="Free 90-second audit — we'll benchmark you against the data in this report." dark />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal"><span className="section-eyebrow">FAQ</span><h2 className="section-title">About this <span className="accent">report</span>.</h2></div>
          <div className="faq-list reveal">
            {r.faqs.map((f, i) => (<details key={i} className="faq-item"><summary className="faq-q">{f.q}</summary><div className="faq-a">{f.a}</div></details>))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap"><div className="final-card reveal">
          <h2 className="final-h">Want to beat these benchmarks?</h2>
          <p className="final-p">Free audit — we&apos;ll show you where you stand vs the London market data.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}><Link href="/audit" className="btn btn-primary">Get Free Audit →</Link><Link href="/pricing" className="btn btn-ghost">View Pricing</Link></div>
        </div></div>
      </section>

      <footer><div className="wrap"><div className="footer-bottom"><span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div></div></footer>
      <div className="mobile-cta" role="complementary"><span className="mobile-cta-text">Free SEO audit, 90s.</span><Link href="/audit" className="mobile-cta-btn">Get Audit →</Link></div>
    </>
  );
}
