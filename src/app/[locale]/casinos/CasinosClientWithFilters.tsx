'use client';

import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, Star, X, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Casino } from '@/lib/casino-database';
import CopyButton from '@/components/CopyButton';
import CasinoFilters, { FilterState } from '@/components/CasinoFilters';
import ActiveFilterChips from '@/components/ActiveFilterChips';
import FavoriteButtonAuth from '@/components/FavoriteButtonAuth';

interface CasinosClientWithFiltersProps {
  casinos: Casino[];
}

export default function CasinosClientWithFilters({ casinos }: CasinosClientWithFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize search from URL
  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('search') || '';
  });
  const [sortBy, setSortBy] = useState('rating');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Initialize filters from URL
  const [filters, setFilters] = useState<FilterState>(() => {
    const params = new URLSearchParams(searchParams.toString());
    return {
      paymentMethods: params.get('payment')?.split(',').filter(Boolean) || [],
      minDeposit: params.get('deposit') || '',
      gameTypes: params.get('games')?.split(',').filter(Boolean) || [],
      withdrawalTime: params.get('withdrawal') || '',
      licenseType: params.get('license') || 'all',
    };
  });
  
  // Update search query when URL changes
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.paymentMethods.length > 0) {
      params.set('payment', filters.paymentMethods.join(','));
    }
    if (filters.minDeposit) {
      params.set('deposit', filters.minDeposit);
    }
    if (filters.gameTypes.length > 0) {
      params.set('games', filters.gameTypes.join(','));
    }
    if (filters.withdrawalTime) {
      params.set('withdrawal', filters.withdrawalTime);
    }
    if (filters.licenseType && filters.licenseType !== 'all') {
      params.set('license', filters.licenseType);
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    
    router.replace(newUrl, { scroll: false });
  }, [filters, router]);
  
  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.paymentMethods.length;
    count += filters.gameTypes.length;
    if (filters.minDeposit) count++;
    if (filters.withdrawalTime) count++;
    if (filters.licenseType && filters.licenseType !== 'all') count++;
    return count;
  }, [filters]);
  
  // Apply filters and sorting
  const filteredCasinos = useMemo(() => {
    return casinos
      .filter(casino => {
        // Search filter - buscar en nombre, descripción y métodos de pago
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const nameMatch = casino.name.toLowerCase().includes(query);
          const paymentMatch = casino.paymentMethods.some(method => method.toLowerCase().includes(query));
          const featureMatch = casino.features?.some(feature => feature.toLowerCase().includes(query));
          
          // Buscar en términos de juegos específicos
          const gameKeywords = ['slots', 'tragamonedas', 'live', 'vivo', 'blackjack', 'ruleta', 'roulette', 'poker'];
          const gameMatch = gameKeywords.some(keyword => 
            keyword.includes(query) && casino.games && casino.games.total > 0
          );
          
          if (!nameMatch && !paymentMatch && !featureMatch && !gameMatch) {
            return false;
          }
        }
        
        // Payment methods filter
        if (filters.paymentMethods.length > 0) {
          const hasPaymentMethod = filters.paymentMethods.some(method =>
            casino.paymentMethods.includes(method)
          );
          if (!hasPaymentMethod) return false;
        }
        
        // Minimum deposit filter
        if (filters.minDeposit) {
          const deposit = casino.bonus.minDeposit;
          switch (filters.minDeposit) {
            case '0-100':
              if (deposit > 100) return false;
              break;
            case '100-200':
              if (deposit < 100 || deposit > 200) return false;
              break;
            case '200-500':
              if (deposit < 200 || deposit > 500) return false;
              break;
            case '500+':
              if (deposit < 500) return false;
              break;
          }
        }
        
        // Game types filter (simplified check based on game counts)
        if (filters.gameTypes.length > 0) {
          for (const gameType of filters.gameTypes) {
            switch (gameType) {
              case 'slots':
                if (casino.games.slots === 0) return false;
                break;
              case 'live':
                if (casino.games.live === 0) return false;
                break;
              case 'table':
                if (casino.games.table === 0) return false;
                break;
              case 'sports':
                // Check if casino has sports in features
                if (!casino.features.some(f => f.toLowerCase().includes('deport'))) return false;
                break;
              case 'poker':
                // Check if casino has poker in features
                if (!casino.features.some(f => f.toLowerCase().includes('poker'))) return false;
                break;
            }
          }
        }
        
        // Withdrawal time filter
        if (filters.withdrawalTime) {
          const withdrawalTime = casino.withdrawalTime.toLowerCase();
          switch (filters.withdrawalTime) {
            case 'instant':
              if (!withdrawalTime.includes('instant') && !withdrawalTime.includes('2-24')) return false;
              break;
            case '24h':
              if (!withdrawalTime.includes('24')) return false;
              break;
            case '48h':
              if (!withdrawalTime.includes('48')) return false;
              break;
            case '72h':
              if (!withdrawalTime.includes('72')) return false;
              break;
          }
        }
        
        // License type filter
        if (filters.licenseType === 'segob') {
          const hasSegob = casino.licenses.some(license =>
            license.toLowerCase().includes('segob') ||
            license.toLowerCase().includes('dgjs')
          );
          if (!hasSegob) return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'bonus':
            return b.bonus.amount - a.bonus.amount;
          case 'newest':
            return b.established - a.established;
          case 'games':
            return b.games.total - a.games.total;
          default:
            return 0;
        }
      });
  }, [casinos, searchQuery, filters, sortBy]);
  
  const handleClearFilters = () => {
    setFilters({
      paymentMethods: [],
      minDeposit: '',
      gameTypes: [],
      withdrawalTime: '',
      licenseType: 'all',
    });
  };
  
  const handleRemoveFilter = (filterType: keyof FilterState, value?: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'paymentMethods' && value) {
        newFilters.paymentMethods = prev.paymentMethods.filter(p => p !== value);
      } else if (filterType === 'gameTypes' && value) {
        newFilters.gameTypes = prev.gameTypes.filter(g => g !== value);
      } else if (filterType === 'minDeposit') {
        newFilters.minDeposit = '';
      } else if (filterType === 'withdrawalTime') {
        newFilters.withdrawalTime = '';
      } else if (filterType === 'licenseType') {
        newFilters.licenseType = 'all';
      }
      
      return newFilters;
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Todos los Casinos Online
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {filteredCasinos.length} casinos disponibles para jugadores mexicanos.
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar casino..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                />
              </div>
            </div>

            {/* Sort and Filter Toggle */}
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
              >
                <option value="rating">Mayor Calificación</option>
                <option value="bonus">Mayor Bono</option>
                <option value="newest">Más Recientes</option>
                <option value="games">Más Juegos</option>
              </select>
              
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filtros
                {activeFilterCount > 0 && (
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="mb-6">
            <ActiveFilterChips
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearFilters}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80">
            <div className="sticky top-24">
              <CasinoFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </div>

          {/* Casino Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Mostrando <span className="text-gray-900 font-bold">{filteredCasinos.length}</span> de {casinos.length} casinos
              </p>
            </div>

            {/* Casino Cards */}
            <div className="grid gap-6">
              <AnimatePresence>
                {filteredCasinos.map((casino, index) => (
                  <motion.article
                    key={casino.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="grid lg:grid-cols-[200px,1fr,300px] gap-6">
                      {/* Casino Info */}
                      <div className="text-center lg:text-left">
                        <div className="relative">
                          <div className="w-24 h-16 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-3 relative overflow-hidden">
                            {casino.logo && casino.logo.startsWith('/') ? (
                              <Image
                                src={casino.logo}
                                alt={`${casino.name} logo`}
                                width={96}
                                height={64}
                                className="object-contain"
                                loading={index < 3 ? "eager" : "lazy"}
                                placeholder="blur"
                                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='64'%3E%3Crect width='96' height='64' fill='%23f3f4f6'/%3E%3C/svg%3E"
                              />
                            ) : (
                              <span className="text-2xl font-bold text-gray-900">
                                {casino.logo || casino.name.substring(0, 3).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="absolute -top-2 -right-2">
                            <FavoriteButtonAuth 
                              entityId={casino.id}
                              entityType="casino"
                              className="bg-white shadow-md hover:shadow-lg"
                            />
                          </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{casino.name}</h2>
                        <div className="flex items-center justify-center lg:justify-start gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(casino.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-gray-900 font-semibold ml-1">{casino.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">Est. {casino.established}</p>
                      </div>

                      {/* Details */}
                      <div>
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-200">
                          <div>
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="text-sm text-gray-600 mb-1">Bono de Bienvenida</p>
                                <p className="text-2xl font-bold text-gray-900">
                                  {casino.bonus.percentage}% hasta ${casino.bonus.amount.toLocaleString()} MXN
                                </p>
                                {casino.bonus.freeSpins && (
                                  <p className="text-sm text-green-600 mt-1">+ {casino.bonus.freeSpins} Giros Gratis</p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-600">Rollover</p>
                                <p className="text-lg font-bold text-gray-900">{casino.bonus.wageringRequirement}x</p>
                              </div>
                            </div>
                            {casino.bonus.code && (
                              <div className="flex items-center gap-2 bg-white/50 rounded-lg px-3 py-2">
                                <div className="flex-1">
                                  <p className="text-xs text-gray-600">Código:</p>
                                  <p className="font-mono font-bold text-gray-900">{casino.bonus.code}</p>
                                </div>
                                <CopyButton text={casino.bonus.code} />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-600">Juegos</p>
                            <p className="text-gray-900 font-semibold">{casino.games.total}+</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Retiros</p>
                            <p className="text-gray-900 font-semibold">{casino.withdrawalTime}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Dep. Mínimo</p>
                            <p className="text-gray-900 font-semibold">${casino.bonus.minDeposit}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Live Casino</p>
                            <p className="text-gray-900 font-semibold">{casino.games.live} juegos</p>
                          </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {casino.paymentMethods.slice(0, 5).map(method => (
                            <span key={method} className="bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
                              {method}
                            </span>
                          ))}
                          {casino.paymentMethods.length > 5 && (
                            <span className="text-gray-500 text-xs">
                              +{casino.paymentMethods.length - 5} más
                            </span>
                          )}
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {casino.features.slice(0, 4).map(feature => (
                            <span key={feature} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs border border-green-200">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-3">
                        <a 
                          href={casino.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 text-center shadow-lg hover:shadow-xl"
                        >
                          Jugar Ahora
                        </a>
                        <Link 
                          href={`/es/casinos/${casino.slug}`}
                          className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary-200 text-gray-900 px-6 py-3 rounded-xl font-semibold text-center transition-all"
                        >
                          Ver Reseña Completa
                        </Link>
                        
                        {/* Pros & Cons Summary */}
                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="text-green-600 font-semibold mb-1">Ventajas</p>
                            {casino.pros.slice(0, 2).map(pro => (
                              <p key={pro} className="text-gray-600">• {pro}</p>
                            ))}
                          </div>
                          <div>
                            <p className="text-red-600 font-semibold mb-1">Desventajas</p>
                            {casino.cons.slice(0, 1).map(con => (
                              <p key={con} className="text-gray-600">• {con}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {filteredCasinos.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-600 mb-4">No se encontraron casinos</p>
                <p className="text-gray-500 mb-6">Intenta ajustar tus filtros o búsqueda</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    handleClearFilters();
                  }}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                >
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Modal */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowMobileFilters(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="lg:hidden fixed top-0 left-0 bottom-0 w-[min(90vw,400px)] bg-gray-50 z-50 overflow-y-auto"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <CasinoFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    onClearFilters={handleClearFilters}
                    activeFilterCount={activeFilterCount}
                    isMobile
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}