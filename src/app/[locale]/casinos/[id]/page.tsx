import { ArrowLeft, Check, ChevronRight, CreditCard, Gamepad2, Gift, Star, Users, X, Calculator } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BreadcrumbStructuredData, CasinoStructuredData } from '@/components/StructuredData';
import ReviewSystem from '@/components/ReviewSystem';
import CopyButton from '@/components/CopyButton';
import BonusCalculator from '@/components/BonusCalculator';
import FavoriteButtonAuth from '@/components/FavoriteButtonAuth';
import { getCasinoBySlug } from '@/lib/casino-database';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const casino = await getCasinoBySlug(id);
  
  if (!casino) {
    return {
      title: 'Casino No Encontrado | CasinosPesos',
      description: 'El casino que buscas no está disponible.'
    };
  }
  
  const isSpanish = locale === 'es';
  const baseUrl = 'https://casinospesos.com';
  const pageUrl = `${baseUrl}/${locale}/casinos/${id}`;
  const bonusText = `${casino.bonus.percentage}% hasta $${casino.bonus.amount.toLocaleString()} MXN`;
  
  if (isSpanish) {
    return {
      title: `${casino.name} Reseña 2025 - Bono ${bonusText} | CasinosPesos`,
      description: `Reseña completa de ${casino.name} ✅ Bono ${bonusText} ✅ Retiros ${casino.withdrawalTime} ✅ ${casino.paymentMethods.join(', ')}.`,
      keywords: `${casino.name.toLowerCase()}, ${casino.name.toLowerCase()} casino, ${casino.name.toLowerCase()} reseña, ${casino.name.toLowerCase()} bono, casino online méxico`,
      openGraph: {
        title: `${casino.name} - Bono ${bonusText} | Reseña 2025`,
        description: `Calificación ${casino.rating}/5 ⭐ Retiros en ${casino.withdrawalTime} 🚀`,
        url: pageUrl,
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'article',
        images: [{
          url: `${baseUrl}/images/casinos/${id}-review.jpg`,
          width: 1200,
          height: 630,
          alt: `${casino.name} Reseña`
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: `${casino.name} - Bono ${bonusText}`,
        description: `Calificación ${casino.rating}/5 ⭐`,
      },
      alternates: {
        canonical: pageUrl,
        languages: {
          'es-MX': `${baseUrl}/es/casinos/${id}`,
          'en-US': `${baseUrl}/en/casinos/${id}`,
          'x-default': `${baseUrl}/es/casinos/${id}`
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
      }
    };
  } else {
    return {
      title: `${casino.name} Review 2025 - ${bonusText} Bonus | CasinosPesos`,
      description: `Complete ${casino.name} review: ${bonusText} bonus ✅ ${casino.withdrawalTime} withdrawals ✅ ${casino.paymentMethods.join(', ')}.`,
      keywords: `${casino.name.toLowerCase()}, ${casino.name.toLowerCase()} casino, ${casino.name.toLowerCase()} review, ${casino.name.toLowerCase()} bonus, online casino mexico`,
      openGraph: {
        title: `${casino.name} - ${bonusText} Bonus | Review 2025`,
        description: `Rating ${casino.rating}/5 ⭐ Withdrawals in ${casino.withdrawalTime} 🚀`,
        url: pageUrl,
        siteName: 'CasinosPesos',
        locale: 'en_US',
        type: 'article',
        images: [{
          url: `${baseUrl}/images/casinos/${id}-review.jpg`,
          width: 1200,
          height: 630,
          alt: `${casino.name} Review`
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: `${casino.name} - ${bonusText} Bonus`,
        description: `Rating ${casino.rating}/5 ⭐`,
      },
      alternates: {
        canonical: pageUrl,
        languages: {
          'es-MX': `${baseUrl}/es/casinos/${id}`,
          'en-US': `${baseUrl}/en/casinos/${id}`,
          'x-default': `${baseUrl}/es/casinos/${id}`
        }
      }
    };
  }
}

export default async function CasinoDetailPage({ params }: PageProps) {
  const { id, locale } = await params;
  const casino = await getCasinoBySlug(id);
  
  if (!casino) {
    return (
      <main className="min-h-screen bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Casino No Encontrado</h1>
          <p className="text-gray-500 mb-8">El casino que buscas no está disponible.</p>
          <Link href={`/${locale}/casinos`} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all">
            Ver Todos los Casinos
          </Link>
        </div>
      </main>
    );
  }

  const bonusText = `${casino.bonus.percentage}% hasta $${casino.bonus.amount.toLocaleString()} MXN`;

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-gray-900 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/${locale}/casinos`} className="hover:text-gray-900 transition-colors">
            Casinos
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{casino.name}</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl p-8 mb-8">
          <div className="grid lg:grid-cols-[200px,1fr,300px] gap-8">
            {/* Logo and Rating */}
            <div className="text-center">
              <div className="w-32 h-24 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
                {casino.logo && (casino.logo.startsWith('/') || casino.logo.startsWith('http')) ? (
                  <Image
                    src={casino.logo}
                    alt={`${casino.name} logo`}
                    width={128}
                    height={96}
                    className="object-contain p-2"
                    priority
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {casino.logo || casino.name.substring(0, 3).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(casino.rating)
                        ? 'fill-green-500 text-green-500'
                        : 'text-neutral-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-2xl font-bold text-gray-900">{casino.rating}/5</p>
              <p className="text-sm text-gray-500">Calificación</p>
            </div>

            {/* Main Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-bold text-gray-900">{casino.name}</h1>
                <FavoriteButtonAuth 
                  entityId={casino.id}
                  entityType="casino"
                  className="scale-125"
                />
              </div>
              <p className="text-gray-600 mb-6">
                Establecido en {casino.established}, {casino.name} es uno de los casinos online más confiables para jugadores mexicanos.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Juegos</p>
                  <p className="text-xl font-bold text-gray-900">{casino.games.total}+</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Retiros</p>
                  <p className="text-xl font-bold text-gray-900">{casino.withdrawalTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Licencia</p>
                  <p className="text-xl font-bold text-gray-900">{casino.licenses[0]}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Depósito Min</p>
                  <p className="text-xl font-bold text-gray-900">${casino.bonus.minDeposit}</p>
                </div>
              </div>
            </div>

            {/* Bonus Box */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Bono de Bienvenida</h2>
              <p className="text-2xl font-bold text-green-600 mb-2">{bonusText}</p>
              {casino.bonus.freeSpins && (
                <p className="text-sm text-green-600 mb-4">+ {casino.bonus.freeSpins} Giros Gratis</p>
              )}
              {casino.bonus.code && (
                <div className="bg-white/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Código Promocional</p>
                      <p className="text-lg font-mono font-bold text-gray-900">{casino.bonus.code}</p>
                    </div>
                    <CopyButton text={casino.bonus.code} />
                  </div>
                </div>
              )}
              <a 
                href={casino.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold text-center transition-all duration-200 transform hover:scale-105"
              >
                Obtener Bono
              </a>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pros and Cons */}
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ventajas y Desventajas</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Ventajas
                  </h3>
                  <ul className="space-y-2">
                    {casino.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    Desventajas
                  </h3>
                  <ul className="space-y-2">
                    {casino.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-green-600" />
                Métodos de Pago
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {casino.paymentMethods.map((method) => (
                  <div key={method} className="bg-gray-100 rounded-lg p-4 text-center">
                    <p className="text-gray-900 font-semibold">{method}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-100/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Depósito Mínimo</p>
                    <p className="text-xl font-bold text-gray-900">${casino.bonus.minDeposit} MXN</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Tiempo de Retiro</p>
                    <p className="text-xl font-bold text-gray-900">{casino.withdrawalTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Games */}
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-green-600" />
                Juegos Disponibles
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <p className="text-3xl font-bold text-gray-900 mb-2">{casino.games.total}+</p>
                  <p className="text-sm text-gray-500">Total de Juegos</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-gray-900 mb-2">{casino.games.slots}</p>
                  <p className="text-sm text-gray-500">Tragamonedas</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-gray-900 mb-2">{casino.games.live}</p>
                  <p className="text-sm text-gray-500">Casino en Vivo</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-gray-900 mb-2">{casino.games.table}</p>
                  <p className="text-sm text-gray-500">Juegos de Mesa</p>
                </div>
              </div>
            </div>

            {/* Bonuses */}
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Gift className="w-6 h-6 text-green-600" />
                Bonos y Promociones
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Bono de Bienvenida</h3>
                      <p className="text-2xl font-bold text-green-600 mb-2">{bonusText}</p>
                      {casino.bonus.freeSpins && (
                        <p className="text-sm text-green-600">+ {casino.bonus.freeSpins} Giros Gratis</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Rollover</p>
                      <p className="text-xl font-bold text-gray-900">{casino.bonus.wageringRequirement}x</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Depósito Mínimo</p>
                      <p className="font-bold text-gray-900">${casino.bonus.minDeposit} MXN</p>
                    </div>
                    {casino.bonus.code && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500 mb-1">Código Promocional</p>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-gray-900 font-mono">{casino.bonus.code}</p>
                          <CopyButton text={casino.bonus.code} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bonus Calculator */}
            <div className="bg-white rounded-xl p-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Calculadora de Bonos</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Calcula cuánto necesitas apostar para liberar el bono de {casino.name}.
              </p>
              <BonusCalculator
                bonusPercentage={casino.bonus.percentage}
                maxBonus={casino.bonus.amount}
                wageringRequirement={casino.bonus.wageringRequirement}
                minDeposit={casino.bonus.minDeposit}
                casinoName={casino.name}
              />
            </div>

            {/* Reviews */}
            <ReviewSystem 
              casinoId={id}
              casinoName={casino.name}
              averageRating={casino.rating}
              totalReviews={87}
              ratingDistribution={{
                5: 45,
                4: 25,
                3: 10,
                2: 5,
                1: 2
              }}
              locale={locale}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <a 
                  href={casino.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold text-center transition-all duration-200"
                >
                  Jugar Ahora
                </a>
                <Link 
                  href={`/${locale}/casinos`}
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-xl font-semibold text-center transition-colors"
                >
                  Ver Más Casinos
                </Link>
              </div>
            </div>

            {/* Casino Info */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Información del Casino</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Establecido</span>
                  <span className="text-gray-900 font-semibold">{casino.established}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Licencias</span>
                  <span className="text-gray-900 font-semibold text-right text-sm">
                    {casino.licenses.join(', ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Monedas</span>
                  <span className="text-gray-900 font-semibold">
                    {casino.currencies.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Características</h3>
              <div className="space-y-2">
                {casino.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <BreadcrumbStructuredData
        items={[
          { name: 'Inicio', url: `https://casinospesos.com/${locale}` },
          { name: 'Casinos', url: `https://casinospesos.com/${locale}/casinos` },
          { name: casino.name, url: `https://casinospesos.com/${locale}/casinos/${id}` }
        ]}
      />
      <CasinoStructuredData
        casino={{
          id: casino.id,
          name: casino.name,
          description: `${casino.name} es uno de los mejores casinos online en México.`,
          rating: casino.rating,
          reviewCount: 100,
          bonus: `${casino.bonus.percentage}% hasta $${casino.bonus.amount.toLocaleString()} MXN`,
          minDeposit: casino.bonus.minDeposit,
          paymentMethods: casino.paymentMethods
        }}
      />
    </main>
  );
}