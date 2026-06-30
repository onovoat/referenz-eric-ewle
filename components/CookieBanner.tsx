'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type ConsentState = {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
};

export default function CookieBanner() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>({
    necessary: true,
    statistics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (!stored) setVisible(true);
  }, []);

  function save(consent: ConsentState) {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-heading"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm z-50"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-[var(--border)] p-5">
            {!showSettings ? (
              <>
                <p id="cookie-heading" className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  Cookie-Einstellungen
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  {t('text')}{' '}
                  <Link href="/datenschutz" className="text-[var(--teal-700)] underline underline-offset-2 hover:text-[var(--teal-600)]">
                    {t('privacy_link')}
                  </Link>
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => save({ necessary: true, statistics: true, marketing: true })}
                    className="w-full bg-[var(--teal-800)] hover:bg-[var(--teal-700)] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors min-h-[44px]"
                  >
                    {t('accept_all')}
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => save({ necessary: true, statistics: false, marketing: false })}
                      className="flex-1 border border-[var(--border)] hover:border-[var(--teal-400)] text-[var(--text-secondary)] hover:text-[var(--teal-700)] text-xs font-semibold py-2.5 rounded-lg transition-colors min-h-[44px]"
                    >
                      {t('accept_necessary')}
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="flex-1 border border-[var(--border)] hover:border-[var(--teal-400)] text-[var(--text-secondary)] hover:text-[var(--teal-700)] text-xs font-semibold py-2.5 rounded-lg transition-colors min-h-[44px]"
                    >
                      {t('settings')}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p id="cookie-heading" className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                  Cookie-Einstellungen
                </p>
                <div className="flex flex-col gap-4 mb-5">
                  {[
                    { key: 'necessary', title: t('necessary_title'), text: t('necessary_text'), locked: true },
                    { key: 'statistics', title: t('stats_title'), text: t('stats_text'), locked: false },
                    { key: 'marketing', title: t('marketing_title'), text: t('marketing_text'), locked: false },
                  ].map((cat) => (
                    <div key={cat.key} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id={`cookie-${cat.key}`}
                        checked={prefs[cat.key as keyof ConsentState]}
                        disabled={cat.locked}
                        onChange={(e) => !cat.locked && setPrefs({ ...prefs, [cat.key]: e.target.checked })}
                        className="mt-0.5 w-4 h-4 rounded border-[var(--border)] text-[var(--teal-700)] focus:ring-[var(--teal-600)] cursor-pointer disabled:cursor-not-allowed"
                        aria-describedby={`cookie-${cat.key}-desc`}
                      />
                      <div>
                        <label htmlFor={`cookie-${cat.key}`} className="text-xs font-semibold text-[var(--text-primary)]">
                          {cat.title} {cat.locked && <span className="text-gray-400 font-normal">(immer aktiv)</span>}
                        </label>
                        <p id={`cookie-${cat.key}-desc`} className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                          {cat.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => save(prefs)}
                  className="w-full bg-[var(--teal-800)] hover:bg-[var(--teal-700)] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors min-h-[44px]"
                >
                  {t('save')}
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
