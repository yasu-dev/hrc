import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'HRtep株式会社へのお問い合わせ。外国人材紹介・DX支援・AI活用支援・システム開発・Webアプリ開発に関するご相談はこちらから。',
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" subtitle="お問い合わせ" />
      <Container>
        <Breadcrumb items={[{ label: 'お問い合わせ' }]} />
      </Container>
      <section className="py-20 md:py-28">
        <Container className="max-w-2xl">
          <p className="text-muted-foreground mb-8 text-center">
            外国人材紹介・IT事業に関するご相談は、下記フォームよりお気軽にお問い合わせください。
          </p>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
