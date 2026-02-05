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

// FAQs-Daten für die Tools-Seite
const faqsData = [
  {
    question: 'Welche KI-Agenten sind für mein Unternehmen geeignet?',
    answer: 'Die Auswahl der passenden KI-Agenten hängt von Ihren spezifischen Anforderungen, Branche und Geschäftsprozessen ab. Wir bieten verschiedene KI-Agenten-Typen: Personal Assistant für allgemeine Aufgaben, E-Mail-Management und Terminplanung, Juristische KI-Agenten für Kanzleien – Vertragsanalyse, Recherche, Dokumentenerstellung, Unternehmensberater-KI für strategische Analysen, Marktforschung und Business Intelligence, Customer Service Agenten für Kundenbetreuung und Support, Sales-Agenten für Lead-Qualifizierung und Vertriebsunterstützung, HR-Agenten für Recruiting und Personalwesen. In einer unverbindlichen Beratung analysieren wir Ihre Prozesse, identifizieren Automatisierungspotenziale und empfehlen die passenden KI-Agenten. Wir berücksichtigen dabei Ihre bestehende IT-Landschaft, Compliance-Anforderungen und Ihr Budget.',
    page: 'tools',
    order: 1,
  },
  {
    question: 'Sind Open-Source-Tools wirklich sicher?',
    answer: 'Ja, Open-Source-Tools können sehr sicher sein, da der Code öffentlich einsehbar ist und von einer großen Community kontinuierlich überprüft wird. Vorteile von Open-Source: Transparenz – der Code kann von Sicherheitsexperten geprüft werden, Community-Review – viele Augen sehen potenzielle Schwachstellen, Schnelle Patches – Sicherheitslücken werden oft schneller geschlossen, Keine Vendor-Lock-in – Unabhängigkeit von einzelnen Anbietern, Anpassbarkeit – Code kann an spezifische Anforderungen angepasst werden. Wir implementieren zusätzliche Sicherheitsmaßnahmen: Verschlüsselung von Daten in Transit und at Rest, Strikte Zugriffskontrollen und Authentifizierung, Regelmäßige Security-Audits und Penetrationstests, Automatisierte Updates und Patch-Management, Compliance mit DSGVO und branchenspezifischen Standards, Monitoring und Logging für Sicherheitsereignisse. Wir wählen nur etablierte, gut gepflegte Open-Source-Projekte aus und kombinieren sie mit bewährten Sicherheitspraktiken, um höchste Sicherheitsstandards zu gewährleisten.',
    page: 'tools',
    order: 2,
  },
  {
    question: 'Wie funktioniert die Integration in mein bestehendes System?',
    answer: 'Unsere Tools und KI-Agenten lassen sich nahtlos in Ihre bestehende IT-Landschaft integrieren. Unser Integrationsansatz: Wir analysieren Ihre aktuelle IT-Infrastruktur und identifizieren alle relevanten Systeme (ERP, CRM, Datenbanken, Cloud-Services). Wir nutzen vordefinierte Konnektoren für gängige Systeme wie SAP, Microsoft Dynamics, Salesforce, HubSpot, Slack, Microsoft Teams, Google Workspace und viele mehr. Für spezielle Systeme entwickeln wir Custom-Integrationen über REST APIs, GraphQL, Webhooks oder Middleware-Lösungen. Die Integration erfolgt schrittweise mit minimaler Unterbrechung Ihrer Geschäftsprozesse. Wir implementieren Error-Handling, Retry-Mechanismen und Monitoring für Zuverlässigkeit. Wir dokumentieren alle Integrationen und stellen sicher, dass sie wartbar und skalierbar sind. Wir testen gründlich in isolierten Umgebungen vor der Produktion. Unsere Lösungen sind so konzipiert, dass sie sich nahtlos in Ihre bestehende Architektur einfügen und diese erweitern, ohne Ihre aktuellen Prozesse zu stören.',
    page: 'tools',
    order: 3,
  },
  {
    question: 'Gibt es eine Testphase für die Tools?',
    answer: 'Ja, wir bieten eine umfassende Testphase an, in der Sie die Tools und KI-Agenten in Ihrer Umgebung ausprobieren können. Unser Testkonzept: Proof of Concept (PoC) – Wir implementieren die Lösung in einer isolierten Testumgebung, damit Sie die Funktionalität ohne Risiko für Ihre Produktionssysteme evaluieren können. Pilotprojekt – Wir starten mit einem kleinen, repräsentativen Use Case, um den Nutzen zu demonstrieren und Feedback zu sammeln. Testdauer – Typischerweise 2-4 Wochen, kann aber je nach Komplexität angepasst werden. Während der Testphase erhalten Sie: Vollständigen Zugang zu den Tools und KI-Agenten, Schulungen für Ihre Mitarbeiter, Technischen Support und Beratung, Regelmäßige Reviews und Anpassungen basierend auf Ihrem Feedback. Nach der Testphase können Sie entscheiden, ob Sie die Lösung vollständig implementieren möchten. Wir passen die Lösung basierend auf Ihren Erfahrungen an und optimieren sie für Ihre spezifischen Anforderungen. So können Sie die Funktionalität und den Nutzen vor der finalen Implementierung gründlich evaluieren.',
    page: 'tools',
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

    // Zeige alle FAQs für Tools an
    const allFAQs = await FAQ.find({ page: 'tools' }).sort({ order: 1 });
    console.log('\n📋 Alle FAQs für Tools in der Datenbank:');
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
