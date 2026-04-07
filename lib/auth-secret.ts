/**
 * NextAuth-JWT-Secret – muss in API-Route und Middleware identisch sein.
 * Edge-Middleware hat keinen Zugriff auf authOptions.secret; daher explizit setzen.
 *
 * Production: In Vercel `NEXTAUTH_SECRET` (≥32 Zeichen) und
 * `NEXTAUTH_URL=https://www.it-techvision.de` setzen.
 */
export function getNextAuthSecret(): string {
  const fromNext = typeof process.env.NEXTAUTH_SECRET === "string" ? process.env.NEXTAUTH_SECRET.trim() : "";
  const fromAuth = typeof process.env.AUTH_SECRET === "string" ? process.env.AUTH_SECRET.trim() : "";
  const s = fromNext || fromAuth;
  if (s.length > 0) return s;
  return "demo-secret-key-change-in-production-min-32-chars-long";
}
