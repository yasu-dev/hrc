import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { NewsCard } from '@/components/news/NewsCard';
import { NEWS_ITEMS } from '@/data/news';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

const sortedNews = [...NEWS_ITEMS].sort((a, b) => b.date.localeCompare(a.date));

export const metadata: Metadata = {
  title: 'お知らせ',
  description: 'ＨＲｔｅｐ株式会社のお知らせ・プレスリリース一覧。最新のニュースをお届けします。',
  alternates: { canonical: '/news' },
  openGraph: {
    title: 'お知らせ | ＨＲｔｅｐ株式会社',
    description: 'ＨＲｔｅｐ株式会社のお知らせ・プレスリリース一覧。最新のニュースをお届けします。',
  },
};

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/news`,
  url: `${SITE_URL}/news`,
  name: 'お知らせ一覧',
  description: 'ＨＲｔｅｐ株式会社のお知らせ・プレスリリース一覧',
  inLanguage: 'ja',
  isPartOf: { '@id': `${SITE_URL}#website` },
  publisher: { '@id': `${SITE_URL}#organization` },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: sortedNews.length,
    itemListElement: sortedNews.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/news/${item.slug}`,
      item: {
        '@type': 'NewsArticle',
        headline: item.title,
        description: item.excerpt,
        datePublished: new Date(item.date).toISOString(),
        url: `${SITE_URL}/news/${item.slug}`,
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    })),
  },
};

export default function NewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <PageHero title="News" subtitle="お知らせ" />
      <Container>
        <Breadcrumb items={[{ label: 'お知らせ' }]} />
      </Container>
      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <ul className="divide-y">
            {sortedNews.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
