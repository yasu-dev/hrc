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
    'HRtepプラットフォームを活用した外国人材紹介・就労マッチング。有料職業紹介事業として企業と外国籍人財をつなぎます。',
  openGraph: {
    title: '外国人材事業 | HRtep株式会社',
    description:
      'HRtepプラットフォームを活用した外国人材紹介・就労マッチング。有料職業紹介事業として企業と外国籍人財をつなぎます。',
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
            HRtep株式会社は、外国籍人財の就労促進を通じて、企業の人材確保と国際社会の発展に貢献します。
            HRtepプラットフォームを中心に、紹介・研修・アウトソーシングを包括的にサポートします。
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
