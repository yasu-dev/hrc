import Image from 'next/image';
import type { PortfolioItem } from '@/data/portfolio';

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="bg-card overflow-hidden rounded-xl border">
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
        <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
        <ul className="mt-3 space-y-1">
          {item.highlights.map((h) => (
            <li key={h} className="text-muted-foreground flex items-start gap-1.5 text-xs">
              <span className="bg-primary mt-1.5 block size-1.5 shrink-0 rounded-full" />
              {h}
            </li>
          ))}
        </ul>
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
