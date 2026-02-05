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

// FAQs-Daten für die Homepage
const faqsData = [
  {
    question: 'Wie kann KI mein Unternehmen transformieren?',
    answer: 'KI kann Ihr Unternehmen auf vielfältige Weise transformieren: Durch Automatisierung repetitiver Aufgaben steigern Sie die Effizienz, reduzieren Fehler und sparen Kosten. KI-gestützte Datenanalyse hilft Ihnen, bessere Geschäftsentscheidungen zu treffen und Trends frühzeitig zu erkennen. Zudem können Sie mit KI personalisierte Kundenerlebnisse schaffen und Ihre Produktivität erheblich steigern. Wir analysieren gemeinsam mit Ihnen Ihre spezifischen Prozesse und identifizieren die größten Transformationspotenziale.',
    page: 'home',
    order: 1,
  },
  {
    question: 'Welche Bereiche profitieren am meisten von KI-Lösungen?',
    answer: 'Besonders profitieren Bereiche mit hohem Datenvolumen und repetitiven Aufgaben: Kundenservice (Chatbots, automatische Antworten), Vertrieb (Lead-Generierung, Prognosen), Marketing (Personalisierung, Content-Optimierung), Produktion (Qualitätskontrolle, Predictive Maintenance), Finanzen (Betrugserkennung, Automatisierung), HR (Recruiting, Onboarding) und IT (Cybersecurity, Monitoring). Wir helfen Ihnen, die für Ihr Unternehmen relevantesten Bereiche zu identifizieren.',
    page: 'home',
    order: 2,
  },
  {
    question: 'Wie läuft ein Softwareprojekt mit euch ab?',
    answer: 'Unser Softwareentwicklungsprozess ist strukturiert und transparent: In der ersten Phase analysieren wir Ihre Anforderungen und erstellen ein detailliertes Konzept. Anschließend entwickeln wir einen Prototyp für Ihr Feedback. Nach der Freigabe erfolgt die agile Entwicklung in Sprints mit regelmäßigen Updates. Wir integrieren kontinuierliches Testing und Quality Assurance. Nach dem Launch bieten wir Wartung, Support und kontinuierliche Weiterentwicklung. Sie erhalten jederzeit Einblick in den Fortschritt und können Anpassungen vornehmen.',
    page: 'home',
    order: 3,
  },
  {
    question: 'Wie gestaltet sich der Prozess für Webseitenprojekte?',
    answer: 'Unser Webseitenentwicklungsprozess umfasst mehrere Phasen: Zunächst führen wir ein ausführliches Briefing durch, um Ihre Ziele, Zielgruppe und Anforderungen zu verstehen. Dann erstellen wir ein Konzept mit Wireframes und Designvorschlägen. Nach Ihrer Freigabe entwickeln wir die Webseite responsiv und SEO-optimiert. Wir integrieren alle gewünschten Funktionen und testen gründlich. Nach dem Launch bieten wir Hosting, Wartung und kontinuierliche Optimierung. Sie erhalten ein Content-Management-System, um Inhalte selbst zu pflegen.',
    page: 'home',
    order: 4,
  },
  {
    question: 'Wie läuft eine IT- oder KI-Beratung ab?',
    answer: 'Unsere Beratungsprozesse sind maßgeschneidert: Wir beginnen mit einem kostenlosen Erstgespräch, um Ihre Herausforderungen zu verstehen. Anschließend führen wir eine detaillierte Analyse Ihrer aktuellen IT-Landschaft oder Geschäftsprozesse durch. Basierend darauf entwickeln wir eine individuelle Strategie mit konkreten Handlungsempfehlungen und einem Roadmap. Wir präsentieren Ihnen die Ergebnisse und unterstützen Sie bei der Umsetzung. Während der gesamten Implementierung stehen wir Ihnen als Partner zur Seite und passen die Strategie bei Bedarf an.',
    page: 'home',
    order: 5,
  },
  {
    question: 'Was umfasst die Cybersecurity-Beratung?',
    answer: 'Unsere Cybersecurity-Beratung ist umfassend: Wir analysieren Ihre aktuelle IT-Sicherheitslage und identifizieren Schwachstellen. Wir unterstützen Sie bei der Implementierung von Standards wie ISO 27001, BSI-Grundschutz oder NIST. Wir entwickeln Sicherheitskonzepte, führen Penetrationstests durch und schulen Ihre Mitarbeiter. Zudem bieten wir kontinuierliches Monitoring, Incident-Response-Planung und Compliance-Unterstützung. Unser Ziel ist es, Ihre IT-Infrastruktur nachhaltig zu schützen und Ihre Compliance-Anforderungen zu erfüllen.',
    page: 'home',
    order: 6,
  },
  {
    question: 'Wie lange dauert ein durchschnittliches Projekt?',
    answer: 'Die Projektlaufzeit variiert je nach Umfang und Komplexität: Einfache Webseitenprojekte dauern typischerweise 4-8 Wochen. Softwareentwicklungsprojekte können 3-6 Monate oder länger in Anspruch nehmen, abhängig von den Anforderungen. Beratungsprojekte umfassen meist 2-4 Wochen Analysephase plus Implementierungsunterstützung. KI-Transformationsprojekte dauern in der Regel 3-9 Monate, da sie mehrere Phasen umfassen. Wir erstellen für jedes Projekt einen detaillierten Zeitplan und halten Sie über den Fortschritt auf dem Laufenden.',
    page: 'home',
    order: 7,
  },
  {
    question: 'Bietet ihr auch Wartung und Support nach Projektabschluss?',
    answer: 'Ja, absolut! Wir bieten umfassende Wartungs- und Support-Pakete nach Projektabschluss: Regelmäßige Updates und Sicherheitspatches, technischer Support bei Fragen oder Problemen, Performance-Monitoring und Optimierung, Backups und Disaster-Recovery, kontinuierliche Weiterentwicklung basierend auf Ihren Anforderungen. Unsere Support-Pakete sind flexibel gestaltbar – von Basis-Support bis hin zu 24/7-Betreuung. Wir sind langfristig Ihr zuverlässiger IT-Partner und stellen sicher, dass Ihre Lösungen stets auf dem neuesten Stand sind.',
    page: 'home',
    order: 8,
  },
  {
    question: 'Was kostet eine erste Beratung?',
    answer: 'Wir bieten ein kostenloses Erstgespräch an, um Ihre Anforderungen zu verstehen und erste Einschätzungen zu geben. Für eine detaillierte Beratung mit Analyse und Strategieentwicklung erstellen wir Ihnen ein individuelles Angebot basierend auf dem Umfang Ihrer Anforderungen. Die Kosten variieren je nach Komplexität und Dauer des Projekts. Transparenz ist uns wichtig – wir kommunizieren alle Kosten im Voraus und es gibt keine versteckten Gebühren. Kontaktieren Sie uns für ein unverbindliches Gespräch!',
    page: 'home',
    order: 9,
  },
  {
    question: 'Wie kann ich mit euch zusammenarbeiten?',
    answer: 'Der Einstieg ist einfach: Kontaktieren Sie uns über unser Kontaktformular, per E-Mail oder telefonisch. Wir vereinbaren ein kostenloses Erstgespräch, in dem wir Ihre Anforderungen besprechen. Anschließend erstellen wir Ihnen ein individuelles Angebot. Nach Ihrer Freigabe starten wir mit dem Projekt. Wir arbeiten agil und transparent – Sie haben jederzeit Einblick in den Fortschritt. Wir sind flexibel und passen uns Ihren Bedürfnissen an, ob als Projektpartner oder langfristiger IT-Dienstleister. Lassen Sie uns gemeinsam Ihre digitale Transformation vorantreiben!',
    page: 'home',
    order: 10,
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

    // Zeige alle FAQs an
    const allFAQs = await FAQ.find({ page: 'home' }).sort({ order: 1 });
    console.log('\n📋 Alle FAQs in der Datenbank:');
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
