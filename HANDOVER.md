# HANDOVER.md

**Author:** Codex
**Project:** Meridian London v3
**Date:** 2026-04-16

---

## 2026-04-22 — Deployment wiring and documentation guardrails

### Summary
- Synced the local and Render `STRIPE_WEBHOOK_SECRET` to the live Stripe webhook signing secret.
- Created the Vercel project `meridian-nextjs-live`, imported the current environment set, and corrected the Vercel-side `NEXT_PUBLIC_SITE_URL` to the Vercel deployment domain during project creation.
- Fixed the current production build blocker in `app/careers/page.tsx` by removing an unused import that fails the strict production typecheck.
- Migrated linting to ESLint v9 flat config (`eslint.config.mjs`) and replaced `next lint` with `npm run lint` running a small wrapper (`scripts/lint.mjs`) for reliability on Windows.
- Added mandatory documentation-freshness guardrails to both repo-level and app-level `CLAUDE.md` and `CODEX.md`, and created the missing `AGENTS.md` logs.

### Technical Debt / Risks
- The first Vercel deployment failed because it built commit `576548d`, which did not include the `app/careers/page.tsx` fix. That fix is now pushed (commit `2040a07`); the next Vercel build should succeed.
- Upstash values are still placeholders in both local and hosted environments. Rate limiting is not production-ready until real Upstash credentials are provisioned in Render and Vercel.
- Shared environment values are now split across local setup, Render, and Vercel. Keep all three in sync when changing public URL or webhook-related keys.

### Verification
- `npm run deploy:preflight`
- Confirm the next Vercel deployment for `meridian-nextjs-live` succeeds (it should now build from commit `2040a07` or later).
- Confirm Render and Vercel both contain the real `STRIPE_WEBHOOK_SECRET`.

---

## Project status

The Meridian v3 Next.js site has been unpacked, repaired, verified, and prepared for deployment.

The main application is located in the [meridian-nextjs](meridian-nextjs) folder.

---

## Completed work

### 1. Workspace and app setup
- Extracted the v3 Next.js archive into the working project folder.
- Confirmed the app structure, dependencies, and environment template.
- Installed project dependencies successfully.

### 2. Codebase fixes
- Repaired homepage JSX issues caused by the imported HTML-to-React conversion.
- Fixed invalid React DOM attributes and JSX comments.
- Corrected pricing page type mismatches.
- Cleaned Stripe helper conflicts and webhook issues.
- Added the missing site icon asset.

### 3. Local runtime verification
- Verified the following routes respond correctly:
  - home page
  - services hub
  - London borough pages
  - sitemap.xml
  - robots.txt
- Confirmed the local app runs successfully.

### 4. API and form behavior
- Fixed audit and lead endpoints for local demo use.
- Added safe fallback handling when Neon and Upstash credentials are still placeholders.
- Verified both endpoints now return successful responses locally.

### 5. Stripe and deployment readiness
- Corrected Stripe environment variable naming.
- Added Stripe setup automation script.
- Added environment validation script.
- Added deployment quickstart documentation for Vercel and production rollout.
- Improved Stripe checkout and webhook handling for production readiness.

### 6. Quality checks completed
The following have been run and verified successfully:
- TypeScript check
- ESLint check
- Production build

---

## Files added

- [DEPLOYMENT.md](DEPLOYMENT.md)
- [HANDOVER.md](HANDOVER.md)
- [scripts/check-env.mjs](scripts/check-env.mjs)
- [scripts/setup-stripe.mjs](scripts/setup-stripe.mjs)
- [public/icon.svg](public/icon.svg)

---

## Important notes for the next developer

### Still required before live deployment
Real production values must still be added to [.env.local](.env.local) and in Vercel for:
- Neon database
- Upstash Redis
- Resend
- Stripe
- final production domain

### Recommended next steps
1. Fill in the real environment variables.
2. Run the preflight check:
   - npm run deploy:preflight
3. Bootstrap Stripe products and prices:
   - npm run stripe:setup
