import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CTABanner } from '@/components/ui/CTABanner';
import { MessageSection } from '@/components/about/MessageSection';
import { PhilosophySection } from '@/components/about/PhilosophySection';
import { VisionSection } from '@/components/about/VisionSection';
import { OutlineSection } from '@/components/about/OutlineSection';
import { AccessSection } from '@/components/about/AccessSection';
import { SITE_URL, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: '会社概要',
  description: `${COMPANY.name}の企業情報。代表挨拶、経営理念、ビジョン、会社概要、アクセス情報をご紹介します。`,
  openGraph: {
    title: '会社概要 | HRtep株式会社',
    description: `${COMPANY.name}の企業情報。代表挨拶、経営理念、ビジョン、会社概要、アクセス情報をご紹介します。`,
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'HRtep株式会社',
  url: SITE_URL,
  telephone: COMPANY.tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '京橋3-12-1 エコー京橋ビル 5階',
    addressLocality: '中央区',
    addressRegion: '東京都',
    postalCode: '104-0031',
    addressCountry: 'JP',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <PageHero title="About" subtitle="会社概要" />
      <Container>
        <Breadcrumb items={[{ label: '会社概要' }]} />
      </Container>
      <MessageSection />
      <PhilosophySection />
      <VisionSection />
      <OutlineSection />
      <AccessSection />
      <CTABanner />
    </>
  );
}
