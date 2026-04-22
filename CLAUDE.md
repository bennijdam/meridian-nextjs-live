# CLAUDE.md — Project Rules for AI Agents

**Project:** Meridian London v3
**Stack:** Next.js 15 · Tailwind v4 · Drizzle ORM · Neon Postgres · Stripe · Resend
**Last updated:** 2026-04-16

---

## 1. DESIGN PARITY — MANDATORY

**Do NOT change any design aspect. The branding and design must remain at 100% visual parity with the existing site.**

This is the single most important rule in this project. Every new page, component, or section you create must match the overall site design exactly. No exceptions.

### What this means in practice

- **Do not invent new colours.** Use only the design tokens defined in `app/globals.css` (`:root` for dark, `:root[data-theme="light"]` for light). The palette is:
  - Dark: `--bg: #07070a`, `--accent: #5b8cff`, `--accent-2: #ff5be3`, `--accent-3: #c4ff5b`
  - Light: `--bg: #f4f4f7`, `--accent: #2563eb`, `--accent-2: #ec4899`, `--accent-3: #65a30d`
- **Do not change fonts.** The type system is Instrument Serif (headings), Geist (body), Geist Mono (code/labels). All loaded in `app/layout.tsx` via `next/font/google`.
- **Do not change border-radius values.** Use `--r-sm: 14px`, `--r: 22px`, `--r-lg: 32px`, `--r-xl: 44px`.
- **Do not change the glass-morphism treatment.** `.glass` and `.glass-strong` classes define backdrop-filter, surface opacity, and border. Reuse them — do not create alternatives.
- **Do not change spacing, padding, or layout conventions.** The container is `.wrap` at `max-width: 1280px`. Section padding follows the existing rhythm.
- **Do not change button styles.** Use `.btn-primary`, `.btn-ghost`, `.nav-cta`, `.audit-btn` as they exist.
- **Do not change the header, footer, or mobile CTA.** These are shared across all pages and must not be modified.
- **Both themes must work.** Every new element must look correct in both dark and light mode. If you add a new component class, add corresponding `:root[data-theme="light"]` overrides in `globals.css`.

### Before submitting any visual change

1. Check the page in both light and dark mode
2. Compare against the existing HTML demo files (`meridian-*-v3.html` in the repo root) — these are the design source of truth
3. Verify glass surfaces, gradients, shadows, and hover states match the existing patterns
4. Test at mobile (375px), tablet (768px), and desktop (1280px+) breakpoints

---

## 2. Code conventions

### File structure
- Pages live in `app/[route]/page.tsx` — Next.js App Router
- Shared data lives in `lib/` — `services.ts`, `boroughs.ts`, `pricing.ts`, `schema.ts`
- There is no `components/` directory yet — the homepage is a single file. When extracting components, follow the plan in `CODEX.md` section 3
- API routes live in `app/api/[name]/route.ts`

### CSS
- Global styles in `app/globals.css` — uses Tailwind v4 (`@import "tailwindcss"`) plus extensive custom CSS
- No CSS modules, no styled-components, no CSS-in-JS
- New styles go in `globals.css` scoped by class name (e.g. `.my-new-section { ... }`)
- Light theme overrides go under `:root[data-theme="light"] .my-new-section { ... }`

### TypeScript
- Strict mode enabled
- Run `npm run typecheck` before committing
- Run `npm run lint` before committing

### Build verification
- `npm run build` must pass before any push
- The build produces static + SSR pages — do not break ISR or static generation

### Environment variables
- Never commit `.env.local`
- Template lives in `.env.example`
- Use `npm run env:check` to validate

### Schema / SEO
- Every new page must include appropriate JSON-LD schema
- Use helpers from `lib/schema.ts`
- Every new page needs `metadata` export for Open Graph, title, description
- Sitemap must be updated in `app/sitemap.ts` when adding routes

### Reveal animations
- Sections that should animate on scroll use `className="reveal"`
- The IntersectionObserver is currently in `app/page.tsx` — when refactoring, extract to a shared `<RevealOnScroll />` client component

---

## 3. Git workflow

- Commit frequently with descriptive messages
- **Update `HANDOVER.md` after every push/commit** — append what was done, what changed, and what's next
- Do not force-push to main
- Run the full check before pushing: `npm run typecheck && npm run lint && npm run build`

---

## 3a. Security rules

- **Sanitize all user input.** Never use `innerHTML` without sanitization.
- **No new npm packages** without explicit approval. Use existing utilities or native APIs.
- **No hardcoded credentials.** Secrets in `.env.local` only. Template in `.env.example`.
- **Every new function must have try/catch** with non-sensitive error logging.
- **Stripe webhook:** never replace `req.text()` with `req.json()` — breaks signature verification.
- **Stripe events are retried.** Use `event.id` to dedupe non-idempotent operations.

---

## 3b. Multi-agent coordination — Handover Ritual

After every completed task, update both files:

### A. `HANDOVER.md`
- **Summary:** what changed
- **Technical Debt / Risks:** quick fixes needing a permanent solution
- **Verification:** how the next agent confirms the work (e.g. `npm run build`, check URL)

### B. `AGENTS.md` (append only)
```
[YYYY-MM-DD | HH:MM] | Agent: [Name] | Commit: [short hash or "uncommitted"] | Status: [Success/Partial/Blocker]
Note for next agent: [1–2 sentences not obvious from the code]
```

---

## 4. What NOT to do

- Do not add new npm dependencies without justification
- Do not refactor code you weren't asked to touch
- Do not remove existing CSS classes — the HTML demos reference them
- Do not change the pricing logic in `lib/pricing.ts` without explicit approval
- Do not modify Stripe webhook handling without explicit approval
- Do not delete or rename any existing routes
- Do not add a CMS, authentication, or any major infrastructure without approval
- Do not change the `<head>` schema injection pattern in `app/layout.tsx`
