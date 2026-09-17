// Erzeugt von scripts/legal-sync.mjs, nicht von Hand aendern.
// Quelle: onovo-legal v2026.9.1
// Wortlaut aendern: im Repo onovo-legal, danach hier `npm run legal:sync`.
// Die Platzhalter werden zur Laufzeit aus Directus befuellt, siehe lib/legal.ts.

export const legalVersion = "v2026.9.1";

export const felderKatalog = {
  "$schema": "https://onovo.at/schemas/legal-felder-1.json",
  "version": "2026.09",
  "hinweis": "Einzige Quelle fuer Platzhalter und Bedingungslogik. Directus-Felder, Renderer und der Build-Check lesen diese Datei. Wortlautaenderungen gehoeren in die Markdown-Dateien, Strukturaenderungen hierher.",
  "felder": {
    "FIRMENNAME": {
      "directus": "firmenname",
      "typ": "string",
      "pflicht": true,
      "dokumente": [
        "impressum",
        "datenschutz"
      ],
      "beschreibung": "Name des Unternehmens ohne Rechtsform"
    },
    "RECHTSFORM": {
      "directus": "rechtsform",
      "typ": "enum",
      "pflicht": true,
      "werte": [
        "eU",
        "GmbH",
        "OG",
        "KG",
        "Verein",
        "einzelunternehmer_nicht_eingetragen",
        "freiberufler"
      ],
      "dokumente": [],
      "beschreibung": "Steuert die Bedingungsbloecke im Impressum. Erscheint nicht selbst im Text, dafuer gibt es RECHTSFORM_ZUSATZ"
    },
    "RECHTSFORM_ZUSATZ": {
      "directus": null,
      "typ": "abgeleitet",
      "pflicht": false,
      "dokumente": [
        "impressum"
      ],
      "beschreibung": "Firmenwortlaut-Zusatz hinter dem Namen, abgeleitet aus RECHTSFORM ueber formatierung.rechtsform_zusatz. Bei freien Berufen, nicht eingetragenen Einzelunternehmen und Vereinen leer"
    },
    "STRASSE_HAUSNUMMER": {
      "directus": "strasse_hausnummer",
      "typ": "string",
      "pflicht": true,
      "dokumente": [
        "impressum"
      ]
    },
    "PLZ": {
      "directus": "plz",
      "typ": "string",
      "pflicht": true,
      "dokumente": [
        "impressum"
      ]
    },
    "ORT": {
      "directus": "ort",
      "typ": "string",
      "pflicht": true,
      "dokumente": [
        "impressum"
      ]
    },
    "ADRESSE": {
      "directus": null,
      "typ": "abgeleitet",
      "pflicht": true,
      "dokumente": [
        "datenschutz"
      ],
      "beschreibung": "Zusammengesetzt aus STRASSE_HAUSNUMMER, PLZ und ORT"
    },
    "DOMAIN": {
      "directus": "domain",
      "typ": "string",
      "pflicht": true,
      "dokumente": [
        "impressum",
        "datenschutz"
      ],
      "beschreibung": "Ohne Protokoll, z. B. tischlerei-muster.at"
    },
    "EMAIL": {
      "directus": "email",
      "typ": "string",
      "pflicht": true,
      "dokumente": [
        "impressum",
        "datenschutz"
      ]
    },
    "TELEFON": {
      "directus": "telefon",
      "typ": "string",
      "pflicht": false,
      "dokumente": [
        "impressum",
        "datenschutz"
      ],
      "beschreibung": "Empfohlen. Fehlt die Nummer, entfaellt die Zeile"
    },
    "VERTRETUNGSBERECHTIGTE_PERSON": {
      "directus": "vertretungsberechtigte_person",
      "typ": "string",
      "pflicht": true,
      "dokumente": [
        "impressum"
      ],
      "beschreibung": "Format je Rechtsform, siehe formatierung.vertretungsberechtigte_person"
    },
    "UID": {
      "directus": "uid",
      "typ": "string",
      "pflicht": false,
      "dokumente": [
        "impressum"
      ],
      "beschreibung": "Nur falls vorhanden. Kleinunternehmer ohne UID: Zeile entfaellt"
    },
    "FIRMENBUCHNUMMER": {
      "directus": "firmenbuchnummer",
      "typ": "string",
      "pflicht": false,
      "dokumente": [
        "impressum"
      ]
    },
    "FIRMENBUCHGERICHT": {
      "directus": "firmenbuchgericht",
      "typ": "string",
      "pflicht": false,
      "dokumente": [
        "impressum"
      ]
    },
    "TAETIGKEIT": {
      "directus": "taetigkeit",
      "typ": "string",
      "pflicht": true,
      "dokumente": [
        "impressum"
      ],
      "beschreibung": "Unternehmensgegenstand"
    },
    "ZWECK_DES_MEDIUMS": {
      "directus": "zweck_des_mediums",
      "typ": "text",
      "pflicht": true,
      "dokumente": [
        "impressum"
      ],
      "beschreibung": "Paragraf 25 Abs 4 MedienG. Wozu die Website dient, z. B. Praesentation der Leistungen und Kontaktaufnahme"
    },
    "GRUNDLEGENDE_RICHTUNG": {
      "directus": "grundlegende_richtung",
      "typ": "text",
      "pflicht": true,
      "dokumente": [
        "impressum"
      ],
      "beschreibung": "Paragraf 25 Abs 4 MedienG, sogenannte Blattlinie. Worueber die Website inhaltlich informiert"
    },
    "WIRTSCHAFTSKAMMER": {
      "directus": "wirtschaftskammer",
      "typ": "string",
      "pflicht": false,
      "dokumente": [
        "impressum"
      ],
      "beschreibung": "Kammer des Bundeslandes, z. B. Wirtschaftskammer Wien"
    },
    "FACHGRUPPE": {
      "directus": "fachgruppe",
      "typ": "string",
      "pflicht": false,
      "dokumente": [
        "impressum"
      ]
    },
    "GEWERBEBEHOERDE": {
      "directus": "gewerbebehoerde",
      "typ": "string",
      "pflicht": false,
      "dokumente": [
        "impressum"
      ]
    },
    "ZVR_ZAHL": {
      "directus": "zvr_zahl",
      "typ": "string",
      "pflicht": false,
      "dokumente": [
        "impressum"
      ],
      "beschreibung": "Nur bei Vereinen"
    },
    "BERUFSRECHT": {
      "directus": "berufsrecht",
      "typ": "text",
      "pflicht": false,
      "dokumente": [
        "impressum"
      ],
      "beschreibung": "Nur bei reglementierten und freien Berufen"
    },
    "NEWSLETTER_TOOL": {
      "directus": "newsletter_tool",
      "typ": "string",
      "pflicht": false,
      "dokumente": [
        "datenschutz"
      ]
    },
    "BUCHUNGSTOOL": {
      "directus": "buchungstool",
      "typ": "string",
      "pflicht": false,
      "dokumente": [
        "datenschutz"
      ]
    },
    "DATUM": {
      "directus": null,
      "typ": "abgeleitet",
      "pflicht": true,
      "dokumente": [
        "impressum",
        "datenschutz"
      ],
      "beschreibung": "Stand der ausgelieferten Fassung, wird beim Rendern gesetzt"
    }
  },
  "bloecke": {
    "firmenbuch": {
      "dokument": "impressum",
      "bedingung": "rechtsform in [GmbH, OG, KG] oder (rechtsform == eU und firmenbuchnummer gesetzt)",
      "beschreibung": "Firmenbuchnummer und Firmenbuchgericht. Bei nicht eingetragenen Einzelunternehmen, Vereinen und Freiberuflern entfaellt der Block"
    },
    "uid": {
      "dokument": "impressum",
      "bedingung": "uid gesetzt",
      "beschreibung": "UID-Zeile. Kleinunternehmer ohne UID lassen sie weg"
    },
    "gewerbe": {
      "dokument": "impressum",
      "bedingung": "rechtsform in [eU, GmbH, OG, KG, einzelunternehmer_nicht_eingetragen]",
      "beschreibung": "Kammer, Fachgruppe, Gewerbebehoerde und GewO-Zeile"
    },
    "zvr": {
      "dokument": "impressum",
      "bedingung": "rechtsform == Verein",
      "beschreibung": "ZVR-Zahl statt Gewerbedaten"
    },
    "berufsrecht": {
      "dokument": "impressum",
      "bedingung": "rechtsform == freiberufler oder berufsrecht gesetzt",
      "warnung": "Berufsgeheimnistraeger (Arzt, Anwalt, Steuerberater) nur nach gesonderter Vereinbarung, siehe AGB Anlage 0 § 5. Impressum vom Kunden oder dessen Kammer pruefen lassen"
    },
    "telefon": {
      "dokument": "impressum",
      "bedingung": "telefon gesetzt"
    },
    "cloudflare": {
      "dokument": "datenschutz",
      "bedingung": "domain laeuft ueber den Cloudflare-Proxy",
      "beschreibung": "Nur einfuegen, wenn die Domain wirklich proxied ist. Bei reinem DNS-Eintrag entfaellt der Block"
    },
    "turnstile": {
      "dokument": "datenschutz",
      "bedingung": "Kontaktformular durch Cloudflare Turnstile geschuetzt",
      "geprueft": false,
      "beschreibung": "Spam-Schutz des Formulars. Wortlaut abgeleitet aus dem Cloudflare-Abschnitt der Anwaltsfassung, in der naechsten Anwaltsrunde vorlegen. Turnstile laeuft unabhaengig davon, ob die Domain ueber den Cloudflare-Proxy geht, deshalb ein eigener Block und nicht Teil von cloudflare"
    },
    "web_analytics": {
      "dokument": "datenschutz",
      "bedingung": "reichweitenmessung aktiv",
      "beschreibung": "Anwaltsvorlage nennt Cloudflare Web Analytics. Laeuft stattdessen Umami, wird der Umami-Baustein verwendet"
    },
    "whatsapp": {
      "dokument": "datenschutz",
      "bedingung": "whatsapp_link vorhanden"
    },
    "karte": {
      "dokument": "datenschutz",
      "bedingung": "standortkarte eingebunden"
    },
    "google_analytics": {
      "dokument": "datenschutz",
      "bedingung": "google_analytics gebucht"
    },
    "newsletter": {
      "dokument": "datenschutz",
      "bedingung": "newsletter gebucht"
    },
    "buchung": {
      "dokument": "datenschutz",
      "bedingung": "buchungstool gebucht"
    },
    "rezensionen": {
      "dokument": "datenschutz",
      "bedingung": "google_rezensionen gebucht"
    },
    "streitbeilegung": {
      "dokument": "impressum",
      "bedingung": "immer aktiv, Variante ueber zielgruppe: b2b -> unternehmer, sonst verbraucher",
      "varianten": [
        "unternehmer",
        "verbraucher"
      ],
      "beschreibung": "unternehmer: Leistungen nur fuer Unternehmer, keine Teilnahme vorgesehen. verbraucher: Erklaerung der Nichtteilnahme. Bewusst ohne Verweis auf die EU-Plattform fuer Online-Streitbeilegung, diese wurde am 20.07.2025 abgeschaltet"
    }
  },
  "formatierung": {
    "vertretungsberechtigte_person": {
      "eU": "{name}",
      "einzelunternehmer_nicht_eingetragen": "{name}",
      "GmbH": "Geschaeftsfuehrer: {name}",
      "OG": "Vertretungsbefugte(r) Gesellschafter: {name}",
      "KG": "Vertretungsbefugte(r) Gesellschafter: {name}",
      "Verein": "Obmann/Obfrau: {name}",
      "freiberufler": "{name}"
    },
    "rechtsform_zusatz": {
      "eU": " e.U.",
      "GmbH": " GmbH",
      "OG": " OG",
      "KG": " KG",
      "Verein": "",
      "einzelunternehmer_nicht_eingetragen": "",
      "freiberufler": ""
    },
    "hinweis": "RECHTSFORM ist ein Schluessel, kein Anzeigetext. Direkt in den Text gesetzt ergaebe er Zeilen wie 'Max Muster einzelunternehmer_nicht_eingetragen'. Der Zusatz beginnt mit einem Leerzeichen, damit er bei leerem Wert keines hinterlaesst."
  },
  "freigabe": {
    "felder": [
      "impressum_freigegeben",
      "impressum_freigabe_datum",
      "datenschutz_freigegeben",
      "datenschutz_freigabe_datum"
    ],
    "regel": "Go-live nur wenn impressum_freigegeben und datenschutz_freigegeben true sind. Grundlage: Kundenvertrag Punkt 4.10"
  },
  "build_check": {
    "regel": "Nach dem Rendern darf im Ausgabe-HTML kein '{{' mehr vorkommen und kein Block-Marker uebrig sein. Sonst Build abbrechen"
  },
  "laufzeit": {
    "hinweis": "Kundenseiten rendern das Impressum zur Laufzeit aus Directus, damit der Kunde es ohne Deploy pflegen kann. Der Build-Check greift dort nicht, an seine Stelle tritt diese Regel.",
    "regel": "Fehlt ein Pflichtfeld, wird die Rechtsseite nicht unvollstaendig ausgeliefert. Stattdessen erscheint ein Hinweis, dass die Angaben ergaenzt werden, und die Seite wird auf noindex gesetzt.",
    "begruendung": "Ein Impressum ohne Anschrift erfuellt Paragraf 5 ECG nicht. Ein sichtbar unfertiger Zustand ist besser als ein luecken hafter, der fertig aussieht."
  }
} as const;

