/**
 * Database layer — Drizzle ORM on Neon serverless Postgres.
 *
 * Lightweight schema for lead capture and audit jobs.
 * Run `npm run db:push` after editing schema.
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, text, timestamp, uuid, jsonb, integer, index } from 'drizzle-orm/pg-core';

const DATABASE_URL = process.env.DATABASE_URL ?? '';
export const hasDatabase = Boolean(
  DATABASE_URL &&
  !DATABASE_URL.includes('user:pass') &&
  !DATABASE_URL.includes('ep-xxx')
);

const sql = hasDatabase ? neon(DATABASE_URL) : null;
export const db = (hasDatabase ? drizzle(sql!) : null) as ReturnType<typeof drizzle>;

// ===== Leads =====
export const leads = pgTable('leads', {
  id:        uuid('id').defaultRandom().primaryKey(),
  email:     text('email').notNull(),
  url:       text('url'),
  industry:  text('industry'),
  source:    text('source').default('homepage_audit_form'),
  metadata:  jsonb('metadata'),               // UTM, IP, user agent, referer
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => ({
  emailIdx:     index('leads_email_idx').on(t.email),
  createdAtIdx: index('leads_created_at_idx').on(t.createdAt),
}));

// ===== Audit jobs =====
export const auditJobs = pgTable('audit_jobs', {
  id:          uuid('id').defaultRandom().primaryKey(),
  leadId:      uuid('lead_id').references(() => leads.id),
  url:         text('url').notNull(),
  status:      text('status').default('queued').notNull(),  // queued | running | done | failed
  results:     jsonb('results'),
  errorMsg:    text('error_msg'),
  durationMs:  integer('duration_ms'),
  createdAt:   timestamp('created_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
}, (t) => ({
  statusIdx: index('audit_jobs_status_idx').on(t.status),
  urlIdx:    index('audit_jobs_url_idx').on(t.url),
}));

export type NewLead = typeof leads.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewAuditJob = typeof auditJobs.$inferInsert;
export type AuditJob = typeof auditJobs.$inferSelect;


// ===== Subscriptions (synced from Stripe webhooks) =====
export const subscriptions = pgTable('subscriptions', {
  id:                 uuid('id').defaultRandom().primaryKey(),
  stripeSubscriptionId: text('stripe_subscription_id').unique().notNull(),
  stripeCustomerId:   text('stripe_customer_id').notNull(),
  stripePriceId:      text('stripe_price_id').notNull(),
  productId:          text('product_id'),                  // matches lib/pricing.ts ID
  email:              text('email').notNull(),
  status:             text('status').notNull(),            // active, trialing, past_due, canceled, ...
  billingPeriod:      text('billing_period'),              // payg | monthly | annual
  currentPeriodEnd:   timestamp('current_period_end'),
  cancelAtPeriodEnd:  text('cancel_at_period_end').default('false'),
  metadata:           jsonb('metadata'),
  createdAt:          timestamp('created_at').defaultNow().notNull(),
  updatedAt:          timestamp('updated_at').defaultNow().notNull(),
}, (t) => ({
  customerIdx: index('subs_customer_idx').on(t.stripeCustomerId),
  emailIdx:    index('subs_email_idx').on(t.email),
  statusIdx:   index('subs_status_idx').on(t.status),
}));

// ===== Payments (one-off + invoice records) =====
export const payments = pgTable('payments', {
  id:                  uuid('id').defaultRandom().primaryKey(),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  stripeInvoiceId:     text('stripe_invoice_id'),
  stripeSessionId:     text('stripe_session_id'),
  stripeCustomerId:    text('stripe_customer_id'),
  email:               text('email'),
  amount:              integer('amount').notNull(),         // in pence (GBP)
  currency:            text('currency').default('gbp'),
  status:              text('status').notNull(),            // succeeded, failed, pending
  productId:           text('product_id'),
  productKind:         text('product_kind'),                // retainer | project
  metadata:            jsonb('metadata'),
  createdAt:           timestamp('created_at').defaultNow().notNull(),
}, (t) => ({
  customerIdx: index('pay_customer_idx').on(t.stripeCustomerId),
  emailIdx:    index('pay_email_idx').on(t.email),
  statusIdx:   index('pay_status_idx').on(t.status),
}));

export type NewSubscription = typeof subscriptions.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type Payment = typeof payments.$inferSelect;


// ===== Auth tokens (magic-link email verification) =====
export const authTokens = pgTable('auth_tokens', {
  id:        uuid('id').defaultRandom().primaryKey(),
  email:     text('email').notNull(),
  tokenHash: text('token_hash').notNull().unique(),   // sha256 of the token
  expiresAt: timestamp('expires_at').notNull(),
  usedAt:    timestamp('used_at'),                    // null until consumed
  createdAt: timestamp('created_at').defaultNow().notNull(),
  metadata:  jsonb('metadata'),                       // IP, userAgent at creation
}, (t) => ({
  tokenHashIdx: index('auth_tokens_hash_idx').on(t.tokenHash),
  emailIdx:     index('auth_tokens_email_idx').on(t.email),
  expiresIdx:   index('auth_tokens_expires_idx').on(t.expiresAt),
}));

// ===== Auth sessions (session cookies) =====
export const authSessions = pgTable('auth_sessions', {
  id:          uuid('id').defaultRandom().primaryKey(),
  email:       text('email').notNull(),
  sessionHash: text('session_hash').notNull().unique(),  // sha256 of the session token
  expiresAt:   timestamp('expires_at').notNull(),
  createdAt:   timestamp('created_at').defaultNow().notNull(),
  revokedAt:   timestamp('revoked_at'),
  metadata:    jsonb('metadata'),                        // IP, userAgent
}, (t) => ({
  sessionHashIdx: index('auth_sessions_hash_idx').on(t.sessionHash),
  emailIdx:       index('auth_sessions_email_idx').on(t.email),
  expiresIdx:     index('auth_sessions_expires_idx').on(t.expiresAt),
}));

export type NewAuthToken = typeof authTokens.$inferInsert;
export type AuthToken = typeof authTokens.$inferSelect;
export type NewAuthSession = typeof authSessions.$inferInsert;
export type AuthSession = typeof authSessions.$inferSelect;
