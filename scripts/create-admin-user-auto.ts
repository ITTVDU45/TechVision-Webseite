/**
 * Script zum automatischen Erstellen eines Admin-Benutzers mit Demo-Credentials
 * 
 * Usage: npx tsx scripts/create-admin-user-auto.ts
 */

// Lade Umgebungsvariablen aus .env.local
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Lade .env.local manuell
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
  console.warn('⚠️  Konnte .env.local nicht laden:', error);
}

import connectDB from '../lib/mongodb';
import User from '../lib/models/User';

async function createAdminUser() {
  try {
    console.log('🔄 Verbinde mit MongoDB...');
    await connectDB();
    console.log('✅ Verbunden!');

    const email = 'admin@techvision.de';
    const password = 'admin123'; // Mindestens 6 Zeichen erforderlich
    const name = 'Admin';

    // Prüfe, ob User bereits existiert
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('ℹ️  Benutzer mit dieser E-Mail existiert bereits!');
      console.log(`   E-Mail: ${existingUser.email}`);
      console.log(`   Name: ${existingUser.name}`);
      console.log(`   Rolle: ${existingUser.role}`);
      console.log(`   ID: ${existingUser._id}`);
      process.exit(0);
    }

    console.log('🔄 Erstelle Admin-Benutzer...');
    const user = await User.create({
      email,
      password,
      name,
      role: 'admin',
    });

    console.log('\n✅ Admin-Benutzer erfolgreich erstellt:');
    console.log(`   E-Mail: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Rolle: ${user.role}`);
    console.log(`   ID: ${user._id}`);
    console.log('\n📝 Sie können sich jetzt mit diesen Credentials einloggen:');
    console.log(`   E-Mail: ${email}`);
    console.log(`   Passwort: ${password}`);
    console.log('\n⚠️  WICHTIG: Bitte ändern Sie das Passwort nach dem ersten Login!');

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Fehler beim Erstellen des Benutzers:', error.message);
    if (error.code === 11000) {
      console.error('   Ein Benutzer mit dieser E-Mail existiert bereits.');
    }
    process.exit(1);
  }
}

createAdminUser();
