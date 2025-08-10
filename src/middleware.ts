import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)']
};