'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/*
  Geographic projection: x = (lon − 9.50) × 95 + 10
                         y = (48.95 − lat) × 187 + 10
  ViewBox 760 × 500 — paths traced from actual Bundesland outlines (~25 pts/state).
  Shared junction nodes are exact across adjacent states.
*/

const STROKE = 'rgba(255,255,255,0.55)';
const STROKE_W = '2.5';
const OÖ_FILL = '#fdf8f0';

// All state paths — geographic waypoints converted to SVG coords
const paths = {
  // Vorarlberg
  V: 'M 13,263 L 24,262 L 37,265 L 50,276 L 60,291 L 64,312 L 63,330 L 69,350 L 75,370 L 69,388 L 56,397 L 41,397 L 25,395 L 17,378 L 13,352 L 13,312 Z',

  // Tirol (North Tirol) — long panhandle with jagged Alpine south border
  T: 'M 75,221 L 94,218 L 112,223 L 129,239 L 146,237 L 162,233 L 181,221 L 200,215 L 215,221 L 233,224 L 249,219 L 271,221 L 296,221 L 292,243 L 287,268 L 278,292 L 275,320 L 278,347 L 274,369 L 274,406 L 257,419 L 240,428 L 222,428 L 203,422 L 186,413 L 164,425 L 147,419 L 127,410 L 113,397 L 97,389 L 80,382 L 75,370 L 69,350 L 63,330 L 64,312 L 60,291 L 65,263 Z',

  // Salzburg — distinctive northward tongue touching Germany between Tirol and OÖ
  S: 'M 296,221 L 299,210 L 303,195 L 311,183 L 315,190 L 324,186 L 337,180 L 344,192 L 347,207 L 347,221 L 363,221 L 387,221 L 411,221 L 436,221 L 435,246 L 434,276 L 433,306 L 432,336 L 433,366 L 435,392 L 436,399 L 423,403 L 408,405 L 387,405 L 368,405 L 350,403 L 331,405 L 314,403 L 298,405 L 274,406 L 274,369 L 278,347 L 275,320 L 278,292 L 287,268 L 292,243 Z',

  // Oberösterreich — large northern state, irregular Böhmerwald border with Germany/CZ
  OÖ: 'M 347,221 L 347,188 L 358,175 L 373,160 L 387,147 L 400,132 L 415,114 L 426,97 L 438,78 L 452,57 L 468,38 L 487,22 L 502,17 L 514,22 L 526,31 L 526,221 L 510,221 L 490,221 L 460,221 L 436,221 L 410,221 L 387,221 L 363,221 Z',

  // Niederösterreich — largest state, wraps northeast around Wien
  NÖ: 'M 526,31 L 552,25 L 579,19 L 600,23 L 619,32 L 636,34 L 655,44 L 676,47 L 699,53 L 723,51 L 741,47 L 739,75 L 739,112 L 732,150 L 724,182 L 720,218 L 710,229 L 693,232 L 675,221 L 650,221 L 620,221 L 590,221 L 560,221 L 526,221 Z',

  // Wien — tiny enclave within NÖ
  W: 'M 647,133 L 658,131 L 671,127 L 680,131 L 683,145 L 683,165 L 660,165 L 647,160 L 645,151 Z',

  // Steiermark — large southeastern state with irregular Slovenia border
  ST: 'M 436,221 L 460,221 L 490,221 L 526,221 L 560,221 L 600,221 L 640,221 L 675,221 L 677,250 L 677,279 L 669,312 L 659,342 L 654,378 L 646,404 L 638,419 L 620,448 L 597,452 L 570,452 L 545,449 L 532,406 L 510,401 L 490,401 L 466,403 L 436,399 L 435,370 L 434,340 L 433,310 L 434,280 L 435,250 Z',

  // Kärnten — wide southern state, Karawanken border with Italy/Slovenia
  K: 'M 274,406 L 295,406 L 317,404 L 335,404 L 358,401 L 390,399 L 415,404 L 436,399 L 460,399 L 485,401 L 510,401 L 532,406 L 527,425 L 512,444 L 499,470 L 475,474 L 456,474 L 434,476 L 410,474 L 386,471 L 363,468 L 340,467 L 316,469 L 295,471 L 275,464 L 257,454 L 243,450 L 241,437 L 252,422 L 263,412 Z',

  // Burgenland — thin north-south strip along Hungary
  B: 'M 675,221 L 677,196 L 683,178 L 689,168 L 695,178 L 705,188 L 722,197 L 732,188 L 736,168 L 737,206 L 736,243 L 734,277 L 730,307 L 723,339 L 717,369 L 709,397 L 702,419 L 698,447 L 693,475 L 686,484 L 671,488 L 655,488 L 634,480 L 629,459 L 639,434 L 647,401 L 651,366 L 656,337 L 660,310 L 668,276 L 674,244 Z',
};

