import {
  baueImpressum as baueImpressumRoh,
  baueDatenschutz as baueDatenschutzRoh,
  FELD_LABEL,
  type LegalErgebnis,
} from './generated/kunden-logik.mjs';
import {
  felderKatalog,
  impressumVorlage,
  datenschutzVorlage,
  legalVersion,
} from './generated/legal';
import type { LegalData } from './directus';

export { legalVersion, FELD_LABEL };
export type { LegalErgebnis };

/**
 * Impressum und Datenschutzerklärung dieser Seite.
 *
 * Die Blockbedingungen, die Platzhalter-Zuordnung und die bedingten
 * Pflichtfelder stehen nicht hier, sondern in `onovo-legal/kunden-logik.mjs`:
 * Sie sind Aussagen über das Dokument, nicht über diese Website, und liefen in
 * je Projekt nachgebauter Form beim nächsten Wortlautwechsel still auseinander.
 * `npm run legal:sync` holt sie mit den Vorlagen.
 *
 * Was hier bleibt, ist genau das Projektspezifische: welche Vorlage gilt und
 * dass die Daten aus dieser Directus-Collection kommen. Gerendert wird zur
 * Laufzeit, damit der Kunde seine Angaben ohne Deploy ändern kann, siehe
 * `revalidate` in den jeweiligen page.tsx.
 */

export function baueImpressum(d: LegalData | null): LegalErgebnis {
  return baueImpressumRoh(impressumVorlage, felderKatalog, d);
}

export function baueDatenschutz(d: LegalData | null): LegalErgebnis {
  return baueDatenschutzRoh(datenschutzVorlage, felderKatalog, d);
}
