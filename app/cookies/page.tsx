/**
 * /cookies — Cookie Policy (UK PECR compliant)
 *
 * Covers: essential cookies, analytics cookies, third-party cookies (Stripe,
 * Vercel Analytics), how to manage cookies, consent mechanism.
 *
 * Compliant with the Privacy and Electronic Communications Regulations 2003
 * (PECR) as amended, and the UK GDPR.
 *
 * Last updated: April 2026
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/services';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Cookie Policy — PECR Compliant | Meridian Digital Ltd',
  description:
    'How Meridian Digital Ltd uses cookies and similar technologies. Plausible Analytics (cookieless) by default. UK PECR compliant. Last updated April 2026.',
  alternates: { canonical: '/cookies' },
};

const COMPANY = 'Meridian Digital Ltd';
const PRIVACY_EMAIL = 'privacy@meridianweb.co.uk';
const ADDRESS = '1 Finsbury Avenue, London EC2M 2PF';
const UPDATED = '16 April 2026';

export default function CookiesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cookie Policy', url: '/cookies' },
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
            Cookie Policy
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)', textAlign: 'center' }}>Last updated: {UPDATED}</p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div className="blog-content">

            <h2>1. About this policy</h2>
            <p>
              This Cookie Policy explains how <strong>{COMPANY}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;Meridian&rdquo;)
              uses cookies and similar technologies on our website at <a href="https://www.meridianweb.co.uk">www.meridianweb.co.uk</a>.
              It should be read alongside our <Link href="/privacy">Privacy Policy</Link>.
            </p>
            <p>
              This policy complies with the <strong>Privacy and Electronic Communications (EC Directive) Regulations 2003</strong> (PECR)
              as amended, and the <strong>UK General Data Protection Regulation</strong> (UK GDPR) as it applies to the use of cookies
              and similar storage technologies.
            </p>

            <h2>2. What are cookies?</h2>
            <p>
              Cookies are small text files placed on your device (computer, tablet, phone) by websites you visit.
              They are widely used to make websites work efficiently, provide information to website owners,
              and improve the user experience. Cookies can be &ldquo;persistent&rdquo; (remaining on your device until
              deleted or expired) or &ldquo;session&rdquo; (deleted when you close your browser).
            </p>
            <p>
              Similar technologies include <strong>localStorage</strong> (browser-based storage), pixels, web beacons
              and device fingerprinting. This policy covers all such technologies.
            </p>

            <h2>3. Our approach to cookies</h2>
            <p>
              We believe in a privacy-first approach. By default, our website uses <strong>Plausible Analytics</strong>,
              which is fully cookieless &mdash; it does not set any cookies, does not use localStorage for tracking,
              does not collect personal data and does not track individual users across sessions or sites.
              Plausible is compliant with PECR and the UK GDPR without requiring a cookie consent banner.
            </p>
            <p>
              <strong>In its default configuration, this website sets zero tracking cookies.</strong> The only storage used
              is a localStorage item for your theme preference (light/dark mode), which is not a cookie and does not
              contain personal data.
            </p>

            <h2>4. Cookies and technologies we use</h2>

            <h3>4.1 Strictly necessary (no consent required)</h3>
            <p>
              These are essential for the website to function and cannot be switched off. Under PECR Regulation 6(4),
              strictly necessary cookies are exempt from the consent requirement.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--ink-4)' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Provider</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Purpose</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--ink-4)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: '13px' }}>meridian-theme</td>
                  <td style={{ padding: '8px 12px' }}>First-party (localStorage)</td>
                  <td style={{ padding: '8px 12px' }}>Stores your light/dark theme preference. Not a cookie &mdash; a localStorage item. Contains no personal data.</td>
                  <td style={{ padding: '8px 12px' }}>Persistent until cleared</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--ink-4)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: '13px' }}>__stripe_mid</td>
                  <td style={{ padding: '8px 12px' }}>Stripe (third-party)</td>
                  <td style={{ padding: '8px 12px' }}>Fraud prevention and detection during checkout. Set only when you initiate a payment.</td>
                  <td style={{ padding: '8px 12px' }}>1 year</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--ink-4)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: '13px' }}>__stripe_sid</td>
                  <td style={{ padding: '8px 12px' }}>Stripe (third-party)</td>
                  <td style={{ padding: '8px 12px' }}>Session-level fraud prevention during checkout. Set only when you initiate a payment.</td>
                  <td style={{ padding: '8px 12px' }}>Session (30 minutes)</td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>Note on Stripe cookies:</strong> Stripe&apos;s fraud-prevention cookies (<code>__stripe_mid</code> and <code>__stripe_sid</code>)
              are classified as strictly necessary because they are essential for processing secure payments. They are only set when
              you interact with a payment form or checkout flow. The ICO has confirmed that cookies which are strictly necessary for a
              service explicitly requested by the user (such as payment processing) are exempt from the PECR consent requirement.
            </p>

            <h3>4.2 Analytics cookies (consent required)</h3>
            <p>
              These cookies are <strong>only loaded if you explicitly opt in</strong> via the cookie consent mechanism on our website.
              They are never loaded by default.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--ink-4)' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Provider</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Purpose</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--ink-4)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: '13px' }}>_ga</td>
                  <td style={{ padding: '8px 12px' }}>Google Analytics 4 (third-party)</td>
                  <td style={{ padding: '8px 12px' }}>Distinguishes unique visitors for anonymised usage analytics. IP anonymisation is enabled.</td>
                  <td style={{ padding: '8px 12px' }}>2 years</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--ink-4)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: '13px' }}>_ga_*</td>
                  <td style={{ padding: '8px 12px' }}>Google Analytics 4 (third-party)</td>
                  <td style={{ padding: '8px 12px' }}>Maintains session state for GA4 measurement. Contains a unique session identifier.</td>
                  <td style={{ padding: '8px 12px' }}>2 years</td>
                </tr>
              </tbody>
            </table>
            <p>
              GA4 data is retained for 14 months from the date of collection, after which it is automatically deleted by Google.
              IP anonymisation is enabled, meaning Google truncates IP addresses before storage.
              For more details, see the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.
            </p>

            <h3>4.3 Preference cookies</h3>
            <p>
              We do not currently set any preference cookies beyond the <code>meridian-theme</code> localStorage item described above.
              If this changes in future, this policy will be updated and consent will be obtained where required.
            </p>

            <h3>4.4 Marketing and advertising cookies</h3>
            <p>
              <strong>We do not use any marketing, advertising, or social media tracking cookies.</strong> We do not use Facebook Pixel,
              Google Ads remarketing tags, LinkedIn Insight Tag, or any other advertising tracking technology on our website.
            </p>

            <h2>5. Third-party services</h2>
            <p>The following third-party services may interact with your browser when you use our website:</p>
            <ul>
              <li><strong>Stripe, Inc.</strong> &mdash; sets strictly necessary cookies during payment processing (see Section 4.1). <a href="https://stripe.com/gb/cookie-settings" target="_blank" rel="noopener noreferrer">Stripe Cookie Policy</a>.</li>
              <li><strong>Vercel, Inc.</strong> &mdash; our hosting provider. Vercel may collect server-side logs (truncated IP, request path, user agent) for performance and security. Vercel does not set client-side cookies on our behalf. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>.</li>
              <li><strong>Plausible Insights O&Uuml;</strong> &mdash; our default analytics provider. Plausible sets no cookies and collects no personal data. All data is aggregated and anonymised. <a href="https://plausible.io/privacy" target="_blank" rel="noopener noreferrer">Plausible Privacy Policy</a>.</li>
              <li><strong>Google LLC</strong> &mdash; GA4 analytics cookies are set only with your explicit consent (see Section 4.2). <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Google Cookie Policy</a>.</li>
            </ul>

            <h2>6. Cookie consent mechanism</h2>
            <p>
              When you first visit our website, if Google Analytics 4 or any other consent-dependent technology is enabled,
              you will be presented with a clear cookie consent banner that:
            </p>
            <ul>
              <li>Explains what categories of cookies are used and why.</li>
              <li>Allows you to accept or reject non-essential cookies before they are set.</li>
              <li>Provides a link to this Cookie Policy for detailed information.</li>
              <li>Does not use pre-ticked boxes, dark patterns, or misleading language.</li>
              <li>Treats closing the banner without making a selection as a rejection of non-essential cookies (no cookies are set without affirmative action).</li>
            </ul>
            <p>
              Your consent preferences are stored in a localStorage item so we can remember your choice on subsequent visits.
              You can change your preferences at any time by clearing your browser data or using the cookie settings accessible from the footer of our website.
            </p>

            <h2>7. How to manage and delete cookies</h2>
            <p>
              In addition to our consent mechanism, you can control cookies through your browser settings.
              Most browsers allow you to view, manage and delete cookies. Please note that disabling strictly necessary cookies
              may prevent parts of the website (particularly the checkout process) from functioning correctly.
            </p>
            <p>Instructions for the most common browsers:</p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
            <p>
              To opt out of Google Analytics across all websites, you can install the
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer"> Google Analytics Opt-out Browser Add-on</a>.
            </p>

            <h2>8. Do Not Track (DNT)</h2>
            <p>
              Some browsers transmit a &ldquo;Do Not Track&rdquo; (DNT) signal. While there is no universal standard for how
              websites should respond to DNT signals, our default use of Plausible Analytics means that no tracking cookies
              are set regardless of your DNT preference. If GA4 is enabled, it respects the DNT signal and will not
              load analytics cookies when DNT is active.
            </p>

            <h2>9. Changes to this policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in the cookies we use, the technologies
              available, or regulatory requirements. Material changes will be highlighted via a notice on our website.
              The &ldquo;Last updated&rdquo; date at the top of this page indicates when this policy was last revised.
            </p>

            <h2>10. Contact us</h2>
            <p>
              If you have any questions about our use of cookies or this policy, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a></li>
              <li><strong>Address:</strong> {COMPANY}, {ADDRESS}</li>
            </ul>

            <h2>11. Related policies</h2>
            <p>
              <Link href="/privacy">Privacy Policy</Link> &middot; <Link href="/terms">Terms of Service</Link>
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
