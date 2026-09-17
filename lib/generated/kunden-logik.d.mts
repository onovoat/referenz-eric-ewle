/**
 * Typen für kunden-logik.mjs.
 *
 * Von Hand gepflegt, wie render.d.ts. legal-sync.mjs kopiert die Datei in die
 * Projekte, damit es genau eine Fassung der Signaturen gibt.
 */

import type { FeldKatalog } from './legal-render.mjs';

/**
 * Rohdatensatz aus der Directus-Collection des Kunden.
 *
 * Bewusst lose typisiert: Die Feldnamen sind über felder.json kanonisch, aber
 * welche Spalten eine Collection wirklich hat, weiß erst Directus. Ein strenger
 * Typ würde hier Sicherheit vortäuschen, die es nicht gibt, denn niemand
 * garantiert, dass der Kunde gespeichert hat.
 */
export type KundenDatensatz = Record<string, unknown>;

export type LegalErgebnis =
  | { vollstaendig: true; markdown: string }
  | { vollstaendig: false; fehlend: string[] };

/** Einzeilige Anschrift aus strasse_hausnummer, plz und ort. */
export function anschrift(d: KundenDatensatz): string;

/** Welche Blöcke des Impressums gelten, abgeleitet aus Rechtsform und Feldern. */
export function impressumBloecke(d: KundenDatensatz): {
  telefon: boolean;
  uid: boolean;
  firmenbuch: boolean;
  gewerbe: boolean;
  zvr: boolean;
  berufsrecht: boolean;
  streitbeilegung: boolean;
};

/** Welche Bausteine der Datenschutzerklärung gelten, aus den Dienste-Schaltern. */
export function datenschutzBloecke(d: KundenDatensatz): Record<string, boolean>;

/** Felder, die erst durch einen aktiven Block zur Pflicht werden. */
export function bedingtePflichtfelder(
  d: KundenDatensatz,
  bloecke: ReturnType<typeof impressumBloecke>,
): string[];

/** `null` als Datensatz meldet `fehlend: ['DIRECTUS']`, wirft aber nicht. */
export function baueImpressum(
  vorlage: string,
  katalog: Partial<FeldKatalog>,
  d: KundenDatensatz | null,
): LegalErgebnis;

export function baueDatenschutz(
  vorlage: string,
  katalog: Partial<FeldKatalog>,
  d: KundenDatensatz | null,
): LegalErgebnis;

/** Menschenlesbare Bezeichnungen für den Entwicklungshinweis auf der Seite. */
export const FELD_LABEL: Record<string, string>;
