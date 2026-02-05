import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Lade .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI nicht gefunden in .env.local');
  process.exit(1);
}

console.log('🔍 MongoDB Verbindungsdiagnose');
console.log('================================\n');

// Maskiere Passwort in URI für Ausgabe
const maskedUri = MONGODB_URI.replace(/:([^:@]+)@/, ':***@');
console.log('URI (maskiert):', maskedUri);
console.log('');

// Prüfe URI-Format
const uriMatch = MONGODB_URI.match(/^mongodb(\+srv)?:\/\/([^:]+):([^@]+)@(.+)$/);
if (!uriMatch) {
  console.error('❌ Ungültiges MongoDB URI-Format');
  process.exit(1);
}

const [, protocol, username, password, rest] = uriMatch;
console.log('✅ URI-Format ist gültig');
console.log('   Protokoll:', protocol ? 'mongodb+srv' : 'mongodb');
console.log('   Benutzername:', username);
console.log('   Passwort-Länge:', password.length, 'Zeichen');
console.log('   Host:', rest.split('/')[0]);
console.log('');

// Prüfe auf spezielle Zeichen im Passwort
const specialChars = password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
if (specialChars) {
  console.log('⚠️  Passwort enthält spezielle Zeichen:', specialChars.join(', '));
  console.log('   Diese sollten URL-encoded sein (z.B. $ → %24)');
  console.log('');
}

// Teste Verbindung mit verschiedenen Optionen
async function testConnection(opts: mongoose.ConnectOptions, label: string) {
  console.log(`\n🧪 Test: ${label}`);
  console.log('   Optionen:', JSON.stringify(opts, null, 2));
  
  try {
    // URL-encode Passwort falls nötig
    let testUri = MONGODB_URI;
    if (password && !password.includes('%')) {
      const uriParts = MONGODB_URI.match(/^(mongodb\+srv:\/\/)([^:]+):([^@]+)(@.+)$/);
      if (uriParts) {
        const [, protocol, username, password, rest] = uriParts;
        const encodedPassword = encodeURIComponent(password);
        testUri = `${protocol}${username}:${encodedPassword}${rest}`;
      }
    }
    
    await mongoose.connect(testUri, opts);
    console.log('   ✅ Verbindung erfolgreich!');
    await mongoose.connection.db.admin().ping();
    console.log('   ✅ Ping erfolgreich!');
    await mongoose.disconnect();
    return true;
  } catch (error: any) {
    console.log('   ❌ Verbindung fehlgeschlagen');
    console.log('   Fehler:', error.message);
    if (error.message?.includes('alert number 80')) {
      console.log('   💡 Hinweis: SSL Alert 80 = IP-Adresse nicht whitelisted in MongoDB Atlas');
    }
    return false;
  }
}

async function runDiagnostics() {
  // Test 1: Standard-Optionen
  await testConnection({
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
  }, 'Standard-Optionen');

  // Test 2: Mit TLS explizit
  await testConnection({
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    tls: true,
    tlsAllowInvalidCertificates: false,
  }, 'Mit TLS (strict)');

  // Test 3: Mit TLS (allow invalid certificates) - nur für Diagnose
  await testConnection({
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    tls: true,
    tlsAllowInvalidCertificates: true,
  }, 'Mit TLS (allow invalid certs)');

  console.log('\n📋 Zusammenfassung:');
  console.log('================================');
  console.log('Wenn alle Tests fehlschlagen:');
  console.log('1. Überprüfen Sie MongoDB Atlas Network Access');
  console.log('   → Fügen Sie Ihre IP-Adresse hinzu oder aktivieren Sie 0.0.0.0/0');
  console.log('2. Überprüfen Sie Benutzername und Passwort');
  console.log('3. Stellen Sie sicher, dass das Passwort URL-encoded ist (z.B. $ → %24)');
  console.log('4. Überprüfen Sie die Firewall-Einstellungen');
}

runDiagnostics().catch(console.error);
