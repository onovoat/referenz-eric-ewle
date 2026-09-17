import { Fragment, type ReactNode } from 'react';

/**
 * Rendert die Rechtstexte aus onovo-legal.
 *
 * Bewusst ein eigener, kleiner Renderer statt einer Markdown-Bibliothek mit
 * HTML-Ausgabe: In den Text fließen Werte ein, die der Kunde selbst in Directus
 * eingibt. Über `dangerouslySetInnerHTML` wäre jedes dieser Felder ein
 * XSS-Einfallstor. Hier entstehen ausschließlich React-Elemente, der Text
 * landet nie als Markup im DOM.
 *
 * Unterstützt genau das, was in den Vorlagen vorkommt, und nicht mehr:
 * Überschriften der Ebenen 1 bis 3, Absätze mit harten Zeilenumbrüchen (die
 * Anschrift braucht sie), Aufzählungen (Betroffenenrechte), zweispaltige
 * Tabellen (Verantwortlicher), **fett** und [Links](…).
 */

const FETT_ODER_LINK = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function inline(text: string, schluessel: string): ReactNode[] {
  return text
    .split(FETT_ODER_LINK)
    .filter(Boolean)
    .map((teil, i) => {
      const k = `${schluessel}-${i}`;

      if (teil.startsWith('**') && teil.endsWith('**')) {
        return (
          <strong key={k} className="font-semibold text-[var(--text-primary)]">
            {teil.slice(2, -2)}
          </strong>
        );
      }

      const link = teil.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, beschriftung, ziel] = link;
        const extern = /^https?:\/\//.test(ziel);
        return (
          <a
            key={k}
            href={ziel}
            {...(extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-[var(--teal-700)] underline underline-offset-2 hover:text-[var(--teal-600)]"
          >
            {beschriftung}
          </a>
        );
      }

      return <Fragment key={k}>{teil}</Fragment>;
    });
}

/** Erkennt einen Markdown-Tabellenblock an der Trennzeile aus Strichen. */
function istTabelle(zeilen: string[]): boolean {
  return (
    zeilen.length >= 2 &&
    zeilen[0].startsWith('|') &&
    /^\|[\s:|-]+\|$/.test(zeilen[1].trim())
  );
}

function zellen(zeile: string): string[] {
  return zeile
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((z) => z.trim());
}

/**
 * Die Tabelle im Abschnitt „Verantwortlicher" hat eine leere Kopfzeile
 * (`| | |`). Sie dient der Darstellung, nicht der Gliederung von Daten, und
 * bekommt deshalb kein `<thead>`: Screenreader würden sonst zwei leere
 * Spaltenüberschriften ansagen. Stattdessen wird die erste Spalte je Zeile als
 * Zeilenkopf ausgezeichnet, das trifft die Bedeutung („Feld: Wert").
 */
function Tabelle({ zeilen, schluessel }: { zeilen: string[]; schluessel: string }) {
  const kopf = zellen(zeilen[0]);
  const hatKopf = kopf.some((z) => z !== '');
  const inhalt = zeilen.slice(2);

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        {hatKopf && (
          <thead>
            <tr>
              {kopf.map((z, i) => (
                <th
                  key={i}
                  scope="col"
                  className="border-b border-[var(--border)] py-2 pr-6 text-sm font-semibold text-[var(--text-primary)]"
                >
                  {inline(z, `${schluessel}-k-${i}`)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {inhalt.map((zeile, i) => {
            const spalten = zellen(zeile);
            return (
              <tr key={i}>
                {spalten.map((z, j) =>
                  j === 0 ? (
                    <th
                      key={j}
                      scope="row"
                      className="border-b border-[var(--border-light)] py-2 pr-6 align-top text-sm font-medium text-[var(--text-primary)]"
                    >
                      {inline(z, `${schluessel}-${i}-${j}`)}
                    </th>
                  ) : (
                    <td
                      key={j}
                      className="border-b border-[var(--border-light)] py-2 align-top text-sm text-[var(--text-secondary)]"
                    >
                      {inline(z, `${schluessel}-${i}-${j}`)}
                    </td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Rechtstext({ markdown }: { markdown: string }) {
  const bloecke = markdown.trim().split(/\n{2,}/);

  return (
    <div className="mt-10 border-t border-[var(--border)] pt-10">
      {bloecke.map((block, i) => {
        const ueberschrift = block.match(/^(#{1,3})\s+(.*)$/);

        if (ueberschrift) {
          const [, raute, text] = ueberschrift;

          if (raute.length === 1) {
            return (
              <h1
                key={i}
                className="mt-0 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl"
              >
                {text}
              </h1>
            );
          }
          if (raute.length === 2) {
            return (
              <h2
                key={i}
                className="mt-12 text-xl font-semibold text-[var(--text-primary)] first:mt-0 sm:text-2xl"
              >
                {text}
              </h2>
            );
          }
          return (
            <h3
              key={i}
              className="mt-8 text-lg font-semibold text-[var(--text-primary)]"
            >
              {text}
            </h3>
          );
        }

        const zeilen = block.split('\n');

        if (istTabelle(zeilen)) {
          return <Tabelle key={i} zeilen={zeilen} schluessel={String(i)} />;
        }

        if (zeilen.every((z) => /^[-*]\s+/.test(z.trim()))) {
          return (
            <ul key={i} className="mt-5 flex flex-col gap-2 pl-5">
              {zeilen.map((zeile, j) => (
                <li
                  key={j}
                  className="list-disc leading-relaxed text-[var(--text-secondary)]"
                >
                  {inline(zeile.trim().replace(/^[-*]\s+/, ''), `${i}-${j}`)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="mt-5 leading-relaxed text-[var(--text-secondary)]">
            {zeilen.map((zeile, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {inline(zeile, `${i}-${j}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
