import ServiceFAQ from "@/app/components/service-pages/ServiceFAQ";
import { FAQ } from "./types";

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return <ServiceFAQ title="Häufige Fragen zur IT-Infrastruktur" description="Antworten zu Planung, Beschaffung, Sicherheit und laufender Betreuung." faqs={faqs} />;
}
