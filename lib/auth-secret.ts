/**
 * NextAuth-JWT-Secret – muss in API-Route und Middleware identisch sein.
 * Edge-Middleware hat keinen Zugriff auf authOptions.secret; daher explizit setzen.
 *
 * Produktion: `NEXTAUTH_SECRET` (mindestens 32 Zeichen) und
 * `NEXTAUTH_URL=https://www.it-techvision.de` setzen.
 *
 * Warum es hier keinen festen Rückfallwert für die Produktion gibt:
 * Mit diesem Secret werden die Session-Token signiert. Stünde ein fester Wert
 * im Quelltext, könnte jeder, der das Repository kennt, sich ein gültiges
 * Admin-Token selbst ausstellen – ganz ohne Passwort.
 *
 * Statt zu werfen liefert die Funktion in Produktion `null`. Ein Wurf beim
 * Laden des Moduls würde den Build mit "Cannot find module for page"
 * abbrechen – eine Meldung, aus der niemand die Ursache abliest. So bleibt
 * die öffentliche Seite baubar, und beide Aufrufstellen weisen den
 * Admin-Zugang ab, solange nichts konfiguriert ist.
 */

/** Nur für die lokale Entwicklung. Außerhalb davon niemals verwendet. */
const ENTWICKLUNGS_SECRET = "dev-only-secret-nicht-fuer-produktion-min-32-zeichen";

/**
 * Das konfigurierte Secret, oder `null`, wenn in Produktion keines gesetzt ist.
 * Aufrufer müssen `null` als "Zugang verweigern" behandeln.
 */
export function getNextAuthSecret(): string | null {
  const fromNext =
    typeof process.env.NEXTAUTH_SECRET === "string" ? process.env.NEXTAUTH_SECRET.trim() : "";
  const fromAuth =
    typeof process.env.AUTH_SECRET === "string" ? process.env.AUTH_SECRET.trim() : "";
  const secret = fromNext || fromAuth;

  if (secret.length > 0) return secret;
  if (process.env.NODE_ENV !== "production") return ENTWICKLUNGS_SECRET;

  console.error(
    "[auth] NEXTAUTH_SECRET ist nicht gesetzt. Der Admin-Bereich bleibt " +
      "gesperrt, bis die Umgebungsvariable gesetzt ist (mindestens 32 Zeichen). " +
      "Ein fester Rückfallwert im Quelltext würde erlauben, Admin-Sessions zu fälschen.",
  );
  return null;
}
