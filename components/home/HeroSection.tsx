import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/main.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <Container className="flex min-h-[70vh] flex-col items-start justify-center py-20 text-white">
        <p className="font-heading text-sm font-semibold tracking-widest uppercase">
          Human Resources &times; Technology
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl leading-tight font-bold md:text-5xl">
          外国人材とテクノロジーで
          <br />
          企業の未来を共創する
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">
          外国人材採用支援事業とIT事業（DX支援・AI活用支援・システム開発・Webアプリ開発）の二軸で、企業の持続的な成長を支援します。
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button size="lg" variant="secondary" render={<Link href="/services" />}>
            サービスを見る
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-white/10"
            render={<Link href="/contact" />}
          >
            お問い合わせ
          </Button>
        </div>
      </Container>
    </section>
  );
}
