import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '@/data/portfolio';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';

export function PortfolioHighlight() {
  const highlighted = PORTFOLIO_ITEMS.slice(0, 3);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading title="Portfolio" subtitle="実績紹介" />
        <div className="grid gap-6 md:grid-cols-3">
          {highlighted.map((item) => (
            <div key={item.id} className="group bg-card overflow-hidden rounded-xl border">
              <div className="relative h-40 overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-0.5 text-xs font-medium">
                    {item.categoryLabel}
                  </span>
                  <span className="bg-muted text-muted-foreground inline-block rounded-full px-3 py-0.5 text-xs font-medium">
                    {item.industry}
                  </span>
                </div>
                <h3 className="mt-2 font-bold">{item.title}</h3>
                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" render={<Link href="/portfolio" />}>
            実績をすべて見る
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
