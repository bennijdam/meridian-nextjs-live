import type { Metadata } from 'next';
import Link from 'next/link';
import { CASE_STUDIES } from '@/lib/case-studies';
import { jsonLd, breadcrumbSchema, organizationSchema } from '@/lib/schema';
import HomepageInteractions from '@/components/HomepageInteractions';
import SiteHeader from '@/components/home/SiteHeader';
import SiteFooter from '@/components/home/SiteFooter';
import MobileCTA from '@/components/home/MobileCTA';

export const metadata: Metadata = {
  title: 'Case Studies — Measurable Results for London Brands | Meridian',
  description: 'Real results from real London brands. Case studies across fintech, hospitality, legal, SaaS, beauty, and construction. Before-and-after metrics, client testimonials, and the strategies behind the numbers.',
  alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }} />
      <HomepageInteractions />
      <SiteHeader />

      <section className="inner-hero">
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-dot-grid" aria-hidden="true" />
        <div className="wrap">
          <span className="section-eyebrow" data-scramble="true">PROVEN RESULTS</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            Case <span className="accent">studies</span>.
          </h1>
          <p className="section-sub">
            Real results from real London brands. Before-and-after metrics, the strategies behind the numbers,
            and the client testimonials to back them up.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center', marginTop: '32px' }}>
            <Link href="/audit" className="btn btn-primary magnetic">
              Get Free SEO Audit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/pricing" className="btn btn-ghost magnetic">View Pricing</Link>
          </div>
        </div>
      </section>

      {/* Results stats strip */}
      <div className="page-img-banner reveal">
        <picture>
          <source type="image/webp" srcSet="/img/business-strategy-meeting-480w.webp 480w, /img/business-strategy-meeting-768w.webp 768w, /img/business-strategy-meeting-1200w.webp 1200w, /img/business-strategy-meeting-1920w.webp 1920w" sizes="(min-width: 1360px) 1312px, 100vw" />
          <img src="/img/business-strategy-meeting-1200w.webp" alt="London agency team presenting campaign results and case study metrics" width="1200" height="520" loading="eager" />
        </picture>
      </div>

      <div className="section-box-wrap inner-section-box-wrap">
        <div className="section-box">
          <div className="wrap">
            <div className="includes-grid reveal" style={{ marginBottom: '0' }}>
              {CASE_STUDIES.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="include-card"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '14px' }}
                >
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                      padding: '3px 10px', borderRadius: '100px', background: 'var(--accent)', color: '#000',
                    }}>
                      {cs.industry}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{cs.service}</span>
                  </div>
                  <div style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, lineHeight: 1.2, color: 'var(--accent)' }}>
                    {cs.title}
                  </div>
                  <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{cs.client}</h2>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, flex: 1 }}>
                    {cs.description.length > 140 ? cs.description.slice(0, 140) + '...' : cs.description}
                  </p>
                  <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>
                    Read case study &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="final-cta" style={{ padding: '60px 0 80px' }}>
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Want results like these?</h2>
            <p className="final-p">Get a free SEO audit or explore our pricing to get started.</p>
            <div className="cta-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
              <Link href="/audit" className="btn btn-primary magnetic">Free SEO Audit →</Link>
              <Link href="/pricing" className="btn btn-ghost magnetic">View Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA />
    </>
  );
}
