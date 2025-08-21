'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  PlayCircle, Star, TrendingUp, Info, Maximize2, X, 
  ChevronRight, Gamepad2, DollarSign, Target, Zap,
  Users, Clock, Award, AlertCircle, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteButton from '@/components/FavoriteButton';
import type { Game } from '@/lib/game-database';
import { getGamesByProvider, getGamesByType } from '@/lib/game-database';
import { getAllCasinosSync } from '@/lib/casino-database';

interface GameDetailProps {
  game: Game;
  locale: string;
}

export default function GameDetail({ game, locale }: GameDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'casinos' | 'similar'>('info');
  
  const isSpanish = locale === 'es';
  
  // Get all casinos to match with game availability
  const allCasinos = getAllCasinosSync();
  const availableCasinos = game.availableAt.map(casinoId => 
    allCasinos.find(c => c.id === casinoId)
  ).filter((casino): casino is NonNullable<typeof casino> => casino !== undefined && casino !== null);
  
  // Get similar games
  const similarByType = getGamesByType(game.type);
  const similarByProvider = getGamesByProvider(game.provider);
  const similarGames = [...new Set([...similarByType, ...similarByProvider])]
    .filter(g => g.id !== game.id)
    .slice(0, 6);

  const handleFullscreen = () => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = 'auto';
  };

  const getVolatilityLabel = (volatility?: string) => {
    const labels = {
      'low': isSpanish ? 'Baja' : 'Low',
      'medium': isSpanish ? 'Media' : 'Medium',
      'high': isSpanish ? 'Alta' : 'High',
      'very-high': isSpanish ? 'Muy Alta' : 'Very High'
    };
    return labels[volatility as keyof typeof labels] || volatility;
  };

  const getVolatilityColor = (volatility?: string) => {
    switch (volatility) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'very-high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href={`/${locale}`} className="text-gray-500 hover:text-gray-700">
              {isSpanish ? 'Inicio' : 'Home'}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href={`/${locale}/juegos`} className="text-gray-500 hover:text-gray-700">
              {isSpanish ? 'Juegos' : 'Games'}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{game.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Game Player */}
            <div className="bg-black rounded-xl overflow-hidden shadow-xl">
              {!isPlaying ? (
                <div className="relative aspect-video">
                  {game.image && (
                    game.image.startsWith('http') ? (
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Image
                        src={game.image}
                        alt={game.name}
                        fill
                        className="object-contain"
                      />
                    )
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    {game.embedUrl ? (
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg"
                      >
                        <PlayCircle className="w-8 h-8" />
                        {isSpanish ? 'Jugar Demo Gratis' : 'Play Free Demo'}
                      </button>
                    ) : (
                      <div className="text-center">
                        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                        <p className="text-lg font-semibold text-white mb-2">
                          {isSpanish ? 'Demo no disponible' : 'Demo not available'}
                        </p>
                        <p className="text-sm text-gray-300 max-w-xs">
                          {isSpanish 
                            ? 'Este juego no tiene demo disponible'
                            : 'This game doesn\'t have a demo available'}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Game Info Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg">
                      <span className="text-sm">{game.provider}</span>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{game.popularity}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  {game.embedUrl ? (
                    <>
                      <div className="aspect-video">
                        <iframe
                          src={game.embedUrl}
                          className="w-full h-full"
                          allowFullScreen
                          allow="autoplay"
                          title={game.name}
                        />
                      </div>
                      <button
                        onClick={handleFullscreen}
                        className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-colors"
                        title={isSpanish ? 'Pantalla completa' : 'Fullscreen'}
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <div className="aspect-video bg-gray-900 flex items-center justify-center">
                      <div className="text-center text-white">
                        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                        <p className="text-lg font-semibold mb-2">
                          {isSpanish ? 'Demo no disponible' : 'Demo not available'}
                        </p>
                        <p className="text-sm text-gray-300">
                          {isSpanish 
                            ? 'Este juego no tiene demo disponible en este momento'
                            : 'This game doesn\'t have a demo available at the moment'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Game Title and Actions */}
            <div className="bg-white rounded-xl p-6 mt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{game.name}</h1>
                  <p className="text-gray-600">{game.description}</p>
                </div>
                <FavoriteButton 
                  entityId={game.id}
                  entityType="game"
                  size="md"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {game.rtp && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <Target className="w-4 h-4" />
                      RTP
                    </div>
                    <div className="font-bold text-lg text-gray-900">{game.rtp}%</div>
                  </div>
                )}
                {game.volatility && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <Zap className="w-4 h-4" />
                      {isSpanish ? 'Volatilidad' : 'Volatility'}
                    </div>
                    <div className={`inline-block px-2 py-1 rounded text-sm font-medium ${getVolatilityColor(game.volatility)}`}>
                      {getVolatilityLabel(game.volatility)}
                    </div>
                  </div>
                )}
                {game.maxWin && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <Award className="w-4 h-4" />
                      Max Win
                    </div>
                    <div className="font-bold text-lg text-gray-900">{game.maxWin.toLocaleString()}x</div>
                  </div>
                )}
                {game.paylines && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <Gamepad2 className="w-4 h-4" />
                      {isSpanish ? 'Líneas' : 'Paylines'}
                    </div>
                    <div className="font-bold text-lg text-gray-900">{game.paylines}</div>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex gap-6">
                  <button
                    onClick={() => setActiveTab('info')}
                    className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                      activeTab === 'info' 
                        ? 'border-green-600 text-green-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {isSpanish ? 'Información' : 'Information'}
                  </button>
                  <button
                    onClick={() => setActiveTab('casinos')}
                    className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                      activeTab === 'casinos' 
                        ? 'border-green-600 text-green-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {isSpanish ? 'Dónde Jugar' : 'Where to Play'} ({game.availableAt.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('similar')}
                    className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                      activeTab === 'similar' 
                        ? 'border-green-600 text-green-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {isSpanish ? 'Juegos Similares' : 'Similar Games'}
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'info' && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {/* Features */}
                    {game.features && game.features.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">
                          {isSpanish ? 'Características' : 'Features'}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {game.features.map((feature) => (
                            <span key={feature} className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technical Details */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">
                        {isSpanish ? 'Detalles Técnicos' : 'Technical Details'}
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isSpanish ? 'Proveedor' : 'Provider'}:</span>
                          <span className="font-medium text-gray-900">{game.provider}</span>
                        </div>
                        {game.releaseDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">{isSpanish ? 'Lanzamiento' : 'Release'}:</span>
                            <span className="font-medium text-gray-900">{game.releaseDate}</span>
                          </div>
                        )}
                        {game.minBet && game.maxBet && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">{isSpanish ? 'Apuesta' : 'Bet Range'}:</span>
                            <span className="font-medium text-gray-900">
                              ${game.minBet} - ${game.maxBet.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {game.reels && game.rows && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">{isSpanish ? 'Diseño' : 'Layout'}:</span>
                            <span className="font-medium text-gray-900">
                              {game.reels}x{game.rows}
                            </span>
                          </div>
                        )}
                        {game.theme && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">{isSpanish ? 'Tema' : 'Theme'}:</span>
                            <span className="font-medium text-gray-900">{game.theme}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* How to Play */}
                    {game.howToPlay && (
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">
                          {game.howToPlay.title || (isSpanish ? 'Cómo Jugar' : 'How to Play')}
                        </h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <ol className="space-y-2">
                            {game.howToPlay.steps.map((step, index) => (
                              <li key={index} className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </span>
                                <span className="text-gray-700">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}

                    {/* Bonus Features */}
                    {game.bonusFeatures && (
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">
                          {game.bonusFeatures.title || (isSpanish ? 'Funciones de Bonificación' : 'Bonus Features')}
                        </h3>
                        <div className="space-y-3">
                          {game.bonusFeatures.features.map((feature, index) => (
                            <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                              <h4 className="font-semibold text-purple-900 mb-1">{feature.name}</h4>
                              <p className="text-sm text-gray-700">{feature.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tips & Strategies */}
                    {game.tipsStrategies && (
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">
                          {game.tipsStrategies.title || (isSpanish ? 'Consejos y Estrategias' : 'Tips & Strategies')}
                        </h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <ul className="space-y-2">
                            {game.tipsStrategies.tips.map((tip, index) => (
                              <li key={index} className="flex gap-2">
                                <span className="text-green-600 mt-1">•</span>
                                <span className="text-gray-700">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'casinos' && (
                  <motion.div
                    key="casinos"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {availableCasinos.map((casino) => (
                      <div key={casino.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-bold text-lg text-gray-900">
                                {casino.name}
                              </h4>
                              <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                                <Star className="w-4 h-4 fill-green-600 text-green-600" />
                                <span className="text-sm font-semibold text-green-700">{casino.rating}</span>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <DollarSign className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {isSpanish ? 'Bono de Bienvenida' : 'Welcome Bonus'}
                                </span>
                              </div>
                              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                                <p className="font-bold text-green-800">
                                  {casino.bonus.percentage}% hasta ${casino.bonus.amount.toLocaleString('es-MX')} MXN
                                </p>
                                {casino.bonus.freeSpins && (
                                  <p className="text-sm text-green-700">
                                    + {casino.bonus.freeSpins} {isSpanish ? 'Giros Gratis' : 'Free Spins'}
                                  </p>
                                )}
                                <p className="text-xs text-gray-600 mt-1">
                                  {isSpanish ? 'Depósito mínimo' : 'Min deposit'}: ${casino.bonus.minDeposit} MXN
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {casino.features.slice(0, 3).map((feature) => (
                                <span key={feature} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <Link
                            href={`/${locale}/casinos/${casino.id}`}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 ml-4"
                          >
                            {isSpanish ? 'Visitar Casino' : 'Visit Casino'}
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                    
                    {availableCasinos.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>{isSpanish ? 'No hay casinos disponibles para este juego' : 'No casinos available for this game'}</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'similar' && (
                  <motion.div
                    key="similar"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    {similarGames.map((similarGame) => (
                      <Link
                        key={similarGame.id}
                        href={`/${locale}/juegos/${similarGame.slug}`}
                        className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                      >
                        <div className="aspect-video bg-gray-200 rounded mb-2 relative overflow-hidden">
                          {similarGame.image && (
                            <img
                              src={similarGame.image}
                              alt={similarGame.name}
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm">{similarGame.name}</h4>
                        <p className="text-xs text-gray-600">{similarGame.provider}</p>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Play Count */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900">
                  {isSpanish ? 'Estadísticas' : 'Statistics'}
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{isSpanish ? 'Veces jugado' : 'Times played'}:</span>
                  <span className="font-semibold text-gray-900">
                    {game.playCount?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{isSpanish ? 'Popularidad' : 'Popularity'}:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${game.popularity}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{game.popularity}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Info */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                {isSpanish ? 'Acerca del Proveedor' : 'About Provider'}
              </h3>
              <p className="text-gray-600 mb-4">
                {game.provider} {isSpanish 
                  ? 'es uno de los principales proveedores de juegos de casino con cientos de títulos populares.'
                  : 'is one of the leading casino game providers with hundreds of popular titles.'}
              </p>
              <Link
                href={`/${locale}/juegos?provider=${encodeURIComponent(game.provider)}`}
                className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
              >
                {isSpanish ? 'Ver todos los juegos de' : 'See all games from'} {game.provider}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tips */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {isSpanish ? 'Consejo' : 'Tip'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isSpanish 
                      ? 'Prueba siempre el juego en modo demo antes de jugar con dinero real. Esto te ayudará a entender las mecánicas y características del juego.'
                      : 'Always try the game in demo mode before playing with real money. This will help you understand the game mechanics and features.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && game.embedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 bg-black/80">
              <h2 className="text-white font-bold text-lg">{game.name}</h2>
              <button
                onClick={exitFullscreen}
                className="text-white hover:text-gray-300 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1">
              <iframe
                src={game.embedUrl}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay"
                title={game.name}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}