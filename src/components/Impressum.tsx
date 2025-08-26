import { motion } from 'framer-motion';
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import Footer from "@/components/Footer";

export default function Impressum() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          
          {/* Animated Process Lines */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0,50 Q25,30 50,50 T100,50"
                stroke="url(#gradient)"
                strokeWidth="0.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">Impressum – </span>
              <AnimatedGradientText>
                Rechtliche Informationen
              </AnimatedGradientText>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
            >
              Hier finden Sie alle wichtigen rechtlichen Informationen zu unserem Unternehmen
            </motion.p>

            {/* Decorative Elements */}
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Diensteanbieter
                </h2>
                <div className="space-y-2 text-gray-300">
                  <p>TechVision Tolgahan Vardar</p>
                  <p>Hauffstr. 55</p>
                  <p>47166 Duisburg</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Kontaktmöglichkeiten
                </h2>
                <div className="space-y-2 text-gray-300">
                  <p>E-Mail-Adresse: info@it-techvision.de</p>
                  <p>
                    Kontaktformular:{' '}
                    <a 
                      href="https://www.it-techvision/contact" 
                      target="_blank"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      https://www.it-techvision/contact
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Audiovisuelle Mediendienste
                </h2>
                <p className="text-gray-300">Sitzland: Deutschland.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Angaben zum Unternehmen
                </h2>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Bildrechte
                </h2>
                <p className="text-gray-300">
                  Alle auf dieser Webseite verwendeten Bilder sind entweder selbst erstellt oder mithilfe von KI-Tools wie Krea, Adobe Firefly oder DALL·E generiert.
                </p>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  <a 
                    href="https://datenschutz-generator.de/" 
                    title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken." 
                    target="_blank" 
                    rel="noopener noreferrer nofollow"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 