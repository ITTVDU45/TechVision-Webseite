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

// Mapping von Fragen zu Kategorien basierend auf dem Inhalt
const categoryMapping: Array<{ pattern: RegExp; category: string }> = [
  { pattern: /KI-Transformation|KI Transformation|ki-transformation|KI-Transformationsprojekt|KI-Integration|KI-Modell|KI-Lösung|KI-Transformationen/i, category: 'ki-transformation' },
  { pattern: /KI-Beratung|KI Beratung|ki-beratung|KI-Transformationsprojekt|KI-Integration|KI-Modell|KI-Lösung produktiv|Planung und Konzeptionsphase|Meilensteine.*KI|Schulung.*KI|Herausforderungen.*KI|Qualitätssicherung.*KI|langfristig optimiert/i, category: 'ki-beratung' },
  { pattern: /Softwareentwicklung|Software Entwicklung|softwareentwicklung|Softwareprojekt|Softwareentwicklungsprojekt|individuelle Software|Softwareentwicklungsprojekte|Frontend.*Backend|Technologien.*Frontend/i, category: 'softwareentwicklung' },
  { pattern: /Webseitenentwicklung|Webseite|Webseiten|webseitenentwicklung|Webseitenprojekt|professionelle Webseite|Wartungskosten.*Webseite|individuell entwickelte Webseite|SEO-Optimierungen|Entwicklung.*Webseite|Technologien.*Webseiten|mobilfreundlich|CMS-System|Übergabe.*Webseite|Support.*Wartung.*Webseite/i, category: 'webseitenentwicklung' },
  { pattern: /Onlineshop|Onlineshop-Lösung|E-Commerce|E-Commerce Plattform|Onlineshop.*entwickeln|E-Commerce Plattformen|Sicherheit.*Onlineshop|Zahlungsmethoden.*Onlineshop|Onlineshop.*Suchmaschinen|Produkte.*Onlineshop|Onlineshop.*skalieren|Onlineshop.*entwickeln|Support.*Onlineshop/i, category: 'onlineshop-entwicklung' },
  { pattern: /Workflow|Automatisierung|workflow-automation|automatisier|Prozesse.*automatisiert|Automatisierungsprojekt|Technologien.*Automatisierung|Qualität.*automatisierte|automatisierte Prozess|Vorteile.*Automatisierung|ROI.*Automatisierung|Automatisierung.*Unternehmensziel/i, category: 'workflow-automatisierung' },
  { pattern: /Digitale Transformation|digitale-transformation|digitalen Transformationsprozess|Vorteile.*digitale Transformation|digitale Transformation.*beginnen|Technologien.*digitale Transformation|Dauer.*digitale Transformation|Mitarbeiter.*digitale Transformation|Herausforderungen.*digitale Transformation|Erfolg.*digitale Transformation|Best Practices.*digitale Transformation/i, category: 'digitale-transformation' },
  { pattern: /Cyber|Sicherheit|Security|cyber-security|Datenschutz|Compliance|Sicherheitsmaßnahme|Sicherheitsmaßnahmen.*Webanwendung|Daten.*Kunden|Datenschutzverletzung|Compliance-Vorgaben|Schulungen.*Cyber|Sicherheitsüberprüfung|Technologien.*Cyber|Sicherheit.*Drittanbieter|Sicherheitsvorfall/i, category: 'cyber-security-beratung' },
  { pattern: /IT-Infrastruktur|IT Infrastruktur|it-infrastructure|Server|Cloud|Backup|Disaster|IT-Infrastruktur-Lösung|Sicherheit.*IT-Infrastruktur|Migration.*Cloud|Performance.*IT-Infrastruktur|Backup.*Disaster|Virtualisierung|IT-Support|IT-Lösung.*Branche/i, category: 'it-infrastruktur' },
  { pattern: /Hosting|hosting|gehostet|Hosting-Lösung|Hosting-Paket|Hosting-Lösungen|Hosting-Lösung.*auswählen|Managed Hosting|Sicherheit.*gehostet/i, category: 'hosting' },
  { pattern: /Tools|KI-Agenten|KI-Agent|tools-ki-agenten|Tool|Agent|Tools.*Entwicklung|Tools.*Projektmanagement|Schulungen.*Tools|Tools.*bestehende Systeme|Unterstützung.*Tools|Technologien.*Tools/i, category: 'tools-ki-agenten' },
];

async function updateFAQs() {
  try {
    console.log('🔄 Verbinde mit MongoDB...');
    await connectDB();
    console.log('✅ Verbindung erfolgreich');

    const allFAQs = await FAQ.find({ page: 'faq' });
    console.log(`📋 Gefunden: ${allFAQs.length} FAQs`);

    let updated = 0;
    let skipped = 0;

    for (const faq of allFAQs) {
      // Wenn bereits eine Kategorie vorhanden ist, überspringe
      if (faq.category) {
        skipped++;
        continue;
      }

      // Finde passende Kategorie basierend auf Frage und Antwort
      let matchedCategory = '';
      for (const mapping of categoryMapping) {
        if (mapping.pattern.test(faq.question) || mapping.pattern.test(faq.answer)) {
          matchedCategory = mapping.category;
          break;
        }
      }

      if (matchedCategory) {
        await FAQ.findByIdAndUpdate(faq._id, { category: matchedCategory });
        updated++;
        console.log(`✏️  Aktualisiert: ${faq.question.substring(0, 50)}... → ${matchedCategory}`);
      } else {
        skipped++;
        console.log(`⏭️  Keine Kategorie gefunden: ${faq.question.substring(0, 50)}...`);
      }
    }

    console.log('\n📊 Zusammenfassung:');
    console.log(`   ✏️  Aktualisiert: ${updated}`);
    console.log(`   ⏭️  Übersprungen: ${skipped}`);
    console.log(`   📦 Gesamt: ${allFAQs.length}`);

    // Zeige Statistiken pro Kategorie
    const stats: Record<string, number> = {};
    const categorizedFAQs = await FAQ.find({ page: 'faq', category: { $exists: true, $ne: '' } });
    categorizedFAQs.forEach(faq => {
      stats[faq.category || 'unknown'] = (stats[faq.category || 'unknown'] || 0) + 1;
    });

    console.log('\n📊 FAQs pro Kategorie:');
    Object.entries(stats).forEach(([category, count]) => {
      console.log(`   ${category}: ${count}`);
    });

    console.log('\n✅ Update abgeschlossen!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Fehler beim Update:', error);
    process.exit(1);
  }
}

// Script ausführen
updateFAQs();
