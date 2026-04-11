import Image from 'next/image';
import type { PortfolioItem } from '@/data/portfolio';

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="bg-card overflow-hidden rounded-xl border">
      <div className="relative h-40 overflow-hidden">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-0.5 text-xs font-medium">
          {item.categoryLabel}
        </span>
        <h3 className="mt-2 font-bold">{item.title}</h3>
        <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {item.techStack.map((tech) => (
            <span key={tech} className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
