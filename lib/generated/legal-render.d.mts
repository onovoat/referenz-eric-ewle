/**
 * Typen für render.mjs.
 *
 * Von Hand gepflegt: Die Quelle ist reines JavaScript ohne Typen, und eine
 * zweite Kopie der Signaturen ist billiger als ein Build-Schritt, der sie
 * erzeugt. Sie liegt seit v2026.9.1 hier statt in jedem Projekt, damit sie bei
 * einer Signaturänderung an genau einer Stelle nachgezogen wird.
 * legal-sync.mjs kopiert sie mit.
 */

export type FeldKatalog = {
  felder: Record<
    string,
    {
      directus: string | null;
      typ: string;
      pflicht: boolean;
      dokumente: readonly string[];
      beschreibung?: string;
      werte?: readonly string[];
    }
  >;
  bloecke: Record<string, unknown>;
};

export type LaufzeitErgebnis = {
  /** Null, sobald ein Pflichtfeld fehlt. Dann nichts ausliefern. */
  markdown: string | null;
  /** Namen der fehlenden Pflichtfelder, leer wenn vollständig. */
  fehlend: string[];
  meta: Record<string, string>;
};

export function renderLegalLaufzeit(
  quelle: string,
  daten?: Record<string, string | null | undefined>,
  katalog?: Partial<FeldKatalog>,
  aktiv?: Record<string, boolean>,
  varianten?: Record<string, string>,
): LaufzeitErgebnis;

export function pflichtfelder(katalog: Partial<FeldKatalog>, dokument: string): string[];

export function renderLegal(
  quelle: string,
  daten?: Record<string, string>,
  aktiv?: Record<string, boolean>,
  varianten?: Record<string, string>,
): { meta: Record<string, string>; markdown: string };

export function pruefeAusgabe(html: string): boolean;
export function rechtsformZusatz(rechtsform: string): string;
export function vertretung(rechtsform: string, name: string): string;
export function trenneFrontMatter(quelle: string): { meta: Record<string, string>; text: string };
