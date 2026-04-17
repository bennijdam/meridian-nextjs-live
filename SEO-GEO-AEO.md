# SEO · GEO · AEO Implementation Guide

This document is the playbook for getting Meridian to **page 1 of Google fast** and earning citations in **AI search results** (Google AI Overviews, ChatGPT, Claude, Perplexity).

These three disciplines work together:

- **SEO** = ranking in traditional Google blue links
- **AEO** (Answer Engine Optimisation) = being the "featured" answer in zero-click search
- **GEO** (Generative Engine Optimisation) = being cited by AI assistants when they generate answers

In 2026, ~60% of Google searches end without a click. On AI Overview queries, that figure rises to 80%+. A site that's #1 but not in AI Overviews loses to a site that's #4 and cited everywhere.

This codebase is built to win all three.

---

## 1. SEO foundation (already implemented)

### 1.1 Technical SEO checklist

Built into the codebase:

| Item | Where | Status |
|---|---|---|
| Semantic HTML5 (`<header>`, `<main>`, `<article>`) | `app/page.tsx`, programmatic pages | ✓ |
| Single `<h1>` per page | All page templates | ✓ |
| Hierarchical heading structure | All page templates | ✓ |
| Meta titles + descriptions | `generateMetadata()` in each page | ✓ |
| Canonical URLs | `metadata.alternates.canonical` | ✓ |
| `lang="en-GB"` attribute | `app/layout.tsx` | ✓ |
| robots.txt with AI crawler permissions | `app/robots.ts` | ✓ |
| Auto-generated XML sitemap | `app/sitemap.ts` | ✓ |
| HTTPS-only with HSTS preload | `next.config.mjs` headers | ✓ |
| Image alt text on every image | All `<Image>` and `<img>` tags | ✓ |
| Mobile responsive | `globals.css` media queries | ✓ |
| Open Graph + Twitter Cards | `app/layout.tsx` | ✓ |
| Long-cache versioned static assets | `next.config.mjs` headers | ✓ |
| Structured data (JSON-LD) | `lib/schema.ts` | ✓ |

### 1.2 What you still need to do

- [ ] **Verify domain** in Google Search Console (DNS TXT record)
- [ ] **Submit sitemap** in GSC (`/sitemap.xml`)
- [ ] **Set up Google Business Profile** for the London office
- [ ] **Build backlinks** from London business publications (manual outreach — see §5)
- [ ] **Update content monthly** — Google ranks fresh content higher

---

## 2. Core Web Vitals — get to top 4% of UK websites

Google uses Core Web Vitals as a direct ranking signal. The codebase is built to meet these targets, but you need to verify each page.

### 2.1 Targets

| Metric | Good | What it measures |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | When the biggest visible element finishes loading |
| **INP** (Interaction to Next Paint) | < 200ms | Responsiveness to user input (replaced FID in 2024) |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visual stability while loading |
| **TTFB** (Time to First Byte) | < 800ms | Server response time |

### 2.2 What this codebase does to hit those targets

- **AVIF + WebP responsive images** via `<picture>` and `next/image`
- **Image preload** on hero LCP candidate (`priority` prop on `<Image>`)
- **next/font/google** for self-hosted, FOIT-free font loading
- **React Server Components** by default — minimal client JS
- **Explicit width/height** on every image to prevent CLS
- **Vercel Edge** for sub-100ms TTFB globally
- **Long-cache headers** on static assets (`public, max-age=31536000, immutable`)

### 2.3 Verify after every deploy

```bash
# CLI tool
npx unlighthouse-cli --site https://meridian.london

# Or test individual pages
https://pagespeed.web.dev/?url=https://meridian.london
```

If LCP is > 2.5s, the most likely culprit is the hero image. Check it's using AVIF (DevTools → Network tab → look at the `accept` header → confirm AVIF served).

---

## 3. AEO — being the "answer" in zero-click search

