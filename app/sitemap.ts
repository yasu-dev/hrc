import type { MetadataRoute } from 'next';
import { NEWS_ITEMS } from '@/data/news';

const BASE_URL = 'https://hrtep.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '', priority: 1.0 },
    { path: '/about', priority: 0.8 },
    { path: '/services', priority: 0.8 },
    { path: '/services/hr', priority: 0.7 },
    { path: '/services/it', priority: 0.7 },
    { path: '/portfolio', priority: 0.7 },
    { path: '/news', priority: 0.6 },
    { path: '/contact', priority: 0.6 },
    { path: '/privacy', priority: 0.3 },
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
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page.priority,
    })),
    ...newsPages,
  ];
}
