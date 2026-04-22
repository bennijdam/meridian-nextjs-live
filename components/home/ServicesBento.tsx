/**
 * Homepage services bento grid.
 * Images: bc-1 seo, bc-2 ppc (new), bc-3 ux-ui, bc-4 app-dev (new),
 *         bc-5 social, bc-6 branding, bc-7 business-strategy (new).
 */

function BentoImg({ base, alt, w, h }: { base: string; alt: string; w: number; h: number }) {
  const sizes = [480, 768, 1200, 1920];
  const hasAvif = !base.startsWith('ppc-') && !base.startsWith('app-') && !base.startsWith('business-') && !base.startsWith('london-');
  return (
    <picture>
      {hasAvif && (
        <source
          type="image/avif"
          srcSet={sizes.map(s => `/img/${base}-${s}w.avif ${s}w`).join(', ')}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      )}
      <source
        type="image/webp"
        srcSet={sizes.map(s => `/img/${base}-${s}w.webp ${s}w`).join(', ')}
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <img
        src={`/img/${base}-1200w.webp`}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
        className="bento-bg"
      />
    </picture>
  );
}

export default function ServicesBento() {
  return (
    <section id="services">
      <div className="section-box-wrap">
      <div className="section-box">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="section-eyebrow">SERVICES</span>
          <h2 className="section-title">Everything a serious London business needs to <span className="accent">dominate search</span>.</h2>
          <p className="section-sub">Seven disciplines, one accountable team. From the SEO agency London brands trust for compounding rankings to the app developers London startups choose to ship MVPs — under one roof.</p>
        </div>

        <div className="bento reveal">
          <article className="bento-card bc-1" tabIndex={0} aria-label="SEO agency London">
            <BentoImg base="seo-search-optimisation" alt="SEO agency London — search engine optimisation" w={768} h={510} />
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">SEO + GEO + AEO</span>
            <h3 className="bento-h">SEO Agency London</h3>
            <p className="bento-p">Technical, content and authority — engineered for AI Overviews, ChatGPT citations and the top three Google results.</p>
            <div className="bento-meta"><span>From £2,500/mo</span> · <span>4–6 mo to compound</span></div>
          </article>

          <article className="bento-card bc-2" tabIndex={0} aria-label="PPC and Google Ads agency London">
            <BentoImg base="ppc-paid-media" alt="PPC agency London — analytics dashboard and paid media management" w={768} h={512} />
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">GOOGLE ADS · META · LINKEDIN</span>
            <h3 className="bento-h">PPC &amp; Paid Media</h3>
            <p className="bento-p">London CPCs are punishing. We squeeze every pound of paid media to ROAS targets — Google Ads, Performance Max, Meta, LinkedIn, TikTok.</p>
            <div className="bento-meta"><span>From £1,800/mo</span> · <span>Live in 7 days</span></div>
          </article>

          <article className="bento-card bc-3" tabIndex={0} aria-label="Web design London">
            <BentoImg base="ux-ui-design" alt="Web design London — UX/UI design and website development" w={768} h={556} />
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">DESIGN + DEV</span>
            <h3 className="bento-h">Web Design</h3>
            <p className="bento-p">Lightning-fast, conversion-engineered websites in Next.js, Webflow, Shopify or WordPress.</p>
          </article>

          <article className="bento-card bc-4" tabIndex={0} aria-label="App development London">
            <BentoImg base="app-development-mobile" alt="App development London — mobile app on smartphone" w={768} h={512} />
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">iOS · ANDROID · WEB</span>
            <h3 className="bento-h">App Development</h3>
            <p className="bento-p">Native &amp; cross-platform apps for London startups and scale-ups. MVP in 12 weeks.</p>
          </article>

          <article className="bento-card bc-5" tabIndex={0} aria-label="Social media management London">
            <BentoImg base="social-media-management" alt="Social media agency London — Instagram TikTok management" w={768} h={576} />
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">IG · TIKTOK · LINKEDIN</span>
            <h3 className="bento-h">Social Media</h3>
            <p className="bento-p">Strategy, content, community, paid social. Instagram, TikTok, LinkedIn ghostwriting, UGC.</p>
          </article>

          <article className="bento-card bc-6" tabIndex={0} aria-label="Branding agency London">
            <BentoImg base="branding-strategy" alt="Branding agency London — identity and strategy" w={768} h={512} />
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">IDENTITY · STRATEGY · NAMING</span>
            <h3 className="bento-h">Branding &amp; Identity</h3>
            <p className="bento-p">For founders building category-defining brands. From naming to full visual systems and brand guidelines.</p>
            <div className="bento-meta"><span>From £8,500</span> · <span>4–8 week sprints</span></div>
          </article>

          <article className="bento-card bc-7" tabIndex={0} aria-label="Business plan writing London innovator visa">
            <BentoImg base="business-strategy-meeting" alt="Business plan writer London — boardroom strategy meeting and pitch deck" w={768} h={512} />
            <div className="bento-arrow">↗</div>
            <span className="bento-tag">VISA · INVESTOR · BANK</span>
            <h3 className="bento-h">Business Plans &amp; Pitch Decks</h3>
            <p className="bento-p">Innovator Founder visa business plans, investor decks, financial models. Endorsing-body approved.</p>
            <div className="bento-meta"><span>From £1,800</span> · <span>10-day turnaround</span></div>
          </article>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}
