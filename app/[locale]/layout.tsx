import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import CookieBanner from '@/components/CookieBanner';
import StickyWidgets from '@/components/StickyWidgets';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isDe = locale === 'de';
  return {
    title: isDe
      ? 'Eric Ewle – IT Personalberatung & Recruiting in Oberösterreich'
      : 'Eric Ewle – IT Recruitment Consulting in Upper Austria',
    description: isDe
      ? 'Ich verbinde IT-Fachkräfte und Unternehmen in Oberösterreich. Direktvermittlung, Active Sourcing und Prozessoptimierung von Eric Ewle, Wien.'
      : 'I connect IT professionals and companies in Upper Austria. Direct placement, active sourcing and process optimization by Eric Ewle, Vienna.',
    keywords: isDe
      ? ['IT Personalberatung', 'IT Recruiting', 'Personalvermittlung Oberösterreich', 'Active Sourcing', 'Eric Ewle']
      : ['IT Recruitment', 'IT Staffing', 'Recruitment Consulting Upper Austria', 'Active Sourcing', 'Eric Ewle'],
    authors: [{ name: 'Eric Ewle' }],
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
    openGraph: {
      title: isDe ? 'Eric Ewle – IT Personalberatung' : 'Eric Ewle – IT Recruitment Consulting',
      description: isDe
        ? 'IT-Fachkräfte und Unternehmen erfolgreich zusammenbringen.'
        : 'Connecting IT professionals and companies successfully.',
      locale: isDe ? 'de_AT' : 'en_US',
      type: 'website',
      url: 'https://eric-ewle.onovo.at',
      siteName: 'Eric Ewle',
    },
    twitter: {
      card: 'summary_large_image',
      title: isDe ? 'Eric Ewle – IT Personalberatung' : 'Eric Ewle – IT Recruitment Consulting',
      description: isDe
        ? 'IT-Fachkräfte und Unternehmen erfolgreich zusammenbringen.'
        : 'Connecting IT professionals and companies successfully.',
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Eric Ewle Personalberatung',
  description: 'IT Personalberatung und Recruiting in Oberösterreich',
  url: 'https://eric-ewle.onovo.at',
  telephone: '+43 676 706 8736',
  email: 'office@ericewle.at',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dresdnerstrasse 117',
    addressLocality: 'Wien',
    postalCode: '1020',
    addressCountry: 'AT',
  },
  areaServed: 'AT-4',
  sameAs: ['https://www.linkedin.com/in/eric-ewle-5946831a1'],
};

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
          <StickyWidgets />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
