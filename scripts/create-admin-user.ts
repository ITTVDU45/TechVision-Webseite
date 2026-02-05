/**
 * Script zum Erstellen eines Admin-Benutzers
 * 
 * Usage: npx tsx scripts/create-admin-user.ts
 */

import connectDB from '../lib/mongodb';
import User from '../lib/models/User';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdminUser() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected!');

    const email = await question('E-Mail: ');
    const password = await question('Passwort: ');
    const name = await question('Name: ');

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Benutzer mit dieser E-Mail existiert bereits!');
      process.exit(1);
    }

    const user = await User.create({
      email,
      password,
      name,
      role: 'admin',
    });

    console.log(`\n✅ Admin-Benutzer erstellt:`);
    console.log(`   E-Mail: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Rolle: ${user.role}`);
    console.log(`   ID: ${user._id}`);

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Benutzers:', error);
    rl.close();
    process.exit(1);
  }
}

createAdminUser();
