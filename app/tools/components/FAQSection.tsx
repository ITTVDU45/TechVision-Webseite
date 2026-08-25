import ServiceFAQ from "@/app/components/service-pages/ServiceFAQ";
import { FAQ } from "./types";

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return <ServiceFAQ title="Häufige Fragen zu Tools und KI-Agenten" description="Antworten zu Auswahl, Integration, Datenschutz und Betrieb." faqs={faqs} />;
}
