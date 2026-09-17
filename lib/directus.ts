import { bildAusDirectus, dateiFelder, type Bild, type DirectusDatei } from './bild';

const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN!;

export type Leistung = { titel: string; beschreibung: string };

/**
 * Inhaltsfelder, die die sichtbare Website füllt.
 *
 * Die deutschen Texte kommen von hier, die englischen aus `messages/en.json`.
 * Welcher Wert gilt, entscheidet `lib/inhalt.ts`; dort steht auch, warum.
 * Alles optional: Ein leeres Feld fällt auf den ausgelieferten Text zurück.
 */
export type SiteData = {
  firmenname: string;
  ueber_uns_text: string;
  ueber_uns_text2: string;
  mission: string;
  /* Stammdaten: einzige Quelle, auch für JSON-LD und die Rechtstexte. */
  telefon: string;
  email: string;
  hero_headline: string | null;
  hero_headline2: string | null;
  hero_subline: string | null;
  hero_tagline: string | null;
  hero_rolle: string | null;
  about_heading: string | null;
  about_tags: string[] | null;
  services_heading: string | null;
  services_items: Leistung[] | null;
  region_heading: string | null;
  region_text: string | null;
  region_badges: string[] | null;
  partners_heading: string | null;
  partners_text: string | null;
  contact_heading: string | null;
  contact_subtext: string | null;
  contact_vorteil1_titel: string | null;
  contact_vorteil1_text: string | null;
  contact_vorteil2_titel: string | null;
  contact_vorteil2_text: string | null;
  /**
   * Einzeilige Anschrift für die Darstellung und für {{ADRESSE}} in der
   * Datenschutzerklärung. Abgeleitet aus strasse_hausnummer, plz und ort, damit
   * es keine zweite, konkurrierende Wahrheit gibt: Ein eigenes Directus-Feld
   * daneben würde beim ersten Umzug auseinanderlaufen, und die falsche Fassung
   * stünde dann im Rechtstext.
   */
  adresse: string;
  linkedin: string;
  /**
   * Bilder tragen ihren Alt-Text und das KI-Kennzeichen mit, beides kommt aus
   * der Directus-Mediathek. Vorher waren das reine URL-Strings und der
   * Alt-Text stand fest in der Komponente, siehe lib/bild.ts.
   */
  foto_hero: Bild | null;
  foto_ueber_uns: Bild | null;
};

/**
 * Felder für Impressum und Datenschutzerklärung.
 *
 * Getrennt von SiteData, weil sie nur die Rechtsseiten betreffen und der Kunde
 * sie eigenverantwortlich pflegt. Alles optional: Fehlt eine Pflichtangabe,
 * liefert lib/legal.ts den Text bewusst nicht aus, statt ihn lückenhaft
 * anzuzeigen.
 */
export type LegalData = {
  firmenname: string | null;
  rechtsform: string | null;
  strasse_hausnummer: string | null;
  plz: string | null;
  ort: string | null;
  email: string | null;
  telefon: string | null;
  vertretungsberechtigte_person: string | null;
  uid: string | null;
  firmenbuchnummer: string | null;
  firmenbuchgericht: string | null;
  taetigkeit: string | null;
  zweck_des_mediums: string | null;
  grundlegende_richtung: string | null;
  zielgruppe: string | null;
  wirtschaftskammer: string | null;
  fachgruppe: string | null;
  gewerbebehoerde: string | null;
  zvr_zahl: string | null;
  berufsrecht: string | null;
  domain: string | null;
  // Dienste-Schalter: steuern, welche Bausteine der Datenschutzerklärung gelten.
  cloudflare_proxy: boolean;
  turnstile: boolean;
  reichweitenmessung: string | null;
  google_analytics: boolean;
  newsletter_tool: string | null;
  buchungstool: string | null;
  google_rezensionen: boolean;
  standortkarte: boolean;
  whatsapp_link: boolean;
};

/**
 * Nur die Stammdaten und die drei Langtexte haben einen Ersatzwert: Ohne
 * Directus soll die Seite erreichbar bleiben. Die übrigen Inhaltsfelder stehen
 * auf null und fallen damit auf `messages/de.json` zurück, statt hier ein
 * zweites Mal gepflegt zu werden.
 */
