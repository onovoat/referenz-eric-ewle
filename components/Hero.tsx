'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { SiteData } from '@/lib/directus';
import Image from 'next/image';

type Props = {
  data: SiteData;
};

export default function Hero({ data }: Props) {
  const t = useTranslations('hero');

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--dark)]"
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(ellipse at 60% 50%, var(--teal-700) 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen lg:py-32">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[var(--teal-400)] text-sm font-semibold tracking-widest uppercase mb-6">
                IT Personalberatung
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('headline')}
              <br />
              <span className="text-[var(--teal-400)]">{t('headline2')}</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('subline')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[var(--teal-600)] hover:bg-[var(--teal-700)] text-white font-semibold px-8 py-4 rounded-lg transition-colors text-base min-h-[44px]"
              >
                {t('cta')}
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-medium px-8 py-4 rounded-lg transition-colors text-base min-h-[44px]"
              >
                {t('scroll')}
              </a>
            </motion.div>

            <motion.div
              className="flex items-center gap-8 mt-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-gray-400 mt-1">Direktvermittlung</div>
              </div>
              <div className="w-px h-10 bg-white/10" aria-hidden="true" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">OÖ</div>
                <div className="text-xs text-gray-400 mt-1">Fokus Region</div>
              </div>
              <div className="w-px h-10 bg-white/10" aria-hidden="true" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">IT</div>
                <div className="text-xs text-gray-400 mt-1">Spezialist</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-md mx-auto shadow-2xl shadow-black/50">
              {data.foto_hero ? (
                <Image
                  src={data.foto_hero}
                  alt="Eric Ewle – IT Personalberater"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--teal-900)] to-[var(--teal-700)] flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <svg className="w-24 h-24 mx-auto mb-4 opacity-40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                    <p className="text-sm">Foto Eric Ewle</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <p className="text-white text-sm font-semibold">Eric Ewle</p>
                  <p className="text-gray-300 text-xs mt-0.5">IT Personalberater, Wien</p>
                </div>
              </div>
            </div>

            <div
              className="absolute -top-4 -right-4 w-72 h-72 rounded-full bg-[var(--teal-800)] opacity-20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
