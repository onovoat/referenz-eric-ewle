'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const otherLabel = locale === 'de' ? 'EN' : 'DE';

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#services', label: t('services') },
    { href: '#region', label: t('region') },
    { href: '#partners', label: t('partners') },
    { href: '#contact', label: t('contact') },
  ];

  const LangSwitcher = ({ className }: { className?: string }) => (
    <Link
      href={`/${otherLocale}`}
      className={`flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--teal-700)] transition-colors px-2 py-1 rounded-lg ${className ?? ''}`}
      aria-label={`Sprache wechseln zu ${otherLabel}`}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
      <span>{otherLabel}</span>
    </Link>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white ${
        scrolled ? 'shadow-sm' : 'shadow-none'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo / Name + Slogan */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label="Eric Ewle, zur Startseite">
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-[var(--teal-800)] tracking-tight leading-tight">
                Eric Ewle
              </span>
              <span className="hidden sm:block text-[10px] text-[var(--text-muted)] font-normal tracking-wide leading-none mt-0.5">
                Menschen verbinden. Erfolg gestalten.
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
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

          {/* Desktop: Lang + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <LangSwitcher />
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[var(--teal-800)] hover:bg-[var(--teal-700)] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              {t('cta')}
            </a>
          </div>

          {/* Mobile: Lang + Hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            <LangSwitcher />
            <button
              className="p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--teal-50)] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              <div className="w-6 h-5 flex flex-col justify-between" aria-hidden="true">
                <motion.span
                  className="block h-0.5 w-6 bg-current rounded-full origin-center"
                  animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-current rounded-full"
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.18 }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-current rounded-full origin-center"
                  animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--teal-700)] hover:bg-[var(--teal-50)] px-3 py-2.5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-[var(--border)]">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-[var(--teal-800)] hover:bg-[var(--teal-700)] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
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
