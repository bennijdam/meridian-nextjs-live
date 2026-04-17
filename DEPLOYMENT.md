# Meridian deployment quickstart

This file covers the three operational steps needed after the local setup is complete:

1. production environment wiring
2. Vercel deployment
3. Stripe product and price bootstrap

---

## 1. Production environment wiring

From the project root, copy the template and fill in the real values:

```bash
cp .env.example .env.local
npm run env:check
npm run env:check -- --with-stripe
```

Required services:

- Neon Postgres
- Upstash Redis
- Resend
- Stripe
- your real domain

If this repository is pushed together with the HTML demo files, set the Vercel project root directory to this folder only.

---

## 2. Vercel deployment

### Option A — this folder is the repo root

```bash
npm run deploy:preflight
npx vercel link
npx vercel env pull .env.local
npx vercel --prod
```

### Option B — the larger workspace is the repo root

In the Vercel dashboard:

- import the repository
- set the **Root Directory** to **meridian-nextjs**
- framework preset: **Next.js**
- install command: **npm install**
- build command: **npm run build**

Then add all environment variables from .env.local to the Production environment.

After the first deploy:

- add the custom domain
- enable Speed Insights
- enable Web Analytics
- point Cloudflare DNS at Vercel
- run one final production smoke test on home, pricing, audit, sitemap, and robots

---

## 3. Stripe bootstrap

Once the real Stripe secret key is present in .env.local, run:

```bash
npm run stripe:setup
```

What it does:

- creates or reuses all Meridian Stripe Products
- creates or reuses all Prices for retainers and one-off services
- writes the resulting Price IDs back into .env.local

Dry run mode:

```bash
npm run stripe:setup -- --dry-run
```

After running it, copy the generated Stripe env vars into Vercel Production and Preview.

You still need to configure the live webhook endpoint in Stripe:

- endpoint URL: https://your-domain.com/api/stripe/webhook
- events:
  - checkout.session.completed
  - customer.subscription.created
  - customer.subscription.updated
  - customer.subscription.deleted
  - invoice.payment_succeeded
  - invoice.payment_failed

---

## Final pre-launch command

```bash
npm run deploy:preflight
```

This checks:

- environment values
- TypeScript
- ESLint
- production build
