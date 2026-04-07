import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { ensureLocalNextAuthUrl } from '@/lib/auth-env';
import { getNextAuthSecret } from '@/lib/auth-secret';

ensureLocalNextAuthUrl();

async function verifyPasswordAgainstHash(
  plain: string,
  passwordHash: string | undefined
): Promise<boolean> {
  if (!passwordHash || typeof passwordHash !== 'string') return false;
  if (await bcrypt.compare(plain, passwordHash)) return true;
  if (plain !== plain.trim() && (await bcrypt.compare(plain.trim(), passwordHash))) return true;
  return false;
}

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
          return null;
        }

        const emailNorm = credentials.email.trim().toLowerCase();
        const passwordRaw = credentials.password;
        const mongoUri =
          process.env.MONGODB_URI?.trim() || process.env.MongoDB_URI?.trim();

        // Demo-Modus: Hardcoded Login
        if (!mongoUri) {
          if (emailNorm === DEMO_USER.email && passwordRaw === DEMO_USER.password) {
            return {
              id: 'demo-admin',
              email: DEMO_USER.email,
              name: DEMO_USER.name,
              role: DEMO_USER.role,
            };
          }
          return null;
        }

        // MongoDB: nur Verbindung im try/catch — falsche Credentials nicht als „DB-Fehler“ behandeln
        let connectDB: () => Promise<unknown>;
        let User: typeof import('@/lib/models/User').default;
        try {
          connectDB = (await import('@/lib/mongodb')).default;
          User = (await import('@/lib/models/User')).default;
          await connectDB();
        } catch (error: unknown) {
          const err = error as { message?: string; name?: string };
          console.error('[auth] MongoDB-Verbindung fehlgeschlagen:', err?.message ?? error);
          if (
            emailNorm === DEMO_USER.email &&
            passwordRaw === DEMO_USER.password
          ) {
            console.warn('[auth] Demo-Fallback wegen DB-Verbindungsfehler');
            return {
              id: 'demo-admin',
              email: DEMO_USER.email,
              name: DEMO_USER.name,
              role: DEMO_USER.role,
            };
          }
          return null;
        }

        const user = await User.findOne({ email: emailNorm }).exec();

        if (process.env.AUTH_LOGIN_DEBUG === '1') {
          console.log('[auth] login', { emailNorm, userFound: !!user });
        }

        if (!user) {
          if (
            emailNorm === DEMO_USER.email &&
            passwordRaw === DEMO_USER.password
          ) {
            console.warn('[auth] Kein User in DB — Demo-Fallback');
            return {
              id: 'demo-admin',
              email: DEMO_USER.email,
              name: DEMO_USER.name,
              role: DEMO_USER.role,
            };
          }
          return null;
        }

        const hash = user.password as string;
        const isPasswordValid = await verifyPasswordAgainstHash(passwordRaw, hash);
        if (process.env.AUTH_LOGIN_DEBUG === '1') {
          console.log('[auth] passwordOk', isPasswordValid);
        }
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role ?? 'admin',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Tage
    updateAge: 24 * 60 * 60, // Session wird täglich aktualisiert
  },
  // Keine eigenen cookie-Namen: müssen mit getToken() in der Middleware übereinstimmen
  // (NEXTAUTH_URL https → __Secure-next-auth.session-token; http → next-auth.session-token).
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.id = user.id;
        token.role = user.role;
        token.email = user.email ?? undefined;
        token.name = user.name ?? undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || (token.sub as string) || "";
        session.user.role = (token.role as string) || "";
        session.user.email =
          (token.email as string) || session.user.email || "";
        session.user.name =
          (token.name as string) || session.user.name || "";
      }
      return session;
    },
  },
  secret: resolvedSecret,
  debug: process.env.NODE_ENV === "development",
};
