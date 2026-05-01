import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
