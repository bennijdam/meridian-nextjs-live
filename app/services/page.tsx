import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES } from '@/lib/services';
import { jsonLd, breadcrumbSchema } from '@/lib/schema';
import HomepageInteractions from '@/components/HomepageInteractions';
import SiteHeader from '@/components/home/SiteHeader';
import SiteFooter from '@/components/home/SiteFooter';
import MobileCTA from '@/components/home/MobileCTA';

export const metadata: Metadata = {
  title: 'Services — SEO, PPC, Web, App, Social, Branding | Meridian London',
  description: 'Every digital discipline a serious London business needs — SEO, PPC, web design, app development, social media, branding, business plans. Under one accountable roof.',
  alternates: { canonical: '/services' },
};

export default function ServicesHubPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <HomepageInteractions />
      <SiteHeader />

      <section className="inner-hero">
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-dot-grid" aria-hidden="true" />
        <div className="wrap">
          <span className="section-eyebrow" data-scramble="true">SERVICES</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            One <span className="accent">accountable team</span>. Every discipline.
          </h1>
          <p className="section-sub">
            From the SEO programmes that compound rankings to the apps your engineers ship,
            we cover the full stack of London digital — under one roof, with one point of contact.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center', marginTop: '32px' }}>
            <Link href="/#audit" className="btn btn-primary magnetic">
              Get Free SEO Audit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/pricing" className="btn btn-ghost magnetic">See pricing</Link>
          </div>
        </div>
      </section>

      <div className="section-box-wrap">
        <div className="section-box">
          <div className="wrap">
            <div className="services-hub-grid reveal">
              {SERVICES.map((s, idx) => (
                <article key={s.slug} className="services-hub-card" style={{ animationDelay: `${idx * 80}ms` }}>
                  <div className="shc-image">
                    <Image
                      src={`/img/${s.imageSlug}-768w.webp`}
                      alt={s.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="shc-body">
                    <span className="bento-tag">{s.tag}</span>
                    <h2 className="shc-title">{s.shortName}</h2>
                    <p className="shc-desc">{s.intro}</p>
                    <div className="shc-meta">
                      <span><strong>From {s.priceFrom}</strong> {s.priceUnit === 'project' ? '· project' : `/ ${s.priceUnit}`}</span>
                    </div>
                    <div className="shc-cta-row">
                      <Link href={`/services/${s.slug}`} className="btn btn-ghost shc-cta">Learn more →</Link>
                      <Link href="/pricing" className="btn-text">Pricing</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-box-wrap inner-section-box-wrap" style={{ paddingTop: '32px' }}>
        <div className="section-box">
          <div className="wrap">
            <div className="section-head reveal" style={{ marginBottom: '32px' }}>
              <span className="section-eyebrow">WHY ONE ROOF</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
                Why London brands consolidate with us
              </h2>
            </div>
            <div className="why-grid reveal">
              <div className="why-card">
                <div className="why-num">1</div>
                <div className="why-label"><strong>One contract, one POC.</strong> No more triangulating between four agencies blaming each other.</div>
              </div>
              <div className="why-card">
                <div className="why-num">2</div>
                <div className="why-label"><strong>Shared data, shared signal.</strong> Your SEO team sees PPC keyword data; your social team sees what&apos;s converting.</div>
              </div>
              <div className="why-card">
                <div className="why-num">3</div>
                <div className="why-label"><strong>Bundled pricing.</strong> Combine three or more services and the bundle discount stacks on top of our 40%-below-market rates.</div>
              </div>
              <div className="why-card">
                <div className="why-num">4</div>
                <div className="why-label"><strong>Senior-only team.</strong> Every discipline staffed by 8+ year practitioners. No junior account-management tax.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="final-cta" style={{ padding: '60px 0 80px' }}>
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Pick your starting point.</h2>
            <p className="final-p">Most clients start with one service and add others within six months. We&apos;ll never push services you don&apos;t need.</p>
            <div className="cta-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
              <Link href="/#audit" className="btn btn-primary magnetic">Free SEO Audit →</Link>
              <Link href="/pricing" className="btn btn-ghost magnetic">See pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA />
    </>
  );
}
