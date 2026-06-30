'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const states = [
  {
    id: 'V', abbr: 'V',
    path: 'M 0,139 L 44,139 L 44,197 L 0,197 Z',
    lx: 22, ly: 170, fs: 5,
  },
  {
    id: 'T', abbr: 'T',
    path: 'M 44,119 L 195,119 L 195,197 L 162,214 L 44,214 Z',
    lx: 125, ly: 168, fs: 7,
  },
  {
    id: 'S', abbr: 'S',
    path: 'M 195,96 L 228,96 L 228,119 L 325,119 L 325,197 L 254,212 L 195,212 Z',
    lx: 258, ly: 158, fs: 6,
  },
  {
    id: 'OÖ', abbr: 'OÖ', highlight: true,
    path: 'M 228,10 L 354,10 L 354,120 L 325,119 L 228,119 Z',
    lx: 291, ly: 72, fs: 10,
  },
  {
    id: 'NÖ', abbr: 'NÖ',
    path: 'M 354,10 L 490,29 L 490,115 L 455,120 L 354,120 Z',
    lx: 418, ly: 72, fs: 7,
  },
  {
    id: 'W', abbr: 'W',
    path: 'M 434,72 L 460,72 L 460,91 L 434,91 Z',
    lx: 447, ly: 82, fs: 4,
  },
  {
    id: 'ST', abbr: 'ST',
    path: 'M 325,119 L 455,120 L 455,232 L 357,232 L 325,212 L 325,197 Z',
    lx: 376, ly: 182, fs: 7,
  },
  {
    id: 'K', abbr: 'K',
    path: 'M 195,212 L 254,212 L 325,197 L 357,232 L 357,255 L 195,255 Z',
    lx: 272, ly: 234, fs: 6,
  },
  {
    id: 'B', abbr: 'B',
    path: 'M 455,92 L 495,92 L 495,240 L 422,240 L 422,149 L 455,120 Z',
    lx: 467, ly: 170, fs: 5,
  },
];

export default function Region() {
  const t = useTranslations('region');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="region" className="py-24 lg:py-32 bg-[var(--dark)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={ref}>
            <motion.span
              className="text-[var(--teal-400)] text-xs font-semibold tracking-[0.2em] uppercase border-b border-[var(--teal-700)] pb-1 inline-block"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              {t('label')}
            </motion.span>
            <motion.h2
              className="font-display text-3xl sm:text-4xl font-bold text-white mt-5 mb-6 leading-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('heading')}
            </motion.h2>
            <motion.p
              className="text-gray-300 leading-relaxed text-base sm:text-lg mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('text')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 bg-[var(--teal-800)]/60 border border-[var(--teal-700)]/50 text-[var(--teal-400)] text-sm font-semibold px-4 py-2 rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {t('badge')}
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-[var(--teal-900)]/40 border border-[var(--teal-800)]/40 rounded-2xl p-6 overflow-hidden">
              <div
                className="absolute inset-0 opacity-5 rounded-2xl"
                style={{ backgroundImage: `radial-gradient(circle at 50% 50%, var(--teal-600) 0%, transparent 70%)` }}
                aria-hidden="true"
              />

              <svg
                viewBox="0 0 500 258"
                className="w-full"
                aria-label="Österreichkarte: Alle Bundesländer, Oberösterreich hervorgehoben"
              >
                <title>Österreichkarte – Schwerpunkt Oberösterreich</title>

                {/* State polygons */}
                {states.map((s) => (
                  <path
                    key={s.id}
                    d={s.path}
                    fill={s.highlight ? 'var(--teal-500)' : 'white'}
                    fillOpacity={s.highlight ? 0.45 : 0.06}
                    stroke={s.highlight ? 'var(--teal-300)' : 'white'}
                    strokeOpacity={s.highlight ? 1 : 0.2}
                    strokeWidth={s.highlight ? 1.5 : 0.7}
                    aria-hidden="true"
                  />
                ))}

                {/* State abbreviation labels */}
                {states.map((s) => (
                  <text
                    key={`lbl-${s.id}`}
                    x={s.lx}
                    y={s.ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={s.highlight ? 'white' : 'rgba(255,255,255,0.38)'}
                    fontSize={s.fs}
                    fontFamily="Inter, sans-serif"
                    fontWeight={s.highlight ? '700' : '500'}
                    aria-hidden="true"
                  >
                    {s.abbr}
                  </text>
                ))}

                {/* Oberösterreich full name above abbr */}
                <text
                  x={291}
                  y={48}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize={4.8}
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                  letterSpacing="0.8"
                  aria-hidden="true"
                >
                  Oberösterreich
                </text>

                {/* Linz pulsing dot */}
                {inView && (
                  <>
                    <motion.circle
                      cx={311} cy={71} r={3}
                      fill="none"
                      stroke="var(--teal-300)"
                      strokeWidth="0.8"
                      initial={{ r: 3, opacity: 0.9 }}
                      animate={{ r: 11, opacity: 0 }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
                    />
                    <motion.circle
                      cx={311} cy={71} r={3}
                      fill="none"
                      stroke="var(--teal-300)"
                      strokeWidth="0.8"
                      initial={{ r: 3, opacity: 0.9 }}
                      animate={{ r: 11, opacity: 0 }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.7 }}
                    />
                  </>
                )}
                <circle cx={311} cy={71} r={3} fill="var(--teal-300)" aria-hidden="true" />
                <text x={316} y={68} fill="white" fontSize={4.5} fontFamily="Inter, sans-serif" fontWeight="600" aria-hidden="true">
                  Linz
                </text>

                {/* Wien dot */}
                <circle cx={447} cy={82} r={2} fill="rgba(255,255,255,0.45)" aria-hidden="true" />
                <text x={451} y={79} fill="rgba(255,255,255,0.45)" fontSize={3.8} fontFamily="Inter, sans-serif" aria-hidden="true">
                  Wien
                </text>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
