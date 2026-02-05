/**
 * Script zum direkten Testen der MongoDB-Verbindung
 * 
 * Usage: npx tsx scripts/test-mongodb-connection-direct.ts
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import mongoose from 'mongoose';

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

console.log('🔄 Teste MongoDB-Verbindung...\n');

// Parse die URI manuell
const match = mongodbUri.match(/^mongodb(\+srv)?:\/\/([^:]+):([^@]+)@(.+)$/);

if (match) {
  const [, , username, password, rest] = match;
  console.log(`Benutzer: ${username}`);
  console.log(`Passwort-Länge: ${password.length} Zeichen`);
  console.log(`Passwort (erste 2, letzte 2): ${password.substring(0, 2)}...${password.slice(-2)}`);
  
  if (!password || password.trim() === '') {
    console.error('❌ Passwort ist leer!');
    process.exit(1);
  }
  
  // Prüfe auf URL-Encoding
  if (password.includes('%')) {
    console.log('ℹ️  Passwort enthält URL-encoded Zeichen');
    const decoded = decodeURIComponent(password);
    console.log(`   Decodiert (erste 2, letzte 2): ${decoded.substring(0, 2)}...${decoded.slice(-2)}`);
  }
}

// Versuche Verbindung
mongoose.connect(mongodbUri, {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
})
  .then(() => {
    console.log('\n✅ MongoDB-Verbindung erfolgreich!');
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((error: any) => {
    console.error('\n❌ MongoDB-Verbindung fehlgeschlagen:');
    console.error(`   Fehler: ${error.message}`);
    console.error(`   Name: ${error.name}`);
    
    if (error.message.includes('Password cannot be empty')) {
      console.error('\n💡 Das Problem:');
      console.error('   MongoDB interpretiert das Passwort als leer.');
      console.error('   Mögliche Ursachen:');
      console.error('   1. Leerzeichen im Passwort (sollte %20 sein)');
      console.error('   2. Sonderzeichen, die nicht URL-encodiert sind');
      console.error('   3. Doppelpunkt (:) im Passwort (muss %3A sein)');
      console.error('\n💡 Lösung:');
      console.error('   Encodieren Sie alle Sonderzeichen im Passwort:');
      console.error('   - @ → %40');
      console.error('   - $ → %24');
      console.error('   - # → %23');
      console.error('   - & → %26');
      console.error('   - : → %3A');
      console.error('   - / → %2F');
      console.error('   - ? → %3F');
      console.error('   - = → %3D');
    }
    
    mongoose.disconnect().catch(() => {});
    process.exit(1);
  });
