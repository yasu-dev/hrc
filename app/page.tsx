import { HeroSection } from '@/components/home/HeroSection';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { NumbersSection } from '@/components/home/NumbersSection';
import { PortfolioHighlight } from '@/components/home/PortfolioHighlight';
import { NewsSection } from '@/components/home/NewsSection';
import { CTASection } from '@/components/home/CTASection';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, COMPANY } from '@/lib/constants';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: SITE_NAME,
  alternateName: 'ＨＲｔｅｐ Co., Ltd.',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-current.png`,
  image: `${SITE_URL}/opengraph-image`,
  telephone: COMPANY.tel,
  foundingDate: '2021-09-01',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '京橋3-12-1 エコー京橋ビル 5階',
    addressLocality: '中央区',
    addressRegion: '東京都',
    postalCode: '104-0031',
    addressCountry: 'JP',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: COMPANY.tel,
      url: `${SITE_URL}/contact`,
      areaServed: 'JP',
      availableLanguage: ['Japanese', 'English'],
    },
  ],
  knowsAbout: [
    '外国人材採用',
    '在留資格',
    '特定技能',
    'DX支援',
    'AI活用支援',
    'システム開発',
    'Webアプリ開発',
  ],
  description:
    '外国人材採用支援とIT事業（DX支援・AI活用支援・システム開発・Webアプリ開発）で企業の成長を支援するＨＲｔｅｐ株式会社です。',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'ja',
  publisher: { '@id': `${SITE_URL}#organization` },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
