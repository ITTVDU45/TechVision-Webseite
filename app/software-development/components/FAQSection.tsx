import ServiceFAQ from "@/app/components/service-pages/ServiceFAQ";
import { FAQ } from "./types";

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs: FAQ[];
  ctaText?: string;
  ctaLink?: string;
}

export default function FAQSection({ title = "Häufige Fragen zur Softwareentwicklung", description = "Antworten zu Ablauf, Technologie, Integration und Zusammenarbeit.", faqs, ctaText, ctaLink }: FAQSectionProps) {
  return <ServiceFAQ title={title} description={description} faqs={faqs} ctaText={ctaText} ctaLink={ctaLink} />;
}
