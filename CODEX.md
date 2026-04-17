# CODEX.md — Implementation Handoff

This document is the complete instruction set for an AI coding agent (or any developer) to set up, finish, and deploy the Meridian London site.

The repository ships **complete enough to deploy** — the homepage, service pages, borough pages, API routes, and all infrastructure are in place. This document tells you how to (a) run it locally, (b) wire up the third-party services, (c) refactor the auto-ported homepage into idiomatic React components if you want to, and (d) ship to production.

**Time to deploy: ~2 hours of focused work.**

---

## 0. Pre-flight checklist

Before writing any code, create accounts on:

- [ ] **GitHub** — repo hosting
- [ ] **Vercel** — hosting + edge deploy ([vercel.com](https://vercel.com))
- [ ] **Neon** — serverless Postgres ([neon.tech](https://neon.tech), free tier)
- [ ] **Upstash** — serverless Redis for rate limiting ([upstash.com](https://upstash.com), free tier)
- [ ] **Resend** — transactional email ([resend.com](https://resend.com), 3k/month free)
- [ ] **Cloudflare** — DNS + CDN ([cloudflare.com](https://cloudflare.com), free)
- [ ] **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console))
- [ ] **Google Business Profile** for the London address ([business.google.com](https://business.google.com))
- [ ] **Google PageSpeed Insights API key** ([console.cloud.google.com](https://console.cloud.google.com))

You'll also need a domain. `meridian.london` is used as the placeholder throughout; replace with yours before deploying.

---

## 1. Local setup

```bash
# Clone or extract this repo
cd meridian-nextjs

# Node 20.18+ required (use nvm if needed: nvm use 20)
node --version

# Install deps
npm install

# Copy environment template
cp .env.example .env.local
```

**Edit `.env.local`** with values from the services you signed up for above. Critical ones:

```bash
NEXT_PUBLIC_SITE_URL=https://meridian.london   # your domain
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=audits@yourdomain.com
DATABASE_URL=postgresql://...                  # from Neon
UPSTASH_REDIS_REST_URL=https://...upstash.io   # from Upstash
UPSTASH_REDIS_REST_TOKEN=...
```

Then push the database schema and start the dev server:

```bash
npm run db:push      # creates `leads` and `audit_jobs` tables in Neon
npm run dev          # http://localhost:3000
```

Verify:
- [ ] Homepage renders at `http://localhost:3000`
- [ ] `/services/seo-london` renders
- [ ] `/london/shoreditch` renders
- [ ] `/sitemap.xml` returns valid XML with 52 URLs
- [ ] `/robots.txt` returns and includes `GPTBot`, `ClaudeBot` etc.
- [ ] `/llms.txt` returns and is rich content
- [ ] Submit the audit form → should `console.log` lead in Neon studio (`npm run db:studio`)

---

## 2. Critical setup steps

### 2.1 Resend domain verification

The `/api/audit` endpoint sends emails. These will silently fail until your sending domain is verified.

1. In Resend dashboard, click **Domains** → **Add Domain**
2. Enter `meridian.london` (or yours)
3. Resend gives you 3 DNS records (SPF, DKIM, MX for bounces) — add them in Cloudflare
4. Wait 5 minutes, then click **Verify**
5. Create an API key with `Send` scope only — paste in `.env.local` as `RESEND_API_KEY`

### 2.2 Neon database migrations

```bash
npm run db:push
```

This applies the schema in `lib/db.ts`. To inspect data:

```bash
npm run db:studio
```

For production, run `db:push` once after deploying — Vercel will pick up `DATABASE_URL` from env.

### 2.3 Cloudflare DNS

In Cloudflare dashboard for `meridian.london`:
1. Set nameservers to Cloudflare's
2. Add A/AAAA records pointing to Vercel (Vercel will provide values when you add the domain)
3. Add SPF/DKIM/MX records from Resend
4. **Enable Always Use HTTPS** under SSL/TLS
5. Set SSL mode to **Full (strict)**
6. Enable **Brotli compression**, **HTTP/3**, **0-RTT Connection Resumption**

### 2.4 Vercel deployment

```bash
npx vercel link                 # one-time: connect repo to Vercel project
npx vercel env pull .env.local  # syncs env vars from Vercel
npx vercel --prod               # ship it
```

After first deploy:
- Add custom domain in Vercel dashboard
- Enable **Speed Insights** (free tier: unlimited)
- Enable **Web Analytics** (privacy-friendly, no cookie banner needed)
- Enable **Image Optimization** (default on)

---

## 3. Refactoring the homepage (optional but recommended)

`app/page.tsx` is an auto-port of the static HTML demo — it works, but it's a single 50KB file with everything in one component. The cleaner architecture is to split into client components.

**Suggested refactor** (~1 day of work):

```
components/
├── Header.tsx              # Glass nav (lines 1–50 of current page.tsx)
├── Hero.tsx                # Hero section with floating glass cards
├── AuditForm.tsx           # 'use client' — the SEO audit form with state
├── ServicesBento.tsx       # The 7-card bento grid (use SERVICES from lib)
├── WhyLondon.tsx           # The 4 stat cards
├── BoroughGrid.tsx         # Borough chips (use BOROUGHS from lib)
├── KeywordTabs.tsx         # 'use client' — tabbed keyword intelligence
├── Process.tsx             # 4-step process cards
├── FAQ.tsx                 # Accordion FAQ
├── FinalCTA.tsx            # Bottom email-capture card
├── Footer.tsx              # Site footer
└── MobileCTA.tsx           # Sticky mobile bottom CTA
```

Pattern for each component:

```tsx
// components/Hero.tsx
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-text">
            <span className="eyebrow">London's #1 rated digital studio</span>
            <h1 className="hero-title">
              London's <span className="accent">performance</span> engine for serious brands.
            </h1>
            {/* ...rest of hero content */}
          </div>
          <div className="hero-visual">
            <div className="hero-img-wrap">
              <Image
                src="/img/digital-marketing-team-1920w.webp"
                alt="London digital marketing agency team strategy session"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

Then `app/page.tsx` becomes:

```tsx
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { AuditForm } from '@/components/AuditForm';
// ...etc

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <AuditForm />
      <ServicesBento />
      <WhyLondon />
      <BoroughGrid />
      <KeywordTabs />
      <Process />
      <FAQ />
      <FinalCTA />
      <Footer />
      <MobileCTA />
    </>
  );
}
```

Most components stay server components (RSC). Only `AuditForm` and `KeywordTabs` need `'use client'` because they manage state.

**Important:** keep all the existing CSS class names. The design system in `globals.css` is keyed off them.

---

## 4. Wiring the actual audit pipeline

Right now `/api/audit` validates input, captures the lead, and sends a confirmation email — but it doesn't actually run an audit. The TODO in the file marks where to add it.

**Recommended approach:**

```bash
npm install inngest @react-pdf/renderer
```

Create `lib/audit-pipeline.ts`:

```ts
// 1. Fetch PageSpeed Insights for both mobile + desktop
// 2. Fetch the URL itself, parse with cheerio for:
//    - Schema.org markup count and types
//    - Heading structure
//    - Meta tags
//    - Image alt text coverage
//    - Internal/external link counts
// 3. Optional: Ahrefs/SEMrush API for keyword and backlink data
// 4. Score against a rubric (0-100 across 12 dimensions)
// 5. Render PDF via @react-pdf/renderer
// 6. Email PDF as attachment via Resend
```

Use **Inngest** to run this asynchronously so the API responds in <200ms while the audit runs in the background. Or **QStash** if you prefer Upstash.

The `audit_jobs` table is already set up to track these jobs.

---

## 5. SEO/GEO/AEO setup (mission-critical)

**See the dedicated `SEO-GEO-AEO.md` for the full playbook.** Short version:

### Day 1 after deploy
- [ ] Submit `meridian.london/sitemap.xml` to Google Search Console
- [ ] Verify domain ownership in GSC via DNS TXT record
- [ ] Submit to Bing Webmaster Tools too
- [ ] Set up Google Business Profile for the London address
- [ ] Verify `https://meridian.london/llms.txt` is reachable
- [ ] Test the homepage with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Confirm all schema validates with no errors

### Week 1
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on each top-level page; fix anything below 90 mobile
- [ ] Set up Google Business Profile categories: "Marketing agency", "Internet marketing service", "Website designer", "Software company"
- [ ] Upload 25+ photos to GBP
- [ ] Request first 10 reviews from existing clients
- [ ] Build out additional 10 service-borough combination pages for highest-volume queries

---

## 6. Content strategy (post-launch)

The site ships with strong programmatic SEO coverage but needs **editorial content** to rank for informational/AI Overview queries.

**First 30 days, ship these articles** (one per service, ~2,000 words each):

1. "How much does an SEO agency in London cost in 2026?" (target: "how much do seo agencies charge london")
2. "How to choose a London PPC agency" (target: "how to choose ppc agency uk")
3. "Web design London cost guide" (target: "web design cost london", "how much does a website cost")
4. "How to find an app developer in London" (target: "how to find an app developer")
5. "Innovator Founder visa business plan: complete 2026 guide" (target: "innovator founder visa business plan")
6. "Digital marketing for London startups: the 2026 playbook" (target: "digital marketing london startup")
7. "What is GEO and AEO?" (target: "what is geo seo", "answer engine optimisation")

Each article should:
- Lead with the answer in the first 50 words (AEO requirement)
- Include FAQPage schema
- Cite primary sources (.gov.uk, ONS, Ahrefs/SEMrush studies)
- Be date-stamped and updated quarterly
- Internally link to relevant service and borough pages

Add a `/blog` route once you have 5+ articles.

---

## 7. Production hardening checklist

Before going live:

- [ ] Replace `meridian.london` with your domain everywhere (search & replace)
- [ ] Replace placeholder address `1 Finsbury Avenue, EC2M 2PF` with real address
- [ ] Replace placeholder phone `+44-20-XXXX-XXXX` with real
- [ ] Replace `Company No. 09876543` with real Companies House number
- [ ] Add real OG image at `/public/og.png` (1200×630)
- [ ] Add real favicon, apple-icon, manifest
- [ ] Update `lib/schema.ts` with real geo coordinates (use [latlong.net](https://www.latlong.net/))
- [ ] Update `aggregateRating` only if you have real reviews
- [ ] Add Cookie banner if running GA4 (Plausible doesn't need one)
- [ ] Add `/privacy`, `/terms`, `/cookies` pages — required for UK GDPR
- [ ] Test all forms end-to-end with real email delivery
- [ ] Verify rate limiting works (try 6 submissions in an hour from same email)
- [ ] Run `npm run typecheck` and `npm run lint` — must pass
- [ ] Run Lighthouse on production URL — target 95+ on all four categories

---

## 8. Common pitfalls

**`'aspect-ratio' is collapsing my hero image to 0×0`** — the parent grid item needs explicit `width: 100%`. Already fixed in the current `globals.css`, but watch for it if you refactor.

**`<picture>` element collapses inside absolute-positioned wrapper** — `<picture>` is `display: inline` by default. The current CSS has `picture { display: block }` and explicit positioning rules for `.hero-img-wrap picture` and `.bento-card picture`. Don't remove these.

**Tailwind v4 breaking changes** — v4 uses `@theme` directive, no `tailwind.config.js`. The global CSS uses `@import "tailwindcss"` at the top.

**Resend email goes to spam** — make sure SPF, DKIM, DMARC are all set up in Cloudflare. Check at [mail-tester.com](https://mail-tester.com) — aim for 10/10.

**Schema not appearing in Search Console** — give Google 2–4 weeks to crawl and index. You can speed this up by submitting individual URLs in GSC's URL Inspection tool.

**Borough pages don't render** — `generateStaticParams` runs at build time. If you add a borough to `lib/boroughs.ts`, you need to redeploy.

---

## 9. What to build next (after launch)

**Month 2:**
- Programmatic `[service]/[borough]` matrix → 308 long-tail pages
- Case study CMS (use Contentlayer or Sanity)
- Blog with 5+ articles
- Lead-magnet downloads (e.g. "London SEO Playbook 2026 PDF")

**Month 3:**
- A/B testing framework (Vercel Edge Config)
- HubSpot or Salesforce CRM integration (in `notifySlackOfLead`'s sibling spot)
- Live chat (Intercom or Crisp)
- Cookie consent (CookieBot or self-hosted)

**Month 6:**
- Localised versions for other UK cities (`/manchester`, `/edinburgh`, etc.)
- Industry-specific landing pages (`/industries/fintech`, `/industries/healthcare`)
- Partner programme page
- Careers page with structured data (`JobPosting` schema)

---

## 10. Support contacts

- **Codebase questions**: re-read this file and `SEO-GEO-AEO.md`
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel deployment**: [vercel.com/docs](https://vercel.com/docs)
- **Resend**: [resend.com/docs](https://resend.com/docs)
- **Drizzle**: [orm.drizzle.team](https://orm.drizzle.team)
- **Tailwind v4**: [tailwindcss.com/docs/v4-beta](https://tailwindcss.com/docs/v4-beta)

---

**End of CODEX.md.** Build well, ship fast, measure ruthlessly.


---

## 11. v2 design changes (April 2026 update)

This codebase ships with a **light theme as default** + **dark mode toggle**, plus two new sections that replace the earlier keyword-intelligence and process sections.

### What changed

**Theme system** — `app/globals.css` defines design tokens twice:
- `:root { ... }` = light theme tokens (default — no markup needed)
- `[data-theme="dark"] { ... }` = dark theme override

The toggle button in the header (`#themeToggle`) flips `document.documentElement[data-theme]` and persists the choice to `localStorage`. A FOUC-prevention script in `app/layout.tsx`'s `<head>` reads this before paint, also honouring `prefers-color-scheme: dark` for first-time visitors.

**4.9★ rating block** — sits directly under the hero CTA buttons. Five gold star SVGs + "**4.9** from **127 reviews**" + "Google · Clutch · Trustpilot" source attribution. Update the count and source when you add/remove integrations.

**Reviews section** (replaces Keywords) — `id="reviews"` — six review cards with verified-source badges, named author, role, borough. Aggregate rating summary card at the top showing "4.9 / 5 from 127 verified reviews" with platform logos.

**"Page 1 of Google" section** (replaces Process) — `id="page1"` — split layout: stats and headline on one side, a stylised SERP mockup on the other showing a Meridian client at position #1, with a "ranking jump" callout (Position #47 → #1 in 5 months).

### When you replace mock content with real data

- Update the six review-card quotes/names in `app/page.tsx` with real Google/Trustpilot review URLs as `<a>` source links
- Update the SERP mockup with your highest-converting case study client (currently shows "Stack Capital" as a placeholder)
- Update the "127 reviews" count in three places: hero rating block, reviews summary card, schema (`lib/schema.ts:organizationSchema()`)
- Update `aggregateRating.reviewCount` in `lib/schema.ts` to match

### Schema for reviews (don't forget)

The `Organization` schema in `lib/schema.ts` already includes `aggregateRating`. For per-review schema (rich-results-eligible review snippets), add `Review` schema entries:

```ts
// In lib/schema.ts
export function reviewSchema(reviews: Array<{author:string, rating:number, text:string, date:string}>) {
  return reviews.map(r => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "reviewRating": {"@type": "Rating", "ratingValue": r.rating, "bestRating": 5},
    "author": {"@type": "Person", "name": r.author},
    "datePublished": r.date,
    "reviewBody": r.text,
    "itemReviewed": {"@id": `${SITE_URL}/#organization`}
  }));
}
```

Inject into the homepage via `<script type="application/ld+json" />`.


---

## 12. Stripe payments setup (v3 update)

The codebase ships with full Stripe integration: subscriptions, one-off payments, customer portal, webhooks. Set-up is ~30 minutes once you have a Stripe account.

### 12.1 Pricing strategy

Meridian pricing is set **40% below London market average** for every retainer and project tier. Three billing options for retainers:

- **Pay-as-you-go** — Monthly billing, no commitment, cancel any time (highest unit price)
- **Monthly subscription** — Monthly billing, 6-month minimum, ~10% off PAYG (we don't *enforce* the 6-month minimum in code; it's a marketing commitment, but you could enforce by tracking via webhook in the `subscriptions` table)
- **Annual** — Billed once a year, **17% off** (pay 10 months, get 12)

Project services are one-off fixed-price payments.

All pricing data lives in `lib/pricing.ts` — single source of truth, used by the pricing page, the comparison table, schema markup, and the Stripe checkout call.

### 12.2 Stripe account setup

1. Sign up at [stripe.com](https://stripe.com), complete account verification (UK Limited company)
2. Enable test mode (top right toggle) for local development
3. Get your keys from [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys):
   - `STRIPE_SECRET_KEY` (starts `sk_test_…`)
   - `STRIPE_PUBLISHABLE_KEY` (starts `pk_test_…`)
4. Enable **Stripe Tax** if you want automatic VAT calculation (recommended for UK)
5. Enable **Customer Portal** at [dashboard.stripe.com/settings/billing/portal](https://dashboard.stripe.com/settings/billing/portal) — set features (cancel, swap plan, update payment method, update billing details)

### 12.3 Create products and prices in Stripe

You need one Stripe **Product** per service tier, and one **Price** per (tier × billing period).

The codebase expects these env-named price IDs (see `.env.example` for the full list of 40+ price IDs):

```
STRIPE_PRICE_SEO_GROWTH_PAYG=price_xxx
STRIPE_PRICE_SEO_GROWTH_MONTHLY=price_xxx
STRIPE_PRICE_SEO_GROWTH_ANNUAL=price_xxx
... (×40 more)
```

**Faster way: use the Stripe CLI to create them programmatically.** Sketch:

```bash
# Create a product
stripe products create --name="Meridian SEO Growth"

# Create the three prices for that product (PAYG, monthly, annual)
stripe prices create \
  --product=prod_xxx \
  --currency=gbp \
  --unit-amount=149000 \
  --recurring[interval]=month \
  --lookup-key=seo-growth-payg

stripe prices create \
  --product=prod_xxx \
  --currency=gbp \
  --unit-amount=134000 \
  --recurring[interval]=month \
  --lookup-key=seo-growth-monthly

stripe prices create \
  --product=prod_xxx \
  --currency=gbp \
  --unit-amount=1490000 \
  --recurring[interval]=year \
  --lookup-key=seo-growth-annual
```

For 40+ prices, write `scripts/setup-stripe.mjs` that loops through `RETAINERS` and `PROJECTS` from `lib/pricing.ts`, creates the product+prices via Stripe SDK, and writes the IDs back to `.env.local`. ~80 lines of code.

### 12.4 Webhook setup

The webhook handler is at `/api/stripe/webhook`. It verifies the signature, syncs `checkout.session.completed`, `customer.subscription.*`, and `invoice.payment_*` events into the `leads`, `subscriptions`, and `payments` tables.

**Local testing:**

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:3000/api/stripe/webhook
# Copy the whsec_... it prints into .env.local as STRIPE_WEBHOOK_SECRET

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.created
```

**Production webhook:**

1. In Stripe dashboard → [Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://meridian.london/api/stripe/webhook`
3. Subscribe to these events (minimum):
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the signing secret (starts `whsec_…`) into Vercel env as `STRIPE_WEBHOOK_SECRET`

### 12.5 Customer portal

Subscribers can manage their subscription themselves at `/account` (you'll need to build that page — it should:
1. Authenticate the user
2. Look up their `stripe_customer_id` from `subscriptions` table
3. POST to `/api/stripe/portal` with the customer ID
4. Redirect to the returned URL

### 12.6 Pre-launch checklist

- [ ] Switch from test mode to live mode in Stripe dashboard
- [ ] Replace test keys with live keys (`sk_live_…` / `pk_live_…`) in Vercel env
- [ ] Recreate all Products and Prices in live mode (test-mode IDs don't work in live)
- [ ] Re-set webhook endpoint with live `whsec_…`
- [ ] Enable Stripe Tax for VAT
- [ ] Add a Cookie consent banner if you're using GA4 (Stripe sets a few cookies too)
- [ ] Test a real £1 charge end-to-end before going live with full pricing
- [ ] Update Terms of Service to reference subscription terms (auto-renewal, cancellation policy)

### 12.7 Files added in v3

- `lib/pricing.ts` — single-source-of-truth pricing matrix
- `lib/stripe.ts` — Stripe client + checkout + portal helpers
- `app/api/stripe/checkout/route.ts` — POST creates checkout session, returns URL
- `app/api/stripe/portal/route.ts` — POST opens customer portal, returns URL
- `app/api/stripe/webhook/route.ts` — handles signed events from Stripe
- `app/pricing/page.tsx` — full pricing page with toggle, tabs, comparison
- `app/checkout/success/page.tsx` — post-purchase confirmation
- `app/services/page.tsx` — services hub
- `app/london/page.tsx` — London hub with all 44 boroughs grouped by zone
- `app/about/page.tsx` — about us
- `app/contact/page.tsx` — contact + form posting to /api/leads
- `lib/db.ts` — added `subscriptions` and `payments` tables (run `npm run db:push`)

### 12.8 Common Stripe pitfalls

- **Forgetting to read raw body in webhook** — using `req.json()` instead of `req.text()` in the webhook route breaks signature verification. The current implementation uses `req.text()` correctly; don't change it.
- **Test/live mode mix-ups** — products and prices created in test mode have IDs starting `prod_…` / `price_…` but they don't work in live mode. You must recreate them in live.
- **VAT confusion** — Stripe Tax handles this automatically *if enabled*. Otherwise you're responsible for collecting and remitting VAT on UK sales.
- **Webhook timeouts** — Stripe expects a 200 response within 5 seconds. Heavy work (sending emails, generating PDFs) should be queued, not done inline. The current handler is light.
- **Duplicate event handling** — Stripe retries failed webhooks. Use `event.id` to dedupe if you do anything non-idempotent in your handler.

---

## 12. v3 — secondary pages + Stripe pricing system

### New pages (six top-nav routes added)

| Route | Source | Server / Client | Notes |
|---|---|---|---|
| `/services` | `app/services/page.tsx` | Server | Hub for all 7 services. Cards link to `/services/[slug]`. |
| `/pricing` | `app/pricing/page.tsx` | Server (toggle is client) | Three retainer tiers × three billing cycles + PAYG project grid. |
| `/audit` | `app/audit/page.tsx` + `AuditForm.tsx` | Server + client island | The form is a client component; the rest is SSR for SEO. |
| `/reviews` | `app/reviews/page.tsx` | Server | Featured case study + verified review grid. |
| `/results` | `app/results/page.tsx` | Server | Stat grid + Page-1-of-Google SERP visual. |
| `/london` | `app/london/page.tsx` | Server | Featured boroughs + chip grid for all 44 areas. |
| `/faq` | `app/faq/page.tsx` | Server | Grouped FAQs with `faqSchema()` JSON-LD injection. |
| `/contact` | `app/contact/page.tsx` | Server | Three-card layout: audit, email, phone. |
| `/about` | `app/about/page.tsx` | Server | Story, values, credentials. |

The HTML demo in `/site_demo/` mirrors all of these as standalone HTML files (`pricing.html`, `services.html`, etc.) sharing one `styles.css`. Open `index.html` in any browser to navigate the demo without a dev server.

### Pricing logic — 40% below London market average

The single source of truth is `lib/pricing.ts`:

```ts
export const RETAINER_SAVINGS_VS_MARKET_PCT = 40;
export const ANNUAL_DISCOUNT_PCT = 17;   // pay 10 months, get 12
export const MONTHLY_DISCOUNT_PCT = 10;  // 6-month commitment, ~10% off PAYG

export const RETAINERS: Retainer[] = [ /* SEO, PPC, Social, Content × 3 tiers */ ];
export const PROJECTS: Project[] = [ /* Web Design, App Dev, Branding, Business Plan × 3 tiers */ ];
```

Each retainer carries three Stripe price-ID env-var keys (`payg`, `monthly`, `annual`). Each project carries one (`oneoff`). The `resolveStripePriceEnv(productId, productKind, period)` function maps a product selection to the correct env-var name, and `lib/stripe.ts:createCheckoutSession()` looks up the actual price ID at request time.

### Stripe setup (do this before going live)

**1. Create products in Stripe dashboard.** For each retainer, create one Product with three Prices (PAYG monthly, monthly with 6-month commitment, annual). For each project, create one Product with one Price (one-off payment).

**2. Map every Price ID to an env var.** The full list is in `.env.example` — copy into `.env.local` (and Vercel env). Examples:
```
STRIPE_PRICE_SEO_GROWTH_PAYG=price_1Abc...
STRIPE_PRICE_SEO_GROWTH_MONTHLY=price_1Def...
STRIPE_PRICE_SEO_GROWTH_ANNUAL=price_1Ghi...
STRIPE_PRICE_WEB_DESIGN_PRO=price_1Jkl...
```

**3. Add the global Stripe keys:**
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**4. Configure the webhook.** In Stripe dashboard → Developers → Webhooks → Add endpoint:
- URL: `https://meridian.london/api/stripe/webhook`
- Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`

**5. Local testing:**
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
stripe trigger checkout.session.completed
```

**6. Enable Customer Portal.** In Stripe dashboard → Settings → Billing → Customer portal — turn on the features you want customers to self-serve (cancel, swap plans, update card). The `/api/stripe/portal` route already creates portal sessions — wire it up behind your `/account` page once you add auth.

### What's NOT yet built (intentionally — needs your input)

- **Auth.** No login system. The `/account` page referenced in the portal redirect doesn't exist yet. Add Clerk, Auth.js, or Supabase Auth before exposing the portal in production.
- **Real Stripe price IDs.** All env vars are placeholders. Until you create products in Stripe, the checkout endpoint returns `503 Stripe price not configured` — this is intentional (better than a 500).
- **Invoice PDF download.** The webhook receives `invoice.payment_succeeded` but only logs it. If you want branded invoice PDFs, implement them in the webhook handler using `@react-pdf/renderer`.

---

## 13. Top-menu pages — what's where

The site now has dedicated routes for every top-nav item, replacing the earlier
homepage anchors. The HTML demo (`/site_demo/`) and the Next.js app
(`/meridian-nextjs/`) ship with the same set:

| Nav item    | Route       | HTML demo file    | Next.js page                          |
| ----------- | ----------- | ----------------- | ------------------------------------- |
| Services    | `/services` | `services.html`   | `app/services/page.tsx`               |
| Pricing     | `/pricing`  | `pricing.html`    | `app/pricing/page.tsx`                |
| Free Audit  | `/audit`    | `audit.html`      | `app/audit/page.tsx` + `AuditForm.tsx`|
| Reviews     | `/reviews`  | `reviews.html`    | `app/reviews/page.tsx`                |
| London      | `/london`   | `london.html`     | `app/london/page.tsx`                 |
| FAQ         | `/faq`      | `faq.html`        | `app/faq/page.tsx`                    |
| (footer)    | `/results`  | `results.html`    | `app/results/page.tsx`                |
| (footer)    | `/contact`  | `contact.html`    | `app/contact/page.tsx`                |
| (footer)    | `/about`    | —                 | `app/about/page.tsx`                  |

All pages share the same design tokens (`globals.css` for Next.js, `styles.css`
for the demo) — light theme as default, dark mode via the header toggle.

The HTML demo pages link to each other via relative `*.html` filenames so they
work straight off disk without a server. The Next.js routes use clean URLs.

## 14. Pricing & Stripe — operator quickstart

### 14.1 Pricing model (40% below London market)

Defined in `lib/pricing.ts`:

- **Retainers** (subscriptions): `RETAINERS` array. Three tiers per service,
  three billing options each (`payg` monthly, `monthly` 6-month minimum,
  `annual` paid upfront).
- **Annual discount**: `ANNUAL_DISCOUNT_PCT = 17` — the user pays 10 months
  for 12 months of work. Calculated as `monthly × 12 × 0.83 ≈ monthly × 10`.
- **Market savings**: `RETAINER_SAVINGS_VS_MARKET_PCT = 40` — every tier
  carries a `marketAvg` for the comparison table to render.
- **Projects** (one-time payments): `PROJECTS` array — Web Lite/Pro, App MVP,
  Branding Sprint, Business Plan. Same `marketPrice` field for "was/now"
  visualisation.

### 14.2 Stripe setup checklist

```bash
# 1. Install the CLI
brew install stripe/stripe-cli/stripe

# 2. Authenticate
stripe login

# 3. Create products + prices (one product per tier, multiple prices per cycle)
#    Either via Stripe dashboard, or scripted:
node scripts/setup-stripe.mjs   # see §14.4 for the script outline

# 4. Copy each price ID into .env.local matching the env-var keys in lib/pricing.ts
#    (search the file for STRIPE_PRICE_* — there are ~40 of them)

# 5. Set up webhook endpoint locally to test
stripe listen --forward-to localhost:3000/api/stripe/webhook
# Copy the whsec_* secret it prints → .env.local: STRIPE_WEBHOOK_SECRET=whsec_...

# 6. Trigger a test event
stripe trigger checkout.session.completed
```

### 14.3 Required env vars

```
STRIPE_SECRET_KEY=sk_live_...                    # or sk_test_ in dev
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...   # exposed to browser
STRIPE_WEBHOOK_SECRET=whsec_...                  # from `stripe listen` or dashboard
NEXT_PUBLIC_SITE_URL=https://meridian.london     # used for success/cancel URLs

# Then ~40 more for each tier × cycle and each project — see lib/pricing.ts
STRIPE_PRICE_SEO_GROWTH_MONTHLY=price_...
STRIPE_PRICE_SEO_GROWTH_ANNUAL=price_...
STRIPE_PRICE_WEB_PRO=price_...
# etc.
```

### 14.4 The setup-stripe.mjs script (sketch — not yet built)

A ~80-line Node script can read `lib/pricing.ts`, iterate every tier/cycle,
call `stripe.products.create()` + `stripe.prices.create()`, and write the
generated price IDs back into `.env.local`. Skeleton:

```js
import Stripe from 'stripe';
import { RETAINERS, PROJECTS } from '../lib/pricing.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

for (const r of RETAINERS) {
  const product = await stripe.products.create({ name: r.name });
  for (const cycle of ['payg', 'monthly', 'annual']) {
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: r.prices[cycle] * 100,
      currency: 'gbp',
      recurring: { interval: cycle === 'annual' ? 'year' : 'month' },
    });
    appendToEnvFile(r.stripePriceIds[cycle], price.id);
  }
}
```

### 14.5 Customer portal

Wire a `/account` page (auth-gated) that POSTs to `/api/stripe/portal` with
the customer's Stripe customer ID. The portal handles upgrade/downgrade,
card updates, cancellations, and invoice history without you building any UI.

```ts
// In your /account page after auth
const res = await fetch('/api/stripe/portal', {
  method: 'POST',
  body: JSON.stringify({ customerId: session.user.stripeCustomerId })
});
const { url } = await res.json();
window.location.href = url;
```

### 14.6 Pre-launch checklist

- [ ] All ~40 STRIPE_PRICE_* env vars set in Vercel (Production scope)
- [ ] Webhook endpoint added in Stripe dashboard pointing to your live URL
- [ ] Webhook signing secret (`whsec_*` from dashboard, NOT from `stripe listen`)
      copied to STRIPE_WEBHOOK_SECRET in Vercel Production
- [ ] Stripe Tax configured (registrations for UK VAT + any other jurisdictions)
- [ ] Customer Portal configured in dashboard: enable subscription update,
      cancellation policies, invoice history
- [ ] Bank account connected, payouts schedule set
- [ ] Switch from `sk_test_*` to `sk_live_*` and `pk_test_*` to `pk_live_*`
- [ ] First end-to-end checkout test in production with a real card (refund it)

---

## 13. Top-nav pages (April 2026 update — v3)

The top nav now has six dedicated routes (replacing on-page anchors):

| Route | File | Purpose |
|---|---|---|
| `/services` | `app/services/page.tsx` | Hub for all 7 service lines |
| `/pricing` | `app/pricing/page.tsx` | Tier cards + PAYG + comparison + Stripe checkout |
| `/audit` | `app/audit/page.tsx` (+ `AuditForm.tsx`) | Dedicated free-audit landing page |
| `/reviews` | `app/reviews/page.tsx` | Featured case study + 6 verified reviews |
| `/london` | `app/london/page.tsx` | All 32 boroughs + 12 outer areas |
| `/faq` | `app/faq/page.tsx` | Grouped FAQ (pricing / services / working with us) |

Plus two referenced from the homepage:

| Route | File | Purpose |
|---|---|---|
| `/results` | `app/results/page.tsx` | Stats deep-dive + Page-1 SERP visual |
| `/contact` | `app/contact/page.tsx` | 3 contact methods + office card |

**Sitemap.** `app/sitemap.ts` already lists all of these. If you add more top-level pages, add them there too — Next.js doesn't auto-discover.

**Design tokens.** All pages use the same `:root` light tokens / `[data-theme="dark"]` overrides from `app/globals.css`. The page-specific styles (e.g. pricing tier cards, comparison table, review cards) are scoped via class names like `.price-card`, `.payg-card`, `.review-card`, `.borough-feat-card`.

**Animations.** Every section that should reveal on scroll uses `className="reveal"`. The IntersectionObserver lives in the homepage script block; any new page that wants the effect must include the same observer (or you can extract it to a shared `<RevealOnScroll />` client component when you refactor).

### Pages still using mock content

These need real client data before launch:
- `/reviews` — 6 review cards have placeholder names/quotes (Sarah Chen, James Okafor, etc.). Replace with real Google/Trustpilot quotes you have permission to use.
- `/results` & homepage — "Stack Capital" SERP mockup is a placeholder; swap in your highest-converting case study client.
- `/services` (Business Plans card) — uses a placeholder div instead of a real image. Add an image at `public/img/business-plans-{480,768,1200,1920}w.{avif,webp}` and replace the placeholder block in `app/services/page.tsx`.

### Standalone HTML demo

The static HTML demo at `meridian-demo-v3.zip` mirrors the Next.js routes 1:1 as `index.html`, `pricing.html`, `services.html`, `audit.html`, `reviews.html`, `results.html`, `london.html`, `faq.html`, `contact.html` — all sharing `styles.css`. Useful for design reviews and stakeholder sign-off without standing up the Next.js app.
