import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/' || path === '/login' || path === '/register' || path === '/forgot-password';

  // Extract the token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only-do-not-use-in-prod" 
  });

  // If the user is on a public path but IS logged in, redirect them to their dashboard
  if (isPublicPath && token) {
    if (token.role === 'ADMIN') return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    if (token.role === 'OFFICER') return NextResponse.redirect(new URL('/officer/dashboard', request.url));
    return NextResponse.redirect(new URL('/applicant/dashboard', request.url));
  }

  // If the user is trying to access a protected path without a token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based route protection
  if (token) {
    if (path.startsWith('/admin') && token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (path.startsWith('/officer') && token.role !== 'OFFICER') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (path.startsWith('/applicant') && token.role !== 'APPLICANT') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
