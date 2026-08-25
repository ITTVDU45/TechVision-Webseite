import ServiceHero from "@/app/components/service-pages/ServiceHero";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSection({
  title = "Software, die zu Ihren Abläufen passt.",
  subtitle = "Von der Produktidee bis zum stabilen Betrieb entwickeln wir individuelle Anwendungen, Schnittstellen und Plattformen für anspruchsvolle Geschäftsprozesse.",
  ctaText = "Softwareprojekt anfragen",
  ctaLink = "/contact",
}: HeroSectionProps) {
  return <ServiceHero eyebrow="Individuelle Softwareentwicklung" title={title} highlight="Sauber geplant. Sicher gebaut." description={subtitle} primaryLabel={ctaText} primaryHref={ctaLink} secondaryLabel="Prozess ansehen" secondaryHref="#details" outcomes={["Klare technische Architektur", "Frühe nutzbare Ergebnisse", "Wartbarer, typisierter Code"]} accent="violet" />;
}
