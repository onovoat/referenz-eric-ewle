'use client';

import { motion } from 'framer-motion';

const widgets = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/eric-ewle-5946831a1',
    target: '_blank',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'E-Mail schreiben',
    href: 'mailto:office@ericewle.at',
    target: '_self',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Anrufen',
    href: 'tel:+436767068736',
    target: '_self',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

export default function StickyWidgets() {
  return (
    <div
      className="fixed bottom-6 right-4 sm:right-6 z-30 flex flex-col gap-2"
      role="complementary"
      aria-label="Schnellkontakt"
    >
      {widgets.map((w, i) => (
        <motion.a
          key={w.label}
          href={w.href}
          target={w.target}
          rel={w.target === '_blank' ? 'noopener noreferrer' : undefined}
          aria-label={w.label}
          className="w-11 h-11 rounded-full bg-[var(--teal-800)] hover:bg-[var(--teal-700)] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--teal-600)] focus:ring-offset-2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
        >
          {w.icon}
        </motion.a>
      ))}
    </div>
  );
}
