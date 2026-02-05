/**
 * Script zum Debuggen der MongoDB-URI, wie Next.js sie lädt
 * 
 * Usage: npx tsx scripts/debug-mongodb-uri-nextjs.ts
 */

// Simuliere, wie Next.js die Umgebungsvariablen lädt
// Next.js lädt .env.local automatisch, aber wir können es manuell testen

import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env.local');
let mongodbUri = '';

console.log('🔍 Debug: Wie Next.js die MongoDB-URI lädt...\n');

try {
  const envFile = readFileSync(envPath, 'utf-8');
  console.log('📄 .env.local Datei gelesen\n');
  
  // Parse wie Next.js es tut (vereinfacht)
  envFile.split('\n').forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (key.trim() === 'MONGODB_URI') {
          mongodbUri = value;
          console.log(`✅ Zeile ${index + 1}: MONGODB_URI gefunden`);
          console.log(`   Länge: ${value.length} Zeichen`);
          console.log(`   Erste 30 Zeichen: ${value.substring(0, 30)}...`);
          console.log(`   Letzte 20 Zeichen: ...${value.slice(-20)}\n`);
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

// Parse die URI
const match = mongodbUri.match(/^mongodb(\+srv)?:\/\/([^:]+):([^@]+)@(.+)$/);

if (!match) {
  console.error('❌ URI-Format konnte nicht geparst werden');
  console.error(`   URI: ${mongodbUri.substring(0, 50)}...`);
  process.exit(1);
}

const [, protocol, username, password, rest] = match;

console.log('📊 URI-Analyse:');
console.log(`   Protokoll: mongodb${protocol || ''}`);
console.log(`   Benutzer: "${username}" (${username.length} Zeichen)`);
console.log(`   Passwort: "${password.substring(0, 2)}...${password.slice(-2)}" (${password.length} Zeichen)`);
console.log(`   Host: ${rest.split('/')[0]}\n`);

// Prüfe auf Probleme
const issues: string[] = [];

if (!password || password.trim() === '') {
  issues.push('❌ Passwort ist leer!');
} else if (password.length < 3) {
  issues.push('⚠️  Passwort ist sehr kurz');
}

if (password.includes(' ')) {
  issues.push('⚠️  Passwort enthält Leerzeichen (sollte %20 sein)');
}

if (password.startsWith(' ') || password.endsWith(' ')) {
  issues.push('⚠️  Passwort hat führende/abschließende Leerzeichen');
}

// Prüfe auf URL-Encoding
if (password.includes('%')) {
  console.log('ℹ️  Passwort enthält URL-encoded Zeichen');
  try {
    const decoded = decodeURIComponent(password);
    console.log(`   Decodiert: "${decoded.substring(0, 2)}...${decoded.slice(-2)}" (${decoded.length} Zeichen)`);
  } catch (e) {
    issues.push('❌ Fehler beim Decodieren des Passworts');
  }
}

// Prüfe auf spezielle Zeichen, die Probleme verursachen könnten
const specialChars = ['@', '#', '$', '&', '?', '=', '/'];
const foundSpecialChars = specialChars.filter(char => password.includes(char) && !password.includes(`%${char.charCodeAt(0).toString(16).toUpperCase()}`));
if (foundSpecialChars.length > 0) {
  issues.push(`⚠️  Passwort enthält nicht-encodierte Sonderzeichen: ${foundSpecialChars.join(', ')}`);
  console.log('💡 Diese sollten URL-encodiert sein:');
  foundSpecialChars.forEach(char => {
    const encoded = encodeURIComponent(char);
    console.log(`      ${char} → ${encoded}`);
  });
}

if (issues.length > 0) {
  console.log('\n⚠️  Gefundene Probleme:');
  issues.forEach(issue => console.log(`   ${issue}`));
  console.log('\n💡 Lösung:');
  console.log('   1. Öffnen Sie .env.local');
  console.log('   2. Stellen Sie sicher, dass die MONGODB_URI korrekt formatiert ist');
  console.log('   3. Encodieren Sie alle Sonderzeichen im Passwort');
  console.log('   4. Entfernen Sie führende/abschließende Leerzeichen');
  console.log('   5. Starten Sie den Server neu');
} else {
  console.log('✅ Keine offensichtlichen Probleme gefunden');
  console.log('\n💡 Wenn Next.js trotzdem "Password cannot be empty" meldet:');
  console.log('   1. Starten Sie den Server neu (Strg+C, dann npm run dev)');
  console.log('   2. Next.js lädt .env.local nur beim Start');
  console.log('   3. Prüfen Sie, ob es mehrere .env Dateien gibt');
  console.log('   4. Stellen Sie sicher, dass .env.local im Projekt-Root ist');
}

console.log('\n📝 Vollständige URI (maskiert):');
const maskedUri = mongodbUri.replace(/:([^@]+)@/, ':****@');
console.log(`   ${maskedUri}`);
