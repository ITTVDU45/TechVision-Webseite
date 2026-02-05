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
import Service from '../lib/models/Service';

// Services-Daten aus der Homepage-Komponente
const servicesData = [
  {
    icon: '🤖',
    name: 'KI-Transformation',
    description: 'Wir analysieren Ihre Geschäftsprozesse und identifizieren Potenziale für den Einsatz von Künstlicher Intelligenz, um Effizienz und Produktivität zu steigern.',
    page: 'ki-transformation',
    category: 'home',
    order: 1,
  },
  {
    icon: '⚡',
    name: 'Workflow Automatisierung',
    description: 'Von der Planung bis zur Umsetzung integrieren wir maßgeschneiderte KI-Lösungen nahtlos in Ihre bestehenden Systeme.',
    page: 'workflow-automation',
    category: 'home',
    order: 2,
  },
  {
    icon: '💻',
    name: 'Software Entwicklung',
    description: 'Entwicklung intelligenter Softwarelösungen, die durch KI Ihre Geschäftsabläufe optimieren und automatisieren.',
    page: 'software-development',
    category: 'home',
    order: 3,
  },
  {
    icon: '🎯',
    name: 'KI für Branchen',
    description: 'Spezialisierte KI-Lösungen für verschiedene Branchen wie IT, Bauwesen und Rechtswesen, um branchenspezifische Herausforderungen zu meistern.',
    page: 'industry-solutions',
    category: 'home',
    order: 4,
  },
  {
    icon: '🔒',
    name: 'Cybersecurity',
    description: 'Umfassender Schutz und professionelles Management Ihrer IT-Systeme, von Backup-Lösungen bis hin zu sicherer Cloud-Integration und Netzwerkarchitektur.',
    page: 'cybersecurity',
    category: 'home',
    order: 5,
  },
  {
    icon: '🌐',
    name: 'Webseitenentwicklung',
    description: 'Moderne und responsive Webauftritte für Ihren professionellen Online-Auftritt.',
    page: 'web-development',
    category: 'home',
    order: 6,
  },
  {
    icon: '☁️',
    name: 'Hosting',
    description: 'Zuverlässiges Hosting für Ihre Webseiten und Softwarelösungen mit erstklassigem Support.',
    page: 'webhosting',
    category: 'home',
    order: 7,
  },
];

async function importServices() {
  try {
    console.log('🔄 Verbinde mit MongoDB...');
    await connectDB();
    console.log('✅ Verbindung erfolgreich');

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const serviceData of servicesData) {
      try {
        // Prüfe, ob Service bereits existiert (basierend auf name und page)
        const existing = await Service.findOne({
          name: serviceData.name,
          page: serviceData.page,
        });

        if (existing) {
          // Update bestehenden Service
          await Service.findByIdAndUpdate(existing._id, {
            ...serviceData,
            published: true,
          });
          updated++;
          console.log(`✏️  Aktualisiert: ${serviceData.name}`);
        } else {
          // Erstelle neuen Service
          await Service.create({
            ...serviceData,
            published: true,
          });
          created++;
          console.log(`✨ Erstellt: ${serviceData.name}`);
        }
      } catch (error) {
        console.error(`❌ Fehler bei ${serviceData.name}:`, error);
        skipped++;
      }
    }

    console.log('\n📊 Zusammenfassung:');
    console.log(`   ✨ Erstellt: ${created}`);
    console.log(`   ✏️  Aktualisiert: ${updated}`);
    console.log(`   ⏭️  Übersprungen: ${skipped}`);
    console.log(`   📦 Gesamt: ${servicesData.length}`);

    // Zeige alle Services an
    const allServices = await Service.find({ category: 'home' }).sort({ order: 1 });
    console.log('\n📋 Alle Services in der Datenbank:');
    allServices.forEach((s, i) => {
      console.log(`   ${i + 1}. ${s.icon} ${s.name} (${s.page})`);
    });

    console.log('\n✅ Import abgeschlossen!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Fehler beim Import:', error);
    process.exit(1);
  }
}

// Script ausführen
importServices();
