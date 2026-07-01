'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const partners = [
  {
    name: 'Infrasoft',
    url: 'https://infrasoft.at',
    description: 'IT-Lösungen und Softwareentwicklung',
    initial: 'IN',
  },
  {
    name: 'Talentvoll',
    url: 'https://www.talentvoll.at',
    description: 'Personalvermittlung und Karriereberatung',
    initial: 'TV',
  },
];

export default function Partners() {
  const t = useTranslations('partners');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="partners" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end mb-14">
          <div>
            <motion.span
              className="text-[var(--teal-700)] text-xs font-semibold tracking-[0.2em] uppercase border-b border-[var(--teal-400)] pb-1 inline-block"
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
          <motion.p
            className="text-[var(--text-secondary)] text-base leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {t('text')}
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {partners.map((partner, i) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center gap-5 bg-[var(--bg-alt)] hover:bg-[var(--teal-50)] border border-[var(--border)] hover:border-[var(--teal-400)] rounded-xl px-8 py-7 transition-all duration-300 min-w-[220px] focus:outline-none focus:ring-2 focus:ring-[var(--teal-600)] focus:ring-offset-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`${partner.name}: ${partner.description} (öffnet in neuem Tab)`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--teal-800)] group-hover:bg-[var(--teal-700)] text-white flex items-center justify-center font-bold text-sm transition-colors duration-300">
                {partner.initial}
              </div>
              <div>
                <div className="font-bold text-[var(--text-primary)] group-hover:text-[var(--teal-800)] transition-colors">
                  {partner.name}
                </div>
                <div
                  className={`text-xs text-[var(--text-secondary)] mt-0.5 transition-all duration-300 overflow-hidden ${
                    hovered === i ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100'
                  }`}
                >
                  {partner.description}
                </div>
              </div>
              <div
                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[var(--teal-600)]"
                aria-hidden="true"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
