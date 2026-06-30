'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import type { SiteData } from '@/lib/directus';
import Image from 'next/image';

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

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <AnimatedSection>
              <span className="text-[var(--teal-600)] text-xs font-bold tracking-widest uppercase">
                {t('label')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-3 mb-6 leading-tight">
                {t('heading')}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4 text-base sm:text-lg">
                {data.ueber_uns_text}
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base sm:text-lg">
                {data.ueber_uns_text2}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mt-8 p-6 bg-[var(--teal-50)] rounded-xl border border-[var(--teal-100)]">
                <p className="text-xs font-bold tracking-widest uppercase text-[var(--teal-700)] mb-2">
                  {t('mission_label')}
                </p>
                <p className="text-[var(--text-primary)] font-medium leading-relaxed">
                  {data.mission}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap gap-3 mt-8">
                {['IT-Recruiting', 'Direktvermittlung', 'Active Sourcing', 'Oberösterreich'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-[var(--teal-700)] bg-[var(--teal-50)] border border-[var(--teal-100)] px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </AnimatedSection>
          </div>

          <div className="order-1 lg:order-2">
            <AnimatedSection delay={0.1}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  {data.foto_ueber_uns ? (
                    <Image
                      src={data.foto_ueber_uns}
                      alt="Eric Ewle – Personalberater"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--teal-50)] to-[var(--teal-100)] flex items-center justify-center">
                      <div className="text-center text-[var(--teal-600)]">
                        <svg className="w-20 h-20 mx-auto mb-3 opacity-40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                        <p className="text-sm opacity-60">Foto folgt</p>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl bg-[var(--teal-800)] opacity-10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[var(--teal-400)] opacity-15"
                  aria-hidden="true"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
