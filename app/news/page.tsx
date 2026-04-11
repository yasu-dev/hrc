import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { NewsCard } from '@/components/news/NewsCard';
import { NEWS_ITEMS } from '@/data/news';

export const metadata: Metadata = {
  title: 'お知らせ',
  description: 'HRtep株式会社のお知らせ・プレスリリース一覧。最新のニュースをお届けします。',
  openGraph: {
    title: 'お知らせ | HRtep株式会社',
    description: 'HRtep株式会社のお知らせ・プレスリリース一覧。最新のニュースをお届けします。',
  },
};

export default function NewsPage() {
  return (
    <>
      <PageHero title="News" subtitle="お知らせ" />
      <Container>
        <Breadcrumb items={[{ label: 'お知らせ' }]} />
      </Container>
      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <ul className="divide-y">
            {NEWS_ITEMS.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
