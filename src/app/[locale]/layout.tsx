import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import Footer from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CountryProvider } from '@/contexts/CountryContext';
import { FacebookPixel, GoogleAnalytics, Hotjar } from '@/components/Analytics';
import ClientSessionProvider from '@/components/providers/ClientSessionProvider';
import CookieConsent from '@/components/CookieConsent';
import GoogleAnalyticsScript from '@/components/GoogleAnalyticsScript';
import { ClientOptimizations } from '@/components/ClientOptimizations';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Prevent font blocking
  preload: true,
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap', // Prevent font blocking
  preload: true,
});

export const metadata: Metadata = {
  title: 'CasinosPesos - Mejores Casinos Online en Pesos 2025',
  description: 'Descubre los mejores casinos online que aceptan pesos mexicanos, argentinos y colombianos. Bonos exclusivos, guías expertas y reseñas honestas.',
  alternates: {
    types: {
      'application/rss+xml': '/rss',
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch {
    notFound();
  }

  return (
    <html lang={locale} className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="c16NUc0-PNfYe9xdpmPcsxHyw_Csh9OyYxBBGFJy2KI" />
        
        {/* Favicons and Web App */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#059669" />
        
        {/* Resource Hints for Performance - Optimized Order */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Critical CSS - Inline for faster rendering */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
          .skip-to-main { position: absolute; left: -9999px; }
          .skip-to-main:focus { left: 0; top: 0; z-index: 999; }
          /* Prevent layout shift for header */
          header { min-height: 64px; }
          /* Optimize font loading */
          .font-inter { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
          .font-poppins { font-family: 'Poppins', system-ui, -apple-system, sans-serif; }
          /* Reduce CLS for images */
          img { max-width: 100%; height: auto; }
          /* Smooth loading transitions */
          * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        `}} />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="author" content="CasinosPesos" />
        <meta name="publisher" content="CasinosPesos" />
        <meta name="copyright" content="© 2025 CasinosPesos. Todos los derechos reservados." />
        <meta name="rating" content="adult" />
        <meta name="distribution" content="global" />
        <meta name="language" content={locale === 'es' ? 'Spanish' : 'English'} />
        <meta name="geo.region" content="MX" />
        <meta name="geo.placename" content="Mexico" />
        <meta name="twitter:site" content="@casinospesos" />
        <meta name="twitter:creator" content="@casinospesos" />
        <link rel="alternate" hrefLang="es-MX" href="https://casinospesos.com/es" />
        <link rel="alternate" hrefLang="en-US" href="https://casinospesos.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://casinospesos.com/es" />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        {/* Skip to main content link for screen readers */}
        <a href="#main-content" className="skip-to-main">
          {locale === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
        </a>
        
        {/* Client-side optimizations */}
        <ClientOptimizations />
        
        {/* Google Analytics */}
        <GoogleAnalyticsScript />
        
        {/* Other Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID} />
        )}
        {process.env.NEXT_PUBLIC_HOTJAR_ID && process.env.NEXT_PUBLIC_HOTJAR_SV && (
          <Hotjar 
            hjid={parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID)} 
            hjsv={parseInt(process.env.NEXT_PUBLIC_HOTJAR_SV)} 
          />
        )}
        
        <ClientSessionProvider>
          <CountryProvider initialLocale={locale}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {/* Professional Header - Matching Your Reference Design */}
              <ProfessionalHeader locale={locale} />
              
              {/* Breadcrumbs */}
              <Breadcrumbs />

              {/* Main Content */}
              <main id="main-content" className="min-h-screen" role="main">
                {children}
              </main>

              {/* Footer */}
              <Footer />
              
              {/* Cookie Consent Banner */}
              <CookieConsent />
            </NextIntlClientProvider>
          </CountryProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}