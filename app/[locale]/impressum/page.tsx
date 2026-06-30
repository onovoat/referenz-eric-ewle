import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('legal');

  return (
    <main className="min-h-screen bg-[var(--bg-alt)] py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">{t('impressum_title')}</h1>
        <div className="bg-white rounded-2xl border border-[var(--border)] p-8 shadow-sm">
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{t('placeholder')}</p>
          <a
            href="/legal-placeholders/impressum.pdf"
            className="inline-flex items-center gap-2 text-sm text-[var(--teal-700)] hover:text-[var(--teal-600)] font-medium underline underline-offset-2"
            aria-label="Impressum als PDF herunterladen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Impressum.pdf
          </a>
        </div>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 mt-6 text-sm text-[var(--text-secondary)] hover:text-[var(--teal-700)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('back')}
        </Link>
      </div>
    </main>
  );
}
