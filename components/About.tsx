'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import type { SiteData } from '@/lib/directus';
import Image from 'next/image';
import KiHinweis from '@/components/KiHinweis';

type Props = {
  data: SiteData;
};

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About({ data }: Props) {
  const t = useTranslations('about');
  const locale = useLocale();

  // For EN, CMS content is in German — fall back to translation strings
  const text1 = locale === 'de' ? (data.ueber_uns_text || t('text1')) : t('text1');
  const text2 = locale === 'de' ? (data.ueber_uns_text2 || t('text2')) : t('text2');
  const mission = locale === 'de' ? (data.mission || t('mission')) : t('mission');

  const tags = [t('tag1'), t('tag2'), t('tag3'), t('tag4')];

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <AnimatedSection>
              <span className="text-[var(--teal-700)] text-xs font-semibold tracking-[0.2em] uppercase border-b border-[var(--teal-400)] pb-1">
                {t('label')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-5 mb-6 leading-tight">
                {t('heading')}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4 text-base sm:text-lg">
                {text1}
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base sm:text-lg">
                {text2}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mt-8 p-6 bg-[var(--cream)] rounded-xl border-l-4 border-[var(--teal-700)]">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--teal-700)] mb-2">
                  {t('mission_label')}
                </p>
                <p className="text-[var(--text-primary)] font-medium leading-relaxed">
                  {mission}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap gap-2 mt-8">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-[var(--teal-700)] bg-[var(--bg-alt)] border border-[var(--border)] px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <div className="order-1 lg:order-2">
            <AnimatedSection delay={0.1}>
              <div className="relative">
                <div
                  className="absolute -right-4 -bottom-4 w-full h-full bg-[var(--teal-800)] opacity-[0.08]"
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/5] overflow-hidden shadow-lg shadow-black/10">
                  {data.foto_ueber_uns ? (
                    <Image
                      src={data.foto_ueber_uns.url}
                      alt={data.foto_ueber_uns.alt}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[var(--stone-100)] flex items-center justify-center">
                      <div className="text-center">
                        <span className="font-display text-6xl font-bold text-[var(--teal-800)]/20">EE</span>
                        <p className="text-xs text-[var(--text-muted)] mt-3 tracking-widest uppercase">Foto folgt</p>
                      </div>
                    </div>
                  )}
                </div>
                {data.foto_ueber_uns?.kiGeneriert && <KiHinweis />}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
