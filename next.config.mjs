/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization — AVIF first, WebP fallback. Massive payload savings.
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 768, 1024, 1200, 1440, 1920, 2400],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year — images are immutable when versioned
  },

  // Compression
  compress: true,

  // Server Components are the default in App Router; nothing to enable.

  // Security + SEO + AI-crawler-friendly headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control',    value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
        ],
      },
      {
        // Long-cache versioned static assets
        source: '/img/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type',  value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' },
        ],
      },
    ];
  },

  // Redirect www → apex (Cloudflare/Vercel will also enforce HTTPS)
  async redirects() {
    return [
      { source: '/home',  destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
