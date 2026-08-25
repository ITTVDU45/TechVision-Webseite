import ServiceHero from "@/app/components/service-pages/ServiceHero";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSection({
  title = "KI strategisch einführen.",
  subtitle = "Wir identifizieren tragfähige Einsatzfelder, entwickeln individuelle KI-Lösungen und integrieren sie sicher in Ihre bestehenden Prozesse.",
  ctaText = "KI-Potenzial prüfen",
  ctaLink = "/contact",
}: HeroSectionProps) {
  return <ServiceHero eyebrow="KI-Strategie & Entwicklung" title={title} highlight="Messbar besser arbeiten." description={subtitle} primaryLabel={ctaText} primaryHref={ctaLink} secondaryLabel="Vorgehen ansehen" secondaryHref="#details" outcomes={["Potenziale belastbar bewerten", "Daten und Systeme sicher verbinden", "Teams nachhaltig befähigen"]} accent="sky" />;
}
