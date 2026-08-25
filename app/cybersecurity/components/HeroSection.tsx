import ServiceHero from "@/app/components/service-pages/ServiceHero";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSection({
  title = "Cybersecurity mit klarem Risikofokus.",
  subtitle = "Wir analysieren Ihre Angriffsfläche, priorisieren wirksame Maßnahmen und stärken Systeme, Prozesse und Mitarbeitende dauerhaft.",
  ctaText = "Sicherheitsanalyse starten",
  ctaLink = "/contact",
}: HeroSectionProps) {
  return <ServiceHero eyebrow="Cybersecurity" title={title} highlight="Pragmatisch geschützt." description={subtitle} primaryLabel={ctaText} primaryHref={ctaLink} secondaryLabel="Leistungen ansehen" secondaryHref="#details" outcomes={["Risiken transparent priorisieren", "Schutzmaßnahmen sauber umsetzen", "Sicherheitsniveau laufend verbessern"]} accent="emerald" />;
}
