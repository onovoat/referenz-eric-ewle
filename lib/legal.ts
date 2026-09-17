import { renderLegalLaufzeit, rechtsformZusatz } from './generated/legal-render.mjs';
import {
  felderKatalog,
  impressumVorlage,
  datenschutzVorlage,
  legalVersion,
} from './generated/legal';
import { legalAnschrift, type LegalData } from './directus';

export { legalVersion };

/**
 * Baut Impressum und Datenschutzerklärung aus den Vorlagen in onovo-legal und
 * den Daten, die der Kunde in Directus pflegt.
 *
 * Gerendert wird zur Laufzeit und nicht beim Build: Der Kunde soll seine
 * Angaben ändern können, ohne dass jemand deployt. Die Seiten sind deshalb
 * kurzlebig gecacht, siehe `revalidate` in den jeweiligen page.tsx.
 */

export type LegalErgebnis =
  | { vollstaendig: true; markdown: string }
  | { vollstaendig: false; fehlend: string[] };

const gesetzt = (w: string | null | undefined) =>
  typeof w === 'string' && w.trim() !== '';

/** Tagesaktuelles Datum für die Zeile „Stand: …". */
function heute(): string {
  return new Date().toLocaleDateString('de-AT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/* ── Impressum ──────────────────────────────────────────────────────────── */

/** Welche Blöcke des Impressums gelten, abgeleitet aus Rechtsform und Feldern. */
function impressumBloecke(d: LegalData) {
  const rechtsform = (d.rechtsform ?? '').trim();
  const eingetragen = ['GmbH', 'OG', 'KG'].includes(rechtsform);

  /* Gewerbeblock nur für Gewerbetreibende. Freie Berufe fallen nicht unter die
     GewO, dort wäre der Verweis auf die Gewerbeordnung schlicht falsch. */
  const gewerbe = [
    'eU',
    'GmbH',
    'OG',
    'KG',
    'einzelunternehmer_nicht_eingetragen',
  ].includes(rechtsform);

  return {
    telefon: gesetzt(d.telefon),
    uid: gesetzt(d.uid),
    firmenbuch: eingetragen || (rechtsform === 'eU' && gesetzt(d.firmenbuchnummer)),
    gewerbe,
    zvr: rechtsform === 'Verein',
    berufsrecht: rechtsform === 'freiberufler' || gesetzt(d.berufsrecht),
    streitbeilegung: true,
  };
}

function impressumPlatzhalter(d: LegalData) {
  return {
    FIRMENNAME: d.firmenname,
    /* Nicht der Enum-Schlüssel, sondern der Firmenwortlaut-Zusatz. Bei freien
       Berufen und nicht eingetragenen Einzelunternehmen ist er leer. */
    RECHTSFORM_ZUSATZ: rechtsformZusatz(d.rechtsform ?? ''),
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

export function baueImpressum(d: LegalData | null): LegalErgebnis {
  if (!d) return { vollstaendig: false, fehlend: ['DIRECTUS'] };

  /* Die Rechtsform steht nicht als Platzhalter im Text, steuert aber sämtliche
     Blöcke. Ohne sie wären Gewerbe-, Firmenbuch- und Berufsrechtsblock geraten,
     deshalb wird sie hier eigens geprüft. */
  const rechtsformFehlt = !gesetzt(d.rechtsform);

  const { markdown, fehlend } = renderLegalLaufzeit(
    impressumVorlage,
    impressumPlatzhalter(d),
    felderKatalog,
    impressumBloecke(d),
    /* Ohne Angabe die vorsichtigere Variante: Die B2C-Formulierung ist auch
       gegenüber Unternehmern unschädlich, umgekehrt wäre die B2B-Fassung bei
       Verbrauchergeschäften schlicht unzutreffend. */
    { streitbeilegung: d.zielgruppe === 'b2b' ? 'unternehmer' : 'verbraucher' }
  );

  const alle = rechtsformFehlt ? ['RECHTSFORM', ...fehlend] : fehlend;
  if (markdown === null || alle.length) {
    return { vollstaendig: false, fehlend: alle };
  }
  return { vollstaendig: true, markdown };
}

/* ── Datenschutzerklärung ───────────────────────────────────────────────── */

/**
 * Welche Bausteine der Datenschutzerklärung gelten.
 *
 * Jeder Baustein beschreibt eine tatsächliche Datenverarbeitung. Ein Baustein
 * zu viel behauptet eine Verarbeitung, die nicht stattfindet, einer zu wenig
 * verschweigt eine, die stattfindet. Beides ist falsch, deshalb hängen die
 * Schalter an Directus und nicht an Vermutungen im Code.
 */
function datenschutzBloecke(d: LegalData) {
  const analytics = (d.reichweitenmessung ?? '').trim().toLowerCase();

  return {
    telefon: gesetzt(d.telefon),
    cloudflare: d.cloudflare_proxy,
    turnstile: d.turnstile,
    web_analytics: analytics === 'umami' || analytics === 'cloudflare',
    google_analytics: d.google_analytics,
    whatsapp: d.whatsapp_link,
    karte: d.standortkarte,
    newsletter: gesetzt(d.newsletter_tool),
    buchung: gesetzt(d.buchungstool),
    rezensionen: d.google_rezensionen,
  };
}

export function baueDatenschutz(d: LegalData | null): LegalErgebnis {
  if (!d) return { vollstaendig: false, fehlend: ['DIRECTUS'] };

  const analytics = (d.reichweitenmessung ?? '').trim().toLowerCase();

  const { markdown, fehlend } = renderLegalLaufzeit(
    datenschutzVorlage,
    {
      FIRMENNAME: d.firmenname,
      ADRESSE: legalAnschrift(d),
      DOMAIN: d.domain,
      EMAIL: d.email,
      TELEFON: d.telefon,
      NEWSLETTER_TOOL: d.newsletter_tool,
      BUCHUNGSTOOL: d.buchungstool,
      DATUM: heute(),
    },
    felderKatalog,
    datenschutzBloecke(d),
    /* Nur relevant, wenn web_analytics aktiv ist. Die Anwaltsfassung nennt
       Cloudflare Web Analytics, onovo betreibt stattdessen Umami selbst. */
    { web_analytics: analytics === 'cloudflare' ? 'cloudflare' : 'umami' }
  );

  if (markdown === null || fehlend.length) {
    return { vollstaendig: false, fehlend };
  }
  return { vollstaendig: true, markdown };
}

/** Menschenlesbare Bezeichnungen für den Entwicklungshinweis. */
export const FELD_LABEL: Record<string, string> = {
  DIRECTUS: 'Verbindung zu Directus fehlgeschlagen',
  FIRMENNAME: 'Firmenname',
  RECHTSFORM: 'Rechtsform',
  STRASSE_HAUSNUMMER: 'Straße und Hausnummer',
  PLZ: 'Postleitzahl',
  ORT: 'Ort',
  ADRESSE: 'Anschrift (aus Straße, PLZ und Ort)',
  DOMAIN: 'Domain',
  EMAIL: 'E-Mail-Adresse',
  VERTRETUNGSBERECHTIGTE_PERSON: 'Vertretungsberechtigte Person',
  TAETIGKEIT: 'Unternehmensgegenstand',
  ZWECK_DES_MEDIUMS: 'Zweck des Mediums',
  GRUNDLEGENDE_RICHTUNG: 'Grundlegende Richtung',
};
