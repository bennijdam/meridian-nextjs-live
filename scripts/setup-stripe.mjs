#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import Stripe from 'stripe';

const cwd = process.cwd();
const envPath = path.join(cwd, '.env.local');
const dryRun = process.argv.includes('--dry-run');
const help = process.argv.includes('--help') || process.argv.includes('-h');

if (help) {
  console.log(`Meridian Stripe bootstrap\n\nUsage:\n  node scripts/setup-stripe.mjs\n  node scripts/setup-stripe.mjs --dry-run\n\nThis script creates or reuses Stripe products and prices, then writes the generated price IDs back into .env.local.`);
  process.exit(0);
}

function parseEnvFile(filePath) {
  const out = {};
  if (!fs.existsSync(filePath)) return out;
  const raw = fs.readFileSync(filePath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function upsertEnvValue(filePath, key, value) {
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, 'm');
  const next = pattern.test(existing)
    ? existing.replace(pattern, line)
    : `${existing.trimEnd()}\n${line}\n`;
  fs.writeFileSync(filePath, next.endsWith('\n') ? next : `${next}\n`, 'utf8');
}

function gbpToPence(amount) {
  return Math.round(amount * 100);
}

const env = { ...parseEnvFile(envPath), ...process.env };
const secretKey = env.STRIPE_SECRET_KEY;

if (!secretKey || secretKey.includes('xxxxxxxx') || secretKey === 'sk_test_xxxxxxxxxxxxxxxxxxxx') {
  console.error('Set a real STRIPE_SECRET_KEY in .env.local before running this script.');
  process.exit(1);
}

const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' });

const retainers = [
  { id: 'seo-starter', name: 'Meridian SEO Starter', service: 'SEO', tier: 'Starter', payg: 490, monthly: 441, annualMonthly: 407, env: { payg: 'STRIPE_PRICE_SEO_STARTER_PAYG', monthly: 'STRIPE_PRICE_SEO_STARTER_MONTHLY', annual: 'STRIPE_PRICE_SEO_STARTER_ANNUAL' } },
  { id: 'seo-growth', name: 'Meridian SEO Growth', service: 'SEO', tier: 'Growth', payg: 1490, monthly: 1341, annualMonthly: 1237, env: { payg: 'STRIPE_PRICE_SEO_GROWTH_PAYG', monthly: 'STRIPE_PRICE_SEO_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_SEO_GROWTH_ANNUAL' } },
  { id: 'seo-scale', name: 'Meridian SEO Scale', service: 'SEO', tier: 'Scale', payg: 3490, monthly: 3141, annualMonthly: 2897, env: { payg: 'STRIPE_PRICE_SEO_SCALE_PAYG', monthly: 'STRIPE_PRICE_SEO_SCALE_MONTHLY', annual: 'STRIPE_PRICE_SEO_SCALE_ANNUAL' } },
  { id: 'ppc-starter', name: 'Meridian PPC Starter', service: 'PPC', tier: 'Starter', payg: 390, monthly: 351, annualMonthly: 324, env: { payg: 'STRIPE_PRICE_PPC_STARTER_PAYG', monthly: 'STRIPE_PRICE_PPC_STARTER_MONTHLY', annual: 'STRIPE_PRICE_PPC_STARTER_ANNUAL' } },
  { id: 'ppc-growth', name: 'Meridian PPC Growth', service: 'PPC', tier: 'Growth', payg: 990, monthly: 891, annualMonthly: 822, env: { payg: 'STRIPE_PRICE_PPC_GROWTH_PAYG', monthly: 'STRIPE_PRICE_PPC_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_PPC_GROWTH_ANNUAL' } },
  { id: 'ppc-scale', name: 'Meridian PPC Scale', service: 'PPC', tier: 'Scale', payg: 2490, monthly: 2241, annualMonthly: 2067, env: { payg: 'STRIPE_PRICE_PPC_SCALE_PAYG', monthly: 'STRIPE_PRICE_PPC_SCALE_MONTHLY', annual: 'STRIPE_PRICE_PPC_SCALE_ANNUAL' } },
  { id: 'social-starter', name: 'Meridian Social Media Starter', service: 'Social Media', tier: 'Starter', payg: 490, monthly: 441, annualMonthly: 407, env: { payg: 'STRIPE_PRICE_SOCIAL_STARTER_PAYG', monthly: 'STRIPE_PRICE_SOCIAL_STARTER_MONTHLY', annual: 'STRIPE_PRICE_SOCIAL_STARTER_ANNUAL' } },
  { id: 'social-growth', name: 'Meridian Social Media Growth', service: 'Social Media', tier: 'Growth', payg: 1490, monthly: 1341, annualMonthly: 1237, env: { payg: 'STRIPE_PRICE_SOCIAL_GROWTH_PAYG', monthly: 'STRIPE_PRICE_SOCIAL_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_SOCIAL_GROWTH_ANNUAL' } },
  { id: 'social-scale', name: 'Meridian Social Media Scale', service: 'Social Media', tier: 'Scale', payg: 3490, monthly: 3141, annualMonthly: 2897, env: { payg: 'STRIPE_PRICE_SOCIAL_SCALE_PAYG', monthly: 'STRIPE_PRICE_SOCIAL_SCALE_MONTHLY', annual: 'STRIPE_PRICE_SOCIAL_SCALE_ANNUAL' } },
  { id: 'content-growth', name: 'Meridian Content Growth', service: 'Content', tier: 'Growth', payg: 1290, monthly: 1161, annualMonthly: 1071, env: { payg: 'STRIPE_PRICE_CONTENT_GROWTH_PAYG', monthly: 'STRIPE_PRICE_CONTENT_GROWTH_MONTHLY', annual: 'STRIPE_PRICE_CONTENT_GROWTH_ANNUAL' } },
];

const projects = [
  { id: 'web-lite', name: 'Meridian Web Design Lite', service: 'Web Design', tier: 'Lite', price: 1950, env: 'STRIPE_PRICE_WEB_LITE' },
  { id: 'web-pro', name: 'Meridian Web Design Pro', service: 'Web Design', tier: 'Pro', price: 4990, env: 'STRIPE_PRICE_WEB_PRO' },
  { id: 'web-custom', name: 'Meridian Web Design Custom', service: 'Web Design', tier: 'Custom', price: 14990, env: 'STRIPE_PRICE_WEB_CUSTOM' },
  { id: 'app-mvp-lite', name: 'Meridian App MVP Lite', service: 'App Dev', tier: 'MVP Lite', price: 9990, env: 'STRIPE_PRICE_APP_MVP_LITE' },
  { id: 'app-mvp', name: 'Meridian App MVP', service: 'App Dev', tier: 'MVP', price: 24990, env: 'STRIPE_PRICE_APP_MVP' },
  { id: 'app-platform', name: 'Meridian App Platform', service: 'App Dev', tier: 'Platform', price: 79990, env: 'STRIPE_PRICE_APP_PLATFORM' },
  { id: 'branding-sprint', name: 'Meridian Branding Sprint', service: 'Branding', tier: 'Sprint', price: 1990, env: 'STRIPE_PRICE_BRANDING_SPRINT' },
  { id: 'branding-full', name: 'Meridian Branding Full Identity', service: 'Branding', tier: 'Full Identity', price: 4990, env: 'STRIPE_PRICE_BRANDING_FULL' },
  { id: 'branding-rebrand', name: 'Meridian Branding Rebrand', service: 'Branding', tier: 'Rebrand', price: 14990, env: 'STRIPE_PRICE_BRANDING_REBRAND' },
  { id: 'plan-starter', name: 'Meridian Business Plan Starter', service: 'Business Plan', tier: 'Starter', price: 590, env: 'STRIPE_PRICE_PLAN_STARTER' },
  { id: 'plan-visa', name: 'Meridian Business Plan Visa', service: 'Business Plan', tier: 'Visa', price: 1090, env: 'STRIPE_PRICE_PLAN_VISA' },
  { id: 'plan-investor', name: 'Meridian Business Plan Investor', service: 'Business Plan', tier: 'Investor', price: 2490, env: 'STRIPE_PRICE_PLAN_INVESTOR' },
];

async function findOrCreateProduct(item, kind) {
  const existing = await stripe.products.list({ active: true, limit: 100 });
  const match = existing.data.find((p) => p.metadata?.meridianProductId === item.id || p.name === item.name);
  if (match) return match;

  if (dryRun) {
    return { id: `dryrun_${item.id}` };
  }

  return stripe.products.create({
    name: item.name,
    description: `${item.service} — ${item.tier}`,
    metadata: {
      meridianProductId: item.id,
      meridianKind: kind,
      meridianService: item.service,
      meridianTier: item.tier,
    },
  });
}

async function findOrCreateRecurringPrice(productId, item, period, amount) {
  const lookupKey = `meridian_${item.id}_${period}`;
  const existing = await stripe.prices.list({ product: productId, active: true, limit: 100 });
  const match = existing.data.find((p) => p.lookup_key === lookupKey || p.metadata?.envKey === item.env[period]);
  if (match) return match;

  if (dryRun) {
    return { id: `dryrun_${lookupKey}` };
  }

  return stripe.prices.create({
    product: productId,
    currency: 'gbp',
    unit_amount: gbpToPence(amount),
    recurring: { interval: period === 'annual' ? 'year' : 'month' },
    lookup_key: lookupKey,
    metadata: {
      meridianProductId: item.id,
      meridianPeriod: period,
      envKey: item.env[period],
    },
  });
}

async function findOrCreateOneOffPrice(productId, item) {
  const lookupKey = `meridian_${item.id}_oneoff`;
  const existing = await stripe.prices.list({ product: productId, active: true, limit: 100 });
  const match = existing.data.find((p) => p.lookup_key === lookupKey || p.metadata?.envKey === item.env);
  if (match) return match;

  if (dryRun) {
    return { id: `dryrun_${lookupKey}` };
  }

  return stripe.prices.create({
    product: productId,
    currency: 'gbp',
    unit_amount: gbpToPence(item.price),
    lookup_key: lookupKey,
    metadata: {
      meridianProductId: item.id,
      meridianPeriod: 'oneoff',
      envKey: item.env,
    },
  });
}

(async function main() {
  console.log(`Stripe bootstrap starting (${dryRun ? 'dry run' : 'write mode'})...`);

  for (const item of retainers) {
    const product = await findOrCreateProduct(item, 'retainer');
    const payg = await findOrCreateRecurringPrice(product.id, item, 'payg', item.payg);
    const monthly = await findOrCreateRecurringPrice(product.id, item, 'monthly', item.monthly);
    const annual = await findOrCreateRecurringPrice(product.id, item, 'annual', item.annualMonthly * 12);

    console.log(`${item.name}`);
    console.log(`  ${item.env.payg}=${payg.id}`);
    console.log(`  ${item.env.monthly}=${monthly.id}`);
    console.log(`  ${item.env.annual}=${annual.id}`);

    if (!dryRun) {
      upsertEnvValue(envPath, item.env.payg, payg.id);
      upsertEnvValue(envPath, item.env.monthly, monthly.id);
      upsertEnvValue(envPath, item.env.annual, annual.id);
    }
  }

  for (const item of projects) {
    const product = await findOrCreateProduct(item, 'project');
    const price = await findOrCreateOneOffPrice(product.id, item);

    console.log(`${item.name}`);
    console.log(`  ${item.env}=${price.id}`);

    if (!dryRun) {
      upsertEnvValue(envPath, item.env, price.id);
    }
  }

  console.log(`\nDone. ${dryRun ? 'No files were changed.' : '.env.local has been updated with the Stripe Price IDs.'}`);
})().catch((error) => {
  console.error('\nStripe bootstrap failed.');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
