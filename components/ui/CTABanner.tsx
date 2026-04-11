import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from './Container';

export function CTABanner() {
  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-20">
      <Container className="text-center">
        <h2 className="text-2xl font-bold md:text-3xl">お気軽にお問い合わせください</h2>
        <p className="text-primary-foreground/80 mx-auto mt-4 max-w-2xl">
          外国人材紹介・IT事業に関するご相談は、お問い合わせフォームよりお送りください。
        </p>
        <Button
          variant="outline"
          size="lg"
          className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary mt-8"
          render={<Link href="/contact" />}
        >
          お問い合わせ
        </Button>
      </Container>
    </section>
  );
}
