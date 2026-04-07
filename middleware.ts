import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { getNextAuthSecret } from '@/lib/auth-secret';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    // Edge-Middleware: ohne explizites secret schlägt JWT-Decode fehl → ?error=Configuration
    secret: getNextAuthSecret(),
    callbacks: {
      authorized: ({ token, req }) => {
        // Erlaube Zugriff auf /admin/login ohne Authentifizierung
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }
        // Alle anderen /admin/* Routen benötigen Authentifizierung
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
