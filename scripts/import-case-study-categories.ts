import mongoose from 'mongoose';
import CaseStudyCategory from '../lib/models/CaseStudyCategory';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Lade .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const defaultCategories = [
  { id: 'beratung', name: 'Beratung', order: 0 },
  { id: 'webseiten', name: 'Webseiten', order: 1 },
  { id: 'software', name: 'Software', order: 2 },
  { id: 'onlineshop', name: 'Onlineshop', order: 3 },
  { id: 'tools-ki-agenten', name: 'Tools & KI Agenten', order: 4 },
];

async function importCategories() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI ist nicht gesetzt. Bitte setzen Sie MONGODB_URI in .env.local');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB verbunden');

    for (const category of defaultCategories) {
      const existing = await CaseStudyCategory.findOne({ id: category.id });
      if (!existing) {
        await CaseStudyCategory.create(category);
        console.log(`✓ Kategorie "${category.name}" erstellt`);
      } else {
        console.log(`- Kategorie "${category.name}" existiert bereits`);
      }
    }

    console.log('\n✅ Import abgeschlossen!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Fehler beim Import:', error);
    process.exit(1);
  }
}

importCategories();
