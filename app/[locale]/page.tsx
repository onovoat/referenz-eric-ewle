import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Region from '@/components/Region';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getSiteData } from '@/lib/directus';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await getSiteData();

  return (
    <>
      <Header locale={locale} />
      <main id="main-content">
        <Hero data={data} />
        <About data={data} />
        <Services />
        <Region />
        <Partners />
        <Contact />
      </main>
      <Footer locale={locale} />
    </>
  );
}
