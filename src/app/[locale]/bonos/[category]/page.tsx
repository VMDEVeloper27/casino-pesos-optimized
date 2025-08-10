import { ArrowLeft, ChevronRight, Info, Star } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbStructuredData, FAQStructuredData } from '@/components/StructuredData';
import type { Metadata } from 'next';
import { getAllCasinos } from '@/lib/casino-database';

interface PageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category } = await params;
  const data = categoryData[category] || categoryData['bienvenida'];
  
  const isSpanish = locale === 'es';
  const baseUrl = 'https://casinospesos.com';
  const pageUrl = `${baseUrl}/${locale}/bonos/${category}`;
  
  if (isSpanish) {
    return {
      title: `${data.title} México 2024 - Ofertas Exclusivas | CasinosPesos`,
      description: `${data.description} ✅ Ofertas verificadas ✅ Sin depósito requerido ✅ Términos claros ✅ Para jugadores mexicanos.`,
      keywords: `${data.title.toLowerCase()}, bonos casino méxico, casino bonos sin depósito, ofertas casino online méxico, ${category} casino`,
      openGraph: {
        title: `${data.title} México 2024 - Ofertas Exclusivas`,
        description: `${data.description} Ofertas verificadas para jugadores mexicanos.`,
        url: pageUrl,
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: `${baseUrl}/images/bonos/${category}.jpg`,
          width: 1200,
          height: 630,
          alt: data.title
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: `${data.title} México 2024`,
        description: `${data.description}`,
      },
      alternates: {
        canonical: pageUrl,
        languages: {
          'es-MX': `${baseUrl}/es/bonos/${category}`,
          'en-US': `${baseUrl}/en/bonuses/${category}`,
          'x-default': `${baseUrl}/es/bonos/${category}`
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
    };
  }
  
  return {
    title: `${data.title} Mexico 2024 - Exclusive Offers | CasinosPesos`,
    description: `${data.description} ✅ Verified offers ✅ No deposit required ✅ Clear terms ✅ For Mexican players.`,
    keywords: `casino bonuses mexico, no deposit bonus mexico, online casino offers mexico, ${category} casino bonus`,
    openGraph: {
      title: `${data.title} Mexico 2024 - Exclusive Offers`,
      description: `${data.description} Verified offers for Mexican players.`,
      url: pageUrl,
      siteName: 'CasinosPesos',
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': `${baseUrl}/es/bonos/${category}`,
        'en-US': `${baseUrl}/en/bonuses/${category}`,
        'x-default': `${baseUrl}/es/bonos/${category}`
      }
    }
  };
}

interface CategoryData {
  title: string;
  description: string;
  icon: string;
  bonusType?: string;
}

const categoryData: Record<string, CategoryData> = {
  'sin-deposito': {
    title: 'Bonos Sin Depósito',
    description: 'Obtén dinero gratis sin necesidad de depositar. Perfectos para probar nuevos casinos.',
    icon: '🎁',
    bonusType: 'no-deposit'
  },
  'bienvenida': {
    title: 'Bonos de Bienvenida',
    description: 'Los mejores bonos para nuevos jugadores. Duplica o triplica tu primer depósito.',
    icon: '🎉',
    bonusType: 'welcome'
  },
  'giros-gratis': {
    title: 'Giros Gratis',
    description: 'Consigue tiradas gratis en las mejores tragamonedas online.',
    icon: '🎰',
    bonusType: 'free-spins'
  },
  'cashback': {
    title: 'Bonos de Cashback',
    description: 'Recupera un porcentaje de tus pérdidas. El seguro perfecto para tu bankroll.',
    icon: '💸',
    bonusType: 'cashback'
  },
  'recarga': {
    title: 'Bonos de Recarga',
    description: 'Bonificaciones en tus siguientes depósitos. Mantén tu cuenta activa con ventajas.',
    icon: '🔄',
    bonusType: 'reload'
  },
  'vip': {
    title: 'Bonos VIP',
    description: 'Ofertas exclusivas para jugadores de alto nivel. Límites más altos y mejores recompensas.',
    icon: '👑',
    bonusType: 'vip'
  }
};