export const impressumVorlage = "---\ndokument: impressum\nzielgruppe: kunden\nstand: 2026-09-11\ngeprueft: false\nwarnung: >-\n  Wortlaut nicht anwaltlich geprueft. Grundlage war die vorlaeufige Fassung vom\n  19.07.2026 (Impressum_Kundenwebsites.docx), ergaenzt am 11.09.2026 um die\n  Abschnitte, die in onovo/impressum.md bereits vorhanden waren und im\n  Kundendokument fehlten: Offenlegung nach Paragraf 25 MedienG mit Zweck und\n  grundlegender Richtung, Urheberrecht, Verbraucherstreitbeilegung. In der\n  naechsten Anwaltsrunde vorlegen. Der Kunde ist Medieninhaber und gibt frei.\nquelle: quellen/2026-08-17/Impressum_Kundenwebsites.docx, ergaenzt nach onovo/impressum.md\n---\n\n# Impressum\n\nInformationen gemäß § 5 E-Commerce-Gesetz (ECG) und Offenlegung gemäß § 25 Mediengesetz (MedienG).\n\n## Medieninhaber und Diensteanbieter\n\n{{FIRMENNAME}}{{RECHTSFORM_ZUSATZ}}\n{{STRASSE_HAUSNUMMER}}\n{{PLZ}} {{ORT}}, Österreich\n\n## Kontakt\n\nE-Mail: {{EMAIL}}\n<!-- block:telefon -->\nTelefon: {{TELEFON}}\n<!-- /block:telefon -->\nWebsite: {{DOMAIN}}\n\n## Vertretungsberechtigte Person\n\n{{VERTRETUNGSBERECHTIGTE_PERSON}}\n\n## Unternehmensdaten\n\n<!-- block:uid -->\nUID-Nummer: {{UID}}\n<!-- /block:uid -->\n<!-- block:firmenbuch -->\nFirmenbuchnummer: {{FIRMENBUCHNUMMER}}\nFirmenbuchgericht: {{FIRMENBUCHGERICHT}}\n<!-- /block:firmenbuch -->\n\nUnternehmensgegenstand / Tätigkeit: {{TAETIGKEIT}}\n\n<!-- block:gewerbe -->\n## Gewerbe- und Kammerdaten\n\nMitglied der {{WIRTSCHAFTSKAMMER}}, Fachgruppe {{FACHGRUPPE}}.\n\nGewerbebehörde: {{GEWERBEBEHOERDE}}\n\nBerufsbezeichnung: {{TAETIGKEIT}}, verliehen in Österreich.\n\nAnwendbare Rechtsvorschrift: Gewerbeordnung 1994 (GewO), abrufbar unter www.ris.bka.gv.at.\n<!-- /block:gewerbe -->\n\n<!-- block:zvr -->\n## Vereinsdaten\n\nZVR-Zahl: {{ZVR_ZAHL}} (Vereinsregister)\n<!-- /block:zvr -->\n\n<!-- block:berufsrecht -->\n## Berufsrechtliche Angaben\n\n{{BERUFSRECHT}}\n\nVerleihungsstaat: Österreich. Die anwendbaren berufsrechtlichen Vorschriften sind\nüber die zuständige Kammer sowie unter www.ris.bka.gv.at abrufbar.\n<!-- /block:berufsrecht -->\n\n## Verbraucherstreitbeilegung\n\n<!-- block:streitbeilegung variante=unternehmer -->\nDie angebotenen Leistungen richten sich ausschließlich an Unternehmerinnen und Unternehmer\nim Sinne des § 1 KSchG. Eine Teilnahme an einem Streitbeilegungsverfahren vor einer\nVerbraucherschlichtungsstelle ist daher nicht vorgesehen und nicht erforderlich.\n<!-- /block:streitbeilegung -->\n<!-- block:streitbeilegung variante=verbraucher -->\nWir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer\nVerbraucherschlichtungsstelle teilzunehmen.\n<!-- /block:streitbeilegung -->\n\n## Offenlegung gemäß § 25 Mediengesetz\n\n**Medieninhaber:** {{FIRMENNAME}}{{RECHTSFORM_ZUSATZ}}, {{STRASSE_HAUSNUMMER}}, {{PLZ}} {{ORT}}\n\n**Zweck des Mediums:** {{ZWECK_DES_MEDIUMS}}\n\n**Grundlegende Richtung:** {{GRUNDLEGENDE_RICHTUNG}}\n\n## Urheberrecht\n\nDie auf dieser Website veröffentlichten Inhalte, insbesondere Texte, Grafiken, Logos und\nBilder, sind urheberrechtlich geschützt. Eine Vervielfältigung, Verbreitung oder öffentliche\nWiedergabe ist ohne ausdrückliche schriftliche Zustimmung nicht gestattet.\n\n## Haftung für Inhalte und Links\n\nDie Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,\nVollständigkeit und Aktualität der Inhalte wird keine Gewähr übernommen. Für Inhalte externer\nverlinkter Websites ist stets der jeweilige Anbieter verantwortlich; zum Zeitpunkt der Verlinkung\nwaren keine Rechtsverstöße erkennbar.\n\nStand: {{DATUM}}\n";

