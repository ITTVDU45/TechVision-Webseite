/**
 * Script zum Erstellen eines Admin-Benutzers mit spezifischen Credentials
 * 
 * Usage: npx tsx scripts/create-admin-user-info.ts
 */

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

// Importiere mongoose direkt
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema (ohne pre-save hook, da wir das Passwort bereits hashen)
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'editor',
  },
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdminUser() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI ist nicht gesetzt in .env.local');
      process.exit(1);
    }

    console.log('🔄 Verbinde mit MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Verbunden!');

    const email = 'info@it-techvision.de';
    const password = 'Ittvdu.45!!11';
    const name = 'Admin';

    // Prüfe, ob User bereits existiert
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('ℹ️  Benutzer mit dieser E-Mail existiert bereits!');
      console.log(`   E-Mail: ${existingUser.email}`);
      console.log(`   Name: ${existingUser.name}`);
      console.log(`   Rolle: ${existingUser.role}`);
      console.log(`   ID: ${existingUser._id}`);
      
      // Frage, ob das Passwort aktualisiert werden soll
      console.log('\n🔄 Aktualisiere Passwort für bestehenden Benutzer...');
      const hashedPassword = await bcrypt.hash(password, 12);
      existingUser.password = hashedPassword;
      existingUser.role = 'admin';
      existingUser.name = name;
      await existingUser.save();
      
      console.log('\n✅ Benutzer erfolgreich aktualisiert:');
      console.log(`   E-Mail: ${existingUser.email}`);
      console.log(`   Name: ${existingUser.name}`);
      console.log(`   Rolle: ${existingUser.role}`);
      console.log(`   ID: ${existingUser._id}`);
      console.log('\n📝 Sie können sich jetzt mit diesen Credentials einloggen:');
      console.log(`   E-Mail: ${email}`);
      console.log(`   Passwort: ${password}`);
      
      await mongoose.disconnect();
      process.exit(0);
    }

    console.log('🔄 Erstelle Admin-Benutzer...');
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
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

    await mongoose.disconnect();
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Fehler beim Erstellen des Benutzers:', error.message);
    if (error.code === 11000) {
      console.error('   Ein Benutzer mit dieser E-Mail existiert bereits.');
    }
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

createAdminUser();
