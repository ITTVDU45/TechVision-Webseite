// Lade .env.local manuell
import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env.local');
try {
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value;
        }
      }
    }
  });
} catch (error) {
  console.error('❌ Fehler beim Laden von .env.local:', error);
  process.exit(1);
}

import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';
import FAQ from '../lib/models/FAQ';

// FAQs-Daten für die Webentwicklungs-Seite
const faqsData = [
  {
    question: 'Wie lange dauert die Entwicklung einer Website?',
    answer: 'Die Entwicklungsdauer hängt von der Komplexität und dem Umfang Ihrer Website ab. Typische Zeiträume: Einfache Unternehmenswebsites (5-10 Seiten, Kontaktformular) können bereits nach 4-6 Wochen fertiggestellt sein. Mittlere Projekte (E-Commerce-Shops, Content-Management-Systeme, 20-50 Seiten) dauern typischerweise 8-16 Wochen. Komplexe Webanwendungen (Custom-Software, Multi-User-Plattformen, Integrationen) benötigen 3-6 Monate oder länger. Faktoren, die die Dauer beeinflussen: Anzahl der Seiten und Funktionen, Design-Komplexität, Integrationen mit externen Systemen, Content-Erstellung und -Migration, Feedback-Zyklen und Änderungswünsche, Testing und Qualitätssicherung. Unser agiler Ansatz ermöglicht es, bereits nach wenigen Wochen erste Ergebnisse zu sehen. Wir arbeiten in Sprints und liefern kontinuierlich funktionsfähige Features. In einer unverbindlichen Beratung analysieren wir Ihre Anforderungen und erstellen einen detaillierten Zeitplan für Ihr spezifisches Projekt.',
    page: 'web-development',
    order: 1,
  },
  {
    question: 'Welche Technologien verwenden Sie?',
    answer: 'Wir setzen auf moderne, bewährte Technologien, die Performance, Skalierbarkeit und Wartbarkeit gewährleisten: Frontend – React, Next.js (für SEO-optimierte, schnelle Websites), TypeScript (für typsicheren Code), Tailwind CSS (für moderne, responsive Designs), Framer Motion (für Animationen). Backend – Node.js, Python (FastAPI, Django), PHP (für WordPress-Integrationen). Datenbanken – PostgreSQL (für relationale Daten), MongoDB (für flexible, dokumentenbasierte Daten), Redis (für Caching). Cloud & Hosting – AWS, Vercel, DigitalOcean, Docker und Kubernetes. Content-Management – WordPress, Strapi, Sanity (Headless CMS). E-Commerce – Shopify, WooCommerce, Custom-Lösungen. Wir wählen die Technologie basierend auf Ihren spezifischen Anforderungen, Performance-Bedürfnissen, Skalierbarkeit und langfristiger Wartbarkeit aus. Unser Fokus liegt auf modernen, zukunftssicheren Technologien, die eine solide Basis für Ihr digitales Wachstum bieten.',
    page: 'web-development',
    order: 2,
  },
  {
    question: 'Wie ist der Ablauf eines Webprojekts?',
    answer: 'Unser strukturierter Prozess umfasst mehrere Phasen für ein erfolgreiches Webprojekt: Phase 1 – Bedarfsanalyse (1-2 Wochen): Wir analysieren Ihre Anforderungen, Zielgruppe, Ziele und Wettbewerber. Wir erstellen ein detailliertes Briefing und definieren den Projektumfang. Phase 2 – Konzeption & Design (2-4 Wochen): Entwicklung der Strategie und Informationsarchitektur, Erstellung von Wireframes und Design-Mockups, Feedback-Schleifen und Design-Finalisierung. Phase 3 – Entwicklung (variabel je nach Umfang): Frontend- und Backend-Entwicklung, Integration von Funktionen und Systemen, Responsive Umsetzung für alle Geräte, Content-Integration. Phase 4 – Testing & Qualitätssicherung (1-2 Wochen): Funktionstests, Browser- und Geräte-Tests, Performance-Optimierung, SEO-Checks, Sicherheitstests. Phase 5 – Launch & Support (laufend): Go-Live und Übergabe, Schulungen für Content-Management, Kontinuierliche Optimierung basierend auf Analytics, Wartung und Support. Wir arbeiten agil mit regelmäßigen Updates und Feedback-Schleifen, sodass Sie jederzeit den Fortschritt sehen und Anpassungen vornehmen können.',
    page: 'web-development',
    order: 3,
  },
  {
    question: 'Ist die Website auch für mobile Geräte optimiert?',
    answer: 'Ja, alle unsere Websites werden nach dem Mobile-First-Prinzip entwickelt und sind vollständig responsive. Unser Ansatz: Mobile-First-Design – wir beginnen mit der mobilen Version und erweitern dann für größere Bildschirme, Responsive Breakpoints – optimiert für Smartphones, Tablets, Laptops und Desktop-Monitore, Touch-optimierte Bedienelemente – große Buttons, intuitive Navigation, schnelle Ladezeiten – optimierte Bilder, Lazy Loading, Code-Minimierung, Cross-Browser-Kompatibilität – getestet auf Chrome, Firefox, Safari, Edge, Performance-Optimierung – Core Web Vitals im grünen Bereich, Progressive Web App (PWA) – optional für App-ähnliche Erfahrung. Wir testen auf verschiedenen Geräten und Bildschirmgrößen (iPhone, Android, iPad, verschiedene Desktop-Auflösungen), um eine optimale Benutzererfahrung auf allen Endgeräten zu gewährleisten. Da über 60% des Web-Traffics von mobilen Geräten kommt, ist mobile Optimierung für uns selbstverständlich.',
    page: 'web-development',
    order: 4,
  },
  {
    question: 'Welche Wartung und Support erhalte ich nach dem Launch?',
    answer: 'Wir bieten verschiedene Support-Pakete an, die individuell an Ihre Bedürfnisse angepasst werden können: Basis-Support – Regelmäßige Updates und Sicherheitspatches, Backup-Überwachung, E-Mail-Support während Geschäftszeiten. Standard-Support – Alles aus Basis-Support, plus: Performance-Monitoring, Content-Updates (begrenzt), Technischer Support per E-Mail und Telefon, Monatliche Reports. Premium-Support – Alles aus Standard-Support, plus: 24/7 Support-Hotline, Prioritäts-Support, Proaktive Optimierung, Regelmäßige Security-Audits, Dedicates Account Manager, On-Demand-Entwicklung neuer Features. Zusätzliche Services – SEO-Optimierung und Content-Marketing, Conversion-Rate-Optimierung, Analytics-Setup und Reporting, Schulungen für Ihr Team, Hosting und Domain-Management. Die Wartungsleistungen können individuell an Ihre Bedürfnisse, Ihr Budget und Ihre Anforderungen angepasst werden. Wir erstellen ein maßgeschneidertes Support-Paket, das genau zu Ihrem Unternehmen passt. Unser Ziel ist es, Ihre Website langfristig erfolgreich zu machen.',
    page: 'web-development',
    order: 5,
  },
];

