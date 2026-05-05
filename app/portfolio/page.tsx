import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CTABanner } from '@/components/ui/CTABanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { PORTFOLIO_ITEMS } from '@/data/portfolio';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'ポートフォリオ',
  description:
    'ＨＲｔｅｐ株式会社のIT事業の実績一覧。DX支援・AI活用支援・システム開発・Webアプリ開発のプロジェクト事例をご紹介します。',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'ポートフォリオ | ＨＲｔｅｐ株式会社',
    description:
      'ＨＲｔｅｐ株式会社のIT事業の実績一覧。DX支援・AI活用支援・システム開発・Webアプリ開発のプロジェクト事例をご紹介します。',
  },
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'IT事業 導入実績',
  description: 'ＨＲｔｅｐ株式会社のIT事業におけるDX支援・AI活用・システム開発の事例一覧',
  numberOfItems: PORTFOLIO_ITEMS.length,
  itemListElement: PORTFOLIO_ITEMS.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      name: item.title,
      description: item.description,
      about: item.industry,
      genre: item.categoryLabel,
      keywords: item.techStack.join(', '),
      creator: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  })),
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <PageHero title="Portfolio" subtitle="ポートフォリオ" />
      <Container>
        <Breadcrumb items={[{ label: 'ポートフォリオ' }]} />
      </Container>
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading title="Case Studies" subtitle="実績一覧" />
          <PortfolioGrid />
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
