'use client';

import Link from 'next/link';
import { Check, ChevronRight, Star, X, Shield, Clock, CreditCard, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CasinoLogo } from '@/components/ui/CasinoLogo';

interface CasinoCardProps {
  casino: {
    id: string;
    name: string;
    slug: string;
    logo: string;
    rating: number;
    affiliateLink: string;
    features: string[];
    bonus: {
      type: string;
      amount: number;
      percentage: number;
      freeSpins?: number;
      minDeposit: number;
      wageringRequirement: number;
      code?: string;
    };
    games: {
      total: number;
      slots: number;
      live: number;
    };
    paymentMethods: string[];
    pros: string[];
    cons: string[];
    withdrawalTime: string;
  };
  featured?: boolean;
  locale?: string;
}

export function CasinoCard({ casino, featured = false, locale = 'es' }: CasinoCardProps) {
  const handleVisitCasino = () => {
    // Track click event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'casino_click', {
        casino_name: casino.name,
        casino_id: casino.id,
        position: featured ? 'featured' : 'list',
      });
    }
    // Open affiliate link
    window.open(casino.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-white',
        'h-full flex flex-col min-h-[500px] sm:min-h-[600px] animate-fadeIn casino-card',
        featured ? 'border-primary-300 shadow-xl ring-2 ring-primary-100' : 'border-gray-200 shadow-md',
        'hover:shadow-lg transition-all duration-300'
      )}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-bl-xl text-sm font-bold shadow-md">
            ⭐ DESTACADO
          </div>
        </div>
      )}

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500" />

      <div className="p-4 sm:p-6 flex flex-col h-full casino-card-content">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <CasinoLogo 
            name={casino.name} 
            logo={casino.logo || casino.name.split(' ')[0].substring(0, 3)} 
            size="lg"
          />
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-yellow-100 px-3 py-1.5 rounded-full border border-yellow-300">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-bold text-gray-900">{casino.rating}</span>
            <span className="text-sm text-gray-500">/5</span>
          </div>
        </div>

        {/* Casino Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">{casino.name}</h3>

        {/* Bonus Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 mb-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              {locale === 'es' ? 'Bono de Bienvenida' : 'Welcome Bonus'}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
            {casino.bonus.percentage}% hasta ${casino.bonus.amount.toLocaleString()} MXN
          </div>
          <div className="h-6 flex items-center">
            {casino.bonus.freeSpins ? (
              <div className="text-sm text-green-600 font-medium">
                + {casino.bonus.freeSpins} Giros Gratis
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Sin giros incluidos
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600 flex-wrap">
            <span>Min: ${casino.bonus.minDeposit}</span>
            <span>Rollover: {casino.bonus.wageringRequirement}x</span>
            {casino.bonus.code ? (
              <span className="bg-yellow-100 px-2 py-1 rounded text-yellow-700 font-mono border border-yellow-200">
                {casino.bonus.code}
              </span>
            ) : (
              <span className="text-gray-500">Sin código</span>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
              🎰
            </div>
            <span>{casino.games.total}+ Juegos</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="w-8 h-8 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-center">
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>
            <span>{casino.withdrawalTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-purple-600" />
            </div>
            <span>{casino.paymentMethods.length} Métodos</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
              🎪
            </div>
            <span>{casino.games.live} En Vivo</span>
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-xs font-semibold text-green-700 mb-2">VENTAJAS</h4>
            <div className="h-16 overflow-hidden">
              <ul className="space-y-1">
                {casino.pros.slice(0, featured ? 3 : 2).map((pro, index) => (
                  <li key={index} className="flex items-start gap-1 text-xs text-gray-600">
                    <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="leading-tight">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-red-600 mb-2">DESVENTAJAS</h4>
            <div className="h-16 overflow-hidden">
              <ul className="space-y-1">
                {casino.cons.slice(0, 2).map((con, index) => (
                  <li key={index} className="flex items-start gap-1 text-xs text-gray-600">
                    <X className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="leading-tight">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-4">
          <div className="h-10 flex items-center gap-2 overflow-x-auto pb-2 payment-methods-container">
            {casino.paymentMethods.slice(0, 4).map((method) => (
              <div
                key={method}
                className="flex-shrink-0 bg-gray-100 border border-gray-200 px-3 py-1 rounded-lg text-xs text-gray-700"
              >
                {method}
              </div>
            ))}
            {casino.paymentMethods.length > 4 && (
              <div className="flex-shrink-0 text-xs text-gray-500">
                +{casino.paymentMethods.length - 4} más
              </div>
            )}
          </div>
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-grow"></div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Link
            href={`/${locale}/casinos/${casino.slug}`}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-primary-200 px-4 py-3 rounded-xl font-semibold text-center transition-all duration-200 flex items-center justify-center gap-2"
          >
            {locale === 'es' ? 'Leer Reseña' : 'Read Review'}
          </Link>
          <button
            onClick={handleVisitCasino}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
          >
            {locale === 'es' ? 'Jugar Ahora' : 'Play Now'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Shield className="w-3 h-3 text-green-500" />
            <span>Licenciado</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span className="text-green-500">✓</span>
            <span>SSL Seguro</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span className="text-green-500">✓</span>
            <span>24/7 Soporte</span>
          </div>
        </div>
      </div>
    </div>
  );
}