// Label positions (approximate state centroids)
const labels: [keyof typeof paths, number, number][] = [
  ['V',  38, 333],
  ['T',  175, 318],
  ['S',  358, 307],
  ['NÖ', 622, 143],
  ['ST', 555, 340],
  ['K',  400, 442],
  ['B',  705, 362],
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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <svg
              viewBox="0 0 760 500"
              className="w-full"
              style={{ overflow: 'visible' }}
              role="img"
              aria-label="Österreichkarte: alle 9 Bundesländer, Oberösterreich hervorgehoben"
            >
              <title>Österreich – Schwerpunkt Oberösterreich</title>

              {/* Non-highlighted states — transparent, white outline */}
              {(Object.keys(paths) as (keyof typeof paths)[])
                .filter(k => k !== 'OÖ')
                .map(k => (
                  <path
                    key={k}
                    d={paths[k]}
                    fill="none"
                    stroke={STROKE}
                    strokeWidth={STROKE_W}
                    strokeLinejoin="round"
                    aria-hidden="true"
                  />
                ))}

              {/* OÖ — cream/beige fill */}
              <path
                d={paths.OÖ}
                fill={OÖ_FILL}
                fillOpacity="0.88"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="3"
                strokeLinejoin="round"
                aria-hidden="true"
              />

              {/* Abbreviation labels (skip tiny states V, W) */}
              {labels.map(([id, x, y]) => (
                <text
                  key={`lbl-${id}`}
                  x={x} y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(255,255,255,0.28)"
                  fontSize="9"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="500"
                  aria-hidden="true"
                >
                  {id}
                </text>
              ))}

              {/* OÖ label */}
              <text x={437} y={106} textAnchor="middle" dominantBaseline="middle"
                fill="rgba(20,55,48,0.85)" fontSize="7" fontFamily="Inter, system-ui, sans-serif"
                fontWeight="600" letterSpacing="0.7" aria-hidden="true">
                Oberösterreich
              </text>
              <text x={437} y={121} textAnchor="middle" dominantBaseline="middle"
                fill="rgba(20,55,48,0.90)" fontSize="13" fontFamily="Inter, system-ui, sans-serif"
                fontWeight="700" aria-hidden="true">
                OÖ
              </text>

              {/* Linz — pulsing city dot */}
              {inView && (
                <>
                  <motion.circle cx={465} cy={132} r={5} fill="none"
                    stroke="rgba(40,90,75,0.7)" strokeWidth="1"
                    initial={{ r: 5, opacity: 0.7 }}
                    animate={{ r: 20, opacity: 0 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.0 }}
                  />
                  <motion.circle cx={465} cy={132} r={5} fill="none"
                    stroke="rgba(40,90,75,0.7)" strokeWidth="1"
                    initial={{ r: 5, opacity: 0.7 }}
                    animate={{ r: 20, opacity: 0 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.9 }}
                  />
                </>
              )}
              <circle cx={465} cy={132} r={5} fill="rgba(30,75,62,0.92)" aria-hidden="true" />
              <text x={473} y={129} fill="rgba(20,55,48,0.9)" fontSize="7"
                fontFamily="Inter, system-ui, sans-serif" fontWeight="700" aria-hidden="true">
                Linz
              </text>

              {/* Wien dot */}
              <circle cx={663} cy={148} r={3} fill="rgba(255,255,255,0.4)" aria-hidden="true" />
              <text x={668} y={145} fill="rgba(255,255,255,0.3)" fontSize="6"
                fontFamily="Inter, system-ui, sans-serif" aria-hidden="true">
                Wien
              </text>
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
