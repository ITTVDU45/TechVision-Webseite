export type CaseStat = { value: string; label: string };

export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: CaseStat[];
};

export const categories = [
  { id: "beratung", name: "Beratung" },
  { id: "webseiten", name: "Webseiten" },
  { id: "software", name: "Software" },
  { id: "onlineshop", name: "Onlineshop" },
  { id: "tools-ki-agenten", name: "Tools & KI Agenten" },
];

export const categorizedCases: Record<string, CaseStudy[]> = {
  beratung: [
    {
      id: "cybersecurityberatung",
      title: "Cybersecurityberatung",
      subtitle: "IT-Sicherheit",
      description: "Umfassende Sicherheitsanalyse und Implementierung von Schutzmaßnahmen für kritische Infrastrukturen.",
      image: "/images/cybersecurity.jpg",
      stats: [
        { value: "100%", label: "Compliance" },
        { value: "90%", label: "Risikominderung" },
        { value: "24/7", label: "Monitoring" },
      ],
    },
    {
      id: "ki-transformation",
      title: "KI Transformation",
      subtitle: "Strategieberatung",
      description: "Entwicklung einer KI-Strategie und Roadmap für die digitale Transformation.",
      image: "/images/ai-robot.jpg",
      stats: [
        { value: "40%", label: "Effizienzsteigerung" },
        { value: "60%", label: "Prozessoptimierung" },
        { value: "25%", label: "Kosteneinsparung" },
      ],
    },
  ],
  webseiten: [
    {
      id: "cms-webentwicklung",
      title: "CMS Webentwicklung",
      subtitle: "Content Management",
      description: "Entwicklung einer modernen Website mit headless CMS und Next.js Frontend.",
      image: "/images/cms-development.jpg",
      stats: [
        { value: "300%", label: "Schneller" },
        { value: "99%", label: "SEO Score" },
        { value: "65%", label: "Mehr Conversions" },
      ],
    },
  ],
  software: [
    {
      id: "crm-mit-ki-agenten",
      title: "CRM mit KI-Agenten",
      subtitle: "Kundenmanagement",
      description: "Integration von KI-Agenten in bestehende CRM-Systeme für automatisierte Kundenbetreuung.",
      image: "/images/crm-entwicklung.jpg",
      stats: [
        { value: "45%", label: "Schnellere Reaktion" },
        { value: "30%", label: "Mehr Zufriedenheit" },
        { value: "50%", label: "Effizienzsteigerung" },
      ],
    },
    {
      id: "microsoft-dynamics-integration",
      title: "Entwicklung der CRAFTGO Mitarbeiter-App",
      subtitle: "Mobile App",
      description: "Employee Management System für Bauunternehmen",
      image: "/images/Mockup Laptop2.png",
      stats: [
        { value: "60%", label: "mehr Effizien" },
        { value: "40%", label: "weniger Verwaltung" },
        { value: "45%", label: "schnellere Organisation" },
      ],
    },
    {
      id: "kanzlei-digitalisierung",
      title: "Kanzlei Digitalisierung",
      subtitle: "Legal Tech",
      description: "Digitale Transformation einer Anwaltskanzlei mit KI-gestützten Prozessen.",
      image: "/images/legaltech.jpg",
      stats: [
        { value: "65%", label: "Effizienter" },
        { value: "50%", label: "Schneller" },
        { value: "35%", label: "Kosteneinsparung" },
      ],
    },
  ],
  onlineshop: [
    {
      id: "e-commerce-solutions",
      title: "E-Commerce Lösungen mit Shopify",
      subtitle: "Online-Handel",
      description: "Entwicklung skalierbarer E-Commerce Plattformen mit Shopify und WooCommerce.",
      image: "/images/onlineshop.jpg",
      stats: [
        { value: "200%", label: "Mehr Umsatz" },
        { value: "45%", label: "Conversion Rate" },
        { value: "60%", label: "Mobile Traffic" },
      ],
    },
    {
      id: "konfigurator",
      title: "Produktkonfigurator - Woocommerce",
      subtitle: "Flexibel, Benutzerfreundlich & Effizient",
      description: "Entwicklung eines benutzerfreundlichen und flexiblen Konfigurators für individuelle Produktanpassungen.",
      image: "/images/planen3.png",
      stats: [
        { value: "80%", label: "Effizienzsteigerung" },
        { value: "70%", label: "Kundenzufriedenheit" },
        { value: "60%", label: "Prozessoptimierung" },
      ],
    },
  ],
  "tools-ki-agenten": [
    {
      id: "ki-telefonie",
      title: "KI Telefonie",
      subtitle: "Automatisierung",
      description: "Implementation von KI-gestützten Telefoniesystemen für verbesserten Kundenservice.",
      image: "/images/aitelefonie.jpg",
      stats: [
        { value: "90%", label: "Annahmequote" },
        { value: "75%", label: "Zeitersparnis" },
        { value: "45%", label: "Mehr Buchungen" },
      ],
    },
    {
      id: "password-manager",
      title: "Passwortmanager",
      subtitle: "Sicherheit & Komfort",
      description: "Implementierung eines sicheren Passwortmanagers für Unternehmen.",
      image: "/images/Passwordmanageraufmacher.png",
      stats: [
        { value: "99%", label: "Sicherheit" },
        { value: "100%", label: "Benutzerfreundlichkeit" },
        { value: "100%", label: "Integration" },
      ],
    },
    {
      id: "personal-assistant",
      title: "KI-gestützter Personal Assistant",
      subtitle: "Effizienz und Komfort",
      description: "Implementierung eines KI-gestützten Personal Assistants zur Steigerung der Produktivität.",
      image: "/images/KIAGENTBILD.jpeg",
      stats: [
        { value: "70%", label: "Produktivitätssteigerung" },
        { value: "60%", label: "Effizienz" },
        { value: "50%", label: "Kundenzufriedenheit" },
      ],
    },
  ],
};

export const allCaseStudies = Object.values(categorizedCases).flat();
export const caseStudies = Object.fromEntries(allCaseStudies.map(cs => [cs.id, cs]));
