import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NEWS_ITEMS } from '@/data/news';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';

export function NewsSection() {
  const latest = NEWS_ITEMS.slice(0, 3);

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <Container>
        <SectionHeading title="News" subtitle="お知らせ" />
        <ul className="divide-y">
          {latest.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/news/${item.slug}`}
                className="hover:bg-accent/50 flex flex-col gap-1 py-4 transition-colors sm:flex-row sm:items-center sm:gap-4"
              >
                <time className="text-muted-foreground shrink-0 text-sm" dateTime={item.date}>
                  {item.date}
                </time>
                <span className="bg-primary/10 text-primary inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium">
                  {item.category}
                </span>
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Button variant="outline" render={<Link href="/news" />}>
            お知らせ一覧
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
