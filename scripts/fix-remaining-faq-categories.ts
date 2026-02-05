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

// Spezifische Zuordnungen für restliche FAQs
const specificMappings: Array<{ questionPattern: RegExp; category: string }> = [
  { questionPattern: /Ist eine monatliche Zahlung oder Einmalzahlung möglich/i, category: 'ki-transformation' },
  { questionPattern: /Wie wird die Preisgestaltung für maßgeschneiderte Lösungen kalkuliert/i, category: 'softwareentwicklung' },
  { questionPattern: /Gibt es Pakete für kleine, mittlere und große Unternehmen/i, category: 'softwareentwicklung' },
  { questionPattern: /Wie kann ich mit der digitalen Transformation in meinem Unternehmen beginnen/i, category: 'digitale-transformation' },
  { questionPattern: /Welche Herausforderungen können bei der digitalen Transformation auftreten/i, category: 'digitale-transformation' },
  { questionPattern: /Wie messe ich den Erfolg meiner digitalen Transformation/i, category: 'digitale-transformation' },
];

async function fixRemainingFAQs() {
  try {
    console.log('🔄 Verbinde mit MongoDB...');
    await connectDB();
    console.log('✅ Verbindung erfolgreich');

    const allFAQs = await FAQ.find({ page: 'faq', $or: [{ category: { $exists: false } }, { category: '' }] });
    console.log(`📋 Gefunden: ${allFAQs.length} FAQs ohne Kategorie`);

    let updated = 0;

    for (const faq of allFAQs) {
      for (const mapping of specificMappings) {
        if (mapping.questionPattern.test(faq.question)) {
          await FAQ.findByIdAndUpdate(faq._id, { category: mapping.category });
          updated++;
          console.log(`✏️  Aktualisiert: ${faq.question.substring(0, 50)}... → ${mapping.category}`);
          break;
        }
      }
    }

    console.log('\n📊 Zusammenfassung:');
    console.log(`   ✏️  Aktualisiert: ${updated}`);
    console.log(`   📦 Gesamt ohne Kategorie: ${allFAQs.length}`);

    // Zeige finale Statistiken
    const stats: Record<string, number> = {};
    const categorizedFAQs = await FAQ.find({ page: 'faq', category: { $exists: true, $ne: '' } });
    categorizedFAQs.forEach(faq => {
      stats[faq.category || 'unknown'] = (stats[faq.category || 'unknown'] || 0) + 1;
    });

    console.log('\n📊 Finale FAQs pro Kategorie:');
    Object.entries(stats).sort((a, b) => b[1] - a[1]).forEach(([category, count]) => {
      console.log(`   ${category}: ${count}`);
    });

    const remaining = await FAQ.countDocuments({ page: 'faq', $or: [{ category: { $exists: false } }, { category: '' }] });
    if (remaining > 0) {
      console.log(`\n⚠️  ${remaining} FAQs haben noch keine Kategorie`);
    }

    console.log('\n✅ Update abgeschlossen!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Fehler beim Update:', error);
    process.exit(1);
  }
}

// Script ausführen
fixRemainingFAQs();
