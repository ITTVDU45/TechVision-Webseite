import { services } from "@/app/data/services";

/**
 * Strukturierte Daten (JSON-LD).
 *
 * Vorher gab es sie nur auf den Referenz-Detailseiten. Für Suchmaschinen
 * blieb damit offen, wer hinter der Seite steht und welche Leistungen
 * angeboten werden.
 *
 * Bewusst zurückhaltend: Nur Angaben, die auf der Seite auch sichtbar sind.
 * Auszeichnungen ohne sichtbare Entsprechung sind ein Verstoß gegen die
 * Richtlinien und können abgestraft werden.
 */

const BASE = "https://it-techvision.de";

const organisation = {
  "@type": "Organization",
  "@id": `${BASE}/#organisation`,
  name: "IT-Techvision",
  url: BASE,
  logo: `${BASE}/images/techvision-logo.png`,
  description:
    "Strategische IT-Beratung, KI-Entwicklung, Prozessautomatisierung, individuelle Software und sichere Infrastruktur für Unternehmen.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Duisburg",
    addressCountry: "DE",
  },
};

const website = {
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: BASE,
  name: "IT-Techvision",
  inLanguage: "de-DE",
  publisher: { "@id": `${BASE}/#organisation` },
};

/** Die acht Leistungen – Namen und Beschreibungen wie auf /leistungen. */
const leistungen = {
  "@type": "ItemList",
  "@id": `${BASE}/leistungen#liste`,
  name: "Leistungen",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      url: `${BASE}${service.href}`,
      provider: { "@id": `${BASE}/#organisation` },
    },
  })),
};

export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organisation, website, leistungen],
  };

  return (
    <script
      type="application/ld+json"
      // Inhalt stammt vollständig aus eigenem Code, nicht aus Nutzereingaben.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
