'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-32">
      <Container className="text-center">
        <p className="font-heading text-destructive text-4xl font-bold">Error</p>
        <h1 className="mt-4 text-2xl font-bold">エラーが発生しました</h1>
        <p className="text-muted-foreground mt-3">
          申し訳ございません。時間をおいて再度お試しください。
        </p>
        <Button className="mt-8" onClick={reset}>
          もう一度試す
        </Button>
      </Container>
    </section>
  );
}
