import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'ＨＲｔｅｐ株式会社へのお問い合わせ。外国人材採用支援・DX支援・AI活用支援・システム開発・Webアプリ開発に関するご相談はこちらから。',
  openGraph: {
    title: 'お問い合わせ | ＨＲｔｅｐ株式会社',
    description:
      'ＨＲｔｅｐ株式会社へのお問い合わせ。外国人材採用支援・DX支援・AI活用支援・システム開発・Webアプリ開発に関するご相談はこちらから。',
  },
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
          <p className="text-muted-foreground mb-4 text-center">
            外国人材採用支援・IT事業に関するご相談は、お問い合わせフォームよりお送りください。
          </p>
          <p className="text-muted-foreground mb-8 text-center text-sm">
            通常2営業日以内に担当者よりご連絡いたします。お急ぎの場合はお電話（03-6228-7866 /
            平日9:00〜18:00）でも承っております。
          </p>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
