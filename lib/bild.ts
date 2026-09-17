/**
 * Bilder aus Directus, samt Alt-Text und KI-Kennzeichnung.
 *
 * Alt-Text und KI-Kennzeichen hängen an der **Datei** in der Directus-Mediathek,
 * nicht am Feld der Collection. Das ist der ganze Punkt: Tauscht der Kunde das
 * Hero-Bild gegen ein anderes Motiv, kommt die Beschreibung mit. Vorher standen
 * die Alt-Texte fest in Hero.tsx und About.tsx, hätten den Tausch also
 * überlebt und danach ein Bild beschrieben, das nicht mehr da ist. Für blinde
 * Besucher wäre das schlimmer als gar kein Alt-Text.
 */

/** Rohform, wie die Directus-API ein Datei-Feld liefert, wenn man es mitabfragt. */
export type DirectusDatei = {
  id: string;
  alt_text: string | null;
  ki_generiert: boolean | null;
  width: number | null;
  height: number | null;
} | null;

export type Bild = {
  url: string;
  /**
   * Leerer String heißt „rein schmückend" und wird von Screenreadern
   * übersprungen. Das ist die bewusste Vorgabe, wenn in Directus kein Alt-Text
   * hinterlegt ist: Eine erfundene Beschreibung wäre schlechter als keine.
   */
  alt: string;
  kiGeneriert: boolean;
  width: number | null;
  height: number | null;
};

/**
 * Baut aus einem Directus-Datei-Objekt ein Bild für die Anzeige.
 *
 * @param datei     Das mitabgefragte Datei-Objekt, oder null wenn kein Bild gesetzt ist
 * @param basis     Directus-URL, für den /assets/-Pfad
 * @param feldname  Nur für die Entwicklungswarnung, damit man die Fundstelle kennt
 */
export function bildAusDirectus(
  datei: DirectusDatei,
  basis: string,
  feldname: string
): Bild | null {
  if (!datei?.id) return null;

  const alt = datei.alt_text?.trim() ?? '';

  /* Ein fehlender Alt-Text ist kein Anzeigefehler, aber ein
     Barrierefreiheitsmangel. In der Entwicklung soll er auffallen, im Betrieb
     darf er die Seite nicht stören. */
  if (!alt && process.env.NODE_ENV !== 'production') {
    console.warn(
      `[Bild] ${feldname}: kein Alt-Text in Directus (Datei ${datei.id}). ` +
        `Wird als rein schmückendes Bild ausgeliefert und Screenreadern vorenthalten.`
    );
  }

  return {
    url: `${basis}/assets/${datei.id}`,
    alt,
    kiGeneriert: datei.ki_generiert === true,
    width: datei.width,
    height: datei.height,
  };
}

/**
 * Felderliste für die Directus-Abfrage eines Datei-Feldes.
 *
 * Ohne diese Angaben liefert die API nur die UUID. Wichtig: Das Feld muss in
 * Directus eine echte Relation auf `directus_files` sein. War es bei
 * eric_ewle nicht, es war nur eine uuid-Spalte mit Datei-Oberfläche, und
 * verschachtelte Abfragen kamen leer zurück.
 */
export function dateiFelder(feld: string): string {
  return [
    `${feld}.id`,
    `${feld}.alt_text`,
    `${feld}.ki_generiert`,
    `${feld}.width`,
    `${feld}.height`,
  ].join(',');
}
