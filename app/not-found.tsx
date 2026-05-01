import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'ページが見つかりません',
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  { href: '/', label: 'ホーム' },
  { href: '/about', label: '会社概要' },
  { href: '/services', label: 'サービス一覧' },
  { href: '/services/hr', label: '外国人材事業' },
  { href: '/services/it', label: 'IT事業' },
  { href: '/portfolio', label: 'ポートフォリオ' },
  { href: '/news', label: 'お知らせ' },
  { href: '/contact', label: 'お問い合わせ' },
];

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container className="text-center">
        <p className="font-heading text-primary text-6xl font-bold">404</p>
        <h1 className="mt-4 text-2xl font-bold md:text-3xl">ページが見つかりませんでした</h1>
        <p className="text-muted-foreground mt-3">
          お探しのページは移動または削除された可能性があります。
          <br className="hidden md:inline" />
          以下のページから目的のコンテンツをご確認ください。
        </p>

        <div className="mx-auto mt-10 max-w-2xl">
          <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-widest uppercase">
            主要ページ
          </h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-foreground hover:bg-muted block rounded-md border px-3 py-2 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button render={<Link href="/" />}>トップページに戻る</Button>
          <Button variant="outline" render={<Link href="/contact" />}>
            お問い合わせ
          </Button>
        </div>
      </Container>
    </section>
  );
}
