import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = { title: "Impressum", description: "Anbieterkennzeichnung und Kontaktinformationen von IT-Techvision." };

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[color:var(--ink-950)] text-white">
      <Header />
      <main className="pb-20 pt-36 sm:pt-44">
        <article className="section-container max-w-4xl">
          <p className="eyebrow">Rechtliche Hinweise</p>
          <h1 className="heading-display mt-6 text-4xl sm:text-6xl">Impressum</h1>
          <div className="surface-card mt-10 grid gap-10 p-6 text-sm leading-7 text-slate-300 sm:p-10 sm:text-base md:grid-cols-2">
            <section><h2 className="text-xl font-semibold text-white">Diensteanbieter</h2><p className="mt-4">TechVision Tolgahan Vardar<br />Hauffstr. 55<br />47166 Duisburg<br />Deutschland</p></section>
            <section><h2 className="text-xl font-semibold text-white">Kontakt</h2><p className="mt-4">E-Mail<br /><a href="mailto:info@it-techvision.de" className="focus-ring rounded text-sky-300 hover:text-sky-200">info@it-techvision.de</a></p></section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
