// Kopie aus onovo-legal v2026.9.0, nicht von Hand aendern.
// Aenderungen gehoeren in onovo-legal/render.mjs, danach `npm run legal:sync`.

/**
 * Rechtstexte rendern: Platzhalter befuellen, nicht zutreffende Bloecke entfernen.
 *
 * Bewusst ohne Abhaengigkeiten und ohne Markdown-Parser. Diese Datei entscheidet
 * nur, WAS im Text steht; wie er aussieht, entscheidet das jeweilige Projekt.
 *
 *   import { renderLegal, pruefeAusgabe } from "@onovo/legal/render.mjs";
 *   const md = renderLegal(quelle, { FIRMENNAME: "…" }, { gewerbe: true });
 */

/* Ziffern sind erlaubt: Variantennamen wie "b2b" scheiterten sonst stillschweigend.
   Der Block matchte nicht, blieb samt Markern im Text stehen, und erst der
   Build-Check fiel darueber. */
const BLOCK_START = /<!--\s*block:([a-z0-9_]+)(?:\s+variante=([a-z0-9_]+))?\s*-->/g;

/** Front-Matter abtrennen. Gibt Metadaten und den reinen Text zurueck. */
export function trenneFrontMatter(quelle) {
  if (!quelle.startsWith("---")) return { meta: {}, text: quelle };
  const ende = quelle.indexOf("\n---", 3);
  if (ende === -1) return { meta: {}, text: quelle };
  const kopf = quelle.slice(3, ende);
  const meta = {};
  let feld = null;
  for (const zeile of kopf.split("\n")) {
    const treffer = zeile.match(/^([a-z_]+):\s*(.*)$/);
    if (treffer) {
      feld = treffer[1];
      const wert = treffer[2].trim();
      meta[feld] = wert === ">-" ? "" : wert.replace(/^["']|["']$/g, "");
    } else if (feld && zeile.trim()) {
      meta[feld] = (meta[feld] ? meta[feld] + " " : "") + zeile.trim();
    }
  }
  return { meta, text: quelle.slice(ende + 4).replace(/^\n+/, "") };
}

/**
 * Entfernt einen Block samt Inhalt oder behaelt ihn ohne die Marker.
 * `aktiv` bildet die Bedingungen aus felder.json ab: { gewerbe: true, zvr: false }.
 * Varianten werden ueber `varianten` gewaehlt: { web_analytics: "umami" }.
 */
function verarbeiteBloecke(text, aktiv, varianten) {
  let ergebnis = text;
  let treffer;
  BLOCK_START.lastIndex = 0;

  while ((treffer = BLOCK_START.exec(ergebnis)) !== null) {
    const [marker, name, variante] = treffer;
    const ende = ergebnis.indexOf(`<!-- /block:${name} -->`, treffer.index);
    if (ende === -1) throw new Error(`Block "${name}" wird nicht geschlossen`);
    const endeMarker = ende + `<!-- /block:${name} -->`.length;

    const gewaehlt = varianten[name];
    const behalten =
      aktiv[name] === true && (variante === undefined || variante === gewaehlt);

    const inhalt = ergebnis
      .slice(treffer.index + marker.length, ende)
      .replace(/^\n+|\n+$/g, "");

    ergebnis =
      ergebnis.slice(0, treffer.index) +
      (behalten ? inhalt : "") +
      ergebnis.slice(endeMarker);

    BLOCK_START.lastIndex = treffer.index;
  }
  return ergebnis.replace(/\n{3,}/g, "\n\n");
}

/**
 * Nummeriert Abschnitte neu, nachdem Bloecke entfernt wurden.
 *
 * Die Nummern stehen fest im Quelltext ("## 4. Content Delivery Network").
 * Faellt ein Baustein weg, entstehen sonst Luecken: 1, 2, 3, 6, 9, 14. Auf einer
 * Rechtsseite sieht das nach Schlamperei aus und erschwert Verweise.
 *
 * Angefasst werden nur Ueberschriften, die bereits eine Nummer tragen. Das
 * Impressum arbeitet ohne Nummern und bleibt dadurch unberuehrt. Der einzige
 * Querverweis im Text zeigt auf Punkt 1 (Verantwortlicher), und der ist immer
 * aktiv und immer der erste, bleibt also gueltig.
 */
function nummeriereAbschnitte(text) {
  let n = 0;
  return text.replace(/^## (\d+)\.\s+/gm, () => `## ${++n}. `);
}

/**
 * @param {string} quelle   Inhalt einer Markdown-Datei aus onovo/ oder kunden/
 * @param {object} daten    Werte je Platzhalter, Schluessel ohne Klammern
 * @param {object} aktiv    Welche Bloecke bleiben
 * @param {object} varianten Welche Variante eines Blocks gilt
 */
export function renderLegal(quelle, daten = {}, aktiv = {}, varianten = {}) {
  const { meta, text } = trenneFrontMatter(quelle);
  let ergebnis = nummeriereAbschnitte(verarbeiteBloecke(text, aktiv, varianten));

  ergebnis = ergebnis.replace(/\{\{([A-Z_]+)\}\}/g, (_, name) => {
    const wert = daten[name];
    if (wert === undefined || wert === null || String(wert).trim() === "") {
      throw new Error(
        `Platzhalter {{${name}}} ist nicht befuellt. Entweder Wert liefern oder den umgebenden Block deaktivieren.`,
      );
    }
    return String(wert);
  });

  return { meta, markdown: ergebnis.trim() + "\n" };
}

/**
 * Letzte Sicherung vor dem Ausliefern: Im fertigen HTML darf weder ein
 * Platzhalter noch ein Blockmarker uebrig sein. Im Build aufrufen und bei
 * Fehlern den Build abbrechen.
 */
export function pruefeAusgabe(html) {
  const fehler = [];
  const platzhalter = [...html.matchAll(/\{\{([A-Z_]+)\}\}/g)].map((m) => m[1]);
  if (platzhalter.length) fehler.push(`Unbefuellte Platzhalter: ${[...new Set(platzhalter)].join(", ")}`);
  const marker = [...html.matchAll(/<!--\s*\/?block:([a-z0-9_]+)/g)].map((m) => m[1]);
  if (marker.length) fehler.push(`Uebrige Blockmarker: ${[...new Set(marker)].join(", ")}`);
  if (fehler.length) throw new Error(`Rechtstext nicht auslieferbar. ${fehler.join(" | ")}`);
  return true;
}

/** Anrede eines Vertretungsberechtigten je Rechtsform, siehe felder.json. */
export function vertretung(rechtsform, name) {
  const muster = {
    GmbH: `Geschäftsführer: ${name}`,
    OG: `Vertretungsbefugte(r) Gesellschafter: ${name}`,
    KG: `Vertretungsbefugte(r) Gesellschafter: ${name}`,
    Verein: `Obmann/Obfrau: ${name}`,
  };
  return muster[rechtsform] ?? name;
}

/**
 * Laufzeitvariante von `renderLegal` fuer Kundenseiten.
 *
 * `renderLegal` wirft, sobald ein Platzhalter leer ist. Das ist richtig, solange
 * zur Buildzeit gerendert wird: dann faellt ein unvollstaendiges Impressum sofort
 * auf. Kundenseiten holen die Daten aber zur Laufzeit aus Directus, damit der
 * Kunde sie ohne Deploy pflegen kann. Dort gibt es keinen Build, der abbrechen
 * koennte, und ein geworfener Fehler wuerde die ganze Seite lahmlegen.
 *
 * Deshalb meldet diese Funktion, statt zu werfen: Sie liefert die Liste der
 * fehlenden Pflichtfelder zurueck. Die aufrufende Seite entscheidet dann, ob sie
 * den Text ausliefert oder einen Hinweis zeigt. Optionale Felder brauchen diesen
 * Weg nicht, die haengen an Bloecken und entfallen dort sauber.
 *
 * @param {string} quelle    Markdown aus kunden/
 * @param {object} daten     Werte je Platzhalter
 * @param {object} katalog   felder.json
 * @param {object} aktiv     Welche Bloecke bleiben
 * @param {object} varianten Welche Variante eines Blocks gilt
 * @returns {{ markdown: string|null, fehlend: string[], meta: object }}
 */
export function renderLegalLaufzeit(quelle, daten = {}, katalog = {}, aktiv = {}, varianten = {}) {
  const { meta, text } = trenneFrontMatter(quelle);
  const dokument = meta.dokument ?? "impressum";

  const felder = katalog.felder ?? {};
  const istPflicht = (name) =>
    felder[name]?.pflicht === true && (felder[name]?.dokumente ?? []).includes(dokument);

  const gefuellt = (name) => {
    const wert = daten[name];
    return wert !== undefined && wert !== null && String(wert).trim() !== "";
  };

  // Erst die Bloecke aufloesen: Platzhalter in entfernten Bloecken zaehlen nicht.
  const aufgeloest = nummeriereAbschnitte(verarbeiteBloecke(text, aktiv, varianten));

  const verwendet = [...new Set([...aufgeloest.matchAll(/\{\{([A-Z_]+)\}\}/g)].map((m) => m[1]))];
  const fehlend = verwendet.filter((name) => istPflicht(name) && !gefuellt(name));

  if (fehlend.length) return { markdown: null, fehlend, meta };

  // Optionale Platzhalter, die trotz aktivem Block leer blieben, werden zu einer
  // leeren Zeichenkette. Sie sind per Definition verzichtbar.
  const markdown = aufgeloest
    .replace(/\{\{([A-Z_]+)\}\}/g, (_, name) => (gefuellt(name) ? String(daten[name]) : ""))
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { markdown: markdown + "\n", fehlend: [], meta };
}

/** Pflichtfelder eines Dokuments laut felder.json. Fuer Pruefskripte und Admin-Ansichten. */
export function pflichtfelder(katalog, dokument) {
  return Object.entries(katalog.felder ?? {})
    .filter(([, f]) => f.pflicht === true && (f.dokumente ?? []).includes(dokument))
    .map(([name]) => name);
}

/**
 * Firmenwortlaut-Zusatz hinter dem Namen, siehe formatierung.rechtsform_zusatz.
 *
 * RECHTSFORM ist ein Schluessel zur Blocksteuerung, kein Anzeigetext. Wer ihn
 * direkt in die Vorlage setzt, bekommt Zeilen wie
 * "Max Muster einzelunternehmer_nicht_eingetragen".
 *
 * Der zurueckgegebene Wert beginnt mit einem Leerzeichen, damit bei leerem
 * Zusatz keines am Namen haengen bleibt.
 */
export function rechtsformZusatz(rechtsform) {
  const zusatz = { eU: " e.U.", GmbH: " GmbH", OG: " OG", KG: " KG" };
  return zusatz[rechtsform] ?? "";
}
