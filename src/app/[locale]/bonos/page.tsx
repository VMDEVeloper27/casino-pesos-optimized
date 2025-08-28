import { ChevronRight, Info, Star } from 'lucide-react';
import Link from 'next/link';
import { getAllCasinos } from '@/lib/casino-database';
import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCanonicalUrl } from '@/lib/canonical';
import { 
  faGift, 
  faCoins, 
  faDice, 
  faMoneyBillTransfer,
  faRotate,
  faCrown,
  faChartLine,
  faBolt,
  faShieldAlt,
  faPercent
} from '@fortawesome/free-solid-svg-icons';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  if (isSpanish) {
    return {
      title: 'Mejores Bonos de Casino 2025 - Ofertas Exclusivas | CasinosPesos',
      description: 'Bonos de casino verificados diariamente. Sin depósito, bienvenida, giros gratis y más. Códigos promocionales exclusivos para México.',
      keywords: 'bonos casino, bonos sin depósito, giros gratis, códigos promocionales casino, ofertas casino méxico',
      alternates: {
        canonical: getCanonicalUrl('/bonos', locale),
        languages: {
          'es-MX': getCanonicalUrl('/bonos', 'es'),
          'en-US': getCanonicalUrl('/bonuses', 'en'),
        }
      },
    };
  } else {
    return {
      title: 'Best Casino Bonuses 2025 - Exclusive Offers | CasinosPesos',
      description: 'Daily verified casino bonuses. No deposit, welcome, free spins and more. Exclusive promo codes for Mexico.',
      keywords: 'casino bonuses, no deposit bonuses, free spins, casino promo codes, mexico casino offers',
      alternates: {
        canonical: getCanonicalUrl('/bonuses', locale),
        languages: {
          'es-MX': getCanonicalUrl('/bonos', 'es'),
          'en-US': getCanonicalUrl('/bonuses', 'en'),
        }
      },
    };
  }
}

const bonusCategories = [
  { name: 'Sin Depósito', count: 12, icon: faGift, color: 'from-purple-500 to-pink-500', slug: 'sin-deposito' },
  { name: 'Bienvenida', count: 45, icon: faPercent, color: 'from-blue-500 to-cyan-500', slug: 'bienvenida' },
  { name: 'Giros Gratis', count: 38, icon: faDice, color: 'from-green-500 to-emerald-500', slug: 'giros-gratis' },
  { name: 'Cashback', count: 15, icon: faMoneyBillTransfer, color: 'from-orange-500 to-red-500', slug: 'cashback' },
  { name: 'Recarga', count: 22, icon: faRotate, color: 'from-indigo-500 to-purple-500', slug: 'recarga' },
  { name: 'VIP', count: 8, icon: faCrown, color: 'from-yellow-500 to-orange-500', slug: 'vip' }
];

