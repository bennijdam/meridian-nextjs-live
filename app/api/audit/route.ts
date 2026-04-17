/**
 * POST /api/audit
 *
 * Captures a free-audit lead, fires confirmation email, kicks off audit job.
 *
 * Pipeline:
 *   1. Validate input (Zod) + honeypot check
 *   2. Rate-limit by email (5/hr) and IP (20/hr)
 *   3. Persist lead + audit_job rows in Neon
 *   4. Send confirmation email via Resend
 *   5. Notify Slack
 *   6. Enqueue actual audit (PageSpeed Insights API + crawler) — TODO
 */

import { NextResponse } from 'next/server';
import { db, leads, auditJobs, hasDatabase } from '@/lib/db';
import { auditRequestSchema, auditLimiter, leadLimiter, getClientIp } from '@/lib/security';
import { sendAuditConfirmation, notifySlackOfLead } from '@/lib/email';

export const runtime = 'nodejs'; // Resend SDK needs Node runtime
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const startedAt = Date.now();

  try {
    // 1. Parse + validate
    const body = await req.json().catch(() => null);
    const parsed = auditRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { url, email, industry, website } = parsed.data;

    // Honeypot — silently accept but don't process
    if (website && website.length > 0) {
      return NextResponse.json({ ok: true, audit_id: 'queued' }, { status: 202 });
    }

    // 2. Rate limit
    const ip = getClientIp(req.headers);
    const [emailLimit, ipLimit] = await Promise.all([
      auditLimiter.limit(`email:${email}`),
      leadLimiter.limit(`ip:${ip}`),
    ]);

    if (!emailLimit.success || !ipLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '3600' } }
      );
    }

    // 3. Persist (or fall back to local demo mode until Neon is configured)
    let leadId = crypto.randomUUID();
    let jobId = crypto.randomUUID();

    if (hasDatabase) {
      const [lead] = await db.insert(leads).values({
        email,
        url,
        industry,
        source: 'homepage_audit_form',
        metadata: {
          ip,
          userAgent: req.headers.get('user-agent') || null,
          referer: req.headers.get('referer') || null,
          utm: extractUtm(req.headers.get('referer')),
        },
      }).returning({ id: leads.id });

      leadId = lead.id;

      const [job] = await db.insert(auditJobs).values({
        leadId,
        url,
        status: 'queued',
      }).returning({ id: auditJobs.id });

      jobId = job.id;
    } else {
      console.info('[audit] Local demo mode — skipping DB write', {
        email,
        url,
        industry,
        ip,
      });
    }

    // 4 + 5. Fire-and-forget side effects (include HubSpot)
    Promise.all([
      sendAuditConfirmation({ to: email, url, industry }),
      notifySlackOfLead({ email, url, industry, source: 'audit_form' }),
      import('@/lib/hubspot').then(({ syncLeadToHubSpot }) =>
        syncLeadToHubSpot({
          email,
          industry,
          website: url,
          source: 'audit_form',
          createDeal: true,
          metadata: { auditJobId: jobId, leadId },
        })
      ),
    ]).catch(err => console.error('Audit side-effects failed:', err));

    // 6. Run audit asynchronously (fire-and-forget — don't block response)
    import('@/lib/audit-pipeline').then(async ({ runAudit, auditResultToEmail }) => {
      try {
        const result = await runAudit(url);
        // Send audit results email
        const { sendAuditResults } = await import('@/lib/email');
        await sendAuditResults({ to: email, url, auditHtml: auditResultToEmail(result) });
        console.info(`[audit] Completed for ${url} — score: ${result.overallScore}/100`);
      } catch (err) {
        console.error('[audit] Pipeline failed:', err);
      }
    });

    return NextResponse.json({
      ok: true,
      audit_id: jobId,
      message: 'Audit queued — check your inbox in a moment.',
      duration_ms: Date.now() - startedAt,
    }, { status: 202 });

  } catch (err) {
    console.error('Audit endpoint error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function extractUtm(referer: string | null): Record<string, string> | null {
  if (!referer) return null;
  try {
    const u = new URL(referer);
    const out: Record<string, string> = {};
    for (const [k, v] of u.searchParams) {
      if (k.startsWith('utm_')) out[k] = v;
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}
