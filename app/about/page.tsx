import type { Metadata } from 'next';
import Link from 'next/link';
import { jsonLd, breadcrumbSchema } from '@/lib/schema';
import HomepageInteractions from '@/components/HomepageInteractions';
import SiteHeader from '@/components/home/SiteHeader';
import SiteFooter from '@/components/home/SiteFooter';
import MobileCTA from '@/components/home/MobileCTA';

export const metadata: Metadata = {
  title: 'About Meridian — London digital performance studio',
  description: '12 years building digital programmes for London brands. 14 senior people. No juniors. No account-management tax. 40% below market. 200+ clients.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <HomepageInteractions />
      <SiteHeader />

      <section className="inner-hero">
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-orb hero-orb-3" aria-hidden="true" />
        <div className="hero-dot-grid" aria-hidden="true" />
        <div className="wrap">
          <span className="section-eyebrow" data-scramble="true">ABOUT MERIDIAN</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            Twelve years deep in <span className="accent">London digital</span>.
          </h1>
          <p className="section-sub">
            Founded in 2014. Headquartered on Finsbury Avenue. Built around one stubborn idea — that London brands should never pay for junior account managers, slide decks, or quarterly reviews dressed up as strategy.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center', marginTop: '32px' }}>
            <Link href="/contact" className="btn btn-primary magnetic">
              Get in touch
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/#audit" className="btn btn-ghost magnetic">Free SEO audit</Link>
          </div>
        </div>
      </section>

      {/* Team photo */}
      <div className="page-img-banner reveal">
        <picture>
          <source type="image/webp" srcSet="/img/london-office-team-480w.webp 480w, /img/london-office-team-768w.webp 768w, /img/london-office-team-1200w.webp 1200w, /img/london-office-team-1920w.webp 1920w" sizes="(min-width: 1360px) 1312px, 100vw" />
          <img src="/img/london-office-team-1200w.webp" alt="Meridian London digital agency team at work" width="1200" height="800" loading="eager" />
        </picture>
      </div>

      {/* Story + stats */}
      <div className="section-box-wrap">
        <div className="section-box">
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px', maxWidth: '1100px', margin: '0 auto' }} className="reveal about-story-grid">
              <div>
                <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)', textAlign: 'left', marginBottom: '20px' }}>
                  The agency we couldn&apos;t hire — so we built it.
                </h2>
                <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '16px' }}>
                  We were two ex-in-house growth leads at a Shoreditch fintech and a Mayfair private bank. We&apos;d worked with seven different London agencies between us. None of them were worth what they charged.
                </p>
                <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '16px' }}>
                  The problem wasn&apos;t the people doing the work — it was the people billing for the work. Account managers, strategists, &quot;client partners&quot;, three layers of director, monthly status calls about status calls.
                </p>
                <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                  Meridian flips that. Fourteen senior practitioners, no juniors, no client-services layer. The person you meet on the kick-off call is the person doing the work. Our overheads are roughly half the average London agency&apos;s — so your bill is too.
                </p>
              </div>
              <div className="why-grid">
                <div className="why-card">
                  <div className="why-num">2014</div>
                  <div className="why-label">Founded in Shoreditch by ex-in-house leads</div>
                </div>
                <div className="why-card">
                  <div className="why-num">14</div>
                  <div className="why-label">Senior practitioners. Zero juniors.</div>
                </div>
                <div className="why-card">
                  <div className="why-num">200+</div>
                  <div className="why-label">London brands trusted us with their digital programme</div>
                </div>
                <div className="why-card">
                  <div className="why-num">94%</div>
                  <div className="why-label">Client retention beyond 24 months</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section-box-wrap inner-section-box-wrap" style={{ paddingTop: '32px' }}>
        <div className="section-box">
          <div className="wrap">
            <div className="section-head reveal" style={{ marginBottom: '40px' }}>
              <span className="section-eyebrow">PRINCIPLES</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
                How we work
              </h2>
            </div>
            <div className="values-grid reveal">
              <div className="value-card">
                <h3 className="value-title">Senior or nothing</h3>
                <p className="value-desc">Every person who touches your account has 8+ years&apos; experience. We don&apos;t train juniors on your retainer.</p>
              </div>
              <div className="value-card">
                <h3 className="value-title">Show working</h3>
                <p className="value-desc">All dashboards are live. All decisions are documented. You can audit anything we do, any time.</p>
              </div>
              <div className="value-card">
                <h3 className="value-title">Cancel anytime</h3>
                <p className="value-desc">Pay-as-you-go has zero minimum commitment. We earn renewals, we don&apos;t lock you in.</p>
              </div>
              <div className="value-card">
                <h3 className="value-title">No upsell</h3>
                <p className="value-desc">If you don&apos;t need a service, we&apos;ll say so. If a competitor would do it better, we&apos;ll refer you.</p>
              </div>
              <div className="value-card">
                <h3 className="value-title">Measure what pays</h3>
                <p className="value-desc">Reporting against revenue and qualified leads. Not impressions, vanity rankings, or &quot;reach&quot;.</p>
              </div>
              <div className="value-card">
                <h3 className="value-title">Local first</h3>
                <p className="value-desc">London-only by design. We pass on overseas work where local nuance matters.</p>
              </div>
            </div>

            <div className="section-head reveal" style={{ marginTop: '60px', marginBottom: '32px' }}>
              <span className="section-eyebrow">CREDENTIALS</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
                What backs the work
              </h2>
            </div>
            <div className="credentials-strip reveal">
              <div className="cred-pill">Google Premier Partner</div>
              <div className="cred-pill">Meta Business Partner</div>
              <div className="cred-pill">TikTok Marketing Partner</div>
              <div className="cred-pill">Shopify Plus Partner</div>
              <div className="cred-pill">HubSpot Solutions Partner</div>
              <div className="cred-pill">Cyber Essentials Plus</div>
              <div className="cred-pill">ISO 27001 Certified</div>
              <div className="cred-pill">GDPR Compliant</div>
              <div className="cred-pill">B Corp Certified</div>
            </div>
          </div>
        </div>
      </div>

      <section className="final-cta" style={{ padding: '60px 0 80px' }}>
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Want to talk to one of us?</h2>
            <p className="final-p">No SDRs. No discovery scripts. The first call is always with a senior practitioner who&apos;ll do the work.</p>
            <div className="cta-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
              <Link href="/contact" className="btn btn-primary magnetic">Get in touch →</Link>
              <Link href="/#audit" className="btn btn-ghost magnetic">Free SEO audit</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA />
    </>
  );
}
