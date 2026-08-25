"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function EfficiencySection() {
  const router = useRouter();

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="order-1 lg:order-1 flex justify-center">
            {/* Using next/image for optimization; fallbacks to img if not available */}
            <img
              src="/images/automation-dashboard.webp"
              alt="Automatisiertes Dashboard"
              className="w-full max-w-md rounded-2xl shadow-2xl"
            />
          </div>

          {/* Right: Text */}
          <div className="order-2 lg:order-2">
            <h3 className="text-3xl md:text-4xl font-bold mb-3">
              Mehr Effizienz durch KI – Weniger Aufwand, mehr Wirkung.
            </h3>
            <p className="text-lg text-gray-300 mb-4">
              Automatisiere deine Workflows mit intelligenten Systemen und fokussiere dich auf das, was
              wirklich zählt.
            </p>

            <p className="text-gray-400 mb-6">
              Unsere KI-gestützten Lösungen optimieren deine Geschäftsprozesse von Grund auf – vom
              E-Mail-Management bis zur Content-Erstellung. Dank intelligenter Automatisierung werden
              Aufgaben schneller erledigt, Ressourcen besser genutzt und deine Produktivität messbar
              gesteigert. Statt Zeit zu verlieren, gewinnst du sie zurück.
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✅</span>
                <div>
                  <strong>Automatisierte Kommunikation:</strong> KI beantwortet Mails, erstellt Texte &
                  hält deine Kunden informiert.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✅</span>
                <div>
                  <strong>Daten & Aufgaben im Griff:</strong> Intelligente Workflows priorisieren,
                  organisieren und liefern Ergebnisse in Echtzeit.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✅</span>
                <div>
                  <strong>Skalierbare Effizienz:</strong> Wachse ohne Personalaufwand – deine digitalen
                  Assistenten denken mit.
                </div>
              </li>
            </ul>

            <div>
              <button
                onClick={() => router.push('/contact')}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium hover:shadow-lg transition"
              >
                👉 Jetzt Demo anfragen
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
