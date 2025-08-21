import { ArrowLeft, ChevronRight, Info, Star } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbStructuredData, FAQStructuredData } from '@/components/StructuredData';
import type { Metadata } from 'next';
import { getAllCasinos } from '@/lib/casino-database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGift, 
  faPercent,
  faDice, 
  faMoneyBillTransfer,
  faRotate,
  faCrown,
  faCheckCircle,
  faClock,
  faWallet,
  faGamepad,
  faTags,
  faCoins
} from '@fortawesome/free-solid-svg-icons';

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

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface CategoryData {
  title: string;
  description: string;
  icon: IconDefinition;
  bonusType?: string;
}

const categoryData: Record<string, CategoryData> = {
  'sin-deposito': {
    title: 'Bonos Sin Depósito',
    description: 'Obtén dinero gratis sin necesidad de depositar. Perfectos para probar nuevos casinos.',
    icon: faGift,
    bonusType: 'no-deposit'
  },
  'bienvenida': {
    title: 'Bonos de Bienvenida',
    description: 'Los mejores bonos para nuevos jugadores. Duplica o triplica tu primer depósito.',
    icon: faPercent,
    bonusType: 'welcome'
  },
  'giros-gratis': {
    title: 'Giros Gratis',
    description: 'Consigue tiradas gratis en las mejores tragamonedas online.',
    icon: faDice,
    bonusType: 'free-spins'
  },
  'cashback': {
    title: 'Bonos de Cashback',
    description: 'Recupera un porcentaje de tus pérdidas. El seguro perfecto para tu bankroll.',
    icon: faMoneyBillTransfer,
    bonusType: 'cashback'
  },
  'recarga': {
    title: 'Bonos de Recarga',
    description: 'Bonificaciones en tus siguientes depósitos. Mantén tu cuenta activa con ventajas.',
    icon: faRotate,
    bonusType: 'reload'
  },
  'vip': {
    title: 'Bonos VIP',
    description: 'Ofertas exclusivas para jugadores de alto nivel. Límites más altos y mejores recompensas.',
    icon: faCrown,
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
          <div className="mb-4 flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center border border-green-200">
              <FontAwesomeIcon icon={data.icon} className="text-green-600" style={{ fontSize: '1.25rem', width: '1.25rem', height: '1.25rem' }} />
            </div>
          </div>
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
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({bonus.rating})</span>
                  </div>
                </div>

                {/* Bonus Details */}
                <div>
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 mb-4 border border-green-300">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{bonus.amount}</div>
                    {bonus.extra && (
                      <div className="text-sm text-green-600">{bonus.extra}</div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faRotate} className="text-gray-400" style={{ fontSize: '0.75rem', width: '0.75rem', height: '0.75rem' }} />
                      <span className="text-gray-400">Rollover:</span>
                      <span className="text-gray-900 font-semibold">{bonus.rollover}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faWallet} className="text-gray-400" style={{ fontSize: '0.75rem', width: '0.75rem', height: '0.75rem' }} />
                      <span className="text-gray-400">Depósito Mín:</span>
                      <span className="text-gray-900 font-semibold">
                        {bonus.minDeposit === 0 ? 'Gratis' : `$${bonus.minDeposit} MXN`}
                      </span>
                    </div>
                    {bonus.code && (
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faTags} className="text-gray-400" style={{ fontSize: '0.75rem', width: '0.75rem', height: '0.75rem' }} />
                        <span className="text-gray-400">Código:</span>
                        <span className="text-green-600 font-mono font-bold ml-2">{bonus.code}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Link 
                    href={`/${locale}/casinos/${bonus.slug}`}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 block text-center">
                    Reclamar Bono
                  </Link>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" style={{ fontSize: '1rem', width: '1rem', height: '1rem' }} />
            Sobre {data.title}
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-600">
              {data.description} Recuerda siempre leer los términos y condiciones antes de 
              reclamar cualquier bono. Los requisitos de apuesta y las restricciones pueden 
              variar considerablemente entre casinos.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" style={{ fontSize: '0.875rem', width: '0.875rem', height: '0.875rem' }} />
                  Ventajas
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCoins} className="text-green-500 mt-0.5" style={{ fontSize: '0.75rem', width: '0.75rem', height: '0.75rem' }} />
                    <span>Aumentan tu bankroll inicial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faClock} className="text-green-500 mt-0.5" style={{ fontSize: '0.75rem', width: '0.75rem', height: '0.75rem' }} />
                    <span>Más tiempo de juego y diversión</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faWallet} className="text-green-500 mt-0.5" style={{ fontSize: '0.75rem', width: '0.75rem', height: '0.75rem' }} />
                    <span>Oportunidad de ganar sin arriesgar tanto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faGamepad} className="text-green-500 mt-0.5" style={{ fontSize: '0.75rem', width: '0.75rem', height: '0.75rem' }} />
                    <span>Acceso a juegos premium</span>
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-amber-600" />
                  Consideraciones
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Requisitos de apuesta obligatorios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Tiempo límite para cumplir condiciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Restricciones en juegos elegibles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Límites máximos de retiro</span>
                  </li>
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