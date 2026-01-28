"use client";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const steps = [
  {
    title: "Analyse & Strategie",
    description: "Wir starten mit einer umfassenden Analyse Ihrer bestehenden Systeme, Prozesse und Ziele. Darauf aufbauend entwickeln wir eine maßgeschneiderte Strategie.",
    image: "/images/Ai Voice Assistant 4.png",
    accent: "from-blue-400 to-blue-600"
  },
  {
    title: "Konzeption & Planung",
    description: "Gemeinsam definieren wir den Fahrplan: Welche Lösungen bringen den größten Mehrwert? Wie lassen sich bestehende Systeme einbinden?",
    image: "/images/multiple-devices-background.webp.png",
    accent: "from-indigo-400 to-indigo-600"
  },
  {
    title: "Umsetzung & Integration",
    description: "Wir entwickeln die Lösungen und integrieren sie nahtlos in Ihre bestehende IT-Landschaft – mit klarem Fokus auf Benutzerfreundlichkeit, Sicherheit und Skalierbarkeit.",
    image: "/images/Automation-Dashboard.png",
    accent: "from-blue-500 to-indigo-600"
  },
  {
    title: "Test & Qualitätssicherung",
    description: "Vor dem Go-Live durchlaufen alle Lösungen umfassende Tests – funktional, sicherheitstechnisch und im Live-Betrieb.",
    image: "/images/bitwarden-business-og.png",
    accent: "from-violet-400 to-violet-600"
  },
  {
    title: "Monitoring & Support",
    description: "Auch nach Abschluss des Projekts bleiben wir an Ihrer Seite: mit Monitoring, regelmäßigen Sicherheitsupdates und kontinuierlicher Optimierung.",
    image: "/images/system-integration-network.jpg",
    accent: "from-purple-400 to-blue-600"
  }
];

export default function ProcessSection() {
  const router = useRouter();

  return (
    <section id="process" className="py-32 bg-black relative overflow-hidden">
      {/* Smooth Transition Overlays */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
          >
            Unser Prozess bei Projekten
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-8 text-white leading-[1.1]"
          >
            Von der Idee zum Launch in <br className="hidden md:block" />
            <span className="relative inline-block px-4 py-1 mt-2">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 skew-x-[-12deg] rounded-lg border border-blue-500/30" />
              <span className="relative bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                5 einfachen Schritten
              </span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Eine transparente und strukturierte Zusammenarbeit ist der Schlüssel zu erfolgreichen Projekten. So begleiten wir Sie Schritt für Schritt:
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto space-y-32 md:space-y-48">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
            >
              {/* Text Side */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 text-center md:text-left"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} text-white font-bold text-xl mb-6 shadow-lg shadow-blue-500/20`}>
                  {index + 1}
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  {step.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10">
                  {step.description}
                </p>
                <div className={`h-1.5 w-24 bg-gradient-to-r ${step.accent} rounded-full mx-auto md:mx-0`} />
              </motion.div>

              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-10 blur-[100px] rounded-full scale-90 group-hover:scale-110 transition-transform duration-1000`} />

                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gray-900/40 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-[1.03] group-hover:border-white/20">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                  {/* Glass Card Overlay Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 text-center"
        >
          <motion.button
            onClick={() => router.push('/offer')}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-white rounded-full text-xl font-bold transition-all shadow-lg hover:shadow-blue-500/20"
          >
            Jetzt einen kostenlosen Ersttermin vereinbaren
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
