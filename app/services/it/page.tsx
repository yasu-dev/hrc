import type { Metadata } from 'next';
import { TrendingUp, Brain, Server, Globe, Settings, GraduationCap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CTABanner } from '@/components/ui/CTABanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IT_SERVICES, IT_FAQ } from '@/data/services';

export const metadata: Metadata = {
  title: 'IT事業',
  description:
    'DX支援・AI活用支援・システム開発・Webアプリ開発。企業のデジタル変革を戦略策定から開発・運用まで一貫して支援します。',
  openGraph: {
    title: 'IT事業 | ＨＲｔｅｐ株式会社',
    description:
      'DX支援・AI活用支援・システム開発・Webアプリ開発。企業のデジタル変革を戦略策定から開発・運用まで一貫して支援します。',
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Brain,
  Server,
  Globe,
  Settings,
  GraduationCap,
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: {
    '@type': 'Organization',
    name: 'ＨＲｔｅｐ株式会社',
  },
  serviceType: 'IT Consulting and Development',
  areaServed: 'JP',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IT事業サービス',
    itemListElement: IT_SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
      },
    })),
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: IT_FAQ.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function ItServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero title="IT Service" subtitle="IT事業" />
      <Container>
        <Breadcrumb items={[{ label: 'サービス一覧', href: '/services' }, { label: 'IT事業' }]} />
      </Container>

      <section className="py-20 md:py-28">
        <Container>
          <p className="text-muted-foreground mx-auto max-w-3xl text-center leading-relaxed">
            製造業の生産管理DX、物流の配送最適化、小売業の売上分析基盤など、業種ごとの課題に合わせたデジタル化を支援しています。現状業務のヒアリングから課題特定、PoC（概念実証）、本格導入、運用保守まで一貫して対応。30件以上のプロジェクト実績で培ったノウハウを活かし、投資対効果の高いIT戦略を実現します。
          </p>
        </Container>
      </section>

      <section className="bg-muted/30 py-20 md:py-28">
        <Container>
          <SectionHeading title="Services" subtitle="サービス内容" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {IT_SERVICES.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <div key={service.id} className="bg-card rounded-xl border p-6">
                  {Icon && <Icon className="text-primary size-8" />}
                  <h3 className="mt-3 text-lg font-bold">{service.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{service.description}</p>
                  <ul className="mt-4 space-y-1">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="text-muted-foreground before:text-primary text-sm before:mr-2 before:content-['•']"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <SectionHeading title="FAQ" subtitle="よくある質問" />
          <div className="space-y-6">
            {IT_FAQ.map((faq, i) => (
              <div key={i}>
                <h3 className="font-bold">Q. {faq.question}</h3>
                <p className="text-muted-foreground mt-2 text-sm">A. {faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