export const datenschutzVorlage = "---\ndokument: datenschutz\nzielgruppe: kunden\nstand: 2026-08-17\ngeprueft: true\nquelle: quellen/2026-08-17/Datenschutz_Kundenwebsites - clean.pdf\nungepruefte_bloecke: turnstile\nhinweis: >-\n  Wortlaut unveraendert aus der Anwaltsfassung. Anrede ist \"Sie\", weil\n  Kundenwebsites sich meist an Verbraucher richten. Optionale Bausteine nur\n  einfuegen, wenn der Dienst beim jeweiligen Kunden wirklich laeuft. Der Baustein\n  turnstile stammt nicht aus der Anwaltsfassung, siehe ungepruefte_bloecke.\n---\n\n# Datenschutzerklärung\n\nDiese Datenschutzerklärung gilt für die Website: {{DOMAIN}}\n\n## 1. Verantwortlicher\n\nVerantwortlicher für die Datenverarbeitung im Sinne der Datenschutz-Grundverordnung (DSGVO)\nauf dieser Website ist:\n\n| | |\n|---|---|\n| Unternehmen | {{FIRMENNAME}} |\n| Adresse | {{ADRESSE}} |\n| E-Mail | {{EMAIL}} |\n<!-- block:telefon -->\n| Telefon | {{TELEFON}} |\n<!-- /block:telefon -->\n\n## 2. Allgemeines zur Datenverarbeitung\n\nWir verarbeiten personenbezogene Daten unserer Website-Besucher nur, soweit dies zur\nBereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich\nist. Die Verarbeitung erfolgt regelmäßig nur mit Einwilligung des Nutzers (Art. 6 Abs. 1 lit. a\nDSGVO); soweit nicht eine gesetzliche Erlaubnis die Verarbeitung gestattet (Art. 6 Abs. 1 lit. c\nDSGVO) erfolgt die Verarbeitung zur Erfüllung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO) oder zur\nVerfolgung unserer überwiegenden berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO).\n\nDiese Website wird technisch von onovo.at betrieben und gehostet. Näheres regelt Punkt 3.\n\n## 3. Hosting und Server-Logs\n\nDiese Website wird auf Servern von Hetzner Online GmbH (Industriestraße 25, 91710\nGunzenhausen, Deutschland) gehostet, betrieben durch unseren technischen Dienstleister onovo.at\n(Daniel Bischof, Quadenstraße 8/5/7, 1220 Wien, Österreich). Beim Aufruf dieser Website werden\nautomatisch durch den Webserver folgende Daten erfasst („Server-Logfiles\"): IP-Adresse, Datum und\nUhrzeit des Zugriffs, aufgerufene Seite, verwendeter Browser und Betriebssystem, Referrer-URL.\nDiese Informationen und Daten werden notwendigerweise verarbeitet, damit die Inhalte unserer\nWebsite an Ihr Endgerät ausgeliefert werden können.\n\nDiese Daten werden zur Sicherstellung eines störungsfreien Betriebs der Website sowie zur\nGewährleistung der IT-Sicherheit verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO\n(berechtigtes Interesse an einem sicheren und stabilen Betrieb der Website) iVm § 165 Abs. 3\nTKG 2021 (technische Erforderlichkeit für den Betrieb der Website).\n\nDie Server-Logfiles werden für einen Zeitraum von 7 Tagen gespeichert und danach automatisch\ngelöscht, sofern keine sicherheitsrelevanten Vorfälle eine längere Speicherung erforderlich machen.\n\n<!-- block:cloudflare -->\n## 4. Content Delivery Network (Cloudflare)\n\nDiese Website nutzt Cloudflare, einen Dienst der Cloudflare, Inc. (101 Townsend St, San Francisco,\nCA 94107, USA), zur Auslieferung von Inhalten, zum Schutz vor Angriffen (z. B. DDoS) und zur\nBeschleunigung der Website.\n\nIm Rahmen dieser Nutzung werden technische Daten (insbesondere IP-Adresse) an Cloudflare\nübermittelt. Cloudflare kann hierbei als Auftragsverarbeiter oder als gemeinsam Verantwortlicher\nagieren; nähere Informationen sind der Datenschutzerklärung von Cloudflare zu entnehmen\n(www.cloudflare.com/privacypolicy/). Soweit eine Datenübermittlung in die USA erfolgt, stützt sich\ndiese auf Standardvertragsklauseln der EU-Kommission bzw. das EU-US Data Privacy Framework, das\nauf einem Angemessenheitsbeschluss nach Art. 45 DSGVO der Europäischen Kommission beruht.\n\nRechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren,\nschnellen und stabilen Auslieferung der Website) sowie § 165 Abs 3 TKG 2021 (technische\nErforderlichkeit zum Betrieb der Website).\n<!-- /block:cloudflare -->\n\n<!-- block:web_analytics variante=cloudflare -->\n## 5. Cloudflare Web Analytics\n\nZur anonymisierten, statistischen Auswertung von Besucherzahlen und Zugriffsverhalten setzen wir\nCloudflare Web Analytics, einen Dienst der Cloudflare, Inc. (101 Townsend St, San Francisco,\nCA 94107, USA), ein. Dieser Dienst funktioniert ohne den Einsatz von Cookies oder vergleichbaren\nSpeichertechnologien und erstellt keine individuellen Nutzerprofile. Soweit eine Datenübermittlung\nin die USA erfolgt, stützt sich diese auf Standardvertragsklauseln der EU-Kommission bzw. das\nEU-US Data Privacy Framework, das auf einem Angemessenheitsbeschluss nach Art. 45 DSGVO der\nEuropäischen Kommission beruht.\n\nDa keine personenbezogene, individuelle Nachverfolgung von Nutzern erfolgt, ist hierfür keine\ngesonderte Einwilligung erforderlich. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes\nInteresse an der statistischen Auswertung der Reichweite unserer Website).\n<!-- /block:web_analytics -->\n\n<!-- block:web_analytics variante=umami -->\n## 5. Reichweitenmessung mit Umami\n\nZur anonymisierten, statistischen Auswertung von Besucherzahlen und Zugriffsverhalten setzen wir\nUmami ein, eine Open-Source-Software, die unser technischer Dienstleister onovo.at auf demselben\nServer in Deutschland betreibt. Es findet keine Übermittlung an einen Analyse-Dienstleister statt.\n\nUmami arbeitet ohne Cookies und ohne vergleichbare Speichertechnologien auf Ihrem Endgerät und\nerstellt keine individuellen Nutzerprofile. Erfasst werden die aufgerufene Seite, der Referrer, die\nungefähre Herkunft auf Länderebene sowie Gerätetyp, Bildschirmgröße und Browser. Die Zuordnung\nmehrerer Aufrufe zu einem Besuch erfolgt über eine Kennung, die aus IP-Adresse und Browserkennung\nmit einem täglich wechselnden Zufallswert berechnet wird und sich nicht auf Sie zurückführen lässt;\ndie IP-Adresse selbst wird nicht gespeichert.\n\nDa keine personenbezogene, individuelle Nachverfolgung von Nutzern erfolgt, ist hierfür keine\ngesonderte Einwilligung erforderlich. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes\nInteresse an der statistischen Auswertung der Reichweite unserer Website) sowie § 165 Abs. 3\nTKG 2021.\n<!-- /block:web_analytics -->\n\n## 6. Kontaktformular\n\nWenn Sie uns über das Kontaktformular auf dieser Website eine Anfrage senden, werden die von Ihnen\nim Formular angegebenen Daten (z. B. Name, E-Mail-Adresse, Telefonnummer, Nachrichtentext) zum\nZweck der Bearbeitung Ihrer Anfrage verwendet.\n\nDie Übermittlung erfolgt technisch per E-Mail direkt an uns; eine zusätzliche Speicherung der\nFormulardaten in einer Datenbank findet nicht statt. Der Versand der E-Mail wird über den\nE-Mail-Zustelldienst Resend abgewickelt. Resend ist ein Dienst der Plus Five Five Inc., einem\nUnternehmen mit Sitz in 2261 Market Street #5039 San Francisco, CA 94114. Die USA verfügen über\nkein der EU entsprechendes Datenschutzniveau, weshalb dieser Datentransfer mit verschiedenen\nRisiken verbunden ist. So unterliegen Ihre Daten dem Zugriff durch US-Behörden zu Kontroll- und\nÜberwachungszwecken, wogegen keine wirksamen Rechtsbehelfe zur Verfügung stehen. Soweit eine\nDatenübermittlung in die USA erfolgt, stützt sich diese auf Standardvertragsklauseln der\nEU-Kommission, die wir mit Resend abgeschlossen haben.\n\nRechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung bzw. Vorbereitung eines Vertrags) bzw.\nArt. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen), sofern (noch)\nkein Vertragsverhältnis besteht.\n\nWir speichern Ihre Daten grundsätzlich bis zur Erledigung Ihrer Anfrage. Nach Erledigung Ihrer\nAnfrage werden Ihre Daten gelöscht, sofern keine Kundenbeziehung besteht.\n\n<!-- block:turnstile -->\n## 7. Spam-Schutz des Kontaktformulars (Cloudflare Turnstile)\n\nZum Schutz des Kontaktformulars vor automatisierten Eingaben und Missbrauch setzen wir Cloudflare\nTurnstile ein, einen Dienst der Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA).\n\nTurnstile prüft vor dem Absenden des Formulars, ob die Eingabe von einem Menschen oder von einem\nautomatisierten Programm stammt. Dabei werden technische Daten (insbesondere IP-Adresse, Browser-\nund Geräteinformationen sowie Angaben zum Verhalten im Formular) an Cloudflare übermittelt und dort\nausgewertet. Turnstile setzt keine Cookies zu Werbe- oder Analysezwecken und erstellt keine\nindividuellen Nutzerprofile. Soweit eine Datenübermittlung in die USA erfolgt, stützt sich diese auf\nStandardvertragsklauseln der EU-Kommission bzw. das EU-US Data Privacy Framework, das auf einem\nAngemessenheitsbeschluss nach Art. 45 DSGVO der Europäischen Kommission beruht. Nähere Informationen\nsind der Datenschutzerklärung von Cloudflare zu entnehmen (www.cloudflare.com/privacypolicy/).\n\nRechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Abwehr von\nautomatisiertem Missbrauch und an der Sicherheit der über das Formular übermittelten Daten) sowie\n§ 165 Abs 3 TKG 2021 (technische Erforderlichkeit zum Betrieb der Website).\n<!-- /block:turnstile -->\n\n<!-- block:whatsapp -->\n## 7. WhatsApp-Kontakt\n\nDiese Website enthält einen Link, über den Sie uns direkt über WhatsApp kontaktieren können. Beim\nbloßen Aufruf dieser Website werden dabei keine Daten an WhatsApp bzw. die Meta Platforms Ireland\nLimited übermittelt. Erst wenn Sie den Link aktiv anklicken, öffnet sich WhatsApp, und es gelten\ndie Datenschutzbestimmungen von WhatsApp/Meta für die dann von Ihnen initiierte Kommunikation.\nDiese finden Sie unter https://www.whatsapp.com/legal/privacy-policy-eea.\n<!-- /block:whatsapp -->\n\n<!-- block:karte -->\n## 8. Anfahrt / Standortkarte\n\nDiese Website enthält ein Bild bzw. einen Link zu unserem Standort. Eine interaktive Karte\n(z. B. Google Maps) wird erst geladen, wenn Sie aktiv darauf klicken (z. B. über den Button\n„Karte anzeigen\" bzw. „Route planen\"). Erst durch diesen Klick wird eine Verbindung zu\nGoogle-Servern aufgebaut und es gelten die Datenschutzbestimmungen von Google.\n\nGoogle Maps ist ein Service des Unternehmens Google LLC (1600 Amphitheatre Parkway, Mountain View,\nCA 94043, USA). Wir nutzen diesen Dienst, damit Sie unseren Standort auf einer Karte ansehen bzw.\neine Route planen können. Zu diesem Zweck werden folgende Daten verarbeitet: IP-Adresse,\nReferrer-URL, Datum und Uhrzeit des Aufrufs, Informationen über das Betriebssystem, Standortdaten.\n\nDie Datenverarbeitung Ihrer personenbezogenen Daten zur Nutzung von Google Maps erfolgt auf\nGrundlage Ihrer Einwilligung gemäß Art 6 Abs 1 lit a DSGVO iVm § 165 Abs 3 TKG 2021. Sie können\nIhre Einwilligung jederzeit ohne Angabe von Gründen mit Wirkung für die Zukunft widerrufen. Wenn\nSie keine Einwilligung zur Verarbeitung geben, wird der Google Maps-Inhalt nicht geladen und es\nkommt zu keiner Datenverarbeitung.\n\nWir speichern keine personenbezogenen Daten im Zusammenhang mit der Nutzung von Google Maps.\nHinsichtlich der Speicherung sowie der Speicherdauer verweisen wir einerseits auf die\nDatenschutzerklärung von Google LLC, abrufbar unter https://policies.google.com/privacy?hl=de.\n\nEs kann im Zusammenhang mit der Nutzung der Kartenfunktion zu einem Datentransfer in die USA\nkommen. Google LLC ist ein nach dem EU-US Data Privacy Framework zertifiziertes Unternehmen,\nweshalb die Datenübermittlung in die USA gestützt auf den Angemessenheitsbeschluss der\nEuropäischen Kommission nach Art. 45 DSGVO erfolgt.\n<!-- /block:karte -->\n\n## 9. Cookies\n\nDiese Website verwendet technisch notwendige Cookies, die für den Betrieb der Website erforderlich\nsind (z. B. zur Speicherung Ihrer Cookie-Einstellungen). Für diese Cookies ist keine Einwilligung\nerforderlich (Art. 6 Abs. 1 lit. f DSGVO bzw. § 165 Abs. 3 TKG 2021).\n\nBeim ersten Besuch dieser Website werden Sie über ein Cookie-Consent-Banner über die eingesetzten\nCookies informiert und können Ihre Einstellungen verwalten.\n\n<!-- block:google_analytics -->\n## 10. Google Analytics\n\nDiese Website nutzt Google Analytics, einen Webanalysedienst der Google Ireland Limited („Google\").\nGoogle Analytics verwendet Cookies, die eine Analyse der Benutzung der Website durch Sie\nermöglichen.\n\nGoogle Analytics wird auf dieser Website nur eingesetzt, wenn Sie hierzu im Cookie-Consent-Banner\nausdrücklich Ihre Einwilligung erteilt haben (Opt-in). Ohne Ihre Einwilligung erfolgt keine\nDatenverarbeitung durch Google Analytics.\n\nIm Rahmen der Nutzung werden Daten (u. a. gekürzte IP-Adresse, Geräte- und Browserinformationen,\nNutzungsverhalten) an Google-Server, auch in die USA, übermittelt. Die Datenübermittlung in die USA\nstützt sich auf Standardvertragsklauseln der EU-Kommission bzw. das EU-US Data Privacy Framework,\ndas auf einem Angemessenheitsbeschluss nach Art. 45 DSGVO der Europäischen Kommission beruht.\n\nRechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Einwilligung\njederzeit mit Wirkung für die Zukunft über die Cookie-Einstellungen widerrufen. Die\nAufbewahrungsdauer der bei Google Analytics erhobenen nutzer- und ereignisbezogenen Daten ist auf\n6 Monate eingestellt. Nach Ablauf dieses Zeitraums werden die Daten automatisch gelöscht.\n<!-- /block:google_analytics -->\n\n<!-- block:newsletter -->\n## 11. Newsletter\n\nWenn Sie sich für unseren Newsletter anmelden, verwenden wir Ihre E-Mail-Adresse für den Versand\ndes Newsletters. Die Anmeldung erfolgt im Double-Opt-in-Verfahren: Sie erhalten nach der Anmeldung\neine Bestätigungs-E-Mail und müssen die Anmeldung durch Klick auf den darin enthaltenen Link\nbestätigen.\n\nRechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO iVm § 174 TKG 2021 (Einwilligung). Sie können Ihre\nEinwilligung jederzeit über den Abmeldelink im Newsletter oder durch formlose Mitteilung widerrufen.\n\nDer Versand erfolgt über: {{NEWSLETTER_TOOL}}\n\nWir speichern Ihre E-Mail-Adresse und Ihre Einwilligung für Zwecke des Newsletterversands bis zu\ndem von Ihnen erteilten Widerruf.\n<!-- /block:newsletter -->\n\n<!-- block:buchung -->\n## 12. Online-Buchung / Terminvereinbarung\n\nFür die Terminvereinbarung nutzen wir den Dienst {{BUCHUNGSTOOL}}. Im Rahmen der Terminbuchung\nverarbeiten wir die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, gewünschter Termin) zum\nZweck der Terminvereinbarung.\n\nRechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw. -vorbereitung).\n\nWir speichern die im Zusammenhang mit der Terminbuchung vereinbarten Daten binnen 1 Monat nach dem\nerfolgten Termin. Falls eine Kundenbeziehung entsteht bzw. eine Dienstleistung in Anspruch genommen\nwird bzw. ein Produkt gekauft wird, speichern wir Ihre Daten nur so lange, wie dies zur\nVertragserfüllung oder zur Erfüllung gesetzlicher Aufbewahrungspflichten (z. B. 7 Jahre für\nBuchhaltungsunterlagen gemäß österreichischem Steuerrecht nach § 132 BAO) erforderlich ist.\n<!-- /block:buchung -->\n\n<!-- block:rezensionen -->\n## 13. Google-Rezensionen\n\nAuf dieser Website werden Kundenbewertungen aus unserem Google Business Profile angezeigt. Die\nRezensionen (Name bzw. Anzeigename des Verfassers, Bewertung, Rezensionstext, Datum) werden über\ndie Google Places API serverseitig abgerufen und lokal zwischengespeichert. Beim Besuch dieser\nWebsite wird dadurch keine Verbindung von Ihrem Endgerät zu Google-Servern aufgebaut; Ihre\nIP-Adresse wird nicht an Google übermittelt. Weitere Informationen zur Datenverarbeitung durch\nGoogle finden Sie unter https://policies.google.com/privacy?hl=de.\n\nRechtsgrundlage für die Anzeige der Rezensionen ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes\nInteresse an der Darstellung authentischer Kundenbewertungen). Die Rezensionen wurden von den\nVerfassern öffentlich auf Google veröffentlicht. Verfasser können sich mit Anliegen zur Anzeige\nihrer Rezension jederzeit an uns wenden (siehe Punkt 1); die Rezension kann zudem jederzeit direkt\nbei Google bearbeitet oder gelöscht werden, was bei der nächsten Aktualisierung des\nZwischenspeichers automatisch übernommen wird.\n<!-- /block:rezensionen -->\n\n## 14. Rechte der betroffenen Person\n\nSie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf:\n\n- Auskunft über die Sie betreffenden personenbezogenen Daten (Art. 15 DSGVO)\n- Berichtigung unrichtiger Daten (Art. 16 DSGVO)\n- Löschung Ihrer Daten (Art. 17 DSGVO)\n- Einschränkung der Verarbeitung (Art. 18 DSGVO)\n- Datenübertragbarkeit (Art. 20 DSGVO)\n- Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)\n\nWenn Sie Ihre Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese jederzeit mit\nWirkung für die Zukunft widerrufen.\n\nSie haben außerdem das Recht, sich bei der österreichischen Datenschutzbehörde (Barichgasse 40–42,\n1030 Wien, www.dsb.gv.at) zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer\nDaten gegen die DSGVO verstößt.\n\n## 15. Änderungen dieser Datenschutzerklärung\n\nWir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen\nrechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen. Für Ihren\nerneuten Besuch gilt dann die jeweils aktuelle Datenschutzerklärung.\n\nStand: {{DATUM}}\n";
