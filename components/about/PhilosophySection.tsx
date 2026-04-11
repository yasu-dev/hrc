import { PHILOSOPHY } from '@/data/about';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function PhilosophySection() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl text-center">
        <SectionHeading title={PHILOSOPHY.titleEn} subtitle={PHILOSOPHY.title} />
        <p className="text-primary text-2xl font-bold md:text-3xl">{PHILOSOPHY.main}</p>
        <p className="text-muted-foreground mt-6 leading-relaxed">{PHILOSOPHY.description}</p>
      </Container>
    </section>
  );
}
