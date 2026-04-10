/**
 * Öffentliche Kontaktdaten (Footer, Impressum, Kontaktseite).
 * Telefon optional über NEXT_PUBLIC_CONTACT_PHONE (ohne Leerzeichen im tel:-Link).
 */

export const SITE_CONTACT = {
  companyName: "IT-Techvision",
  streetLine: "Hauffstr. 55",
  postalCode: "47166",
  city: "Duisburg",
  country: "Deutschland",
  email: "info@it-techvision.de",
} as const;

export function getSiteAddressMultiline(): string {
  return `${SITE_CONTACT.streetLine}\n${SITE_CONTACT.postalCode} ${SITE_CONTACT.city}\n${SITE_CONTACT.country}`;
}

/** Google Maps Embed (ohne API-Key, nur Anzeige). */
export function getContactMapEmbedSrc(): string {
  const q = encodeURIComponent(
    `${SITE_CONTACT.streetLine}, ${SITE_CONTACT.postalCode} ${SITE_CONTACT.city}, ${SITE_CONTACT.country}`
  );
  return `https://maps.google.com/maps?q=${q}&hl=de&z=16&output=embed`;
}

export function getGoogleMapsExternalUrl(): string {
  const q = encodeURIComponent(
    `${SITE_CONTACT.streetLine}, ${SITE_CONTACT.postalCode} ${SITE_CONTACT.city}`
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
