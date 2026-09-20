import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Rechtstext from '@/components/Rechtstext';
import { FELD_LABEL, type LegalErgebnis } from '@/lib/legal';

/**
 * Gemeinsames Gerüst für Impressum und Datenschutzerklärung.
 *
 * Ist der Text vollständig, wird er ausgeliefert. Fehlt eine Pflichtangabe,
 * erscheint stattdessen ein Hinweis: Ein Impressum ohne Anschrift erfüllt § 5
 * ECG nicht, sähe aber fertig aus. Ein sichtbar unfertiger Zustand ist
 * ehrlicher und schützt den Medieninhaber.
 *
 * Der Text selbst ist immer deutsch, auch unter /en: Die Pflichtangaben nach
 * § 5 ECG und § 25 MedienG gelten auf Deutsch, und eine englische Fassung
 * vorzugeben wäre irreführend. Auf der englischen Seite steht deshalb eine
 * Zeile darüber, die das erklärt.
 */
export default async function Rechtsseite({
  titel,
  ergebnis,
  nurDeutsch = false,
}: {
  titel: string;
  ergebnis: LegalErgebnis;
  /** Auf der englischen Route: erklärt, warum der Text deutsch bleibt. */
  nurDeutsch?: boolean;
}) {
  const t = await getTranslations('legal');

  return (
    <main id="main-content" className="min-h-screen bg-[var(--bg-alt)] py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--teal-700)]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t('zurueck')}
        </Link>

        {nurDeutsch && (
          <p
            lang="en"
            className="mt-6 border-l-2 border-[var(--teal-700)] bg-white px-6 py-4 text-sm leading-relaxed text-[var(--text-secondary)]"
          >
            {t('nur_deutsch')}
          </p>
        )}

        {ergebnis.vollstaendig ? (
          <div lang="de">
            <Rechtstext markdown={ergebnis.markdown} />
          </div>
        ) : (
          <div lang="de" className="mt-10 border-t border-[var(--border)] pt-10">
            <h1 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              {titel}
            </h1>
            <p className="mt-8 leading-relaxed text-[var(--text-secondary)]">
              Die gesetzlich vorgeschriebenen Angaben werden derzeit ergänzt und
              erscheinen hier, sobald sie vollständig sind.
            </p>

            {/* Nur in der Entwicklung: benennt konkret, was in Directus fehlt.
                In der ausgelieferten Seite hat diese Liste nichts zu suchen. */}
            {process.env.NODE_ENV !== 'production' && (
              <div className="mt-12 border-l-2 border-red-500 bg-red-50 px-5 py-4">
                <p className="text-sm font-semibold text-red-700">
                  Entwicklungshinweis: In Directus fehlen noch folgende Pflichtfelder
                </p>
                <ul className="mt-3 flex flex-col gap-1 text-sm text-[var(--text-secondary)]">
                  {ergebnis.fehlend.map((feld) => (
                    <li key={feld}>{FELD_LABEL[feld] ?? feld}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
