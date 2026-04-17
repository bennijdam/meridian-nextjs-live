/**
 * HubSpot CRM integration.
 *
 * Requires HUBSPOT_ACCESS_TOKEN env var (Private App access token).
 * Docs: https://developers.hubspot.com/docs/api/overview
 *
 * If HUBSPOT_ACCESS_TOKEN is not set, all functions log and return gracefully.
 *
 * Get token: https://app.hubspot.com/settings/ > Integrations > Private Apps
 * Required scopes:
 *   - crm.objects.contacts.write
 *   - crm.objects.contacts.read
 *   - crm.objects.deals.write
 *   - crm.objects.deals.read
 *   - (optional) timeline events
 */

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

export type HubSpotContactInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  website?: string;
  industry?: string;
  /** e.g. 'audit_form', 'homepage_footer', 'download_seo-playbook' */
  leadSource: string;
  utm?: Record<string, string>;
  metadata?: Record<string, unknown>;
};

export type HubSpotDealInput = {
  /** The contact to associate the deal with. */
  contactEmail: string;
  dealName: string;
  /** default: 'appointmentscheduled' (first stage of the default pipeline) */
  dealStage?: string;
  /** GBP amount */
  amount?: number;
  /** default: 'default' */
  pipeline?: string;
  /** ISO close-date */
  closeDate?: string;
  metadata?: Record<string, unknown>;
};

type HubSpotApiError = {
  status: number;
  message: string;
  body?: unknown;
};

// ------------------------------------------------------------------
// Internals
// ------------------------------------------------------------------

function getToken(): string | null {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token || token.length === 0 || token.startsWith('pat-xxx')) return null;
  return token;
}

async function hubspotFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = getToken();
  if (!token) {
    throw new Error('HUBSPOT_ACCESS_TOKEN not configured');
  }

  const res = await fetch(`${HUBSPOT_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      try {
        body = await res.text();
      } catch {
        /* ignore */
      }
    }
    const err: HubSpotApiError = {
      status: res.status,
      message: `HubSpot API ${res.status} on ${path}`,
      body,
    };
    throw err;
  }

  // 204 No Content is possible — return null cast
  if (res.status === 204) return null as unknown as T;
  return (await res.json()) as T;
}

function flattenMetadata(meta?: Record<string, unknown>): Record<string, string> {
  if (!meta) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(meta)) {
    if (v == null) continue;
    out[`m_${k}`] = typeof v === 'string' ? v : JSON.stringify(v);
  }
  return out;
}

// ------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------

/**
 * Create or update a contact in HubSpot.
 * Uses email as the unique identifier.
 * Returns the contact ID, or null if HubSpot is not configured.
 */
export async function upsertContact(
  input: HubSpotContactInput
): Promise<string | null> {
  if (!getToken()) {
    console.info('[hubspot] HUBSPOT_ACCESS_TOKEN not set — skipping upsertContact', {
      email: input.email,
      source: input.leadSource,
    });
    return null;
  }

  const properties: Record<string, string> = {
    email: input.email,
    lifecyclestage: 'lead',
    lead_source: input.leadSource,
    hs_lead_status: 'NEW',
  };

  if (input.firstName) properties.firstname = input.firstName;
  if (input.lastName) properties.lastname = input.lastName;
  if (input.company) properties.company = input.company;
  if (input.website) properties.website = input.website;
  if (input.industry) properties.industry = input.industry;

  if (input.utm) {
    if (input.utm.utm_source) properties.utm_source = input.utm.utm_source;
    if (input.utm.utm_medium) properties.utm_medium = input.utm.utm_medium;
    if (input.utm.utm_campaign) properties.utm_campaign = input.utm.utm_campaign;
    if (input.utm.utm_term) properties.utm_term = input.utm.utm_term;
    if (input.utm.utm_content) properties.utm_content = input.utm.utm_content;
  }

  Object.assign(properties, flattenMetadata(input.metadata));

  try {
    // 1. Try to find the contact by email
    const search = await hubspotFetch<{
      results: Array<{ id: string }>;
    }>('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              { propertyName: 'email', operator: 'EQ', value: input.email },
            ],
          },
        ],
        properties: ['email'],
        limit: 1,
      }),
    });

    if (search.results && search.results.length > 0) {
      const id = search.results[0].id;
      // 2a. Update existing contact
      await hubspotFetch(`/crm/v3/objects/contacts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      });
      return id;
    }

    // 2b. Create a new contact
    const created = await hubspotFetch<{ id: string }>('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties }),
    });
    return created.id;
  } catch (err) {
    console.error('[hubspot] upsertContact failed:', err);
    return null;
  }
}

/**
 * Create a deal in HubSpot associated with a contact.
 * Returns the deal ID, or null if HubSpot is not configured.
 */
export async function createDeal(
  input: HubSpotDealInput
): Promise<string | null> {
  if (!getToken()) {
    console.info('[hubspot] HUBSPOT_ACCESS_TOKEN not set — skipping createDeal', {
      contactEmail: input.contactEmail,
      dealName: input.dealName,
    });
    return null;
  }

  const properties: Record<string, string> = {
    dealname: input.dealName,
    dealstage: input.dealStage || 'appointmentscheduled',
    pipeline: input.pipeline || 'default',
  };

  if (typeof input.amount === 'number' && !Number.isNaN(input.amount)) {
    properties.amount = String(input.amount);
  }
  if (input.closeDate) {
    properties.closedate = input.closeDate;
  }

  Object.assign(properties, flattenMetadata(input.metadata));

  try {
    // 1. Find contact id (required for association)
    const search = await hubspotFetch<{
      results: Array<{ id: string }>;
    }>('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              { propertyName: 'email', operator: 'EQ', value: input.contactEmail },
            ],
          },
        ],
        properties: ['email'],
        limit: 1,
      }),
    });

    const contactId = search.results?.[0]?.id;

    // 2. Create the deal (with association if contact exists)
    const payload: Record<string, unknown> = { properties };
    if (contactId) {
      payload.associations = [
        {
          to: { id: contactId },
          // 3 = deal → contact
          types: [
            { associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 },
          ],
        },
      ];
    }

    const created = await hubspotFetch<{ id: string }>('/crm/v3/objects/deals', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return created.id;
  } catch (err) {
    console.error('[hubspot] createDeal failed:', err);
    return null;
  }
}

