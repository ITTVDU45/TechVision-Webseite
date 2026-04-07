import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

/** Mongoose/bcrypt laufen nicht auf der Edge-Runtime — sonst schlägt Login still fehl (CredentialsSignin). */
export const runtime = 'nodejs';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
