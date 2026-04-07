/** Lokales Fallback, wenn CMS-URL fehlt, blockiert oder ungültig ist */
export const DEFAULT_BLOG_COVER_IMAGE = "/images/ai-robot.jpg";

/**
 * Normalisiert Blog-Cover-URLs für <img>/next/image.
 * Relative Pfade ohne "/" werden ergänzt; Whitespace wird encodiert.
 */
export function resolveBlogImageUrl(image: string | undefined | null): string {
  if (image == null || typeof image !== "string") return DEFAULT_BLOG_COVER_IMAGE;

  const t = image.trim();
  if (!t) return DEFAULT_BLOG_COVER_IMAGE;

  const lower = t.toLowerCase();
  if (lower.includes("via.placeholder.com")) return DEFAULT_BLOG_COVER_IMAGE;

  if (/^https?:\/\//i.test(t)) return t;

  const path = t.startsWith("/") ? t : `/${t}`;
  const segments = path.split("/");
  const encoded = segments.map((segment) => {
    if (segment === "") return "";
    try {
      return encodeURIComponent(decodeURIComponent(segment));
    } catch {
      return encodeURIComponent(segment);
    }
  });
  return encoded.join("/");
}