const fallback: SiteData = {
  firmenname: 'Eric Ewle',
  ueber_uns_text:
    'Mein Name ist Eric Ewle und meine Leidenschaft ist es, Unternehmen und IT-Fachkräfte erfolgreich zusammenzubringen. Durch meine langjährige Erfahrung in der Direktvermittlung von IT-Fachkräften weiß ich, worauf es bei der erfolgreichen Besetzung von IT-Positionen ankommt.',
  ueber_uns_text2:
    'Ich unterstütze Unternehmen dabei, spezialisierte IT-Talente zu finden, und begleite IT-Expert*innen dabei, den passenden Job zu finden.',
  mission:
    'Sowohl Unternehmen als auch IT-Expert*innen dabei zu helfen, ihre Ziele zu erreichen und eine erfolgreiche Zusammenarbeit zu ermöglichen.',
  telefon: '+43 676 706 8736',
  email: 'office@ericewle.at',
  adresse: 'Dresdnerstrasse 117, 1020 Wien',
  linkedin: 'https://www.linkedin.com/in/eric-ewle-5946831a1',
  hero_headline: null,
  hero_headline2: null,
  hero_subline: null,
  hero_tagline: null,
  hero_rolle: null,
  about_heading: null,
  about_tags: null,
  services_heading: null,
  services_items: null,
  region_heading: null,
  region_text: null,
  region_badges: null,
  partners_heading: null,
  partners_text: null,
  contact_heading: null,
  contact_subtext: null,
  contact_vorteil1_titel: null,
  contact_vorteil1_text: null,
  contact_vorteil2_titel: null,
  contact_vorteil2_text: null,
  /* Kein Ersatzbild: Ohne Directus gibt es auch keinen Alt-Text, und ein Bild
     ohne Beschreibung ist fuer blinde Besucher schlechter als die
     Platzhalterflaeche, die die Komponenten dann zeigen. */
  foto_hero: null,
  foto_ueber_uns: null,
};

/** Baut die einzeilige Anschrift. Leere Bestandteile entfallen ohne Rückstand. */
function anschrift(
  strasse: string | null | undefined,
  plz: string | null | undefined,
  ort: string | null | undefined
): string {
  const stadt = [plz, ort].filter((t) => t?.trim()).join(' ');
  return [strasse?.trim(), stadt].filter(Boolean).join(', ');
}

type DirectusItem = Record<string, unknown>;

/* Ohne die verschachtelten Datei-Felder liefert die API nur die UUID. `*`
   allein reicht dafuer nicht, die Relation muss ausdruecklich aufgeloest
   werden. */
const ABFRAGE = [
  'limit=1',
  `fields=*,${dateiFelder('foto_hero')},${dateiFelder('foto_ueber_uns')}`,
].join('&');

