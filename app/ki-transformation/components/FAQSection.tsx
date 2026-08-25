import ServiceFAQ from "@/app/components/service-pages/ServiceFAQ";
import { FAQ } from "./types";

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs: FAQ[];
  ctaText?: string;
  ctaLink?: string;
}

export default function FAQSection({ title = "Häufige Fragen zur KI-Transformation", description = "Antworten zu Strategie, Daten, Integration und sicherem Betrieb.", faqs, ctaText, ctaLink }: FAQSectionProps) {
  return <ServiceFAQ title={title} description={description} faqs={faqs} ctaText={ctaText} ctaLink={ctaLink} />;
}
