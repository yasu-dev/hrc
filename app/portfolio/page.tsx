import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CTABanner } from '@/components/ui/CTABanner';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';

export const metadata: Metadata = {
  title: 'ポートフォリオ',
  description:
    'HRtep株式会社のIT事業の実績一覧。DX支援・AI活用支援・システム開発・Webアプリ開発のプロジェクト事例をご紹介します。',
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero title="Portfolio" subtitle="ポートフォリオ" />
      <Container>
        <Breadcrumb items={[{ label: 'ポートフォリオ' }]} />
      </Container>
      <section className="py-20 md:py-28">
        <Container>
          <PortfolioGrid />
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
