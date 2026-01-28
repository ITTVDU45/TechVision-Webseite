"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Service = { icon: string; title: string; description: string; gradient: string; link: string };

const services: Service[] = [
  { icon: '🤖', title: 'KI-Transformation', description: 'Wir analysieren Ihre Geschäftsprozesse und identifizieren Potenziale für den Einsatz von Künstlicher Intelligenz, um Effizienz und Produktivität zu steigern.', gradient: 'from-blue-400 via-blue-500 to-indigo-500', link: '/ki-transformation' },
  { icon: '⚡', title: 'Workflow Automatisierung', description: 'Von der Planung bis zur Umsetzung integrieren wir maßgeschneiderte KI-Lösungen nahtlos in Ihre bestehenden Systeme.', gradient: 'from-blue-500 via-indigo-500 to-purple-500', link: '/workflow-automation' },
  { icon: '💻', title: 'Software Entwicklung', description: 'Entwicklung intelligenter Softwarelösungen, die durch KI Ihre Geschäftsabläufe optimieren und automatisieren.', gradient: 'from-purple-400 via-pink-500 to-red-500', link: '/software-development' },
  { icon: '🎯', title: 'KI für Branchen', description: 'Spezialisierte KI-Lösungen für verschiedene Branchen wie IT, Bauwesen und Rechtswesen, um branchenspezifische Herausforderungen zu meistern.', gradient: 'from-blue-500 via-indigo-500 to-purple-500', link: '/industry-solutions' },
  { icon: '🔒', title: 'Cybersecurity', description: 'Umfassender Schutz und professionelles Management Ihrer IT-Systeme, von Backup-Lösungen bis hin zu sicherer Cloud-Integration und Netzwerkarchitektur.', gradient: 'from-indigo-400 via-purple-500 to-purple-600', link: '/cybersecurity' },
  { icon: '🌐', title: 'Webseitenentwicklung', description: 'Moderne und responsive Webauftritte für Ihren professionellen Online-Auftritt.', gradient: 'from-indigo-500 via-purple-500 to-pink-500', link: '/web-development' },
  { icon: '☁️', title: 'Hosting', description: 'Zuverlässiges Hosting für Ihre Webseiten und Softwarelösungen mit erstklassigem Support.', gradient: 'from-blue-400 via-indigo-500 to-purple-500', link: '/webhosting' },
];

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/20 transition-all hidden lg:flex"
      aria-label="Previous"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-[-60px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/20 transition-all hidden lg:flex"
      aria-label="Next"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
};

export default function Services() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section id="services" className="py-32 bg-black relative overflow-hidden">
      {/* Smooth Transition Overlays */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      {/* Background Elements for better transition */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Unsere Services
        </motion.h2>

        <div className="services-carousel relative z-10 -mx-4">
          <Slider {...settings}>
            {services.map((service) => (
              <div key={service.title} className="px-4 pb-12 h-full">
                <motion.div
                  className="relative group h-[450px]"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Dynamic Glowing Shadow */}
                  <div className={`absolute -inset-2 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />

                  {/* Glass Card */}
                  <div className="relative h-full p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col transition-all duration-300 group-hover:bg-white/[0.05] group-hover:border-white/20 shadow-2xl overflow-hidden">
                    {/* Subtle Interior Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg shadow-black/20`}>
                        {service.icon}
                      </div>

                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                        {service.title}
                      </h3>

                      <p className="text-gray-400 flex-grow mb-8 leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-4">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-auto relative z-10">
                      <Link href={service.link}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-3.5 px-4 bg-gradient-to-r ${service.gradient} rounded-xl text-white text-sm font-bold shadow-lg transition-all duration-300 relative overflow-hidden group/button`}
                        >
                          <span className="relative z-10">Mehr dazu</span>
                          <div className="absolute inset-0 bg-white opacity-0 group-hover/button:opacity-20 transition-opacity duration-300" />
                        </motion.button>
                      </Link>
                    </div>

                    {/* Decorative Corner Light */}
                    <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style jsx global>{`
        .services-carousel .slick-dots {
          bottom: -20px;
        }
        .services-carousel .slick-dots li button:before {
          color: rgba(255, 255, 255, 0.3);
          font-size: 10px;
        }
        .services-carousel .slick-dots li.slick-active button:before {
          color: #3b82f6;
        }
        .services-carousel .slick-track {
          display: flex !important;
        }
        .services-carousel .slick-slide {
          height: inherit !important;
        }
        .services-carousel .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </section>
  );
}
