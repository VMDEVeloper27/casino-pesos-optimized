import { Hero } from '@/components/layout/HeroNoAnimations';
import { CasinoCard } from '@/components/casino/CasinoCardLight';
import { getAllCasinos } from '@/lib/casino-database';
import { ChevronRight, Gift } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { casinoRelatedContent } from '@/components/ui/RelatedContentLight';

// Lazy load non-critical components
const RelatedContent = dynamic(
  () => import('@/components/ui/RelatedContentLight').then(mod => ({ default: mod.RelatedContentLight })),
  { 
    loading: () => <div className="animate-pulse bg-gray-200 h-48 rounded-lg" />,
    ssr: true 
  }
);

const FAQStructuredData = dynamic(
  () => import('@/components/StructuredData').then(mod => ({ default: mod.FAQStructuredData })),
  { ssr: true }
);

const WebsiteStructuredData = dynamic(
  () => import('@/components/StructuredData').then(mod => ({ default: mod.WebsiteStructuredData })),
  { ssr: true }
);

import { getCanonicalUrl } from '@/lib/canonical';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  if (locale === 'es') {
    return {
      title: 'Mejores Casinos Online México 2025 | Pesos Mexicanos | CasinosPesos',
      description: 'Descubre los mejores casinos online que aceptan pesos mexicanos ⭐ Bonos hasta $50,000 MXN ✅ OXXO, SPEI, PayPal ✅ Retiros rápidos ✅ Guías expertas',
      keywords: 'casinos online méxico, casino pesos mexicanos, mejores casinos mexico, casino online seguro méxico, bonos casino méxico, casino OXXO, casino PayPal méxico',
      alternates: {
        canonical: getCanonicalUrl('/', locale),
      },
      openGraph: {
        title: 'Mejores Casinos Online México 2025 | Bonos hasta $50,000 MXN',
        description: 'Los casinos online más seguros de México. Bonos exclusivos, pagos con OXXO y retiros rápidos.',
        url: 'https://www.casinospesos.com/es',
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Mejores Casinos Online México'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Mejores Casinos Online México 2025',
        description: 'Bonos exclusivos hasta $50,000 MXN en los casinos más seguros',
      },
      alternates: {
        canonical: 'https://www.casinospesos.com/es',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es',
          'en-US': 'https://www.casinospesos.com/en',
          'x-default': 'https://www.casinospesos.com/es'
        }
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  }
  
  // English version
  return {
    title: 'Best Online Casinos Mexico 2025 | Mexican Pesos | CasinosPesos',
    description: 'Discover the best online casinos accepting Mexican pesos ⭐ Bonuses up to $50,000 MXN ✅ OXXO, SPEI, PayPal ✅ Fast withdrawals ✅ Expert guides',
    keywords: 'online casinos mexico, mexican peso casino, best casinos mexico, secure online casino mexico, casino bonuses mexico',
    openGraph: {
      title: 'Best Online Casinos Mexico 2025 | Bonuses up to $50,000 MXN',
      description: 'The safest online casinos in Mexico. Exclusive bonuses, OXXO payments and fast withdrawals.',
      url: 'https://www.casinospesos.com/en',
      siteName: 'CasinosPesos',
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.casinospesos.com/en',
      languages: {
        'es-MX': 'https://www.casinospesos.com/es',
        'en-US': 'https://www.casinospesos.com/en',
        'x-default': 'https://www.casinospesos.com/es'
      }
    }
  }
}

// Lazy load heavy comparison table
const CasinoComparisonTable = dynamic(
  () => import('@/components/casino/CasinoComparisonTableLight').then(mod => ({ default: mod.CasinoComparisonTableLight })),
  {
    loading: () => (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando comparación...</p>
        </div>
      </div>
    )
  }
);

type PageParams = Promise<{ locale: string }>;

interface HomePageProps {
  params: PageParams;
}

// Generate static params for locales
export async function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
  ];
}

