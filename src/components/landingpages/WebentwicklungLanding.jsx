import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid';
import { CheckIcon } from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Marquee } from '@/components/magicui/marquee';
import Vortex from '@/components/ui/vortex';
import ColourfulText from "@/components/ui/colourful-text";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
// CSS für den Slider direkt importieren
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function WebentwicklungLanding() {
  // Referenz für den Slider
  const sliderRef = useRef(null);
  
  // Einfache Slider-Einstellungen
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true
  };

  // Stellen Sie sicher, dass die CSS-Dateien geladen werden
  useEffect(() => {
    // Dynamisches Laden der CSS-Dateien
    const linkSlick = document.createElement('link');
    linkSlick.rel = 'stylesheet';
    linkSlick.type = 'text/css';
    linkSlick.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css';
    document.head.appendChild(linkSlick);

    const linkSlickTheme = document.createElement('link');
    linkSlickTheme.rel = 'stylesheet';
    linkSlickTheme.type = 'text/css';
    linkSlickTheme.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css';
    document.head.appendChild(linkSlickTheme);

    return () => {
      document.head.removeChild(linkSlick);
      document.head.removeChild(linkSlickTheme);
    };
  }, []);

  // Funktionen für die Navigation
  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="bg-black text-white">
      {/* Hero Sektion mit Videohintergrund */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fotohintergrund */}
        <img 
          src="/images/Webdesitendesign.webp" 
          alt="Webdesign Hintergrund" 
          className="absolute w-full h-full object-cover opacity-50"
        />
        
        {/* Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white">Webentwicklung – </span>
          </motion.h1>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedGradientText>
              Professionelle Websites für Ihren Erfolg
            </AnimatedGradientText>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Verkaufsstarke Webseiten, die Ihre Kunden überzeugen.
          </motion.p>
          
          <motion.p 
            className="text-lg mb-10 max-w-3xl mx-auto text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Wir entwickeln maßgeschneiderte Webseiten, die nicht nur gut aussehen, sondern auch Ihre Geschäftsziele unterstützen und messbare Ergebnisse liefern.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <GlowingEffect>
              <Link 
                href="/offer" 
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-lg font-medium inline-block hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                Jetzt Angebot einholen
          </Link>
            </GlowingEffect>
          </motion.div>
        </div>
      </section>

      {/* Video Sektion */}
      <section className="py-12 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
              {/* Video Thumbnail mit Play Button */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 flex items-center justify-center group cursor-pointer">
                {/* Hier wird später das echte Video oder Thumbnail eingefügt */}
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-xl font-semibold text-white">Webentwicklung bei TechVision</h3>
                  <p className="text-gray-300 mt-2">3:45 min</p>
                </div>
              </div>
              
              {/* Tatsächliches Video (zunächst ausgeblendet) */}
              <video 
                className="w-full h-full object-cover hidden"
                controls
                poster="/images/video-thumbnail.jpg"
              >
                <source src="/videos/webentwicklung-prozess.mp4" type="video/mp4" />
                Ihr Browser unterstützt keine Videos.
              </video>
            </div>
            
            {/* Video Beschreibung */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Unser Video zeigt Ihnen, wie wir von der ersten Idee bis zur fertigen Webseite arbeiten. 
                Erfahren Sie mehr über unseren Designprozess, die Entwicklung und wie wir sicherstellen, 
                dass Ihre Webseite nicht nur gut aussieht, sondern auch Ergebnisse liefert.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kundenlogos Sektion */}
      <section className="py-16 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-medium text-gray-400"
            >
              Vertrauen von führenden Unternehmen
            </motion.h2>
          </div>
          
          {/* Logos Marquee - Erste Reihe */}
          <div className="mb-8">
            <Marquee className="py-4" pauseOnHover>
              {[
                'shop-logo.png',
                'mwd-logo.png',
                'Gluckauf-Logo-1.png',
                '1.png',
                '2_Black-4.png'
              ].map((logo, index) => (
                <div key={index} className="mx-8 flex items-center justify-center">
                  <div className="h-12 w-32 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center px-4">
                    <img 
                      src={`/images/${logo}`} 
                      alt={`Kundenlogo ${index + 1}`} 
                      className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
          
          {/* Logos Marquee - Zweite Reihe (umgekehrte Richtung) */}
          <div>
            <Marquee className="py-4" reverse pauseOnHover>
              {[9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
                <div key={i} className="mx-8 flex items-center justify-center">
                  <div className="h-12 w-32 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center px-4">
                    <div className="text-white/40 font-medium">Logo {i}</div>
                    {/* Hier später echte Logos einfügen:
                    <img 
                      src={`/images/logos/logo-${i}.svg`} 
                      alt={`Kundenlogo ${i}`} 
                      className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                    /> */}
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Probleme und Herausforderungen Sektion */}
      {/* Diese Sektion wurde entfernt */}

      {/* Statistiken und Benchmarks Sektion */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                    Die Fakten
                  </span>
                  <span className="text-white block mt-2">sprechen für sich</span>
                </motion.h2>
              </div>
              <div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-400 leading-relaxed"
                >
                  Eine professionelle Webseite ist heute wichtiger denn je. 
                  Die folgenden Statistiken zeigen, warum Sie in Ihre Online-Präsenz investieren sollten.
                </motion.p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Statistiken auf der linken Seite */}
            <div className="space-y-8">
              {[
                {
                  value: "93%",
                  label: "der Kunden recherchieren online, bevor sie einen Kauf tätigen",
                  gradient: "from-blue-400 to-blue-600"
                },
                {
                  value: "75%",
                  label: "der Nutzer beurteilen die Glaubwürdigkeit eines Unternehmens anhand seiner Webseite",
                  gradient: "from-indigo-400 to-indigo-600"
                },
                {
                  value: "88%",
                  label: "der Nutzer kehren nicht zurück, wenn sie eine schlechte Erfahrung auf einer Webseite gemacht haben",
                  gradient: "from-purple-400 to-purple-600"
                },
                {
                  value: "67%",
                  label: "höhere Conversion-Rate durch eine professionell gestaltete Webseite",
                  gradient: "from-cyan-400 to-cyan-600"
                },
                {
                  value: "53%",
                  label: "der mobilen Nutzer verlassen eine Seite, die länger als 3 Sekunden zum Laden braucht",
                  gradient: "from-teal-400 to-teal-600"
                }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-6 bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-6 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} min-w-[80px] text-center`}>
                    {stat.value}
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Bild auf der rechten Seite */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-full"
            >
              <div className="relative rounded-2xl overflow-hidden h-full min-h-[600px] border border-white/10">
                {/* Platzhalter für das Bild */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20">
                  {/* Hier wird später das Bild eingefügt */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white/50 text-lg">Bild wird hier platziert</p>
                  </div>
                </div>
                
                {/* Overlay mit Fakten */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">70%</div>
                      <div className="text-sm text-gray-400">der Kaufentscheidungen beginnen online</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">24/7</div>
                      <div className="text-sm text-gray-400">arbeitet Ihre Webseite für Sie</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">50%</div>
                      <div className="text-sm text-gray-400">mehr Anfragen durch SEO</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studys Sektion mit verbessertem Styling */}
      <section className="py-20 bg-black text-center">
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-12"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Case Studys
            </span>
          </motion.h2>
           
          <div className="max-w-6xl mx-auto relative">
            {/* Entfernen Sie die manuelle Navigation */}
            <div className="case-studies-slider">
              <Slider ref={sliderRef} {...settings}>
                {/* Erste Karte */}
                <div className="px-4">
                  <div className="bg-gradient-to-br from-red-700 via-red-800 to-red-900 p-10 rounded-3xl shadow-2xl hover:shadow-red-500/50 transition-shadow duration-500 flex flex-col md:flex-row gap-10 border-8 border-gradient-to-r from-yellow-500 to-red-500">
                    {/* Linke Seite mit Bild und Schlagwörtern */}
                    <div className="flex-1 flex flex-col">
                      <img 
                        src="/images/case-study-1.jpg" 
                        alt="Case Study 1" 
                        className="w-full h-72 object-cover rounded-xl mb-6"
                      />
                      <h3 className="text-3xl font-semibold text-white mb-4">Landingpage für Recruiting Marktführer</h3>
                      <p className="text-gray-300 mb-6">
                        Losgelöst von internen Blockaden.
                      </p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">Design System</span>
                        <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">Figma to Webflow</span>
                        <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">Dynamic Lotties</span>
                      </div>
                      <div className="mt-auto flex justify-start">
                        <button className="bg-white text-red-800 px-8 py-3 rounded-lg font-medium">
                          Casestudy ansehen
                        </button>
                      </div>
                    </div>

                    {/* Rechte Seite mit Video und Titel */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center mb-6">
                        <div className="w-40 h-40 bg-black rounded-lg overflow-hidden mr-6">
                          <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white">Gian-Marco Blum</h4>
                          <p className="text-gray-300">Geschäftsführer, Candidate Flow GmbH</p>
                        </div>
                      </div>
                      <div className="w-full h-72 bg-black rounded-lg overflow-hidden">
                        <iframe 
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Zweite Karte */}
                <div className="px-4">
                  <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 p-10 rounded-3xl shadow-2xl hover:shadow-blue-500/50 transition-shadow duration-500 flex flex-col md:flex-row gap-10 border-8 border-gradient-to-r from-cyan-500 to-blue-500">
                    {/* Linke Seite mit Bild und Schlagwörtern */}
                    <div className="flex-1 flex flex-col">
                      <img 
                        src="/images/case-study-2.jpg" 
                        alt="Case Study 2" 
                        className="w-full h-72 object-cover rounded-xl mb-6"
                      />
                      <h3 className="text-3xl font-semibold text-white mb-4">E-Commerce für Luxusmarke</h3>
                      <p className="text-gray-300 mb-6">
                        Umsatzsteigerung durch optimierte Customer Journey.
                      </p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">Shopify Plus</span>
                        <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">UX Design</span>
                        <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">Conversion Rate Optimization</span>
                      </div>
                      <div className="mt-auto flex justify-start">
                        <button className="bg-white text-blue-800 px-8 py-3 rounded-lg font-medium">
                          Casestudy ansehen
                        </button>
                      </div>
                    </div>

                    {/* Rechte Seite mit Video und Titel */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center mb-6">
                        <div className="w-40 h-40 bg-black rounded-lg overflow-hidden mr-6">
                          <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white">Sophia Müller</h4>
                          <p className="text-gray-300">Marketing Direktorin, Luxus GmbH</p>
                        </div>
                      </div>
                      <div className="w-full h-72 bg-black rounded-lg overflow-hidden">
                        <iframe 
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Dritte Karte */}
                <div className="px-4">
                  <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 p-10 rounded-3xl shadow-2xl hover:shadow-purple-500/50 transition-shadow duration-500 flex flex-col md:flex-row gap-10 border-8 border-gradient-to-r from-pink-500 to-purple-500">
                    {/* Linke Seite mit Bild und Schlagwörtern */}
                    <div className="flex-1 flex flex-col">
                      <img 
                        src="/images/case-study-3.jpg" 
                        alt="Case Study 3" 
                        className="w-full h-72 object-cover rounded-xl mb-6"
                      />
                      <h3 className="text-3xl font-semibold text-white mb-4">SaaS Plattform Relaunch</h3>
                      <p className="text-gray-300 mb-6">
                        Von Legacy zu modernem Tech-Stack.
                      </p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">React</span>
                        <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">Node.js</span>
                        <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">AWS</span>
                      </div>
                      <div className="mt-auto flex justify-start">
                        <button className="bg-white text-purple-800 px-8 py-3 rounded-lg font-medium">
                          Casestudy ansehen
                        </button>
                      </div>
                    </div>

                    {/* Rechte Seite mit Video und Titel */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center mb-6">
                        <div className="w-40 h-40 bg-black rounded-lg overflow-hidden mr-6">
                          <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white">Thomas Weber</h4>
                          <p className="text-gray-300">CTO, SaaS Solutions AG</p>
                        </div>
                      </div>
                      <div className="w-full h-72 bg-black rounded-lg overflow-hidden">
                        <iframe 
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Unsere Leistungen Sektion */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Unsere Unterstützungsangebote
              </span>
              <span className="text-white block mt-2">für Ihre Digitalisierungsvorhaben</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 leading-relaxed mt-6"
            >
              Baukastenfertige Webseiten für Ihre Branche - maßgeschneidert auf Ihre Bedürfnisse.
              Wir bieten Ihnen ein Komplettpaket für Ihren erfolgreichen Webauftritt.
            </motion.p>
          </div>
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Erste Reihe - Linke Karte: Fördermöglichkeiten */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-8 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 h-full relative overflow-hidden flex flex-col"
              style={{ height: '100%' }}
            >
              {/* Hintergrundbild mit Overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80 z-10" />
                <img 
                  src="/images/funding.jpg" 
                  alt="Fördermöglichkeiten" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              </div>
              
              <div className="flex flex-col h-full relative z-10">
                {/* Bild über dem Titel */}
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img 
                    src="/images/funding-icon.jpg" 
                    alt="Fördermöglichkeiten Icon" 
                    className="w-full h-40 object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                  Fördermöglichkeiten
                </h3>
                <p className="text-gray-400 mb-6">
                  Nutzen Sie staatliche Fördermittel für Ihre Digitalisierungsprojekte. Wir beraten Sie zu den verschiedenen Förderprogrammen und unterstützen Sie bei der Antragstellung.
                </p>
                <div className="mt-auto">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-gray-400">Go-Digital</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-gray-400">Digital Jetzt</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-gray-400">Regionale Förderprogramme</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Erste Reihe - Rechte Karte: Dienstleistungen (große Karte) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-8 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 row-span-2 relative overflow-hidden md:col-span-2"
            >
              {/* Hintergrundbild mit Overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80 z-10" />
                <img 
                  src="/images/services.jpg" 
                  alt="Dienstleistungen" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
              </div>
              
              <div className="relative z-10">
                {/* Bild über dem Titel */}
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img 
                    src="/images/services-icon.jpg" 
                    alt="Dienstleistungen Icon" 
                    className="w-full h-40 object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                  Dienstleistungen
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-start mb-4">
                      <div className="mr-3 text-2xl">🎯</div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Konzeption</h4>
                        <p className="text-sm text-gray-400">Wir entwickeln eine maßgeschneiderte Strategie für Ihre Webseite.</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <div className="mr-3 text-2xl">🎨</div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Design</h4>
                        <p className="text-sm text-gray-400">Unser Designteam erstellt ein modernes, ansprechendes Layout.</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <div className="mr-3 text-2xl">💻</div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Entwicklung</h4>
                        <p className="text-sm text-gray-400">Wir setzen Ihr Design mit modernsten Technologien um.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 text-2xl">🔍</div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">SEO</h4>
                        <p className="text-sm text-gray-400">Optimierung Ihrer Webseite für Suchmaschinen.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start mb-4">
                      <div className="mr-3 text-2xl">📈</div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Marketing</h4>
                        <p className="text-sm text-gray-400">Strategien zur Steigerung Ihrer Online-Präsenz.</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <div className="mr-3 text-2xl">🔧</div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Wartung</h4>
                        <p className="text-sm text-gray-400">Regelmäßige Updates und Support für Ihre Webseite.</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <div className="mr-3 text-2xl">☁️</div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Hosting</h4>
                        <p className="text-sm text-gray-400">Zuverlässiges Hosting für Ihre Webseite.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 text-2xl">🔒</div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Sicherheit</h4>
                        <p className="text-sm text-gray-400">Schutz Ihrer Webseite vor Bedrohungen.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Zweite Reihe - Linke Karte: Beratung */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-8 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 h-full relative overflow-hidden flex flex-col"
            >
              {/* Hintergrundbild mit Overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80 z-10" />
                <img 
                  src="/images/consulting.jpg" 
                  alt="Beratung" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              </div>
              
              <div className="flex flex-col h-full relative z-10">
                {/* Bild über dem Titel */}
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img 
                    src="/images/consulting-icon.jpg" 
                    alt="Beratung Icon" 
                    className="w-full h-40 object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">
                  Beratung
                </h3>
                <p className="text-gray-400 mb-6">
                  Wir bieten umfassende Beratungsleistungen, um Ihre digitalen Projekte erfolgreich zu gestalten.
                </p>
                <div className="mt-auto">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-orange-500" />
                      </div>
                      <span className="text-gray-400">Strategieberatung</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-orange-500" />
                      </div>
                      <span className="text-gray-400">Technologieberatung</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-orange-500" />
                      </div>
                      <span className="text-gray-400">Prozessoptimierung</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Zweite Reihe - Rechte Karte: Schulungen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-8 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 h-full relative overflow-hidden flex flex-col"
            >
              {/* Hintergrundbild mit Overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80 z-10" />
                <img 
                  src="/images/training.jpg" 
                  alt="Schulungen" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              </div>
              
              <div className="flex flex-col h-full relative z-10">
                {/* Bild über dem Titel */}
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img 
                    src="/images/training-icon.jpg" 
                    alt="Schulungen Icon" 
                    className="w-full h-40 object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Schulungen
                </h3>
                <p className="text-gray-400 mb-6">
                  Unsere Schulungen helfen Ihnen, die neuesten Technologien und Methoden zu verstehen und anzuwenden.
                </p>
                <div className="mt-auto">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-pink-500" />
                      </div>
                      <span className="text-gray-400">Webentwicklung</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-pink-500" />
                      </div>
                      <span className="text-gray-400">SEO & Marketing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-pink-500" />
                      </div>
                      <span className="text-gray-400">Cloud-Technologien</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dritte Reihe - Linke Karte: Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-8 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 h-full relative overflow-hidden flex flex-col"
            >
              {/* Hintergrundbild mit Overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80 z-10" />
                <img 
                  src="/images/support.jpg" 
                  alt="Support" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              </div>
              
              <div className="flex flex-col h-full relative z-10">
                {/* Bild über dem Titel */}
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img 
                    src="/images/support-icon.jpg" 
                    alt="Support Icon" 
                    className="w-full h-40 object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-600">
                  Support
                </h3>
                <p className="text-gray-400 mb-6">
                  Unser Support-Team steht Ihnen rund um die Uhr zur Verfügung, um Ihre Fragen zu beantworten und Probleme zu lösen.
                </p>
                <div className="mt-auto">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-cyan-500" />
                      </div>
                      <span className="text-gray-400">24/7 Unterstützung</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-cyan-500" />
                      </div>
                      <span className="text-gray-400">Technischer Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-cyan-500" />
                      </div>
                      <span className="text-gray-400">Kundendienst</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dritte Reihe - Rechte Karte: Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-8 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 h-full relative overflow-hidden flex flex-col"
            >
              {/* Hintergrundbild mit Overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80 z-10" />
                <img 
                  src="/images/innovation.jpg" 
                  alt="Innovation" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              </div>
              
              <div className="flex flex-col h-full relative z-10">
                {/* Bild über dem Titel */}
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img 
                    src="/images/innovation-icon.jpg" 
                    alt="Innovation Icon" 
                    className="w-full h-40 object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-600">
                  Innovation
                </h3>
                <p className="text-gray-400 mb-6">
                  Wir setzen auf innovative Lösungen, um Ihre digitalen Projekte auf das nächste Level zu heben.
                </p>
                <div className="mt-auto">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-pink-500" />
                      </div>
                      <span className="text-gray-400">Neue Technologien</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-pink-500" />
                      </div>
                      <span className="text-gray-400">Kreative Ansätze</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-pink-500" />
                      </div>
                      <span className="text-gray-400">Zukunftsorientiert</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KI Agenten Sektion */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/vortex.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-400 leading-relaxed"
                >
                  Nutzen Sie die Kraft der KI, um Ihre Webseite zu optimieren und den Erfolg zu steigern. Unsere KI Agenten bieten vielfältige Möglichkeiten:
                </motion.p>
              </div>
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                    KI Agenten
                  </span>
                  <span className="text-white block mt-2">für Ihren Erfolg</span>
                </motion.h2>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            {/* Bild links */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <img 
                src="/images/ai-agents.jpg" 
                alt="KI Agenten" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            {/* Karten rechts */}
            <div className="w-full md:w-1/2 space-y-8">
              {[
                {
                  title: "24/7 Kunden-\nservice",
                  description: "Automatisierte Kundeninteraktion durch intelligente Chatbots für eine konstante Erreichbarkeit.",
                  gradient: "from-blue-400 to-blue-600"
                },
                {
                  title: "Leadgenerierung und\nVerwaltung",
                  description: "Effiziente Erfassung und Pflege von Kundenkontakten.",
                  gradient: "from-indigo-400 to-indigo-600"
                },
                {
                  title: "Content\nPersonalisierung",
                  description: "Maßgeschneiderte Inhalte und Empfehlungen für höhere Conversion-Raten.",
                  gradient: "from-purple-400 to-purple-600"
                },
                {
                  title: "Nutzerverhalten &\nAnalytics",
                  description: "Detaillierte Analyse des Nutzerverhaltens für datenbasierte Entscheidungen.",
                  gradient: "from-cyan-400 to-cyan-600"
                },
                {
                  title: "Automatisiertes\nTicketing",
                  description: "Intelligente Verwaltung und Priorisierung von Support-Anfragen.",
                  gradient: "from-teal-400 to-teal-600"
                }
              ].map((agent, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col gap-6 bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-6 rounded-2xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r ${agent.gradient} min-h-[56px] flex items-center whitespace-pre-line`}>
                    {agent.title}
                  </div>
                  <p className="text-gray-400 text-sm">{agent.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Darauf sind wir stolz Sektion */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/5 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Darauf sind wir stolz
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Unsere Erfolge und zufriedene Kunden sprechen für sich. Entdecken Sie, was uns auszeichnet und warum Kunden uns vertrauen.
            </motion.p>
          </div>
          
          {/* Sektion 1: Karten Darstellung */}
          <div className="mb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Linke Karte */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src="/images/award-winning.jpg" 
                    alt="Ausgezeichnete Webseiten" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Ausgezeichnete Webseiten</h3>
                  <p className="text-gray-400 mb-6">
                    Unsere Webseiten wurden mehrfach für ihr herausragendes Design und ihre Benutzerfreundlichkeit ausgezeichnet. Wir legen großen Wert auf Ästhetik, Funktionalität und Performance.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">Webby Awards Finalist</span>
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">CSS Design Awards</span>
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm">German Design Award</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Rechte Karte */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src="/images/customer-success.jpg" 
                    alt="Kundenerfolge" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Kundenerfolge</h3>
                  <p className="text-gray-400 mb-6">
                    Wir haben bereits über 200 Unternehmen dabei geholfen, ihre Online-Präsenz zu verbessern und messbare Ergebnisse zu erzielen. Unsere Kunden berichten von deutlichen Steigerungen bei Anfragen und Umsätzen.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">+45% mehr Anfragen</span>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm">+60% bessere Conversion</span>
                    <span className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-sm">+70% mehr organischer Traffic</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Sektion 2: Testimonials */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-semibold mb-12 text-center"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Das sagen unsere Kunden
              </span>
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
              {/* Linke Spalte */}
              <div className="space-y-8">
                {[
                  {
                    name: "Michael Schmidt",
                    company: "TechStart GmbH",
                    image: "/images/testimonials/person1.jpg",
                    text: "Die Zusammenarbeit mit TechVision war von Anfang an professionell und zielführend. Unsere neue Webseite hat alle Erwartungen übertroffen und generiert deutlich mehr Leads als zuvor."
                  },
                  {
                    name: "Laura Müller",
                    company: "Design Studio Berlin",
                    image: "/images/testimonials/person2.jpg",
                    text: "Als Designstudio legen wir großen Wert auf Ästhetik. TechVision hat es geschafft, unsere Vision perfekt umzusetzen und gleichzeitig eine technisch einwandfreie Webseite zu liefern."
                  }
                ].map((testimonial, index) => (
                  <TestimonialCard 
                    key={index}
                    testimonial={testimonial}
                    delay={index * 0.2}
                    direction="up"
                  />
                ))}
              </div>
              
              {/* Mittlere Spalte */}
              <div className="space-y-8 md:mt-16">
                {[
                  {
                    name: "Thomas Weber",
                    company: "Immobilien Weber",
                    image: "/images/testimonials/person3.jpg",
                    text: "Seit dem Launch unserer neuen Webseite haben sich unsere Anfragen verdoppelt. Die Investition hat sich bereits nach wenigen Monaten amortisiert. Klare Empfehlung!"
                  },
                  {
                    name: "Sophia Becker",
                    company: "Becker & Partner Rechtsanwälte",
                    image: "/images/testimonials/person4.jpg",
                    text: "TechVision hat für unsere Kanzlei eine Webseite entwickelt, die sowohl professionell als auch benutzerfreundlich ist. Die Zusammenarbeit war stets angenehm und konstruktiv."
                  },
                  {
                    name: "Markus Klein",
                    company: "Klein Maschinenbau",
                    image: "/images/testimonials/person5.jpg",
                    text: "Wir sind begeistert von unserer neuen Webseite. Sie spiegelt perfekt wider, wer wir sind und was wir tun. Die Umsetzung war schnell und unkompliziert."
                  }
                ].map((testimonial, index) => (
                  <TestimonialCard 
                    key={index}
                    testimonial={testimonial}
                    delay={0.3 + index * 0.2}
                    direction="up"
                  />
                ))}
              </div>
              
              {/* Rechte Spalte */}
              <div className="space-y-8">
                {[
                  {
                    name: "Julia Hoffmann",
                    company: "Café Sonnenschein",
                    image: "/images/testimonials/person6.jpg",
                    text: "Unsere Webseite ist nicht nur schön anzusehen, sondern auch funktional. Besonders das Online-Reservierungssystem hat uns viel manuelle Arbeit abgenommen."
                  },
                  {
                    name: "Robert Fischer",
                    company: "Fischer IT-Solutions",
                    image: "/images/testimonials/person7.jpg",
                    text: "Als IT-Unternehmen haben wir hohe Ansprüche an unsere eigene Webseite. TechVision hat diese nicht nur erfüllt, sondern übertroffen. Die Performance ist beeindruckend."
                  }
                ].map((testimonial, index) => (
                  <TestimonialCard 
                    key={index}
                    testimonial={testimonial}
                    delay={0.1 + index * 0.2}
                    direction="up"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prozess Sektion - Techvision EXPERIENCE */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                DIE TECHVISION EXPERIENCE
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-white max-w-3xl mx-auto mb-4"
            >
              In 4 einfachen Schritten
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              zu Ihrem neuen Online Auftritt
            </motion.p>
          </div>
          
          {/* Process Steps */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 transform md:-translate-x-1/2 hidden md:block"></div>
              
              {/* Step 1 */}
              <ProcessStep 
                number="01"
                title="Sie haben Ihre Lage erkannt"
                description="Der Sachverhalt ist klar: Eine neue Webseite muss her! Der erste Schritt ist abgehakt."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
                delay={0.1}
              />
              
              {/* Step 2 */}
              <ProcessStep 
                number="02"
                title="Füllen Sie unser Formular aus"
                description="Damit wir wissen, wer Sie sind und was Sie vorhaben, haben wir einige Fragen vorbereitet."
                buttonText="Jetzt anfragen"
                buttonLink="/offer"
                delay={0.3}
              />
              
              {/* Step 3 */}
              <ProcessStep 
                number="03"
                title="Hören Sie sich unsere Ideen an"
                description="In einem ersten Telefonat besprechen wir erste Details und den weiteren Ablauf."
                delay={0.5}
              />
              
              {/* Step 4 */}
              <ProcessStep 
                number="04"
                title="Lehnen Sie sich entspannt zurück"
                description="Profitieren Sie mit dem Start der Zusammenarbeit von der Techvision Experience."
                delay={0.7}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sektion */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/5 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Häufig gestellte Fragen
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Hier finden Sie Antworten auf die häufigsten Fragen rund um unsere Webentwicklung
            </motion.p>
          </div>
          
          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Wie lange dauert die Entwicklung einer Webseite?",
                answer: "Die Entwicklungszeit hängt vom Umfang und der Komplexität des Projekts ab. Eine einfache Webseite kann innerhalb von 2-4 Wochen fertiggestellt werden, während komplexere Projekte mit E-Commerce-Funktionalität oder individuellen Anforderungen 6-12 Wochen in Anspruch nehmen können. Wir erstellen für jedes Projekt einen detaillierten Zeitplan, damit Sie genau wissen, wann Ihre Webseite live gehen wird."
              },
              {
                question: "Was kostet eine professionelle Webseite?",
                answer: "Die Kosten für eine Webseite variieren je nach Umfang, Funktionalität und Design. Einfache Webseiten beginnen bei etwa 2.000 €, während komplexere Projekte mit individuellen Funktionen, E-Commerce oder speziellen Integrationen bei 5.000 € oder mehr liegen können. Wir erstellen für Sie ein maßgeschneidertes Angebot, das genau auf Ihre Anforderungen zugeschnitten ist."
              },
              {
                question: "Welche Technologien verwenden Sie für die Webentwicklung?",
                answer: "Wir setzen auf moderne, zukunftssichere Technologien wie React, Next.js, WordPress, Shopify und andere führende Plattformen. Die Wahl der Technologie hängt von Ihren spezifischen Anforderungen, dem Budget und den langfristigen Zielen ab. Wir beraten Sie gerne, welche Technologie für Ihr Projekt am besten geeignet ist."
              },
              {
                question: "Kann ich meine Webseite später selbst aktualisieren?",
                answer: "Ja, wir entwickeln Webseiten mit benutzerfreundlichen Content-Management-Systemen (CMS), die es Ihnen ermöglichen, Inhalte wie Texte, Bilder und Videos selbst zu aktualisieren. Wir bieten auch Schulungen an, damit Sie und Ihr Team lernen, wie Sie die Webseite effektiv verwalten können."
              },
              {
                question: "Bieten Sie auch Hosting und Wartung an?",
                answer: "Ja, wir bieten umfassende Hosting- und Wartungspakete an, um sicherzustellen, dass Ihre Webseite immer optimal läuft. Unsere Wartungspakete umfassen regelmäßige Updates, Sicherheits-Patches, Backups und technischen Support. So können Sie sich auf Ihr Kerngeschäft konzentrieren, während wir uns um Ihre Online-Präsenz kümmern."
              },
              {
                question: "Wie sorgen Sie für eine gute Suchmaschinenplatzierung?",
                answer: "Wir integrieren SEO-Best-Practices von Anfang an in jedes Webprojekt. Dazu gehören eine optimierte Seitenstruktur, schnelle Ladezeiten, mobile Optimierung und technische SEO-Maßnahmen. Zusätzlich bieten wir fortlaufende SEO-Dienstleistungen an, um Ihre Sichtbarkeit in Suchmaschinen kontinuierlich zu verbessern und mehr qualifizierten Traffic auf Ihre Webseite zu bringen."
              }
            ].map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Icons Sektion */}
      <section className="py-8 bg-black text-center">
        <div className="container mx-auto px-4">
          {/* Neuer Social Media Icons Abschnitt */}
          <div className="flex justify-center gap-8 mb-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.384 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126-2.126-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.38-.899-.421-.419-.69-.824-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                ),
                href: "https://github.com/yourusername",
                gradient: "from-neutral-700 to-neutral-900",
                hoverGradient: "hover:from-neutral-600 hover:to-neutral-800"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                ),
                href: "https://twitter.com/yourusername",
                gradient: "from-blue-500 to-blue-700",
                hoverGradient: "hover:from-blue-400 hover:to-blue-600"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
                href: "https://linkedin.com/in/yourusername",
                gradient: "from-blue-600 to-blue-800",
                hoverGradient: "hover:from-blue-500 hover:to-blue-700"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.384 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126-2.126-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.38-.899-.421-.419-.69-.824-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                ),
                href: "https://instagram.com/webentwicklung_agentur",
                gradient: "from-purple-500 via-pink-500 to-red-500",
                hoverGradient: "hover:from-purple-400 hover:via-pink-400 hover:to-red-400"
              }
            ].map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${social.gradient} ${social.hoverGradient}
                           flex items-center justify-center group relative
                           transition-all duration-300 ease-out
                           hover:scale-110 hover:shadow-lg hover:shadow-white/10`}
              >
                <div className="absolute inset-0 rounded-2xl bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="text-white/90 group-hover:text-white transition-all duration-300 ease-out">
                  {social.icon}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Sektion */}
      <section className="py-16 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <GlowingEffect
            blur={20}
            spread={150}
            proximity={150}
            className="max-w-6xl mx-auto"
          >
            <div className="rounded-[20px] overflow-hidden bg-neutral-900/30 backdrop-blur-sm border border-white/10
                          shadow-[0_0_50px_-12px] shadow-blue-500/30 hover:shadow-blue-500/40 
                          transition-all duration-500">
              <Vortex
                backgroundColor="rgba(0,0,0,0.7)"
                rangeY={800}
                particleCount={300}
                baseHue={220}
                className="flex min-h-[600px] w-full flex-col items-center justify-center"
              >
                <div className="w-full max-w-4xl mx-auto px-8 md:px-12 py-16 md:py-24">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center text-4xl md:text-6xl mb-8 md:mb-10"
                  >
                    <div className="text-white">Bereit für Ihren</div>
                    <div className="font-bold my-4">
                      <ColourfulText text="neuen Webauftritt" />
                    </div>
                    <div className="text-white">mit uns?</div>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16"
                  >
                    Lassen Sie uns gemeinsam Ihre Vision in die Realität umsetzen. 
                    Kontaktieren Sie uns noch heute für eine unverbindliche Beratung.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  >
                    <Link 
                      href="/offer" 
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                                 rounded-xl text-lg font-medium relative overflow-hidden group
                                 min-w-[200px]"
                    >
                      <span className="relative z-10">Projekt starten</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                                  transition-opacity duration-300" />
                    </Link>
                    
                    <Link 
                      href="/contact" 
                      className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 
                                 rounded-xl text-lg font-medium relative overflow-hidden group
                                 min-w-[200px]"
                    >
                      <span className="relative z-10">Mehr erfahren</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 
                                  transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                </div>
              </Vortex>
            </div>
          </GlowingEffect>
        </div>
      </section>
    </div>
  );
} 

// Challenges Carousel Component
const ChallengesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = window.innerWidth < 768;
  const slideCount = isMobile ? 1 : 3;

  const challenges = [
    {
      title: "Veraltete Webseite?",
      description: "Ihre aktuelle Webseite ist nicht mehr zeitgemäß und spiegelt nicht die Qualität Ihrer Produkte oder Dienstleistungen wider.",
      icon: "🕰️",
      items: [
        "Nicht mehr zeitgemäß",
        "Schlechte Usability",
        "Veraltetes Design",
        "Keine Responsivität"
      ],
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Keine Neukunden?",
      description: "Ihre Webseite generiert keine Leads oder Anfragen und trägt nicht zum Wachstum Ihres Unternehmens bei.",
      icon: "👥",
      items: [
        "Keine Leads",
        "Wenig Anfragen",
        "Kein Wachstum",
        "Keine Conversion"
      ],
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Schlechtes Ranking?",
      description: "Potenzielle Kunden finden Sie nicht in den Suchergebnissen, weil Ihre Webseite nicht für Suchmaschinen optimiert ist.",
      icon: "📉",
      items: [
        "Nicht auffindbar",
        "Schlechte SEO",
        "Keine Backlinks",
        "Veraltete Inhalte"
      ],
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Nicht mobilfähig?",
      description: "Ihre Webseite wird auf Smartphones und Tablets nicht richtig angezeigt und bietet kein optimales Nutzererlebnis.",
      icon: "📱",
      items: [
        "Nicht responsive",
        "Schlechte mobile Ansicht",
        "Lange Ladezeiten",
        "Hohe Absprungrate"
      ],
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Langsame Ladezeiten?",
      description: "Besucher verlassen Ihre Webseite, bevor sie vollständig geladen ist, weil die Performance zu wünschen übrig lässt.",
      icon: "🐢",
      items: [
        "Lange Ladezeiten",
        "Hohe Absprungrate",
        "Schlechte Performance",
        "Große Dateien"
      ],
      gradient: "from-teal-500 to-teal-600"
    },
    {
      title: "Keine Conversion?",
      description: "Ihre Webseite erhält zwar Traffic, aber die Besucher werden nicht zu Kunden oder Interessenten.",
      icon: "🔄",
      items: [
        "Keine Conversion",
        "Hohe Absprungrate",
        "Schlechte UX",
        "Fehlende CTAs"
      ],
      gradient: "from-emerald-500 to-emerald-600"
    }
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - slideCount + challenges.length) % challenges.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slideCount) % challenges.length);
  };

  const visibleChallenges = () => {
    return challenges.slice(currentIndex, currentIndex + slideCount);
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 
                 hover:bg-blue-500/20 transition-colors duration-200"
      >
        <ChevronLeftIcon className="w-6 h-6 text-blue-400" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 
                 hover:bg-blue-500/20 transition-colors duration-200"
      >
        <ChevronRightIcon className="w-6 h-6 text-blue-400" />
      </button>

      {/* Challenges Carousel */}
      <div className="relative overflow-hidden mx-12">
        <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
          {visibleChallenges().map((challenge, index) => (
            <motion.div 
              key={index}
              className="w-full min-w-[calc(100%-1rem)] md:min-w-[calc(33.333%-1rem)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`bg-gradient-to-br ${challenge.gradient} p-[1px] rounded-2xl h-full`}>
                <div className="bg-gray-900 p-6 rounded-2xl h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{challenge.icon}</span>
                    <h3 className={`text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r ${challenge.gradient}`}>
                      {challenge.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 mb-6">{challenge.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    {challenge.items.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-blue-500/20 transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <CheckIcon className="w-3 h-3 text-emerald-500" />
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(challenges.length / slideCount) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * slideCount)}
            className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${Math.floor(currentIndex / slideCount) === index 
                        ? 'bg-blue-600 w-4' 
                        : 'bg-blue-900'}`}
          />
        ))}
      </div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, delay = 0, direction = "up" }) => {
  const directionVariants = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, ...directionVariants[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-white font-medium">{testimonial.name}</h4>
          <p className="text-gray-400 text-sm">{testimonial.company}</p>
        </div>
      </div>
      <p className="text-gray-300 italic">"{testimonial.text}"</p>
    </motion.div>
  );
};