4. Deploy to Vercel.
5. Connect the custom domain and verify the Stripe webhook endpoint.

---

## Final verified state

At handover time, the project is in a **working and buildable state**.

Verified command result:
- npm run typecheck; npm run lint; npm run build → **exit code 0**

---

### 7. Phase 2 — Rich borough landing pages (2026-04-16)
- Rebuilt all 44 `/london/[borough]` pages to match the service-page design language (matching `meridian-app-development-v3.html` style).
- Design uses centered hero with `.service-hero`, stats strip, icon-card services grid, 4-step methodology timeline, pricing teaser card, mini case study with stats, 6 borough-specific FAQs with JSON-LD, nearby boroughs internal linking, final CTA with dual buttons.
- Added all service-page CSS classes to `globals.css`: `.service-hero`, `.trust-pill`, `.includes-section/.include-card`, `.method-section/.method-step`, `.stats-strip/.stat-block`, `.pricing-teaser`, `.tier-row`, `.case-mini`, `.platform-row/.platform-card`.
- Created `BoroughClient.tsx` — extracted client component for reveal-on-scroll and theme toggle.
- Created `CLAUDE.md` with mandatory design parity rules.
- Industry grid uses `.platform-card` with emoji icons per sector.
- Added full pricing section with real data from `lib/pricing.ts` — retainer cards (SEO, PPC, Social, Content Growth tiers) + one-off project cards (Web Pro, App MVP, Branding Full, Business Plan Visa), all showing 40%-below-market pricing with Stripe checkout links via `/pricing?service=X`.
- Added long-tail keyword service list section — 26 "[service] in [borough]" terms per page for SEO coverage (e.g. "Logo Design in Shoreditch", "Business Plan in Shoreditch").
- Light theme is the default (set in layout.tsx FOUC-prevention script).
- Verified: `typecheck` pass, `lint` pass.

### 8. Service × borough matrix pages (2026-04-16)
- Created `/services/[slug]/[borough]` route — 7 services × 44 boroughs = **308 long-tail landing pages**.
- Each page targets "[service] [borough]" keywords (KD 15–35): e.g. "seo agency shoreditch", "web design mayfair".
- Design matches service-page style: centered hero, stats strip, "what's included" grid, pricing card with Stripe link, FAQ, borough cross-links, service cross-links, final CTA.
- Pricing pulls from `lib/pricing.ts` — shows the popular retainer or project tier with 40% savings vs market.
- All pages generated as static HTML via `generateStaticParams`.

### 9. Blog infrastructure (2026-04-16)
- Created blog data layer at `lib/blog.ts` — simple file-based approach (no CMS dependency).
- Blog index at `/blog` — card grid showing all posts with category, date, read time.
- Individual post pages at `/blog/[slug]` — Article schema JSON-LD, breadcrumbs, related posts.
- Added `.blog-content` CSS for article typography (h2, h3, p, ul, ol, a styles).
- Published 5 launch articles targeting high-value question keywords:
  1. "How Much Does an SEO Agency in London Cost in 2026?" → targets "seo agency london cost"
  2. "How to Choose a London PPC Agency in 2026" → targets "how to choose ppc agency"
  3. "Web Design London Cost Guide 2026" → targets "web design cost london"
  4. "Innovator Founder Visa Business Plan Guide 2026" → targets "innovator founder visa business plan"
  5. "What is GEO and AEO? The Future of SEO in 2026" → targets "what is geo seo", "answer engine optimisation"

### 10. Sitemap expansion (2026-04-16)
- Updated `app/sitemap.ts` to include all new routes: 308 service×borough pages, 5 blog posts, `/blog` index.
- Total sitemap URLs: ~370+ (was ~52).

### Files added
- [CLAUDE.md](CLAUDE.md)
- [app/london/[borough]/BoroughClient.tsx](app/london/[borough]/BoroughClient.tsx)
- [app/services/[slug]/[borough]/page.tsx](app/services/[slug]/[borough]/page.tsx) — 308 matrix pages
- [lib/blog.ts](lib/blog.ts) — blog data layer with 5 articles
- [app/blog/page.tsx](app/blog/page.tsx) — blog index
- [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx) — individual post pages

