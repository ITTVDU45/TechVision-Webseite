/**
 * Läuft einmal beim Serverstart: gleicht häufigen Tippfehler bei Mongo-Env aus.
 * Alle Routen prüfen `MONGODB_URI`; `MongoDB_URI` aus .env würde sonst ignoriert.
 */
export async function register(): Promise<void> {
  if (typeof process === "undefined") return;
  const canonical = process.env.MONGODB_URI?.trim();
  const typo = process.env.MongoDB_URI?.trim();
  if (typo && !canonical) {
    process.env.MONGODB_URI = typo;
  }
}
