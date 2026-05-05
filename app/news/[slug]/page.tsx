import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { NEWS_ITEMS } from '@/data/news';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return NEWS_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = NEWS_ITEMS.find((n) => n.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: {
      title: `${item.title} | ＨＲｔｅｐ株式会社`,
      description: item.excerpt,
      type: 'article',
      publishedTime: new Date(item.date).toISOString(),
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = NEWS_ITEMS.find((n) => n.slug === slug);
  if (!item) notFound();

  const newsArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.excerpt,
    image: `${SITE_URL}/news/${item.slug}/opengraph-image`,
    datePublished: new Date(item.date).toISOString(),
    dateModified: new Date(item.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo-current.png`,
        width: 595,
        height: 109,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/news/${item.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />
      <PageHero title="News" subtitle={item.title} />
      <Container>
        <Breadcrumb items={[{ label: 'お知らせ', href: '/news' }, { label: item.title }]} />
      </Container>
      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <article>
            <div className="mb-6 flex items-center gap-3">
              <time className="text-muted-foreground text-sm" dateTime={item.date}>
                {item.date}
              </time>
              <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
                {item.category}
              </span>
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: item.content }} />
          </article>
        </Container>
      </section>
    </>
  );
}
