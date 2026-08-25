import ServiceFAQ from "@/app/components/service-pages/ServiceFAQ";
import { FAQ } from "./types";

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return <ServiceFAQ title="Häufige Fragen zu Hosting und Betrieb" description="Antworten zu Verfügbarkeit, Sicherheit, Migration und Support." faqs={faqs} />;
}
