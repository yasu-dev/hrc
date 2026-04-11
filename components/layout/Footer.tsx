import Link from 'next/link';
import Image from 'next/image';
import { NAV_ITEMS } from '@/data/navigation';
import { COMPANY } from '@/lib/constants';
import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <Container className="py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/">
              <Image
                src="/images/logo-current.png"
                alt="HRtep株式会社"
                width={120}
                height={22}
                className="h-6 w-auto"
              />
            </Link>
            <address className="text-muted-foreground mt-4 text-sm not-italic">
              <p>{COMPANY.headquarters.address}</p>
              <p className="mt-1">TEL: {COMPANY.tel}</p>
            </address>
          </div>

          <nav aria-label="フッターナビゲーション">
            <h3 className="text-sm font-semibold">ページ</h3>
            <ul className="mt-3 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold">リーガル</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-muted-foreground mt-10 border-t pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} {COMPANY.name} All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
