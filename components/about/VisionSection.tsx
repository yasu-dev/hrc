import { PURPOSE, MISSION, VISION } from '@/data/about';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function VisionSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <Container className="max-w-3xl">
        <SectionHeading title="Purpose / Mission / Vision" subtitle="企業理念・ビジョン" />
        <div className="space-y-12">
          <div>
            <h3 className="text-primary text-lg font-bold">{PURPOSE.title}</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">{PURPOSE.statement}</p>
          </div>
          <div>
            <h3 className="text-primary text-lg font-bold">{MISSION.title}</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">{MISSION.statement}</p>
          </div>
          <div>
            <h3 className="text-primary text-lg font-bold">{VISION.title}</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">{VISION.statement}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
