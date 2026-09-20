import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Sprachbewusste Navigation.
 *
 * Diese Link- und Router-Varianten kennen die aktive Sprache und haengen das
 * Praefix selbst an: aus <Link href="/impressum"> wird auf einer englischen
 * Seite automatisch "/en/impressum". Vorher kam hier "next/link" zum Einsatz,
 * das die Sprache nicht kennt. Aus "/en" heraus zeigte "/impressum" deshalb
 * auf die deutsche Route, die Middleware bog sie zurueck auf "/en/impressum",
 * und zusammen mit der Weiterleitung in der Seite selbst entstand eine
 * endlose Schleife: im Browser ERR_TOO_MANY_REDIRECTS oder eine weiße Seite.
 *
 * In allen Komponenten deshalb von hier importieren, nie aus "next/link".
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
