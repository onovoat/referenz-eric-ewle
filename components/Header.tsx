'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Props = {
  locale: string;
};

export default function Header({ locale }: Props) {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const otherLocale = locale === 'de' ? 'en' : 'de';
  const otherFlag = locale === 'de' ? '🇬🇧' : '🇦🇹';
  const otherLabel = locale === 'de' ? 'EN' : 'DE';

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#services', label: t('services') },
    { href: '#region', label: t('region') },
    { href: '#partners', label: t('partners') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2 group" aria-label="Eric Ewle – zur Startseite">
            <span className="text-lg font-bold text-[var(--teal-800)] tracking-tight">
              Eric Ewle
            </span>
            <span className="hidden sm:block text-xs text-[var(--text-secondary)] font-medium">
              IT Personalberatung
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Hauptnavigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--teal-700)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={`/${otherLocale}`}
              className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--teal-700)] transition-colors px-2 py-1 rounded"
              aria-label={`Sprache wechseln zu ${otherLabel}`}
            >
              <span aria-hidden="true">{otherFlag}</span>
              <span>{otherLabel}</span>
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[var(--teal-800)] hover:bg-[var(--teal-700)] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              {t('cta')}
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-md text-[var(--text-primary)] hover:bg-[var(--teal-50)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white border-t border-[var(--border)] shadow-lg"
        >
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--teal-700)] hover:bg-[var(--teal-50)] px-3 py-2.5 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[var(--border)]">
              <Link
                href={`/${otherLocale}`}
                className="flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)] px-3 py-2 rounded hover:bg-[var(--teal-50)] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <span aria-hidden="true">{otherFlag}</span>
                <span>{otherLabel}</span>
              </Link>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center bg-[var(--teal-800)] hover:bg-[var(--teal-700)] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                {t('cta')}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
