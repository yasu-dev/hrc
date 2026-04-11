import { STATS } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function NumbersSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <Container>
        <SectionHeading title="Numbers" subtitle="数字で見るHRtep" />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-primary text-4xl font-bold md:text-5xl">
                {stat.value}
                <span className="text-lg">{stat.suffix}</span>
              </p>
              <p className="text-muted-foreground mt-2 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
