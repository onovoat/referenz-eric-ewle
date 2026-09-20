import type { Metadata } from 'next';
import Rechtsseite from '@/components/Rechtsseite';
import { getLegalData } from '@/lib/directus';
import { baueImpressum } from '@/lib/legal';

/* Der Kunde pflegt seine Angaben in Directus und soll die Änderung sehen, ohne
   dass jemand deployt. Die Seite wird deshalb statisch erzeugt und höchstens
   60 Sekunden alt ausgeliefert. */
export const revalidate = 60;

/* Rechtsseiten gehören nie in den Suchindex: Sie enthalten ausschließlich
   Pflichtangaben und keine Inhalte, die jemand über Google suchen würde. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Impressum',
    description:
      'Impressum und Offenlegung gemäß § 5 ECG und § 25 Mediengesetz für die Website von Eric Ewle.',
    alternates: { canonical: locale === 'en' ? '/en/impressum' : '/impressum' },
    robots: { index: false, follow: true },
  };
}

/**
 * Die Rechtsvorlagen liegen nur auf Deutsch vor, weil die Pflichtangaben nach
 * § 5 ECG und § 25 MedienG auf Deutsch gelten.
 *
 * Frueher leitete die englische Route deshalb auf "/impressum" um. Das war der
 * Auslöser einer endlosen Weiterleitungsschleife: Die Middleware schickte
 * "/impressum" wegen des gesetzten Sprach-Cookies zurueck auf "/en/impressum",
 * diese Seite wieder auf "/impressum", und so fort. Im Browser kam dabei
 * ERR_TOO_MANY_REDIRECTS oder eine weiße Seite heraus.
 *
 * Die englische Route liefert den deutschen Text jetzt direkt aus, mit einer
 * Zeile darueber, die den Grund nennt. Keine Weiterleitung, keine Schleife.
 */
export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <Rechtsseite
      titel="Impressum"
      ergebnis={baueImpressum(await getLegalData())}
      nurDeutsch={locale === 'en'}
    />
  );
}
