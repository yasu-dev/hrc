import { COMPANY } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MapPin, Clock, Train } from 'lucide-react';

const offices = [COMPANY.headquarters, COMPANY.ginzaOffice];

export function AccessSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <Container>
        <SectionHeading title="Access" subtitle="アクセス" />
        <div className="grid gap-10 md:grid-cols-2">
          {offices.map((office) => (
            <div key={office.label}>
              <h3 className="text-lg font-bold">{office.label}</h3>
              <ul className="text-muted-foreground mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
                  <span>
                    {office.postalCode}
                    <br />
                    {office.address}
                    {office.note && (
                      <>
                        <br />
                        <span className="text-xs">({office.note})</span>
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Train className="text-primary mt-0.5 size-4 shrink-0" />
                  <span>
                    {office.nearestStations.map((s, i) => (
                      <span key={i}>
                        {s}
                        {i < office.nearestStations.length - 1 && ' / '}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="text-primary mt-0.5 size-4 shrink-0" />
                  <span>{office.hours}</span>
                </li>
              </ul>
              <div className="mt-4 overflow-hidden rounded-lg">
                <iframe
                  src={office.mapEmbedUrl}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${office.label}の地図`}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
