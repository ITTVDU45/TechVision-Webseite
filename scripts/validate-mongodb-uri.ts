/**
 * Script zur Validierung der MongoDB-URI
 * 
 * Usage: npx tsx scripts/validate-mongodb-uri.ts
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env.local');
let mongodbUri = '';

try {
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (key.trim() === 'MONGODB_URI') {
          mongodbUri = value;
        }
      }
    }
  });
} catch (error) {
  console.error('❌ Fehler beim Laden von .env.local:', error);
  process.exit(1);
}

if (!mongodbUri) {
  console.error('❌ MONGODB_URI nicht in .env.local gefunden');
  process.exit(1);
}

console.log('🔍 Analysiere MongoDB-URI...\n');

// Maskiere das Passwort für die Ausgabe
const maskedUri = mongodbUri.replace(/:([^@]+)@/, ':****@');
console.log(`URI (maskiert): ${maskedUri}\n`);

// Parse die URI
try {
  // Prüfe Format
  if (!mongodbUri.startsWith('mongodb://') && !mongodbUri.startsWith('mongodb+srv://')) {
    console.error('❌ Ungültiges URI-Format. Muss mit mongodb:// oder mongodb+srv:// beginnen');
    process.exit(1);
  }

  // Extrahiere Benutzer und Passwort
  const match = mongodbUri.match(/^mongodb(\+srv)?:\/\/([^:]+):([^@]+)@(.+)$/);
  
  if (!match) {
    console.error('❌ URI-Format konnte nicht geparst werden');
    console.error('   Erwartetes Format: mongodb+srv://username:password@cluster.mongodb.net/');
    process.exit(1);
  }

  const [, protocol, username, password, rest] = match;
  
  console.log('✅ URI-Format ist korrekt');
  console.log(`   Protokoll: mongodb${protocol || ''}`);
  console.log(`   Benutzer: ${username}`);
  console.log(`   Passwort: ${password ? '***' + password.slice(-2) : '❌ LEER!'}`);
  console.log(`   Host: ${rest.split('/')[0]}\n`);

  if (!password || password.trim() === '') {
    console.error('❌ FEHLER: Das Passwort ist leer!');
    console.error('\n💡 Lösung:');
    console.error('   1. Öffnen Sie .env.local');
    console.error('   2. Stellen Sie sicher, dass die MONGODB_URI folgendes Format hat:');
    console.error('      mongodb+srv://username:password@cluster.mongodb.net/');
    console.error('   3. Das Passwort darf nicht leer sein');
    console.error('   4. Sonderzeichen im Passwort müssen URL-encodiert sein:');
    console.error('      @ → %40');
    console.error('      $ → %24');
    console.error('      # → %23');
    console.error('      & → %26');
    process.exit(1);
  }

  if (password.length < 3) {
    console.warn('⚠️  Warnung: Passwort ist sehr kurz');
  }

  // Prüfe auf häufige Probleme
  if (password.includes(' ') && !password.includes('%20')) {
    console.warn('⚠️  Warnung: Passwort enthält Leerzeichen. Diese sollten als %20 encodiert sein');
  }

  console.log('✅ MongoDB-URI ist valide!');
  console.log('\n📝 Nächste Schritte:');
  console.log('   1. Starten Sie den Server neu (Strg+C, dann npm run dev)');
  console.log('   2. Versuchen Sie sich erneut einzuloggen');
  
} catch (error: any) {
  console.error('❌ Fehler beim Parsen der URI:', error.message);
  process.exit(1);
}
