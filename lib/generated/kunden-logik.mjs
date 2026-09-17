// Kopie aus onovo-legal v2026.9.1, nicht von Hand aendern.
// Aenderungen gehoeren in onovo-legal/kunden-logik.mjs, danach `npm run legal:sync`.

/**
 * Blocklogik und Platzhalter-Zuordnung fuer Kundenwebsites.
 *
 * Warum das hier liegt und nicht in der Seite: Die Bedingungen sind Aussagen
 * ueber das Dokument, nicht ueber die Website. Welche Rechtsform den
 * Gewerbeblock aktiviert und welches Feld dann zur Pflicht wird, steht in
 * felder.json und aendert sich mit dem Wortlaut. Wird die Logik je Projekt
 * nachgebaut, laeuft sie beim naechsten Wortlautwechsel auseinander, und zwar
 * still: Die Seite rendert weiter, nur eben falsch. Dasselbe Argument gilt
 * schon fuer render.mjs.
 *
 * Eingabe ist der rohe Datensatz aus der Directus-Collection des Kunden. Die
 * Feldnamen sind kanonisch (`directus` in felder.json), deshalb braucht kein
 * Projekt eine eigene Zuordnung. Unbekannte Zusatzfelder stoeren nicht.
 */

import { renderLegalLaufzeit, rechtsformZusatz } from "./legal-render.mjs";

/** Wahr nur bei einem Text mit Inhalt. Leere Strings aus Directus zaehlen nicht. */
const gesetzt = (w) => typeof w === "string" && w.trim() !== "";

/** Wahr nur bei echtem true. null und undefined sind "nicht gebucht". */
const flag = (w) => w === true;

