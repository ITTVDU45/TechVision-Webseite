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

// FAQs-Daten für die Webhosting-Seite
const faqsData = [
  {
    question: 'Was ist der Unterschied zwischen Shared und Cloud Hosting?',
    answer: 'Der Hauptunterschied liegt in der Ressourcenverteilung und Skalierbarkeit: Shared Hosting teilt sich Server-Ressourcen (CPU, RAM, Speicherplatz) mit vielen anderen Websites auf einem physischen Server. Dies ist kostengünstig, aber die Performance kann durch andere Websites auf demselben Server beeinflusst werden. Cloud Hosting nutzt mehrere Server, die zu einer leistungsstarken, virtuellen Infrastruktur verbunden sind. Vorteile von Cloud Hosting: Bessere Skalierbarkeit – Ressourcen können dynamisch erhöht oder reduziert werden, Höhere Verfügbarkeit – automatisches Failover bei Ausfällen, Bessere Performance – Ressourcen werden nach Bedarf zugewiesen, Isolierung – Ihre Website ist besser von anderen isoliert, Flexibilität – Sie zahlen nur für die Ressourcen, die Sie tatsächlich nutzen. Shared Hosting eignet sich für kleine Websites mit geringem Traffic, während Cloud Hosting ideal für wachsende Unternehmen, E-Commerce-Shops und Websites mit variablem Traffic ist.',
    page: 'webhosting',
    order: 1,
  },
  {
    question: 'Wie funktioniert die WordPress-Installation?',
    answer: 'Die WordPress-Installation bei uns ist denkbar einfach und erfolgt in wenigen Minuten: Mit unserem One-Click-Installer können Sie WordPress direkt über das Control Panel installieren. Sie wählen einfach WordPress aus dem Installer-Menü, geben die gewünschten Details ein (Website-Name, Admin-Benutzername, Passwort, E-Mail-Adresse), und die Installation erfolgt vollautomatisch. Keine technischen Kenntnisse erforderlich! Nach der Installation erhalten Sie: Zugangsdaten für das WordPress-Admin-Panel, Automatische Konfiguration der Datenbank, Vorkonfigurierte Sicherheitseinstellungen, Optimierte Performance-Einstellungen, SSL-Zertifikat (falls gewünscht). Sie können sofort mit der Gestaltung Ihrer Website beginnen. Wir unterstützen auch Multi-Site-Installationen, WooCommerce-Setup und die Installation von beliebten Plugins. Falls Sie Hilfe benötigen, steht unser Support-Team gerne zur Verfügung.',
    page: 'webhosting',
    order: 2,
  },
  {
    question: 'Bieten Sie eine Uptime-Garantie?',
    answer: 'Ja, wir garantieren eine Uptime von 99,9% für alle unsere Hosting-Pakete. Unsere Cloud-Infrastruktur mit redundanten Systemen und automatischem Failover sorgt für maximale Verfügbarkeit Ihrer Website. Was unsere Uptime-Garantie umfasst: Redundante Server-Infrastruktur – mehrere Server an verschiedenen Standorten, Automatisches Failover – bei Ausfall eines Servers übernimmt automatisch ein anderer, 24/7 Monitoring – kontinuierliche Überwachung aller Systeme, Proaktive Wartung – geplante Wartungen werden außerhalb der Hauptgeschäftszeiten durchgeführt, Schnelle Reaktionszeiten bei Problemen, Transparentes Reporting – Sie erhalten monatliche Uptime-Reports. Sollte die garantierte Uptime nicht erreicht werden, erhalten Sie eine Gutschrift gemäß unseren Service Level Agreements (SLA). Unsere tatsächliche Uptime liegt in der Regel deutlich über 99,9%.',
    page: 'webhosting',
    order: 3,
  },
  {
    question: 'Wie funktioniert das Backup-System?',
    answer: 'Unser umfassendes Backup-System schützt Ihre Daten zuverlässig: Automatische tägliche Backups – wir führen täglich vollständige Backups Ihrer Website, Datenbanken und Dateien durch. Diese werden sicher auf separaten, geografisch verteilten Servern gespeichert. Backup-Aufbewahrung – wir behalten Backups für 30 Tage, sodass Sie auf ältere Versionen zugreifen können. Einfacher Zugriff – Sie können jederzeit über das Control Panel auf Ihre Backups zugreifen, einzelne Dateien oder vollständige Wiederherstellungen anfordern. Zusätzliche Sicherheit – Backups werden verschlüsselt gespeichert und sind vor unbefügten Zugriffen geschützt. On-Demand-Backups – Sie können jederzeit manuelle Backups erstellen, z.B. vor größeren Updates oder Änderungen. Schnelle Wiederherstellung – im Falle eines Problems können wir Ihre Website schnell wiederherstellen, oft innerhalb weniger Stunden. Wir empfehlen zusätzlich, regelmäßig eigene Backups zu erstellen, besonders vor größeren Änderungen. Unser Support-Team hilft Ihnen gerne bei der Wiederherstellung oder bei Fragen zum Backup-System.',
    page: 'webhosting',
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

    // Zeige alle FAQs für Webhosting an
    const allFAQs = await FAQ.find({ page: 'webhosting' }).sort({ order: 1 });
    console.log('\n📋 Alle FAQs für Webhosting in der Datenbank:');
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
