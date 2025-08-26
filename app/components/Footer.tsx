"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'KI Transformation', href: '/ki-transformation' },
  { name: 'IT Infrastruktur', href: '/it-infrastruktur' },
  { name: 'Cyber-Security', href: '/cybersecurity' },
  { name: 'Workflow Automation', href: '/workflow-automation' },
  { name: 'Web Hosting', href: '/web-hosting' },
  { name: 'Webentwicklung', href: '/web-development' },
  { name: 'Softwareentwicklung', href: '/software-development' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Blog', href: '/blog' }
];

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-900/90 backdrop-blur-xl border-t border-white/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent inline-block mb-4">TechVision</Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Innovation trifft auf Expertise – Wir treiben die digitale Transformation mit KI, IT-Beratung und Cybersecurity-Lösungen voran.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400">Adresse:</p>
                <p className="text-white">Hauffstr. 55, 47166 Duisburg</p>
              </div>
              <div>
                <p className="text-gray-400">E-Mail:</p>
                <a href="mailto:info@it-techvision.de" className="text-white hover:text-blue-400 transition-colors">info@it-techvision.de</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} IT-Techvision. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link href="/datenschutz" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Datenschutz</Link>
            <Link href="/impressum" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Impressum</Link>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