// Revalidate every hour
export const revalidate = 3600;

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  // Fetch casinos from database
  const casinos = await getAllCasinos();
  
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Featured Casinos */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Casinos Destacados del Mes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estos casinos han demostrado excelencia en seguridad, variedad de juegos y rapidez en pagos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-stretch">
          {casinos.slice(0, 6).map((casino, index) => (
            <CasinoCard 
              key={casino.id} 
              casino={casino} 
              featured={casino.id === '1'}
              locale={locale}
              index={index}
            />
          ))}
        </div>

        {/* View More Casinos Button */}
        <div className="text-center mb-16">
          <a 
            href={`/${locale}/casinos`}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[56px]"
          >
            <span className="text-xl">🎰</span>
            Ver Todos los Casinos
            <span className="text-xl">→</span>
          </a>
        </div>

        {/* Comparison Table - Lazy loaded */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Compara Todos los Casinos
          </h2>
          <CasinoComparisonTable 
            casinos={casinos}
            locale={locale}
          />
          
          {/* Big Compare Button */}
          <div className="text-center mt-8">
            <Link 
              href={`/${locale}/comparar`}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 min-h-[64px]"
            >
              <span className="text-xl">⚖️</span>
              {locale === 'es' ? 'Ver Comparación Completa' : 'View Full Comparison'}
              <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
        
        {/* Related Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <RelatedContent 
              title={locale === 'es' ? 'Contenido Destacado' : 'Featured Content'}
              items={casinoRelatedContent(locale)}
              locale={locale}
            />
          </div>
          <div>
            <RelatedContent 
              title={locale === 'es' ? 'Guías Populares' : 'Popular Guides'}
              items={[
                {
                  title: locale === 'es' ? 'Cómo Elegir un Casino' : 'How to Choose a Casino',
                  href: `/${locale}/guias/como-elegir-casino`,
                  description: locale === 'es' ? 'Factores clave a considerar' : 'Key factors to consider'
                },
                {
                  title: locale === 'es' ? 'Estrategias de Blackjack' : 'Blackjack Strategies',
                  href: `/${locale}/guias/estrategias-blackjack`,
                  description: locale === 'es' ? 'Mejora tus probabilidades' : 'Improve your odds'
                },
                {
                  title: locale === 'es' ? 'Slots con Mejor RTP' : 'Best RTP Slots',
                  href: `/${locale}/guias/mejores-rtp-slots`,
                  description: locale === 'es' ? 'Máquinas con mayor retorno' : 'Highest return machines'
                }
              ]}
              locale={locale}
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 border-y border-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por Qué Confiar en CasinosPesos?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Seguros</h3>
              <p className="text-sm text-gray-600">Solo casinos con licencias válidas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Bonos Exclusivos</h3>
              <p className="text-sm text-gray-600">Ofertas negociadas para ti</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pagos Rápidos</h3>
              <p className="text-sm text-gray-600">Retiros en 24-48 horas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expertos Locales</h3>
              <p className="text-sm text-gray-600">Conocemos tu mercado</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes sobre Casinos Online en México
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ¿Es legal jugar en casinos online desde México?
              </h3>
              <p className="text-gray-600">
                Sí, es completamente legal para mexicanos jugar en casinos online con licencia internacional. 
                La legislación mexicana no prohíbe a los ciudadanos acceder a estos sitios.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ¿Qué casinos aceptan depósitos con OXXO?
              </h3>
              <p className="text-gray-600">
                Los mejores casinos como Bet365, Codere y Strendus aceptan depósitos en OXXO. 
                Puedes depositar efectivo en cualquiera de las +19,000 tiendas OXXO del país.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ¿Cuánto tiempo tardan los retiros en pesos mexicanos?
              </h3>
              <p className="text-gray-600">
                Los retiros varían desde 2 horas (PayPal, Skrill) hasta 5 días (transferencia bancaria). 
                Los casinos top procesan retiros en menos de 24 horas.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ¿Son seguras las transacciones en casinos online mexicanos?
              </h3>
              <p className="text-gray-600">
                Totalmente seguras. Los casinos recomendados usan encriptación SSL de nivel bancario 
                y segregan fondos de jugadores. Tus depósitos están protegidos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para Empezar a Ganar?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de jugadores que ya disfrutan de los mejores casinos online en pesos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/es/casinos"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-5 rounded-xl font-bold text-lg transform hover:scale-105 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3 min-h-[64px]"
            >
              <span className="text-xl">🎰</span>
              Explorar Casinos 
              <ChevronRight className="w-6 h-6" />
            </Link>
            <Link
              href="/es/bonos"
              className="bg-white hover:bg-gray-50 text-gray-900 px-10 py-5 rounded-xl font-bold text-lg border-2 border-gray-200 hover:border-primary-200 transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-3 min-h-[64px]"
            >
              <Gift className="w-6 h-6 text-red-500" />
              Comparar Bonos
              <span className="text-xl">🎁</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Structured Data */}
      <WebsiteStructuredData />
      <FAQStructuredData faqs={[
        {
          question: "¿Es legal jugar en casinos online desde México?",
          answer: "Sí, es completamente legal para mexicanos jugar en casinos online con licencia internacional. La legislación mexicana no prohíbe a los ciudadanos acceder a estos sitios."
        },
        {
          question: "¿Qué casinos aceptan depósitos con OXXO?",
          answer: "Los mejores casinos como Bet365, Codere y Strendus aceptan depósitos en OXXO. Puedes depositar efectivo en cualquiera de las +19,000 tiendas OXXO del país."
        },
        {
          question: "¿Cuánto tiempo tardan los retiros en pesos mexicanos?",
          answer: "Los retiros varían desde 2 horas (PayPal, Skrill) hasta 5 días (transferencia bancaria). Los casinos top procesan retiros en menos de 24 horas."
        },
        {
          question: "¿Son seguras las transacciones en casinos online mexicanos?",
          answer: "Totalmente seguras. Los casinos recomendados usan encriptación SSL de nivel bancario y segregan fondos de jugadores. Tus depósitos están protegidos."
        }
      ]} />
    </main>
  );
}