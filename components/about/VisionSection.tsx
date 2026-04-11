import { VISION } from '@/data/about';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function VisionSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <Container className="max-w-3xl">
        <SectionHeading title={VISION.titleEn} subtitle={VISION.title} />
        <ul className="space-y-4">
          {VISION.items.map((item, i) => (
            <li key={i} className="text-muted-foreground flex items-start gap-3">
              <span className="bg-primary text-primary-foreground mt-1 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                {i + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
