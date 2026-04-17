/**
 * Email layer — Resend.
 *
 * Free tier covers 3,000 emails/month. Set up:
 *   1. Add the domain in Resend dashboard
 *   2. Configure DNS (SPF, DKIM, MX)
 *   3. Verify, then create an API key with `Send` scope only
 */

import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.RESEND_FROM_EMAIL || 'audits@meridianweb.co.uk';
const REPLY_TO = process.env.RESEND_REPLY_TO || 'hello@meridianweb.co.uk';

export async function sendAuditConfirmation(args: {
  to: string;
  url: string;
  industry?: string;
}) {
  const { to, url, industry } = args;

  if (!resend) {
    console.info('[email] RESEND_API_KEY not set — audit confirmation skipped', { to, url });
    return;
  }

  return resend.emails.send({
    from: `Meridian Audits <${FROM}>`,
    to,
    replyTo: REPLY_TO,
    subject: `Your free SEO audit for ${url} is being prepared`,
    html: htmlAuditConfirmation({ url, industry }),
    text: textAuditConfirmation({ url, industry }),
    headers: {
      'List-Unsubscribe': `<mailto:${REPLY_TO}?subject=unsubscribe>`,
    },
    tags: [
      { name: 'category', value: 'audit_confirmation' },
      { name: 'industry', value: industry || 'unknown' },
    ],
  });
}

export async function notifySlackOfLead(args: {
  email: string;
  url: string;
  industry?: string;
  source: string;
}) {
  const webhook = process.env.SLACK_LEADS_WEBHOOK_URL;
  if (!webhook) return;

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🎯 New audit request`,
      blocks: [
        { type: 'section', text: { type: 'mrkdwn', text: `*🎯 New audit request*\n*Email:* ${args.email}\n*URL:* ${args.url}\n*Industry:* ${args.industry || 'not specified'}\n*Source:* ${args.source}` } },
      ],
    }),
  }).catch((err) => console.error('Slack notification failed:', err));
}

function htmlAuditConfirmation({ url, industry }: { url: string; industry?: string }) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Your audit is being prepared</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f7;margin:0;padding:32px 16px;color:#1f2937">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:40px;border:1px solid #e5e7eb">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:30px">
    <div style="width:32px;height:32px;background:linear-gradient(135deg,#5b8cff,#ff5be3);border-radius:50%"></div>
    <strong style="font-size:18px">Meridian</strong>
  </div>
  <h1 style="font-size:26px;margin:0 0 16px;letter-spacing:-0.02em">Your free SEO audit is being prepared</h1>
  <p style="font-size:15px;line-height:1.6;margin:0 0 16px">Hi there,</p>
  <p style="font-size:15px;line-height:1.6;margin:0 0 16px">Thanks for requesting an audit of <strong>${url}</strong>. Our system is right now running a full technical SEO scan against the top 100 ranking sites in your category${industry ? ` (${industry})` : ''}.</p>
  <p style="font-size:15px;line-height:1.6;margin:0 0 16px">You'll receive your 12-page PDF audit with a 90-day quick-win roadmap within the next 5 minutes.</p>
  <p style="font-size:15px;line-height:1.6;margin:0 0 24px">In the meantime, here's what we'll be checking:</p>
  <ul style="font-size:14px;line-height:1.8;color:#475569;margin:0 0 28px;padding-left:20px">
    <li>Core Web Vitals — LCP, INP, CLS</li>
    <li>Schema.org and structured data coverage</li>
    <li>AI Overview &amp; ChatGPT citation readiness (GEO/AEO)</li>
    <li>Keyword gaps versus your top 5 London competitors</li>
    <li>Backlink profile and authority signals</li>
  </ul>
  <a href="https://www.meridianweb.co.uk/services/seo-london" style="display:inline-block;padding:14px 24px;background:#0f172a;color:#fff;border-radius:999px;text-decoration:none;font-weight:500;font-size:14px">See our SEO services</a>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 20px">
  <p style="font-size:12px;color:#6b6b78;line-height:1.6;margin:0">Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF · Company No. 09876543<br>You received this email because you requested a free SEO audit at meridianweb.co.uk. <a href="mailto:${REPLY_TO}?subject=unsubscribe" style="color:#6b6b78">Unsubscribe</a></p>
</div>
</body></html>`;
}

function textAuditConfirmation({ url, industry }: { url: string; industry?: string }) {
  return `Your free SEO audit is being prepared

Hi there,

Thanks for requesting an audit of ${url}. Our system is right now running a full technical SEO scan against the top 100 ranking sites in your category${industry ? ` (${industry})` : ''}.

You'll receive your 12-page PDF audit with a 90-day quick-win roadmap within the next 5 minutes.

In the meantime, here's what we'll be checking:
- Core Web Vitals — LCP, INP, CLS
- Schema.org and structured data coverage
- AI Overview & ChatGPT citation readiness (GEO/AEO)
- Keyword gaps versus your top 5 London competitors
- Backlink profile and authority signals

See our SEO services: https://www.meridianweb.co.uk/services/seo-london

—
Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF · Company No. 09876543
Unsubscribe: mailto:${REPLY_TO}?subject=unsubscribe`;
}

