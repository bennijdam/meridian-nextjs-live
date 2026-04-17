/**
 * Unified lead-capture router.
 *
 * Single entry point for all lead capture events. Fire-and-forget: called from
 * every form/API that captures a lead. Fans out to the downstream sinks.
 *
 * Sinks (as of this version):
 *   - Slack notification        (via lib/email.ts → notifySlackOfLead)
 *   - HubSpot CRM sync          (via lib/hubspot.ts → syncLeadToHubSpot)
 *   - (future) email sequences, Zapier webhooks, analytics events
 *
 * Database persistence is intentionally NOT handled here — each API route owns
 * its own schema and persistence (leads table, audit_jobs, payments, etc.).
 *
 * This function catches and logs all errors internally; it never throws.
 */

import { notifySlackOfLead } from '@/lib/email';
import { syncLeadToHubSpot } from '@/lib/hubspot';

export type LeadCaptureArgs = {
  email: string;
  name?: string;
  company?: string;
  website?: string;
  industry?: string;
  /** The target URL (for audit leads). */
  url?: string;
  /** 'audit_form' | 'homepage_footer' | 'download_seo-playbook' | 'contact_form' | 'pricing_checkout' | ... */
  source: string;
  metadata?: Record<string, unknown>;
};

/**
 * Fire-and-forget fan-out to every lead sink.
 * Never throws — failures are logged and swallowed.
 */
export async function handleLeadCapture(args: LeadCaptureArgs): Promise<void> {
  const { email, name, company, website, industry, url, source, metadata } = args;

  // Decide on a default deal-creation policy based on source.
  const highIntentSources = new Set(['audit_form', 'pricing_checkout', 'stripe_checkout']);
  const createDeal = highIntentSources.has(source);

  const tasks: Array<Promise<unknown>> = [
    notifySlackOfLead({
      email,
      url: url || website || '',
      industry,
      source,
    }).catch((err) => {
      console.error('[lead-router] Slack sink failed:', err);
      return null;
    }),

    syncLeadToHubSpot({
      email,
      name,
      company,
      website: website || url,
      industry,
      source,
      createDeal,
      metadata,
    }).catch((err) => {
      console.error('[lead-router] HubSpot sink failed:', err);
      return null;
    }),
  ];

  await Promise.allSettled(tasks);
}
