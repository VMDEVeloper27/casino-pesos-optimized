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
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
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
        <meta name="google-site-verification" content="itbx4DQrpNjRzsHSWh93F_KFA5WotzNWiES1IM1Uc0o" />
        
        {/* Favicons and Web App */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#059669" />
        
        {/* Resource Hints for Performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
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
              <div className="min-h-screen">
                {children}
              </div>

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