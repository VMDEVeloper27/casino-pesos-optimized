import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MobileNav } from '@/components/ui/MobileNav';
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
      <body className="bg-gray-100 text-primary-500 font-sans antialiased">
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
        
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Header/Navigation */}
          <header className="bg-white border-b border-accent-300 sticky top-0 z-40 shadow-soft">
            <div className="container mx-auto px-4">
              <div className="hidden lg:flex items-center justify-between py-4">
                {/* Desktop Navigation */}
                <nav className="flex items-center gap-8">
                  <a href={`/${locale}`} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">C</span>
                    </div>
                    <span className="font-bold text-xl text-primary-500">CasinosPesos</span>
                  </a>
                  <a href={`/${locale}/casinos`} className="text-secondary-400 hover:text-primary-500 transition-colors font-medium">
                    Casinos
                  </a>
                  <a href={`/${locale}/bonos`} className="text-secondary-400 hover:text-primary-500 transition-colors font-medium">
                    Bonos
                  </a>
                  <a href={`/${locale}/guias`} className="text-secondary-400 hover:text-primary-500 transition-colors font-medium">
                    Guías
                  </a>
                  <a href={`/${locale}/comparar`} className="text-secondary-400 hover:text-primary-500 transition-colors font-medium">
                    Comparar
                  </a>
                  <a href={`/${locale}/blog`} className="text-secondary-400 hover:text-primary-500 transition-colors font-medium">
                    Blog
                  </a>
                </nav>
                <div className="flex items-center gap-4">
                  <button className="btn-primary px-6 py-2 rounded-lg font-semibold">
                    {locale === 'es' ? 'Registrarse' : 'Sign Up'}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Navigation */}
          <MobileNav locale={locale} />

          {/* Main Content */}
          <div className="lg:pt-0 pt-[73px] pb-[73px] lg:pb-0">
            {children}
          </div>

          {/* Footer */}
          <footer className="bg-neutral-800 border-t border-neutral-700 mt-16">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-semibold text-white mb-4">CasinosPesos</h3>
                  <p className="text-sm text-neutral-400">
                    Tu guía confiable para ganar en pesos. Encuentra los mejores casinos online de América Latina.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Casinos</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href={`/${locale}/casinos`} className="text-neutral-400 hover:text-white">Todos los Casinos</a></li>
                    <li><a href={`/${locale}/casinos/nuevos`} className="text-neutral-400 hover:text-white">Nuevos Casinos</a></li>
                    <li><a href={`/${locale}/casinos/movil`} className="text-neutral-400 hover:text-white">Casinos Móviles</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Bonos</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href={`/${locale}/bonos/sin-deposito`} className="text-neutral-400 hover:text-white">Sin Depósito</a></li>
                    <li><a href={`/${locale}/bonos/bienvenida`} className="text-neutral-400 hover:text-white">Bienvenida</a></li>
                    <li><a href={`/${locale}/bonos/giros-gratis`} className="text-neutral-400 hover:text-white">Giros Gratis</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Información</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href={`/${locale}/blog`} className="text-neutral-400 hover:text-white">Blog</a></li>
                    <li><a href={`/${locale}/sobre-nosotros`} className="text-neutral-400 hover:text-white">Sobre Nosotros</a></li>
                    <li><a href={`/${locale}/juego-responsable`} className="text-neutral-400 hover:text-white">Juego Responsable</a></li>
                    <li><a href={`/${locale}/contacto`} className="text-neutral-400 hover:text-white">Contacto</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-sm text-neutral-500">
                <p>© 2024 CasinosPesos. Todos los derechos reservados. Juega responsablemente. 18+</p>
              </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}