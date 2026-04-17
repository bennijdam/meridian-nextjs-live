/**
 * /careers — Careers page with open positions and JobPosting schema.
 *
 * Uses FAQ-style expandable cards (details/summary) for job descriptions.
 * Includes JobPosting schema for each open position.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/services';
import { jsonLd, breadcrumbSchema } from '@/lib/schema';
import ApplicationForm from '@/components/ApplicationForm';

export const metadata: Metadata = {
  title: 'Careers at Meridian — Join London\'s Top-Rated Digital Agency | Meridian',
  description: 'Join Meridian, London\'s highest-rated digital performance studio. Open roles in SEO, PPC, development, content, design, and business development. Remote flexibility, learning budget, equity options.',
  alternates: { canonical: '/careers' },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://meridian.london';

type JobPosting = {
  title: string;
  slug: string;
  location: string;
  locationType: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  type: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
};

const JOBS: JobPosting[] = [
  {
    title: 'Senior SEO Strategist',
    slug: 'senior-seo-strategist',
    location: 'London',
    locationType: 'Hybrid',
    salary: '\u00a355,000 \u2013 \u00a375,000',
    salaryMin: 55000,
    salaryMax: 75000,
    type: 'Full-time',
    department: 'SEO',
    description: 'Lead SEO strategy for a portfolio of London\'s most ambitious brands. You will own technical audits, content strategy, link velocity, and AI citation engineering across 15+ client accounts.',
    responsibilities: [
      'Own end-to-end SEO strategy for 15+ client accounts across fintech, SaaS, legal, and eCommerce',
      'Conduct technical SEO audits and oversee remediation — schema, Core Web Vitals, crawl optimisation',
      'Build and execute content strategies targeting commercial-intent keywords and AI Overview citations',
      'Manage link-building campaigns and digital PR velocity',
      'Report monthly against revenue, leads, and ranking targets',
      'Mentor junior SEO team members',
    ],
    requirements: [
      '5+ years of SEO experience, with at least 2 years in a London agency or in-house for a competitive vertical',
      'Deep understanding of technical SEO, content strategy, and link building',
      'Experience with AI Overview / GEO / AEO optimisation',
      'Proficiency with Ahrefs, Screaming Frog, Google Search Console, GA4',
      'Excellent communication skills — you will present to C-suite clients',
      'Track record of delivering measurable organic growth',
    ],
  },
  {
    title: 'PPC Account Manager',
    slug: 'ppc-account-manager',
    location: 'London',
    locationType: 'Hybrid',
    salary: '\u00a340,000 \u2013 \u00a355,000',
    salaryMin: 40000,
    salaryMax: 55000,
    type: 'Full-time',
    department: 'Paid Media',
    description: 'Manage Google Ads, Meta, and LinkedIn campaigns for London brands across fintech, SaaS, eCommerce, and professional services. Optimise for ROAS, not vanity metrics.',
    responsibilities: [
      'Manage Google Ads (Search, Performance Max, Shopping, YouTube) across 10+ client accounts',
      'Run Meta Ads, LinkedIn Ads, and TikTok campaigns where appropriate',
      'Build and optimise landing pages for conversion rate improvement',
      'Implement Enhanced Conversions, Conversion API, and server-side tracking',
      'Produce weekly performance reports against CPL, CAC, and ROAS targets',
      'A/B test ad copy, audiences, bidding strategies, and creative',
    ],
    requirements: [
      '3+ years of PPC management experience, ideally in an agency setting',
      'Google Ads certified with demonstrable ROAS improvements',
      'Experience with Meta Business Suite, LinkedIn Campaign Manager',
      'Strong analytical skills — comfortable with GA4, Looker Studio, spreadsheets',
      'Understanding of attribution modelling and conversion tracking',
      'Excellent attention to detail and budget management',
    ],
  },
  {
    title: 'Full-Stack Developer',
    slug: 'full-stack-developer',
    location: 'London / Remote',
    locationType: 'Remote',
    salary: '\u00a360,000 \u2013 \u00a385,000',
    salaryMin: 60000,
    salaryMax: 85000,
    type: 'Full-time',
    department: 'Engineering',
    description: 'Build high-performance websites and web applications in Next.js, React, and Node.js for London\'s most demanding brands. Focus on Core Web Vitals, accessibility, and conversion engineering.',
    responsibilities: [
      'Build production websites and web applications in Next.js (App Router, React Server Components)',
      'Develop custom Shopify themes and headless commerce solutions',
      'Implement schema markup, structured data, and SEO-optimised page architecture',
      'Integrate APIs: Stripe, HubSpot, Klaviyo, Sanity, Contentful, and custom backends',
      'Enforce performance budgets: <2.5s LCP, <200ms INP, <0.1 CLS',
      'Participate in code reviews and technical architecture decisions',
    ],
    requirements: [
      '4+ years of professional experience with React / Next.js',
      'Strong TypeScript skills and Node.js backend experience',
      'Experience with Shopify Liquid or Hydrogen is a plus',
      'Understanding of web performance, Core Web Vitals, and accessibility (WCAG 2.1)',
      'Familiarity with Vercel, AWS, or GCP deployment pipelines',
      'Portfolio of shipped production websites',
    ],
  },
  {
    title: 'Content Marketing Manager',
    slug: 'content-marketing-manager',
    location: 'London',
    locationType: 'Hybrid',
    salary: '\u00a345,000 \u2013 \u00a360,000',
    salaryMin: 45000,
    salaryMax: 60000,
    type: 'Full-time',
    department: 'Content',
    description: 'Lead content strategy and production for B2B and DTC clients. Write SEO-engineered articles, manage editorial calendars, and structure content for AI citation.',
    responsibilities: [
      'Develop and execute content strategies for 10+ client accounts',
      'Write and edit long-form SEO content (2,000+ words), case studies, and whitepapers',
      'Structure content for AI Overview citation — answer-first formatting, schema, and source citing',
      'Manage freelance writers and ensure quality, tone, and SEO standards',
      'Build editorial calendars aligned to keyword strategy and business objectives',
      'Ghost-write LinkedIn thought leadership for client founders and executives',
    ],
    requirements: [
      '4+ years of content marketing experience, ideally in B2B SaaS, fintech, or professional services',
      'Excellent writing skills — portfolio of published long-form content',
      'Understanding of SEO: keyword research, topical clustering, on-page optimisation',
      'Experience managing freelance writers and editorial workflows',
      'Familiarity with tools like Ahrefs, Clearscope, Google Search Console',
      'Comfortable writing for regulated industries (fintech, legal, healthcare)',
    ],
  },
  {
    title: 'UX/UI Designer',
    slug: 'ux-ui-designer',
    location: 'London',
    locationType: 'Hybrid',
    salary: '\u00a345,000 \u2013 \u00a365,000',
    salaryMin: 45000,
    salaryMax: 65000,
    type: 'Full-time',
    department: 'Design',
    description: 'Design conversion-optimised websites, landing pages, and digital products in Figma. Work closely with developers, SEO strategists, and clients to deliver design that performs.',
    responsibilities: [
      'Design responsive websites, landing pages, and web applications in Figma',
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Build and maintain design systems with reusable components and tokens',
      'Collaborate with developers on implementation — auto-layout, CSS-ready specs, handoff',
      'Conduct UX audits and conversion rate optimisation analysis',
      'Present design work to clients and incorporate feedback',
    ],
    requirements: [
      '3+ years of UI/UX design experience, ideally in an agency or product environment',
      'Expert-level Figma skills — auto-layout, components, variables, prototyping',
      'Strong portfolio demonstrating web design, mobile design, and design systems',
      'Understanding of web development constraints — responsive design, performance, accessibility',
      'Experience with user research, usability testing, and data-informed design decisions',
      'Clean visual sensibility with attention to typography, spacing, and hierarchy',
    ],
  },
  {
    title: 'Business Development Manager',
    slug: 'business-development-manager',
    location: 'London',
    locationType: 'Hybrid',
    salary: '\u00a350,000 \u2013 \u00a370,000 + commission',
    salaryMin: 50000,
    salaryMax: 70000,
    type: 'Full-time',
    department: 'Growth',
    description: 'Drive new business for London\'s fastest-growing digital agency. Own the pipeline from outreach to signed contract. Uncapped commission on every deal you close.',
    responsibilities: [
      'Generate qualified pipeline through outbound outreach, inbound follow-up, and networking',
      'Qualify inbound leads and conduct discovery calls to understand client needs',
      'Create proposals and pitch presentations with support from delivery teams',
      'Manage the sales cycle from first touch to signed contract',
      'Attend London networking events, conferences, and industry meetups',
      'Report on pipeline, conversion rates, and revenue forecasts weekly',
    ],
    requirements: [
      '3+ years of B2B sales experience, ideally in digital marketing, SaaS, or professional services',
      'Track record of meeting or exceeding revenue targets',
      'Excellent communication and presentation skills',
      'Understanding of digital marketing services — SEO, PPC, web design, app development',
      'CRM proficiency (HubSpot preferred)',
      'Self-motivated, resilient, and comfortable with outbound prospecting',
    ],
  },
];

const BENEFITS_LIST = [
  { icon: '🏠', title: 'Remote flexibility', description: 'Work from home up to 3 days a week. We trust you to deliver outcomes, not clock hours.' },
  { icon: '📚', title: 'Learning budget', description: '\u00a31,500/year for courses, conferences, books, and certifications. Invest in yourself.' },
  { icon: '🎉', title: 'Team events', description: 'Monthly team dinners, quarterly off-sites, annual ski trip. We work hard and socialise well.' },
  { icon: '📈', title: 'Equity options', description: 'EMI share options for all employees after 12 months. Grow with the company.' },
  { icon: '🏥', title: 'Private health', description: 'Vitality health insurance, dental, optical, and mental health support from day one.' },
  { icon: '🌴', title: '28 days holiday', description: '28 days annual leave plus bank holidays. Take your birthday off on us.' },
];

function jobPostingSchema(job: JobPosting) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': job.title,
    'description': job.description,
    'identifier': { '@type': 'PropertyValue', 'name': 'Meridian Digital', 'value': job.slug },
    'datePosted': '2026-04-01',
    'validThrough': '2026-07-01',
    'employmentType': 'FULL_TIME',
    'hiringOrganization': {
      '@type': 'Organization',
      'name': 'Meridian Digital',
      'sameAs': SITE_URL,
      'logo': `${SITE_URL}/logo.png`,
    },
    'jobLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '1 Finsbury Avenue',
        'addressLocality': 'London',
        'addressRegion': 'London',
        'postalCode': 'EC2M 2PF',
        'addressCountry': 'GB',
      },
    },
    'jobLocationType': job.locationType === 'Remote' ? 'TELECOMMUTE' : undefined,
    'baseSalary': {
      '@type': 'MonetaryAmount',
      'currency': 'GBP',
      'value': {
        '@type': 'QuantitativeValue',
        'minValue': job.salaryMin,
        'maxValue': job.salaryMax,
        'unitText': 'YEAR',
      },
    },
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
          <span className="section-eyebrow">WE&apos;RE HIRING</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: '20px' }}>
            Join <span className="accent">Meridian</span>.
          </h1>
          <p className="section-sub">
            We are a 14-person London team building the agency we always wanted to work at.
            Senior practitioners only. No layers. No politics. Proper work for ambitious brands.
          </p>
        </header>

        {/* CULTURE */}
        <section style={{ marginBottom: '80px' }}>
          <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '20px' }}>
              The way we work
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
              At Meridian, the senior strategist who pitches the work is the senior strategist who delivers it.
              No junior account managers. No handoff. No dilution. Every person on the team is a practitioner
              first and a manager second.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
              We run a flat structure with weekly sprints, fortnightly retros, and monthly strategy days.
              We believe in transparency with clients (and each other), ownership of outcomes, and
              continuous learning. Our team budget for education is real and used.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7 }}>
              We are Cyber Essentials Plus certified, ISO 27001 compliant, and GDPR-first.
              We work with regulated industries and treat security and privacy as non-negotiable.
            </p>
          </div>
        </section>

        {/* BENEFITS */}
        <section style={{ marginBottom: '80px' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>Benefits</h2>
          </div>
          <div className="includes-grid">
            {BENEFITS_LIST.map((b) => (
              <div key={b.title} className="include-card">
                <span style={{ fontSize: '28px' }} aria-hidden="true">{b.icon}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '10px 0 6px' }}>{b.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OPEN POSITIONS */}
        <section style={{ marginBottom: '60px' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>Open positions</h2>
            <p className="section-sub">{JOBS.length} roles currently open. All London-based with hybrid or remote options.</p>
          </div>
          <div className="faq-list" style={{ maxWidth: '900px', margin: '0 auto' }}>
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
                    {job.responsibilities.map((r, i) => (
                      <li key={i} style={{ marginBottom: '6px', fontSize: '14px' }}>{r}</li>
                    ))}
                  </ul>

                  <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>Requirements</h4>
                  <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
                    {job.requirements.map((r, i) => (
                      <li key={i} style={{ marginBottom: '6px', fontSize: '14px' }}>{r}</li>
                    ))}
                  </ul>

                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>
                    <strong>Salary:</strong> {job.salary} &middot; <strong>Type:</strong> {job.type} &middot; <strong>Location:</strong> {job.location} ({job.locationType})
                  </p>

                  <Link href="/contact" className="btn btn-primary" style={{ display: 'inline-block' }}>
                    Apply Now &rarr;
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Application form */}
      <section id="apply" style={{ padding: '40px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: '600px' }}>
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
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Don&apos;t see your role?</h2>
            <p className="final-p">We are always open to hearing from exceptional people. Apply above with a note about what you would bring.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="#apply" className="btn btn-primary">Apply Now &rarr;</Link>
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
