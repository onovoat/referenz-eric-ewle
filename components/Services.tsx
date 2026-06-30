'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const icons = [
  <svg key="people" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  <svg key="search" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>,
  <svg key="chart" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>,
];

export default function Services() {
  const t = useTranslations('services');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section id="services" className="py-24 lg:py-32 bg-[var(--bg-alt)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Left-aligned header — editorial, not centered */}
        <div ref={ref} className="max-w-xl mb-16">
          <motion.span
            className="text-[var(--teal-700)] text-xs font-semibold tracking-[0.2em] uppercase border-b border-[var(--teal-400)] pb-1"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {t('label')}
          </motion.span>
          <motion.h2
            className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-5 leading-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('heading')}
          </motion.h2>
        </div>

        {/* Cards — numbered editorial style, not identical pill-grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group bg-white hover:bg-[var(--cream)] p-8 transition-colors duration-300 flex flex-col"
            >
              {/* Number + icon row */}
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-4xl font-bold text-[var(--teal-800)]/10 leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-10 h-10 rounded-lg bg-[var(--teal-800)] group-hover:bg-[var(--teal-700)] text-white flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                  {icons[i]}
                </div>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-3">{item.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm flex-1">{item.description}</p>
              {/* Bottom accent line on hover */}
              <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-[var(--teal-700)] transition-all duration-500 rounded-full" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
