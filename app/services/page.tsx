import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CTABanner } from '@/components/ui/CTABanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/services/ServiceCard';
import { SERVICE_CATEGORIES } from '@/data/services';

export const metadata: Metadata = {
  title: 'サービス一覧',
  description:
    'ＨＲｔｅｐ株式会社のサービス一覧。外国人材事業とIT事業（DX支援・AI活用支援・システム開発・Webアプリ開発）をご紹介します。',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'サービス一覧 | ＨＲｔｅｐ株式会社',
    description:
      'ＨＲｔｅｐ株式会社のサービス一覧。外国人材事業とIT事業（DX支援・AI活用支援・システム開発・Webアプリ開発）をご紹介します。',
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Services" subtitle="サービス一覧" />
      <Container>
        <Breadcrumb items={[{ label: 'サービス一覧' }]} />
      </Container>
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading title="Our Services" subtitle="事業領域" />
          <div className="grid gap-8 md:grid-cols-2">
            {SERVICE_CATEGORIES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
