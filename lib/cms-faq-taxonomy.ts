import { z } from "zod";

/** CMS-Seiten-Slugs für FAQs (ohne Filter-Option „all“). */
export const FAQ_PAGE_SLUGS = [
  "home",
  "ki-transformation",
  "software-development",
  "workflow-automation",
  "cybersecurity",
  "tools",
  "webhosting",
  "it-infrastructure",
  "web-development",
] as const;

export type FaqPageSlug = (typeof FAQ_PAGE_SLUGS)[number];

export const FAQ_PAGE_LABELS: Record<FaqPageSlug, string> = {
  home: "Startseite",
  "ki-transformation": "KI Transformation",
  "software-development": "Softwareentwicklung",
  "workflow-automation": "Workflow Automation",
  cybersecurity: "Cybersecurity",
  tools: "Tools & KI-Agenten",
  webhosting: "Webhosting",
  "it-infrastructure": "IT Infrastruktur",
  "web-development": "Webentwicklung",
};

export const FAQ_PAGE_OPTIONS_FORM = FAQ_PAGE_SLUGS.map((value) => ({
  value,
  label: FAQ_PAGE_LABELS[value],
}));

export const FAQ_PAGE_OPTIONS_FILTER = [
  { value: "all", label: "Alle Seiten" },
  ...FAQ_PAGE_OPTIONS_FORM,
];

/** Kategorie-Slugs (ohne „keine“). */
export const FAQ_CATEGORY_SLUGS = [
  "ki-transformation",
  "ki-beratung",
  "softwareentwicklung",
  "webseitenentwicklung",
  "onlineshop-entwicklung",
  "workflow-automatisierung",
  "digitale-transformation",
  "cyber-security-beratung",
  "it-infrastruktur",
  "hosting",
  "tools-ki-agenten",
] as const;

export type FaqCategorySlug = (typeof FAQ_CATEGORY_SLUGS)[number];

export const FAQ_CATEGORY_LABELS: Record<FaqCategorySlug, string> = {
  "ki-transformation": "KI Transformation",
  "ki-beratung": "KI Beratung",
  softwareentwicklung: "Softwareentwicklung",
  webseitenentwicklung: "Webseitenentwicklung",
  "onlineshop-entwicklung": "Onlineshop Entwicklung",
  "workflow-automatisierung": "Workflow Automatisierung",
  "digitale-transformation": "Digitale Transformation",
  "cyber-security-beratung": "Cyber Security Beratung",
  "it-infrastruktur": "IT Infrastruktur",
  hosting: "Hosting",
  "tools-ki-agenten": "Tools & KI-Agenten",
};

export const FAQ_CATEGORY_OPTIONS = [
  { value: "", label: "Keine Kategorie" },
  ...FAQ_CATEGORY_SLUGS.map((value) => ({
    value,
    label: FAQ_CATEGORY_LABELS[value],
  })),
];

export const faqPageSlugSchema = z.enum(FAQ_PAGE_SLUGS);

export const faqCategoryValueSchema = z.union([
  z.enum(FAQ_CATEGORY_SLUGS),
  z.literal(""),
]);

export const faqAiItemSchema = z.object({
  question: z.string().min(1).max(2000),
  answer: z.string().min(1).max(20000),
  page: faqPageSlugSchema,
  category: faqCategoryValueSchema,
  order: z.number().int().min(0).max(9999).optional(),
});

export const faqAiResponseSchema = z.object({
  items: z.array(faqAiItemSchema).max(50),
});

export const faqBulkItemSchema = z.object({
  question: z.string().min(1).max(2000),
  answer: z.string().min(1).max(20000),
  page: faqPageSlugSchema,
  category: faqCategoryValueSchema.optional(),
  order: z.number().int().min(0).max(9999).optional(),
});

export const faqBulkBodySchema = z.object({
  items: z.array(faqBulkItemSchema).min(1).max(100),
});

/** Für OpenAI-Systemprompt: kompakte Liste Slug → Label */
export function formatTaxonomyForPrompt(): string {
  const pages = FAQ_PAGE_SLUGS.map((s) => `${s} (${FAQ_PAGE_LABELS[s]})`).join(", ");
  const cats = FAQ_CATEGORY_SLUGS.map((s) => `${s} (${FAQ_CATEGORY_LABELS[s]})`).join(", ");
  return `Erlaubte page-Werte (exakt einer dieser Slugs): ${pages}.\nErlaubte category-Werte (Slug oder leer): ${cats}, oder "" für keine Kategorie.`;
}
