/**
 * /resources/[slug] — Individual lead magnet pages.
 *
 * Email-gated download pages built from lib/lead-magnets. Each page:
 *   - Hero with title, subtitle, outcome grid
 *   - Cover image + table of contents
 *   - LeadMagnetForm (email capture → /api/download)
 *   - Related case studies + services cross-links
 *   - FAQ with JSON-LD schema
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LEAD_MAGNETS,
  getLeadMagnet,
  ALL_LEAD_MAGNET_SLUGS,
  type LeadMagnet,
} from '@/lib/lead-magnets';
import { SERVICES, getService } from '@/lib/services';
import { CASE_STUDIES } from '@/lib/case-studies';
import { breadcrumbSchema, faqSchema, jsonLd } from '@/lib/schema';
import LeadMagnetForm from '@/components/LeadMagnetForm';

export function generateStaticParams() {
  return ALL_LEAD_MAGNET_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const m = getLeadMagnet(slug);
  if (!m) return {};
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { canonical: `/resources/${m.slug}` },
    openGraph: {
      title: m.metaTitle,
      description: m.metaDescription,
      url: `/resources/${m.slug}`,
      type: 'website',
      locale: 'en_GB',
    },
  };
}

function coverImageSlug(m: LeadMagnet): string {
  switch (m.category) {
    case 'SEO':
      return 'seo-search-optimisation';
    case 'PPC':
      return 'digital-marketing-team';
    case 'Web':
      return 'web-hosting-domain';
    case 'eCommerce':
      return 'branding-strategy';
    case 'Social':
      return 'social-media-management';
    case 'General':
    default:
      return 'ux-ui-design';
  }
}

function buildFaqs(m: LeadMagnet): Array<{ q: string; a: string }> {
  return [
    {
      q: `Is ${m.title} really free?`,
      a: 'Yes. Enter your email and we send the file instantly. No credit card, no follow-up sales calls, and you can unsubscribe in one click.',
    },
    {
      q: 'What format is the download?',
      a: `${m.format}${m.pages ? `, ${m.pages} pages` : ''}. Works on any device. ${
        m.format === 'Spreadsheet'
          ? 'Compatible with Excel, Google Sheets and Numbers.'
          : m.format === 'Template'
            ? 'Platform-agnostic with Klaviyo and Mailchimp exports included.'
            : 'Readable in any modern PDF viewer.'
      }`,
    },
    {
      q: 'Who is this for?',
      a: m.targetAudience,
    },
    {
      q: 'Can I share the file with my team?',
      a: 'Yes — share it freely with your own team and clients. All we ask is that you don\'t redistribute it publicly or republish it under your own brand.',
    },
    {
      q: 'What happens after I download?',
      a: 'You get a confirmation email with the download link. We may send one follow-up in a few weeks with related resources — nothing more unless you opt in. Unsubscribe any time.',
    },
  ];
}

export default async function LeadMagnetPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const m = getLeadMagnet(slug);
  if (!m) notFound();

  const faqs = buildFaqs(m);
  const imageSlug = coverImageSlug(m);

  const relatedServices = m.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const otherMagnets = LEAD_MAGNETS.filter((x) => x.slug !== m.slug).slice(0, 3);

  // Pick 2 case studies whose service string loosely matches a related service tag.
  const relatedCaseStudies = CASE_STUDIES.filter((cs) => {
    const serviceLabels = cs.services.map((s) => s.toLowerCase()).join(' ');
    return relatedServices.some((rs) => serviceLabels.includes(rs.slug.replace('-london', '').toLowerCase()));
  }).slice(0, 2);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: m.title, url: `/resources/${m.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(faqs)) }} />

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
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      <section className="service-hero">
        <div className="wrap">
          <span className="service-eyebrow">
            <span className="pulse"></span>
            FREE {m.format.toUpperCase()}
            {m.pages ? ` · ${m.pages} PAGES` : ''} · {m.category.toUpperCase()}
          </span>
          <h1
            className="hero-title"
            style={{ fontSize: 'clamp(36px,5.5vw,68px)', maxWidth: '920px', margin: '0 auto 22px' }}
          >
            {m.title}
          </h1>
          <p
            className="hero-sub"
            style={{ margin: '0 auto 28px', maxWidth: '700px', textAlign: 'center' }}
          >
            {m.subtitle}
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="#download" className="btn btn-primary">Get the {m.format.toLowerCase()} →</Link>
            <Link href="#inside" className="btn btn-ghost">What&apos;s inside</Link>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section id="inside" style={{ padding: '60px 0 40px' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">WHAT YOU&apos;LL LEARN</span>
            <h2 className="section-title">
              {m.outcomes.length} outcomes you can <span className="accent">apply this week</span>.
            </h2>
          </div>

          <div className="includes-grid stagger-grid reveal">
            {m.outcomes.map((o, i) => (
              <article key={i} className="include-card">
                <div className="include-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <p className="include-p">{o}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Description + Cover art */}
      <section style={{ padding: '40px 0' }}>
        <div className="wrap" style={{ maxWidth: '1000px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            <div className="reveal">
              <span className="section-eyebrow">ABOUT THIS RESOURCE</span>
              <p
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  lineHeight: '1.5',
                  letterSpacing: '-0.01em',
                  color: 'var(--ink)',
                  margin: '16px 0 20px',
                }}
              >
                {m.description}
              </p>
              <p style={{ color: 'var(--ink-2)', fontSize: '15px', lineHeight: '1.6' }}>
                {m.targetAudience}
              </p>
            </div>

            <div
              className="reveal"
              style={{
                borderRadius: 'var(--r-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                aspectRatio: '4/5',
                position: 'relative',
                maxWidth: '420px',
                margin: '0 auto',
              }}
            >
              <Image
                src={`/img/${imageSlug}-1200w.webp`}
                alt={`${m.title} — cover art`}
                fill
                sizes="(min-width: 900px) 420px, 90vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents + Download */}
      <section id="download" style={{ padding: '60px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: '1100px' }}>
          <div className="section-head reveal">
            <span className="section-eyebrow">TABLE OF CONTENTS</span>
            <h2 className="section-title">
              Everything inside <span className="accent">{m.title}</span>.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            <div className="reveal">
              <ol
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  counterReset: 'toc',
                }}
              >
                {m.tableOfContents.map((item, i) => (
                  <li
                    key={i}
                    className="include-card"
                    style={{
                      padding: '14px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '12px',
                        color: 'var(--ink-3)',
                        minWidth: '28px',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '14.5px', color: 'var(--ink)', lineHeight: '1.45' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="reveal" style={{ position: 'sticky', top: '20px' }}>
              <LeadMagnetForm
                magnetSlug={m.slug}
                downloadFilename={m.downloadFilename}
                magnetTitle={m.title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related case studies */}
      {relatedCaseStudies.length > 0 && (
        <section style={{ padding: '40px 0 60px' }}>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="section-eyebrow">RESULTS WE&apos;VE DELIVERED</span>
              <h2 className="section-title">
                See it <span className="accent">applied in practice</span>.
              </h2>
            </div>
            <div className="includes-grid stagger-grid reveal">
              {relatedCaseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="include-card"
                  style={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--mono)',
                      color: 'var(--ink-3)',
                      letterSpacing: '0.06em',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {cs.industry} · {cs.service}
                  </div>
                  <h3 className="include-h" style={{ fontSize: '18px' }}>
                    {cs.title}
                  </h3>
                  <p className="include-p">{cs.description}</p>
                  <span
                    style={{
                      fontSize: '13px',
                      color: 'var(--accent)',
                      marginTop: '10px',
                      display: 'block',
                    }}
                  >
                    Read case study →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section style={{ padding: '40px 0 60px' }}>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="section-eyebrow">RELATED SERVICES</span>
              <h2 className="section-title">
                Prefer we <span className="accent">do it for you</span>?
              </h2>
            </div>
            <div className="borough-track reveal">
              {relatedServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="borough featured">
                  <span className="dot" />
                  {s.shortName}
                </Link>
              ))}
              {SERVICES.filter((s) => !m.relatedServices.includes(s.slug)).slice(0, 4).map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="borough">
                  <span className="dot" />
                  {s.shortName}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-eyebrow">QUESTIONS</span>
            <h2 className="section-title">
              About <span className="accent">{m.title}</span>.
            </h2>
          </div>
          <div className="faq-list reveal">
            {faqs.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q">{f.q}</summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other resources */}
      {otherMagnets.length > 0 && (
        <section style={{ padding: '40px 0 60px' }}>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="section-eyebrow">MORE FREE RESOURCES</span>
              <h2 className="section-title">
                Other <span className="accent">free downloads</span>.
              </h2>
            </div>
            <div className="includes-grid stagger-grid reveal">
              {otherMagnets.map((o) => (
                <Link
                  key={o.slug}
                  href={`/resources/${o.slug}`}
                  className="include-card"
                  style={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--mono)',
                      color: 'var(--ink-3)',
                      letterSpacing: '0.06em',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {o.category} · {o.format}
                    {o.pages ? ` · ${o.pages} pages` : ''}
                  </div>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }} aria-hidden="true">
                    {o.icon}
                  </div>
                  <h3 className="include-h" style={{ fontSize: '18px' }}>
                    {o.title}
                  </h3>
                  <p className="include-p">{o.subtitle}</p>
                  <span
                    style={{
                      fontSize: '13px',
                      color: 'var(--accent)',
                      marginTop: '10px',
                      display: 'block',
                    }}
                  >
                    Download free →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="final-cta">
        <div className="wrap">
          <div className="final-card reveal">
            <h2 className="final-h">Want personalised advice?</h2>
            <p className="final-p">Free 90-second SEO audit — we&apos;ll apply these frameworks to your business.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
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
              <p>London&apos;s boutique digital performance studio since 2014.</p>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>{SERVICES.slice(0, 6).map(sv => (<li key={sv.slug}><Link href={`/services/${sv.slug}`}>{sv.shortName}</Link></li>))}</ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/reviews">Reviews</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Started</h4>
              <ul>
                <li><Link href="/audit">Free SEO Audit</Link></li>
                <li><Link href="/resources">Free Resources</Link></li>
                <li><Link href="/pricing">View Pricing</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span>
            <span>Cyber Essentials Plus · ISO 27001 · GDPR Compliant</span>
          </div>
        </div>
      </footer>
      <div className="mobile-cta" role="complementary">
        <span className="mobile-cta-text">Free SEO audit, 90s.</span>
        <Link href="/audit" className="mobile-cta-btn">Get Audit →</Link>
      </div>
    </>
  );
}
