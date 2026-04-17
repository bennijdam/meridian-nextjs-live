/**
 * SEO audit pipeline — fetches PageSpeed data, parses URL, scores, generates results.
 *
 * Flow:
 *   1. POST /api/audit → validates input, captures lead, queues audit
 *   2. This module runs the audit asynchronously
 *   3. Results are stored in the audit_jobs table
 *   4. Email is sent with results via Resend
 *
 * For PDF generation, install @react-pdf/renderer when ready.
 * For now, we send a structured HTML email with the audit results.
 */

export type AuditScore = {
  category: string;
  score: number;       // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  details: string;
};

export type AuditResult = {
  url: string;
  timestamp: string;
  overallScore: number;
  grade: string;
  scores: AuditScore[];
  quickWins: string[];
  pageSpeedMobile?: number;
  pageSpeedDesktop?: number;
  lcpMs?: number;
  clsScore?: number;
  inpMs?: number;
  schemaTypes?: string[];
  metaTitle?: string;
  metaDescription?: string;
  h1Count?: number;
  imageCount?: number;
  imagesWithoutAlt?: number;
  internalLinks?: number;
  externalLinks?: number;
};

function gradeFromScore(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A';
  if (score >= 70) return 'B';
  if (score >= 50) return 'C';
  if (score >= 30) return 'D';
  return 'F';
}

/**
 * Fetch PageSpeed Insights data for a URL.
 * Requires PAGESPEED_API_KEY env var.
 */
