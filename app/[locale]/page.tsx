import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Region from '@/components/Region';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getSiteData, ohneInhalte } from '@/lib/directus';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const geladen = await getSiteData();
  /* Auf Englisch gewinnt immer messages/en.json, die deutschen Inhaltsfelder
     werden dort nie gelesen. Sie gar nicht mitzugeben haelt die englische
     Seite frei von Text, den sie nicht braucht. Siehe ohneInhalte(). */
  const data = locale === 'de' ? geladen : ohneInhalte(geladen);

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="pt-16 lg:pt-20">
        <Hero data={data} />
        <About data={data} />
        <Services data={data} />
        <Region data={data} />
        <Partners data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </>
  );
}
