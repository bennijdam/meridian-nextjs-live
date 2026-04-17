import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Digital Marketing Insights for London Businesses | Meridian',
  description: 'Expert insights on SEO, PPC, web design, app development and digital marketing for London businesses. Pricing guides, strategy playbooks, and industry analysis.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  return (
    <>
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

      <section className="service-hero" style={{ paddingBottom: '40px' }}>
        <div className="wrap">
          <span className="service-eyebrow"><span className="pulse"></span>INSIGHTS &amp; GUIDES</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(44px,6vw,80px)', maxWidth: '800px', margin: '0 auto 22px' }}>
            The Meridian <span className="accent">blog</span>.
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto', maxWidth: '600px', textAlign: 'center' }}>
            Pricing guides, strategy playbooks, and honest analysis for London businesses navigating SEO, PPC, web, app and AI search in 2026.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 120px' }}>
        <div className="wrap">
          <div className="includes-grid">
            {POSTS.map((post) => (
              <article key={post.slug} className="include-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  {post.category.toUpperCase()} · {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <h2 className="include-h" style={{ fontSize: '20px' }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: 'inherit' }}>{post.title}</Link>
                </h2>
                <p className="include-p" style={{ flex: 1 }}>{post.description}</p>
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>Read →</Link>
                </div>
              </article>
            ))}
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
                <li><Link href="/services/seo-london">SEO</Link></li>
                <li><Link href="/services/ppc-london">PPC</Link></li>
                <li><Link href="/services/web-design-london">Web Design</Link></li>
                <li><Link href="/services/app-development-london">App Dev</Link></li>
                <li><Link href="/services/social-media-london">Social Media</Link></li>
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
            <span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span>
            <span>Cyber Essentials Plus · ISO 27001 · GDPR Compliant</span>
          </div>
        </div>
      </footer>
    </>
  );
}