async function fetchPageSpeed(url: string, strategy: 'mobile' | 'desktop'): Promise<{
  score: number;
  lcpMs: number;
  clsScore: number;
  inpMs: number;
} | null> {
  const apiKey = process.env.PAGESPEED_API_KEY;
  if (!apiKey) {
    console.warn('[audit] PAGESPEED_API_KEY not set — using mock data');
    return { score: 65 + Math.floor(Math.random() * 30), lcpMs: 1800 + Math.floor(Math.random() * 2000), clsScore: Math.random() * 0.3, inpMs: 100 + Math.floor(Math.random() * 300) };
  }

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&key=${apiKey}&category=performance&category=seo&category=best-practices&category=accessibility`;
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return null;
    const data = await res.json();

    const perf = data.lighthouseResult?.categories?.performance?.score ?? 0;
    const lcp = data.lighthouseResult?.audits?.['largest-contentful-paint']?.numericValue ?? 0;
    const cls = data.lighthouseResult?.audits?.['cumulative-layout-shift']?.numericValue ?? 0;
    const inp = data.lighthouseResult?.audits?.['interaction-to-next-paint']?.numericValue ?? 0;

    return { score: Math.round(perf * 100), lcpMs: Math.round(lcp), clsScore: cls, inpMs: Math.round(inp) };
  } catch (e) {
    console.error('[audit] PageSpeed fetch failed:', e);
    return null;
  }
}

/**
 * Parse a URL and extract SEO signals.
 * Uses fetch + regex parsing (no cheerio dependency to keep it light).
 */
async function parseUrl(url: string): Promise<{
  metaTitle: string;
  metaDescription: string;
  h1Count: number;
  imageCount: number;
  imagesWithoutAlt: number;
  internalLinks: number;
  externalLinks: number;
  schemaTypes: string[];
  hasRobotsTxt: boolean;
  hasSitemap: boolean;
} | null> {
  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    const res = await fetch(fullUrl, {
      signal: AbortSignal.timeout(15000),
      headers: { 'User-Agent': 'MeridianAuditBot/1.0 (+https://meridian.london)' },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is);
    const h1Matches = html.match(/<h1[^>]*>/gi) || [];
    const imgMatches = html.match(/<img[^>]*>/gi) || [];
    const imgNoAlt = imgMatches.filter(img => !img.match(/alt=["'][^"']+["']/i));
    const linkMatches = html.match(/<a[^>]*href=["']([^"']*?)["']/gi) || [];
    const domain = new URL(fullUrl).hostname;
    const internal = linkMatches.filter(l => l.includes(domain) || l.match(/href=["']\//));
    const external = linkMatches.filter(l => !l.includes(domain) && !l.match(/href=["']\//));
    const schemaMatches = html.match(/"@type"\s*:\s*"([^"]+)"/g) || [];
    const schemaTypes = schemaMatches.map(m => m.replace(/"@type"\s*:\s*"/, '').replace('"', ''));

    return {
      metaTitle: titleMatch?.[1]?.trim() || '',
      metaDescription: descMatch?.[1]?.trim() || '',
      h1Count: h1Matches.length,
      imageCount: imgMatches.length,
      imagesWithoutAlt: imgNoAlt.length,
      internalLinks: internal.length,
      externalLinks: external.length,
      schemaTypes: [...new Set(schemaTypes)],
      hasRobotsTxt: false, // Would need separate fetch
      hasSitemap: false,   // Would need separate fetch
    };
  } catch (e) {
    console.error('[audit] URL parse failed:', e);
    return null;
  }
}

/**
 * Run a full SEO audit for a URL.
 * Returns structured results suitable for email or PDF rendering.
 */
export async function runAudit(url: string): Promise<AuditResult> {
  const fullUrl = url.startsWith('http') ? url : `https://${url}`;

  // Run PageSpeed + URL parsing in parallel
  const [psMobile, psDesktop, parsed] = await Promise.all([
    fetchPageSpeed(fullUrl, 'mobile'),
    fetchPageSpeed(fullUrl, 'desktop'),
    parseUrl(fullUrl),
  ]);

  const scores: AuditScore[] = [];

  // 1. Performance score
  const perfScore = psMobile?.score ?? 50;
  scores.push({
    category: 'Performance (Mobile)',
    score: perfScore,
    grade: gradeFromScore(perfScore),
    details: `Mobile PageSpeed score: ${perfScore}/100. LCP: ${psMobile?.lcpMs ?? 'N/A'}ms. CLS: ${(psMobile?.clsScore ?? 0).toFixed(2)}. INP: ${psMobile?.inpMs ?? 'N/A'}ms.`,
  });

  // 2. Meta tags
  const hasTitle = (parsed?.metaTitle?.length ?? 0) > 10 && (parsed?.metaTitle?.length ?? 0) < 70;
  const hasDesc = (parsed?.metaDescription?.length ?? 0) > 50 && (parsed?.metaDescription?.length ?? 0) < 170;
  const metaScore = (hasTitle ? 50 : 0) + (hasDesc ? 50 : 0);
  scores.push({
    category: 'Meta Tags',
    score: metaScore,
    grade: gradeFromScore(metaScore),
    details: `Title: ${parsed?.metaTitle ? `"${parsed.metaTitle.slice(0, 60)}..." (${parsed.metaTitle.length} chars)` : 'Missing'}. Description: ${parsed?.metaDescription ? `${parsed.metaDescription.length} chars` : 'Missing'}.`,
  });

  // 3. Heading structure
  const h1Score = parsed?.h1Count === 1 ? 100 : parsed?.h1Count === 0 ? 0 : 40;
  scores.push({
    category: 'Heading Structure',
    score: h1Score,
    grade: gradeFromScore(h1Score),
    details: `H1 tags found: ${parsed?.h1Count ?? 0}. ${parsed?.h1Count === 1 ? 'Correct — one H1 per page.' : parsed?.h1Count === 0 ? 'Missing H1 tag — critical SEO issue.' : 'Multiple H1s — should have exactly one.'}`,
  });

  // 4. Image optimisation
  const totalImages = parsed?.imageCount ?? 0;
  const noAlt = parsed?.imagesWithoutAlt ?? 0;
  const imgScore = totalImages === 0 ? 50 : Math.max(0, Math.round(((totalImages - noAlt) / totalImages) * 100));
  scores.push({
    category: 'Image Optimisation',
    score: imgScore,
    grade: gradeFromScore(imgScore),
    details: `${totalImages} images found. ${noAlt} missing alt text. ${imgScore >= 90 ? 'Good coverage.' : 'Add descriptive alt text to all images.'}`,
  });

  // 5. Schema markup
  const schemaScore = (parsed?.schemaTypes?.length ?? 0) >= 3 ? 100 : (parsed?.schemaTypes?.length ?? 0) >= 1 ? 60 : 0;
  scores.push({
    category: 'Schema Markup',
    score: schemaScore,
    grade: gradeFromScore(schemaScore),
    details: `Schema types found: ${parsed?.schemaTypes?.length ? parsed.schemaTypes.join(', ') : 'None'}. ${schemaScore >= 60 ? 'Basic schema present.' : 'Add Organization, LocalBusiness, FAQPage, Service schema.'}`,
  });

  // 6. Internal linking
  const linkScore = (parsed?.internalLinks ?? 0) >= 20 ? 100 : (parsed?.internalLinks ?? 0) >= 10 ? 70 : (parsed?.internalLinks ?? 0) >= 5 ? 40 : 10;
  scores.push({
    category: 'Internal Linking',
    score: linkScore,
    grade: gradeFromScore(linkScore),
    details: `${parsed?.internalLinks ?? 0} internal links, ${parsed?.externalLinks ?? 0} external links. ${linkScore >= 70 ? 'Good internal linking.' : 'Increase internal links to distribute authority.'}`,
  });

  // Overall score
  const overallScore = Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length);

  // Quick wins
  const quickWins: string[] = [];
  if (!hasTitle) quickWins.push('Add a meta title between 30-60 characters with your primary keyword');
  if (!hasDesc) quickWins.push('Add a meta description between 120-160 characters');
  if ((parsed?.h1Count ?? 0) !== 1) quickWins.push('Fix H1 tag — ensure exactly one H1 per page');
  if (noAlt > 0) quickWins.push(`Add alt text to ${noAlt} images missing descriptions`);
  if (schemaScore < 60) quickWins.push('Add Organization and LocalBusiness schema markup');
  if (perfScore < 70) quickWins.push('Improve mobile page speed — compress images, defer JS, enable caching');
  if ((psMobile?.lcpMs ?? 9999) > 2500) quickWins.push(`Reduce LCP from ${psMobile?.lcpMs}ms to under 2,500ms`);
  if ((psMobile?.clsScore ?? 1) > 0.1) quickWins.push('Fix layout shifts — set explicit width/height on images and embeds');
  if (linkScore < 70) quickWins.push('Add more internal links to key service and location pages');
  if ((parsed?.externalLinks ?? 0) < 3) quickWins.push('Add authoritative outbound links to .gov.uk, industry bodies, or research');

  return {
    url: fullUrl,
    timestamp: new Date().toISOString(),
    overallScore,
    grade: gradeFromScore(overallScore),
    scores,
    quickWins: quickWins.slice(0, 10),
    pageSpeedMobile: psMobile?.score,
    pageSpeedDesktop: psDesktop?.score,
    lcpMs: psMobile?.lcpMs,
    clsScore: psMobile?.clsScore,
    inpMs: psMobile?.inpMs,
    schemaTypes: parsed?.schemaTypes,
    metaTitle: parsed?.metaTitle,
    metaDescription: parsed?.metaDescription,
    h1Count: parsed?.h1Count,
    imageCount: parsed?.imageCount,
    imagesWithoutAlt: parsed?.imagesWithoutAlt,
    internalLinks: parsed?.internalLinks,
    externalLinks: parsed?.externalLinks,
  };
}

