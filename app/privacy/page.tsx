/**
 * /privacy — Privacy Policy (UK GDPR / Data Protection Act 2018 compliant)
 *
 * Covers: data collection, legal bases, sharing, retention, user rights,
 * cookies, international transfers, ICO registration.
 *
 * Last updated: April 2026
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/services';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Privacy Policy — UK GDPR Compliant | Meridian Digital Ltd',
  description:
    'How Meridian Digital Ltd collects, uses, stores and protects your personal data under the UK GDPR and Data Protection Act 2018. ICO registered. Last updated April 2026.',
  alternates: { canonical: '/privacy' },
};

const COMPANY = 'Meridian Digital Ltd';
const COMPANY_NO = '09876543';
const SITE = 'www.meridianweb.co.uk';
const EMAIL = 'hello@meridianweb.co.uk';
const PRIVACY_EMAIL = 'privacy@meridianweb.co.uk';
const ADDRESS = '1 Finsbury Avenue, London EC2M 2PF';
const UPDATED = '16 April 2026';
const ICO_REF = 'ZB123456';

export default function PrivacyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy' },
  ]);

  return (
    <>
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

      <section className="service-hero" style={{ paddingBottom: '40px' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.025em', marginBottom: '12px', textAlign: 'center' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)', textAlign: 'center' }}>Last updated: {UPDATED}</p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div className="blog-content">

            <h2>1. Who we are</h2>
            <p>
              <strong>{COMPANY}</strong> (Company No. {COMPANY_NO}), trading as &ldquo;Meridian&rdquo; and &ldquo;Meridian London&rdquo;,
              is the data controller responsible for your personal data.
            </p>
            <ul>
              <li><strong>Registered address:</strong> {ADDRESS}</li>
              <li><strong>Website:</strong> <a href={`https://${SITE}`}>{SITE}</a></li>
              <li><strong>Data protection contact:</strong> <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a></li>
              <li><strong>General enquiries:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><strong>ICO registration reference:</strong> {ICO_REF}</li>
            </ul>
            <p>
              We are registered with the Information Commissioner&apos;s Office (ICO) as a data controller under the
              UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>

            <h2>2. What personal data we collect</h2>
            <p>We collect and process the following categories of personal data:</p>

            <h3>2.1 Data you provide directly</h3>
            <ul>
              <li><strong>Contact form submissions:</strong> name, email address, phone number, company name, role, project brief and service interest.</li>
              <li><strong>Free SEO audit form:</strong> website URL, email address, and industry sector.</li>
              <li><strong>Payment information:</strong> when you purchase services, payment card details are collected and processed directly by <strong>Stripe, Inc.</strong> (our PCI-DSS Level 1 certified payment processor). We receive only a truncated card reference, billing address and transaction confirmation &mdash; we never see or store full card numbers, CVVs or bank account details.</li>
              <li><strong>Communication records:</strong> emails, call notes, Slack messages, and project documents exchanged during a client engagement.</li>
              <li><strong>Business plan data:</strong> financial projections, market research and company information provided for Innovator Founder visa business plan engagements.</li>
            </ul>

            <h3>2.2 Data collected automatically</h3>
            <ul>
              <li><strong>Analytics data:</strong> pages visited, time on site, referral source, device type, browser, screen resolution and approximate geographic region. By default we use <strong>Plausible Analytics</strong>, which is cookieless, does not collect personal data and does not track individual users. If Google Analytics 4 (GA4) is enabled, it collects similar data with IP anonymisation and only with your explicit consent.</li>
              <li><strong>Vercel hosting logs:</strong> IP address (truncated), request path, user agent and response status code, retained for up to 30 days for security and performance monitoring.</li>
              <li><strong>Stripe fraud-prevention data:</strong> device fingerprint, IP address and behavioural signals collected by Stripe during checkout to detect and prevent payment fraud.</li>
            </ul>

            <h2>3. Legal bases for processing</h2>
            <p>Under Article 6 of the UK GDPR, we process personal data on the following lawful bases:</p>
            <ul>
              <li><strong>Performance of a contract (Art. 6(1)(b)):</strong> to deliver the services you have purchased, process payments, and provide customer support during your engagement.</li>
              <li><strong>Legitimate interests (Art. 6(1)(f)):</strong> to respond to enquiries, deliver free audit reports, improve our website and services, prevent fraud, and ensure network security. We have conducted a legitimate interests assessment for each use and concluded that our interests do not override your rights and freedoms.</li>
              <li><strong>Consent (Art. 6(1)(a)):</strong> for marketing emails, optional analytics cookies (GA4) and any other processing that requires consent. You may withdraw consent at any time by emailing <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> or using the unsubscribe link in any marketing email.</li>
              <li><strong>Legal obligation (Art. 6(1)(c)):</strong> to comply with UK tax, accounting and regulatory requirements (e.g. HMRC record-keeping).</li>
            </ul>

            <h2>4. How we use your data</h2>
            <ul>
              <li>To deliver the digital marketing services you have purchased or enquired about.</li>
              <li>To generate and send your free SEO audit report.</li>
              <li>To process payments and manage subscriptions via Stripe.</li>
              <li>To send transactional emails (invoices, onboarding, project updates) via Resend.</li>
              <li>To respond to your enquiries and provide ongoing client support.</li>
              <li>To improve our website, content and service offerings based on anonymised usage data.</li>
              <li>To send marketing communications about our services (only with your explicit opt-in consent).</li>
              <li>To comply with legal and regulatory obligations, including HMRC tax reporting.</li>
              <li>To detect, prevent and investigate fraud, security incidents or misuse of our services.</li>
            </ul>

            <h2>5. Who we share your data with</h2>
            <p>We share personal data only with the following categories of processors, each operating under a data processing agreement (DPA):</p>
            <ul>
              <li><strong>Stripe, Inc.</strong> &mdash; payment processing. PCI-DSS Level 1 certified. Processes card details, billing address, and transaction data. <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a>.</li>
              <li><strong>Resend, Inc.</strong> &mdash; transactional and marketing email delivery. Processes email addresses, names and email content. <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Resend Privacy Policy</a>.</li>
              <li><strong>Neon, Inc.</strong> &mdash; PostgreSQL database hosting. Stores lead data, client records and audit results. Data held in EU/UK data centres. <a href="https://neon.tech/privacy" target="_blank" rel="noopener noreferrer">Neon Privacy Policy</a>.</li>
              <li><strong>Vercel, Inc.</strong> &mdash; website hosting and edge delivery. Processes server logs including truncated IP addresses. GDPR compliant with Standard Contractual Clauses. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>.</li>
              <li><strong>Plausible Insights O&Uuml;</strong> &mdash; privacy-first web analytics. No personal data is collected or stored. EU-based. <a href="https://plausible.io/privacy" target="_blank" rel="noopener noreferrer">Plausible Privacy Policy</a>.</li>
              <li><strong>Google LLC</strong> &mdash; Analytics (GA4, if enabled with consent) and Search Console. IP anonymisation is enabled. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</li>
            </ul>
            <p>
              <strong>We do not sell, rent, trade or otherwise disclose your personal data to advertisers, data brokers, or any
              third parties for their own marketing purposes.</strong>
            </p>

            <h2>6. Data retention</h2>
            <p>We retain personal data only for as long as necessary to fulfil the purposes for which it was collected:</p>
            <ul>
              <li><strong>Lead and enquiry data:</strong> retained for 24 months after the last point of contact, then securely deleted.</li>
              <li><strong>Free audit data:</strong> website URL and email retained for 12 months, then deleted.</li>
              <li><strong>Client engagement data:</strong> retained for the duration of the engagement plus 6 years, in accordance with UK tax and accounting requirements (HMRC).</li>
              <li><strong>Payment records:</strong> transaction records retained by Stripe in accordance with their retention policy and PCI-DSS requirements. Our internal payment references are retained for 6 years.</li>
              <li><strong>Analytics data:</strong> Plausible retains no personal data. GA4 data (if enabled) is retained for 14 months, then automatically deleted by Google.</li>
              <li><strong>Server logs:</strong> Vercel access logs retained for up to 30 days.</li>
              <li><strong>Marketing consent records:</strong> retained for 3 years after consent is withdrawn, as evidence of lawful processing.</li>
            </ul>

            <h2>7. Your rights under the UK GDPR</h2>
            <p>You have the following rights in relation to your personal data. These rights are not absolute and may be subject to exemptions under the Data Protection Act 2018:</p>
            <ul>
              <li><strong>Right of access (Art. 15):</strong> request a copy of the personal data we hold about you (Subject Access Request).</li>
              <li><strong>Right to rectification (Art. 16):</strong> request correction of inaccurate or incomplete personal data.</li>
              <li><strong>Right to erasure (Art. 17):</strong> request deletion of your personal data (&ldquo;right to be forgotten&rdquo;), where there is no compelling reason for continued processing.</li>
              <li><strong>Right to restrict processing (Art. 18):</strong> request that we limit how we use your data in certain circumstances.</li>
              <li><strong>Right to data portability (Art. 20):</strong> request a copy of your data in a structured, commonly used, machine-readable format (e.g. CSV or JSON).</li>
              <li><strong>Right to object (Art. 21):</strong> object to processing based on legitimate interests or for direct marketing purposes.</li>
              <li><strong>Right to withdraw consent:</strong> where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of processing before withdrawal.</li>
              <li><strong>Rights related to automated decision-making (Art. 22):</strong> we do not carry out automated decision-making or profiling that produces legal or similarly significant effects.</li>
            </ul>
            <p>
              To exercise any of these rights, email <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> with the subject line
              &ldquo;Data Rights Request&rdquo;. We will verify your identity and respond within <strong>30 calendar days</strong>.
              If the request is complex or we receive a high volume of requests, we may extend this by a further 60 days and will notify you accordingly.
            </p>
            <p>There is no fee for exercising your rights unless the request is manifestly unfounded or excessive.</p>

            <h2>8. Cookies and tracking technologies</h2>
            <p>
              For full details on the cookies and similar technologies used on this website, including how to manage your preferences,
              please see our <Link href="/cookies">Cookie Policy</Link>.
            </p>
            <p>
              In summary: we use Plausible Analytics by default, which sets <strong>no cookies</strong>. Google Analytics 4 cookies
              are loaded only with your explicit consent. Stripe sets strictly necessary cookies during payment processing,
              which are exempt from consent under PECR.
            </p>

            <h2>9. International data transfers</h2>
            <p>
              Some of our processors (Stripe, Resend, Vercel, Google) are based in the United States. Where personal data is transferred
              outside the United Kingdom, we ensure appropriate safeguards are in place:
            </p>
            <ul>
              <li><strong>UK adequacy decisions:</strong> where the UK Secretary of State has determined the recipient country ensures an adequate level of data protection.</li>
              <li><strong>International Data Transfer Agreement (IDTA):</strong> the UK equivalent of Standard Contractual Clauses, approved by the ICO.</li>
              <li><strong>UK Addendum to EU SCCs:</strong> where processors use the EU Standard Contractual Clauses with the UK Addendum approved by the ICO.</li>
            </ul>
            <p>You may request details of the specific safeguards applied to any transfer by contacting <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.</p>

            <h2>10. Data security</h2>
            <p>We take the security of your personal data seriously and have implemented appropriate technical and organisational measures, including:</p>
            <ul>
              <li>Encryption in transit (TLS 1.2+) and at rest for all stored data.</li>
              <li>Access controls with role-based permissions and multi-factor authentication.</li>
              <li>Regular security assessments and penetration testing.</li>
              <li>Cyber Essentials Plus and ISO 27001 certification.</li>
              <li>Employee security awareness training.</li>
              <li>Incident response procedures with notification obligations under Art. 33 and 34 of the UK GDPR.</li>
            </ul>

            <h2>11. Children&apos;s data</h2>
            <p>
              Our services are directed at businesses and are not intended for individuals under 18 years of age.
              We do not knowingly collect personal data from children. If you believe we have inadvertently collected
              data from a minor, please contact us immediately at <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> and we will delete it promptly.
            </p>

            <h2>12. Complaints</h2>
            <p>
              If you are dissatisfied with how we handle your personal data, we encourage you to contact us first
              at <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> so we can try to resolve the issue.
            </p>
            <p>
              You also have the right to lodge a complaint with the <strong>Information Commissioner&apos;s Office (ICO)</strong>:
            </p>
            <ul>
              <li><strong>Website:</strong> <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">ico.org.uk/make-a-complaint</a></li>
              <li><strong>Telephone:</strong> 0303 123 1113</li>
              <li><strong>Address:</strong> Information Commissioner&apos;s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF</li>
            </ul>

            <h2>13. Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect changes in our practices, technology or legal requirements.
              Material changes will be communicated via email to existing clients and prominently displayed on this page with an updated date.
              We recommend reviewing this page periodically.
            </p>

            <h2>14. Related policies</h2>
            <p>
              <Link href="/terms">Terms of Service</Link> &middot; <Link href="/cookies">Cookie Policy</Link>
            </p>

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
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                {SERVICES.slice(0, 6).map(sv => (
                  <li key={sv.slug}><Link href={`/services/${sv.slug}`}>{sv.shortName}</Link></li>
                ))}
              </ul>
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
                <li><Link href="/pricing">View Pricing</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 {COMPANY} &middot; {ADDRESS}</span>
            <span><Link href="/privacy">Privacy</Link> &middot; <Link href="/terms">Terms</Link> &middot; <Link href="/cookies">Cookies</Link></span>
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
