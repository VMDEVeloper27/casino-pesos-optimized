import { ChevronRight, Gift, Info, Shield, Star, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { getAllCasinos } from '@/lib/casino-database';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  if (isSpanish) {
    return {
      title: 'Mejores Bonos de Casino 2024 - Ofertas Exclusivas | CasinosPesos',
      description: 'Bonos de casino verificados diariamente. Sin depósito, bienvenida, giros gratis y más. Códigos promocionales exclusivos para México.',
      keywords: 'bonos casino, bonos sin depósito, giros gratis, códigos promocionales casino, ofertas casino méxico',
    };
  } else {
    return {
      title: 'Best Casino Bonuses 2024 - Exclusive Offers | CasinosPesos',
      description: 'Daily verified casino bonuses. No deposit, welcome, free spins and more. Exclusive promo codes for Mexico.',
      keywords: 'casino bonuses, no deposit bonuses, free spins, casino promo codes, mexico casino offers',
    };
  }
}

const bonusCategories = [
  { name: 'Sin Depósito', count: 12, icon: '🎁', color: 'from-purple-500 to-pink-500', slug: 'sin-deposito' },
  { name: 'Bienvenida', count: 45, icon: '🎉', color: 'from-blue-500 to-cyan-500', slug: 'bienvenida' },
  { name: 'Giros Gratis', count: 38, icon: '🎰', color: 'from-green-500 to-emerald-500', slug: 'giros-gratis' },
  { name: 'Cashback', count: 15, icon: '💸', color: 'from-orange-500 to-red-500', slug: 'cashback' },
  { name: 'Recarga', count: 22, icon: '🔄', color: 'from-indigo-500 to-purple-500', slug: 'recarga' },
  { name: 'VIP', count: 8, icon: '👑', color: 'from-yellow-500 to-orange-500', slug: 'vip' }
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
    <main className="min-h-screen bg-neutral-900 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mejores Bonos de Casino 2024
          </h1>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Bonos exclusivos, códigos promocionales y ofertas especiales verificadas diariamente
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 border border-primary/30">
            <TrendingUp className="w-8 h-8 text-primary mb-2" />
            <div className="text-2xl font-bold text-white">$250K+</div>
            <div className="text-sm text-neutral-400">En Bonos Totales</div>
          </div>
          <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl p-6 border border-accent/30">
            <Gift className="w-8 h-8 text-accent mb-2" />
            <div className="text-2xl font-bold text-white">140+</div>
            <div className="text-sm text-neutral-400">Bonos Activos</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
            <Zap className="w-8 h-8 text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-white">5,000+</div>
            <div className="text-sm text-neutral-400">Giros Gratis</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
            <Shield className="w-8 h-8 text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm text-neutral-400">Verificados</div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Categorías de Bonos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bonusCategories.map((category) => (
              <Link
                key={category.name}
                href={`/${locale}/bonos/${category.slug}`}
                className="group relative overflow-hidden bg-neutral-800 hover:bg-neutral-700 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-sm font-semibold text-white">{category.name}</div>
                <div className="text-xs text-neutral-400">{category.count} ofertas</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Bonus */}
        {featuredBonus && (
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-6xl opacity-20">🎁</div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-black fill-black" />
                <span className="text-black font-bold text-sm">BONO DESTACADO DE LA SEMANA</span>
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">
                {featuredBonus.amount}
              </h3>
              <p className="text-black/80 mb-6">
                {featuredBonus.casino} te da la bienvenida con el mejor bono del mercado mexicano
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href={`/${locale}/casinos/${featuredBonus.slug}`}
                  className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-black/80 transition-colors"
                >
                  Reclamar Bono
                </Link>
                {featuredBonus.code !== 'AUTO' && (
                  <div className="bg-black/20 px-4 py-3 rounded-xl">
                    <span className="text-black font-mono font-bold">
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
              className={`bg-neutral-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ${
                bonus.featured ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="grid lg:grid-cols-[1fr,2fr,200px] gap-6">
                {/* Casino & Type */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {bonus.featured && (
                      <span className="bg-primary text-black px-2 py-1 rounded text-xs font-bold">HOT</span>
                    )}
                    <h3 className="text-xl font-bold text-white">{bonus.casino}</h3>
                  </div>
                  <div className="text-sm text-neutral-400 mb-2">{bonus.type}</div>
                  <div className="flex items-center gap-1">
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
                    <span className="text-sm text-neutral-400 ml-1">({bonus.rating})</span>
                  </div>
                </div>

                {/* Bonus Details */}
                <div>
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 mb-4">
                    <div className="text-2xl font-bold text-white mb-1">{bonus.amount}</div>
                    {bonus.extra && (
                      <div className="text-sm text-accent">{bonus.extra}</div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <div className="text-neutral-500">Rollover</div>
                      <div className="text-white font-semibold">{bonus.rollover}</div>
                    </div>
                    <div>
                      <div className="text-neutral-500">Dep. Mín</div>
                      <div className="text-white font-semibold">
                        {bonus.minDeposit === 0 ? 'Gratis' : `$${bonus.minDeposit}`}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500">Apuesta Máx</div>
                      <div className="text-white font-semibold">${bonus.maxBet}</div>
                    </div>
                    <div>
                      <div className="text-neutral-500">Válido</div>
                      <div className="text-white font-semibold">{bonus.validFor}</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3">
                  {bonus.code !== 'AUTO' && (
                    <div className="bg-neutral-700 px-4 py-2 rounded-lg text-center">
                      <div className="text-xs text-neutral-400 mb-1">Código</div>
                      <div className="text-primary font-mono font-bold">{bonus.code}</div>
                    </div>
                  )}
                  <Link 
                    href={`/${locale}/casinos/${bonus.slug}`}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Reclamar
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <button className="text-neutral-400 hover:text-white text-sm flex items-center justify-center gap-1 transition-colors">
                    <Info className="w-4 h-4" />
                    T&C Aplican
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-neutral-800 rounded-2xl p-8 mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">📚 Guía de Bonos de Casino</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-neutral-300">
              Los bonos de casino son promociones que ofrecen los operadores para atraer nuevos jugadores 
              y mantener a los existentes. Es importante leer los términos y condiciones antes de reclamar cualquier bono.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">✅ Qué buscar en un bono</h3>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li>• Requisitos de apuesta bajos (menos de 30x)</li>
                  <li>• Tiempo suficiente para cumplir los requisitos</li>
                  <li>• Juegos que contribuyen al 100%</li>
                  <li>• Límites de apuesta razonables</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">⚠️ Señales de alerta</h3>
                <ul className="space-y-2 text-sm text-neutral-300">
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