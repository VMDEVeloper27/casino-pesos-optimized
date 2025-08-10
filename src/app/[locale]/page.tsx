import { Hero } from '@/components/layout/Hero';
import { CasinoCard } from '@/components/casino/CasinoCard';
import { FAQStructuredData, WebsiteStructuredData } from '@/components/StructuredData';
import { getAllCasinos } from '@/lib/casino-database';
import dynamic from 'next/dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  if (locale === 'es') {
    return {
      title: 'Mejores Casinos Online México 2024 | Pesos Mexicanos | CasinosPesos',
      description: 'Descubre los mejores casinos online que aceptan pesos mexicanos ⭐ Bonos hasta $50,000 MXN ✅ OXXO, SPEI, PayPal ✅ Retiros rápidos ✅ Guías expertas',
      keywords: 'casinos online méxico, casino pesos mexicanos, mejores casinos mexico, casino online seguro méxico, bonos casino méxico, casino OXXO, casino PayPal méxico',
      openGraph: {
        title: 'Mejores Casinos Online México 2024 | Bonos hasta $50,000 MXN',
        description: 'Los casinos online más seguros de México. Bonos exclusivos, pagos con OXXO y retiros rápidos.',
        url: 'https://casinospesos.com/es',
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: 'https://casinospesos.com/images/og-homepage-es.jpg',
          width: 1200,
          height: 630,
          alt: 'Mejores Casinos Online México'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Mejores Casinos Online México 2024',
        description: 'Bonos exclusivos hasta $50,000 MXN en los casinos más seguros',
      },
      alternates: {
        canonical: 'https://casinospesos.com/es',
        languages: {
          'es-MX': 'https://casinospesos.com/es',
          'en-US': 'https://casinospesos.com/en',
          'x-default': 'https://casinospesos.com/es'
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
    title: 'Best Online Casinos Mexico 2024 | Mexican Pesos | CasinosPesos',
    description: 'Discover the best online casinos accepting Mexican pesos ⭐ Bonuses up to $50,000 MXN ✅ OXXO, SPEI, PayPal ✅ Fast withdrawals ✅ Expert guides',
    keywords: 'online casinos mexico, mexican peso casino, best casinos mexico, secure online casino mexico, casino bonuses mexico',
    openGraph: {
      title: 'Best Online Casinos Mexico 2024 | Bonuses up to $50,000 MXN',
      description: 'The safest online casinos in Mexico. Exclusive bonuses, OXXO payments and fast withdrawals.',
      url: 'https://casinospesos.com/en',
      siteName: 'CasinosPesos',
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: 'https://casinospesos.com/en',
      languages: {
        'es-MX': 'https://casinospesos.com/es',
        'en-US': 'https://casinospesos.com/en',
        'x-default': 'https://casinospesos.com/es'
      }
    }
  }
}

// Lazy load heavy comparison table
const CasinoComparisonTable = dynamic(
  () => import('@/components/casino/CasinoComparisonTable').then(mod => ({ default: mod.CasinoComparisonTable })),
  {
    loading: () => (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-400">Cargando comparación...</p>
        </div>
      </div>
    )
  }
);

type PageParams = Promise<{ locale: string }>;

interface HomePageProps {
  params: PageParams;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  // Fetch casinos from database
  const casinos = await getAllCasinos();
  
  return (
    <main className="min-h-screen bg-slate-800">
      {/* Hero Section */}
      <Hero />

      {/* Featured Casinos */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Casinos Destacados del Mes
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Estos casinos han demostrado excelencia en seguridad, variedad de juegos y rapidez en pagos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-stretch">
          {casinos.slice(0, 6).map((casino) => (
            <CasinoCard 
              key={casino.id} 
              casino={casino} 
              featured={casino.id === '1'}
              locale={locale}
            />
          ))}
        </div>

        {/* View More Casinos Button */}
        <div className="text-center mb-16">
          <a 
            href={`/${locale}/casinos`}
            className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            Ver Todos los Casinos
            <span className="text-primary">→</span>
          </a>
        </div>

        {/* Comparison Table - Lazy loaded */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Compara Todos los Casinos
          </h2>
          <CasinoComparisonTable 
            casinos={casinos}
            locale={locale}
          />
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Por Qué Confiar en CasinosPesos?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-white mb-2">100% Seguros</h3>
              <p className="text-sm text-slate-400">Solo casinos con licencias válidas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Bonos Exclusivos</h3>
              <p className="text-sm text-slate-400">Ofertas negociadas para ti</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Pagos Rápidos</h3>
              <p className="text-sm text-slate-400">Retiros en 24-48 horas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Expertos Locales</h3>
              <p className="text-sm text-slate-400">Conocemos tu mercado</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Preguntas Frecuentes sobre Casinos Online en México
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-xl p-6 mb-4">
              <h3 className="text-xl font-semibold text-white mb-3">
                ¿Es legal jugar en casinos online desde México?
              </h3>
              <p className="text-slate-300">
                Sí, es completamente legal para mexicanos jugar en casinos online con licencia internacional. 
                La legislación mexicana no prohíbe a los ciudadanos acceder a estos sitios.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 mb-4">
              <h3 className="text-xl font-semibold text-white mb-3">
                ¿Qué casinos aceptan depósitos con OXXO?
              </h3>
              <p className="text-slate-300">
                Los mejores casinos como Bet365, Codere y Strendus aceptan depósitos en OXXO. 
                Puedes depositar efectivo en cualquiera de las +19,000 tiendas OXXO del país.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 mb-4">
              <h3 className="text-xl font-semibold text-white mb-3">
                ¿Cuánto tiempo tardan los retiros en pesos mexicanos?
              </h3>
              <p className="text-slate-300">
                Los retiros varían desde 2 horas (PayPal, Skrill) hasta 5 días (transferencia bancaria). 
                Los casinos top procesan retiros en menos de 24 horas.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 mb-4">
              <h3 className="text-xl font-semibold text-white mb-3">
                ¿Son seguras las transacciones en casinos online mexicanos?
              </h3>
              <p className="text-slate-300">
                Totalmente seguras. Los casinos recomendados usan encriptación SSL de nivel bancario 
                y segregan fondos de jugadores. Tus depósitos están protegidos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/20 to-accent/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para Empezar a Ganar?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Únete a miles de jugadores que ya disfrutan de los mejores casinos online en pesos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-primary to-accent text-black px-8 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-transform">
              Explorar Casinos →
            </button>
            <button className="bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg border border-slate-600 hover:bg-slate-600 transition-colors">
              Comparar Bonos 🎁
            </button>
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