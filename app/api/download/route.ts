/**
 * POST /api/download
 *
 * Email-gated lead magnet capture endpoint.
 *
 * Flow:
 *   1. Validate the payload (Zod)
 *   2. Drop bots via the honeypot field
 *   3. Rate limit by IP (20/hour shared with other lead forms)
 *   4. Persist the lead if the DB is configured
 *   5. Email the download link via Resend
 *   6. Notify Slack
 *   7. Return { ok, downloadUrl }
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db, leads, hasDatabase } from '@/lib/db';
import { leadLimiter, getClientIp } from '@/lib/security';
import { notifySlackOfLead, sendLeadMagnetDelivery } from '@/lib/email';
import { getLeadMagnet } from '@/lib/lead-magnets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  email: z.string().email().max(320).toLowerCase(),
  name: z.string().max(120).optional(),
  company: z.string().max(160).optional(),
  magnetSlug: z.string().min(1).max(80),
  source: z.string().max(80).optional(),
  // Honeypot — humans leave blank, bots fill it.
  website: z.string().max(0).optional().or(z.literal('')),
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.meridianweb.co.uk';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, name, company, magnetSlug, website } = parsed.data;

    // Honeypot — silent accept so bots never know.
    if (website && website.length > 0) {
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    const magnet = getLeadMagnet(magnetSlug);
    if (!magnet) {
      return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });
    }

    // Rate limit by IP.
    const ip = getClientIp(req.headers);
    const limit = await leadLimiter.limit(`ip:${ip}`);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Too many requests — please try again later.' },
        { status: 429, headers: { 'Retry-After': '3600' } }
      );
    }

    const source = parsed.data.source || `download_${magnetSlug}`;

    // Persist lead.
    if (hasDatabase) {
      await db.insert(leads).values({
        email,
        source,
        metadata: {
          name: name ?? null,
          company: company ?? null,
          magnetSlug,
          magnetTitle: magnet.title,
          ip,
          userAgent: req.headers.get('user-agent') || null,
          referer: req.headers.get('referer') || null,
        },
      });
    } else {
      console.info('[download] Local demo mode — skipping DB write', {
        email,
        magnetSlug,
        source,
      });
    }

    const downloadPath = `/api/download/${encodeURIComponent(magnet.downloadFilename)}?email=${encodeURIComponent(email)}`;
    const downloadUrl = `${SITE_URL}${downloadPath}`;

    // Email + Slack — fire and forget; failures shouldn't block the download.
    sendLeadMagnetDelivery({
      to: email,
      magnetTitle: magnet.title,
      downloadUrl,
    }).catch((err) => console.error('[download] Resend failed:', err));

    notifySlackOfLead({ email, url: magnet.title, source }).catch(() => null);

    return NextResponse.json(
      { ok: true, downloadUrl: downloadPath },
      { status: 202 }
    );
  } catch (err) {
    console.error('[download] Endpoint error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
