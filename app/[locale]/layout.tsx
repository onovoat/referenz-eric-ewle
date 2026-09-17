import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import CookieBanner from '@/components/CookieBanner';
import StickyWidgets from '@/components/StickyWidgets';
import { getSiteData, getLegalData, type SiteData, type LegalData } from '@/lib/directus';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const locales = ['de', 'en'];
const SITE_URL = 'https://ericewle.at';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isDe = locale === 'de';
  const path = isDe ? '/' : '/en';
  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path,
      languages: { de: '/', en: '/en' },
    },
    title: isDe
      ? 'Eric Ewle | IT Personalberatung & Recruiting in OÖ, Wien & Salzburg'
      : 'Eric Ewle | IT Recruitment Consulting | Upper Austria, Vienna & Salzburg',
    description: isDe
      ? 'Ich verbinde IT-Fachkräfte und Unternehmen in OÖ, Wien und Salzburg. Direktvermittlung, Active Sourcing und Prozessoptimierung von Eric Ewle.'
      : 'I connect IT professionals and companies in Upper Austria, Vienna and Salzburg. Direct placement, active sourcing and process optimization by Eric Ewle.',
    keywords: isDe
      ? ['IT Personalberatung', 'IT Recruiting', 'Personalvermittlung Wien', 'Personalvermittlung Oberösterreich', 'IT Recruiting Salzburg', 'Active Sourcing', 'Eric Ewle']
      : ['IT Recruitment', 'IT Staffing', 'Recruitment Consulting Upper Austria', 'IT Recruiting Vienna', 'IT Recruiting Salzburg', 'Active Sourcing', 'Eric Ewle'],
    authors: [{ name: 'Eric Ewle' }],
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
    openGraph: {
      title: isDe ? 'Eric Ewle | IT Personalberatung' : 'Eric Ewle | IT Recruitment Consulting',
      description: isDe
        ? 'IT-Fachkräfte und Unternehmen erfolgreich zusammenbringen.'
        : 'Connecting IT professionals and companies successfully.',
      locale: isDe ? 'de_AT' : 'en_US',
      type: 'website',
      url: `${SITE_URL}${isDe ? '' : '/en'}`,
      siteName: 'Eric Ewle',
    },
    twitter: {
      card: 'summary_large_image',
      title: isDe ? 'Eric Ewle | IT Personalberatung' : 'Eric Ewle | IT Recruitment Consulting',
      description: isDe
        ? 'IT-Fachkräfte und Unternehmen erfolgreich zusammenbringen.'
        : 'Connecting IT professionals and companies successfully.',
    },
  };
}

/**
 * Strukturierte Daten aus den Stammdaten in Directus.
 *
 * Vorher standen Telefonnummer, E-Mail und Anschrift hier fest im Code, ein
 * zweites Mal im Footer und ein drittes Mal im Sticky-Widget. Aendert der Kunde
 * seine Nummer in Directus, aktualisierte sich nur die Datenschutzerklaerung,
 * und Google bekam weiter die alte: ein Widerspruch zwischen Rechtstext,
 * sichtbarer Seite und Suchmaschine.
 */
function baueJsonLd(data: SiteData, legal: LegalData | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Eric Ewle Personalberatung',
    description: 'IT Personalberatung und Recruiting in OÖ, Wien und Salzburg',
    url: 'https://ericewle.at',
    telephone: data.telefon,
    email: data.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: legal?.strasse_hausnummer ?? 'Dresdnerstrasse 117',
      addressLocality: legal?.ort ?? 'Wien',
      postalCode: legal?.plz ?? '1020',
      addressCountry: 'AT',
    },
    areaServed: ['AT-4', 'AT-9', 'AT-5'],
    sameAs: [data.linkedin],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  /* Stammdaten fuer die strukturierten Daten und das Sticky-Widget. */
  const data = await getSiteData();
  const legal = await getLegalData();
  const jsonLd = baueJsonLd(data, legal);

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-[var(--text-primary)] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[var(--teal-800)] focus:rounded focus:shadow-lg focus:outline-none"
        >
          Zum Hauptinhalt springen
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieBanner />
          <StickyWidgets
            data={{ telefon: data.telefon, email: data.email, linkedin: data.linkedin }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
