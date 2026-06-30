'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/*
  SVG paths traced from reference Austria map (300×210px → scaled 2×).
  Coordinate system: origin = image top-left, x right, y down.

  Paths follow the actual visual boundary of the reference map image.
*/

const states = [
  {
    id: 'V',
    // Vorarlberg – small far-west
    path: 'M 24,194 L 58,190 L 60,214 L 56,260 L 24,262 Z',
    lx: 38, ly: 226, abbr: 'V',
  },
  {
    id: 'T',
    // Tirol – long western strip with south panhandle
    path: 'M 56,170 L 330,180 L 294,314 L 80,330 L 38,312 L 56,260 Z',
    lx: 170, ly: 242, abbr: 'T',
  },
  {
    id: 'S',
    // Salzburg – wedge between Tirol and OÖ/Steiermark, dips north to touch Germany
    path: 'M 330,180 L 308,162 L 414,180 L 412,286 L 370,330 L 294,314 Z',
    lx: 356, ly: 258, abbr: 'S',
  },
  {
    id: 'OÖ',
    // Oberösterreich – large northern state, HIGHLIGHTED
    path: 'M 330,36 L 418,40 L 418,186 L 414,180 L 330,180 Z',
    lx: 375, ly: 112, abbr: 'OÖ',
    highlight: true,
  },
  {
    id: 'NÖ',
    // Niederösterreich – large northeastern state
    path: 'M 418,40 L 590,62 L 590,204 L 418,204 L 418,186 Z',
    lx: 504, ly: 130, abbr: 'NÖ',
  },
  {
    id: 'W',
    // Wien – tiny box within NÖ
    path: 'M 506,124 L 528,124 L 528,150 L 506,150 Z',
    lx: 517, ly: 137, abbr: 'W',
  },
  {
    id: 'ST',
    // Steiermark – large southeastern
    path: 'M 414,180 L 418,186 L 418,204 L 590,204 L 572,328 L 454,336 L 370,330 L 412,286 Z',
    lx: 490, ly: 278, abbr: 'ST',
  },
  {
    id: 'K',
    // Kärnten – wide southern strip
    path: 'M 294,314 L 370,330 L 454,336 L 454,394 L 294,394 Z',
    lx: 372, ly: 364, abbr: 'K',
  },
  {
    id: 'B',
    // Burgenland – thin eastern strip
    path: 'M 532,166 L 590,172 L 590,358 L 532,368 Z',
    lx: 561, ly: 268, abbr: 'B',
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
            {/* Subtle ambient glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(45,90,80,0.25) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            <svg
              viewBox="0 0 590 415"
              className="w-full"
              style={{ overflow: 'visible' }}
              aria-label="Österreichkarte: Alle Bundesländer – Oberösterreich hervorgehoben"
            >
              <title>Österreichkarte – Schwerpunkt Oberösterreich</title>

              {/* Non-highlighted states – transparent fill, white outline */}
              {states.filter(s => !s.highlight).map(s => (
                <path
                  key={s.id}
                  d={s.path}
                  fill="transparent"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  aria-hidden="true"
                />
              ))}

              {/* OÖ – filled with site cream/beige */}
              {states.filter(s => s.highlight).map(s => (
                <path
                  key={s.id}
                  d={s.path}
                  fill="#fdf8f0"
                  fillOpacity="0.88"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  aria-hidden="true"
                />
              ))}

              {/* State abbreviation labels (non-highlighted) */}
              {states.filter(s => !s.highlight && s.id !== 'W' && s.id !== 'V' && s.id !== 'B').map(s => (
                <text
                  key={`lbl-${s.id}`}
                  x={s.lx}
                  y={s.ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(255,255,255,0.32)"
                  fontSize="8"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                  aria-hidden="true"
                >
                  {s.abbr}
                </text>
              ))}

              {/* OÖ label */}
              <text
                x={375}
                y={96}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--teal-900)"
                fontSize="6"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
                letterSpacing="0.6"
                aria-hidden="true"
              >
                Oberösterreich
              </text>
              <text
                x={375}
                y={108}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--teal-800)"
                fontSize="10"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
                aria-hidden="true"
              >
                OÖ
              </text>

              {/* Linz city dot with pulse */}
              {inView && (
                <>
                  <motion.circle
                    cx={374} cy={122} r={4}
                    fill="none"
                    stroke="var(--teal-700)"
                    strokeWidth="1"
                    initial={{ r: 4, opacity: 0.8 }}
                    animate={{ r: 14, opacity: 0 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1 }}
                  />
                  <motion.circle
                    cx={374} cy={122} r={4}
                    fill="none"
                    stroke="var(--teal-700)"
                    strokeWidth="1"
                    initial={{ r: 4, opacity: 0.8 }}
                    animate={{ r: 14, opacity: 0 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.8 }}
                  />
                </>
              )}
              <circle cx={374} cy={122} r={4} fill="var(--teal-800)" aria-hidden="true" />
              <text x={380} y={119} fill="var(--teal-900)" fontSize="5.5" fontFamily="Inter, sans-serif" fontWeight="700" aria-hidden="true">
                Linz
              </text>

              {/* Wien dot */}
              <circle cx={517} cy={137} r={2.5} fill="rgba(255,255,255,0.4)" aria-hidden="true" />
              <text x={521} y={134} fill="rgba(255,255,255,0.38)" fontSize="4.5" fontFamily="Inter, sans-serif" aria-hidden="true">
                Wien
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
