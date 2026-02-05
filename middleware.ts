import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
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
