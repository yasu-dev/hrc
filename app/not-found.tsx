import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'ページが見つかりません',
};

export default function NotFound() {
  return (
    <section className="py-32">
      <Container className="text-center">
        <p className="font-heading text-primary text-6xl font-bold">404</p>
        <h1 className="mt-4 text-2xl font-bold">ページが見つかりませんでした</h1>
        <p className="text-muted-foreground mt-3">
          お探しのページは移動または削除された可能性があります。
        </p>
        <Button className="mt-8" render={<Link href="/" />}>
          トップページに戻る
        </Button>
      </Container>
    </section>
  );
}
