'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
    };
  }
}

export default function Contact() {
  const t = useTranslations('contact');
  const f = useTranslations('contact.form');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    company: '',
    email: '',
    phone: '',
    need: '',
    message: '',
    gdpr: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const renderWidget = () => {
      if (window.turnstile && turnstileRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAADnV3UMLqB-K_Fj2',
          callback: (t: string) => setToken(t),
          'expired-callback': () => setToken(''),
          theme: 'light',
          language: 'de',
        });
      }
    };
    if (window.turnstile) {
      renderWidget();
    } else {
      window.addEventListener('turnstileLoaded', renderWidget, { once: true });
    }
    return () => window.removeEventListener('turnstileLoaded', renderWidget);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.gdpr) return;
    setStatus('sending');

    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => body.append(k, String(v)));
    body.append('turnstileToken', token);
    if (file) body.append('attachment', file);

    try {
      const res = await fetch('/api/contact', { method: 'POST', body });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
        setToken('');
      }
    } catch {
      setStatus('error');
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
      setToken('');
    }
  }

  const inputClass =
    'w-full rounded-lg border border-[var(--border)] bg-[var(--stone-50)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--teal-700)] focus:border-transparent focus:bg-white transition-colors min-h-[44px]';
  const labelClass = 'block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 tracking-wide';

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        onLoad={() => window.dispatchEvent(new Event('turnstileLoaded'))}
        strategy="lazyOnload"
      />

      <section id="contact" className="py-24 lg:py-32 bg-[var(--bg-alt)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <motion.span
                className="text-[var(--teal-700)] text-xs font-semibold tracking-[0.2em] uppercase border-b border-[var(--teal-400)] pb-1 inline-block"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                {t('label')}
              </motion.span>
              <motion.h2
                className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-5 mb-4 leading-tight"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t('heading')}
              </motion.h2>
              <motion.p
                className="text-[var(--text-secondary)] leading-relaxed mb-8"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {t('subtext')}
              </motion.p>

              <motion.div
                className="flex flex-col gap-5"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {[
                  { title: t('benefit1_title'), text: t('benefit1_text') },
                  { title: t('benefit2_title'), text: t('benefit2_text') },
                ].map((b) => (
                  <div key={b.title} className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--teal-800)] flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] text-sm">{b.title}</p>
                      <p className="text-[var(--text-secondary)] text-xs mt-0.5 leading-relaxed">{b.text}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {status === 'success' ? (
                <div className="bg-white rounded-2xl border border-[var(--border)] p-10 text-center shadow-sm shadow-black/5">
                  <div className="w-16 h-16 rounded-full bg-[var(--teal-50)] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[var(--teal-700)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{f('success')}</h3>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl border border-[var(--border-light)] p-6 sm:p-8 shadow-sm shadow-black/5"
                  noValidate
                  aria-label="Kontaktformular"
                >
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstname" className={labelClass}>
                        {f('firstname')} <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="firstname"
                        type="text"
                        required
                        autoComplete="given-name"
                        className={inputClass}
                        placeholder="Maria"
                        value={form.firstname}
                        onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastname" className={labelClass}>
                        {f('lastname')} <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="lastname"
                        type="text"
                        required
                        autoComplete="family-name"
                        className={inputClass}
                        placeholder="Musterfrau"
                        value={form.lastname}
                        onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="company" className={labelClass}>
                      {f('company')} <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      required
                      autoComplete="organization"
                      className={inputClass}
                      placeholder="Ihr Unternehmen"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        {f('email')} <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={inputClass}
                        placeholder="kontakt@firma.at"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>{f('phone')}</label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        className={inputClass}
                        placeholder="+43 ..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="need" className={labelClass}>{f('need')}</label>
                    <input
                      id="need"
                      type="text"
                      className={inputClass}
                      placeholder={f('need_placeholder')}
                      value={form.need}
                      onChange={(e) => setForm({ ...form, need: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className={labelClass}>{f('message')}</label>
                    <textarea
                      id="message"
                      rows={4}
                      className={`${inputClass} resize-none min-h-[120px]`}
                      placeholder={f('message_placeholder')}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="attachment" className={labelClass}>{f('attachment')}</label>
                    <div className="relative">
                      <input
                        id="attachment"
                        type="file"
                        accept=".pdf"
                        className="block w-full text-sm text-[var(--text-secondary)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-[var(--border)] file:text-xs file:font-semibold file:bg-[var(--bg-alt)] file:text-[var(--text-secondary)] hover:file:bg-[var(--teal-50)] hover:file:border-[var(--teal-400)] file:transition-colors file:cursor-pointer cursor-pointer"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      />
                    </div>
                  </div>

                  <div ref={turnstileRef} className="mb-5" aria-label="Sicherheitscheck" />

                  <div className="mb-6">
                    <label className="flex gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        required
                        aria-required="true"
                        className="mt-0.5 w-4 h-4 rounded border-[var(--border)] text-[var(--teal-700)] focus:ring-[var(--teal-600)] cursor-pointer"
                        checked={form.gdpr}
                        onChange={(e) => setForm({ ...form, gdpr: e.target.checked })}
                      />
                      <span className="text-xs text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">
                        {f('gdpr')}{' '}
                        <a href="/datenschutz" className="text-[var(--teal-700)] underline underline-offset-2 hover:text-[var(--teal-600)]">
                          Datenschutzerklärung
                        </a>
                      </span>
                    </label>
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-red-600 mb-4" role="alert">{f('error')}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending' || !form.gdpr}
                    className="w-full bg-[var(--teal-800)] hover:bg-[var(--teal-700)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-lg transition-colors text-sm min-h-[44px]"
                  >
                    {status === 'sending' ? f('sending') : f('submit')}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
