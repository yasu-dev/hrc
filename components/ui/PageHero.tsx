import { Container } from './Container';

type PageHeroProps = {
  title: string;
  subtitle: string;
};

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-primary/5 py-16 md:py-20">
      <Container>
        <p className="font-heading text-primary text-sm font-semibold tracking-widest uppercase">
          {title}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{subtitle}</h1>
      </Container>
    </section>
  );
}
