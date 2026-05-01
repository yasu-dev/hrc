import type { MetadataRoute } from 'next';
import { execSync } from 'node:child_process';
import { NEWS_ITEMS } from '@/data/news';

const BASE_URL = 'https://hrtep.com';

function gitLastModified(...paths: string[]): Date {
  try {
    const result = execSync(`git log -1 --format=%cI -- ${paths.map((p) => `"${p}"`).join(' ')}`, {
      encoding: 'utf8',
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return result ? new Date(result) : new Date();
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: { path: string; priority: number; sources: string[] }[] = [
    { path: '', priority: 1.0, sources: ['app/page.tsx', 'components/home', 'data'] },
    {
      path: '/about',
      priority: 0.8,
      sources: ['app/about/page.tsx', 'components/about', 'data/about.ts'],
    },
    { path: '/services', priority: 0.8, sources: ['app/services/page.tsx', 'data/services.ts'] },
    {
      path: '/services/hr',
      priority: 0.7,
      sources: ['app/services/hr/page.tsx', 'data/services.ts'],
    },
    {
      path: '/services/it',
      priority: 0.7,
      sources: ['app/services/it/page.tsx', 'data/services.ts'],
    },
    {
      path: '/portfolio',
      priority: 0.7,
      sources: ['app/portfolio/page.tsx', 'components/portfolio', 'data/portfolio.ts'],
    },
    {
      path: '/news',
      priority: 0.6,
      sources: ['app/news/page.tsx', 'components/news', 'data/news.ts'],
    },
    {
      path: '/contact',
      priority: 0.6,
      sources: ['app/contact/page.tsx', 'components/contact', 'lib/validation.ts'],
    },
    { path: '/privacy', priority: 0.3, sources: ['app/privacy/page.tsx'] },
  ];

  const newsPages = NEWS_ITEMS.map((item) => ({
    url: `${BASE_URL}/news/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      lastModified: gitLastModified(...page.sources),
      changeFrequency: 'monthly' as const,
      priority: page.priority,
    })),
    ...newsPages,
  ];
}
