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

// FAQs-Daten für die KI-Transformation-Seite
const faqsData = [
  {
    question: 'Was kostet eine KI-Transformation?',
    answer: 'Die Kosten einer KI-Transformation variieren je nach Umfang und Komplexität Ihres Projekts. Faktoren wie die Anzahl der zu automatisierenden Prozesse, die benötigte Infrastruktur, die Integration mit bestehenden Systemen und der gewünschte Funktionsumfang beeinflussen die Investition. Wir bieten maßgeschneiderte Lösungen, die zu Ihrem Budget passen. In der Regel beginnen Projekte bei 15.000€ für einfache Automatisierungen, während umfassende Transformationen 50.000€ bis 200.000€ oder mehr umfassen können. Wir erstellen Ihnen gerne ein individuelles Angebot nach einer kostenlosen Erstberatung.',
    page: 'ki-transformation',
    order: 1,
  },
  {
    question: 'Welche Prozesse lassen sich am besten automatisieren?',
    answer: 'Besonders gut eignen sich Prozesse mit hoher Repetition, klaren Regeln und strukturierten Daten: Dokumentenverarbeitung (Rechnungen, Verträge, Formulare), E-Mail-Management und Kundenanfragen, Datenmigration und -synchronisation, Berichtswesen und Reporting, Lead-Qualifizierung und -Scoring, Bestellabwicklung und Inventarverwaltung, Rechnungsstellung und Zahlungsabwicklung, HR-Prozesse (Bewerbungen, Onboarding), Qualitätskontrolle und Prüfprozesse. Wir analysieren gemeinsam mit Ihnen Ihre Prozesse und identifizieren die größten Automatisierungspotenziale mit dem besten ROI.',
    page: 'ki-transformation',
    order: 2,
  },
  {
    question: 'Wie lange dauert die Implementierung?',
    answer: 'Die Implementierungsdauer hängt von der Komplexität und dem Umfang Ihres Projekts ab: Einfache Automatisierungen (z.B. E-Mail-Klassifizierung, einfache Workflows) können in 2-3 Monaten umgesetzt werden. Mittlere Projekte (z.B. Dokumentenverarbeitung, Chatbot-Integration) dauern typischerweise 3-6 Monate. Umfassende Transformationen (z.B. Enterprise-KI-Plattform, mehrere Prozesse) benötigen 6-12 Monate oder länger. Unser agiler Ansatz ermöglicht es, bereits nach wenigen Wochen erste Ergebnisse zu sehen. Wir arbeiten in Sprints und liefern kontinuierlich funktionsfähige Lösungen, sodass Sie frühzeitig von der Transformation profitieren.',
    page: 'ki-transformation',
    order: 3,
  },
  {
    question: 'Wie funktioniert die Integration mit bestehenden Systemen?',
    answer: 'Die Integration mit Ihren bestehenden Systemen ist ein zentraler Bestandteil unserer KI-Transformation. Wir nutzen moderne APIs, Webhooks und Middleware-Lösungen, um nahtlose Verbindungen zu schaffen: Wir analysieren Ihre aktuelle IT-Landschaft und identifizieren alle relevanten Systeme (ERP, CRM, Datenbanken, Cloud-Services). Wir entwickeln eine Integrationsstrategie, die Ihre bestehende Infrastruktur respektiert und erweitert. Wir nutzen Standard-APIs (REST, GraphQL) und ETL-Tools für Datenübertragung. Wir implementieren Middleware-Lösungen für komplexe Integrationen. Wir stellen sicher, dass die Integration sicher, skalierbar und wartbar ist. Unsere Lösungen sind so konzipiert, dass sie sich nahtlos in Ihre bestehende Architektur einfügen, ohne Ihre aktuellen Prozesse zu stören.',
    page: 'ki-transformation',
    order: 4,
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

    // Zeige alle FAQs für KI-Transformation an
    const allFAQs = await FAQ.find({ page: 'ki-transformation' }).sort({ order: 1 });
    console.log('\n📋 Alle FAQs für KI-Transformation in der Datenbank:');
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
