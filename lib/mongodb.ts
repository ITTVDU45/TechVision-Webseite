import mongoose, { ConnectOptions } from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  let MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('MongoDB is not configured. Please set MONGODB_URI in .env.local or use demo mode.');
  }

  // Validiere und repariere die URI, falls nötig
  // Prüfe, ob das Passwort leer ist (z.B. durch Leerzeichen oder falsches Parsing)
  const uriMatch = MONGODB_URI.match(/^mongodb(\+srv)?:\/\/([^:]+):([^@]+)@(.+)$/);
  if (uriMatch) {
    const [, , username, password, rest] = uriMatch;
    if (!password || password.trim() === '') {
      console.error('⚠️  MongoDB-URI hat ein leeres Passwort!');
      console.error('   Bitte überprüfen Sie die MONGODB_URI in .env.local');
      console.error('   Format: mongodb+srv://username:password@cluster.mongodb.net/');
      throw new Error('MongoDB URI has empty password. Please check MONGODB_URI in .env.local');
    }
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // URL-encode spezielle Zeichen im Passwort, falls nötig
    try {
      const uriParts = MONGODB_URI.match(/^(mongodb\+srv:\/\/)([^:]+):([^@]+)(@.+)$/);
      if (uriParts) {
        const [, protocol, username, password, rest] = uriParts;
        // Encode nur, wenn das Passwort noch nicht encoded ist
        if (password && !password.includes('%')) {
          const encodedPassword = encodeURIComponent(password);
          MONGODB_URI = `${protocol}${username}:${encodedPassword}${rest}`;
        }
      }
    } catch (e) {
      console.warn('Could not parse MongoDB URI for encoding:', e);
    }

    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      // SSL/TLS Optionen für MongoDB Atlas
      tls: true,
      tlsAllowInvalidCertificates: false,
      retryWrites: true,
      retryReads: true,
    };

    console.log('Attempting to connect to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch((err) => {
      console.error('❌ MongoDB connection error details:', {
        message: err.message,
        code: err.code,
        name: err.name,
      });
      
      // Spezifische Fehlermeldungen
      if (err.message?.includes('Password cannot be empty')) {
        console.error('💡 Tipp: Das Passwort in der MongoDB-URI ist leer.');
        console.error('   Überprüfen Sie die MONGODB_URI in .env.local');
        console.error('   Format: mongodb+srv://username:password@cluster.mongodb.net/');
      } else if (err.message?.includes('alert number 80') || err.message?.includes('tlsv1 alert internal error')) {
        console.error('💡 Tipp: SSL/TLS-Fehler - Mögliche Ursachen:');
        console.error('   1. Ihre IP-Adresse ist nicht in MongoDB Atlas Network Access whitelisted');
        console.error('   2. Überprüfen Sie die Firewall-Einstellungen');
        console.error('   3. Versuchen Sie, "Allow access from anywhere" (0.0.0.0/0) in MongoDB Atlas zu aktivieren');
      } else if (err.message?.includes('authentication failed')) {
        console.error('💡 Tipp: Authentifizierungsfehler - Überprüfen Sie Benutzername und Passwort');
      }
      
      // Cache zurücksetzen, damit ein erneuter Verbindungsversuch möglich ist
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