/**
 * Log a timeline event on a contact (e.g., "Submitted audit form").
 *
 * Note: HubSpot timeline events technically require a custom event template ID.
 * When one isn't configured, we fall back to writing an engagement note on the
 * contact so the activity is still visible in the CRM.
 */
export async function logTimelineEvent(args: {
  contactEmail: string;
  eventType: string;
  details: Record<string, unknown>;
}): Promise<void> {
  if (!getToken()) {
    console.info('[hubspot] HUBSPOT_ACCESS_TOKEN not set — skipping logTimelineEvent', {
      contactEmail: args.contactEmail,
      eventType: args.eventType,
    });
    return;
  }

  try {
    // Try to find the contact first
    const search = await hubspotFetch<{
      results: Array<{ id: string }>;
    }>('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              { propertyName: 'email', operator: 'EQ', value: args.contactEmail },
            ],
          },
        ],
        properties: ['email'],
        limit: 1,
      }),
    });

    const contactId = search.results?.[0]?.id;
    if (!contactId) {
      console.warn('[hubspot] logTimelineEvent: contact not found', args.contactEmail);
      return;
    }

    // Create an engagement/note so the event is visible on the contact record.
    const noteBody = `[${args.eventType}]\n${JSON.stringify(args.details, null, 2)}`;
    await hubspotFetch('/crm/v3/objects/notes', {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          hs_note_body: noteBody,
          hs_timestamp: new Date().toISOString(),
        },
        associations: [
          {
            to: { id: contactId },
            // 202 = note → contact
            types: [
              { associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 },
            ],
          },
        ],
      }),
    });
  } catch (err) {
    console.error('[hubspot] logTimelineEvent failed:', err);
  }
}

// ------------------------------------------------------------------
// Unified entry point
// ------------------------------------------------------------------

type SyncLeadArgs = {
  email: string;
  name?: string;
  company?: string;
  website?: string;
  industry?: string;
  /** 'audit_form' | 'homepage_footer' | 'download_{slug}' | 'contact_form' | 'pricing_checkout' | ... */
  source: string;
  /** default: true for 'audit_form' and 'pricing_checkout', false otherwise */
  createDeal?: boolean;
  /** if known (e.g. from a Stripe session — expressed in GBP, not pence) */
  dealAmount?: number;
  metadata?: Record<string, unknown>;
};

function splitName(name?: string): { firstName?: string; lastName?: string } {
  if (!name) return {};
  const trimmed = name.trim();
  if (!trimmed) return {};
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0] };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function dealConfigForSource(
  source: string,
  explicitAmount?: number
): { stage: string; amount: number; name: (email: string) => string } | null {
  if (source === 'audit_form') {
    return {
      stage: 'appointmentscheduled',
      amount: 0,
      name: (email) => `Audit lead — ${email}`,
    };
  }
  if (source === 'pricing_checkout' || source === 'stripe_checkout') {
    return {
      stage: 'contractsent',
      amount: typeof explicitAmount === 'number' ? explicitAmount : 0,
      name: (email) => `Meridian order — ${email}`,
    };
  }
  return null;
}

/**
 * Unified entry point — call from /api/audit, /api/leads, Stripe webhooks, etc.
 * Creates the contact, optionally creates a deal, and logs a timeline event.
 *
 * Safe to call when HUBSPOT_ACCESS_TOKEN is unset — it will log and return nulls.
 */
export async function syncLeadToHubSpot(args: SyncLeadArgs): Promise<{
  contactId: string | null;
  dealId: string | null;
}> {
  const { email, name, company, website, industry, source, metadata, dealAmount } = args;

  if (!getToken()) {
    console.info('[hubspot] HUBSPOT_ACCESS_TOKEN not set — syncLeadToHubSpot skipped', {
      email,
      source,
    });
    return { contactId: null, dealId: null };
  }

  try {
    const { firstName, lastName } = splitName(name);

    const contactId = await upsertContact({
      email,
      firstName,
      lastName,
      company,
      website,
      industry,
      leadSource: source,
      metadata,
    });

    let dealId: string | null = null;

    // Decide whether to create a deal.
    // Explicit `createDeal` overrides source-based defaults.
    const config = dealConfigForSource(source, dealAmount);
    const shouldCreateDeal =
      args.createDeal === undefined ? !!config : args.createDeal === true;

    if (shouldCreateDeal && contactId) {
      const cfg = config ?? {
        stage: 'appointmentscheduled',
        amount: typeof dealAmount === 'number' ? dealAmount : 0,
        name: (e: string) => `New lead — ${e} (${source})`,
      };

      dealId = await createDeal({
        contactEmail: email,
        dealName: cfg.name(email),
        dealStage: cfg.stage,
        amount: cfg.amount,
        metadata: { source, ...(metadata || {}) },
      });
    }

    // Timeline / note event (best-effort)
    await logTimelineEvent({
      contactEmail: email,
      eventType: `lead_${source}`,
      details: {
        source,
        website,
        industry,
        ...(metadata || {}),
      },
    });

    return { contactId, dealId };
  } catch (err) {
    console.error('[hubspot] syncLeadToHubSpot failed:', err);
    return { contactId: null, dealId: null };
  }
}
