/**
 * /partners — Partner programme page.
 *
 * Sections: Why partner, Partner types, How it works, Benefits, CTA.
 * Includes Organization schema for structured data.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/services';
import { jsonLd, breadcrumbSchema, organizationSchema } from '@/lib/schema';
import ApplicationForm from '@/components/ApplicationForm';

export const metadata: Metadata = {
  title: 'Partner with Meridian — Referral, Agency & Technology Partners | Meridian',
  description: 'Join the Meridian partner programme. Earn referral fees, co-marketing opportunities, and white-label digital services. Three partnership tiers for agencies, consultants, and technology providers.',
  alternates: { canonical: '/partners' },
};

const PARTNER_TYPES = [
  {
    title: 'Referral Partner',
    icon: '🤝',
    description: 'For consultants, accountants, lawyers, and business advisors who refer clients needing digital marketing, web design, or app development.',
    benefits: ['15% revenue share for 12 months on every referral', 'Dedicated partner manager', 'Co-branded proposal support', 'Priority onboarding for referred clients'],
  },
  {
    title: 'Agency Partner',
    icon: '🏢',
    description: 'For agencies that want to offer SEO, PPC, web design, or app development without building the capability in-house.',
    benefits: ['White-label delivery under your brand', '20% partner discount on all services', 'Shared Slack channel with your team', 'Joint case studies and co-marketing campaigns'],
  },
  {
    title: 'Technology Partner',
    icon: '⚙️',
    description: 'For SaaS platforms, hosting providers, and technology vendors who want to recommend a trusted implementation partner.',
    benefits: ['Listed on our platforms and integrations pages', 'Joint webinars and content collaboration', 'Early access to new service launches', 'Technical integration and API support'],
  },
];

const STEPS = [
  { num: '01', title: 'Apply', description: 'Complete the partner application form. We review within 48 hours and schedule a call with our partnerships team.' },
  { num: '02', title: 'Onboard', description: 'Sign the partner agreement, receive your partner portal access, branded materials, and referral tracking link.' },
  { num: '03', title: 'Earn', description: 'Refer clients or send white-label work. Track everything in your partner dashboard. Get paid monthly via bank transfer.' },
];

const BENEFITS = [
  { icon: '💰', title: 'Revenue share', description: 'Earn 15% on every referred client for 12 months. No caps, no limits.' },
  { icon: '🏷️', title: 'White-label services', description: 'Deliver our work under your brand. Your client never knows we exist.' },
  { icon: '📣', title: 'Co-marketing', description: 'Joint case studies, webinars, blog posts, and social media amplification.' },
  { icon: '📊', title: 'Partner dashboard', description: 'Real-time tracking of referrals, conversions, and earnings.' },
  { icon: '🎓', title: 'Training & certification', description: 'Access to our internal training programmes and partner certification.' },
  { icon: '🚀', title: 'Priority support', description: 'Dedicated partner manager and priority onboarding for referred clients.' },
];

export default function PartnersPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Partners', url: '/partners' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }} />

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
        <Link href="/audit" className="nav-cta">Get Free Audit &rarr;</Link>
      </header>

      <main className="wrap" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        {/* HERO */}
        <header style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 60px' }} className="reveal">
          <span className="section-eyebrow">PARTNER PROGRAMME</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            Partner with <span className="accent">Meridian</span>.
          </h1>
          <p className="section-sub">
            Earn referral fees, unlock white-label services, and grow your business alongside London&apos;s
            highest-rated digital performance studio.
          </p>
        </header>

        {/* WHY PARTNER */}
        <section style={{ marginBottom: '80px' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Why partner with us?
            </h2>
          </div>
          <div className="includes-grid">
            <div className="include-card">
              <span style={{ fontSize: '32px' }} aria-hidden="true">💰</span>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '12px 0 8px' }}>Referral fees</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
                Earn 15% revenue share for 12 months on every client you refer. No caps, no limits, paid monthly.
              </p>
            </div>
            <div className="include-card">
              <span style={{ fontSize: '32px' }} aria-hidden="true">📣</span>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '12px 0 8px' }}>Co-marketing</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
                Joint case studies, webinars, blog features, and social amplification. Grow your brand alongside ours.
              </p>
            </div>
            <div className="include-card">
              <span style={{ fontSize: '32px' }} aria-hidden="true">🏷️</span>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '12px 0 8px' }}>White-label</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
                Offer SEO, PPC, web design, and app development under your brand. We deliver, you own the relationship.
              </p>
            </div>
          </div>
        </section>

        {/* PARTNER TYPES */}
        <section style={{ marginBottom: '80px' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Three ways to partner
            </h2>
          </div>
          <div className="includes-grid">
            {PARTNER_TYPES.map((type) => (
              <div key={type.title} className="include-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '36px' }} aria-hidden="true">{type.icon}</span>
                <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>{type.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>{type.description}</p>
                <ul style={{ fontSize: '14px', margin: 0, paddingLeft: '18px', flex: 1 }}>
                  {type.benefits.map((b, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ marginBottom: '80px' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              How it works
            </h2>
          </div>
          <div className="includes-grid">
            {STEPS.map((step) => (
              <div key={step.num} className="include-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{step.num}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '12px 0 8px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BENEFITS GRID */}
        <section style={{ marginBottom: '80px' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Partner benefits
            </h2>
          </div>
          <div className="includes-grid">
            {BENEFITS.map((b) => (
              <div key={b.title} className="include-card">
                <span style={{ fontSize: '28px' }} aria-hidden="true">{b.icon}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '10px 0 6px' }}>{b.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>{b.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Application form */}
      <section id="apply" style={{ padding: '40px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: '600px' }}>
          <div className="reveal">
            <ApplicationForm
              source="partner-application"
              heading="Apply to the partner programme"
              subtext="Tell us about your business. We review every application within 48 hours and schedule a call."
              fields={['company', 'role', 'website', 'message']}
              buttonLabel="Submit Partner Application →"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Ready to partner?</h2>
            <p className="final-p">Apply above. We review every application within 48 hours.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="#apply" className="btn btn-primary">Apply Now &rarr;</Link>
              <Link href="/pricing" className="btn btn-ghost">View Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <Link href="/" className="logo"><span className="logo-mark"></span><span>Meridian</span></Link>
              <p>London&apos;s boutique digital performance studio. Engineering compounding growth since 2014.</p>
            </div>
            <div className="footer-col"><h4>Services</h4><ul>{SERVICES.slice(0, 6).map(sv => (<li key={sv.slug}><Link href={`/services/${sv.slug}`}>{sv.shortName}</Link></li>))}</ul></div>
            <div className="footer-col"><h4>Company</h4><ul><li><Link href="/pricing">Pricing</Link></li><li><Link href="/reviews">Reviews</Link></li><li><Link href="/london">London</Link></li><li><Link href="/faq">FAQ</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
            <div className="footer-col"><h4>Get Started</h4><ul><li><Link href="/audit">Free SEO Audit</Link></li><li><Link href="/pricing">View Pricing</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Meridian Digital Ltd &middot; Company No. 09876543 &middot; 1 Finsbury Avenue, London EC2M 2PF</span>
            <span>Cyber Essentials Plus &middot; ISO 27001 &middot; GDPR Compliant</span>
          </div>
        </div>
      </footer>
      <div className="mobile-cta" role="complementary">
        <span className="mobile-cta-text">Free SEO audit, 90s.</span>
        <Link href="/audit" className="mobile-cta-btn">Get Audit &rarr;</Link>
      </div>
    </>
  );
}
