/**
 * Rate limiting via Upstash Redis. Free tier covers 10k commands/day.
 *
 * Apply to /api/audit and /api/leads to prevent abuse.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { z } from 'zod';

const hasRedisConfig = Boolean(
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN &&
  !process.env.UPSTASH_REDIS_REST_URL.includes('xxx.upstash.io') &&
  !process.env.UPSTASH_REDIS_REST_TOKEN.includes('xxxxxxxx')
);

export const redis = hasRedisConfig ? Redis.fromEnv() : null;

const noopLimiter = {
  async limit() {
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: Date.now() + 60 * 60 * 1000,
      pending: Promise.resolve(),
    };
  },
};

// 5 audit requests per email per hour
export const auditLimiter = hasRedisConfig
  ? new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(5, '1 h'),
      prefix: 'rl:audit',
    })
  : noopLimiter;

// 20 lead-form submissions per IP per hour
export const leadLimiter = hasRedisConfig
  ? new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(20, '1 h'),
      prefix: 'rl:lead',
    })
  : noopLimiter;

// ===== Validation =====

export const auditRequestSchema = z.object({
  url: z.string().min(3).max(2048).transform((v) => {
    // normalise: ensure protocol, lowercase host
    let u = v.trim();
    if (!u.match(/^https?:\/\//i)) u = `https://${u}`;
    try {
      const parsed = new URL(u);
      parsed.hash = '';
      return parsed.toString();
    } catch {
      throw new Error('Invalid URL');
    }
  }),
  email: z.string().email().max(320).toLowerCase(),
  industry: z.string().max(64).optional(),
  // honeypot — bots fill this; humans don't see it
  website: z.string().max(0).optional().or(z.literal('')),
});

export const leadSchema = z.object({
  email: z.string().email().max(320).toLowerCase(),
  name: z.string().max(120).optional(),
  source: z.string().max(64).default('homepage_footer'),
  website: z.string().max(0).optional().or(z.literal('')),
});

export type AuditRequest = z.infer<typeof auditRequestSchema>;
export type LeadInput = z.infer<typeof leadSchema>;

// ===== Helper to read client IP behind Vercel/Cloudflare =====

export function getClientIp(headers: Headers): string {
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}