async function importFAQs() {
  try {
    console.log('🔄 Verbinde mit MongoDB...');
    await connectDB();
    console.log('✅ Verbindung erfolgreich');

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const faqData of faqsData) {
      try {
        // Prüfe, ob FAQ bereits existiert (basierend auf question und page)
        const existing = await FAQ.findOne({
          question: faqData.question,
          page: faqData.page,
        });

        if (existing) {
          // Update bestehende FAQ
          await FAQ.findByIdAndUpdate(existing._id, faqData);
          updated++;
          console.log(`✏️  Aktualisiert: ${faqData.question.substring(0, 50)}...`);
        } else {
          // Erstelle neue FAQ
          await FAQ.create(faqData);
          created++;
          console.log(`✨ Erstellt: ${faqData.question.substring(0, 50)}...`);
        }
      } catch (error) {
        console.error(`❌ Fehler bei "${faqData.question}":`, error);
        skipped++;
      }
    }

    console.log('\n📊 Zusammenfassung:');
    console.log(`   ✨ Erstellt: ${created}`);
    console.log(`   ✏️  Aktualisiert: ${updated}`);
    console.log(`   ⏭️  Übersprungen: ${skipped}`);
    console.log(`   📦 Gesamt: ${faqsData.length}`);

    // Zeige alle FAQs für Webentwicklung an
    const allFAQs = await FAQ.find({ page: 'web-development' }).sort({ order: 1 });
    console.log('\n📋 Alle FAQs für Webentwicklung in der Datenbank:');
    allFAQs.forEach((f, i) => {
      console.log(`   ${i + 1}. ${f.question.substring(0, 60)}...`);
    });

    console.log('\n✅ Import abgeschlossen!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Fehler beim Import:', error);
    process.exit(1);
  }
}

// Script ausführen
importFAQs();
