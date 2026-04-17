import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CTABanner } from '@/components/ui/CTABanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HR_SERVICES, HR_FAQ } from '@/data/services';
import { Users, ClipboardList, GraduationCap, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: '外国人材事業',
  description:
    'ＨＲｔｅｐプラットフォームを活用した外国人材の採用広報支援・採用実務支援。企業の外国人材採用を総合的にサポートします。',
  openGraph: {
    title: '外国人材事業 | HRtep株式会社',
    description:
      'ＨＲｔｅｐプラットフォームを活用した外国人材の採用広報支援・採用実務支援。企業の外国人材採用を総合的にサポートします。',
  },
};

const icons = [Users, ClipboardList, GraduationCap, Briefcase];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HR_FAQ.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function HrServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero title="HR Service" subtitle="外国人材事業" />
      <Container>
        <Breadcrumb
          items={[{ label: 'サービス一覧', href: '/services' }, { label: '外国人材事業' }]}
        />
      </Container>

      <section className="py-20 md:py-28">
        <Container>
          <p className="text-muted-foreground mx-auto max-w-3xl text-center leading-relaxed">
            ベトナム・ミャンマー・インドネシア・フィリピンなど東南アジアを中心に、製造業・IT・サービス業・建設業など幅広い業種に対して、外国人材の採用広報支援・採用実務支援を行っています。ＨＲｔｅｐプラットフォームを活用し、求人情報の整備、応募受付支援、面接調整支援、在留資格申請に関する支援、来日前後の研修、入社後の定着フォローまでを一貫して支援します。
          </p>
        </Container>
      </section>

      <section className="bg-muted/30 py-20 md:py-28">
        <Container>
          <SectionHeading title="Services" subtitle="サービス内容" />
          <div className="grid gap-6 md:grid-cols-2">
            {HR_SERVICES.map((service, i) => {
              const Icon = icons[i];
              return (
                <div key={service.title} className="bg-card rounded-xl border p-6">
                  <Icon className="text-primary size-8" />
                  <h3 className="mt-3 text-lg font-bold">{service.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{service.description}</p>
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
            {HR_FAQ.map((faq, i) => (
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
