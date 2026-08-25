import ServiceHero from "@/app/components/service-pages/ServiceHero";

export default function HeroSection() {
  return <ServiceHero eyebrow="IT-Infrastruktur" title="Eine IT-Basis, die" highlight="zuverlässig mitarbeitet." description="Von Planung und Beschaffung bis Betrieb und Wartung schaffen wir sichere, verständliche Infrastrukturen für produktive Teams." primaryLabel="Infrastruktur analysieren" secondaryLabel="Lösungen ansehen" secondaryHref="#details" outcomes={["Bedarfsgerecht dimensioniert", "Sicher dokumentiert", "Langfristig betreut"]} accent="sky" />;
}
