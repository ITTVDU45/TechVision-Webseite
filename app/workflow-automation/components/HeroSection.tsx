import ServiceHero from "@/app/components/service-pages/ServiceHero";

export default function HeroSection() {
  return <ServiceHero eyebrow="Prozessautomatisierung" title="Weniger manuelle Arbeit." highlight="Mehr verlässlicher Durchsatz." description="Wir verbinden Systeme, Daten und KI-Agenten zu robusten Workflows, die Routineaufgaben beschleunigen und Fehlerquellen reduzieren." primaryLabel="Prozessanalyse starten" secondaryLabel="Einsatzfelder ansehen" secondaryHref="#details" outcomes={["Medienbrüche beseitigen", "Freigaben nachvollziehbar steuern", "Bestehende Systeme weiter nutzen"]} accent="amber" />;
}
