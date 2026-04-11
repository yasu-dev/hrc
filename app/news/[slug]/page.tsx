import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { NEWS_ITEMS } from '@/data/news';

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
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = NEWS_ITEMS.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <>
      <PageHero title="News" subtitle={item.title} />
      <Container>
        <Breadcrumb items={[{ label: 'お知らせ', href: '/news' }, { label: item.title }]} />
      </Container>
      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <time className="text-muted-foreground text-sm" dateTime={item.date}>
              {item.date}
            </time>
            <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
              {item.category}
            </span>
          </div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: item.content }} />
        </Container>
      </section>
    </>
  );
}
