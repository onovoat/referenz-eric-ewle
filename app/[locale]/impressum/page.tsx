import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Rechtsseite from '@/components/Rechtsseite';
import { getLegalData } from '@/lib/directus';
import { baueImpressum } from '@/lib/legal';

/* Der Kunde pflegt seine Angaben in Directus und soll die Änderung sehen, ohne
   dass jemand deployt. Die Seite wird deshalb statisch erzeugt und höchstens
   60 Sekunden alt ausgeliefert. */
export const revalidate = 60;

/* Rechtsseiten gehören nie in den Suchindex: Sie enthalten ausschließlich
   Pflichtangaben und keine Inhalte, die jemand über Google suchen würde. */
export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum und Offenlegung gemäß § 5 ECG und § 25 Mediengesetz für die Website von Eric Ewle.',
  alternates: { canonical: '/impressum' },
  robots: { index: false, follow: true },
};

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  /* Die Rechtsvorlagen liegen nur auf Deutsch vor. Eine englische Fassung
     vorzugeben wäre irreführend, deshalb führt die englische Route auf die
     deutsche Seite. */
  if (locale === 'en') redirect('/impressum');

  return <Rechtsseite titel="Impressum" ergebnis={baueImpressum(await getLegalData())} />;
}
