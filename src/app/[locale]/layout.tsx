import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
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
      <body className="bg-slate-800 text-white font-sans antialiased">
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

            {/* Main Content */}
            <div className="min-h-screen">
              {children}
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-700 mt-16">
              <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-semibold text-white mb-4">CasinosPesos</h3>
                    <p className="text-sm text-slate-400">
                      Tu guía confiable para ganar en pesos. Encuentra los mejores casinos online de América Latina.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-4">Casinos</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href={`/${locale}/casinos`} className="text-slate-400 hover:text-white">Todos los Casinos</a></li>
                      <li><a href={`/${locale}/casinos/nuevos`} className="text-slate-400 hover:text-white">Nuevos Casinos</a></li>
                      <li><a href={`/${locale}/casinos/movil`} className="text-slate-400 hover:text-white">Casinos Móviles</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-4">Bonos</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href={`/${locale}/bonos/sin-deposito`} className="text-slate-400 hover:text-white">Sin Depósito</a></li>
                      <li><a href={`/${locale}/bonos/bienvenida`} className="text-slate-400 hover:text-white">Bienvenida</a></li>
                      <li><a href={`/${locale}/bonos/giros-gratis`} className="text-slate-400 hover:text-white">Giros Gratis</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-4">Información</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href={`/${locale}/blog`} className="text-slate-400 hover:text-white">Blog</a></li>
                      <li><a href={`/${locale}/sobre-nosotros`} className="text-slate-400 hover:text-white">Sobre Nosotros</a></li>
                      <li><a href={`/${locale}/juego-responsable`} className="text-slate-400 hover:text-white">Juego Responsable</a></li>
                      <li><a href={`/${locale}/contacto`} className="text-slate-400 hover:text-white">Contacto</a></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-500">
                  <p>© 2024 CasinosPesos. Todos los derechos reservados. Juega responsablemente. 18+</p>
                </div>
              </div>
            </footer>
          </NextIntlClientProvider>
        </CountryProvider>
      </body>
    </html>
  );
}