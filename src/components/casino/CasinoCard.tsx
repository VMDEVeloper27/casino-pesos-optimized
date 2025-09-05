'use client';

import Link from 'next/link';
import { Check, ChevronRight, Star, X } from 'lucide-react';
// import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CasinoLogo } from '@/components/ui/CasinoLogo';
import FavoriteButtonAuth from '@/components/FavoriteButtonAuth';
import { getCTAByIndex, getCTAByType } from '@/lib/cta-texts';

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
  // Get unique CTA text based on casino ID
  const ctaText = casino.bonus?.type 
    ? getCTAByType(casino.bonus.type, locale as 'es' | 'en')
    : getCTAByIndex(casino.id.length, locale as 'es' | 'en');
  
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
        'relative overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-900 to-slate-800',
        'h-full flex flex-col min-h-[500px] sm:min-h-[600px] animate-fadeIn casino-card',
        featured ? 'border-primary/50 shadow-2xl' : 'border-slate-700 shadow-lg',
        'hover:shadow-xl transition-all duration-300'
      )}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-r from-primary to-accent text-black px-4 py-1 rounded-bl-xl text-sm font-bold">
            ⭐ DESTACADO
          </div>
        </div>
      )}

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      <div className="p-4 sm:p-6 flex flex-col h-full casino-card-content">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <CasinoLogo 
            name={casino.name} 
            logo={casino.logo || casino.name.split(' ')[0].substring(0, 3)} 
            size="lg"
          />
          <div className="flex items-center gap-2">
            <FavoriteButtonAuth 
              entityId={casino.id}
              entityType="casino"
              className="bg-slate-800"
            />
            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="text-lg font-bold text-white">{casino.rating}</span>
              <span className="text-sm text-slate-400">/5</span>
            </div>
          </div>
        </div>

        {/* Casino Name */}
        <h3 className="text-xl font-bold text-white mb-4">{casino.name}</h3>

        {/* Bonus Section - Responsive */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-3 sm:p-4 mb-4 border border-primary/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary text-base sm:text-lg">🎁</span>
            <span className="text-xs sm:text-sm font-semibold text-primary">
              {locale === 'es' ? 'Bono de Bienvenida' : 'Welcome Bonus'}
            </span>
          </div>
          <div className="text-base sm:text-xl lg:text-2xl font-bold text-white mb-1 break-words">
            <span className="block sm:inline">{casino.bonus.percentage}%</span>
            <span className="block sm:inline sm:ml-1">hasta ${casino.bonus.amount.toLocaleString()} MXN</span>
          </div>
          <div className="min-h-[1.5rem] flex items-center">
            {casino.bonus.freeSpins ? (
              <div className="text-xs sm:text-sm text-accent">
                + {casino.bonus.freeSpins} Giros Gratis
              </div>
            ) : (
              <div className="text-xs sm:text-sm text-slate-500">
                Sin giros incluidos
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-[10px] sm:text-xs text-slate-400">
            <span className="whitespace-nowrap">Min: ${casino.bonus.minDeposit}</span>
            <span className="whitespace-nowrap">Rollover: {casino.bonus.wageringRequirement}x</span>
            {casino.bonus.code ? (
              <span className="bg-slate-700 px-2 py-1 rounded text-primary font-mono whitespace-nowrap">
                {casino.bonus.code}
              </span>
            ) : (
              <span className="text-slate-600 whitespace-nowrap">Sin código</span>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
              🎰
            </div>
            <span>{casino.games.total}+ Juegos</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <div className="w-8 h-8 rounded-lg bg-neutral-700 flex items-center justify-center text-accent">
              ⏱️
            </div>
            <span>{casino.withdrawalTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <div className="w-8 h-8 rounded-lg bg-neutral-700 flex items-center justify-center text-primary">
              💳
            </div>
            <span>{casino.paymentMethods.length} Métodos</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
              🎪
            </div>
            <span>{casino.games.live} En Vivo</span>
          </div>
        </div>

        {/* Pros and Cons - Show for all cards but with height consistency */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-xs font-semibold text-accent mb-2">VENTAJAS</h4>
            <div className="h-16 overflow-hidden">
              <ul className="space-y-1">
                {casino.pros.slice(0, featured ? 3 : 2).map((pro, index) => (
                  <li key={index} className="flex items-start gap-1 text-xs text-slate-300">
                    <Check className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                    <span className="leading-tight">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-red-400 mb-2">DESVENTAJAS</h4>
            <div className="h-16 overflow-hidden">
              <ul className="space-y-1">
                {casino.cons.slice(0, 2).map((con, index) => (
                  <li key={index} className="flex items-start gap-1 text-xs text-slate-300">
                    <X className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
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
                className="flex-shrink-0 bg-slate-700 px-3 py-1 rounded-lg text-xs text-slate-300"
              >
                {method}
              </div>
            ))}
            {casino.paymentMethods.length > 4 && (
              <div className="flex-shrink-0 text-xs text-slate-500">
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
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-xl font-semibold text-center transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {locale === 'es' ? 'Leer Reseña' : 'Read Review'}
          </Link>
          <button
            onClick={handleVisitCasino}
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black px-4 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
          >
            {ctaText}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span className="text-accent">✓</span>
            <span>Licenciado</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span className="text-accent">✓</span>
            <span>SSL Seguro</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span className="text-accent">✓</span>
            <span>24/7 Soporte</span>
          </div>
        </div>
      </div>
    </div>
  );
}