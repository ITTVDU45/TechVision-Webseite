import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getNextAuthSecret } from '@/lib/auth-secret';

// Demo-Login Credentials (für Entwicklung)
const DEMO_USER = {
  email: 'admin@techvision.de',
  password: 'admin', // In Produktion sollte dies gehasht sein
  name: 'Admin',
  role: 'admin',
};

const resolvedSecret = getNextAuthSecret();

if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = resolvedSecret;
}

if (!process.env.NEXTAUTH_URL) {
  if (process.env.VERCEL_URL) {
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
  } else if (process.env.NODE_ENV !== 'production') {
    process.env.NEXTAUTH_URL = 'http://localhost:3000';
  }
}

if (resolvedSecret.length < 32 && process.env.NODE_ENV === 'production') {
  console.warn('⚠️  NEXTAUTH_SECRET sollte mindestens 32 Zeichen lang sein (Vercel → Environment Variables).');
}

if (process.env.NODE_ENV === 'development' && !process.env.NEXTAUTH_SECRET?.trim()) {
  console.warn('⚠️  NEXTAUTH_SECRET fehlt in .env.local – Demo-Secret aktiv.');
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        // Demo-Modus: Hardcoded Login
        if (!process.env.MONGODB_URI) {
          if (credentials.email === DEMO_USER.email && credentials.password === DEMO_USER.password) {
            return {
              id: 'demo-admin',
              email: DEMO_USER.email,
              name: DEMO_USER.name,
              role: DEMO_USER.role,
            };
          }
          throw new Error('Invalid credentials');
        }

        // MongoDB-Modus: Datenbank-Login mit Demo-Fallback
        try {
          const connectDB = (await import('@/lib/mongodb')).default;
          const User = (await import('@/lib/models/User')).default;

          await connectDB();

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            // Fallback auf Demo-Login, wenn kein User in DB existiert
            if (credentials.email === DEMO_USER.email && credentials.password === DEMO_USER.password) {
              console.log('⚠️  Kein User in DB gefunden, verwende Demo-Login als Fallback');
              return {
                id: 'demo-admin',
                email: DEMO_USER.email,
                name: DEMO_USER.name,
                role: DEMO_USER.role,
              };
            }
            throw new Error('No user found with this email');
          }

          const isPasswordValid = await user.comparePassword(credentials.password);

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error: any) {
          console.error('Database authentication error:', error);
          
          // Prüfe, ob es ein MongoDB-Verbindungsfehler ist
          const isMongoConnectionError = 
            error?.message?.includes('Password cannot be empty') ||
            error?.message?.includes('MongoDB') ||
            error?.name === 'MongoInvalidArgumentError' ||
            error?.name === 'MongoServerSelectionError';
          
          if (isMongoConnectionError) {
            console.error('⚠️  MongoDB-Verbindungsfehler:', error.message);
            console.error('💡 Tipp: Überprüfen Sie die MONGODB_URI in .env.local');
            console.error('   Das Passwort in der URI darf nicht leer sein.');
            console.error('   Format: mongodb+srv://user:password@cluster...');
          }
          
          // Fallback auf Demo-Login bei DB-Fehlern (z.B. Verbindungsprobleme)
          if (credentials.email === DEMO_USER.email && credentials.password === DEMO_USER.password) {
            console.log('⚠️  DB-Fehler, verwende Demo-Login als Fallback');
            return {
              id: 'demo-admin',
              email: DEMO_USER.email,
              name: DEMO_USER.name,
              role: DEMO_USER.role,
            };
          }
          
          // Für den neuen User: Temporärer Fallback bei MongoDB-Verbindungsproblemen
          // (Nur wenn die Credentials korrekt sind)
          if (credentials.email === 'info@it-techvision.de' && credentials.password === 'Ittvdu.45!!11') {
            if (isMongoConnectionError) {
              console.log('⚠️  MongoDB-Verbindungsfehler, aber Credentials sind korrekt. Verwende temporären Fallback.');
              // Temporärer Fallback: Erlaube Login auch bei MongoDB-Verbindungsproblemen
              // WICHTIG: Dies sollte nur temporär sein, bis MongoDB korrekt konfiguriert ist
              return {
                id: 'temp-admin-info',
                email: 'info@it-techvision.de',
                name: 'Admin',
                role: 'admin',
              };
            }
          }
          
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Tage
    updateAge: 24 * 60 * 60, // Session wird täglich aktualisiert
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60, // 30 Tage
      },
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: resolvedSecret,
  debug: process.env.NODE_ENV === "development",
};
