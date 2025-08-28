import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always' // Changed to always show locale in URL
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for API routes, static files, and sitemap
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('/favicon') ||
    pathname.includes('/site.webmanifest') ||
    pathname.includes('/robots.txt') ||
    pathname.includes('/sitemap.xml') ||
    pathname.includes('/rss') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|woff|woff2|ttf|otf)$/i)
  ) {
    return NextResponse.next();
  }
  
  // Extract locale from pathname or use default
  const localeMatch = pathname.match(/^\/(es|en)/);
  const locale = localeMatch ? localeMatch[1] : 'es';
  const hasLocalePrefix = localeMatch !== null;
  
  // Redirect root path to default locale with 301 permanent redirect
  if (pathname === '/') {
    const response = NextResponse.redirect(new URL('/es', request.url), 301);
    return response;
  }
  
  // Protected routes that require authentication
  const protectedRoutes = [
    `/${locale}/dashboard`,
  ];
  
  // Admin routes that require admin or editor role
  const adminRoutes = [
    `/${locale}/admin`,
    '/admin',  // Handle /admin without locale
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
  
  // Check admin access - redirect to login if not authenticated
  if (isAdminRoute || pathname === '/admin') {
    if (!token) {
      // Always redirect to /es/auth/signin for consistency
      const signInUrl = new URL(request.url);
      signInUrl.pathname = '/es/auth/signin';
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
    
    // Check if user has admin or editor role
    const userRole = token.role as string;
    console.log('Admin route access - User role:', userRole, 'Token:', token);
    
    if (userRole !== 'admin' && userRole !== 'editor') {
      // Redirect to home if user doesn't have permission
      console.log('Access denied - user role is:', userRole);
      const homeUrl = new URL(request.url);
      homeUrl.pathname = `/${locale}`;
      return NextResponse.redirect(homeUrl);
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
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)  
     * - favicon.ico (favicon file)
     * - site.webmanifest (PWA manifest)
     * - robots.txt (SEO file)
     * - sitemap.xml (SEO sitemap)
     * - rss (RSS feed)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest|robots.txt|sitemap.xml|rss).*)'
  ]
};