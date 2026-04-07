import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ensureLocalNextAuthUrl } from '@/lib/auth-env';
import { getNextAuthSecret } from '@/lib/auth-secret';

ensureLocalNextAuthUrl();

/**
 * Liest den JWT aus allen gängigen Session-Cookie-Varianten.
 * Verhindert Login-Loops, wenn NEXTAUTH_URL (http vs https) und Cookie-Name
 * (__Secure-*) nicht zusammenpassen.
 */
async function getAdminSessionToken(req: NextRequest) {
  const secret = getNextAuthSecret();
  if (!secret) return null;

  const attempts: { cookieName: string; secureCookie: boolean }[] = [
    { cookieName: 'next-auth.session-token', secureCookie: false },
    { cookieName: '__Secure-next-auth.session-token', secureCookie: true },
  ];

  for (const { cookieName, secureCookie } of attempts) {
    const token = await getToken({ req, secret, cookieName, secureCookie });
    if (token) return token;
  }

  return getToken({ req, secret });
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = await getAdminSessionToken(req);
  if (token) {
    return NextResponse.next();
  }

  const login = new URL('/admin/login', req.url);
  login.searchParams.set('callbackUrl', `${pathname}${search}`);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