// Process Step Component
const ProcessStep = ({ number, title, description, icon, buttonText, buttonLink, delay = 0 }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center mb-16 md:mb-32 relative">
      {/* Number Circle - Left Side on Mobile, Center on Desktop */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold z-10 flex-shrink-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
      >
        {number}
      </motion.div>
      
      {/* Content - Alternating Sides on Desktop */}
      <motion.div 
        initial={{ opacity: 0, x: number % 2 === 0 ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: delay + 0.2 }}
        className={`mt-6 md:mt-0 md:w-1/2 ${number % 2 === 0 ? 'md:ml-auto md:pl-16' : 'md:pr-16'}`}
      >
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
          <p className="text-gray-400 mb-6">{description}</p>
          
          {/* Optional Button or Icon */}
          {buttonText && buttonLink && (
            <Link 
              href={buttonLink} 
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              {buttonText}
            </Link>
          )}
          
          {icon && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mr-3">
                {icon}
              </div>
              <span className="text-emerald-400 font-medium">Erledigt</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer, delay = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="mb-6"
    >
      <div 
        className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 flex justify-between items-center text-left"
        >
          <h3 className="text-xl font-medium text-white">{question}</h3>
          <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </button>
        
        <motion.div 
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-6 pt-0 text-gray-400 border-t border-neutral-800">
            {answer}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}; 