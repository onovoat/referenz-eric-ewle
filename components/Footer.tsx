'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Props = {
  locale: string;
};

export default function Footer({ locale }: Props) {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[var(--dark)] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div>
            <p className="text-lg font-bold text-white mb-1">Eric Ewle</p>
            <p className="text-sm text-gray-400">{t('tagline')}</p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Kontakt</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="tel:+436767068736" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--teal-400)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +43 676 706 8736
                </a>
              </li>
              <li>
                <a href="mailto:office@ericewle.at" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--teal-400)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  office@ericewle.at
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-300 flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--teal-400)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Dresdnerstrasse 117, 1020 Wien
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Links</p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href={`/${locale}/impressum`} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('links.impressum')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/datenschutz`} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('links.datenschutz')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/agb`} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('links.agb')}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem('cookie-consent');
                    window.location.reload();
                  }}
                  className="text-sm text-gray-300 hover:text-white transition-colors text-left"
                >
                  {t('links.cookie')}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Eric Ewle. {t('rights')}
          </p>
          <a
            href="https://onovo.at"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            {t('credit')}
          </a>
        </div>
      </div>
    </footer>
  );
}
