import { FEELING } from '@/data/about';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function FeelingSection() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <SectionHeading title={FEELING.titleEn} subtitle={FEELING.title} />
        <div className="space-y-8">
          {FEELING.blocks.map((block, i) => (
            <div key={i}>
              <h3 className="text-lg font-bold">{block.heading}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
