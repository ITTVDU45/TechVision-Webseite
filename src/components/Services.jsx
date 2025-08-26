import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CaseStudySection from './CaseStudySection'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: '🤖',
    title: 'KI-Transformation',
    description: 'Wir analysieren Ihre Geschäftsprozesse und identifizieren Potenziale für den Einsatz von Künstlicher Intelligenz, um Effizienz und Produktivität zu steigern.',
    gradient: 'from-blue-400 via-blue-500 to-indigo-500',
    link: '/ki-transformation'
  },
  {
    icon: '⚡',
    title: 'Workflow Automatisierung',
    description: 'Von der Planung bis zur Umsetzung integrieren wir maßgeschneiderte KI-Lösungen nahtlos in Ihre bestehenden Systeme.',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    link: '/workflow-automation'
  },
  {
    icon: '💻',
    title: 'Software Entwicklung',
    description: 'Entwicklung intelligenter Softwarelösungen, die durch KI Ihre Geschäftsabläufe optimieren und automatisieren.',
    gradient: 'from-purple-400 via-pink-500 to-red-500',
    link: '/software-development'
  },
  {
    icon: '🎯',
    title: 'KI für Branchen',
    description: 'Spezialisierte KI-Lösungen für verschiedene Branchen wie IT, Bauwesen und Rechtswesen, um branchenspezifische Herausforderungen zu meistern.',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    link: '/industry-solutions'
  },
  {
    icon: '🔒',
    title: 'Cybersecurity',
    description: 'Umfassender Schutz und professionelles Management Ihrer IT-Systeme, von Backup-Lösungen bis hin zu sicherer Cloud-Integration und Netzwerkarchitektur.',
    gradient: 'from-indigo-400 via-purple-500 to-purple-600',
    link: '/cybersecurity'
  },
  {
    icon: '🌐',
    title: 'Webseitenentwicklung',
    description: 'Moderne und responsive Webauftritte für Ihren professionellen Online-Auftritt.',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    link: '/web-development'
  },
  {
    icon: '☁️',
    title: 'Hosting',
    description: 'Zuverlässiges Hosting für Ihre Webseiten und Softwarelösungen mit erstklassigem Support.',
    gradient: 'from-blue-400 via-indigo-500 to-purple-500',
    link: '/webhosting'
  }
]

export default function Services() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const cards = cardsRef.current

    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { 
          opacity: 0,
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.1
        }
      )
    })

    return () => {
      cards.forEach(card => {
        if (card && card.scrollTrigger) {
          card.scrollTrigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      <section ref={sectionRef} id="services" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Unsere Services
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                ref={el => cardsRef.current[index] = el}
                className="relative group h-full"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative p-8 bg-gray-900/90 backdrop-blur-sm rounded-xl h-full flex flex-col transform group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 flex-grow mb-6">{service.description}</p>
                  
                  <Link href={service.link}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-4 bg-gradient-to-r ${service.gradient} 
                                rounded-lg text-white text-sm font-medium 
                                hover:shadow-lg transition-all duration-300
                                relative overflow-hidden group/button`}
                    >
                      <span className="relative z-10">Mehr dazu</span>
                      <div className="absolute inset-0 bg-white opacity-0 
                                    group-hover/button:opacity-20 transition-opacity duration-300" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </>
  )
}