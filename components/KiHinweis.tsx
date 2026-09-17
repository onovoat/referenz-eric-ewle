/**
 * Kennzeichnung eines KI-generierten Bildes.
 *
 * Der Hinweis ist echter Text und bewusst **nicht** `aria-hidden`: Woher ein
 * Bild stammt, ist eine Information über den Inhalt und gehört damit auch
 * blinden Besuchern. Zusätzlich trägt das umgebende Element
 * `data-ki-generiert="true"`, damit die Angabe maschinell auffindbar ist.
 *
 * Zwei Varianten, weil die Bilder unterschiedlich eingebaut sind:
 *
 * - `unten`: im Textfluss unter dem Bild. Der Normalfall, sobald das Bild in
 *   einem Container mit fester Größe sitzt.
 * - `overlay`: als kleine Auflage am unteren Bildrand. Für randlose Bilder, die
 *   ihren Container per `fill` ausfüllen; dort gibt es kein „darunter", ohne
 *   das Layout aufzubrechen. Bekommt einen eigenen dunklen Grund, weil der
 *   Kontrast sonst vom Bildmotiv abhängt und WCAG AA nicht zu halten wäre.
 *   Nachgerechnet: Weiß auf 75 % Schwarz ergibt selbst über einem rein weißen
 *   Motiv noch 10,4:1.
 *
 * Der Text ist mit 11 px klein und braucht daher 4,5:1. `--text-muted`
 * (#8b95a1) liefert auf Weiß nur 3,04:1 und fällt damit aus, obwohl es die
 * naheliegende Stufe für Nebentexte wäre. Verwendet wird `--text-secondary`
 * (#4b5563): 7,56:1 auf Weiß und mindestens 7,07:1 auf allen hellen
 * Flächentokens dieser Seite.
 */
export default function KiHinweis({
  variante = 'unten',
}: {
  variante?: 'unten' | 'overlay';
}) {
  const text = 'Dieses Bild wurde mit KI erzeugt.';

  if (variante === 'overlay') {
    return (
      <p
        data-ki-generiert="true"
        className="absolute bottom-2 right-2 z-10 rounded bg-black/75 px-2 py-1 text-[0.6875rem] leading-tight text-white"
      >
        {text}
      </p>
    );
  }

  return (
    <p
      data-ki-generiert="true"
      className="mt-2 text-[0.6875rem] leading-tight text-[var(--text-secondary)]"
    >
      {text}
    </p>
  );
}
