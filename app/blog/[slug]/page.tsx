/**
 * /blog/[slug] — Individual blog post pages.
 *
 * Each article targets informational / AI-Overview keywords.
 * Articles are date-stamped and include FAQPage schema for
 * AI citation eligibility.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { POSTS, getPost, ALL_POST_SLUGS } from '@/lib/blog';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export function generateStaticParams() {
  return ALL_POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Meridian Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      locale: 'en_GB',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
    },
    keywords: post.keywords,
  };
}

function articleSchema(post: { title: string; description: string; slug: string; date: string; updated?: string; author: string; keywords: string[] }) {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://meridian.london';
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "url": `${SITE}/blog/${post.slug}`,
    "datePublished": post.date,
    "dateModified": post.updated || post.date,
    "author": { "@type": "Organization", "name": post.author, "url": SITE },
    "publisher": { "@type": "Organization", "name": "Meridian", "url": SITE },
    "keywords": post.keywords.join(', '),
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE}/blog/${post.slug}` },
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  const otherPosts = POSTS.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema(post)) }} />
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
        <Link href="/audit" className="nav-cta">Get Free Audit →</Link>
      </header>

      <article style={{ paddingTop: '140px', paddingBottom: '80px' }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '28px', fontSize: '13px', color: 'var(--ink-3)' }}>
            <Link href="/" style={{ color: 'var(--ink-3)' }}>Home</Link>
            <span style={{ margin: '0 6px', color: 'var(--border-2)' }}>·</span>
            <Link href="/blog" style={{ color: 'var(--ink-3)' }}>Blog</Link>
            <span style={{ margin: '0 6px', color: 'var(--border-2)' }}>·</span>
            <span>{post.category}</span>
          </nav>

          {/* Meta */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 10px', borderRadius: '999px', background: 'var(--surface)', border: '1px solid var(--border)', fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--accent)' }}>{post.category}</span>
            <span style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>
              {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: '24px' }}>
            {post.title}
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '48px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
            {post.description}
          </p>

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div style={{ marginTop: '60px', padding: '40px', borderRadius: 'var(--r-xl)', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', marginBottom: '12px', letterSpacing: '-0.015em' }}>Want to see how this applies to your business?</h3>
            <p style={{ color: 'var(--ink-2)', marginBottom: '20px', fontSize: '15px' }}>Get a free 90-second SEO audit with a 12-page PDF action plan.</p>
            <Link href="/audit" className="btn btn-primary">Get Free Audit →</Link>
          </div>

          {/* Related posts */}
          {otherPosts.length > 0 && (
            <div style={{ marginTop: '80px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', marginBottom: '24px' }}>More from the blog</h3>
              <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                {otherPosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="include-card" style={{ padding: '20px' }}>
                    <div style={{ fontSize: '10px', fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: '6px' }}>{p.category}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{p.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <footer>
        <div className="wrap">
          <div className="footer-bottom">
            <span>© 2026 Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF</span>
            <span>Cyber Essentials Plus · ISO 27001 · GDPR Compliant</span>
          </div>
        </div>
      </footer>
    </>
  );
}
