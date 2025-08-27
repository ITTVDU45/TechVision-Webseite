"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";

const solutions = [
  { name: "KI Transformation", href: "/ki-transformation", icon: "🤖", description: "Digitale Transformation mit KI" },
  { name: "Softwareentwicklung", href: "/software-development", icon: "💻", description: "Maßgeschneiderte Softwarelösungen" },
  { name: "Workflow Automation", href: "/workflow-automation", icon: "⚡", description: "Automatisierung von Geschäftsprozessen" },
  { name: "Cybersecurity", href: "/cybersecurity", icon: "🔒", description: "Sicherheitslösungen für Ihr Unternehmen" },
  { name: "Tools & KI-Agenten", href: "/tools", icon: "🛠️", description: "Spezialisierte Werkzeuge und KI-Lösungen" },
  { name: "Webhosting", href: "/webhosting", icon: "☁️", description: "Schnelles und sicheres Hosting" },
  { name: "IT Infrastruktur", href: "/it-infrastructure", icon: "🔧", description: "Optimierung Ihrer IT-Systeme" },
  { name: "Branchenlösungen", href: "/industry-solutions", icon: "🏢", description: "Maßgeschneiderte Lösungen für Ihre Branche" },
];

const moreItems = [
  { name: "Top Themen und News", href: "/blog", icon: "📰", description: "Aktuelle Themen und Neuigkeiten" },
  { name: "FAQ", href: "/faq", icon: "❓", description: "Häufig gestellte Fragen" },
  { name: "Kontakt", href: "/contact", icon: "✉️", description: "Nehmen Sie Kontakt mit uns auf" },
];

export default function Header(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showSolutions, setShowSolutions] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const sections = [
      { id: "hero", name: "home" },
      { id: "services", name: "services" },
      { id: "technologies", name: "technologies" },
      { id: "contact", name: "contact" },
    ];

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollPos = window.scrollY + window.innerHeight / 2;
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element) {
            const { top, bottom } = element.getBoundingClientRect();
            if (top <= currentScrollPos && bottom >= currentScrollPos) {
              setActiveSection(section.name);
              break;
            }
          }
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const element = document.querySelector(href.substring(1));
      if (element) {
        (element as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4" : "py-6"}`}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />
      <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 origin-left" style={{ scaleX }} />

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">TechVision</Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link href="/" className="text-white font-medium"><motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2"><span className="opacity-60">🏠</span>Home</motion.span></Link>

            <div className="relative">
              <motion.button onMouseEnter={() => setShowSolutions(true)} onMouseLeave={() => setShowSolutions(false)} className="px-4 py-2 rounded-lg text-sm font-medium transition-all relative group text-gray-300 hover:text-white flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <span className="opacity-60">💡</span>Unsere Lösungen
                <svg className="w-4 h-4 ml-1 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: showSolutions ? "rotate(180deg)" : "rotate(0deg)" }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </motion.button>

              <AnimatePresence>
                {showSolutions && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="fixed left-0 right-0 mt-2 overflow-y-auto" style={{ top: isScrolled ? '68px' : '84px', maxHeight: 'calc(100vh - 100px)' }} onMouseEnter={() => setShowSolutions(true)} onMouseLeave={() => setShowSolutions(false)}>
                    <div className="bg-gray-900/90 backdrop-blur-xl border-y border-white/10">
                      <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-6 md:py-8 max-w-7xl mx-auto">
                          {solutions.map((solution) => (
                            <motion.div key={solution.name} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-white/5 transition-colors group" whileHover={{ scale: 1.02 }}>
                              <Link href={solution.href} className="flex items-start gap-3 w-full"><span className="text-xl md:text-2xl p-2 md:p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors shrink-0">{solution.icon}</span><div className="flex-1"><div className="font-medium text-white group-hover:text-blue-400 transition-colors text-base md:text-lg break-words">{solution.name}</div><div className="text-sm text-gray-400 mt-1 leading-relaxed line-clamp-2">{solution.description}</div></div></Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/case-studies" className="text-gray-300 hover:text-white"><motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2"><span className="opacity-60">📊</span> Case Studies</motion.span></Link>

            <div className="relative">
              <motion.button onMouseEnter={() => setShowMore(true)} onMouseLeave={() => setShowMore(false)} className="text-gray-300 hover:text-white flex items-center gap-2"><motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2"><span className="opacity-60">•••</span> Weiteres</motion.span><svg className="w-4 h-4 ml-1 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></motion.button>

              <AnimatePresence>
                {showMore && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-72 rounded-xl bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-xl" onMouseEnter={() => setShowMore(true)} onMouseLeave={() => setShowMore(false)}>
                    <div className="p-2">
                      {moreItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={(e: React.MouseEvent) => handleNavClick(e, item.href)}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <span className="text-2xl p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">{item.icon}</span>
                          <div>
                            <div className="font-medium text-white group-hover:text-blue-400 transition-colors">{item.name}</div>
                            <div className="text-sm text-gray-400 mt-0.5">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <Link href="/offer" className="px-6 py-2.5 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 rounded-lg text-sm font-medium relative overflow-hidden group"><motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">Jetzt Angebot einholen</motion.span><div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" /></Link>

          <button className="md:hidden w-10 h-10 flex items-center justify-center" onClick={toggleSidebar}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
        </div>
      </div>

      <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="w-64 bg-white h-full shadow-lg">
          <button className="p-4" onClick={toggleSidebar}><svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          <nav className="flex flex-col p-4">
            <Link href="/" className="py-2 text-black">Home</Link>
            <div className="py-2"><span className="text-black">Lösungen</span><div className="pl-4"><Link href="/ki-transformation" className="block py-1 text-gray-700">KI Transformation</Link><Link href="/software-development" className="block py-1 text-gray-700">Softwareentwicklung</Link><Link href="/workflow-automation" className="block py-1 text-gray-700">Workflow Automation</Link><Link href="/cybersecurity" className="block py-1 text-gray-700">Cybersecurity</Link><Link href="/tools" className="block py-1 text-gray-700">Tools & KI-Agenten</Link><Link href="/webhosting" className="block py-1 text-gray-700">Webhosting</Link><Link href="/it-infrastructure" className="block py-1 text-gray-700">IT Infrastruktur</Link></div></div>
            <Link href="/case-studies" className="py-2 text-black">Case Studies</Link>
            <div className="py-2"><span className="text-black">Weiteres</span><div className="pl-4"><Link href="/blog" className="block py-1 text-gray-700">Top Themen und News</Link><Link href="/faq" className="block py-1 text-gray-700">FAQ</Link><Link href="/contact" className="block py-1 text-gray-700">Kontakt</Link></div></div>
          </nav>
        </div>
      </div>
    </header>
  );
}
