import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 旧 WordPress 由来の trailing-slash 付き URL（例 `/blog/post/`）は、Next.js の
  // 既定の trailing-slash 正規化 308 → 後段の本 redirects 308 で 2-hop となる。
  // Google は 2-hop を許容するため SEO 実害は微小と判断し、サイト全体挙動への影響を
  // 避けるため `skipTrailingSlashRedirect: true` は採用しない。
  async redirects() {
    return [
      // 既存 WP のページ → 新サイトの対応ページ
      {
        source: '/company',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/service',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/press',
        destination: '/news',
        permanent: true,
      },
      // 既存 WP の廃止ページ群（新サイトに対応なし）→ トップへ集約 301
      {
        source: '/helpful/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/surely/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/document/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/e-magazine/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/article/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/register/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/speciallist/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
