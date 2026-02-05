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

// FAQs-Daten für die Cybersecurity-Seite
const faqsData = [
  {
    question: 'Wie lange dauert eine typische Sicherheitsimplementierung?',
    answer: 'Die Dauer einer Sicherheitsimplementierung variiert je nach Umfang und Komplexität Ihres Projekts: Einfache Security-Assessments und Gap-Analysen können in 2-4 Wochen abgeschlossen werden. Die Implementierung grundlegender Sicherheitsmaßnahmen (z.B. Firewall-Konfiguration, Backup-Strategie) dauert typischerweise 4-8 Wochen. Umfassende Sicherheitsimplementierungen mit ISO 27001 oder BSI-Grundschutz benötigen 3-6 Monate. Enterprise-Sicherheitslösungen mit mehreren Standorten und komplexen Anforderungen können 6-12 Monate oder länger in Anspruch nehmen. Wir erstellen für jedes Projekt einen detaillierten Zeitplan mit Meilensteinen und halten Sie kontinuierlich über den Fortschritt auf dem Laufenden.',
    page: 'cybersecurity',
    order: 1,
  },
  {
    question: 'Welche Branchen betreuen Sie hauptsächlich?',
    answer: 'Wir betreuen Unternehmen aus verschiedenen Branchen mit maßgeschneiderten Sicherheitslösungen: Finanzdienstleistungen (Banken, Versicherungen, FinTech) – hohe Compliance-Anforderungen, E-Commerce und Online-Handel – Schutz von Kundendaten und Zahlungsinformationen, Industrie und Produktion – OT/IT-Sicherheit und Produktionsschutz, Gesundheitswesen – DSGVO-konforme Lösungen für Patientendaten, IT-Dienstleistungen und Software-Unternehmen – Schutz geistigen Eigentums, Rechtswesen und Beratung – Vertraulichkeit und Datenschutz, Öffentliche Verwaltung – BSI-Grundschutz und behördliche Anforderungen, Mittelstand und KMU – skalierbare, kosteneffiziente Lösungen. Unsere Lösungen sind branchenübergreifend anwendbar und werden individuell an Ihre spezifischen Anforderungen angepasst.',
    page: 'cybersecurity',
    order: 2,
  },
  {
    question: 'Bieten Sie auch Schulungen für Mitarbeiter an?',
    answer: 'Ja, Mitarbeiterschulungen sind ein wichtiger Bestandteil unserer umfassenden Sicherheitslösungen. Wir bieten maßgeschneiderte Schulungsprogramme: Phishing-Prävention und Erkennung von Social-Engineering-Angriffen, Passwort-Sicherheit und Multi-Faktor-Authentifizierung, Sicherem Umgang mit Daten und Datenschutz (DSGVO), Sicherheitsbewusstsein im Homeoffice und Remote-Work, Incident-Response und Meldewege bei Sicherheitsvorfällen, Sicherheitsrichtlinien und Best Practices, Regelmäßige Awareness-Kampagnen und Updates. Unsere Schulungen können als Präsenzveranstaltungen, Online-Sessions oder als interaktive E-Learning-Module durchgeführt werden. Wir passen die Inhalte an Ihre Branche, Ihre Prozesse und die spezifischen Risiken Ihres Unternehmens an.',
    page: 'cybersecurity',
    order: 3,
  },
  {
    question: 'Wie wird die Compliance sichergestellt?',
    answer: 'Wir unterstützen Sie umfassend bei der Einhaltung relevanter Sicherheits- und Compliance-Standards: ISO 27001 – Implementierung und Zertifizierung nach internationalem Standard, BSI-Grundschutz – Umsetzung der IT-Grundschutz-Kataloge für deutsche Unternehmen, DSGVO – Datenschutz-Compliance und Datenschutz-Folgenabschätzungen, NIST Cybersecurity Framework – Strukturierte Sicherheitsstrategie, Branchenspezifische Standards (z.B. PCI-DSS für Zahlungsverkehr, HIPAA für Gesundheitswesen). Unser Vorgehen umfasst: Compliance-Assessments und Gap-Analysen zur Identifikation von Lücken, Entwicklung von Maßnahmenplänen und Roadmaps, Unterstützung bei der Implementierung von Sicherheitsmaßnahmen, Dokumentation und Erstellung von Richtlinien, Vorbereitung auf Audits und Zertifizierungen, Kontinuierliche Überwachung und Anpassung. Wir stellen sicher, dass Ihre Compliance-Anforderungen nicht nur erfüllt, sondern auch nachhaltig aufrechterhalten werden.',
    page: 'cybersecurity',
    order: 4,
  },
  {
    question: 'Gibt es eine 24/7 Support-Hotline?',
    answer: 'Ja, wir bieten umfassenden Support für Ihre Sicherheitsanforderungen: 24/7 Support-Hotline für kritische Sicherheitsvorfälle und Incident-Response, Schnelle Reaktionszeiten bei Sicherheitsvorfällen (SLA-basiert), Während der Geschäftszeiten stehen wir Ihnen für alle Fragen, Beratung und technischen Support zur Verfügung, Remote-Support und On-Site-Besuche bei Bedarf, Proaktives Monitoring und Threat-Intelligence, Regelmäßige Security-Updates und Best-Practice-Empfehlungen. Unsere Support-Pakete sind flexibel gestaltbar – von Basis-Support bis hin zu Premium-Paketen mit dediziertem Security-Team. Bei kritischen Sicherheitsvorfällen haben Sie direkten Zugang zu unseren Security-Experten, die sofortige Maßnahmen einleiten können.',
    page: 'cybersecurity',
    order: 5,
  },
  {
    question: 'Wie werden Updates und Patches verwaltet?',
    answer: 'Wir unterstützen Sie bei der Implementierung eines strukturierten und effizienten Patch-Management-Prozesses: Regelmäßige Inventarisierung aller Systeme und Software-Komponenten, Priorisierung von Patches nach Risiko und Kritikalität (Critical, High, Medium, Low), Testen von Patches in isolierten Umgebungen vor der Produktion, Automatisierte Patch-Verteilung für Standard-Software, Manuelle Installation für kritische Systeme mit kontrolliertem Rollout, Dokumentation aller durchgeführten Updates und Patches, Monitoring und Verifizierung nach der Installation, Rollback-Strategien für den Fall von Problemen, Compliance-Reporting für Audit-Zwecke. Unser Patch-Management-Prozess stellt sicher, dass Ihre Systeme stets auf dem neuesten Sicherheitsstand sind, während gleichzeitig die Verfügbarkeit und Stabilität Ihrer IT-Infrastruktur gewährleistet wird. Wir können Patch-Management als Managed Service übernehmen oder Sie bei der Einrichtung eines eigenen Prozesses unterstützen.',
    page: 'cybersecurity',
    order: 6,
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

    // Zeige alle FAQs für Cybersecurity an
    const allFAQs = await FAQ.find({ page: 'cybersecurity' }).sort({ order: 1 });
    console.log('\n📋 Alle FAQs für Cybersecurity in der Datenbank:');
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
