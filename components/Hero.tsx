'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { SiteData } from '@/lib/directus';
import Image from 'next/image';

type Props = {
  data: SiteData;
};

// Animates a string character by character
function TypewriterText({ text, startDelay }: { text: string; startDelay: number }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: startDelay + i * 0.07 }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero({ data }: Props) {
  const t = useTranslations('hero');

  return (
    <section
      className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden"
      aria-label="Hero"
    >
      {/* Left panel — warm cream */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[56%] bg-[var(--cream)] px-8 sm:px-12 lg:px-16 xl:px-24 pt-28 pb-16 lg:py-0 min-h-[60vh] lg:min-h-screen">

        {/* Decorative thin vertical accent line */}
        <div
          className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-[var(--teal-800)] hidden lg:block"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <span className="inline-block text-[var(--teal-700)] text-xs font-semibold tracking-[0.2em] uppercase mb-6 border-b border-[var(--teal-400)] pb-1">
            IT Personalberatung · OÖ · Wien · Salzburg
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold text-[var(--text-primary)] leading-[1.15] mb-6">
            {t('headline')}
            <br />
            <span className="text-[var(--teal-800)]">{t('headline2')}</span>
          </h1>

          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-md">
            {t('subline')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-[var(--teal-800)] hover:bg-[var(--teal-700)] active:scale-[0.97] text-white font-semibold px-8 py-3.5 rounded-lg transition-all text-base min-h-[44px]"
            >
              {t('cta')}
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center border border-[var(--stone-200)] hover:border-[var(--teal-400)] hover:text-[var(--teal-800)] text-[var(--text-secondary)] font-medium px-8 py-3.5 rounded-lg transition-all text-base min-h-[44px] bg-white"
            >
              {t('scroll')}
            </a>
          </div>

          {/* Stats — full-width spread, typewriter entrance */}
          <div className="flex items-start justify-between pt-8 border-t border-[var(--border)]">
            <div>
              <div className="text-2xl font-bold text-[var(--teal-800)]">
                <TypewriterText text="100%" startDelay={0.8} />
              </div>
              <motion.div
                className="text-xs text-[var(--text-muted)] mt-1 leading-snug"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                Direktvermittlung<br />ohne Umwege
              </motion.div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--teal-800)]">
                <TypewriterText text="OÖ · W · S" startDelay={1.2} />
              </div>
              <motion.div
                className="text-xs text-[var(--text-muted)] mt-1 leading-snug"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.5 }}
              >
                OÖ · Wien · Salzburg
              </motion.div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--teal-800)]">
                <TypewriterText text="IT" startDelay={1.55} />
              </div>
              <motion.div
                className="text-xs text-[var(--text-muted)] mt-1 leading-snug"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.8 }}
              >
                Ausschließlich<br />IT-Positionen
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right panel — deep teal with photo */}
      <motion.div
        className="relative w-full lg:w-[44%] bg-[var(--teal-800)] min-h-[50vh] lg:min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
      >
        {/* Subtle dot pattern texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle, var(--teal-400) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {data.foto_hero ? (
          <Image
            src={data.foto_hero}
            alt="Eric Ewle, IT Personalberater"
            fill
            className="object-cover object-[72%_15%]"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div
                className="w-36 h-36 rounded-full border-2 border-[var(--teal-400)]/30 flex items-center justify-center mx-auto mb-4"
                aria-hidden="true"
              >
                <span className="font-display text-5xl font-bold text-white/20">EE</span>
              </div>
              <p className="text-white/30 text-sm tracking-widest uppercase">Foto folgt</p>
            </div>
          </div>
        )}

        {/* Bottom name overlay — gradient for elegance */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent pt-20 pb-7 px-8">
          <p className="text-white font-bold text-base tracking-wide">Eric Ewle</p>
          <p className="text-white/70 text-sm mt-0.5 font-light tracking-wider">IT Personalberater · Wien</p>
        </div>
      </motion.div>
    </section>
  );
}