async function ladeItem(): Promise<DirectusItem | null> {
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/eric_ewle?${ABFRAGE}`, {
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
      /* Kurze Frist, damit Änderungen des Kunden ohne Deploy sichtbar werden.
         Betrifft auch die Rechtsseiten, siehe revalidate in den page.tsx. */
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data?.[0] as DirectusItem) ?? null;
  } catch {
    return null;
  }
}

/**
 * Ein csv-Feld aus Directus. Die API liefert je nach Alter des Eintrags eine
 * Liste oder eine Zeichenkette mit Kommas, deshalb beide Formen abfangen.
 */
function liste(wert: unknown): string[] | null {
  const roh = Array.isArray(wert)
    ? wert
    : typeof wert === 'string' && wert.trim()
      ? wert.split(',')
      : null;
  if (!roh) return null;
  const sauber = roh.map((w) => String(w).trim()).filter(Boolean);
  return sauber.length ? sauber : null;
}

/** Die Leistungen aus dem json-Feld, unbrauchbare Einträge fallen weg. */
function leistungen(wert: unknown): Leistung[] | null {
  if (!Array.isArray(wert)) return null;
  const gueltig = wert
    .filter((x): x is Record<string, unknown> => typeof x === 'object' && x !== null)
    .map((x) => ({
      titel: String(x.titel ?? '').trim(),
      beschreibung: String(x.beschreibung ?? '').trim(),
    }))
    .filter((x) => x.titel);
  return gueltig.length ? gueltig : null;
}

/** Text oder null. Leere Zeichenketten aus Directus gelten als nicht gesetzt. */
function text(wert: unknown): string | null {
  return typeof wert === 'string' && wert.trim() !== '' ? wert : null;
}

export async function getSiteData(): Promise<SiteData> {
  const item = await ladeItem();
  if (!item) return fallback;

  const abgeleitet = anschrift(
    text(item.strasse_hausnummer),
    text(item.plz),
    text(item.ort)
  );

  return {
    firmenname: text(item.firmenname) ?? fallback.firmenname,
    ueber_uns_text: text(item.ueber_uns_text) ?? fallback.ueber_uns_text,
    ueber_uns_text2: text(item.ueber_uns_text2) ?? fallback.ueber_uns_text2,
    mission: text(item.mission) ?? fallback.mission,
    telefon: text(item.telefon) ?? fallback.telefon,
    email: text(item.email) ?? fallback.email,
    adresse: abgeleitet || fallback.adresse,
    linkedin: text(item.linkedin) ?? fallback.linkedin,
    hero_headline: text(item.hero_headline),
    hero_headline2: text(item.hero_headline2),
    hero_subline: text(item.hero_subline),
    hero_tagline: text(item.hero_tagline),
    hero_rolle: text(item.hero_rolle),
    about_heading: text(item.about_heading),
    about_tags: liste(item.about_tags),
    services_heading: text(item.services_heading),
    services_items: leistungen(item.services_items),
    region_heading: text(item.region_heading),
    region_text: text(item.region_text),
    region_badges: liste(item.region_badges),
    partners_heading: text(item.partners_heading),
    partners_text: text(item.partners_text),
    contact_heading: text(item.contact_heading),
    contact_subtext: text(item.contact_subtext),
    contact_vorteil1_titel: text(item.contact_vorteil1_titel),
    contact_vorteil1_text: text(item.contact_vorteil1_text),
    contact_vorteil2_titel: text(item.contact_vorteil2_titel),
    contact_vorteil2_text: text(item.contact_vorteil2_text),
    foto_hero: bildAusDirectus(item.foto_hero as DirectusDatei, DIRECTUS_URL, 'foto_hero'),
    foto_ueber_uns: bildAusDirectus(
      item.foto_ueber_uns as DirectusDatei,
      DIRECTUS_URL,
      'foto_ueber_uns'
    ),
  };
}

/**
 * Daten für die Rechtsseiten.
 *
 * Anders als getSiteData gibt es hier bewusst keine hinterlegten Ersatzwerte.
 * Ein Impressum aus einem Fallback wäre eine Behauptung über einen anderen
 * Rechtsträger; fehlen die Angaben, muss die Seite das zeigen und nicht
 * überdecken.
 */
export async function getLegalData(): Promise<LegalData | null> {
  const item = await ladeItem();
  if (!item) return null;

  const flag = (wert: unknown) => wert === true;

  return {
    firmenname: text(item.firmenname),
    rechtsform: text(item.rechtsform),
    strasse_hausnummer: text(item.strasse_hausnummer),
    plz: text(item.plz),
    ort: text(item.ort),
    email: text(item.email),
    telefon: text(item.telefon),
    vertretungsberechtigte_person: text(item.vertretungsberechtigte_person),
    uid: text(item.uid),
    firmenbuchnummer: text(item.firmenbuchnummer),
    firmenbuchgericht: text(item.firmenbuchgericht),
    taetigkeit: text(item.taetigkeit),
    zweck_des_mediums: text(item.zweck_des_mediums),
    grundlegende_richtung: text(item.grundlegende_richtung),
    zielgruppe: text(item.zielgruppe),
    wirtschaftskammer: text(item.wirtschaftskammer),
    fachgruppe: text(item.fachgruppe),
    gewerbebehoerde: text(item.gewerbebehoerde),
    zvr_zahl: text(item.zvr_zahl),
    berufsrecht: text(item.berufsrecht),
    domain: text(item.domain),
    cloudflare_proxy: flag(item.cloudflare_proxy),
    turnstile: flag(item.turnstile),
    reichweitenmessung: text(item.reichweitenmessung),
    google_analytics: flag(item.google_analytics),
    newsletter_tool: text(item.newsletter_tool),
    buchungstool: text(item.buchungstool),
    google_rezensionen: flag(item.google_rezensionen),
    standortkarte: flag(item.standortkarte),
    whatsapp_link: flag(item.whatsapp_link),
  };
}

/**
 * Entfernt die deutschen Inhaltsfelder und behält nur die Stammdaten.
 *
 * Next.js serialisiert die Props von Client-Komponenten in die ausgelieferte
 * Seite. Wird `data` unverändert übergeben, landen sämtliche deutschen Texte
 * auch in der englischen Fassung, wo sie nie gelesen werden: Auf Englisch
 * gewinnt immer `messages/en.json`. Das ist nicht falsch, aber unnötiger
 * Ballast in jeder englischen Seite.
 *
 * Die Stammdaten bleiben, sie gelten in beiden Sprachen.
 */
export function ohneInhalte(data: SiteData): SiteData {
  return {
    ...data,
    ueber_uns_text: '',
    ueber_uns_text2: '',
    mission: '',
    hero_headline: null,
    hero_headline2: null,
    hero_subline: null,
    hero_tagline: null,
    hero_rolle: null,
    about_heading: null,
    about_tags: null,
    services_heading: null,
    services_items: null,
    region_heading: null,
    region_text: null,
    region_badges: null,
    partners_heading: null,
    partners_text: null,
    contact_heading: null,
    contact_subtext: null,
    contact_vorteil1_titel: null,
    contact_vorteil1_text: null,
    contact_vorteil2_titel: null,
    contact_vorteil2_text: null,
  };
}

export function getAssetUrl(id: string) {
  return `${DIRECTUS_URL}/assets/${id}`;
}
