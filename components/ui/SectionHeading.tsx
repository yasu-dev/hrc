import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  title: string;
  subtitle: string;
  className?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  title,
  subtitle,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 md:mb-14', align === 'center' && 'text-center', className)}>
      <p className="font-heading text-primary text-sm font-semibold tracking-widest uppercase">
        {title}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{subtitle}</h2>
    </div>
  );
}
