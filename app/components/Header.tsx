"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HEADER_LOGO_SRC = "/images/techvision-logo.png";

const solutions = [
  { name: "KI Transformation", href: "/ki-transformation", icon: "🤖", description: "Digitale Transformation mit KI" },
  { name: "Softwareentwicklung", href: "/software-development", icon: "💻", description: "Maßgeschneiderte Softwarelösungen" },
  { name: "Workflow Automation", href: "/workflow-automation", icon: "⚡", description: "Automatisierung von Geschäftsprozessen" },
  { name: "Cybersecurity", href: "/cybersecurity", icon: "🔒", description: "Sicherheitslösungen für Ihr Unternehmen" },
  { name: "Tools & KI-Agenten", href: "/tools", icon: "🛠️", description: "Spezialisierte Werkzeuge und KI-Lösungen" },
  { name: "Webhosting", href: "/webhosting", icon: "☁️", description: "Schnelles und sicheres Hosting" },
  { name: "IT Infrastruktur", href: "/it-infrastructure", icon: "🔧", description: "Optimierung Ihrer IT-Systeme" },
  { name: "Webentwicklung", href: "/web-development", icon: "🌐", description: "Moderne Weblösungen und Webanwendungen" },
];

const moreItems = [
  { name: "Top Themen und News", href: "/blog", icon: "📰", description: "Aktuelle Themen und Neuigkeiten" },
  { name: "FAQ", href: "/faq", icon: "❓", description: "Häufig gestellte Fragen" },
  { name: "Kontakt", href: "/contact", icon: "✉️", description: "Nehmen Sie Kontakt mit uns auf" },
];

