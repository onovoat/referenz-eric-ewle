import type { Metadata } from 'next';
import Rechtsseite from '@/components/Rechtsseite';
import { getLegalData } from '@/lib/directus';
import { baueDatenschutz } from '@/lib/legal';

/* Siehe Impressum: zur Laufzeit gerendert, damit Änderungen in Directus ohne
   Deploy sichtbar werden. */
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Datenschutzerklärung',
    description:
      'Informationen zur Verarbeitung personenbezogener Daten auf der Website von Eric Ewle.',
    alternates: { canonical: locale === 'en' ? '/en/datenschutz' : '/datenschutz' },
    robots: { index: false, follow: true },
  };
}

/* Siehe Impressum: keine Weiterleitung von der englischen Route, sonst
   entsteht mit der Middleware eine endlose Schleife. */
export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <Rechtsseite
      titel="Datenschutzerklärung"
      ergebnis={baueDatenschutz(await getLegalData())}
      nurDeutsch={locale === 'en'}
    />
  );
}
