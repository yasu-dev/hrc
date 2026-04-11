'use client';

import { cn } from '@/lib/utils';
import type { PortfolioCategory } from '@/data/portfolio';
import { PORTFOLIO_CATEGORIES } from '@/data/portfolio';

type CategoryFilterProps = {
  selected: PortfolioCategory;
  onChange: (category: PortfolioCategory) => void;
};

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="カテゴリフィルター">
      {PORTFOLIO_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={selected === cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            selected === cat.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
