import type { MetadataRoute } from "next";
import { services } from "./data/services";
import { industryProfiles } from "./data/industries";
import { allCaseStudies } from "./data/caseStudies";

/**
 * Sitemap.
 *
 * Gab es bisher nicht – für eine Seite, deren Zweck Auffindbarkeit ist, war
 * das eine echte Lücke. Die Einträge werden aus denselben Datenquellen
 * erzeugt, aus denen auch die Seiten entstehen; eine neue Leistung oder
 * Referenz landet damit automatisch hier.
 *
 * Bewusst nicht enthalten: /admin (per Middleware geschützt), /design-system
 * (interne Musterseite) und die Weiterleitungen /hero und /offer.
 */

const BASE = "https://it-techvision.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const jetzt = new Date();

  const statisch: Array<{ pfad: string; prioritaet: number; frequenz: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { pfad: "/", prioritaet: 1, frequenz: "monthly" },
    { pfad: "/leistungen", prioritaet: 0.9, frequenz: "monthly" },
    { pfad: "/case-studies", prioritaet: 0.9, frequenz: "monthly" },
    { pfad: "/industry-solutions", prioritaet: 0.8, frequenz: "monthly" },
    { pfad: "/contact", prioritaet: 0.8, frequenz: "yearly" },
    { pfad: "/technologies", prioritaet: 0.6, frequenz: "yearly" },
    { pfad: "/blog", prioritaet: 0.6, frequenz: "monthly" },
    { pfad: "/faq", prioritaet: 0.5, frequenz: "yearly" },
    { pfad: "/impressum", prioritaet: 0.2, frequenz: "yearly" },
    { pfad: "/datenschutz", prioritaet: 0.2, frequenz: "yearly" },
  ];

  return [
    ...statisch.map(({ pfad, prioritaet, frequenz }) => ({
      url: `${BASE}${pfad}`,
      lastModified: jetzt,
      changeFrequency: frequenz,
      priority: prioritaet,
    })),
    ...services.map((service) => ({
      url: `${BASE}${service.href}`,
      lastModified: jetzt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...industryProfiles.map((industry) => ({
      url: `${BASE}/industry-solutions/${industry.id}`,
      lastModified: jetzt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...allCaseStudies.map((study) => ({
      url: `${BASE}/case-studies/${study.id}`,
      lastModified: jetzt,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
