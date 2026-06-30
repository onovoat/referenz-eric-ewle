const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN!;

export type SiteData = {
  firmenname: string;
  slogan: string;
  ueber_uns_text: string;
  ueber_uns_text2: string;
  mission: string;
  telefon: string;
  email: string;
  adresse: string;
  linkedin: string;
  foto_hero: string | null;
  foto_ueber_uns: string | null;
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

export async function getSiteData(): Promise<SiteData> {
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/eric_ewle?limit=1`, {
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallback;
    const json = await res.json();
    const item = json.data?.[0];
    if (!item) return fallback;
    return {
      firmenname: item.firmenname || fallback.firmenname,
      slogan: item.slogan || fallback.slogan,
      ueber_uns_text: item.ueber_uns_text || fallback.ueber_uns_text,
      ueber_uns_text2: item.ueber_uns_text2 || fallback.ueber_uns_text2,
      mission: item.mission || fallback.mission,
      telefon: item.telefon || fallback.telefon,
      email: item.email || fallback.email,
      adresse: item.adresse || fallback.adresse,
      linkedin: item.linkedin || fallback.linkedin,
      foto_hero: item.foto_hero ? `${DIRECTUS_URL}/assets/${item.foto_hero}` : null,
      foto_ueber_uns: item.foto_ueber_uns ? `${DIRECTUS_URL}/assets/${item.foto_ueber_uns}` : null,
    };
  } catch {
    return fallback;
  }
}

export function getAssetUrl(id: string) {
  return `${DIRECTUS_URL}/assets/${id}`;
}
