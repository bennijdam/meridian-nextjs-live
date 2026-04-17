/**
 * Homepage services bento grid — exact visual parity.
 * 7 service cards with pictures, tags, titles, descriptions, meta.
 */
export default function ServicesBento() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="section-eyebrow">SERVICES</span>
          <h2 className="section-title">Everything a serious London business needs to <span className="accent">dominate search</span>.</h2>
          <p className="section-sub">Seven disciplines, one accountable team. From the SEO agency London brands trust for compounding rankings to the app developers London startups choose to ship MVPs — under one roof.</p>
        </div>

        <div className="bento reveal">
          <article className="bento-card bc-1" tabIndex={0} aria-label="SEO agency London">
            <picture><source type="image/avif" srcSet="/img/seo-search-optimisation-480w.avif 480w, /img/seo-search-optimisation-768w.avif 768w, /img/seo-search-optimisation-1200w.avif 1200w, /img/seo-search-optimisation-1920w.avif 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><source type="image/webp" srcSet="/img/seo-search-optimisation-480w.webp 480w, /img/seo-search-optimisation-768w.webp 768w, /img/seo-search-optimisation-1200w.webp 1200w, /img/seo-search-optimisation-1920w.webp 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><img src="/img/seo-search-optimisation-1200w.webp" alt="SEO agency London search engine optimisation services" width="768" height="510" loading="lazy" decoding="async" className="bento-bg" /></picture>
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">SEO + GEO + AEO</span>
            <h3 className="bento-h">SEO Agency London</h3>
            <p className="bento-p">Technical, content and authority — engineered for AI Overviews, ChatGPT citations and the top three Google results.</p>
            <div className="bento-meta">
              <span>From £2,500/mo</span> · <span>4–6 mo to compound</span>
            </div>
          </article>

          <article className="bento-card bc-2" tabIndex={0} aria-label="PPC and Google Ads agency London">
            <picture><source type="image/avif" srcSet="/img/digital-marketing-team-480w.avif 480w, /img/digital-marketing-team-768w.avif 768w, /img/digital-marketing-team-1200w.avif 1200w, /img/digital-marketing-team-1920w.avif 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><source type="image/webp" srcSet="/img/digital-marketing-team-480w.webp 480w, /img/digital-marketing-team-768w.webp 768w, /img/digital-marketing-team-1200w.webp 1200w, /img/digital-marketing-team-1920w.webp 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><img src="/img/digital-marketing-team-1200w.webp" alt="PPC agency London Google Ads management" width="768" height="598" loading="lazy" decoding="async" className="bento-bg" /></picture>
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">GOOGLE ADS · META · LINKEDIN</span>
            <h3 className="bento-h">PPC &amp; Paid Media</h3>
            <p className="bento-p">London CPCs are punishing. We squeeze every pound of paid media to ROAS targets — Google Ads, Performance Max, Meta, LinkedIn, TikTok.</p>
            <div className="bento-meta">
              <span>From £1,800/mo</span> · <span>Live in 7 days</span>
            </div>
          </article>

          <article className="bento-card bc-3" tabIndex={0} aria-label="Web design London">
            <picture><source type="image/avif" srcSet="/img/ux-ui-design-480w.avif 480w, /img/ux-ui-design-768w.avif 768w, /img/ux-ui-design-1200w.avif 1200w, /img/ux-ui-design-1920w.avif 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><source type="image/webp" srcSet="/img/ux-ui-design-480w.webp 480w, /img/ux-ui-design-768w.webp 768w, /img/ux-ui-design-1200w.webp 1200w, /img/ux-ui-design-1920w.webp 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><img src="/img/ux-ui-design-1200w.webp" alt="Web design London website development services" width="768" height="556" loading="lazy" decoding="async" className="bento-bg" /></picture>
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">DESIGN + DEV</span>
            <h3 className="bento-h">Web Design</h3>
            <p className="bento-p">Lightning-fast, conversion-engineered websites in Next.js, Webflow, Shopify or WordPress.</p>
          </article>

          <article className="bento-card bc-4" tabIndex={0} aria-label="App development London">
            <picture><source type="image/avif" srcSet="/img/web-hosting-domain-480w.avif 480w, /img/web-hosting-domain-768w.avif 768w, /img/web-hosting-domain-1200w.avif 1200w, /img/web-hosting-domain-1920w.avif 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><source type="image/webp" srcSet="/img/web-hosting-domain-480w.webp 480w, /img/web-hosting-domain-768w.webp 768w, /img/web-hosting-domain-1200w.webp 1200w, /img/web-hosting-domain-1920w.webp 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><img src="/img/web-hosting-domain-1200w.webp" alt="App development London iOS Android Flutter" width="768" height="444" loading="lazy" decoding="async" className="bento-bg" /></picture>
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">iOS · ANDROID · WEB</span>
            <h3 className="bento-h">App Development</h3>
            <p className="bento-p">Native &amp; cross-platform apps for London startups and scale-ups. MVP in 12 weeks.</p>
          </article>

          <article className="bento-card bc-5" tabIndex={0} aria-label="Social media management London">
            <picture><source type="image/avif" srcSet="/img/social-media-management-480w.avif 480w, /img/social-media-management-768w.avif 768w, /img/social-media-management-1200w.avif 1200w, /img/social-media-management-1920w.avif 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><source type="image/webp" srcSet="/img/social-media-management-480w.webp 480w, /img/social-media-management-768w.webp 768w, /img/social-media-management-1200w.webp 1200w, /img/social-media-management-1920w.webp 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><img src="/img/social-media-management-1200w.webp" alt="Social media agency London Instagram TikTok management" width="768" height="576" loading="lazy" decoding="async" className="bento-bg" /></picture>
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">IG · TIKTOK · LINKEDIN</span>
            <h3 className="bento-h">Social Media</h3>
            <p className="bento-p">Strategy, content, community, paid social. Instagram, TikTok, LinkedIn ghostwriting, UGC.</p>
          </article>

          <article className="bento-card bc-6" tabIndex={0} aria-label="Branding agency London">
            <picture><source type="image/avif" srcSet="/img/branding-strategy-480w.avif 480w, /img/branding-strategy-768w.avif 768w, /img/branding-strategy-1200w.avif 1200w, /img/branding-strategy-1920w.avif 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><source type="image/webp" srcSet="/img/branding-strategy-480w.webp 480w, /img/branding-strategy-768w.webp 768w, /img/branding-strategy-1200w.webp 1200w, /img/branding-strategy-1920w.webp 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><img src="/img/branding-strategy-1200w.webp" alt="Branding agency London logo design strategy" width="768" height="512" loading="lazy" decoding="async" className="bento-bg" /></picture>
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">IDENTITY · STRATEGY · NAMING</span>
            <h3 className="bento-h">Branding &amp; Identity</h3>
            <p className="bento-p">For founders building category-defining brands. From naming to full visual systems and brand guidelines.</p>
            <div className="bento-meta">
              <span>From £8,500</span> · <span>4–8 week sprints</span>
            </div>
          </article>

          <article className="bento-card bc-7" tabIndex={0} aria-label="Business plan writing London innovator visa">
            <picture><source type="image/avif" srcSet="/img/digital-marketing-team-480w.avif 480w, /img/digital-marketing-team-768w.avif 768w, /img/digital-marketing-team-1200w.avif 1200w, /img/digital-marketing-team-1920w.avif 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><source type="image/webp" srcSet="/img/digital-marketing-team-480w.webp 480w, /img/digital-marketing-team-768w.webp 768w, /img/digital-marketing-team-1200w.webp 1200w, /img/digital-marketing-team-1920w.webp 1920w" sizes="(min-width: 768px) 50vw, 100vw" /><img src="/img/digital-marketing-team-1200w.webp" alt="Business plan writer London innovator founder visa" width="768" height="598" loading="lazy" decoding="async" className="bento-bg" /></picture>
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">VISA · INVESTOR · BANK</span>
            <h3 className="bento-h">Business Plans &amp; Pitch Decks</h3>
            <p className="bento-p">Innovator Founder visa business plans, investor decks, financial models. Endorsing-body approved.</p>
            <div className="bento-meta">
              <span>From £1,800</span> · <span>10-day turnaround</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
