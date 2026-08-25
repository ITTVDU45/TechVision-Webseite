/**
 * Bildinventar: Was liegt in public/, was wird davon benutzt, was kostet es?
 *
 *   node scripts/images-inventory.mjs            Tabelle auf der Konsole
 *   node scripts/images-inventory.mjs --json     Maschinenlesbar
 *
 * Grundlage für die Kuratierung: Ohne diese Liste ist nicht entscheidbar,
 * welche der verwaisten Dateien es wert sind, angeschlossen zu werden.
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, extname, basename } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");
const CODE_DIRS = ["app", "lib", "scripts"];
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"]);

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

/** Alle Bildpfade, die irgendwo im Quellcode als String vorkommen. */
async function referencedPaths() {
  const found = new Set();
  for (const dir of CODE_DIRS) {
    for (const file of await walk(join(ROOT, dir))) {
      if (!/\.(tsx?|jsx?|mjs|css|json)$/.test(file)) continue;
      const text = await readFile(file, "utf8");
      for (const m of text.matchAll(/["'`](\/[^"'`\s)]+\.(?:png|jpe?g|webp|avif|gif|svg))["'`]/gi)) {
        found.add(m[1]);
      }
      // Auch bloße Dateinamen erfassen (z. B. aus dem CMS zusammengesetzte Pfade)
      for (const m of text.matchAll(/([A-Za-z0-9_.\- ]+\.(?:png|jpe?g|webp|avif))/gi)) {
        found.add(m[1]);
      }
    }
  }
  return found;
}

const kb = (bytes) => Math.round(bytes / 1024);

async function main() {
  const asJson = process.argv.includes("--json");
  const refs = await referencedPaths();

  const files = (await walk(PUBLIC_DIR)).filter((f) => IMAGE_EXT.has(extname(f).toLowerCase()));
  const rows = [];

  for (const file of files) {
    const publicPath = "/" + relative(PUBLIC_DIR, file).split("\\").join("/");
    const { size } = await stat(file);

    let width = null;
    let height = null;
    if (extname(file).toLowerCase() !== ".svg") {
      try {
        const meta = await sharp(file).metadata();
        width = meta.width ?? null;
        height = meta.height ?? null;
      } catch {
        /* unlesbare Datei: Maße bleiben leer */
      }
    }

    rows.push({
      path: publicPath,
      sizeKb: kb(size),
      width,
      height,
      format: extname(file).toLowerCase().slice(1),
      used: refs.has(publicPath) || refs.has(basename(file)),
    });
  }

  rows.sort((a, b) => b.sizeKb - a.sizeKb);

  if (asJson) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  const used = rows.filter((r) => r.used);
  const orphans = rows.filter((r) => !r.used);
  const total = rows.reduce((sum, r) => sum + r.sizeKb, 0);
  const orphanSize = orphans.reduce((sum, r) => sum + r.sizeKb, 0);

  console.log(`\nBilder gesamt   ${rows.length} Dateien, ${(total / 1024).toFixed(1)} MB`);
  console.log(`referenziert    ${used.length}`);
  console.log(`verwaist        ${orphans.length}, ${(orphanSize / 1024).toFixed(1)} MB\n`);

  console.log("Die 25 größten Dateien:");
  console.log("  " + "GRÖSSE".padStart(8) + "  " + "MASSE".padEnd(12) + "  " + "GENUTZT".padEnd(8) + "  PFAD");
  for (const r of rows.slice(0, 25)) {
    const dims = r.width ? `${r.width}x${r.height}` : "-";
    console.log(
      "  " + `${r.sizeKb} kB`.padStart(8) +
      "  " + dims.padEnd(12) +
      "  " + (r.used ? "ja" : "nein").padEnd(8) +
      "  " + r.path,
    );
  }
  console.log("");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
