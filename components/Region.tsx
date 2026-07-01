'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/*
  Base map: /public/austria-karte.png  (400 × 283 px, RGBA transparent, white lines)
  SVG viewBox matches PNG dimensions exactly.
  OÖ fill path uses equirectangular projection calibrated to the PNG:
    x = (lon − 9.53) × 52.4
    y = (49.02 − lat) × 106.8
*/

// OÖ geographic boundary (~18 waypoints, irregular Böhmerwald northern edge)
const OÖ_PATH =
  'M 184,128 L 184,107 L 192,104 L 201,98 L 209,90 L 215,84' +
  ' L 223,74 L 229,64 L 236,52 L 244,42 L 253,29 L 262,16 L 270,13' +
  ' L 277,16 L 284,21 L 284,45 L 284,68 L 284,93 L 284,128' +
  ' L 275,128 L 259,128 L 244,128 L 233,128 L 220,128 L 208,128 L 195,128 Z';

export default function Region() {
  const t = useTranslations('region');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Linz: lon=14.29, lat=48.31 → (250, 76)
  const LINZ = { cx: 250, cy: 76 };

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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/*
              SVG viewBox = 400 × 283 (matches the PNG).
              Layer order (bottom → top):
                1. <image>  — the PNG with white Bundesland borders, transparent bg
                2. OÖ fill  — cream/beige polygon
                3. Linz dot + label
            */}
            <svg
              viewBox="0 0 400 283"
              className="w-full"
              style={{ overflow: 'visible' }}
              role="img"
              aria-label="Österreichkarte: Oberösterreich hervorgehoben"
            >
              <title>Österreich – Schwerpunkt Oberösterreich</title>

              {/* Base map PNG — white lines, transparent background */}
              <image
                href="/austria-karte.png"
                x="0" y="0"
                width="400" height="283"
                aria-hidden="true"
              />

              {/* OÖ fill — drawn below the white map lines */}
              <path
                d={OÖ_PATH}
                fill="var(--cream)"
                fillOpacity="0.82"
                aria-hidden="true"
              />

              {/* OÖ label inside the filled area */}
              <text
                x="234" y="88"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(20,55,48,0.85)"
                fontSize="7"
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="600"
                letterSpacing="0.6"
                aria-hidden="true"
              >
                Oberösterreich
              </text>

              {/* Linz — pulsing city dot */}
              {inView && (
                <>
                  <motion.circle
                    cx={LINZ.cx} cy={LINZ.cy} r={4} fill="none"
                    stroke="rgba(30,75,62,0.65)" strokeWidth="1"
                    initial={{ r: 4, opacity: 0.65 }}
                    animate={{ r: 18, opacity: 0 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.0 }}
                  />
                  <motion.circle
                    cx={LINZ.cx} cy={LINZ.cy} r={4} fill="none"
                    stroke="rgba(30,75,62,0.65)" strokeWidth="1"
                    initial={{ r: 4, opacity: 0.65 }}
                    animate={{ r: 18, opacity: 0 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.9 }}
                  />
                </>
              )}
              <circle cx={LINZ.cx} cy={LINZ.cy} r={4} fill="rgba(25,65,55,0.92)" aria-hidden="true" />
              <text
                x={LINZ.cx + 6} y={LINZ.cy - 1}
                fill="rgba(20,55,48,0.9)"
                fontSize="6"
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="700"
                aria-hidden="true"
              >
                Linz
              </text>
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
