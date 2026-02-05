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

// FAQs-Daten für die Workflow-Automatisierungs-Seite
const faqsData = [
  {
    question: 'Wie starten wir mit der Workflow Automatisierung?',
    answer: 'Der Start mit der Workflow-Automatisierung beginnt mit einer kostenlosen Erstberatung, in der wir Ihre aktuellen Prozesse analysieren und Automatisierungspotenziale identifizieren. Anschließend entwickeln wir gemeinsam eine Strategie: Wir dokumentieren Ihre bestehenden Workflows und identifizieren manuelle, repetitive Aufgaben. Wir priorisieren die Prozesse nach ROI und Umsetzbarkeit. Wir erstellen einen detaillierten Implementierungsplan mit Meilensteinen. Wir starten mit einem Pilotprojekt, um schnell erste Erfolge zu zeigen. Nach erfolgreichem Pilotprojekt skalieren wir die Lösung auf weitere Prozesse. Unser agiler Ansatz ermöglicht es, bereits nach wenigen Wochen erste Ergebnisse zu sehen und kontinuierlich zu optimieren.',
    page: 'workflow-automation',
    order: 1,
  },
  {
    question: 'Welche Vorteile bietet die Integration von KI-Agenten?',
    answer: 'KI-Agenten bieten zahlreiche Vorteile für Ihre Workflow-Automatisierung: Sie können komplexe Entscheidungen treffen und lernen aus Erfahrungen, anstatt nur starre Regeln zu befolgen. Sie verarbeiten natürliche Sprache und können mit Benutzern kommunizieren, was die Benutzerfreundlichkeit erhöht. Sie können große Datenmengen analysieren und Muster erkennen, die Menschen übersehen könnten. Sie arbeiten 24/7 ohne Ermüdung und steigern so die Produktivität erheblich. Sie reduzieren Fehlerquoten durch konsistente Ausführung von Aufgaben. Sie ermöglichen Personalisierung auf individueller Ebene. Sie können sich selbst optimieren und verbessern. Sie integrieren sich nahtlos in bestehende Systeme und erweitern deren Funktionalität. Insgesamt steigern KI-Agenten die Effizienz, reduzieren Kosten und ermöglichen es Ihrem Team, sich auf strategische Aufgaben zu konzentrieren.',
    page: 'workflow-automation',
    order: 2,
  },
  {
    question: 'Welche Tools setzen Sie ein und wie erfolgt die Anbindung?',
    answer: 'Wir setzen eine breite Palette moderner Tools ein, die je nach Anforderung ausgewählt werden: Für Workflow-Automatisierung nutzen wir Tools wie Zapier, Make (Integromat), Microsoft Power Automate, n8n und custom Lösungen. Für KI-Agenten verwenden wir OpenAI GPT, Anthropic Claude, LangChain, AutoGPT und spezialisierte Agent-Frameworks. Für Integrationen nutzen wir REST APIs, GraphQL, Webhooks, ETL-Tools (z.B. Apache Airflow) und Middleware-Lösungen. Die Anbindung erfolgt über Standard-APIs, die von den meisten modernen Systemen unterstützt werden. Wir erstellen sichere Verbindungen mit Authentifizierung und Verschlüsselung. Wir nutzen Webhooks für Echtzeit-Kommunikation zwischen Systemen. Wir implementieren Error-Handling und Retry-Mechanismen für Zuverlässigkeit. Wir dokumentieren alle Integrationen und stellen sicher, dass sie wartbar und skalierbar sind. Unsere Lösungen sind so konzipiert, dass sie sich nahtlos in Ihre bestehende IT-Landschaft einfügen.',
    page: 'workflow-automation',
    order: 3,
  },
  {
    question: 'Wie lange dauert der gesamte Prozess?',
    answer: 'Die Dauer des gesamten Automatisierungsprozesses variiert je nach Komplexität: Einfache Workflow-Automatisierungen (z.B. E-Mail-Weiterleitung, Datenübertragung) können in 2-4 Wochen umgesetzt werden. Mittlere Projekte (z.B. Dokumentenverarbeitung, CRM-Integration) dauern typischerweise 4-8 Wochen. Komplexe Automatisierungen mit KI-Agenten (z.B. intelligente Kundenbetreuung, Predictive Analytics) benötigen 8-16 Wochen. Umfassende Enterprise-Automatisierungen mit mehreren Systemen können 3-6 Monate oder länger in Anspruch nehmen. Unser agiler Ansatz ermöglicht es, bereits nach wenigen Wochen erste funktionsfähige Lösungen zu sehen. Wir arbeiten in Sprints von 2-3 Wochen und liefern kontinuierlich funktionsfähige Features. Sie erhalten regelmäßige Updates und können frühzeitig Feedback geben. Die tatsächliche Dauer hängt von Faktoren wie der Komplexität Ihrer Prozesse, der Anzahl der zu integrierenden Systeme und der Verfügbarkeit Ihrer Ressourcen ab.',
    page: 'workflow-automation',
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

    // Zeige alle FAQs für Workflow-Automatisierung an
    const allFAQs = await FAQ.find({ page: 'workflow-automation' }).sort({ order: 1 });
    console.log('\n📋 Alle FAQs für Workflow-Automatisierung in der Datenbank:');
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
