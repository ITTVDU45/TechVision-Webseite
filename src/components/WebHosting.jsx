import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import LogoSection from './ui/LogoSection';
import { BentoGrid, BentoCard } from './ui/bento.jsx';
import Vortex from '@/components/ui/vortex';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import ColourfulText from "@/components/ui/colourful-text";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { Marquee } from '@/components/magicui/marquee';


import Lottie from 'lottie-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

import Footer from '@/components/Footer';

export default function WebHosting() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const hostingTabs = [
    {
      title: "Webseiten Hosting",
      value: "website",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 bg-gradient-to-br from-blue-900 to-indigo-900">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Starter",
                price: "9,99€",
                features: ["5GB SSD Speicher", "1 Domain", "5 Subdomains", "SSL Zertifikat"],
                isPopular: false
              },
              {
                title: "Basic",
                price: "19,99€",
                features: ["15GB SSD Speicher", "3 Domains", "10 Subdomains", "SSL Zertifikat"],
                isPopular: true
              },
              {
                title: "Professional",
                price: "29,99€",
                features: ["30GB SSD Speicher", "5 Domains", "20 Subdomains", "SSL Zertifikat"],
                isPopular: false
              },
              {
                title: "Enterprise",
                price: "49,99€",
                features: ["50GB SSD Speicher", "10 Domains", "Unbegrenzt Subdomains", "SSL Zertifikat"],
                isPopular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${
                  plan.isPopular ? 'border-blue-500' : 'border-gray-700'
                } border-2 rounded-xl p-6 bg-black/20 backdrop-blur-sm`}
              >
                <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                <p className="text-3xl font-bold text-white mb-4">{plan.price}<span className="text-sm">/Monat</span></p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-gray-300 flex items-center">
                      <span className="mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white font-medium"
                  onClick={() => router.push('/offer')}
                >
                  Auswählen
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "WordPress Hosting",
      value: "wordpress",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 bg-gradient-to-br from-purple-900 to-indigo-900">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "WP Starter",
                price: "14,99€",
                features: ["10GB SSD Speicher", "1 WordPress Site", "Automatische Updates", "Tägliches Backup"],
                isPopular: false
              },
              {
                title: "WP Basic",
                price: "24,99€",
                features: ["20GB SSD Speicher", "3 WordPress Sites", "Premium Themes", "CDN Integration"],
                isPopular: true
              },
              {
                title: "WP Pro",
                price: "39,99€",
                features: ["40GB SSD Speicher", "5 WordPress Sites", "Staging Umgebung", "WP CLI Zugang"],
                isPopular: false
              },
              {
                title: "WP Enterprise",
                price: "69,99€",
                features: ["100GB SSD Speicher", "10 WordPress Sites", "Redis Cache", "Git Integration"],
                isPopular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${
                  plan.isPopular ? 'border-purple-500' : 'border-gray-700'
                } border-2 rounded-xl p-6 bg-black/20 backdrop-blur-sm`}
              >
                <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                <p className="text-3xl font-bold text-white mb-4">{plan.price}<span className="text-sm">/Monat</span></p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-gray-300 flex items-center">
                      <span className="mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-medium"
                  onClick={() => router.push('/offer')}
                >
                  Auswählen
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Software Hosting",
      value: "software",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 bg-gradient-to-br from-indigo-900 to-blue-900">
          <p className="text-xl text-white">Software Hosting Angebote werden in Kürze hier erscheinen...</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
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
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#2563eb" />
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
              <span className="text-white">Modernes Hosting für Ihre </span>
              <span className="block">
                <AnimatedGradientText>
                  Website & WordPress
                </AnimatedGradientText>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed"
            >
            Schnelle, zuverlässige und skalierbare Hosting-Lösungen – powered by CyberPanel.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlowingEffect>
                <button
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  onClick={() => router.push('/offer')}
                >
                  Jetzt Anfragen
                </button>
              </GlowingEffect>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1 h-1 bg-white rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Erste Preissektion */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
              Transparente Preise
            </h2>
            <p className="text-xl text-gray-400 mt-4">
              Wählen Sie den passenden Plan für Ihre Bedürfnisse
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <TabsPrimitive.Root defaultValue="web">
              <TabsPrimitive.List className="flex justify-center mb-12 gap-4">
                <TabsPrimitive.Trigger 
                  value="web"
                  className="px-6 py-3 rounded-lg text-lg font-medium 
                           bg-neutral-800 text-gray-400 border border-neutral-700
                           hover:bg-neutral-700 hover:text-white transition-all
                           data-[state=active]:bg-blue-600 data-[state=active]:text-white
                           data-[state=active]:border-blue-500"
                >
                  Webseiten Hosting
                </TabsPrimitive.Trigger>
                <TabsPrimitive.Trigger 
                  value="wordpress"
                  className="px-6 py-3 rounded-lg text-lg font-medium 
                           bg-neutral-800 text-gray-400 border border-neutral-700
                           hover:bg-neutral-700 hover:text-white transition-all
                           data-[state=active]:bg-blue-600 data-[state=active]:text-white
                           data-[state=active]:border-blue-500"
                >
                  WordPress Hosting
                </TabsPrimitive.Trigger>
                <TabsPrimitive.Trigger 
                  value="software"
                  className="px-6 py-3 rounded-lg text-lg font-medium 
                           bg-neutral-800 text-gray-400 border border-neutral-700
                           hover:bg-neutral-700 hover:text-white transition-all
                           data-[state=active]:bg-blue-600 data-[state=active]:text-white
                           data-[state=active]:border-blue-500"
                >
                  Software Hosting
                </TabsPrimitive.Trigger>
              </TabsPrimitive.List>

              <TabsPrimitive.Content value="web">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Bestehende Preiskarten für Web Hosting */}
                  {[
                    {
                      name: "Starter",
                      price: "0,79",
                      originalPrice: "4,99",
                      features: [
                        "1 Website",
                        "10GB SSD Storage",
                        "10 Mailboxen",
                        "10 MySQL Datenbanken",
                        "Unmetered Traffic",
                        "1 Core CPU und 1 GB Memory"
                      ]
                    },
                    {
                      name: "Deluxe",
                      price: "2,99",
                      originalPrice: "6,99",
                      features: [
                        "5 Websites",
                        "25GB SSD Storage",
                        "Unlimited Mailboxen",
                        "Unlimited MySQL Datenbanken",
                        "Unmetered Traffic",
                        "2 Core CPU und 2 GB Memory"
                      ]
                    },
                    {
                      name: "Ultimate",
                      price: "6,99",
                      originalPrice: "12,99",
                      popular: true,
                      features: [
                        "Unlimited Websites",
                        "Unlimited Storage",
                        "Unlimited Mailboxen",
                        "Unlimited MySQL Datenbanken",
                        "Unmetered Traffic",
                        "3 Core CPU und 3 GB Memory"
                      ]
                    },
                    {
                      name: "Maximum",
                      price: "8,99",
                      originalPrice: "14,99",
                      features: [
                        "Unlimited Websites",
                        "Unlimited Storage",
                        "Unlimited Mailboxen",
                        "Unlimited MySQL Datenbanken",
                        "Unmetered Traffic",
                        "4 Core CPU und 4 GB Memory"
                      ]
                    }
                  ].map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${
                        plan.popular ? 'border-purple-500' : 'border-gray-700'
                      } border-2 rounded-xl p-6 bg-black/20 backdrop-blur-sm relative group`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2">
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                            Beliebt
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold text-white">{plan.price}€</span>
                        <span className="text-sm text-gray-400 ml-2">/Monat</span>
                        {plan.originalPrice && (
                          <span className="text-sm text-gray-500 ml-2 line-through">
                            {plan.originalPrice}€
                          </span>
                        )}
                      </div>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="text-gray-300 flex items-center">
                            <span className="text-green-400 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 
                                 rounded-lg text-white font-medium hover:shadow-lg 
                                 hover:shadow-purple-500/25 transition-all"
                        onClick={() => router.push('/offer')}
                      >
                        Jetzt Anfragen
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </TabsPrimitive.Content>

              <TabsPrimitive.Content value="wordpress">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Bestehende Preiskarten für WordPress Hosting */}
                  {[
                    {
                      name: "WP Starter",
                      price: "1,99",
                      originalPrice: "5,99",
                      features: [
                        "1 WordPress Installation",
                        "15GB SSD Storage",
                        "10 Mailboxen",
                        "Managed WordPress Updates",
                        "Unmetered Traffic",
                        "1 Core CPU und 2 GB Memory"
                      ]
                    },
                    {
                      name: "WP Deluxe",
                      price: "4,99",
                      originalPrice: "8,99",
                      features: [
                        "3 WordPress Installationen",
                        "30GB SSD Storage",
                        "Unlimited Mailboxen",
                        "Managed WordPress Updates",
                        "WordPress Staging",
                        "2 Core CPU und 3 GB Memory"
                      ]
                    },
                    {
                      name: "WP Ultimate",
                      price: "8,99",
                      originalPrice: "14,99",
                      popular: true,
                      features: [
                        "10 WordPress Installationen",
                        "50GB SSD Storage",
                        "Unlimited Mailboxen",
                        "Premium WordPress Themes",
                        "WordPress Staging & Backup",
                        "3 Core CPU und 4 GB Memory"
                      ]
                    },
                    {
                      name: "WP Maximum",
                      price: "12,99",
                      originalPrice: "19,99",
                      features: [
                        "Unlimited WordPress",
                        "100GB SSD Storage",
                        "Unlimited Mailboxen",
                        "Premium WP Plugins & Themes",
                        "Tägliche Backups & Staging",
                        "4 Core CPU und 6 GB Memory"
                      ]
                    }
                  ].map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${
                        plan.popular ? 'border-purple-500' : 'border-gray-700'
                      } border-2 rounded-xl p-6 bg-black/20 backdrop-blur-sm relative group`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2">
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                            Beliebt
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold text-white">{plan.price}€</span>
                        <span className="text-sm text-gray-400 ml-2">/Monat</span>
                        {plan.originalPrice && (
                          <span className="text-sm text-gray-500 ml-2 line-through">
                            {plan.originalPrice}€
                          </span>
                        )}
                      </div>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="text-gray-300 flex items-center">
                            <span className="text-green-400 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 
                                 rounded-lg text-white font-medium hover:shadow-lg 
                                 hover:shadow-purple-500/25 transition-all"
                        onClick={() => router.push('/offer')}
                      >
                        Jetzt Anfragen
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </TabsPrimitive.Content>

              <TabsPrimitive.Content value="software">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Bestehende Preiskarten für Software Hosting */}
                  {[
                    {
                      name: "Basic Software",
                      price: "4,99",
                      originalPrice: "9,99",
                      features: [
                        "1 Software Installation",
                        "20GB SSD Storage",
                        "Passwort Tresor",
                        "Zeiterfassungstool Basic",
                        "Filesend Tool",
                        "2 Core CPU und 2 GB Memory"
                      ]
                    },
                    {
                      name: "Business Software",
                      price: "9,99",
                      originalPrice: "14,99",
                      features: [
                        "3 Software Installationen",
                        "50GB SSD Storage",
                        "Passwort Tresor Pro",
                        "Zeiterfassung & Terminplanung",
                        "Nextcloud Basic",
                        "4 Core CPU und 4 GB Memory"
                      ]
                    },
                    {
                      name: "Professional Suite",
                      price: "19,99",
                      originalPrice: "29,99",
                      popular: true,
                      features: [
                        "5 Software Installationen",
                        "100GB SSD Storage",
                        "CRM System",
                        "Alle Business Features",
                        "Nextcloud Professional",
                        "6 Core CPU und 8 GB Memory"
                      ]
                    },
                    {
                      name: "Enterprise Suite",
                      price: "39,99",
                      originalPrice: "59,99",
                      features: [
                        "Unlimited Installationen",
                        "500GB SSD Storage",
                        "ERP System Integration",
                        "Alle Professional Features",
                        "Nextcloud Enterprise",
                        "8 Core CPU und 16 GB Memory"
                      ]
                    }
                  ].map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${
                        plan.popular ? 'border-purple-500' : 'border-gray-700'
                      } border-2 rounded-xl p-6 bg-black/20 backdrop-blur-sm relative group`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2">
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                            Beliebt
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold text-white">{plan.price}€</span>
                        <span className="text-sm text-gray-400 ml-2">/Monat</span>
                        {plan.originalPrice && (
                          <span className="text-sm text-gray-500 ml-2 line-through">
                            {plan.originalPrice}€
                          </span>
                        )}
                      </div>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="text-gray-300 flex items-center">
                            <span className="text-green-400 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 
                                 rounded-lg text-white font-medium hover:shadow-lg 
                                 hover:shadow-purple-500/25 transition-all"
                        onClick={() => router.push('/offer')}
                      >
                        Jetzt Anfragen
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </TabsPrimitive.Content>
            </TabsPrimitive.Root>
          </div>
        </div>
      </section>


      {/* Vorteile Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
                Unsere Expertise im modernen Webhosting
              </h2>
            </div>
            <div>
              <p className="text-xl text-gray-400 leading-relaxed">
                Wir bieten modernste Hosting-Lösungen mit höchster Performance und Sicherheit für Ihre Webprojekte.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Erste Reihe - 4 Kästchen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 
                       hover:border-blue-500/50 transition-all relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent" />
              <div className="relative z-10">
                <SpeedometerIcon className="w-12 h-12 mb-4 text-blue-400" />
                <h3 className="text-xl font-bold text-white mb-2">Unmetered Traffic</h3>
                <p className="text-gray-400">Unbegrenzte Bandbreite für höchste Performance und Skalierbarkeit Ihrer Webseite.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 
                       hover:border-blue-500/50 transition-all relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent" />
              <div className="relative z-10">
                <ControlIcon className="w-12 h-12 mb-4 text-blue-400" />
                <h3 className="text-xl font-bold text-white mb-2">CyberPanel Control</h3>
                <p className="text-gray-400">Benutzerfreundliche Verwaltung aller Hosting-Funktionen über ein modernes Interface.</p>
              </div>
            </motion.div>

            {/* OneClick Installation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 
                       hover:border-blue-500/50 transition-all relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent" />
              <div className="relative z-10">
                <OneClickIcon className="w-12 h-12 mb-4 text-blue-400" />
                <h3 className="text-xl font-bold text-white mb-2">One-Click Installation</h3>
                <p className="text-gray-400">Sofortiger Zugriff auf über 150 Apps und CMS-Systeme mit nur einem Klick.</p>
              </div>
            </motion.div>

            {/* SSL Zertifikate Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 
                       hover:border-blue-500/50 transition-all relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent" />
              <div className="relative z-10">
                <SSLIcon className="w-12 h-12 mb-4 text-blue-400" />
                <h3 className="text-xl font-bold text-white mb-2">SSL Zertifikate</h3>
                <p className="text-gray-400">Unbegrenzter Schutz durch kostenlose Let's Encrypt SSL-Zertifikate für alle Ihre Domains.</p>
              </div>
            </motion.div>

            {/* Zweite Reihe - 2 größere Kästchen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 
                       hover:border-blue-500/50 transition-all relative group
                       col-span-1 md:col-span-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent" />
              <div className="relative z-10">
                <MigrationIcon className="w-12 h-12 mb-4 text-blue-400" />
                <h3 className="text-xl font-bold text-white mb-2">Kostenlose Migration</h3>
                <p className="text-gray-400">Wechseln Sie mühelos – unser Expertenteam übernimmt Ihre Migration kostenlos und professionell.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 
                       hover:border-blue-500/50 transition-all relative group
                       col-span-1 md:col-span-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent" />
              <div className="relative z-10">
                <BackupIcon className="w-12 h-12 mb-4 text-blue-400" />
                <h3 className="text-xl font-bold text-white mb-2">Automatisierte Backups</h3>
                <p className="text-gray-400">Regelmäßige Backups sichern Ihre Daten automatisch und gewährleisten maximale Datensicherheit.</p>
              </div>
            </motion.div>
          </div>

          {/* Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/offer">
          <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)"
                }}
            whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                         rounded-xl text-lg font-medium relative overflow-hidden group
                         shadow-xl shadow-blue-500/20"
              >
                <span className="relative z-10">Webhosting jetzt buchen</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                             transition-opacity duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
              Warum ist unser Hosting anders?
            </h2>
            <p className="text-xl text-gray-400 mt-4">
              Entdecken Sie die Vorteile unserer modernen Cloud-Hosting-Lösungen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Linke Spalte */}
            <div className="space-y-8">
              <div className="rounded-2xl bg-neutral-900/50 border border-white/10 p-8 hover:bg-neutral-900/70 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">100% Cloud Platform</h3>
                <p className="text-gray-400">
                  Unser Cloud-Service vereint multiple Server zu einer leistungsstarken Hosting-Lösung. 
                  Entwickelt für maximale Skalierbarkeit, exzellenten Support, höchste Verfügbarkeit 
                  und Sicherheit - optimiert für beste Performance.
                </p>
              </div>
              <div className="rounded-2xl bg-neutral-900/50 border border-white/10 p-8 hover:bg-neutral-900/70 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">DSGVO Konform</h3>
                <p className="text-gray-400">
                  Alle unsere Hosting-Lösungen entsprechen den strengen europäischen 
                  Datenschutzrichtlinien und garantieren die sichere Verarbeitung 
                  personenbezogener Daten.
                </p>
              </div>
            </div>

            {/* Mittlere Spalte mit Lottie Animation */}
            <div className="relative flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <LottieSequence 
                  animations={[
                    '/images/Animation - 1741036602524.json'  // Animation mit "24" am Ende
                  ]}
                />
              </motion.div>
            </div>

            {/* Rechte Spalte */}
            <div className="space-y-8">
              <div className="rounded-2xl bg-neutral-900/50 border border-white/10 p-8 hover:bg-neutral-900/70 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">Ein-Klick Installation</h3>
                <p className="text-gray-400 mb-4">
                  Installieren Sie mit nur einem Klick Ihre bevorzugte Anwendung:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">→</span> WordPress
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">→</span> PrestaShop
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-neutral-900/50 border border-white/10 p-8 hover:bg-neutral-900/70 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">Spezialisierte Hosting-Lösungen</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">→</span> Software Hosting
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">→</span> KI Hosting
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-neutral-900/50 border border-white/10 p-8 hover:bg-neutral-900/70 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">Sichere Cloud-Infrastruktur</h3>
                <p className="text-gray-400">
                  Genießen Sie zuverlässige Sicherheit und professionelle Infrastruktur. 
                  Unsere Firewall schützt vor unerwünschtem Traffic, Malware und 
                  Phishing-Attacken. Skalieren Sie unkompliziert ohne Zusatzkosten.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <Link href="/offer">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                         rounded-xl text-lg font-medium relative overflow-hidden group
                         shadow-xl shadow-blue-500/20"
              >
                <span className="relative z-10">Webhosting jetzt buchen</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                             transition-opacity duration-300" />
          </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Additional Services Marquee Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
              Weitere Services
            </h2>
            <p className="text-xl text-gray-400 mt-4">
              Entdecken Sie unsere weiteren Lösungen
            </p>
          </div>

          <div className="space-y-12">
            {/* Erste Reihe - nach rechts bewegend */}
            <div className="relative">
              <Marquee 
                className="py-6" 
                pauseOnHover={true}
              >
                <div className="flex gap-8 px-4">
                  <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 w-[300px]">
                    <SpeedometerIcon />
                    <h3 className="text-xl font-bold text-white mt-4">Performance Optimierung</h3>
                    <p className="text-gray-400 mt-2">Maximale Geschwindigkeit für Ihre Website</p>
                  </div>
                  <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 w-[300px]">
                    <SSLIcon />
                    <h3 className="text-xl font-bold text-white mt-4">SSL Zertifikate</h3>
                    <p className="text-gray-400 mt-2">Sichere Verschlüsselung für Ihre Daten</p>
                  </div>
                  <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 w-[300px]">
                    <BackupIcon />
                    <h3 className="text-xl font-bold text-white mt-4">Backup Service</h3>
                    <p className="text-gray-400 mt-2">Tägliche Sicherungen Ihrer Daten</p>
                  </div>
                  <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 w-[300px]">
                    <SupportIcon />
                    <h3 className="text-xl font-bold text-white mt-4">24/7 Support</h3>
                    <p className="text-gray-400 mt-2">Rund um die Uhr für Sie da</p>
                  </div>
                </div>
              </Marquee>
              <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />
      </div>

            {/* Zweite Reihe - nach links bewegend */}
            <div className="relative">
              <Marquee 
                className="py-6" 
                direction="right"
                pauseOnHover={true}
              >
                <div className="flex gap-8 px-4">
                  <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 w-[300px]">
                    <ControlIcon />
                    <h3 className="text-xl font-bold text-white mt-4">Control Panel</h3>
                    <p className="text-gray-400 mt-2">Einfache Verwaltung Ihrer Dienste</p>
                  </div>
                  <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 w-[300px]">
                    <OneClickIcon />
                    <h3 className="text-xl font-bold text-white mt-4">One-Click Installer</h3>
                    <p className="text-gray-400 mt-2">Schnelle Installation von Anwendungen</p>
                  </div>
                  <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 w-[300px]">
                    <MigrationIcon />
                    <h3 className="text-xl font-bold text-white mt-4">Kostenlose Migration</h3>
                    <p className="text-gray-400 mt-2">Umzugsservice für Ihre Website</p>
                  </div>
                  <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 w-[300px]">
                    <GDPRIcon />
                    <h3 className="text-xl font-bold text-white mt-4">DSGVO konform</h3>
                    <p className="text-gray-400 mt-2">Hosting nach deutschen Standards</p>
                  </div>
                </div>
              </Marquee>
              <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
              Häufig gestellte Fragen
            </h2>
            <p className="text-xl text-gray-400 mt-4">
              Finden Sie schnell Antworten auf Ihre Fragen
            </p>
      </div>

          <GlowingEffect
            blur={20}
            spread={150}
            proximity={150}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              {[
                {
                  question: "Was ist der Unterschied zwischen Shared und Cloud Hosting?",
                  answer: "Beim Shared Hosting teilen Sie sich die Serverressourcen mit anderen Websites, während Cloud Hosting Ihnen dedizierte Ressourcen in einer Cloud-Infrastruktur bietet. Cloud Hosting ist dabei skalierbarer und leistungsfähiger."
                },
                {
                  question: "Wie funktioniert die WordPress-Installation?",
                  answer: "Mit unserem One-Click-Installer können Sie WordPress in weniger als einer Minute installieren. Wählen Sie einfach WordPress aus unserem App-Katalog und folgen Sie den Anweisungen."
                },
                {
                  question: "Bieten Sie eine Uptime-Garantie?",
                  answer: "Ja, wir garantieren eine Uptime von 99,9%. Falls wir diese Garantie nicht einhalten, erhalten Sie eine entsprechende Gutschrift auf Ihr Konto."
                },
                {
                  question: "Wie funktioniert das Backup-System?",
                  answer: "Wir erstellen automatisch tägliche Backups Ihrer Website und speichern diese für 30 Tage. Sie können jederzeit auf diese Backups zugreifen und Ihre Website wiederherstellen."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl bg-neutral-900/50 border border-white/10 overflow-hidden"
                >
                  <FAQItem question={faq.question} answer={faq.answer} />
                </motion.div>
              ))}
            </div>
          </GlowingEffect>
        </div>
      </section>

      {/* CTA Section - Moved to bottom */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
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
                    <div className="text-white">Unsicher, welches</div>
                    <div className="font-bold my-4">
                      <ColourfulText text="Hosting-Paket" />
                    </div>
                    <div className="text-white">das richtige ist?</div>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16"
                  >
                    Wir beraten Sie gerne bei der Auswahl des perfekten Hosting-Plans – 
                    transparent und ohne versteckte Verkaufstaktiken oder Upgrades.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  >
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                                   rounded-xl text-lg font-medium relative overflow-hidden group
                                   min-w-[200px]"
                                   onClick={() => router.push('/offer')}>
                      <span className="relative z-10">Angebot einholen</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                                  transition-opacity duration-300" />
                    </button>
                    
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 
                                   rounded-xl text-lg font-medium relative overflow-hidden group
                                   min-w-[200px]">
                      <span className="relative z-10">24/7 Live Chat</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 
                                  transition-opacity duration-300" />
                    </button>
                  </motion.div>
                </div>
              </Vortex>
            </div>
          </GlowingEffect>
        </div>
      </section>

      {/* Footer hinzufügen */}
      <Footer />
    </div>
  );
}

// Beispielhafte Icons für die Vorteile
const SpeedometerIcon = () => <span>🚀</span>;
const ControlIcon = () => <span>⚙️</span>;
const OneClickIcon = () => <span>🖱️</span>;
const MigrationIcon = () => <span>🔄</span>;
const SSLIcon = () => <span>🔒</span>;
const BackupIcon = () => <span>💾</span>;
const SupportIcon = () => <span>🆘</span>;
const GDPRIcon = () => <span>🔐</span>; 

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center px-6 py-4 hover:bg-neutral-800/50 transition-colors"
      >
        <span className="text-lg font-medium text-white text-left">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-blue-400 ml-4"
        >
          ↓
        </motion.span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-4 text-gray-400 border-t border-white/10"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

// Lottie Sequence Component
const LottieSequence = ({ animations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(animations[currentIndex])
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, [currentIndex, animations]);

  const handleComplete = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % animations.length);
  };

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={false}
      onComplete={handleComplete}
      className="w-full"
      style={{ background: 'transparent' }}
    />
  );
}; 