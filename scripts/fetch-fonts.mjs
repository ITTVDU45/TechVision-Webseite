/**
 * Schriftdateien einmalig herunterladen und ins Repository legen.
 *
 *   node scripts/fetch-fonts.mjs
 *
 * Warum selbst hosten statt next/font/google:
 * next/font/google lädt die Dateien zur Bauzeit von Google. Schlägt das fehl -
 * kein Netz, Proxy, Ausfall - fällt Next stillschweigend auf eine
 * Ersatzschrift zurück, ohne den Build abzubrechen. Genau so entstand der
 * ursprüngliche Fehler: Im CSS stand "Inter", geladen wurde nie etwas.
 * Liegen die Dateien im Repository, ist der Build reproduzierbar und
 * offline-fest, und ein fehlendes Zeichensatzfile bricht ihn hörbar ab.
 *
 * Lizenz: Archivo und Inter stehen unter der SIL Open Font License 1.1.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "app", "fonts");

/** Moderner UA, sonst liefert Google TTF statt WOFF2. */
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const FAMILIES = [
  { name: "Archivo", weights: [500, 600, 700], file: "archivo" },
  { name: "Inter", weights: [400, 500, 600], file: "inter" },
];

async function get(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} für ${url}`);
  return res;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  for (const family of FAMILIES) {
    for (const weight of family.weights) {
      const cssUrl =
        `https://fonts.googleapis.com/css2?family=${family.name}:wght@${weight}` +
        `&display=swap&subset=latin`;

      const css = await (await get(cssUrl)).text();

      // Nur den latin-Block nehmen: latin-ext und andere Subsets kosten
      // Bandbreite, ohne dass die Seite sie braucht.
      const blocks = css.split("/*").filter((b) => b.includes("latin"));
      const block = blocks.find((b) => b.trimStart().startsWith("latin */")) ?? blocks[0] ?? css;

      const match = /src:\s*url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/.exec(block);
      if (!match) throw new Error(`Keine WOFF2-URL für ${family.name} ${weight}`);

      const bytes = Buffer.from(await (await get(match[1])).arrayBuffer());
      const target = join(OUT_DIR, `${family.file}-${weight}.woff2`);
      await writeFile(target, bytes);

      console.log(`  ${family.name} ${weight}  ${(bytes.length / 1024).toFixed(1)} kB`);
    }
  }

  console.log(`\nAbgelegt in app/fonts/. Eingebunden über next/font/local in app/layout.tsx.`);
}

main().catch((error) => {
  console.error("Fehlgeschlagen:", error.message);
  process.exit(1);
});