export default async function BonusCategoryPage({ params }: PageProps) {
  const { category, locale } = await params;
  const data = categoryData[category] || categoryData['bienvenida'];
  
  // Fetch casinos from database
  const allCasinos = await getAllCasinos();
  
  // Filter and format bonuses based on category
  let bonuses = [];
  if (category === 'bienvenida' || !categoryData[category]) {
    // Show all welcome bonuses
    bonuses = allCasinos
      .filter(casino => casino.bonus.type === 'welcome')
      .slice(0, 5)
      .map(casino => ({
        id: casino.id,
        casino: casino.name,
        amount: `${casino.bonus.percentage}% hasta $${casino.bonus.amount.toLocaleString()} MXN`,
        extra: casino.bonus.freeSpins ? `+ ${casino.bonus.freeSpins} Giros Gratis` : undefined,
        code: casino.bonus.code,
        rollover: `${casino.bonus.wageringRequirement}x`,
        minDeposit: casino.bonus.minDeposit,
        rating: casino.rating,
        slug: casino.slug
      }));
  } else if (category === 'giros-gratis') {
    // Show casinos with free spins
    bonuses = allCasinos
      .filter(casino => casino.bonus.freeSpins && casino.bonus.freeSpins > 0)
      .slice(0, 5)
      .map(casino => ({
        id: casino.id,
        casino: casino.name,
        amount: `${casino.bonus.freeSpins} Giros Gratis`,
        extra: `En slots populares`,
        code: casino.bonus.code,
        rollover: `${casino.bonus.wageringRequirement}x`,
        minDeposit: casino.bonus.minDeposit,
        rating: casino.rating,
        slug: casino.slug
      }));
  } else {
    // For other categories, show top casinos with custom formatting
    bonuses = allCasinos
      .slice(0, 5)
      .map(casino => ({
        id: casino.id,
        casino: casino.name,
        amount: category === 'cashback' ? '20% Cashback' : 
                category === 'vip' ? 'Hasta $100,000 MXN' :
                `${casino.bonus.percentage}% hasta $${casino.bonus.amount.toLocaleString()} MXN`,
        extra: category === 'cashback' ? 'Semanal' : 
               category === 'vip' ? 'Programa exclusivo' :
               casino.bonus.freeSpins ? `+ ${casino.bonus.freeSpins} Giros Gratis` : undefined,
        code: casino.bonus.code,
        rollover: `${casino.bonus.wageringRequirement}x`,
        minDeposit: casino.bonus.minDeposit,
        rating: casino.rating,
        slug: casino.slug
      }));
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-gray-900 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/${locale}/bonos`} className="hover:text-gray-900 transition-colors">
            Bonos
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{data.title}</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{data.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href={`/${locale}/bonos`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a todos los bonos
          </Link>
        </div>

        {/* Bonuses List */}
        <div className="space-y-6">
          {bonuses.map((bonus: any) => (
            <div
              key={bonus.id}
              className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="grid lg:grid-cols-[200px,1fr,250px] gap-6">
                {/* Casino Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{bonus.casino}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(bonus.rating)
                            ? 'fill-primary text-primary'
                            : 'text-neutral-600'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({bonus.rating})</span>
                  </div>
                </div>

                {/* Bonus Details */}
                <div>
                  <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-4 mb-4 border border-primary/30">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{bonus.amount}</div>
                    {bonus.extra && (
                      <div className="text-sm text-green-600">{bonus.extra}</div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Rollover:</span>
                      <span className="text-gray-900 font-semibold ml-2">{bonus.rollover}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Depósito Mín:</span>
                      <span className="text-gray-900 font-semibold ml-2">
                        {bonus.minDeposit === 0 ? 'Gratis' : `$${bonus.minDeposit} MXN`}
                      </span>
                    </div>
                    {bonus.code && (
                      <div>
                        <span className="text-gray-400">Código:</span>
                        <span className="text-primary font-mono font-bold ml-2">{bonus.code}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105">
                    Reclamar Bono
                  </button>
                  <Link 
                    href={`/${locale}/casinos/${bonus.slug}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-xl font-semibold text-center transition-colors"
                  >
                    Ver Casino
                  </Link>
                  <button className="text-gray-500 hover:text-gray-900 text-sm flex items-center justify-center gap-1 transition-colors">
                    <Info className="w-4 h-4" />
                    Términos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ℹ️ Sobre {data.title}
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-600">
              {data.description} Recuerda siempre leer los términos y condiciones antes de 
              reclamar cualquier bono. Los requisitos de apuesta y las restricciones pueden 
              variar considerablemente entre casinos.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Ventajas</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Aumentan tu bankroll inicial</li>
                  <li>• Más tiempo de juego y diversión</li>
                  <li>• Oportunidad de ganar sin arriesgar tanto</li>
                  <li>• Acceso a juegos premium</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">⚠️ Consideraciones</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Requisitos de apuesta obligatorios</li>
                  <li>• Tiempo límite para cumplir condiciones</li>
                  <li>• Restricciones en juegos elegibles</li>
                  <li>• Límites máximos de retiro</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Structured Data */}
      <BreadcrumbStructuredData items={[
        { name: 'Inicio', url: `https://casinospesos.com/${locale}` },
        { name: 'Bonos', url: `https://casinospesos.com/${locale}/bonos` },
        { name: data.title, url: `https://casinospesos.com/${locale}/bonos/${category}` }
      ]} />
      <FAQStructuredData faqs={[
        {
          question: `¿Qué son los ${data.title.toLowerCase()}?`,
          answer: data.description
        },
        {
          question: "¿Son seguros los bonos de casino online?",
          answer: "Sí, los bonos de casinos licenciados son completamente seguros. Siempre lee los términos y condiciones antes de reclamar cualquier oferta."
        },
        {
          question: "¿Necesito código promocional para los bonos?",
          answer: "Algunos bonos requieren código promocional mientras otros se activan automáticamente. Verifica los detalles de cada oferta."
        }
      ]} />
    </main>
  );
}