export default async function BonosPage({ params }: PageProps) {
  const { locale } = await params;
  
  // Fetch casinos from database
  const allCasinos = await getAllCasinos();
  
  // Format bonuses from casinos
  const bonuses = allCasinos.slice(0, 5).map(casino => ({
    id: casino.id,
    casino: casino.name,
    type: casino.bonus.type === 'welcome' ? 'Bono de Bienvenida' : 'Bono Especial',
    amount: `${casino.bonus.percentage}% hasta $${casino.bonus.amount.toLocaleString()} MXN`,
    extra: casino.bonus.freeSpins ? `+ ${casino.bonus.freeSpins} Giros Gratis` : '',
    code: casino.bonus.code || 'AUTO',
    rollover: `${casino.bonus.wageringRequirement}x`,
    minDeposit: casino.bonus.minDeposit,
    maxBet: 500,
    validFor: '30 días',
    rating: casino.rating,
    featured: casino.id === 'bet365',
    slug: casino.slug
  }));

  const featuredBonus = bonuses.find(b => b.featured) || bonuses[0];

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mejores Bonos de Casino 2025
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bonos exclusivos, códigos promocionales y ofertas especiales verificadas diariamente
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="w-8 h-8 mb-2">
              <FontAwesomeIcon icon={faChartLine} className="text-green-600" style={{ fontSize: '1.5rem' }} />
            </div>
            <div className="text-2xl font-bold text-gray-900">$250K+</div>
            <div className="text-sm text-gray-600">En Bonos Totales</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="w-8 h-8 mb-2">
              <FontAwesomeIcon icon={faGift} className="text-orange-600" style={{ fontSize: '1.5rem' }} />
            </div>
            <div className="text-2xl font-bold text-gray-900">140+</div>
            <div className="text-sm text-gray-600">Bonos Activos</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="w-8 h-8 mb-2">
              <FontAwesomeIcon icon={faBolt} className="text-purple-600" style={{ fontSize: '1.5rem' }} />
            </div>
            <div className="text-2xl font-bold text-gray-900">5,000+</div>
            <div className="text-sm text-gray-600">Giros Gratis</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div className="w-8 h-8 mb-2">
              <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600" style={{ fontSize: '1.5rem' }} />
            </div>
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-600">Verificados</div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categorías de Bonos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bonusCategories.map((category) => (
              <Link
                key={category.name}
                href={`/${locale}/bonos/${category.slug}`}
                className="group relative overflow-hidden bg-white hover:bg-gray-50 border border-gray-200 hover:border-primary-200 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="mb-2 flex justify-center">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <FontAwesomeIcon icon={category.icon} className="text-green-600 group-hover:text-green-700 transition-colors" style={{ fontSize: '1.5rem' }} />
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count} ofertas</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Bonus */}
        {featuredBonus && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 mb-12 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 opacity-20">
              <div className="w-24 h-24">
                <FontAwesomeIcon icon={faGift} className="text-white" style={{ fontSize: '4rem' }} />
              </div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-white fill-white" />
                <span className="text-white font-bold text-sm">BONO DESTACADO DE LA SEMANA</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {featuredBonus.amount}
              </h3>
              <p className="text-white/90 mb-6">
                {featuredBonus.casino} te da la bienvenida con el mejor bono del mercado mexicano
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href={`/${locale}/casinos/${featuredBonus.slug}`}
                  className="bg-white text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg border border-green-200"
                >
                  Reclamar Bono
                </Link>
                {featuredBonus.code !== 'AUTO' && (
                  <div className="bg-white/20 px-4 py-3 rounded-xl">
                    <span className="text-white font-mono font-bold">
                      CÓDIGO: {featuredBonus.code}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bonus List */}
        <div className="space-y-6">
          {bonuses.map((bonus) => (
            <div
              key={bonus.id}
              className={`bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ${
                bonus.featured ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="grid lg:grid-cols-[1fr,2fr,200px] gap-6">
                {/* Casino & Type */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {bonus.featured && (
                      <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold">HOT</span>
                    )}
                    <h3 className="text-xl font-bold text-gray-900">{bonus.casino}</h3>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{bonus.type}</div>
                  <div className="flex items-center gap-1">
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
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4 border border-green-200">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{bonus.amount}</div>
                    {bonus.extra && (
                      <div className="text-sm text-green-600">{bonus.extra}</div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <div className="text-gray-400">Rollover</div>
                      <div className="text-gray-900 font-semibold">{bonus.rollover}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Dep. Mín</div>
                      <div className="text-gray-900 font-semibold">
                        {bonus.minDeposit === 0 ? 'Gratis' : `$${bonus.minDeposit}`}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Apuesta Máx</div>
                      <div className="text-gray-900 font-semibold">${bonus.maxBet}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Válido</div>
                      <div className="text-gray-900 font-semibold">{bonus.validFor}</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3">
                  {bonus.code !== 'AUTO' && (
                    <div className="bg-gray-100 px-4 py-2 rounded-lg text-center">
                      <div className="text-xs text-gray-500 mb-1">Código</div>
                      <div className="text-primary-600 font-mono font-bold">{bonus.code}</div>
                    </div>
                  )}
                  <Link 
                    href={`/${locale}/casinos/${bonus.slug}`}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    Reclamar
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <button className="text-gray-500 hover:text-gray-900 text-sm flex items-center justify-center gap-1 transition-colors">
                    <Info className="w-4 h-4" />
                    T&C Aplican
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Guía de Bonos de Casino</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-600">
              Los bonos de casino son promociones que ofrecen los operadores para atraer nuevos jugadores 
              y mantener a los existentes. Es importante leer los términos y condiciones antes de reclamar cualquier bono.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Qué buscar en un bono</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Requisitos de apuesta bajos (menos de 30x)</li>
                  <li>• Tiempo suficiente para cumplir los requisitos</li>
                  <li>• Juegos que contribuyen al 100%</li>
                  <li>• Límites de apuesta razonables</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">⚠️ Señales de alerta</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Rollover excesivo (más de 50x)</li>
                  <li>• Tiempo muy limitado (menos de 7 días)</li>
                  <li>• Restricciones en métodos de pago</li>
                  <li>• Límites de retiro muy bajos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}