/**
 * POST /api/leads
 *
 * Generic email capture (footer CTA, exit intent, etc.).
 */

import { NextResponse } from 'next/server';
import { db, leads, hasDatabase } from '@/lib/db';
import { leadSchema, leadLimiter, getClientIp } from '@/lib/security';
import { notifySlackOfLead } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, name, source, website } = parsed.data;
    if (website && website.length > 0) {
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    const ip = getClientIp(req.headers);
    const limit = await leadLimiter.limit(`ip:${ip}`);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': '3600' } }
      );
    }

    if (hasDatabase) {
      await db.insert(leads).values({
        email,
        source,
        metadata: {
          name: name ?? null,
          ip,
          userAgent: req.headers.get('user-agent') || null,
          referer: req.headers.get('referer') || null,
        },
      });
    } else {
      console.info('[leads] Local demo mode — skipping DB write', {
        email,
        source,
        ip,
      });
    }

    notifySlackOfLead({ email, url: '', source }).catch(() => null);

    // Fire-and-forget HubSpot sync — never block the response on CRM.
    import('@/lib/hubspot').then(({ syncLeadToHubSpot }) =>
      syncLeadToHubSpot({
        email,
        name,
        source,
        createDeal: false,
      })
    ).catch(() => null);

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (err) {
    console.error('Leads endpoint error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
