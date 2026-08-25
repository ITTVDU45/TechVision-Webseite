/**
 * Normalisierung von CMS-Rohdaten auf die kanonischen Inhaltstypen.
 *
 * Die Leistungsseiten holen Artikel entweder aus dem CMS oder fallen auf ihren
 * statischen Datensatz zurück. Vorher trug jede Seite dafür eine eigene Kopie
 * derselben Mapping-Logik – mit je eigenen Abweichungen, unter anderem einem
 * dritten Datumsformat (`toLocaleDateString`).
 */

import type { BlogCategory, BlogPost } from "@/lib/types/content";

/** Rohform aus dem CMS: bewusst weich typisiert, die API liefert keine Garantien. */
export interface RawBlogPost {
  id?: unknown;
  slug?: unknown;
  title?: unknown;
  subtitle?: unknown;
  excerpt?: unknown;
  description?: unknown;
  content?: unknown;
  image?: unknown;
  link?: unknown;
  category?: unknown;
  date?: unknown;
  createdAt?: unknown;
  readTime?: unknown;
}

const str = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

/** Titel → Kennung, falls das CMS weder id noch slug liefert. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Rubrik aus Objekt, String oder Array (das CMS liefert alle drei Formen). */
function toCategory(value: unknown, fallback: BlogCategory): BlogCategory {
  if (Array.isArray(value) && value.length > 0) {
    const first = value[0] as { name?: unknown; id?: unknown; icon?: unknown };
    const name = str(first?.name) || str(first?.id);
    if (name) return { name, icon: str(first?.icon) || fallback.icon };
  }
  if (value && typeof value === "object") {
    const obj = value as { name?: unknown; icon?: unknown };
    const name = str(obj.name);
    if (name) return { name, icon: str(obj.icon) || fallback.icon };
  }
  const name = str(value);
  return name ? { name, icon: fallback.icon } : fallback;
}

const MONATE: Record<string, string> = {
  januar: "01", februar: "02", "märz": "03", maerz: "03", april: "04", mai: "05", juni: "06",
  juli: "07", august: "08", september: "09", oktober: "10", november: "11", dezember: "12",
};

/**
 * Beliebige Datumsangabe → ISO 8601 (YYYY-MM-DD).
 * Erkennt ISO, "22. März 2024" und "22.3.2024"; sonst leer, damit keine
 * unlesbare Rohangabe in die Ausgabe durchschlägt.
 */
export function toIsoDate(value: unknown): string {
  const raw = str(value);
  if (!raw) return "";

  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;

  const german = /^(\d{1,2})\.\s*([A-Za-zäöü]+)\s+(\d{4})$/.exec(raw);
  if (german) {
    const month = MONATE[german[2].toLowerCase()];
    if (month) return `${german[3]}-${month}-${german[1].padStart(2, "0")}`;
  }

  const numeric = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(raw);
  if (numeric) {
    return `${numeric[3]}-${numeric[2].padStart(2, "0")}-${numeric[1].padStart(2, "0")}`;
  }

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
}

/** Ein CMS-Artikel in kanonischer Form. `fallbackCategory` je Leistungsseite. */
export function toBlogPost(raw: RawBlogPost, fallbackCategory: BlogCategory): BlogPost {
  const slug = str(raw.slug);
  const id = str(raw.id);
  const title = str(raw.title);
  const content = str(raw.content);

  const link = slug ? `/blog/${slug}` : id ? `/blog/${id}` : str(raw.link) || undefined;

  return {
    id: id || slug || (title ? slugify(title) : "artikel"),
    slug: slug || undefined,
    title,
    subtitle: str(raw.subtitle) || undefined,
    description: str(raw.excerpt) || str(raw.description) || content.slice(0, 150),
    image: str(raw.image) || undefined,
    date: toIsoDate(raw.date) || toIsoDate(raw.createdAt),
    readTime: str(raw.readTime) || undefined,
    category: toCategory(raw.category, fallbackCategory),
    link,
  };
}

/** Liste normalisieren; leere Liste → statischer Rückfall der Seite. */
export function toBlogPosts(
  raw: unknown,
  fallbackCategory: BlogCategory,
  fallback: BlogPost[],
): BlogPost[] {
  if (!Array.isArray(raw) || raw.length === 0) return fallback;
  return raw.map((item) => toBlogPost(item as RawBlogPost, fallbackCategory));
}
