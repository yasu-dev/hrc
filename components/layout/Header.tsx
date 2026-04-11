import Link from 'next/link';
import Image from 'next/image';
import { NAV_ITEMS } from '@/data/navigation';
import { Container } from '@/components/ui/Container';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="border-border/50 bg-background/95 sticky top-0 z-50 border-b backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-current.png"
            alt="HRtep株式会社"
            width={120}
            height={22}
            className="h-6 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="メインナビゲーション">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu />
      </Container>
    </header>
  );
}
