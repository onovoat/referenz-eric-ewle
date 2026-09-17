import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Rechtsseite from '@/components/Rechtsseite';
import { getLegalData } from '@/lib/directus';
import { baueDatenschutz } from '@/lib/legal';

/* Siehe Impressum: zur Laufzeit gerendert, damit Änderungen in Directus ohne
   Deploy sichtbar werden. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Informationen zur Verarbeitung personenbezogener Daten auf der Website von Eric Ewle.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: false, follow: true },
};

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale === 'en') redirect('/datenschutz');

  return (
    <Rechtsseite
      titel="Datenschutzerklärung"
      ergebnis={baueDatenschutz(await getLegalData())}
    />
  );
}
