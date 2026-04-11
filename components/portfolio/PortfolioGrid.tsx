'use client';

import { useState } from 'react';
import type { PortfolioCategory } from '@/data/portfolio';
import { PORTFOLIO_ITEMS } from '@/data/portfolio';
import { CategoryFilter } from './CategoryFilter';
import { PortfolioCard } from './PortfolioCard';

export function PortfolioGrid() {
  const [selected, setSelected] = useState<PortfolioCategory>('all');

  const filtered =
    selected === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === selected);

  return (
    <div>
      <CategoryFilter selected={selected} onChange={setSelected} />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-muted-foreground mt-8 text-center">該当する実績がありません。</p>
      )}
    </div>
  );
}
