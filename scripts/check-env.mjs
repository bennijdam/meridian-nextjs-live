#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const envPath = path.join(cwd, '.env.local');
const includeStripe = process.argv.includes('--with-stripe');

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

function looksPlaceholder(key, value) {
  if (!value) return true;
  const v = String(value).trim();
  if (!v) return true;

  const patterns = [
    'xxxxxxxx',
    'price_xxx',
    'whsec_x',
    'sk_test_x',
    'pk_test_x',
    'user:pass',
    'ep-xxx',
    'xxx.upstash.io',
    'AIzaSyxxxxxxxx',
    '{"type":"service_account",...}',
  ];

  if (patterns.some((p) => v.includes(p))) return true;

  if (key === 'NEXT_PUBLIC_SITE_URL' && v.includes('meridian.london')) return true;
  if (key === 'RESEND_FROM_EMAIL' && v.includes('@meridian.london')) return true;

  return false;
}

const env = { ...parseEnvFile(envPath), ...process.env };

const requiredCore = [
  'NEXT_PUBLIC_SITE_URL',
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'DATABASE_URL',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
];

const requiredStripe = [
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET',
];

const checks = includeStripe ? [...requiredCore, ...requiredStripe] : requiredCore;
const failures = [];

for (const key of checks) {
  const value = env[key];
  if (!value || looksPlaceholder(key, value)) {
    failures.push(key);
  }
}

console.log('Meridian environment check');
console.log(`Mode: ${includeStripe ? 'core + stripe' : 'core only'}`);
console.log(`Env file: ${envPath}`);

if (!fs.existsSync(envPath)) {
  console.error('\n✗ .env.local was not found. Copy .env.example to .env.local first.');
  process.exit(1);
}

if (failures.length > 0) {
  console.error('\n✗ Missing or placeholder values:');
  for (const key of failures) console.error(`  - ${key}`);
  console.error('\nFill those values, then rerun this script.');
  process.exit(1);
}

console.log('\n✓ Required environment variables look configured.');

const optional = [
  'SLACK_LEADS_WEBHOOK_URL',
  'PAGESPEED_API_KEY',
  'NEXT_PUBLIC_GA4_MEASUREMENT_ID',
  'NEXT_PUBLIC_PLAUSIBLE_DOMAIN',
];

const missingOptional = optional.filter((key) => !env[key] || looksPlaceholder(key, env[key]));
if (missingOptional.length) {
  console.log('\nOptional values still unset:');
  for (const key of missingOptional) console.log(`  - ${key}`);
}