### Files modified
- [app/london/[borough]/page.tsx](app/london/[borough]/page.tsx) — service-page design + pricing + keyword list
- [app/globals.css](app/globals.css) — service-page CSS + blog content CSS
- [app/sitemap.ts](app/sitemap.ts) — expanded to 370+ URLs
- [HANDOVER.md](HANDOVER.md) — updated with all Phase 2 work

### 11. Massive SEO page expansion (2026-04-16)

Expanded the site from ~375 pages to **1,410+ pages** targeting every keyword vertical from the London SEO keyword planner.

#### 4 new service verticals added to lib/services.ts
- **Copywriting & Content Marketing** (`/services/copywriting-london`) — targeting 4,260 MSV
- **Email Marketing & CRM** (`/services/email-marketing-london`) — targeting 2,270 MSV
- **Video Production & Animation** (`/services/video-production-london`) — targeting 7,000 MSV
- **eCommerce Development** (`/services/ecommerce-london`) — targeting 2,840 MSV

Each auto-generates 44 service×borough pages via existing template. New service×borough total: 11 × 44 = **484 pages** (was 308).

#### 15 industry vertical pages (`lib/industries.ts`)
- Fintech, Healthcare, SaaS, eCommerce, Property, Hospitality, Legal, Education, Startups, Professional Services, Fashion & Retail, Food & Beverage, Construction, Automotive, Beauty & Wellness
- **15 industry hub pages** at `/industries/[industry]` — targeting "[industry] marketing agency london"
- **165 industry × service pages** at `/industries/[industry]/[service]` — targeting "fintech seo agency london", "healthcare app developer london", etc.
- **660 industry × borough pages** at `/industries/[industry]/[borough]` — targeting "fintech agency shoreditch", "saas marketing canary wharf", etc.

#### 15 platform/technology pages (`lib/platforms.ts`)
- Shopify, WordPress, Webflow, Flutter, React Native, HubSpot, Klaviyo, Salesforce, Next.js, Squarespace, WooCommerce, Figma, iOS/Swift, Android/Kotlin, Magento
- Each targets platform-specific buyer keywords (KD 18–40): "shopify expert london", "webflow designer london", "klaviyo agency london"

#### Sitemap expansion
- Total sitemap URLs: **1,410+** (was ~375)
- All pages include: JSON-LD schema (FAQ, Service, BreadcrumbList), unique metadata, internal cross-linking

#### Files added
- `lib/industries.ts` — 15 industry verticals with rich SEO data
- `lib/platforms.ts` — 15 platform/technology entries
- `app/industries/[industry]/page.tsx` — industry hub template
- `app/industries/[industry]/[service]/page.tsx` — industry×service matrix
- `app/industries/[industry]/[borough]/page.tsx` — industry×borough matrix
- `app/platforms/[platform]/page.tsx` — platform page template

#### Files modified
- `lib/services.ts` — added 4 new service verticals (copywriting, email-marketing, video-production, ecommerce)
- `lib/pricing.ts` — added SERVICES_META for new services
- `app/services/[slug]/[borough]/page.tsx` — updated pricing slug map for new services
- `app/sitemap.ts` — expanded to 1,410+ URLs with industry and platform routes
- `HANDOVER.md` — updated with expansion work

---

## Next phases

### Phase 1 — Production Go-Live (Target: Week 1)

Priority: Get the site live with real credentials and verify end-to-end.

