import ServiceHero from "@/app/components/service-pages/ServiceHero";

export default function HeroSection() {
  return <ServiceHero eyebrow="Tools & KI-Agenten" title="Digitale Werkzeuge für" highlight="konkrete Engpässe." description="Wir wählen passende Open-Source-Werkzeuge aus, entwickeln spezialisierte KI-Agenten und integrieren beides kontrolliert in Ihren Arbeitsalltag." primaryLabel="Tools entdecken" primaryHref="#open-source-tools" secondaryLabel="KI-Agenten ansehen" secondaryHref="#ki-agenten" outcomes={["Kein unnötiger Plattformwechsel", "Kontrollierbare Automatisierung", "Sicher in vorhandene Abläufe integriert"]} accent="sky" />;
}
