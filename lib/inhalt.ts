/**
 * Woher ein sichtbarer Text kommt.
 *
 * Die Regel hat drei Schichten, und diese Datei hält die Grenze zwischen den
 * beiden oberen:
 *
 * 1. **Stammdaten** (Telefon, E-Mail, Anschrift): immer aus Directus, eine
 *    einzige Quelle für Seite, JSON-LD und Rechtstexte. Vorher standen
 *    Telefonnummer und E-Mail an vier Stellen im Code und wären beim ersten
 *    Wechsel auseinandergelaufen, während die Datenschutzerklärung schon den
 *    neuen Wert gezeigt hätte.
 * 2. **Inhalte** (Überschriften, Fließtext, Claims): auf Deutsch aus Directus,
 *    damit der Kunde sie ohne uns ändern kann. Auf Englisch aus
 *    `messages/en.json`, weil die englische Fassung bei onovo gepflegt wird und
 *    der Kunde sie nicht bearbeitet.
 * 3. **Bedienelemente** (Navigation, Formularlabels, Fehlermeldungen,
 *    Cookie-Banner): immer aus `messages/*.json`. Sie gehören zur Bedienbarkeit
 *    der Seite, nicht zum Inhalt, und ein leeres Feld in Directus würde hier
 *    einen Knopf unbenutzbar machen.
 *
 * Für Schicht 2 gibt es `inhalt()`. `messages/de.json` bleibt dabei der
 * Rückfall, nicht eine zweite Quelle: Leert der Kunde ein Feld, erscheint
 * wieder der ausgelieferte Text statt einer Lücke.
 */

export function inhalt(
  locale: string,
  ausDirectus: string | null | undefined,
  ausCode: string
): string {
  if (locale !== 'de') return ausCode;
  const wert = ausDirectus?.trim();
  return wert ? wert : ausCode;
}

/** Wie `inhalt`, aber für Listen (Schlagworte, Regionen). */
export function inhaltListe(
  locale: string,
  ausDirectus: string[] | null | undefined,
  ausCode: string[]
): string[] {
  if (locale !== 'de') return ausCode;
  const werte = ausDirectus?.filter((w) => w?.trim());
  return werte?.length ? werte : ausCode;
}

/**
 * Telefonnummer als `tel:`-Ziel.
 *
 * Die gepflegte Nummer enthält Leerzeichen zur Lesbarkeit, ein tel:-Link darf
 * sie nicht enthalten. Beides aus einem Feld abzuleiten verhindert, dass
 * Anzeige und Link auseinanderlaufen; vorher standen sie getrennt im Code.
 */
export function telHref(nummer: string): string {
  return `tel:${nummer.replace(/[^\d+]/g, '')}`;
}
