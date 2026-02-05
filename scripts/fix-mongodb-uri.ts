/**
 * Script zum Reparieren der MongoDB-URI (encodiert Sonderzeichen im Passwort)
 * 
 * Usage: npx tsx scripts/fix-mongodb-uri.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env.local');

console.log('🔧 Repariere MongoDB-URI...\n');

try {
  const envFile = readFileSync(envPath, 'utf-8');
  const lines = envFile.split('\n');
  let found = false;
  let modified = false;

  const fixedLines = lines.map((line, index) => {
    const trimmedLine = line.trim();
    
    // Überspringe Kommentare und leere Zeilen
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      return line;
    }

    const [key, ...valueParts] = trimmedLine.split('=');
    
    if (key && key.trim() === 'MONGODB_URI' && valueParts.length > 0) {
      found = true;
      const originalUri = valueParts.join('=').trim();
      
      // Parse die URI
      const match = originalUri.match(/^mongodb(\+srv)?:\/\/([^:]+):([^@]+)@(.+)$/);
      
      if (match) {
        const [, protocol, username, password, rest] = match;
        
        // Encodiere das Passwort
        const encodedPassword = encodeURIComponent(password);
        
        // Baue die neue URI
        const fixedUri = `mongodb${protocol || ''}://${username}:${encodedPassword}@${rest}`;
        
        if (originalUri !== fixedUri) {
          console.log(`✅ Zeile ${index + 1}: URI repariert`);
          console.log(`   Alt: mongodb${protocol || ''}://${username}:${password.substring(0, 2)}...${password.slice(-2)}@${rest.split('/')[0]}`);
          console.log(`   Neu: mongodb${protocol || ''}://${username}:${encodedPassword.substring(0, 2)}...${encodedPassword.slice(-2)}@${rest.split('/')[0]}\n`);
          modified = true;
          return `${key.trim()}=${fixedUri}`;
        } else {
          console.log(`ℹ️  Zeile ${index + 1}: URI ist bereits korrekt\n`);
          return line;
        }
      } else {
        console.log(`⚠️  Zeile ${index + 1}: URI-Format konnte nicht geparst werden\n`);
        return line;
      }
    }
    
    return line;
  });

  if (!found) {
    console.error('❌ MONGODB_URI nicht in .env.local gefunden');
    process.exit(1);
  }

  if (modified) {
    // Erstelle Backup
    const backupPath = `${envPath}.backup.${Date.now()}`;
    writeFileSync(backupPath, envFile);
    console.log(`💾 Backup erstellt: ${backupPath}\n`);

    // Schreibe die reparierte Datei
    writeFileSync(envPath, fixedLines.join('\n'));
    console.log('✅ .env.local wurde repariert!\n');
    console.log('📝 Nächste Schritte:');
    console.log('   1. Starten Sie den Server neu (Strg+C, dann npm run dev)');
    console.log('   2. Die MongoDB-Verbindung sollte jetzt funktionieren');
  } else {
    console.log('ℹ️  Keine Änderungen erforderlich - URI ist bereits korrekt');
  }

} catch (error: any) {
  console.error('❌ Fehler:', error.message);
  process.exit(1);
}