AEO is about getting your content into:
- **Featured snippets** (the box at the top of Google)
- **People Also Ask** (the expandable Q&A boxes)
- **Knowledge panels** (the right-side info card)

### 3.1 The format that wins featured snippets

Google plucks ~40-60 word answers from content that:

1. **Directly answers a question** in the first paragraph
2. **Uses the question text as an H2 or H3**
3. **Provides the answer in plain prose, not buried in marketing copy**

**Bad:**
> Meridian is a London-based digital marketing agency that prides itself on innovative solutions tailored to each client's unique needs across the dynamic digital landscape.

**Good:**
> A digital marketing agency in London typically charges £2,500–£15,000 per month for retained services, with web design projects from £4,500 and app development from £25,000. Costs vary by service mix, agency size, and contract length.

The good version is plain, direct, and has a structure Google can extract.

### 3.2 FAQPage schema is the AEO multiplier

Every service page in this codebase ships with `FAQPage` JSON-LD via `lib/schema.ts:faqSchema()`. This is critical:

- FAQ rich results have ~30% higher CTR than plain blue links
- FAQ entries get pulled directly into AI Overviews
- They occupy 2–4× the SERP real estate

**Action:** add 5–10 FAQs to every new page you create. Use real questions from:
- Google's "People Also Ask" for your target keyword
- AnswerThePublic ([answerthepublic.com](https://answerthepublic.com))
- AlsoAsked ([alsoasked.com](https://alsoasked.com))
- Real questions from sales calls

### 3.3 Heading structure that AI engines parse

```
H1: One per page, the primary keyword
  H2: Major sections — phrased as questions where possible
    H3: Sub-points
    H3: Sub-points
  H2: Next major section
    H3: ...
```

Avoid skipping levels (no H2 → H4). AI parsers use heading hierarchy to map content.

---

## 4. GEO — being cited by ChatGPT, Claude, Perplexity, Google AI Overviews

This is the newest and most rapidly evolving discipline. The basics:

### 4.1 The llms.txt file

This codebase ships with `/public/llms.txt` — the proposed standard for telling LLMs what your site is and which content to cite.

Key things in our `llms.txt`:
- Brief description (the `>` block)
- Key facts as plain bullets (memorable)
- Pages with descriptions
- FAQ entries copy/pasted at the bottom
- Explicit permission to cite

**Update `llms.txt` whenever you change pricing or add major content.**

### 4.2 Welcome AI crawlers in robots.txt

Already done in `app/robots.ts`. We allow:

- `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` (OpenAI)
- `ClaudeBot`, `Claude-Web`, `anthropic-ai` (Anthropic)
- `PerplexityBot`, `Perplexity-User` (Perplexity)
- `Google-Extended` (Google AI Overviews — separate from Googlebot)
- `Applebot-Extended` (Apple Intelligence)
- `CCBot` (Common Crawl, used by many models)

**Don't block these.** Some agencies do "to protect content" — they're trading citation visibility for nothing.

### 4.3 Content patterns that earn AI citations

LLMs prefer to cite content that:

1. **Has clear factual statements with numbers** ("£2,500 per month" beats "competitive pricing")
2. **Cites primary sources** (link to `.gov.uk`, ONS, Ahrefs studies)
3. **Has a recent update date** (LLMs date-weight aggressively)
4. **Has author bylines with credentials** (E-E-A-T signal)
5. **Uses structured data heavily** (Schema.org JSON-LD)

Pattern to replicate across every article:

```markdown
# Title that matches the search query

**Last updated:** 15 April 2026 · **Author:** Sarah Chen, Head of SEO

A digital marketing agency in London typically charges £2,500–£15,000 per month
([source: Sortlist UK Pricing Index 2026](https://...)). Project work runs:

| Service | Typical price | Source |
|---|---|---|
| SEO retainer | £2,500–£8,500/mo | Industry survey, n=180 |
| PPC retainer | £1,800–£6,000/mo + spend | ... |

[continues...]
```

### 4.4 Track AI citations

Use:
- **Profound** ([tryprofound.com](https://tryprofound.com)) — purpose-built for AI citation tracking
- **Otterly.ai** — tracks AI Overview presence
- **Brand24** with AI mentions filter
- Manual checks: search your brand on ChatGPT, Claude, Perplexity weekly

---

## 5. Local SEO — winning the Google 3-pack

For service businesses, the Google Business Profile 3-pack is the highest-converting placement on the entire SERP.

### 5.1 GBP setup checklist

- [ ] Verify business at the registered London address
- [ ] Set primary category: "Marketing agency"
- [ ] Set secondary categories (up to 9): "Internet marketing service", "Website designer", "Software company", "Advertising agency"
- [ ] Add 25+ photos (interior, team, work)
- [ ] Add full description with primary keyword in first 100 chars
- [ ] List all services individually (each gets a sub-page in Google)
- [ ] Add posts weekly (count for freshness)
- [ ] **Earn 50+ reviews in first 6 months** — single biggest 3-pack ranking factor

### 5.2 Borough citations (NAP consistency)

Get the business listed on these directories with **identical** Name/Address/Phone:

- Yell.com
- Thomson Local
- Cylex UK
- Brownbook
- Hotfrog UK
- Touch Local
- FreeIndex
- Scoot
- The Phone Book
- 192.com

Use [WhiteSpark Citation Tracker](https://whitespark.ca) or [BrightLocal](https://brightlocal.com) to manage.

### 5.3 Borough page strategy

Each `/london/[borough]` page is built to:
- Target long-tail "[service] [borough]" keywords (lower KD than "[service] london")
- Carry a `LocalBusiness` schema for the borough
- Internal-link to neighbouring boroughs
- List all services with borough-specific anchor text

This gives you **44 location-specific landing pages** out of the box. Once you build the `[service]/[borough]` matrix, you'll have 308.

---

## 6. Backlink strategy — the hardest part of SEO

Google ranks pages with more high-quality backlinks higher. There's no shortcut. The codebase can't get you links — outreach can.

### 6.1 What works in 2026 for London agencies

- **HARO/Qwoted/Connectively responses** — quickest wins, links from major UK publications
- **Industry studies with original data** — pitch journalists at *Marketing Week*, *Campaign*, *The Drum*
- **Speaking at London tech events** — most events publish speaker bios with links
- **Guest posts on niche industry blogs** — not the spammy kind; the genuinely respected ones
- **PR via SEO-aware agencies** — services like Skyrocket SEO, BuzzStream
- **Resource pages** — find "best London agencies" lists and ask to be added (back yourself with case studies)

### 6.2 Link sources to specifically pursue for `meridian.london`

Highest-value targets for a London digital agency:

- `tech.eu` (~DR 80) — pitch funding/case study stories
- `uktech.news` (~DR 70) — London startup news
- `cityam.com` (~DR 90) — business publication, takes guest contributors
- `marketingweek.com` (~DR 90) — agency POV pieces
- `thedrum.com` (~DR 90) — campaigns and case studies
- `prolific-london.co.uk` (~DR 60) — London creative industry
- `clutch.co` (~DR 92) — paid + free agency profiles
- `sortlist.co.uk` (~DR 70) — agency directory
- `designrush.com` (~DR 75) — agency rankings
- `themanifest.com` (~DR 65) — Clutch's sister directory

### 6.3 What NOT to do

- ❌ Buy links — Google's algorithms detect these and penalise
- ❌ Use PBNs (private blog networks) — same problem
- ❌ Mass-spam guest post outreach — gets you blacklisted
- ❌ Comment-spam on blogs — useless and harmful
- ❌ Link from your own properties to artificially inflate — Google sees through this

---

## 7. Content velocity — the SEO compound engine

You can have perfect technical SEO and still rank for nothing if you don't publish.

### 7.1 Publishing cadence by goal

| Goal | Min cadence |
|---|---|
| Just keep ranking what you have | 1 article/month |
| Slow growth | 2 articles/month |
| Compete with established agencies | 4 articles/month |
| Catch up to a 5-year-old competitor | 8+ articles/month |

For Meridian, **target 4–6 articles per month** for the first 12 months. After that, 2–4 will compound.

### 7.2 Article types that work

In rough order of leverage:

1. **"How much does X cost in London"** — captures buyer-intent traffic
2. **"How to choose an X"** — captures vetting-stage traffic
3. **"X vs Y"** — captures decision-stage traffic
4. **Industry data reports** — earn backlinks
5. **Case studies with before/after metrics** — convert traffic
6. **Glossary/definition pages** — capture top-of-funnel + AI citations

### 7.3 What every article must include

- [ ] Direct answer in first 50 words
- [ ] Date-stamped at the top
- [ ] Author byline with role
- [ ] H1 = primary keyword
- [ ] H2/H3s structured around question variants
- [ ] FAQPage schema
- [ ] Internal links to 3+ relevant service/borough pages
- [ ] 1+ external citation to a primary source
- [ ] 1+ image with alt text
- [ ] Word count: 1,200 minimum, 2,500 for cornerstone pieces
- [ ] Open Graph image
- [ ] Updated quarterly with a new "Last updated" date

---

## 8. Tools shortlist

### Free / freemium

- **Google Search Console** — first-party impression and click data
- **Google Analytics 4** or **Plausible** — traffic analytics
- **Google PageSpeed Insights** — Core Web Vitals
- **Google Rich Results Test** — schema validation
- **AnswerThePublic** — question keyword discovery
- **AlsoAsked** — People Also Ask mining
- **Searchvolume.io** — bulk volume validation

### Paid (worth it for any serious agency)

- **Ahrefs** (~£90+/mo) — best backlink data, second-best keyword data
- **SEMrush** (~£100+/mo) — best keyword data, broader marketing suite
- **Screaming Frog** (~£200/yr) — technical SEO crawler
- **Profound** (pricing TBC) — AI citation tracking
- **WhiteSpark** (~£20/mo) — local citation management

---

## 9. The 90-day milestone plan

### Days 1–30 — Foundation
- [ ] Deploy to production
- [ ] Verify Search Console + submit sitemap
- [ ] Set up Google Business Profile + start review velocity
- [ ] Confirm all schema validates
- [ ] Run PageSpeed audit on every top-level page
- [ ] Publish first 4 cornerstone articles
- [ ] Start citation building (top 10 directories)

### Days 31–60 — Velocity
- [ ] Publish 4 more articles
- [ ] Begin manual backlink outreach (5 pitches/week)
- [ ] Build out programmatic `[service]/[borough]` matrix
- [ ] First 10 GBP reviews collected
- [ ] Start tracking AI citations weekly

### Days 61–90 — Compound
- [ ] Publish 4 more articles
- [ ] Audit and refresh top 10 underperforming pages from GSC data
- [ ] Add internal links from new content to commercial pages
- [ ] First case study published with measurable client results
- [ ] Apply for Clutch, DesignRush, Sortlist directory placements

### After 90 days
You should be seeing:
- 300+ keywords ranked in GSC
- 5–15 keywords on page 1
- 1+ AI citation per week (track in Profound)
- Domain Rating climbing from baseline
- First inbound leads from organic

---

## 10. The honest truth

This codebase gives you the foundation that 95% of London agencies don't have. But:

**SEO/GEO/AEO is not "set up and forget."** It's a 12–24 month investment that compounds. The agencies ranking for "digital marketing agency london" today have been at it for 5–10 years.

Your shortest path to revenue is **paid search on transactional terms** while organic builds. The site supports both.

Now go and ship.

---

*Last updated: 15 April 2026*
