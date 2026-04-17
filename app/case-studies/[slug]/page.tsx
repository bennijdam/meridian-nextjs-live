/**
 * /case-studies/[slug] — Individual case study page.
 *
 * Shows: challenge, solution (with service bullets), results table (before/after),
 * testimonial, and CTA. Includes Article schema with embedded review/testimonial.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CASE_STUDIES, getCaseStudy, ALL_CASE_STUDY_SLUGS } from '@/lib/case-studies';
import { SERVICES } from '@/lib/services';
import { jsonLd, breadcrumbSchema } from '@/lib/schema';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meridianweb.co.uk';

export function generateStaticParams() {
  return ALL_CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.client} Case Study — ${cs.title} | Meridian`,
    description: cs.description,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: {
      title: `${cs.client}: ${cs.title}`,
      description: cs.description,
      url: `/case-studies/${cs.slug}`,
      type: 'article',
    },
  };
}

function caseStudySchema(cs: NonNullable<ReturnType<typeof getCaseStudy>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': `${cs.client}: ${cs.title}`,
    'description': cs.description,
    'url': `${SITE_URL}/case-studies/${cs.slug}`,
    'author': {
      '@type': 'Organization',
      'name': 'Meridian Digital',
      'url': SITE_URL,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Meridian Digital',
      'logo': { '@type': 'ImageObject', 'url': `${SITE_URL}/logo.png` },
    },
    'datePublished': '2026-04-01',
    'dateModified': '2026-04-01',
    'about': {
      '@type': 'Thing',
      'name': `${cs.industry} digital marketing`,
    },
    'review': {
      '@type': 'Review',
      'reviewBody': cs.testimonial.quote,
      'author': {
        '@type': 'Person',
        'name': cs.testimonial.author,
        'jobTitle': cs.testimonial.role,
      },
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': '5',
        'bestRating': '5',
      },
    },
  };
}

export default async function CaseStudyPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' },
    { name: cs.client, url: `/case-studies/${cs.slug}` },
  ]);

  const otherStudies = CASE_STUDIES.filter(c => c.slug !== cs.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(caseStudySchema(cs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />

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
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '3px 10px',
              borderRadius: '100px',
              background: 'var(--accent)',
              color: '#000',
            }}>
              {cs.industry}
            </span>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '3px 10px',
              borderRadius: '100px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}>
              {cs.service}
            </span>
          </div>
          <h1 className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: '12px' }}>
            {cs.client}: <span className="accent">{cs.title}</span>
          </h1>
          <p className="section-sub">{cs.description}</p>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '12px' }}>
            Duration: {cs.duration} &middot; Services: {cs.services.join(', ')}
          </p>
        </header>

        {/* RESULTS TABLE */}
        <section style={{ marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: '24px' }}>
            Results
          </h2>
          <div style={{
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--surface)' }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Metric</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Before</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>After</th>
                </tr>
              </thead>
              <tbody>
                {cs.results.map((r, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 20px', fontSize: '15px', fontWeight: 500 }}>{r.metric}</td>
                    <td style={{ padding: '14px 20px', fontSize: '15px', color: 'var(--muted)' }}>{r.before}</td>
                    <td style={{ padding: '14px 20px', fontSize: '15px', fontWeight: 600, color: 'var(--accent)' }}>{r.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CHALLENGE */}
        <section style={{ marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: '16px' }}>
            The challenge
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--muted)' }}>{cs.challenge}</p>
        </section>

        {/* SOLUTION */}
        <section style={{ marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: '16px' }}>
            Our solution
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--muted)', marginBottom: '20px' }}>{cs.solution}</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {cs.services.map((svc) => (
              <span key={svc} style={{
                fontSize: '12px',
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: '100px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}>
                {svc}
              </span>
            ))}
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section style={{ marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px' }}>
          <blockquote style={{
            padding: '32px',
            borderRadius: 'var(--r-lg)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            margin: 0,
          }}>
            <p style={{
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              lineHeight: 1.6,
              fontStyle: 'italic',
              marginBottom: '16px',
              position: 'relative',
            }}>
              &ldquo;{cs.testimonial.quote}&rdquo;
            </p>
            <footer style={{ fontSize: '14px' }}>
              <strong>{cs.testimonial.author}</strong>
              <span style={{ color: 'var(--muted)' }}> &mdash; {cs.testimonial.role}</span>
            </footer>
          </blockquote>
        </section>

        {/* MORE CASE STUDIES */}
        {otherStudies.length > 0 && (
          <section style={{ marginBottom: '60px' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: '24px', textAlign: 'center' }}>
              More case studies
            </h2>
            <div className="includes-grid">
              {otherStudies.map((other) => (
                <Link
                  key={other.slug}
                  href={`/case-studies/${other.slug}`}
                  className="include-card"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    background: 'var(--accent)',
                    color: '#000',
                    alignSelf: 'flex-start',
                  }}>
                    {other.industry}
                  </span>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent)' }}>
                    {other.title}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{other.client}</h3>
                  <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, marginTop: 'auto' }}>
                    Read case study &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Want results like {cs.client}?</h2>
            <p className="final-p">Get a free SEO audit to see where your opportunities are.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Free SEO Audit &rarr;</Link>
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
