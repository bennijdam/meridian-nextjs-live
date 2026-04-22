import type { Metadata } from 'next';
import Link from 'next/link';
import { jsonLd, breadcrumbSchema } from '@/lib/schema';
import ApplicationForm from '@/components/ApplicationForm';
import HomepageInteractions from '@/components/HomepageInteractions';
import SiteHeader from '@/components/home/SiteHeader';
import SiteFooter from '@/components/home/SiteFooter';
import MobileCTA from '@/components/home/MobileCTA';

export const metadata: Metadata = {
  title: "Careers at Meridian — Join London's Top-Rated Digital Agency | Meridian",
  description: "Join Meridian, London's highest-rated digital performance studio. Open roles in SEO, PPC, development, content, design, and business development. Remote flexibility, learning budget, equity options.",
  alternates: { canonical: '/careers' },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meridianweb.co.uk';

type JobPosting = {
  title: string; slug: string; location: string; locationType: string;
  salary: string; salaryMin: number; salaryMax: number; type: string;
  department: string; description: string; responsibilities: string[]; requirements: string[];
};

const JOBS: JobPosting[] = [
  {
    title: 'Senior SEO Strategist', slug: 'senior-seo-strategist', location: 'London', locationType: 'Hybrid',
    salary: '£55,000 – £75,000', salaryMin: 55000, salaryMax: 75000, type: 'Full-time', department: 'SEO',
    description: "Lead SEO strategy for a portfolio of London's most ambitious brands. You will own technical audits, content strategy, link velocity, and AI citation engineering across 15+ client accounts.",
    responsibilities: [
      'Own end-to-end SEO strategy for 15+ client accounts across fintech, SaaS, legal, and eCommerce',
      'Conduct technical SEO audits and oversee remediation — schema, Core Web Vitals, crawl optimisation',
      'Build and execute content strategies targeting commercial-intent keywords and AI Overview citations',
      'Manage link-building campaigns and digital PR velocity',
      'Report monthly against revenue, leads, and ranking targets',
    ],
    requirements: [
      '5+ years of SEO experience, with at least 2 years in a London agency or in-house for a competitive vertical',
      'Experience with AI Overview / GEO / AEO optimisation',
      'Proficiency with Ahrefs, Screaming Frog, Google Search Console, GA4',
      'Excellent communication skills — you will present to C-suite clients',
    ],
  },
  {
    title: 'PPC Account Manager', slug: 'ppc-account-manager', location: 'London', locationType: 'Hybrid',
    salary: '£40,000 – £55,000', salaryMin: 40000, salaryMax: 55000, type: 'Full-time', department: 'Paid Media',
    description: 'Manage Google Ads, Meta, and LinkedIn campaigns for London brands across fintech, SaaS, eCommerce, and professional services. Optimise for ROAS, not vanity metrics.',
    responsibilities: [
      'Manage Google Ads (Search, Performance Max, Shopping, YouTube) across 10+ client accounts',
      'Run Meta Ads, LinkedIn Ads, and TikTok campaigns where appropriate',
      'Produce weekly performance reports against CPL, CAC, and ROAS targets',
    ],
    requirements: [
      '3+ years of PPC management experience, ideally in an agency setting',
      'Google Ads certified with demonstrable ROAS improvements',
      'Experience with Meta Business Suite, LinkedIn Campaign Manager',
    ],
  },
  {
    title: 'Full-Stack Developer', slug: 'full-stack-developer', location: 'London / Remote', locationType: 'Remote',
    salary: '£60,000 – £85,000', salaryMin: 60000, salaryMax: 85000, type: 'Full-time', department: 'Engineering',
    description: "Build high-performance websites and web applications in Next.js, React, and Node.js for London's most demanding brands. Focus on Core Web Vitals, accessibility, and conversion engineering.",
    responsibilities: [
      'Build production websites and web applications in Next.js (App Router, React Server Components)',
      'Develop custom Shopify themes and headless commerce solutions',
      'Enforce performance budgets: <2.5s LCP, <200ms INP, <0.1 CLS',
    ],
    requirements: [
      '4+ years of professional experience with React / Next.js',
      'Strong TypeScript skills and Node.js backend experience',
      'Experience with Shopify Liquid or Hydrogen is a plus',
    ],
  },
  {
    title: 'Content Marketing Manager', slug: 'content-marketing-manager', location: 'London', locationType: 'Hybrid',
    salary: '£45,000 – £60,000', salaryMin: 45000, salaryMax: 60000, type: 'Full-time', department: 'Content',
    description: 'Lead content strategy and production for B2B and DTC clients. Write SEO-engineered articles, manage editorial calendars, and structure content for AI citation.',
    responsibilities: [
      'Develop and execute content strategies for 10+ client accounts',
      'Write and edit long-form SEO content (2,000+ words), case studies, and whitepapers',
      'Structure content for AI Overview citation — answer-first formatting, schema, and source citing',
    ],
    requirements: [
      '4+ years of content marketing experience, ideally in B2B SaaS, fintech, or professional services',
      'Understanding of SEO: keyword research, topical clustering, on-page optimisation',
    ],
  },
  {
    title: 'UX/UI Designer', slug: 'ux-ui-designer', location: 'London', locationType: 'Hybrid',
    salary: '£45,000 – £65,000', salaryMin: 45000, salaryMax: 65000, type: 'Full-time', department: 'Design',
    description: 'Design conversion-optimised websites, landing pages, and digital products in Figma. Work closely with developers, SEO strategists, and clients to deliver design that performs.',
    responsibilities: [
      'Design responsive websites, landing pages, and web applications in Figma',
      'Build and maintain design systems with reusable components and tokens',
      'Conduct UX audits and conversion rate optimisation analysis',
    ],
    requirements: [
      '3+ years of UI/UX design experience',
      'Expert-level Figma skills — auto-layout, components, variables, prototyping',
      'Strong portfolio demonstrating web design, mobile design, and design systems',
    ],
  },
  {
    title: 'Business Development Manager', slug: 'business-development-manager', location: 'London', locationType: 'Hybrid',
    salary: '£50,000 – £70,000 + commission', salaryMin: 50000, salaryMax: 70000, type: 'Full-time', department: 'Growth',
    description: "Drive new business for London's fastest-growing digital agency. Own the pipeline from outreach to signed contract. Uncapped commission on every deal you close.",
    responsibilities: [
      'Generate qualified pipeline through outbound outreach, inbound follow-up, and networking',
      'Manage the sales cycle from first touch to signed contract',
      'Attend London networking events, conferences, and industry meetups',
    ],
    requirements: [
      '3+ years of B2B sales experience, ideally in digital marketing, SaaS, or professional services',
      'Track record of meeting or exceeding revenue targets',
    ],
  },
];

const BENEFITS_LIST = [
  { icon: '🏠', title: 'Remote flexibility', description: 'Work from home up to 3 days a week. We trust you to deliver outcomes, not clock hours.' },
  { icon: '📚', title: 'Learning budget', description: '£1,500/year for courses, conferences, books, and certifications.' },
  { icon: '🎉', title: 'Team events', description: 'Monthly team dinners, quarterly off-sites, annual ski trip.' },
  { icon: '📈', title: 'Equity options', description: 'EMI share options for all employees after 12 months.' },
  { icon: '🏥', title: 'Private health', description: 'Vitality health insurance, dental, optical, and mental health support from day one.' },
  { icon: '🌴', title: '28 days holiday', description: '28 days annual leave plus bank holidays. Take your birthday off on us.' },
];

function jobPostingSchema(job: JobPosting) {
  return {
    '@context': 'https://schema.org', '@type': 'JobPosting',
    'title': job.title, 'description': job.description,
    'identifier': { '@type': 'PropertyValue', 'name': 'Meridian Digital', 'value': job.slug },
    'datePosted': '2026-04-01', 'validThrough': '2026-07-01', 'employmentType': 'FULL_TIME',
    'hiringOrganization': { '@type': 'Organization', 'name': 'Meridian Digital', 'sameAs': SITE_URL, 'logo': `${SITE_URL}/logo.png` },
    'jobLocation': {
      '@type': 'Place',
      'address': { '@type': 'PostalAddress', 'streetAddress': '1 Finsbury Avenue', 'addressLocality': 'London', 'addressRegion': 'London', 'postalCode': 'EC2M 2PF', 'addressCountry': 'GB' },
    },
    'jobLocationType': job.locationType === 'Remote' ? 'TELECOMMUTE' : undefined,
    'baseSalary': { '@type': 'MonetaryAmount', 'currency': 'GBP', 'value': { '@type': 'QuantitativeValue', 'minValue': job.salaryMin, 'maxValue': job.salaryMax, 'unitText': 'YEAR' } },
  };
}

export default function CareersPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      {JOBS.map((job) => (
        <script key={job.slug} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(jobPostingSchema(job)) }} />
      ))}
      <HomepageInteractions />
      <SiteHeader />

      <section className="inner-hero">
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-dot-grid" aria-hidden="true" />
        <div className="wrap">
          <span className="section-eyebrow" data-scramble="true">WE&apos;RE HIRING</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            Join <span className="accent">Meridian</span>.
          </h1>
          <p className="section-sub">
            A 14-person London team building the agency we always wanted to work at.
            Senior practitioners only. No layers. No politics. Proper work for ambitious brands.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center', marginTop: '32px' }}>
            <a href="#apply" className="btn btn-primary magnetic">
              Apply now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a href="#positions" className="btn btn-ghost magnetic">See open roles</a>
          </div>
        </div>
      </section>

      {/* Team photo */}
      <div className="page-img-banner reveal">
        <picture>
          <source type="image/webp" srcSet="/img/digital-marketing-team-480w.webp 480w, /img/digital-marketing-team-768w.webp 768w, /img/digital-marketing-team-1200w.webp 1200w, /img/digital-marketing-team-1920w.webp 1920w" sizes="(min-width: 1360px) 1312px, 100vw" />
          <img src="/img/digital-marketing-team-1200w.webp" alt="Meridian digital marketing team in London office" width="1200" height="520" loading="eager" />
        </picture>
      </div>

      {/* Culture + Benefits */}
      <div className="section-box-wrap">
        <div className="section-box">
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
              <span className="section-eyebrow">HOW WE WORK</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '20px' }}>
                The way we work
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
                At Meridian, the senior strategist who pitches the work is the senior strategist who delivers it.
                No junior account managers. No handoff. No dilution. Every person on the team is a practitioner
                first and a manager second.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7 }}>
                We run a flat structure with weekly sprints, fortnightly retros, and monthly strategy days.
                We believe in transparency with clients (and each other), ownership of outcomes, and
                continuous learning. Our team budget for education is real and used.
              </p>
            </div>

            <div className="section-head reveal" style={{ marginBottom: '32px' }}>
              <span className="section-eyebrow">BENEFITS</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>What you get</h2>
            </div>
            <div className="includes-grid reveal">
              {BENEFITS_LIST.map((b) => (
                <div key={b.title} className="include-card">
                  <span style={{ fontSize: '28px' }} aria-hidden="true">{b.icon}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '10px 0 6px' }}>{b.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Open positions */}
      <div id="positions" className="section-box-wrap inner-section-box-wrap" style={{ paddingTop: '32px' }}>
        <div className="section-box">
          <div className="wrap">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="section-eyebrow">OPEN POSITIONS</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>Open positions</h2>
              <p className="section-sub">{JOBS.length} roles currently open. All London-based with hybrid or remote options.</p>
            </div>
            <div className="faq-list reveal" style={{ maxWidth: '900px', margin: '0 auto' }}>
              {JOBS.map((job) => (
                <details key={job.slug} className="faq-item">
                  <summary className="faq-q">
                    <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                      <span style={{ fontWeight: 600 }}>{job.title}</span>
                      <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 400 }}>
                        {job.department} &middot; {job.location} ({job.locationType}) &middot; {job.salary}
                      </span>
                    </span>
                  </summary>
                  <div className="faq-a">
                    <p style={{ marginBottom: '16px' }}>{job.description}</p>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>Responsibilities</h4>
                    <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
                      {job.responsibilities.map((r, i) => <li key={i} style={{ marginBottom: '6px', fontSize: '14px' }}>{r}</li>)}
                    </ul>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>Requirements</h4>
                    <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
                      {job.requirements.map((r, i) => <li key={i} style={{ marginBottom: '6px', fontSize: '14px' }}>{r}</li>)}
                    </ul>
                    <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>
                      <strong>Salary:</strong> {job.salary} &middot; <strong>Type:</strong> {job.type} &middot; <strong>Location:</strong> {job.location} ({job.locationType})
                    </p>
                    <a href="#apply" className="btn btn-primary" style={{ display: 'inline-block' }}>Apply Now &rarr;</a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application form */}
      <div id="apply" className="section-box-wrap inner-section-box-wrap" style={{ paddingTop: '32px', paddingBottom: '40px' }}>
        <div className="section-box">
          <div className="wrap" style={{ maxWidth: '640px' }}>
            <div className="reveal">
              <ApplicationForm
                source="career-application"
                heading="Apply to join Meridian"
                subtext="Send us your details and a link to your work. We review every application and respond within 7 days."
                fields={['role', 'linkedin', 'message']}
                buttonLabel="Submit Application →"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="final-cta" style={{ padding: '60px 0 80px' }}>
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Don&apos;t see your role?</h2>
            <p className="final-p">We are always open to hearing from exceptional people. Apply above with a note about what you would bring.</p>
            <div className="cta-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
              <a href="#apply" className="btn btn-primary magnetic">Apply Now →</a>
              <Link href="/contact" className="btn btn-ghost magnetic">Contact us</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA />
    </>
  );
}
