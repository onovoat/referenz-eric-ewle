'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const cities = [
  { x: 52, y: 40, label: 'Linz', primary: true },
  { x: 32, y: 55, label: 'Wels', primary: false },
  { x: 68, y: 28, label: 'Freistadt', primary: false },
  { x: 75, y: 52, label: 'Steyr', primary: false },
  { x: 22, y: 38, label: 'Ried', primary: false },
  { x: 48, y: 68, label: 'Kirchdorf', primary: false },
];

const connections = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 4], [2, 3], [3, 5],
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
            aria-label="Karte Oberösterreich mit Netzwerk-Verbindungen"
          >
            <div className="relative bg-[var(--teal-900)]/40 border border-[var(--teal-800)]/40 rounded-2xl p-6 overflow-hidden">
              <div
                className="absolute inset-0 opacity-5 rounded-2xl"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, var(--teal-600) 0%, transparent 70%)`,
                }}
                aria-hidden="true"
              />

              <svg
                viewBox="0 0 100 90"
                className="w-full"
                role="img"
                aria-label="Netzwerkkarte Oberösterreich"
              >
                {/* Simplified OÖ shape outline */}
                <path
                  d="M10 35 L12 20 L20 15 L35 12 L50 10 L65 8 L80 12 L88 20 L90 35 L88 50 L82 62 L70 72 L58 78 L50 80 L38 75 L25 68 L15 55 Z"
                  fill="var(--teal-800)"
                  fillOpacity="0.3"
                  stroke="var(--teal-600)"
                  strokeWidth="0.8"
                  strokeOpacity="0.6"
                />

                {/* Network connection lines */}
                {connections.map(([a, b], i) => (
                  <motion.line
                    key={`${a}-${b}`}
                    x1={cities[a].x}
                    y1={cities[a].y}
                    x2={cities[b].x}
                    y2={cities[b].y}
                    stroke="var(--teal-400)"
                    strokeWidth="0.5"
                    strokeOpacity="0"
                    initial={{ strokeOpacity: 0 }}
                    animate={inView ? { strokeOpacity: [0, 0.6, 0.3] } : {}}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                ))}

                {/* Animated pulse rings on Linz */}
                {inView && (
                  <>
                    <motion.circle
                      cx={cities[0].x}
                      cy={cities[0].y}
                      r="3"
                      fill="none"
                      stroke="var(--teal-400)"
                      strokeWidth="0.5"
                      initial={{ r: 3, opacity: 0.8 }}
                      animate={{ r: 12, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
                    />
                    <motion.circle
                      cx={cities[0].x}
                      cy={cities[0].y}
                      r="3"
                      fill="none"
                      stroke="var(--teal-400)"
                      strokeWidth="0.5"
                      initial={{ r: 3, opacity: 0.8 }}
                      animate={{ r: 12, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
                    />
                  </>
                )}

                {/* City dots */}
                {cities.map((city, i) => (
                  <g key={city.label}>
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={city.primary ? 4 : 2.5}
                      fill={city.primary ? 'var(--teal-400)' : 'var(--teal-600)'}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                      style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                    />
                    <motion.text
                      x={city.x + (city.x > 50 ? -4 : 4)}
                      y={city.y - 5}
                      fill="var(--teal-100)"
                      fontSize="4.5"
                      fontFamily="Inter, sans-serif"
                      fontWeight={city.primary ? '700' : '500'}
                      textAnchor={city.x > 50 ? 'end' : 'start'}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                    >
                      {city.label}
                    </motion.text>
                  </g>
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
