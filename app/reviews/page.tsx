import type { Metadata } from 'next';
import Link from 'next/link';
import { jsonLd, breadcrumbSchema } from '@/lib/schema';
import HomepageInteractions from '@/components/HomepageInteractions';
import SiteHeader from '@/components/home/SiteHeader';
import SiteFooter from '@/components/home/SiteFooter';
import MobileCTA from '@/components/home/MobileCTA';

export const metadata: Metadata = {
  title: 'Reviews & Case Studies — Meridian | 4.9★ from 127 London Clients',
  description: 'Verified Google, Clutch and Trustpilot reviews from 200+ London brands. Featured case studies with measurable results.',
  alternates: { canonical: '/reviews' },
};

const REVIEWS = [
  { source: 'GOOGLE', initials: 'SC', name: 'Sarah Chen', role: 'Head of Growth · Stack Capital, Shoreditch',
    quote: 'Took us from page 4 to position 2 for "fintech london" inside seven months. Inbound demos went from one a week to one a day.' },
  { source: 'CLUTCH', initials: 'JO', name: 'James Okafor', role: 'CMO · Northwall Insurance, City of London',
    quote: 'Cycled through three London agencies in five years. Meridian is the only one that delivered ROAS we could defend in a board meeting. ROAS up 3.4x in Q1.' },
  { source: 'GOOGLE', initials: 'PR', name: 'Priya Ramaswamy', role: "Founder · Lumen Health, King's Cross",
    quote: 'Shipped our MVP in eleven weeks against a twelve-week deadline. Got us cited in two AI Overview answers within a month.' },
  { source: 'TRUSTPILOT', initials: 'TM', name: 'Tom Mackenzie', role: 'MD · Vine & Co. Solicitors, Holborn',
    quote: 'I ran my own agency for ten years. Hiring Meridian to do my own marketing was painful but the right call. Page 1 inside four months.' },
  { source: 'CLUTCH', initials: 'EH', name: 'Ella Hartmann', role: 'Co-Founder · Atelier Studio, Notting Hill',
    quote: 'Borough-level SEO playbook generated more qualified inbound in a quarter than our previous agency did in two years. #1 in seven boroughs.' },
  { source: 'GOOGLE', initials: 'DS', name: 'David Solomon', role: 'Founder · Helio Robotics, Old Street',
    quote: 'Built our Innovator Founder visa business plan in nine days. Endorsed first time. Same week, our website was live and ranking.' },
];

export default function ReviewsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Reviews', url: '/reviews' },
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
          <span className="section-eyebrow" data-scramble="true">★ 4.9 / 5 · 127 VERIFIED REVIEWS</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            What 200+ London brands <span className="accent">say about us</span>.
          </h1>
          <p className="section-sub">Every review below is from a verified Google, Clutch or Trustpilot profile. No edits. No hand-picking.</p>
        </div>
      </section>

      <div className="section-box-wrap inner-section-box-wrap">
        <div className="section-box">
          <div className="wrap">
            <div className="reviews-summary reveal">
              <div className="summary-block">
                <div className="summary-num">4.9</div>
                <div className="summary-meta">
                  <span className="stars" aria-hidden="true">
                    {[0,1,2,3,4].map(i => <svg key={i} viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>)}
                  </span>
                  <span className="summary-meta-label">FROM 127 VERIFIED REVIEWS</span>
                </div>
              </div>
              <div className="summary-divider" aria-hidden="true"></div>
              <div className="summary-logos">
                <span className="summary-logo">📍 Google · 64 reviews · 4.9★</span>
                <span className="summary-logo">🏆 Clutch · 38 reviews · 5.0★</span>
                <span className="summary-logo">★ Trustpilot · 25 reviews · 4.8★</span>
              </div>
            </div>

            <div className="reviews-grid reveal" style={{ marginTop: '60px' }}>
              {REVIEWS.map((r, i) => (
                <article key={i} className="review-card">
                  <span className="review-source">{r.source}</span>
                  <span className="review-stars">
                    {[0,1,2,3,4].map(s => <svg key={s} viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>)}
                  </span>
                  <p className="review-quote">{r.quote}</p>
                  <div className="review-author">
                    <div className={`review-avatar av-${(i%6)+1}`}>{r.initials}</div>
                    <div className="review-meta"><span className="review-name">{r.name}</span><span className="review-role">{r.role}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="final-cta" style={{ padding: '60px 0 80px' }}>
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready to start?</h2>
            <p className="final-p">Pick a tier on pricing, or get a free audit first.</p>
            <div className="cta-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
              <Link href="/pricing" className="btn btn-primary magnetic">See Pricing →</Link>
              <Link href="/audit" className="btn btn-ghost magnetic">Free SEO Audit</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA />
    </>
  );
}
