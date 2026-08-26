import type { MetadataRoute } from "next";

/**
 * robots.txt.
 *
 * Der Admin-Bereich ist ohnehin per Middleware geschützt; ihn hier
 * auszuschließen verhindert nur, dass Suchmaschinen an der Login-Seite
 * hängenbleiben. /design-system ist eine interne Musterseite und trägt
 * zusätzlich noindex in den Metadaten.
 */

const BASE = "https://it-techvision.de";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/", "/design-system"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
