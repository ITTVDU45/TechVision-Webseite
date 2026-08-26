import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import CTA from "./components/CTA";
import ServicesSection from "./components/home/ServicesSection";
import ProcessFlow from "./components/home/ProcessFlow";
import { SectionHeader, SplitFeature, StatBand } from "@/components/sections";
import { caseStudies } from "./data/caseStudies";

/**
 * Startseite.
 *
 * Fünf Sektionen statt zehn. Vorher folgten alle demselben Bauplan -
 * Eyebrow, Überschrift, Fließtext, Kachelraster - und rund 38 Karten machten
 * jede Aussage gleich wichtig. Jetzt trägt jede Sektion eine eigene Form:
 * Hero, geführte Liste, ein Projekt in voller Breite, Ablauf, Abschluss.
 *
 * Was hier wegfällt, ist nicht verloren: Technologien, FAQ, Branchen und
 * Magazin haben eigene Seiten und stehen in der Navigation.
 */

/** Der Ablauf, wie er auch im Erstgespräch beschrieben wird. */
const processSteps = [
  {
    title: "Analyse & Strategie",
    description:
      "Wir sichten bestehende Systeme, Abläufe und Ziele und benennen, wo der Engpass wirklich sitzt – bevor über Werkzeuge gesprochen wird.",
  },
  {
    title: "Konzeption & Planung",
    description:
      "Gemeinsam legen wir fest, welche Lösung den größten Unterschied macht und wie sie an die vorhandene Landschaft andockt.",
  },
  {
    title: "Umsetzung & Integration",
    description:
      "Wir entwickeln in kurzen Abschnitten und integrieren laufend in Ihre IT – mit Blick auf Bedienbarkeit, Sicherheit und Wartbarkeit.",
  },
  {
    title: "Test & Qualitätssicherung",
    description:
      "Vor dem Go-live prüfen wir funktional, sicherheitstechnisch und unter realer Last. Was nicht trägt, geht nicht live.",
  },
  {
    title: "Monitoring & Support",
    description:
      "Nach dem Projekt bleiben Überwachung, Sicherheitsupdates und Weiterentwicklung – mit vereinbarter Zuständigkeit.",
  },
];

export const metadata: Metadata = {
  title: "KI, Software und sichere IT-Lösungen",
  description:
    "IT-Techvision entwickelt individuelle Software, KI-Lösungen und sichere IT-Infrastrukturen für mittelständische Unternehmen.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = caseStudies["microsoft-dynamics-integration"];

  return (
    <div className="min-h-screen w-full bg-[color:var(--ink-950)] text-[color:var(--ink-200)]">
      <Header />
      <main>
        <HeroSection />

        <section id="leistungen" className="section-y hairline-top">
          <div className="section-container">
            <SectionHeader
              layout="split"
              eyebrow="Leistungen"
              title="Technologie für konkrete betriebliche Engpässe."
              lead="Von der ersten Einordnung bis zum stabilen Betrieb. Sie müssen nicht wissen, welche Leistung Sie brauchen – wir ordnen das gemeinsam ein."
              action={{ label: "Erstgespräch vereinbaren", href: "/contact" }}
            />
            <div className="mt-14">
              <ServicesSection />
            </div>
          </div>
        </section>

        {featured ? (
          <section id="referenz" className="section-y hairline-top">
            <div className="section-container">
              <SectionHeader
                eyebrow="Referenz"
                title="Ein Projekt, statt zwölf Kacheln."
                lead="Wie aus einem konkreten betrieblichen Problem eine Anwendung wurde, die täglich benutzt wird."
                action={{ label: "Alle Referenzen", href: "/case-studies" }}
              />

              <div className="mt-14">
                {/* Der Text kommt unverändert aus dem Datensatz. Details zum
                    Projektverlauf gehören auf die Referenzseite und müssen
                    inhaltlich ergänzt werden - erfinden lässt sich das nicht. */}
                <SplitFeature
                  eyebrow={featured.subtitle}
                  title={featured.title}
                  body={featured.description}
                  image={{
                    src: featured.image,
                    alt: `Ansicht der Anwendung ${featured.title}`,
                    width: 1200,
                    height: 800,
                  }}
                  action={{ label: "Referenz im Detail", href: `/case-studies/${featured.id}` }}
                  imageSide="right"
                />
              </div>

              <div className="mt-14 border-t border-[color:var(--line-strong)] pt-2">
                <StatBand
                  variant="ruled"
                  stats={featured.stats.map((stat) => ({
                    value: stat.value,
                    label: stat.label,
                  }))}
                />
              </div>
            </div>
          </section>
        ) : null}

        <section id="ablauf" className="section-y hairline-top">
          <div className="section-container">
            <SectionHeader
              eyebrow="Zusammenarbeit"
              title="Fünf Schritte, in dieser Reihenfolge."
              lead="Jeder Schritt endet mit einem Ergebnis, das Sie beurteilen können. Wer nach Schritt zwei aussteigen will, kann das tun."
            />
            <div className="mt-12">
              <ProcessFlow steps={processSteps} />
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
