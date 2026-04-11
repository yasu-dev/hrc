import { HeroSection } from '@/components/home/HeroSection';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { NumbersSection } from '@/components/home/NumbersSection';
import { PortfolioHighlight } from '@/components/home/PortfolioHighlight';
import { NewsSection } from '@/components/home/NewsSection';
import { CTASection } from '@/components/home/CTASection';
import { SITE_URL, COMPANY } from '@/lib/constants';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HRtep株式会社',
  alternateName: 'HRtep Co., Ltd.',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-current.png`,
  telephone: COMPANY.tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '京橋3-12-1 エコー京橋ビル 5階',
    addressLocality: '中央区',
    addressRegion: '東京都',
    postalCode: '104-0031',
    addressCountry: 'JP',
  },
  description:
    '外国人材紹介とIT事業（DX支援・AI活用支援・システム開発・Webアプリ開発）で企業の成長を支援するHRtep株式会社です。',
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <HeroSection />
      <ServicesOverview />
      <NumbersSection />
      <PortfolioHighlight />
      <NewsSection />
      <CTASection />
    </>
  );
}