/** Datum im oesterreichischen Format fuer die Zeile "Stand: …". */
function heute() {
  return new Date().toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** Einzeilige Anschrift aus Strasse, PLZ und Ort. Leere Teile entfallen. */
export function anschrift(d) {
  const stadt = [d.plz, d.ort].filter((t) => gesetzt(t)).join(" ");
  return [gesetzt(d.strasse_hausnummer) ? d.strasse_hausnummer.trim() : "", stadt]
    .filter(Boolean)
    .join(", ");
}

/* ── Impressum ─────────────────────────────────────────────────────────── */

/** Rechtsformen, die unter die Gewerbeordnung fallen. */
const GEWERBE_RECHTSFORMEN = [
  "eU",
  "GmbH",
  "OG",
  "KG",
  "einzelunternehmer_nicht_eingetragen",
];

/** Rechtsformen mit Firmenbucheintrag. */
const EINGETRAGEN = ["GmbH", "OG", "KG"];

export function impressumBloecke(d) {
  const rechtsform = (d.rechtsform ?? "").trim();

  return {
    telefon: gesetzt(d.telefon),
    uid: gesetzt(d.uid),
    firmenbuch:
      EINGETRAGEN.includes(rechtsform) ||
      (rechtsform === "eU" && gesetzt(d.firmenbuchnummer)),
    /* Freie Berufe fallen nicht unter die GewO, dort waere der Verweis auf die
       Gewerbeordnung schlicht falsch. */
    gewerbe: GEWERBE_RECHTSFORMEN.includes(rechtsform),
    zvr: rechtsform === "Verein",
    berufsrecht: rechtsform === "freiberufler" || gesetzt(d.berufsrecht),
    streitbeilegung: true,
  };
}

function impressumPlatzhalter(d) {
  return {
    FIRMENNAME: d.firmenname,
    /* Nicht der Enum-Schluessel, sondern der Firmenwortlaut-Zusatz. Bei freien
       Berufen und nicht eingetragenen Einzelunternehmen ist er leer. */
    RECHTSFORM_ZUSATZ: rechtsformZusatz(d.rechtsform ?? ""),
    STRASSE_HAUSNUMMER: d.strasse_hausnummer,
    PLZ: d.plz,
    ORT: d.ort,
    DOMAIN: d.domain,
    EMAIL: d.email,
    TELEFON: d.telefon,
    VERTRETUNGSBERECHTIGTE_PERSON: d.vertretungsberechtigte_person,
    UID: d.uid,
    FIRMENBUCHNUMMER: d.firmenbuchnummer,
    FIRMENBUCHGERICHT: d.firmenbuchgericht,
    TAETIGKEIT: d.taetigkeit,
    ZWECK_DES_MEDIUMS: d.zweck_des_mediums,
    GRUNDLEGENDE_RICHTUNG: d.grundlegende_richtung,
    WIRTSCHAFTSKAMMER: d.wirtschaftskammer,
    FACHGRUPPE: d.fachgruppe,
    GEWERBEBEHOERDE: d.gewerbebehoerde,
    ZVR_ZAHL: d.zvr_zahl,
    BERUFSRECHT: d.berufsrecht,
    DATUM: heute(),
  };
}

/**
 * Felder, die erst durch einen aktiven Block zur Pflicht werden.
 *
 * Im Katalog stehen sie als optional, und das ist richtig: Ein Verein hat keine
 * Fachgruppe, ein Kleinunternehmer keine UID. Sobald der zugehoerige Block aber
 * gilt, stehen ihre Platzhalter im Text, und renderLegalLaufzeit ersetzt leere
 * optionale Platzhalter durch eine leere Zeichenkette. Aus "Mitglied der
 * {{WIRTSCHAFTSKAMMER}}, Fachgruppe {{FACHGRUPPE}}." wuerde dann "Mitglied der ,
 * Fachgruppe ." auf einer Rechtsseite.
 */
export function bedingtePflichtfelder(d, bloecke) {
  const fehlt = [];

  if (bloecke.gewerbe) {
    if (!gesetzt(d.wirtschaftskammer)) fehlt.push("WIRTSCHAFTSKAMMER");
    if (!gesetzt(d.fachgruppe)) fehlt.push("FACHGRUPPE");
    if (!gesetzt(d.gewerbebehoerde)) fehlt.push("GEWERBEBEHOERDE");
  }
  if (bloecke.firmenbuch) {
    if (!gesetzt(d.firmenbuchnummer)) fehlt.push("FIRMENBUCHNUMMER");
    if (!gesetzt(d.firmenbuchgericht)) fehlt.push("FIRMENBUCHGERICHT");
  }
  if (bloecke.zvr && !gesetzt(d.zvr_zahl)) fehlt.push("ZVR_ZAHL");
  if (bloecke.berufsrecht && !gesetzt(d.berufsrecht)) fehlt.push("BERUFSRECHT");

  return fehlt;
}

/**
 * @param {string} vorlage  Inhalt von kunden/impressum.md
 * @param {object} katalog  felder.json
 * @param {object|null} d   Datensatz aus der Directus-Collection des Kunden
 * @returns {{vollstaendig: true, markdown: string} | {vollstaendig: false, fehlend: string[]}}
 */
export function baueImpressum(vorlage, katalog, d) {
  if (!d) return { vollstaendig: false, fehlend: ["DIRECTUS"] };

  /* Die Rechtsform steht nicht als Platzhalter im Text, steuert aber saemtliche
     Bloecke. Ohne sie waeren Gewerbe-, Firmenbuch- und Berufsrechtsblock
     geraten, deshalb wird sie eigens geprueft. */
  const rechtsformFehlt = !gesetzt(d.rechtsform);
  const bloecke = impressumBloecke(d);

  const { markdown, fehlend } = renderLegalLaufzeit(
    vorlage,
    impressumPlatzhalter(d),
    katalog,
    bloecke,
    /* Ohne Angabe die vorsichtigere Variante: Die B2C-Formulierung ist auch
       gegenueber Unternehmern unschaedlich, umgekehrt waere die B2B-Fassung bei
       Verbrauchergeschaeften schlicht unzutreffend. */
    { streitbeilegung: d.zielgruppe === "b2b" ? "unternehmer" : "verbraucher" },
  );

  const alle = [
    ...(rechtsformFehlt ? ["RECHTSFORM"] : []),
    ...fehlend,
    ...bedingtePflichtfelder(d, bloecke),
  ];

  if (markdown === null || alle.length) return { vollstaendig: false, fehlend: alle };
  return { vollstaendig: true, markdown };
}

/* ── Datenschutzerklaerung ─────────────────────────────────────────────── */

/**
 * Welche Bausteine der Datenschutzerklaerung gelten.
 *
 * Jeder Baustein beschreibt eine tatsaechliche Datenverarbeitung. Einer zu viel
 * behauptet eine Verarbeitung, die nicht stattfindet, einer zu wenig
 * verschweigt eine, die stattfindet. Beides ist falsch, deshalb haengen die
 * Schalter an Directus und nicht an Vermutungen im Code.
 */
export function datenschutzBloecke(d) {
  const analytics = (d.reichweitenmessung ?? "").trim().toLowerCase();

  return {
    telefon: gesetzt(d.telefon),
    cloudflare: flag(d.cloudflare_proxy),
    turnstile: flag(d.turnstile),
    web_analytics: analytics === "umami" || analytics === "cloudflare",
    google_analytics: flag(d.google_analytics),
    whatsapp: flag(d.whatsapp_link),
    karte: flag(d.standortkarte),
    newsletter: gesetzt(d.newsletter_tool),
    buchung: gesetzt(d.buchungstool),
    rezensionen: flag(d.google_rezensionen),
  };
}

/**
 * @param {string} vorlage  Inhalt von kunden/datenschutz.md
 * @param {object} katalog  felder.json
 * @param {object|null} d   Datensatz aus der Directus-Collection des Kunden
 */
export function baueDatenschutz(vorlage, katalog, d) {
  if (!d) return { vollstaendig: false, fehlend: ["DIRECTUS"] };

  const analytics = (d.reichweitenmessung ?? "").trim().toLowerCase();

  const { markdown, fehlend } = renderLegalLaufzeit(
    vorlage,
    {
      FIRMENNAME: d.firmenname,
      ADRESSE: anschrift(d),
      DOMAIN: d.domain,
      EMAIL: d.email,
      TELEFON: d.telefon,
      NEWSLETTER_TOOL: d.newsletter_tool,
      BUCHUNGSTOOL: d.buchungstool,
      DATUM: heute(),
    },
    katalog,
    datenschutzBloecke(d),
    /* Nur relevant, wenn web_analytics aktiv ist. Die Anwaltsfassung nennt
       Cloudflare Web Analytics, onovo betreibt stattdessen Umami selbst. */
    { web_analytics: analytics === "cloudflare" ? "cloudflare" : "umami" },
  );

  if (markdown === null || fehlend.length) return { vollstaendig: false, fehlend };
  return { vollstaendig: true, markdown };
}

/** Menschenlesbare Bezeichnungen fuer den Entwicklungshinweis auf der Seite. */
export const FELD_LABEL = {
  DIRECTUS: "Verbindung zu Directus fehlgeschlagen",
  FIRMENNAME: "Firmenname",
  RECHTSFORM: "Rechtsform",
  STRASSE_HAUSNUMMER: "Straße und Hausnummer",
  PLZ: "Postleitzahl",
  ORT: "Ort",
  ADRESSE: "Anschrift (aus Straße, PLZ und Ort)",
  DOMAIN: "Domain",
  EMAIL: "E-Mail-Adresse",
  TELEFON: "Telefonnummer",
  VERTRETUNGSBERECHTIGTE_PERSON: "Vertretungsberechtigte Person",
  TAETIGKEIT: "Unternehmensgegenstand",
  ZWECK_DES_MEDIUMS: "Zweck des Mediums",
  GRUNDLEGENDE_RICHTUNG: "Grundlegende Richtung",
  WIRTSCHAFTSKAMMER: "Wirtschaftskammer (Pflicht bei Gewerbe)",
  FACHGRUPPE: "Fachgruppe (Pflicht bei Gewerbe)",
  GEWERBEBEHOERDE: "Gewerbebehörde (Pflicht bei Gewerbe)",
  FIRMENBUCHNUMMER: "Firmenbuchnummer (Pflicht bei eingetragener Rechtsform)",
  FIRMENBUCHGERICHT: "Firmenbuchgericht (Pflicht bei eingetragener Rechtsform)",
  ZVR_ZAHL: "ZVR-Zahl (Pflicht bei Vereinen)",
  BERUFSRECHT: "Berufsrechtliche Angaben (Pflicht bei freien Berufen)",
};
