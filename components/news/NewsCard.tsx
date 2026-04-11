import Link from 'next/link';
import type { NewsItem } from '@/data/news';

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <li>
      <Link
        href={`/news/${item.slug}`}
        className="hover:bg-accent/50 flex flex-col gap-1 rounded-lg px-2 py-4 transition-colors sm:flex-row sm:items-center sm:gap-4"
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
  );
}