export default function Header(): React.JSX.Element {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const toggleSidebar = () => setIsSidebarOpen((o) => !o);

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isSidebarOpen, closeSidebar]);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setIsScrolled(window.scrollY > 32);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
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

  const headerPadY = isScrolled ? "py-3" : "py-4";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerPadY}`}
        style={{
          paddingTop: `calc(${isScrolled ? "0.75rem" : "1rem"} + env(safe-area-inset-top, 0px))`,
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />
        <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 origin-left" style={{ scaleX }} />

        <div
          className="container mx-auto px-4 relative"
          style={{
            paddingLeft: "max(1rem, env(safe-area-inset-left, 0px))",
            paddingRight: "max(1rem, env(safe-area-inset-right, 0px))",
          }}
        >
          <div className="relative z-[1] flex min-h-[44px] items-center justify-between gap-3">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="TechVision – Zur Startseite"
            >
              {/* Direkt aus /public — umgeht /_next/image (robuster in Produktion/CDN) */}
              <img
                src={HEADER_LOGO_SRC}
                alt="TechVision"
                width={320}
                height={80}
                fetchPriority="high"
                decoding="async"
                className="h-11 w-auto max-h-[3.5rem] max-w-[min(16rem,85vw)] object-contain object-left sm:h-12 sm:max-h-[4rem] md:h-14 md:max-h-[4.25rem]"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <Link href="/" className="text-white font-medium">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
                  <span className="opacity-60">🏠</span>Home
                </motion.span>
              </Link>

              <div className="relative">
                <motion.button
                  type="button"
                  onMouseEnter={() => setShowSolutions(true)}
                  onMouseLeave={() => setShowSolutions(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all relative group text-gray-300 hover:text-white flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="opacity-60">💡</span>Unsere Lösungen
                  <svg className="w-4 h-4 ml-1 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: showSolutions ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>

                <AnimatePresence>
                  {showSolutions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="fixed left-0 right-0 mt-2 overflow-y-auto"
                      style={{ top: isScrolled ? "68px" : "84px", maxHeight: "calc(100vh - 100px)" }}
                      onMouseEnter={() => setShowSolutions(true)}
                      onMouseLeave={() => setShowSolutions(false)}
                    >
                      <div className="bg-gray-900/90 backdrop-blur-xl border-y border-white/10">
                        <div className="container mx-auto px-4 md:px-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-6 md:py-8 max-w-7xl mx-auto">
                            {solutions.map((solution) => (
                              <motion.div key={solution.name} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-white/5 transition-colors group" whileHover={{ scale: 1.02 }}>
                                <Link href={solution.href} className="flex items-start gap-3 w-full">
                                  <span className="text-xl md:text-2xl p-2 md:p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors shrink-0">{solution.icon}</span>
                                  <div className="flex-1">
                                    <div className="font-medium text-white group-hover:text-blue-400 transition-colors text-base md:text-lg break-words">{solution.name}</div>
                                    <div className="text-sm text-gray-400 mt-1 leading-relaxed line-clamp-2">{solution.description}</div>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/case-studies" className="text-gray-300 hover:text-white">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
                  <span className="opacity-60">📊</span> Case Studies
                </motion.span>
              </Link>

              <div className="relative">
                <motion.button
                  type="button"
                  onMouseEnter={() => setShowMore(true)}
                  onMouseLeave={() => setShowMore(false)}
                  className="text-gray-300 hover:text-white flex items-center gap-2"
                >
                  <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
                    <span className="opacity-60">•••</span> Weiteres
                  </motion.span>
                  <svg className="w-4 h-4 ml-1 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: showMore ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>

                <AnimatePresence>
                  {showMore && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 rounded-xl bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-xl"
                      onMouseEnter={() => setShowMore(true)}
                      onMouseLeave={() => setShowMore(false)}
                    >
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

            <Link
              href="/offer"
              className="hidden md:inline-flex px-6 py-2.5 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 rounded-full text-sm font-medium relative overflow-hidden group items-center justify-center"
            >
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                Termin buchen
              </motion.span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>

            <button
              type="button"
              className="md:hidden flex h-11 min-w-[44px] items-center justify-center rounded-xl text-white touch-manipulation border border-white/15 bg-white/5 active:bg-white/10"
              onClick={toggleSidebar}
              aria-expanded={isSidebarOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isSidebarOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {isSidebarOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.button
              key="mobile-nav-backdrop"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/70 md:hidden"
              aria-hidden
              onClick={closeSidebar}
            />
            <motion.div
              key="mobile-nav-drawer"
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Hauptnavigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 z-[110] flex h-[100dvh] w-full max-w-sm flex-col border-l border-white/10 bg-neutral-950 shadow-2xl md:hidden"
              style={{
                paddingTop: "env(safe-area-inset-top, 0px)",
                paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
                paddingLeft: "max(0.75rem, env(safe-area-inset-left, 0px))",
                paddingRight: "max(1rem, env(safe-area-inset-right, 0px))",
              }}
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 py-3 pl-1 pr-0">
                <Link
                  href="/"
                  onClick={closeSidebar}
                  className="flex shrink-0 items-center"
                  aria-label="TechVision – Zur Startseite"
                >
                  <img
                    src={HEADER_LOGO_SRC}
                    alt="TechVision"
                    width={280}
                    height={70}
                    fetchPriority="high"
                    decoding="async"
                    className="h-11 w-auto max-w-[11rem] object-contain object-left"
                  />
                </Link>
                <button
                  type="button"
                  onClick={closeSidebar}
                  className="flex h-11 min-w-[44px] items-center justify-center rounded-xl text-white touch-manipulation border border-white/15 bg-white/5 active:bg-white/10"
                  aria-label="Menü schließen"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain py-2 [-webkit-overflow-scrolling:touch]" aria-label="Seiten">
                <Link
                  href="/"
                  onClick={closeSidebar}
                  className="flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-white active:bg-white/10"
                >
                  <span className="text-xl opacity-80" aria-hidden>
                    🏠
                  </span>
                  Home
                </Link>

                <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Lösungen</p>
                <ul className="mt-1 space-y-0.5">
                  {solutions.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        onClick={closeSidebar}
                        className="flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-2.5 text-white active:bg-white/10"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-lg" aria-hidden>
                          {s.icon}
                        </span>
                        <span className="text-[15px] font-medium leading-snug">{s.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/case-studies"
                  onClick={closeSidebar}
                  className="mt-4 flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-white active:bg-white/10"
                >
                  <span className="text-xl opacity-80" aria-hidden>
                    📊
                  </span>
                  Case Studies
                </Link>

                <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Weiteres</p>
                <ul className="mt-1 space-y-0.5">
                  {moreItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(e, item.href);
                          closeSidebar();
                        }}
                        className="flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-2.5 text-white active:bg-white/10"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-lg" aria-hidden>
                          {item.icon}
                        </span>
                        <span className="text-[15px] font-medium leading-snug">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="shrink-0 border-t border-white/10 pt-3">
                <Link
                  href="/offer"
                  onClick={closeSidebar}
                  className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/20 active:opacity-90 touch-manipulation"
                >
                  Termin buchen
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