/**
 * Generate HTML email body from audit results.
 */
export function auditResultToEmail(result: AuditResult): string {
  const scoreColor = result.overallScore >= 80 ? '#65a30d' : result.overallScore >= 50 ? '#fbbf24' : '#ef4444';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
      <div style="background: linear-gradient(135deg, #0a0a14, #1a1a2e); padding: 40px 32px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: #fff; font-size: 28px; margin: 0 0 8px;">Your SEO Audit</h1>
        <p style="color: #b6b6c2; font-size: 14px; margin: 0;">${result.url}</p>
      </div>

      <div style="background: #fff; padding: 32px; border: 1px solid #e5e5e5;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; width: 80px; height: 80px; border-radius: 50%; background: ${scoreColor}; color: #fff; font-size: 32px; font-weight: 700; line-height: 80px;">${result.overallScore}</div>
          <p style="font-size: 18px; font-weight: 600; margin: 12px 0 4px;">Overall Score: ${result.grade}</p>
          <p style="font-size: 13px; color: #6b6b78;">Audited ${new Date(result.timestamp).toLocaleDateString('en-GB')}</p>
        </div>

        <h2 style="font-size: 18px; margin: 24px 0 16px; border-bottom: 1px solid #e5e5e5; padding-bottom: 8px;">Score Breakdown</h2>
        ${result.scores.map(s => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
            <span style="font-size: 14px;">${s.category}</span>
            <span style="font-size: 14px; font-weight: 600; color: ${s.score >= 80 ? '#65a30d' : s.score >= 50 ? '#fbbf24' : '#ef4444'};">${s.score}/100 (${s.grade})</span>
          </div>
          <p style="font-size: 12px; color: #6b6b78; margin: 4px 0 12px;">${s.details}</p>
        `).join('')}

        <h2 style="font-size: 18px; margin: 32px 0 16px; border-bottom: 1px solid #e5e5e5; padding-bottom: 8px;">Top ${result.quickWins.length} Quick Wins</h2>
        <ol style="padding-left: 20px;">
          ${result.quickWins.map(w => `<li style="font-size: 14px; margin-bottom: 10px; line-height: 1.5;">${w}</li>`).join('')}
        </ol>
      </div>

      <div style="background: #f8f8fc; padding: 24px 32px; border-radius: 0 0 16px 16px; text-align: center; border: 1px solid #e5e5e5; border-top: 0;">
        <p style="font-size: 14px; color: #4a4a5a; margin: 0 0 16px;">Want us to fix these issues? Meridian prices all services 40% below market.</p>
        <a href="https://meridian.london/pricing" style="display: inline-block; padding: 12px 24px; background: #0a0a14; color: #fff; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 14px;">View Pricing →</a>
      </div>
    </div>
  `;
}
