'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/*
  SVG Austria map — geographically calibrated coordinate system.
  Projection: x = (lon − 9.5) × 95 + 10  |  y = (48.95 − lat) × 187 + 10
  ViewBox: 760 × 500

  All adjacent states share exact boundary vertices (no gaps/overlaps).
  Junction nodes verified against geographic reference data.
*/

const states = [
  {
    id: 'V',
    // Vorarlberg (lon 9.52–10.18, lat 47.05–47.58)
    path: 'M 12,266 L 75,266 L 75,365 L 12,365 Z',
    lx: 43, ly: 316,
  },
  {
    id: 'T',
    // Tirol — long panhandle (lon 10.18–12.50, lat 46.83–47.82)
    path: 'M 75,221 L 295,221 L 274,406 L 75,406 Z',
    lx: 175, ly: 320,
  },
  {
    id: 'S',
    // Salzburg — wedge with northern Germany tip (lon 12.28–13.98, lat 46.83–48.05)
    path: 'M 295,221 L 300,178 L 343,221 L 436,221 L 436,403 L 274,406 Z',
    lx: 360, ly: 310,
  },
  {
    id: 'OÖ',
    // Oberösterreich — large northern state, HIGHLIGHTED (lon 13.00–14.97, lat 47.82–48.88)
    path: 'M 343,23 L 530,34 L 530,221 L 343,221 Z',
    lx: 437, ly: 127,
    highlight: true,
  },
  {
    id: 'NÖ',
    // Niederösterreich (lon 14.97–17.15, lat 47.82–48.82)
    path: 'M 530,34 L 737,47 L 737,238 L 682,221 L 530,221 Z',
    lx: 620, ly: 138,
  },
  {
    id: 'W',
    // Wien — tiny enclave in NÖ (lon 16.18–16.58, lat 48.12–48.32)
    path: 'M 636,128 L 683,128 L 683,165 L 636,165 Z',
    lx: 659, ly: 147,
  },
  {
    id: 'ST',
    // Steiermark (lon 13.98–16.50, lat 46.60–47.82)
    path: 'M 436,221 L 682,221 L 682,365 L 600,440 L 535,440 L 436,403 Z',
    lx: 555, ly: 333,
  },
  {
    id: 'K',
    // Kärnten (lon 12.28–15.10, lat 46.35–46.83)
    path: 'M 274,406 L 436,403 L 535,440 L 535,481 L 274,481 Z',
    lx: 405, ly: 453,
  },
  {
    id: 'B',
    // Burgenland — thin eastern strip (lon 16.50–17.15, lat 46.75–47.82)
    path: 'M 682,221 L 737,238 L 737,412 L 682,412 Z',
    lx: 710, ly: 330,
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
            <svg
              viewBox="0 0 760 500"
              className="w-full"
              style={{ overflow: 'visible' }}
              aria-label="Österreichkarte: Alle 9 Bundesländer – Oberösterreich hervorgehoben"
              role="img"
            >
              <title>Österreichkarte – Schwerpunkt Oberösterreich</title>

              {/* Non-highlighted states — transparent fill, white outline */}
              {states.filter(s => !s.highlight).map(s => (
                <path
                  key={s.id}
                  d={s.path}
                  fill="transparent"
                  stroke="rgba(255,255,255,0.30)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  aria-hidden="true"
                />
              ))}

              {/* OÖ — cream/beige fill */}
              {states.filter(s => s.highlight).map(s => (
                <path
                  key={s.id}
                  d={s.path}
                  fill="#fdf8f0"
                  fillOpacity="0.85"
                  stroke="rgba(255,255,255,0.65)"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  aria-hidden="true"
                />
              ))}

              {/* State labels — small abbreviations */}
              {states
                .filter(s => !s.highlight && s.id !== 'W' && s.id !== 'V' && s.id !== 'B')
                .map(s => (
                  <text
                    key={`lbl-${s.id}`}
                    x={s.lx}
                    y={s.ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(255,255,255,0.30)"
                    fontSize="10"
                    fontFamily="Inter, system-ui, sans-serif"
                    fontWeight="500"
                    aria-hidden="true"
                  >
                    {s.id}
                  </text>
                ))}

              {/* OÖ label */}
              <text
                x={437}
                y={105}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(20,50,45,0.8)"
                fontSize="8"
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="600"
                letterSpacing="0.8"
                aria-hidden="true"
              >
                Oberösterreich
              </text>
              <text
                x={437}
                y={121}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(20,50,45,0.85)"
                fontSize="13"
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="700"
                aria-hidden="true"
              >
                OÖ
              </text>

              {/* Linz city dot — pulsing */}
              {inView && (
                <>
                  <motion.circle
                    cx={465} cy={130}
                    r={5}
                    fill="none"
                    stroke="rgba(45,100,85,0.7)"
                    strokeWidth="1"
                    initial={{ r: 5, opacity: 0.7 }}
                    animate={{ r: 18, opacity: 0 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
                  />
                  <motion.circle
                    cx={465} cy={130}
                    r={5}
                    fill="none"
                    stroke="rgba(45,100,85,0.7)"
                    strokeWidth="1"
                    initial={{ r: 5, opacity: 0.7 }}
                    animate={{ r: 18, opacity: 0 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.6 }}
                  />
                </>
              )}
              <circle cx={465} cy={130} r={5} fill="rgba(30,80,65,0.9)" aria-hidden="true" />
              <text x={473} y={127} fill="rgba(20,50,45,0.85)" fontSize="7" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" aria-hidden="true">
                Linz
              </text>

              {/* Wien dot */}
              <circle cx={659} cy={147} r={3} fill="rgba(255,255,255,0.35)" aria-hidden="true" />
              <text x={664} y={144} fill="rgba(255,255,255,0.28)" fontSize="6" fontFamily="Inter, system-ui, sans-serif" aria-hidden="true">
                Wien
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