1. **Environment wiring** — Fill in real production values for Neon, Upstash, Resend, Stripe, and the production domain in `.env.local` and Vercel environment settings.
2. **Domain & DNS** — Register/connect the production domain via Cloudflare. Set up SSL, SPF, DKIM, DMARC for email deliverability.
3. **Stripe bootstrap** — Run `npm run stripe:setup` with the live Stripe secret key. Create all products/prices in live mode. Configure the production webhook endpoint.
4. **Deploy to Vercel** — Run `npm run deploy:preflight`, then deploy. Verify all routes render, sitemap returns valid XML, and the audit form submits correctly.
5. **Google integrations** — Submit sitemap to Google Search Console, set up Google Business Profile, verify structured data with Rich Results Test.
6. **Smoke test** — Full end-to-end test: homepage, each nav page, audit form submission, Stripe checkout flow (test charge + refund), email delivery, mobile responsiveness in both themes.

### Phase 2 — Content & SEO Foundation (Target: Weeks 2–4)

Priority: Build the content base that drives organic traffic and AI citations.

1. **Homepage refactor** — Split `app/page.tsx` into idiomatic React components per `CODEX.md` section 3 (Header, Hero, AuditForm, ServicesBento, etc.). **Maintain 100% design parity** — see `CLAUDE.md`.
2. **Borough landing pages** — Build out 10 high-priority borough pages using the template patterns from the SEO keyword planner (Shoreditch, Canary Wharf, Croydon, Camden, Hackney, Islington, Clapham, Richmond, Mayfair, Stratford).
3. **Service × borough matrix** — Implement programmatic `/services/[slug]/[borough]` routes generating ~308 long-tail landing pages.
4. **Blog infrastructure** — Add `/blog` route with MDX or a headless CMS (Contentlayer/Sanity). Publish the first 5 articles targeting question keywords (see `CODEX.md` section 6).
5. **Replace mock content** — Swap placeholder reviews (Sarah Chen, James Okafor, etc.) with real client testimonials. Replace "Stack Capital" SERP mockup with a real case study. Add real business plan service images.
6. **Google Business Profile** — Upload 25+ photos, set service categories, solicit first 10 reviews from existing clients.

### Phase 3 — Conversion Optimisation & CRM (Target: Weeks 5–8)

Priority: Turn traffic into qualified leads and paying customers.

1. **Authentication** — Add auth (Clerk, Auth.js, or Supabase Auth) to gate the `/account` page and Stripe customer portal.
2. **Audit pipeline** — Wire the real SEO audit: PageSpeed Insights API + URL parsing (cheerio) + scoring rubric + PDF generation (@react-pdf/renderer) + email delivery via Resend. Use Inngest or QStash for async processing.
3. **CRM integration** — Connect lead capture to HubSpot or Salesforce (or a lightweight alternative). Add Slack notifications for new leads.
4. **A/B testing** — Set up Vercel Edge Config for testing hero copy, CTA buttons, pricing page layouts.
5. **Lead magnets** — Create downloadable resources ("London SEO Playbook 2026 PDF", "App Development Cost Calculator") to capture email addresses.
6. **Cookie consent** — Add CookieBot or a self-hosted solution if running GA4.
7. **Legal pages** — Build `/privacy`, `/terms`, `/cookies` — required for UK GDPR compliance.

### Phase 4 — Scale & Expand (Target: Months 3–6)

Priority: Compound organic growth and expand geographic/vertical coverage.

1. **City expansion** — Localised versions for Manchester, Edinburgh, Birmingham, Bristol (`/[city]/[borough]` pattern).
2. **Industry verticals** — Dedicated landing pages for fintech, healthcare, SaaS, eCommerce, property (`/industries/[vertical]`).
3. **Case study CMS** — Rich case study pages with before/after metrics, client logos, and `CaseStudy` schema markup.
4. **Live chat** — Add Intercom or Crisp for real-time lead engagement.
5. **Partner programme** — Build a `/partners` page with structured data.
6. **Careers** — `/careers` page with `JobPosting` schema.
7. **Retargeting** — Set up paid social retargeting to website visitors.
8. **Quarterly content refresh** — Update all date-stamped articles, refresh statistics, re-submit updated pages to GSC.

---

## Ownership note

This handover was prepared by **Codex** and updated by **Claude** to summarize the implementation and verification work completed, along with the phased roadmap for ongoing development.
