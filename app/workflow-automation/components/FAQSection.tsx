import ServiceFAQ from "@/app/components/service-pages/ServiceFAQ";
import { FAQ } from "./types";

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return <ServiceFAQ title="Häufige Fragen zur Workflow-Automatisierung" description="Antworten zu geeigneten Prozessen, Integration und laufendem Betrieb." faqs={faqs} />;
}
