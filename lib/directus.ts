const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN!;

/** Inhaltsfelder, die die sichtbare Website füllt. */
export type SiteData = {
  firmenname: string;
  slogan: string;
  ueber_uns_text: string;
  ueber_uns_text2: string;
  mission: string;
  telefon: string;
  email: string;
  /**
   * Einzeilige Anschrift für die Darstellung und für {{ADRESSE}} in der
   * Datenschutzerklärung. Abgeleitet aus strasse_hausnummer, plz und ort, damit
   * es keine zweite, konkurrierende Wahrheit gibt: Ein eigenes Directus-Feld
   * daneben würde beim ersten Umzug auseinanderlaufen, und die falsche Fassung
   * stünde dann im Rechtstext.
   */
  adresse: string;
  linkedin: string;
  foto_hero: string | null;
  foto_ueber_uns: string | null;
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

const fallback: SiteData = {
  firmenname: 'Eric Ewle',
  slogan: 'Menschen verbinden. Erfolg gestalten.',
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

async function ladeItem(): Promise<DirectusItem | null> {
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/eric_ewle?limit=1`, {
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
    slogan: text(item.slogan) ?? fallback.slogan,
    ueber_uns_text: text(item.ueber_uns_text) ?? fallback.ueber_uns_text,
    ueber_uns_text2: text(item.ueber_uns_text2) ?? fallback.ueber_uns_text2,
    mission: text(item.mission) ?? fallback.mission,
    telefon: text(item.telefon) ?? fallback.telefon,
    email: text(item.email) ?? fallback.email,
    adresse: abgeleitet || fallback.adresse,
    linkedin: text(item.linkedin) ?? fallback.linkedin,
    foto_hero: item.foto_hero ? `${DIRECTUS_URL}/assets/${item.foto_hero}` : null,
    foto_ueber_uns: item.foto_ueber_uns
      ? `${DIRECTUS_URL}/assets/${item.foto_ueber_uns}`
      : null,
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

/** Einzeilige Anschrift aus den Rechtsfeldern, für {{ADRESSE}}. */
export function legalAnschrift(d: LegalData): string {
  return anschrift(d.strasse_hausnummer, d.plz, d.ort);
}

export function getAssetUrl(id: string) {
  return `${DIRECTUS_URL}/assets/${id}`;
}
