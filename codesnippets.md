1. Hero Section (HeroSection.jsx)
Beschreibung:
Fullscreen-Intro mit animiertem Text und Call-to-Action.
Animation: Fade-In + Scale mit GSAP.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
    const heroRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            heroRef.current,
            { opacity: 0, scale: 0.8, y: '-10%' },
            { opacity: 1, scale: 1, y: '0%', duration: 1.8, ease: 'power4.out' }
        );
    }, []);

    return (
        <section ref={heroRef} className="h-screen flex items-center justify-center bg-black text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold">AI Powered Growth</h1>
                <p className="mt-4 text-xl">at every stage</p>
                <button className="mt-8 px-6 py-3 bg-orange-500 rounded-lg">Get Started</button>
            </div>
        </section>
    );
}
2. Services Section (Services.jsx)
Beschreibung:
Grid-Layout mit Karten, die auf Hover leicht skalieren und Schatten werfen.

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Services() {
    const servicesRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            servicesRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, stagger: 0.3 }
        );
    }, []);

    return (
        <section className="py-20 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-5xl font-bold">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12" ref={servicesRef}>
                    {['Predict', 'Influence', 'Automate'].map((service, index) => (
                        <div
                            key={index}
                            className="p-8 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform"
                        >
                            <h3 className="text-3xl">{service}</h3>
                            <p className="mt-4">Empower your business with AI-driven insights.</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
3. About Section (About.jsx)
Beschreibung:
Parallax-Scroll und Fokus auf KI-Lösungen für Branchen.

export default function About() {
    return (
        <section className="py-20 bg-black text-white relative">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-5xl font-bold">About Us</h2>
                <p className="mt-6 leading-relaxed">
                    We blend human expertise with cutting-edge AI to help industries evolve and thrive in a digital world.
                </p>
            </div>
        </section>
    );
}
4. Footer (Footer.jsx)
Beschreibung:
Schlichter Footer mit Social Links und CTA.

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <p>Contact us at <a href="mailto:info@alphavision.com" className="underline">info@alphavision.com</a></p>
                <div className="flex gap-6 mt-6">
                    {['facebook', 'twitter', 'instagram'].map((platform) => (
                        <a key={platform} href={`https://${platform}.com`} target="_blank" rel="noopener noreferrer">
                            <img src={`/icons/${platform}.svg`} alt={`${platform} logo`} className="w-6 h-6" />
                        </a>
                    ))}
                </div>
                <p className="mt-8">&copy; 2024 AlphaVision | Privacy Policy</p>
            </div>
        </footer>
    );
}



5. Testimonials Section (Testimonials.jsx)
Beschreibung:
Dynamische Kundenbewertungen, die mit Framer Motion animiert werden.

import { motion } from 'framer-motion';

export default function Testimonials() {
    const testimonials = [
        {
            name: 'Max Mustermann',
            feedback: 'The AI solutions transformed our workflow and boosted efficiency by 30%.',
        },
        {
            name: 'Anna Schmidt',
            feedback: 'Incredible insights and seamless automation. Our productivity has doubled.',
        },
    ];

    return (
        <section className="py-20 bg-gray-800 text-white">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-5xl font-bold">What Our Clients Say</h2>
                <div className="mt-12 space-y-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.3 }}
                            className="p-8 bg-black rounded-lg shadow-lg"
                        >
                            <p className="text-xl italic">"{item.feedback}"</p>
                            <h3 className="mt-4 font-bold">{item.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
6. Case Studies Section (CaseStudies.jsx)
Beschreibung:
Karten-Layout zur Vorstellung erfolgreicher Projekte und Lösungen.

export default function CaseStudies() {
    const cases = [
        { title: 'AI Automation for Law Firms', description: 'Increased operational efficiency by 40%.' },
        { title: 'Predictive Analytics in Construction', description: 'Reduced project delays by 25%.' },
    ];

    return (
        <section className="py-20 bg-black text-white">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-5xl font-bold">Case Studies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    {cases.map((item, index) => (
                        <div key={index} className="p-8 bg-gray-800 rounded-lg shadow-lg">
                            <h3 className="text-3xl">{item.title}</h3>
                            <p className="mt-4">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}



7. Call to Action (CTA.jsx)
Beschreibung:
Dynamischer Call-to-Action-Bereich, der beim Scrollen ins Sichtfeld smooth erscheint.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
    const ctaRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            ctaRef.current,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    return (
        <section ref={ctaRef} className="py-24 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center">
            <h2 className="text-5xl font-bold">Ready to Transform with AI?</h2>
            <p className="mt-6 text-lg">Let’s drive your business forward together. Contact us today!</p>
            <button className="mt-8 px-10 py-4 bg-black rounded-lg hover:bg-white hover:text-black transition-all">
                Get in Touch
            </button>
        </section>
    );
}

8. Smooth Scrolling (smoothScroll.js)
Beschreibung:
Sanftes Scrollen zu verschiedenen Abschnitten der Seite.

import { useEffect } from 'react';

export default function useSmoothScroll() {
    useEffect(() => {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth',
                    });
                }
            });
        });

        return () => {
            links.forEach((link) =>
                link.removeEventListener('click', () => {})
            );
        };
    }, []);
}
Verwendung in der App:
Integriere die Funktion in deine App.jsx oder Layout.jsx, um Smooth-Scrolling auf alle internen Links anzuwenden:

import useSmoothScroll from './smoothScroll';

export default function App() {
    useSmoothScroll();

    return (
        <div>
            <Header />
            <HeroSection />
            <Services />
            <CaseStudies />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    );
}


