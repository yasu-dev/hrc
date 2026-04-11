'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/data/navigation';
import { Button } from '@/components/ui/button';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {open && (
        <div className="border-border bg-background fixed inset-x-0 top-16 z-50 border-b p-4 shadow-lg">
          <nav className="flex flex-col gap-1" aria-label="モバイルナビゲーション">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
