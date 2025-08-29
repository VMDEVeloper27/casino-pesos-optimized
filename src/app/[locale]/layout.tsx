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
        
        {/* Critical Preconnect Hints - Desktop Performance Optimization */}
        {/* Fonts now loaded locally, no need for Google Fonts preconnect */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS Prefetch for secondary resources */}
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        
        {/* Fonts are now loaded locally via next/font/google - no external requests needed */}
        
        {/* Aggressive Cloudflare email-decode blocking */}
        <meta httpEquiv="cf-email-decode" content="false" />
        <meta name="cf-no-email-decode" content="true" />
        <script dangerouslySetInnerHTML={{ __html: `
          // Block Cloudflare email decode immediately
          if (typeof window !== 'undefined') {
            Object.defineProperty(window, 'CloudFlare', {
              value: undefined,
              writable: false,
              configurable: false
            });
            // Prevent script injection
            const originalAppendChild = Node.prototype.appendChild;
            Node.prototype.appendChild = function(child) {
              if (child && child.src && child.src.includes('email-decode')) {
                return child;
              }
              return originalAppendChild.call(this, child);
            };
          }
        `}} />
        
        {/* Critical CSS - Inline for faster rendering */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Reset and base styles */
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { 
            margin: 0; 
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased; 
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Skip link for accessibility */
          .skip-to-main { 
            position: absolute; 
            left: -10000px; 
            top: auto; 
            width: 1px; 
            height: 1px; 
            overflow: hidden; 
          }
          .skip-to-main:focus { 
            position: static; 
            width: auto; 
            height: auto; 
            padding: 8px 16px;
            background: #059669; 
            color: white; 
            text-decoration: none;
            z-index: 1000; 
          }
          
          /* Prevent layout shift */
          header { min-height: 64px; }
          main { min-height: 70vh; }
          
          /* Font optimization */
          .font-inter { font-family: 'Inter', system-ui, sans-serif; }
          .font-poppins { font-family: 'Poppins', system-ui, sans-serif; }
          
          /* Performance optimizations */
          img, picture, video, canvas, svg { max-width: 100%; height: auto; display: block; }
          
          /* Loading states */
          .loading { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
          
          /* Critical color utilities for immediate paint */
          .text-green-700 { color: rgb(21 128 61); }
          .text-green-600 { color: rgb(22 163 74); }
          .bg-green-700 { background-color: rgb(21 128 61); }
          .bg-green-600 { background-color: rgb(22 163 74); }
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