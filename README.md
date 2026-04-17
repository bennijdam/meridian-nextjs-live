# Meridian — London's Digital Performance Studio

Production Next.js 15 site for a London digital marketing agency. **Light theme by default** with dark-mode toggle (Apple visionOS-inspired glossy aesthetic). Engineered for **SEO**, **GEO** (Generative Engine Optimisation), and **AEO** (Answer Engine Optimisation) — designed to rank in Google's top 3 and earn citations from ChatGPT, Claude, Perplexity, and Google AI Overviews.

> **For implementation guidance, see [`CODEX.md`](./CODEX.md).**
> **For the SEO/GEO/AEO playbook, see [`SEO-GEO-AEO.md`](./SEO-GEO-AEO.md).**
> **For production env wiring, Vercel deploy, and Stripe bootstrap, see [`DEPLOYMENT.md`](./DEPLOYMENT.md).**

---

## What's in the box

```
meridian-nextjs/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, schema, analytics
│   ├── page.tsx                # Homepage (auto-ported from HTML demo)
│   ├── globals.css             # Design system (~26KB)
│   ├── sitemap.ts              # XML sitemap generator
│   ├── robots.ts               # robots.txt with AI crawler permissions
│   ├── api/
│   │   ├── audit/route.ts      # POST /api/audit  – free SEO audit pipeline
│   │   └── leads/route.ts      # POST /api/leads  – generic email capture
│   ├── services/[slug]/        # Programmatic — generates 7 service pages
│   └── london/[borough]/       # Programmatic — generates 44 borough pages
├── components/                 # (Empty — refactor opportunity)
├── lib/
│   ├── boroughs.ts             # All 44 London boroughs with SEO copy
│   ├── services.ts             # 7 services: copy, FAQs, pricing, keywords
│   ├── schema.ts               # JSON-LD generators for SEO/AEO/GEO
│   ├── db.ts                   # Drizzle ORM + Neon serverless Postgres
│   ├── email.ts                # Resend templates (HTML + plain text)
│   └── security.ts             # Zod validation + Upstash rate limiting
├── public/
│   ├── img/                    # 48 AVIF + WebP files at 4 widths each
│   └── llms.txt                # AI crawler guidance file
├── package.json                # Next 15.1, React 19, Tailwind 4, Motion, Resend...
├── next.config.mjs             # AVIF priority, security headers, image caching
├── tsconfig.json               # Strict TypeScript
└── .env.example                # All required environment variables documented
```

## Tech stack (gold-standard 2026)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | RSC by default, Turbopack, Vercel parity |
| Runtime | **React 19** | Latest server components |
| Styling | **Tailwind CSS v4** + custom CSS | Tokens via `@theme`, no config file needed |
| Animations | **Motion** (formerly Framer Motion) | Best React animation library |
| Images | **next/image** + AVIF/WebP | 98.7% payload reduction (52MB → 680KB) |
| Fonts | **Instrument Serif + Geist + Geist Mono** | Distinctive, on Google Fonts, all variable |
| Email | **Resend** | Best DX in 2026, 3k free tier |
| Database | **Neon Postgres** + **Drizzle ORM** | Serverless, branchable, edge-ready |
| Rate limiting | **Upstash Redis** | Edge-compatible, 10k free commands/day |
| Validation | **Zod** | Type-safe, ergonomic |
| Hosting | **Vercel** + Cloudflare in front | Edge runtime + CDN + DDoS |
| Analytics | **Plausible** (privacy-first) or GA4 | Optional |

## Quick start

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env.local
# (Fill in: RESEND_API_KEY, DATABASE_URL, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)

# 3. Push DB schema to Neon
npm run db:push

# 4. Run dev
npm run dev
# → http://localhost:3000
```

## Deploy

```bash
# Vercel (recommended)
npx vercel --prod
```

Then in Vercel dashboard:
1. Add the env vars from `.env.example`
2. Set custom domain
3. Enable Speed Insights + Analytics
4. Add Cloudflare in front for additional caching + DDoS

## Performance baseline

What this codebase ships with, out of the box:

- **LCP** target: < 2.0s (hero image preloaded, AVIF-first)
- **INP** target: < 100ms (RSC by default, minimal client JS)
- **CLS** target: < 0.05 (explicit `width`/`height` on every image)
- **TTFB** target: < 400ms (Vercel Edge + ISR)
- **Initial JS bundle**: < 80KB gzipped
- **Image payload**: AVIF first, ~85% smaller than equivalent JPEGs

## Page count from this codebase

Out of the box, this codebase produces:

- **1** homepage
- **7** service pages (auto-generated from `lib/services.ts`)
- **44** borough pages (auto-generated from `lib/boroughs.ts`)
- = **52 SEO landing pages** at build time, plus the audit/leads API routes.

Add a `[service]/[borough]` matrix later (7 × 44 = 308 pages) for total long-tail dominance.