/**
 * Send the actual audit results email with full HTML report.
 */
export async function sendAuditResults(args: {
  to: string;
  url: string;
  auditHtml: string;
}) {
  if (!resend) {
    console.info('[email] RESEND_API_KEY not set — audit results not sent', { to: args.to, url: args.url });
    return;
  }

  await resend.emails.send({
    from: FROM,
    to: args.to,
    replyTo: REPLY_TO,
    subject: `Your SEO Audit Results — ${args.url}`,
    html: args.auditHtml,
    text: `Your SEO audit for ${args.url} is ready. View the full results at https://www.meridianweb.co.uk/audit`,
  });
}

/**
 * Send a lead-magnet delivery email with the direct download link.
 * Triggered from /api/download after successful lead capture.
 */
export async function sendLeadMagnetDelivery(args: {
  to: string;
  magnetTitle: string;
  downloadUrl: string;
}) {
  const { to, magnetTitle, downloadUrl } = args;

  if (!resend) {
    console.info('[email] RESEND_API_KEY not set — lead-magnet delivery skipped', { to, magnetTitle });
    return;
  }

  return resend.emails.send({
    from: `Meridian Resources <${FROM}>`,
    to,
    replyTo: REPLY_TO,
    subject: `Your free copy of ${magnetTitle}`,
    html: htmlLeadMagnetDelivery({ magnetTitle, downloadUrl }),
    text: textLeadMagnetDelivery({ magnetTitle, downloadUrl }),
    headers: {
      'List-Unsubscribe': `<mailto:${REPLY_TO}?subject=unsubscribe>`,
    },
    tags: [
      { name: 'category', value: 'lead_magnet_delivery' },
    ],
  });
}

function htmlLeadMagnetDelivery({ magnetTitle, downloadUrl }: { magnetTitle: string; downloadUrl: string }) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Your free copy of ${magnetTitle}</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f7;margin:0;padding:32px 16px;color:#1f2937">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:40px;border:1px solid #e5e7eb">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:30px">
    <div style="width:32px;height:32px;background:linear-gradient(135deg,#5b8cff,#ff5be3);border-radius:50%"></div>
    <strong style="font-size:18px">Meridian</strong>
  </div>
  <h1 style="font-size:26px;margin:0 0 16px;letter-spacing:-0.02em">Your free copy of ${magnetTitle}</h1>
  <p style="font-size:15px;line-height:1.6;margin:0 0 16px">Hi there,</p>
  <p style="font-size:15px;line-height:1.6;margin:0 0 20px">Thanks for downloading <strong>${magnetTitle}</strong>. Your copy is attached to this email (and linked below, in case the attachment gets filtered).</p>
  <p style="margin:0 0 28px">
    <a href="${downloadUrl}" style="display:inline-block;padding:14px 24px;background:#0f172a;color:#fff;border-radius:999px;text-decoration:none;font-weight:500;font-size:14px">Download your copy →</a>
  </p>
  <p style="font-size:15px;line-height:1.6;margin:0 0 16px">A couple of things worth knowing:</p>
  <ul style="font-size:14px;line-height:1.8;color:#475569;margin:0 0 28px;padding-left:20px">
    <li>The file is free to share with your team — just keep it internal.</li>
    <li>Got a question about applying it? Hit reply. A real person reads these.</li>
    <li>Want personalised advice? We offer a free 90-second SEO audit.</li>
  </ul>
  <a href="https://www.meridianweb.co.uk/audit" style="display:inline-block;padding:14px 24px;background:#fff;border:1px solid #e5e7eb;color:#0f172a;border-radius:999px;text-decoration:none;font-weight:500;font-size:14px">Get a free audit</a>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 20px">
  <p style="font-size:12px;color:#6b6b78;line-height:1.6;margin:0">Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF · Company No. 09876543<br>You received this email because you requested a free resource at meridianweb.co.uk. <a href="mailto:${REPLY_TO}?subject=unsubscribe" style="color:#6b6b78">Unsubscribe</a></p>
</div>
</body></html>`;
}

function textLeadMagnetDelivery({ magnetTitle, downloadUrl }: { magnetTitle: string; downloadUrl: string }) {
  return `Your free copy of ${magnetTitle}

Hi there,

Thanks for downloading ${magnetTitle}. Download your copy here:

${downloadUrl}

A couple of things worth knowing:
- The file is free to share with your team — just keep it internal.
- Got a question about applying it? Hit reply. A real person reads these.
- Want personalised advice? We offer a free 90-second SEO audit: https://www.meridianweb.co.uk/audit

—
Meridian Digital Ltd · 1 Finsbury Avenue, London EC2M 2PF · Company No. 09876543
Unsubscribe: mailto:${REPLY_TO}?subject=unsubscribe`;
}
