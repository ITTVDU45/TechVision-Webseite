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

async function fixHostingFAQs() {
  try {
    console.log('🔄 Verbinde mit MongoDB...');
    await connectDB();
    console.log('✅ Verbindung erfolgreich');

    const hostingFAQs = await FAQ.find({ 
      page: 'faq', 
      $or: [
        { question: /Hosting|hosting/i },
        { question: /Sicherheit.*gehostet/i },
        { answer: /Hosting-Lösung|Hosting-Paket|gehosteten Anwendung/i }
      ]
    });
    
    console.log(`📋 Gefunden: ${hostingFAQs.length} Hosting-FAQs`);

    let updated = 0;
    for (const faq of hostingFAQs) {
      if (!faq.category || faq.category !== 'hosting') {
        await FAQ.findByIdAndUpdate(faq._id, { category: 'hosting' });
        updated++;
        console.log(`✏️  Aktualisiert: ${faq.question.substring(0, 50)}... → hosting`);
      }
    }

    console.log(`\n✅ ${updated} Hosting-FAQs aktualisiert!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Fehler:', error);
    process.exit(1);
  }
}

fixHostingFAQs();
