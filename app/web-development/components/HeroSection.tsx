import ServiceHero from "@/app/components/service-pages/ServiceHero";

export default function HeroSection() {
  return <ServiceHero eyebrow="Webentwicklung" title="Websites und Anwendungen," highlight="die messbar funktionieren." description="Wir entwickeln schnelle, zugängliche und wartbare Weblösungen mit klarer Nutzerführung und einer technischen Basis, die mit Ihrem Unternehmen wächst." primaryLabel="Webprojekt anfragen" secondaryLabel="Expertise ansehen" secondaryHref="#details" outcomes={["Schnelle Ladezeiten", "Barrierearme Nutzerführung", "Saubere Weiterentwicklung"]} accent="violet" />;
}
