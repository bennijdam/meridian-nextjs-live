/**
 * /terms — Terms of Service
 *
 * Covers: service agreement, payment terms (Stripe, retainers, projects),
 * intellectual property, liability limitations, cancellation policy,
 * dispute resolution (English courts), force majeure.
 *
 * References UK Consumer Rights Act 2015.
 * Last updated: April 2026
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/services';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Terms of Service — Meridian Digital Ltd',
  description:
    'Terms of service for Meridian Digital Ltd. Service agreements, payment terms, intellectual property, liability, cancellation, and dispute resolution under English law. Last updated April 2026.',
  alternates: { canonical: '/terms' },
};

const COMPANY = 'Meridian Digital Ltd';
const COMPANY_NO = '09876543';
const SITE = 'www.meridianweb.co.uk';
const EMAIL = 'hello@meridianweb.co.uk';
const ADDRESS = '1 Finsbury Avenue, London EC2M 2PF';
const UPDATED = '16 April 2026';

export default function TermsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms' },
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
            Terms of Service
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)', textAlign: 'center' }}>Last updated: {UPDATED}</p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div className="blog-content">

            <h2>1. Introduction and acceptance</h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;Client&rdquo;, &ldquo;you&rdquo;)
              and <strong>{COMPANY}</strong> (Company No. {COMPANY_NO}), registered at {ADDRESS} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;Meridian&rdquo;).
            </p>
            <p>
              By using our website at <a href={`https://${SITE}`}>{SITE}</a>, purchasing any services, or submitting a form, you confirm that you have read,
              understood and agree to be bound by these Terms. If you are entering into these Terms on behalf of a company or other legal entity,
              you represent that you have the authority to bind that entity.
            </p>
            <p>
              These Terms are governed by the laws of England and Wales. Nothing in these Terms affects your statutory rights under the
              <strong> Consumer Rights Act 2015</strong>, the <strong>Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013</strong>,
              or any other mandatory consumer protection legislation that cannot be excluded by agreement.
            </p>

            <h2>2. Services</h2>
            <p>
              {COMPANY} provides digital marketing and technology services including, but not limited to: search engine optimisation (SEO),
              pay-per-click advertising (PPC), web design and development, mobile app development, social media management, branding and identity,
              copywriting, email marketing, video production, e-commerce solutions, and business plan writing.
            </p>
            <p>
              The specific scope, deliverables and timelines for each engagement are defined by the service tier selected at checkout,
              or by a separate Statement of Work (SOW) agreed in writing by both parties. Where there is any conflict between a SOW and
              these Terms, the SOW shall prevail in respect of the specific engagement it covers.
            </p>

            <h2>3. Payment terms</h2>

            <h3>3.1 Retainer services (subscriptions)</h3>
            <p>Retainer services are offered on three billing cadences:</p>
            <ul>
              <li><strong>Pay-as-you-go (PAYG):</strong> billed monthly via Stripe. Subject to a 90-day minimum commitment period from the date of first payment. After the initial 90-day period, you may cancel with 30 days&apos; written notice, effective at the end of the current billing cycle.</li>
              <li><strong>Monthly subscription (6-month commitment):</strong> billed monthly via Stripe with a 6-month minimum commitment. Approximately 10% discount versus PAYG pricing. Early cancellation within the 6-month term incurs a termination fee equal to the remaining months at 50% of the monthly rate.</li>
              <li><strong>Annual subscription:</strong> billed as a single upfront payment via Stripe. 17% discount (equivalent to paying for 10 months and receiving 12). Non-refundable after the 14-day cooling-off period, except as described in Section 4.3.</li>
            </ul>

            <h3>3.2 Project-based services</h3>
            <p>
              Fixed-price projects (web design, app development, branding, business plans) are paid in full at checkout via Stripe.
              For projects with a total value exceeding &pound;10,000, we offer staged payment: 50% at project kickoff and 50% upon delivery and approval
              of the final deliverable.
            </p>

            <h3>3.3 Payment processing</h3>
            <p>
              All payments are processed securely by <strong>Stripe, Inc.</strong> We accept all major credit and debit cards, as well as
              GBP, EUR and USD bank transfers. For annual plans, direct debit may also be arranged.
            </p>
            <p>
              All prices displayed on our website are in British Pounds Sterling (&pound;) and are exclusive of VAT unless expressly stated otherwise.
              UK Value Added Tax at the prevailing rate (currently 20%) will be added to all invoices where applicable.
              We will provide a valid VAT invoice for every transaction.
            </p>

            <h3>3.4 Late and failed payments</h3>
            <p>
              Failed subscription payments will be retried by Stripe in accordance with their automatic retry schedule (typically 3 attempts over 7 days).
              If payment fails after all retry attempts, we reserve the right to pause service delivery until payment is resolved.
              We will notify you by email before any service suspension.
            </p>
            <p>
              For overdue invoices on project work, we reserve the right to charge interest at 8% above the Bank of England base rate,
              in accordance with the Late Payment of Commercial Debts (Interest) Act 1998.
            </p>

            <h2>4. Cancellation and refunds</h2>

            <h3>4.1 Retainer cancellation</h3>
            <ul>
              <li><strong>PAYG:</strong> after the 90-day minimum commitment, cancel with 30 days&apos; written notice to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. No refund for the current billing period; service continues until the end of the paid period.</li>
              <li><strong>Monthly (6-month):</strong> early cancellation within the 6-month term incurs a termination fee equal to the remaining months at 50% of the monthly rate. After the initial term, the subscription continues month-to-month and may be cancelled with 30 days&apos; notice.</li>
              <li><strong>Annual:</strong> refundable in full within the 14-day cooling-off period (see Section 4.3). After 14 days, non-refundable. If exceptional circumstances warrant early termination, we will consider pro-rata refunds on a case-by-case basis at our discretion.</li>
            </ul>

            <h3>4.2 Project cancellation</h3>
            <p>
              Fixed-price projects may be cancelled for a full refund if cancellation is received in writing before any work has commenced.
              If work has begun, we will charge for time spent at our standard day rate (&pound;850 per day) and refund the remainder.
              All work product completed up to the point of cancellation will be delivered to you.
            </p>

            <h3>4.3 Statutory cooling-off period</h3>
            <p>
              Under the <strong>Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013</strong>,
              if you are a consumer (an individual acting outside your trade, business, craft or profession), you have the right to cancel
              any contract entered into online within <strong>14 days</strong> of the date of purchase for a full refund, provided that you have not
              requested that performance of the services begin during that period.
            </p>
            <p>
              If you have expressly requested that work begin within the 14-day cooling-off period, you acknowledge that you will lose
              the right to cancel once the services have been fully performed, and that if you cancel before completion, you will be
              liable for a proportionate amount of the services already provided.
            </p>

            <h3>4.4 14-day satisfaction guarantee</h3>
            <p>
              In addition to your statutory rights, we offer a 14-day satisfaction guarantee on all retainer services.
              If you are not satisfied with our work within the first 14 days, we will refund the current month&apos;s payment in full.
              This guarantee does not affect your statutory cooling-off rights.
            </p>

            <h2>5. Intellectual property</h2>

            <h3>5.1 Work product ownership</h3>
            <p>
              All deliverables created specifically for you &mdash; including but not limited to websites, web applications, mobile applications,
              designs, illustrations, copy, content, strategies, reports and documentation &mdash; become your exclusive property upon receipt of
              final payment in full. Copyright, design rights and all other intellectual property rights in the deliverables are assigned to you
              absolutely and unconditionally.
            </p>

            <h3>5.2 Advertising and analytics accounts</h3>
            <p>
              All third-party accounts created on your behalf (Google Ads, Google Analytics, Google Search Console, Meta Business Suite,
              LinkedIn Campaign Manager, TikTok Ads, and similar) are created in your name and under your ownership.
              You retain full administrator access at all times. If our engagement ends, you retain all accounts, data, campaigns
              and historical performance data.
            </p>

            <h3>5.3 Meridian tools and methodologies</h3>
            <p>
              Proprietary tools, templates, frameworks, software libraries, and methodologies developed by Meridian prior to or independently
              of your engagement (&ldquo;Meridian IP&rdquo;) remain our intellectual property. Where Meridian IP is incorporated into a deliverable,
              you receive a perpetual, non-exclusive, royalty-free licence to use the outputs in their delivered form,
              but not to reverse-engineer, sublicense or distribute the underlying tools.
            </p>

            <h3>5.4 Portfolio and case studies</h3>
            <p>
              Unless you notify us otherwise in writing, we may reference the existence of our working relationship and display
              anonymised performance metrics in our portfolio and case studies. We will never disclose confidential business data,
              financials, or proprietary strategies without your explicit written permission.
            </p>

            <h2>6. Confidentiality</h2>
            <p>
              We will sign a mutual non-disclosure agreement (NDA) as standard before any discovery work begins.
              All client data, business information, strategies, financial data and trade secrets disclosed during our engagement
              are treated as strictly confidential and will not be disclosed to any third party without your prior written consent,
              except where required by law.
            </p>
            <p>
              Confidentiality obligations survive termination of the engagement for a period of 3 years.
              We maintain <strong>Cyber Essentials Plus</strong> and <strong>ISO 27001</strong> certification to safeguard your information.
            </p>

            <h2>7. Limitation of liability</h2>

            <h3>7.1 Cap on liability</h3>
            <p>
              To the maximum extent permitted by law, our total aggregate liability for any and all claims arising from or related to
              our services shall not exceed the total fees actually paid by you to us in the <strong>12-month period immediately preceding the event</strong>
              giving rise to the claim.
            </p>

            <h3>7.2 Exclusions</h3>
            <p>We shall not be liable for:</p>
            <ul>
              <li>Indirect, incidental, special, consequential or punitive damages, including loss of profits, data, business opportunities or goodwill.</li>
              <li>Any loss arising from changes to search engine algorithms, advertising platform policies, or third-party services outside our control.</li>
              <li>Results, rankings, traffic volumes or revenue outcomes &mdash; we guarantee process, transparency and effort, not specific commercial outcomes.</li>
              <li>Any interruption or error in third-party services (Google, Meta, Stripe, hosting providers, etc.).</li>
            </ul>

            <h3>7.3 Statutory rights preserved</h3>
            <p>
              Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence,
              fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited under English law,
              including your rights under the <strong>Consumer Rights Act 2015</strong>.
            </p>

            <h2>8. Warranties and disclaimers</h2>
            <p>
              We warrant that all services will be performed with reasonable care and skill, in accordance with generally accepted
              industry standards. This is consistent with the standard implied under the <strong>Consumer Rights Act 2015</strong>
              and the <strong>Supply of Goods and Services Act 1982</strong>.
            </p>
            <p>
              Except as expressly stated in these Terms, all other warranties, conditions and representations,
              whether express or implied, are excluded to the fullest extent permitted by law.
            </p>

            <h2>9. Free SEO audit</h2>
            <p>
              The free SEO audit available on our website is provided as-is for general informational purposes only.
              It does not constitute professional advice, does not create a client relationship, and should not be relied upon
              as the sole basis for business decisions. No liability is accepted for actions taken or not taken based on audit results.
            </p>

            <h2>10. Force majeure</h2>
            <p>
              Neither party shall be liable for any failure or delay in performing obligations under these Terms where such failure
              or delay results from circumstances beyond the reasonable control of the affected party, including but not limited to:
              acts of God, fire, flood, earthquake, pandemic, epidemic, government actions or orders, war, terrorism, civil unrest,
              strikes, lockouts, power failures, internet or telecommunications failures, cyberattacks, or failures of third-party
              service providers (including Google, Meta, Stripe, hosting and DNS providers).
            </p>
            <p>
              The affected party shall notify the other party in writing as soon as reasonably practicable and shall use reasonable
              endeavours to mitigate the effects. If the force majeure event continues for more than 60 consecutive days,
              either party may terminate the affected engagement by giving written notice, without liability for such termination.
            </p>

            <h2>11. Dispute resolution</h2>
            <p>
              If a dispute arises in connection with these Terms, the parties shall first attempt to resolve it through good-faith
              negotiation. Either party may request a meeting (in person or by video) within 14 days of written notification of the dispute.
            </p>
            <p>
              If the dispute is not resolved within 30 days of written notification, either party may refer the matter to mediation
              under the CEDR (Centre for Effective Dispute Resolution) Model Mediation Procedure. The mediation shall take place in London.
            </p>
            <p>
              If mediation is unsuccessful, the dispute shall be submitted to the exclusive jurisdiction of the <strong>courts of England and Wales</strong>.
            </p>

            <h2>12. Governing law</h2>
            <p>
              These Terms, and any dispute or claim arising out of or in connection with them (including non-contractual disputes or claims),
              shall be governed by and construed in accordance with the <strong>laws of England and Wales</strong>.
            </p>

            <h2>13. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid, illegal or unenforceable by a court of competent jurisdiction,
              that provision shall be severed from the remainder of these Terms, which shall continue in full force and effect.
            </p>

            <h2>14. Entire agreement</h2>
            <p>
              These Terms, together with any applicable Statement of Work, privacy policy and cookie policy, constitute the entire
              agreement between you and {COMPANY} in relation to the subject matter hereof. They supersede all prior discussions,
              negotiations and agreements, whether written or oral.
            </p>

            <h2>15. Changes to these terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Material changes will be notified to existing clients by email
              at least 30 days before taking effect. Continued use of our services after the effective date constitutes acceptance of the revised Terms.
              The current version is always available at <Link href="/terms">{SITE}/terms</Link>.
            </p>

            <h2>16. Contact</h2>
            <p>
              <strong>{COMPANY}</strong><br />
              Company No. {COMPANY_NO}<br />
              {ADDRESS}<br />
              Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />
              Website: <a href={`https://${SITE}`}>{SITE}</a>
            </p>

            <h2>17. Related policies</h2>
            <p>
              <Link href="/privacy">Privacy Policy</Link> &middot; <Link href="/cookies">Cookie Policy</Link>
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
