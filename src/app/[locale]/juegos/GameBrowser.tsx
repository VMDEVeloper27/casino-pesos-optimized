'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, Gamepad2, TrendingUp, Zap, Users, Dices, PlayCircle, Star, ChevronRight, X, Sparkles, CreditCard, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Game } from '@/lib/game-database';
import { getGameTypes, getUniqueProviders } from '@/lib/game-database';
import { getAllCasinos } from '@/lib/casino-database';

interface GameBrowserProps {
  locale: string;
  initialType?: string;
  initialProvider?: string;
  initialSearch?: string;
  allGames: Game[];
}

const typeIcons: Record<string, React.ReactElement> = {
  slot: <Gamepad2 className="w-5 h-5" />,
  live: <Users className="w-5 h-5" />,
  table: <Dices className="w-5 h-5" />,
  crash: <Zap className="w-5 h-5" />,
  instant: <Sparkles className="w-5 h-5" />,
  card: <CreditCard className="w-5 h-5" />,
  jackpot: <Trophy className="w-5 h-5" />,
  'video-poker': <Gamepad2 className="w-5 h-5" />
};

export default function GameBrowser({ 
  locale, 
  initialType, 
  initialProvider, 
  initialSearch,
  allGames 
}: GameBrowserProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState<string>(initialType || 'all');
  const [selectedProvider, setSelectedProvider] = useState<string>(initialProvider || 'all');
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [showFilters, setShowFilters] = useState(false);

  const isSpanish = locale === 'es';
  const gameTypes = getGameTypes();
  const providers = getUniqueProviders();

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedType !== 'all') params.set('type', selectedType);
    if (selectedProvider !== 'all') params.set('provider', selectedProvider);
    if (searchQuery) params.set('search', searchQuery);
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.replace(newUrl, { scroll: false });
  }, [selectedType, selectedProvider, searchQuery, router]);

  // Filter games
  const filteredGames = useMemo(() => {
    let filtered = [...allGames];

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(game => game.type === selectedType);
    }

    // Filter by provider
    if (selectedProvider !== 'all') {
      filtered = filtered.filter(game => game.provider === selectedProvider);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(query) ||
        game.provider.toLowerCase().includes(query) ||
        game.theme?.toLowerCase().includes(query) ||
        game.features?.some(f => f.toLowerCase().includes(query))
      );
    }

    // Sort by popularity
    return filtered.sort((a, b) => b.popularity - a.popularity);
  }, [allGames, selectedType, selectedProvider, searchQuery]);

  // Get top games for hero section
  const topGames = useMemo(() => {
    return [...allGames]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 6);
  }, [allGames]);

  const getVolatilityColor = (volatility?: string) => {
    switch (volatility) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'very-high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'slot': return isSpanish ? 'Tragamonedas' : 'Slots';
      case 'live': return isSpanish ? 'En Vivo' : 'Live';
      case 'table': return isSpanish ? 'Mesa' : 'Table';
      case 'crash': return 'Crash';
      case 'instant': return isSpanish ? 'Instantáneo' : 'Instant';
      default: return type;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isSpanish ? 'Explorador de Juegos' : 'Game Explorer'}
            </h1>
            <p className="text-lg text-green-100 max-w-3xl mx-auto">
              {isSpanish 
                ? 'Descubre más de 1000 juegos de los mejores proveedores. Encuentra dónde jugar tus favoritos.'
                : 'Discover over 1000 games from top providers. Find where to play your favorites.'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isSpanish ? 'Buscar juegos...' : 'Search games...'}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Popular Games */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topGames.map((game) => (
              <div
                key={game.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  {typeIcons[game.type]}
                  <span className="text-xs text-green-200">{game.provider}</span>
                </div>
                <p className="font-semibold text-sm">{game.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-green-200">{game.popularity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                {isSpanish ? 'Filtros' : 'Filters'}
              </h3>

              {/* Type Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  {isSpanish ? 'Tipo de Juego' : 'Game Type'}
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedType === 'all' 
                        ? 'bg-green-100 text-green-700' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isSpanish ? 'Todos' : 'All'} ({allGames.length})
                  </button>
                  {gameTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                        selectedType === type.value 
                          ? 'bg-green-100 text-green-700' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {typeIcons[type.value]}
                        {type.label}
                      </span>
                      <span className="text-sm">({type.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Provider Filter */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">
                  {isSpanish ? 'Proveedor' : 'Provider'}
                </h4>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">{isSpanish ? 'Todos' : 'All'}</option>
                  {providers.map((provider) => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <Filter className="w-4 h-4" />
              {isSpanish ? 'Filtros' : 'Filters'}
              {(selectedType !== 'all' || selectedProvider !== 'all') && (
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  {[selectedType !== 'all' && selectedType, selectedProvider !== 'all' && selectedProvider].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {/* Game Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {filteredGames.length} {isSpanish ? 'juegos encontrados' : 'games found'}
              </h2>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {isSpanish ? 'Ordenado por popularidad' : 'Sorted by popularity'}
                </span>
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/${locale}/juegos/${game.slug}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
                  >
                  {/* Game Image */}
                  <div className="relative h-48 bg-gray-100">
                    {game.image ? (
                      game.image.startsWith('http') ? (
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={game.image}
                          alt={game.name}
                          fill
                          className="object-cover"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600">
                        {typeIcons[game.type]}
                        <span className="text-white text-2xl font-bold ml-2">{game.name.substring(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                    {/* Popularity Badge */}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{game.popularity}</span>
                    </div>
                  </div>
                  
                  {/* Game Content */}
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {game.name}
                      </h3>
                      <p className="text-sm text-gray-600">{game.provider}</p>
                    </div>

                    {/* Game Type & Features */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {typeIcons[game.type]}
                        {getTypeLabel(game.type)}
                      </span>
                      {game.volatility && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVolatilityColor(game.volatility)}`}>
                          {game.volatility === 'very-high' ? 'Muy Alta' : game.volatility.charAt(0).toUpperCase() + game.volatility.slice(1)}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      {game.rtp && (
                        <div>
                          <span className="text-gray-500">RTP:</span>
                          <span className="ml-1 font-semibold text-gray-900">{game.rtp}%</span>
                        </div>
                      )}
                      {game.maxWin && (
                        <div>
                          <span className="text-gray-500">Max:</span>
                          <span className="ml-1 font-semibold text-gray-900">{game.maxWin.toLocaleString()}x</span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    {game.features && game.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {game.features.slice(0, 3).map((feature) => (
                          <span key={feature} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                        {game.features.length > 3 && (
                          <span className="text-xs text-gray-500">+{game.features.length - 3}</span>
                        )}
                      </div>
                    )}

                    {/* Where to Play */}
                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-xs text-gray-500 mb-2">
                        {isSpanish ? 'Disponible en:' : 'Available at:'}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {game.availableAt.slice(0, 3).map((casinoId) => (
                          <span
                            key={casinoId}
                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                          >
                            {casinoId.charAt(0).toUpperCase() + casinoId.slice(1).replace('-', ' ')}
                          </span>
                        ))}
                        {game.availableAt.length > 3 && (
                          <span className="text-xs text-gray-500 px-2 py-1">
                            +{game.availableAt.length - 3} {isSpanish ? 'más' : 'more'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Demo Button - Removed to avoid nested interactive elements */}
                    {game.demoUrl && (
                      <div className="mt-3 flex items-center justify-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
                        <PlayCircle className="w-4 h-4" />
                        {isSpanish ? 'Jugar Demo' : 'Play Demo'}
                      </div>
                    )}
                  </div>
                </motion.div>
                </Link>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <Gamepad2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isSpanish ? 'No se encontraron juegos' : 'No games found'}
                </h3>
                <p className="text-gray-600">
                  {isSpanish 
                    ? 'Intenta ajustar los filtros o la búsqueda'
                    : 'Try adjusting the filters or search'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    {isSpanish ? 'Filtros' : 'Filters'}
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Mobile Type Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    {isSpanish ? 'Tipo de Juego' : 'Game Type'}
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedType('all');
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedType === 'all' 
                          ? 'bg-green-100 text-green-700' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {isSpanish ? 'Todos' : 'All'} ({allGames.length})
                    </button>
                    {gameTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => {
                          setSelectedType(type.value);
                          setShowFilters(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                          selectedType === type.value 
                            ? 'bg-green-100 text-green-700' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {typeIcons[type.value]}
                          {type.label}
                        </span>
                        <span className="text-sm">({type.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Provider Filter */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">
                    {isSpanish ? 'Proveedor' : 'Provider'}
                  </h4>
                  <select
                    value={selectedProvider}
                    onChange={(e) => {
                      setSelectedProvider(e.target.value);
                      setShowFilters(false);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="all">{isSpanish ? 'Todos' : 'All'}</option>
                    {providers.map((provider) => (
                      <option key={provider} value={provider}>{provider}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}