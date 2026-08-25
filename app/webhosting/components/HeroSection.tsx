import ServiceHero from "@/app/components/service-pages/ServiceHero";

export default function HeroSection() {
  return <ServiceHero eyebrow="Hosting & Betrieb" title="Stabiler Betrieb für" highlight="geschäftskritische Systeme." description="Wir betreiben Websites, WordPress-Instanzen und individuelle Anwendungen mit Fokus auf Verfügbarkeit, Sicherheit und nachvollziehbaren Support." primaryLabel="Hosting anfragen" secondaryLabel="Leistungen vergleichen" secondaryHref="#details" outcomes={["Überwachter Betrieb", "Regelmäßige Sicherheitsupdates", "Direkter technischer Ansprechpartner"]} accent="emerald" />;
}
