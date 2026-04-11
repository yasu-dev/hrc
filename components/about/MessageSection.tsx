import Image from 'next/image';
import { CEO_MESSAGE } from '@/data/about';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function MessageSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <Container>
        <SectionHeading title={CEO_MESSAGE.titleEn} subtitle={CEO_MESSAGE.title} />
        <div className="grid items-start gap-10 md:grid-cols-[1fr_280px]">
          <div className="text-muted-foreground space-y-4 leading-relaxed">
            {CEO_MESSAGE.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mx-auto w-full max-w-[280px]">
            <Image
              src={CEO_MESSAGE.image}
              alt={`${CEO_MESSAGE.role} ${CEO_MESSAGE.name}`}
              width={280}
              height={350}
              className="rounded-lg object-cover"
            />
            <p className="mt-3 text-center text-sm font-medium">{CEO_MESSAGE.role}</p>
            <p className="text-center text-lg font-bold">{CEO_MESSAGE.name}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
