import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { ServiceCategory } from '@/data/services';

export function ServiceCard({ service }: { service: ServiceCategory }) {
  return (
    <Link
      href={service.href}
      className="group bg-card overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
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
  );
}
