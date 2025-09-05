'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, PlayCircle, Trash2, Loader2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllCasinosSync } from '@/lib/casino-database';
import { getAllGames } from '@/lib/game-database';
import type { Game } from '@/lib/game-database';

interface FavoritesClientProps {
  userEmail: string;
}

interface Favorite {
  id: string;
  user_id?: string;
  userId?: string;
  casino_id?: string | null;
  casinoId?: string | null;
  game_id?: string | null;
  gameId?: string | null;
  entity_type?: string;
  created_at?: string;
  createdAt?: string;
  casino?: {
    id: string;
    name: string;
    slug: string;
    logo: string;
    rating: number;
  };
  game?: {
    id: string;
    category: string;
    provider: string;
    popularTitles: string[];
  };
}

export default function FavoritesClientDB({ userEmail }: FavoritesClientProps) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'casinos' | 'games'>('casinos');
  const [searchQuery, setSearchQuery] = useState('');
  const [allGames, setAllGames] = useState<Game[]>([]);

  const allCasinos = getAllCasinosSync();

  useEffect(() => {
    // Load games from database
    const loadGames = async () => {
      const games = await getAllGames();
      setAllGames(games);
    };
    loadGames();
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setIsLoading(true);
    try {
      // Получаем избранные казино
      const casinoResponse = await fetch('/api/favorites-email');
      let casinoFavorites = [];
      if (casinoResponse.ok) {
        const casinoData = await casinoResponse.json();
        casinoFavorites = (casinoData.favorites || []).map((f: any) => ({
          ...f,
          entity_type: 'casino'
        }));
      }

      // Получаем избранные игры
      const gameResponse = await fetch('/api/favorite-games');
      let gameFavorites = [];
      if (gameResponse.ok) {
        const gameData = await gameResponse.json();
        gameFavorites = (gameData.favoriteGames || []).map((f: any) => ({
          ...f,
          entity_type: 'game'
        }));
      }

      // Объединяем результаты
      setFavorites([...casinoFavorites, ...gameFavorites]);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (entityId: string, entityType: 'casino' | 'game') => {
    try {
      let apiUrl, params;
      
      if (entityType === 'casino') {
        apiUrl = '/api/favorites-email';
        params = `?casinoId=${entityId}`;
      } else {
        apiUrl = '/api/favorite-games';
        params = `?gameId=${entityId}`;
      }
      
      const response = await fetch(`${apiUrl}${params}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFavorites(prev => prev.filter(f => 
          entityType === 'casino' 
            ? (f.casino_id !== entityId && f.casinoId !== entityId)
            : (f.game_id !== entityId && f.gameId !== entityId)
        ));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  // Filter favorites by type and search
  const favoriteCasinos = favorites
    .filter(f => f.casino_id || f.casinoId)
    .map(f => {
      const casinoId = f.casino_id || f.casinoId;
      const casino = allCasinos.find(c => c.id === casinoId);
      return casino ? { ...f, fullCasino: casino, casinoId } : null;
    })
    .filter(Boolean)
    .filter(f => 
      !searchQuery || 
      f!.fullCasino.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const favoriteGames = favorites
    .filter(f => f.game_id || f.gameId)
    .map(f => {
      const gameId = f.game_id || f.gameId;
      const game = allGames.find(g => g.id === gameId);
      return game ? { ...f, fullGame: game, gameId } : null;
    })
    .filter(Boolean)
    .filter(f => 
      !searchQuery || 
      f!.fullGame.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                Mis Favoritos
              </h1>
              <p className="text-gray-600 mt-2">
                Accede rápidamente a tus casinos y juegos favoritos
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total de favoritos</p>
              <p className="text-2xl font-bold text-gray-900">
                {favorites.length}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar en favoritos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl p-2 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('casinos')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                activeTab === 'casinos'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Casinos ({favoriteCasinos.length})
            </button>
            <button
              onClick={() => setActiveTab('games')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                activeTab === 'games'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Juegos ({favoriteGames.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'casinos' ? (
            <motion.div
              key="casinos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {favoriteCasinos.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteCasinos.map((favorite) => {
                    const casino = favorite?.fullCasino;
                    if (!casino) return null;
                    return (
                      <motion.div
                        key={favorite?.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="p-6">
                          {/* Casino Logo */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              {casino.logo ? (
                                <Image
                                  src={casino.logo}
                                  alt={casino.name}
                                  width={80}
                                  height={64}
                                  className="object-contain"
                                />
                              ) : (
                                <span className="text-xl font-bold text-gray-400">
                                  {casino.name.substring(0, 3)}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => removeFavorite(favorite.casinoId || casino.id, 'casino')}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar de favoritos"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {casino.name}
                          </h3>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
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
                            </div>
                            <span className="text-sm font-semibold">{casino.rating}/5</span>
                          </div>

                          {/* Bonus */}
                          {casino.bonus && (
                            <div className="bg-green-50 rounded-lg p-3 mb-4">
                              <p className="text-sm text-green-600 font-semibold">
                                {casino.bonus.percentage}% hasta ${casino.bonus.amount.toLocaleString()}
                              </p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-3">
                            <Link
                              href={`/es/casinos/${casino.slug || casino.id}`}
                              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-4 rounded-xl font-semibold text-center transition-colors min-h-[48px] flex items-center justify-center text-base"
                            >
                              Ver Reseña
                            </Link>
                            <a
                              href={casino.affiliateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 px-4 rounded-xl font-bold text-center transition-colors min-h-[48px] flex items-center justify-center text-base shadow-lg"
                            >
                              Visitar
                            </a>
                          </div>

                          {/* Added date */}
                          <p className="text-xs text-gray-500 mt-3 text-center">
                            Agregado el {new Date(favorite.created_at || favorite.createdAt || '').toLocaleDateString()}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-12 text-center">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No tienes casinos favoritos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explora nuestros casinos y agrega tus favoritos para acceder rápidamente
                  </p>
                  <Link
                    href="/es/casinos"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Explorar Casinos
                  </Link>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {favoriteGames.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {favoriteGames.map((favorite) => {
                    const game = favorite?.fullGame;
                    if (!game) return null;
                    return (
                      <motion.div
                        key={favorite?.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                      >
                        {/* Game Image */}
                        <div className="relative aspect-video bg-gray-100">
                          {game.image && (
                            <Image
                              src={game.image}
                              alt={game.name}
                              fill
                              className="object-cover"
                            />
                          )}
                          <button
                            onClick={() => removeFavorite(favorite?.gameId || game.id, 'game')}
                            className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                            title="Eliminar de favoritos"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-1">
                            {game.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {game.provider}
                          </p>

                          {/* Game Stats */}
                          {game.rtp && (
                            <div className="bg-gray-50 rounded-lg p-2 mb-3">
                              <p className="text-xs text-gray-500">RTP: {game.rtp}%</p>
                            </div>
                          )}

                          {/* Actions */}
                          <Link
                            href={`/es/juegos/${game.slug || game.id}`}
                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors"
                          >
                            <PlayCircle className="w-4 h-4" />
                            Jugar
                          </Link>

                          {/* Added date */}
                          <p className="text-xs text-gray-500 mt-3 text-center">
                            {new Date(favorite?.created_at || favorite?.createdAt || '').toLocaleDateString()}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-12 text-center">
                  <PlayCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No tienes juegos favoritos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Descubre nuevos juegos y guarda tus favoritos
                  </p>
                  <Link
                    href="/es/juegos"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Explorar Juegos
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}