/**
 * Quellbilder auf ein vernünftiges Maß bringen.
 *
 *   node scripts/images-optimize.mjs --dry            zeigt nur, was passieren würde
 *   node scripts/images-optimize.mjs                  schreibt WebP neben das Original
 *   node scripts/images-optimize.mjs --replace        ersetzt PNG/JPG durch WebP
 *   node scripts/images-optimize.mjs --only=used      nur Dateien, die im Code vorkommen
 *
 * Warum überhaupt: next/image liefert zwar WebP/AVIF aus, transformiert aber
 * jedes Mal aus der Quelle. Ein 5,9-MB-PNG kostet damit dauerhaft Rechenzeit
 * und liegt zusätzlich im Repository. Screenshots brauchen keine 4000 px.
 */

import { existsSync } from "node:fs";
import { readdir, readFile, stat, unlink } from "node:fs/promises";
import { join, relative, extname, dirname, basename } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");
const CODE_DIRS = ["app", "lib"];

/** Breiter braucht keine Darstellung auf der Seite - auch nicht auf 2x-Displays. */
const MAX_WIDTH = 2000;
const WEBP_QUALITY = 82;

/**
 * public/uploads/ bleibt unangetastet: Diese Pfade stehen als URL in der
 * Datenbank (CMS-Uploads). Eine Umbenennung dort würde Verweise brechen,
 * die dieses Skript nicht mitziehen kann.
 * Das Logo bleibt PNG - harte Kanten leiden unter verlustbehafteter Kompression.
 */
const SKIP = [/[\\/]uploads[\\/]/, /techvision-logo\.png$/i];

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const REPLACE = args.includes("--replace");
const ONLY_USED = args.some((a) => a === "--only=used");

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

async function referencedNames() {
  const found = new Set();
  for (const dir of CODE_DIRS) {
    for (const file of await walk(join(ROOT, dir))) {
      if (!/\.(tsx?|jsx?|mjs|css|json)$/.test(file)) continue;
      const text = await readFile(file, "utf8");
      for (const m of text.matchAll(/([A-Za-z0-9_.\- ]+\.(?:png|jpe?g|webp|avif))/gi)) {
        found.add(m[1]);
      }
    }
  }
  return found;
}

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);

async function main() {
  const used = ONLY_USED ? await referencedNames() : null;

  const files = (await walk(PUBLIC_DIR))
    .filter((f) => [".png", ".jpg", ".jpeg"].includes(extname(f).toLowerCase()))
    .filter((f) => !SKIP.some((re) => re.test(f)));

  let before = 0;
  let after = 0;
  let touched = 0;

  for (const file of files) {
    if (used && !used.has(basename(file))) continue;

    const { size } = await stat(file);
    const stem = basename(file, extname(file)).replace(/\.webp$/i, "");
    const target = join(dirname(file), stem + ".webp");
    const shortPath = relative(PUBLIC_DIR, file).split("\\").join("/");

    // Es liegt schon ein WebP unter diesem Namen. Nicht überschreiben: Auf
    // Windows kollidieren "Bild.png" und "bild.webp", weil das Dateisystem
    // Gross- und Kleinschreibung nicht unterscheidet - so ginge eine bereits
    // kuratierte Datei verloren.
    if (existsSync(target)) {
      console.log(`  übersprungen (Ziel existiert)  ${shortPath} -> ${basename(target)}`);
      continue;
    }

    let pipeline;
    try {
      pipeline = sharp(file);
      const meta = await pipeline.metadata();
      if (meta.width && meta.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }
    } catch {
      console.log(`  übersprungen (unlesbar)  ${shortPath}`);
      continue;
    }

    if (DRY) {
      console.log(`  ${mb(size).padStart(6)} MB  ${shortPath}`);
      before += size;
      touched += 1;
      continue;
    }

    const out = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
    const { writeFile } = await import("node:fs/promises");
    await writeFile(target, out);

    before += size;
    after += out.length;
    touched += 1;
    console.log(`  ${mb(size).padStart(6)} MB -> ${mb(out.length).padStart(6)} MB  ${shortPath}`);

    if (REPLACE) await unlink(file);
  }

  console.log(`\n${touched} Dateien${DRY ? " (Probelauf, nichts geschrieben)" : ""}`);
  if (!DRY && touched) {
    console.log(`vorher ${mb(before)} MB -> nachher ${mb(after)} MB`);
    if (!REPLACE) console.log("Originale bleiben liegen. Mit --replace werden sie ersetzt.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
