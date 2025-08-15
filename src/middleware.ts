import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed'
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/(es|en)/);
  const locale = localeMatch ? localeMatch[1] : 'es';
  
  // Protected routes that require authentication
  const protectedRoutes = [
    `/${locale}/dashboard`,
  ];
  
  // Admin routes that require admin or editor role
  const adminRoutes = [
    '/admin',
  ];
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  
  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // Redirect to signin if accessing protected route without authentication
  if (isProtectedRoute && !token) {
    const signInUrl = new URL(`/${locale}/auth/signin`, request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  // Check admin access
  if (isAdminRoute) {
    if (!token) {
      const signInUrl = new URL(`/es/auth/signin`, request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
    
    // Check if user has admin or editor role
    const userRole = token.role as string;
    console.log('Admin route access - User role:', userRole, 'Token:', token);
    
    if (userRole !== 'admin' && userRole !== 'editor') {
      // Redirect to home if user doesn't have permission
      console.log('Access denied - user role is:', userRole);
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
    
    // Admin routes should not go through intl middleware
    return NextResponse.next();
  }
  
  // Redirect authenticated users away from auth pages
  const authRoutes = [
    `/${locale}/auth/signin`,
    `/${locale}/auth/signup`,
  ];
  
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }
  
  // Apply internationalization middleware for non-admin routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};