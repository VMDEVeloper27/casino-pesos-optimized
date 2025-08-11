import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CountryProvider } from '@/contexts/CountryContext';
import { FacebookPixel, GoogleAnalytics, Hotjar } from '@/components/Analytics';
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
  title: 'CasinosPesos - Mejores Casinos Online en Pesos 2024',
  description: 'Descubre los mejores casinos online que aceptan pesos mexicanos, argentinos y colombianos. Bonos exclusivos, guías expertas y reseñas honestas.',
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
        <meta name="copyright" content="© 2024 CasinosPesos. Todos los derechos reservados." />
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
        {/* Analytics */}
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
            <footer className="bg-gray-100 border-t border-gray-200 mt-8 sm:mt-12 md:mt-16">
              <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
                {/* Mobile-first responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {/* Brand Section - Full width on mobile */}
                  <div className="col-span-1 sm:col-span-2 lg:col-span-1 text-center sm:text-left">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">CasinosPesos</h3>
                    <p className="text-sm text-gray-600 max-w-md mx-auto sm:mx-0">
                      Tu guía confiable para ganar en pesos. Encuentra los mejores casinos online de América Latina.
                    </p>
                  </div>
                  
                  {/* Casinos Section */}
                  <div className="text-center sm:text-left">
                    <h4 className="font-semibold text-gray-900 mb-3 text-base">Casinos</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href={`/${locale}/casinos`} 
                           className="text-gray-600 hover:text-primary-600 transition-colors inline-block py-1">
                          Todos los Casinos
                        </a>
                      </li>
                      <li>
                        <a href={`/${locale}/casinos/nuevos`} 
                           className="text-gray-600 hover:text-primary-600 transition-colors inline-block py-1">
                          Nuevos Casinos
                        </a>
                      </li>
                      <li>
                        <a href={`/${locale}/casinos/movil`} 
                           className="text-gray-600 hover:text-primary-600 transition-colors inline-block py-1">
                          Casinos Móviles
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Bonos Section */}
                  <div className="text-center sm:text-left">
                    <h4 className="font-semibold text-gray-900 mb-3 text-base">Bonos</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href={`/${locale}/bonos/sin-deposito`} 
                           className="text-gray-600 hover:text-primary-600 transition-colors inline-block py-1">
                          Sin Depósito
                        </a>
                      </li>
                      <li>
                        <a href={`/${locale}/bonos/bienvenida`} 
                           className="text-gray-600 hover:text-primary-600 transition-colors inline-block py-1">
                          Bienvenida
                        </a>
                      </li>
                      <li>
                        <a href={`/${locale}/bonos/giros-gratis`} 
                           className="text-gray-600 hover:text-primary-600 transition-colors inline-block py-1">
                          Giros Gratis
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Information Section */}
                  <div className="text-center sm:text-left">
                    <h4 className="font-semibold text-gray-900 mb-3 text-base">Información</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href={`/${locale}/blog`} 
                           className="text-gray-600 hover:text-primary-600 transition-colors inline-block py-1">
                          Blog
                        </a>
                      </li>
                      <li>
                        <a href={`/${locale}/sobre-nosotros`} 
                           className="text-gray-600 hover:text-primary-600 transition-colors inline-block py-1">
                          Sobre Nosotros
                        </a>
                      </li>
                      <li>
                        <a href={`/${locale}/juego-responsable`} 
                           className="text-gray-600 hover:text-primary-600 transition-colors inline-block py-1">
                          Juego Responsable
                        </a>
                      </li>
                      <li>
                        <a href={`/${locale}/contacto`} 
                           className="text-gray-600 hover:text-primary-600 transition-colors inline-block py-1">
                          Contacto
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Copyright Section - Always centered */}
                <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
                  <p className="text-xs sm:text-sm text-gray-500 px-4">
                    © 2024 CasinosPesos. Todos los derechos reservados.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Juega responsablemente. 18+
                  </p>
                </div>
              </div>
            </footer>
          </NextIntlClientProvider>
        </CountryProvider>
      </body>
    </html>
  );
}