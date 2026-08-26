import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = { title: "Datenschutz", description: "Informationen zum Datenschutz bei IT-Techvision." };

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-[color:var(--ink-950)] text-white">
      <Header />
      <main className="pb-20 pt-36 sm:pt-44">
        <article className="section-container max-w-4xl">
          <p className="eyebrow">Rechtliche Hinweise</p>
          <h1 className="heading-display mt-6 text-4xl sm:text-6xl">Datenschutz</h1>
          <div className="surface-card mt-10 space-y-8 p-6 text-sm leading-7 text-slate-300 sm:p-10 sm:text-base">
            <section><h2 className="text-xl font-semibold text-white">Informationen zur Datenverarbeitung</h2><p className="mt-3">Diese Seite enthält Informationen zur Verarbeitung personenbezogener Daten und zu Ihren Rechten. Bei Fragen zum Datenschutz erreichen Sie uns direkt per E-Mail.</p></section>
            <section><h2 className="text-xl font-semibold text-white">Kontakt</h2><p className="mt-3">IT-Techvision<br />Hauffstr. 55<br />47166 Duisburg</p><p className="mt-3"><a href="mailto:info@it-techvision.de" className="focus-ring rounded text-sky-300 hover:text-sky-200">info@it-techvision.de</a></p></section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
