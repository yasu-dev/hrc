import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/data/services';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ServicesOverview() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading title="Services" subtitle="事業紹介" />
        <div className="grid gap-8 md:grid-cols-2">
          {SERVICE_CATEGORIES.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group bg-card relative overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{service.description}</p>
                <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
                  詳しく見る
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
