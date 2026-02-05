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

// FAQs-Daten für die IT-Infrastruktur-Seite
const faqsData = [
  {
    question: 'Wie lange dauert die Implementierung einer neuen IT-Infrastruktur?',
    answer: 'Die Dauer der Implementierung hängt von der Komplexität und dem Umfang Ihrer IT-Infrastruktur ab. Typische Zeiträume: Einfache Lösungen (z.B. Cloud-Migration kleinerer Systeme, Backup-Einrichtung) können bereits nach 2-4 Wochen umgesetzt werden. Mittlere Projekte (z.B. Netzwerk-Neuaufbau, Server-Migration, Cloud-Integration) dauern typischerweise 4-12 Wochen. Komplexe Infrastrukturen (z.B. Enterprise-Cloud-Migration, Multi-Standort-Netzwerke, vollständige IT-Transformation) benötigen 3-9 Monate oder länger. Unser agiler Ansatz ermöglicht es, bereits nach wenigen Wochen erste Ergebnisse zu sehen. Wir arbeiten in Phasen mit klaren Meilensteinen: Planung und Analyse (1-2 Wochen), Design und Konzeptentwicklung (2-4 Wochen), Implementierung (variabel je nach Umfang), Testing und Optimierung (1-2 Wochen), Go-Live und Übergabe. In einer unverbindlichen Beratung analysieren wir Ihre Anforderungen und erstellen einen detaillierten Zeitplan für Ihr spezifisches Projekt.',
    page: 'it-infrastructure',
    order: 1,
  },
  {
    question: 'Welche Wartungsleistungen sind im Service enthalten?',
    answer: 'Unser umfassender Wartungsservice ist individuell anpassbar und umfasst typischerweise: Regelmäßige Updates und Sicherheitspatches für alle Systeme, Performance-Monitoring und proaktive Optimierung, Backup-Überwachung und Verifizierung der Backup-Integrität, 24/7 Support und Incident-Response, System-Health-Checks und präventive Wartung, Kapazitätsplanung und Ressourcen-Optimierung, Dokumentation und Change-Management, Regelmäßige Security-Audits und Compliance-Checks, Disaster-Recovery-Tests und Notfallplanung, Schulungen für Ihre IT-Mitarbeiter. Wir passen die Wartungsleistungen individuell an Ihre Anforderungen, Ihr Budget und Ihre Compliance-Bedürfnisse an. Unsere Service-Pakete reichen von Basis-Wartung bis hin zu vollständigem Managed-Service mit dediziertem IT-Team. Wir erstellen ein maßgeschneidertes Service-Paket für Ihr Unternehmen, das genau auf Ihre Bedürfnisse zugeschnitten ist.',
    page: 'it-infrastructure',
    order: 2,
  },
  {
    question: 'Wie wird die Datensicherheit gewährleistet?',
    answer: 'Wir implementieren mehrschichtige Sicherheitsmaßnahmen, um Ihre Daten umfassend zu schützen: Netzwerk-Sicherheit – Firewalls, Intrusion Detection/Prevention Systems (IDS/IPS), Netzwerksegmentierung, Verschlüsselung – Daten in Transit (TLS/SSL) und at Rest (AES-256), Verschlüsselte Kommunikation zwischen Systemen, Regelmäßige Sicherheitsupdates und Patch-Management für alle Systeme, Automatisierte Backups mit Verschlüsselung und geografischer Verteilung, Zugriffskontrollen – Multi-Faktor-Authentifizierung (MFA), Role-Based Access Control (RBAC), Least-Privilege-Prinzip, Monitoring und Logging – 24/7 Security-Monitoring, SIEM (Security Information and Event Management), Anomalie-Erkennung, Regelmäßige Sicherheitsaudits und Penetrationstests, Compliance – Einhaltung von DSGVO, ISO 27001, BSI-Grundschutz und branchenspezifischen Standards, Incident-Response-Planung und schnelle Reaktion auf Sicherheitsvorfälle, Mitarbeiterschulungen zu Sicherheitsbewusstsein und Best Practices. Wir halten uns an die höchsten Datenschutzstandards und passen unsere Sicherheitsmaßnahmen kontinuierlich an die sich entwickelnde Bedrohungslage an.',
    page: 'it-infrastructure',
    order: 3,
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

    // Zeige alle FAQs für IT-Infrastruktur an
    const allFAQs = await FAQ.find({ page: 'it-infrastructure' }).sort({ order: 1 });
    console.log('\n📋 Alle FAQs für IT-Infrastruktur in der Datenbank:');
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
