import ServiceFAQ from "@/app/components/service-pages/ServiceFAQ";
import { FAQ } from "./types";

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return <ServiceFAQ title="Häufige Fragen zur Webentwicklung" description="Antworten zu Projektablauf, Technik, Performance und Weiterentwicklung." faqs={faqs} />;
}
