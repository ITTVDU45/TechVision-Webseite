/**
 * Wenn in .env.local die Produktions-URL steht, aber `next dev` auf localhost läuft,
 * erwartet die Middleware (getToken) andere Cookie-Namen als die API setzt — Login wirkt
 * erfolgreich, danach sofort wieder /admin/login ohne Fehlermeldung.
 */
export function ensureLocalNextAuthUrl(): void {
  if (process.env.NODE_ENV !== "development") return;
  if (process.env.VERCEL === "1") return;
  if (process.env.NEXTAUTH_IGNORE_LOCAL_URL === "1") return;

  const raw = process.env.NEXTAUTH_URL?.trim();
  if (!raw) return;

  try {
    const u = new URL(raw);
    if (u.hostname === "localhost" || u.hostname === "127.0.0.1") return;

    const port = process.env.PORT || "3000";
    process.env.NEXTAUTH_URL = `http://localhost:${port}`;
    console.warn(
      `[auth] NEXTAUTH_URL war "${raw}" — für lokales next dev auf ${process.env.NEXTAUTH_URL} gesetzt. ` +
        "In Produktion (Vercel) weiterhin die echte https-URL setzen. Um diese Anpassung zu deaktivieren: NEXTAUTH_IGNORE_LOCAL_URL=1"
    );
  } catch {
    // ungültige URL ignorieren
  }
}
