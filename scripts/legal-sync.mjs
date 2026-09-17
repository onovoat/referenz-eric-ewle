#!/usr/bin/env node
/**
 * Holt die Kunden-Rechtstexte aus onovo-legal und schreibt sie nach
 * lib/generated/legal.ts.
 *
 * Unterschied zum gleichnamigen Skript in onovo_v1: Dort werden die Texte
 * aus `onovo/` gezogen und sind fertig. Hier kommen die Vorlagen aus
 * `kunden/` und enthalten Platzhalter, die erst zur Laufzeit aus der
 * Directus-Collection des Kunden befuellt werden. Deshalb wandert auch
 * felder.json mit: Ohne den Katalog weiss die Seite nicht, welche Felder
 * Pflicht sind und welche Bloecke wann gelten.
 *
 * Warum generiert statt zur Laufzeit geladen: onovo-legal ist privat, und
 * der Coolify-Build hat keinen GitHub-Token. Als Abhaengigkeit wuerde jeder
 * Deploy scheitern.
 *
 *   npm run legal:sync          liest ../../onovo-legal
 *   ONOVO_LEGAL=/pfad npm run legal:sync
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const hier = dirname(fileURLToPath(import.meta.url));
const projekt = resolve(hier, "..");
const quelle = process.env.ONOVO_LEGAL
  ? resolve(process.env.ONOVO_LEGAL)
  : resolve(projekt, "..", "..", "onovo-legal");

const DOKUMENTE = [
  { datei: "kunden/impressum.md", export: "impressumVorlage" },
  { datei: "kunden/datenschutz.md", export: "datenschutzVorlage" },
];

function herkunft() {
  try {
    return execFileSync("git", ["-C", quelle, "describe", "--tags", "--always", "--dirty"], {
      encoding: "utf8",
    }).trim();
  } catch {
    return "unbekannt";
  }
}

const version = herkunft();
if (version.endsWith("-dirty")) {
  console.warn(
    `Warnung: ${quelle} hat uncommittete Aenderungen. Erst dort committen und taggen, ` +
      `sonst laesst sich spaeter nicht belegen, welcher Wortlaut ausgeliefert wurde.`,
  );
}

const teile = DOKUMENTE.map(({ datei, export: name }) => {
  const text = readFileSync(join(quelle, datei), "utf8");
  if (!/^geprueft:\s*true\s*$/m.test(text)) {
    console.warn(`Hinweis: ${datei} ist nicht anwaltlich geprueft (geprueft: false).`);
  }
  return `export const ${name} = ${JSON.stringify(text)};`;
});

const katalog = JSON.parse(readFileSync(join(quelle, "felder.json"), "utf8"));

const kopf = `// Erzeugt von scripts/legal-sync.mjs, nicht von Hand aendern.
// Quelle: onovo-legal ${version}
// Wortlaut aendern: im Repo onovo-legal, danach hier \`npm run legal:sync\`.
// Die Platzhalter werden zur Laufzeit aus Directus befuellt, siehe lib/legal.ts.

export const legalVersion = ${JSON.stringify(version)};

export const felderKatalog = ${JSON.stringify(katalog, null, 2)} as const;
`;

mkdirSync(join(projekt, "lib", "generated"), { recursive: true });
writeFileSync(join(projekt, "lib", "generated", "legal.ts"), `${kopf}\n${teile.join("\n\n")}\n`);

/* Der Renderer wandert mit. Die Blocklogik gehoert zum Dokument, nicht zur
   Seite: Waere sie hier nachgebaut, liefe sie beim naechsten Wortlautwechsel
   gegen die Vorlage. Kopieren ist der einzige Weg, solange onovo-legal privat
   ist und der Coolify-Build keinen GitHub-Token hat. */
const renderer = readFileSync(join(quelle, "render.mjs"), "utf8");
writeFileSync(
  join(projekt, "lib", "generated", "legal-render.mjs"),
  `// Kopie aus onovo-legal ${version}, nicht von Hand aendern.\n` +
    `// Aenderungen gehoeren in onovo-legal/render.mjs, danach \`npm run legal:sync\`.\n\n` +
    renderer,
);

console.log(
  `Rechtstexte aus onovo-legal ${version} uebernommen: ${DOKUMENTE.length} Vorlagen plus Felderkatalog.`,
);
