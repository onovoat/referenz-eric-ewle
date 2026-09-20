import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',

  /**
   * Keine automatische Spracherkennung.
   *
   * Voreingestellt wertet next-intl den Accept-Language-Header aus und merkt
   * sich die Wahl in einem NEXT_LOCALE-Cookie. Das hatte zwei Folgen: Ein
   * Browser mit englischer Spracheinstellung bekam auf "/" eine 307 auf "/en"
   * geliefert, und ein einziger Klick auf den Sprachumschalter setzte den
   * Cookie dauerhaft auf "en", worauf jeder spaetere Aufruf von "/" wieder
   * auf "/en" landete. Google indexierte deshalb die englische Fassung als
   * die maßgebliche, obwohl Deutsch die Standardsprache ist.
   *
   * Ohne Erkennung liefert "/" bedingungslos Deutsch aus. Englisch erreicht
   * man nur noch bewusst ueber den Umschalter im Header.
   */
  localeDetection: false,
});
