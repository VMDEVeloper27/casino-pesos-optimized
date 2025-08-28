import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Block Cloudflare email decode script
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net;
    script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net;
    frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
  `.replace(/\n/g, ' ').trim();
  
  response.headers.set('Content-Security-Policy', cspHeader);
  
  // Performance headers
  response.headers.set('X-Robots-Tag', 'index, follow');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Disable Cloudflare email obfuscation
  response.headers.set('CF-Email-Decode', 'false');
  
  // Cache control for pages (not assets)
  if (!request.nextUrl.pathname.startsWith('/_next/') && 
      !request.nextUrl.pathname.includes('.')) {
    response.headers.set('Cache-Control', 's-maxage=10, stale-while-revalidate=59');
  }
  
  return response;
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