import { COMPANY } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const rows = [
  { label: '会社名', value: COMPANY.name },
  { label: '英文社名', value: COMPANY.nameEn },
  { label: '代表取締役', value: COMPANY.ceo },
  { label: '設立', value: COMPANY.founded },
  { label: '本社所在地', value: COMPANY.headquarters.address },
  { label: '銀座営業所', value: COMPANY.ginzaOffice.address },
  { label: 'TEL', value: COMPANY.tel },
  { label: '許認可', value: COMPANY.license },
  {
    label: '事業内容',
    value: COMPANY.business.join('、'),
  },
];

export function OutlineSection() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <SectionHeading title="Company" subtitle="会社概要" />
        <dl className="divide-y">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-4">
              <dt className="text-sm font-semibold">{row.label}</dt>
              <dd className="text-muted-foreground text-sm">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
