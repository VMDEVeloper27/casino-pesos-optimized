'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, PlayCircle, Trash2, Loader2, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { getAllCasinosSync } from '@/lib/casino-database';
import { getAllGamesSync } from '@/lib/game-database';
import FavoriteButton from '@/components/FavoriteButton';

interface FavoritesClientProps {
  userEmail: string;
}

interface FavoriteCasino {
  casino_id: string;
  created_at: string;
}

interface FavoriteGame {
  game_id: string;
  created_at: string;
}

export default function FavoritesClient({ userEmail }: FavoritesClientProps) {
  const [favoriteCasinos, setFavoriteCasinos] = useState<FavoriteCasino[]>([]);
  const [favoriteGames, setFavoriteGames] = useState<FavoriteGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'casinos' | 'games'>('casinos');
  const [searchQuery, setSearchQuery] = useState('');

  const allCasinos = getAllCasinosSync();
  const allGames = getAllGamesSync();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setIsLoading(true);
    try {
      const [casinosRes, gamesRes] = await Promise.all([
        fetch('/api/favorites/casinos'),
        fetch('/api/favorites/games')
      ]);

      if (casinosRes.ok) {
        const casinosData = await casinosRes.json();
        setFavoriteCasinos(casinosData.favorites);
      }

      if (gamesRes.ok) {
        const gamesData = await gamesRes.json();
        setFavoriteGames(gamesData.favorites);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Error al cargar favoritos');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (entityId: string, entityType: 'casino' | 'game') => {
    try {
      const response = await fetch(
        `/api/favorites/${entityType}s?${entityType}Id=${entityId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        if (entityType === 'casino') {
          setFavoriteCasinos(prev => prev.filter(f => f.casino_id !== entityId));
        } else {
          setFavoriteGames(prev => prev.filter(f => f.game_id !== entityId));
        }
        toast.success('Eliminado de favoritos');
      } else {
        toast.error('Error al eliminar de favoritos');
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Error al eliminar de favoritos');
    }
  };

  // Get full casino/game data
  const favoriteCasinosWithData = favoriteCasinos
    .map(fav => {
      const casino = allCasinos.find(c => c.id === fav.casino_id);
      return casino ? { ...casino, favorited_at: fav.created_at } : null;
    })
    .filter(Boolean)
    .filter(casino => 
      !searchQuery || 
      casino!.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const favoriteGamesWithData = favoriteGames
    .map(fav => {
      const game = allGames.find(g => g.id === fav.game_id);
      return game ? { ...game, favorited_at: fav.created_at } : null;
    })
    .filter(Boolean)
    .filter(game => 
      !searchQuery || 
      game!.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                {favoriteCasinos.length + favoriteGames.length}
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
              {favoriteCasinosWithData.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteCasinosWithData.map((casino) => (
                    <motion.div
                      key={casino!.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="p-6">
                        {/* Casino Logo */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            {casino!.logo ? (
                              <Image
                                src={casino!.logo}
                                alt={casino!.name}
                                width={80}
                                height={64}
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-xl font-bold text-gray-400">
                                {casino!.name.substring(0, 3)}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeFavorite(casino!.id, 'casino')}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar de favoritos"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {casino!.name}
                        </h3>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(casino!.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold">{casino!.rating}/5</span>
                        </div>

                        {/* Bonus */}
                        <div className="bg-green-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-green-600 font-semibold">
                            {casino!.bonus.percentage}% hasta ${casino!.bonus.amount.toLocaleString()}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Link
                            href={`/casinos/${casino!.id}`}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold text-center transition-colors"
                          >
                            Ver Reseña
                          </Link>
                          <a
                            href={casino!.affiliateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold text-center transition-colors"
                          >
                            Visitar
                          </a>
                        </div>

                        {/* Added date */}
                        <p className="text-xs text-gray-500 mt-3 text-center">
                          Agregado el {new Date(casino!.favorited_at).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
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
                    href="/casinos"
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
              {favoriteGamesWithData.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {favoriteGamesWithData.map((game) => (
                    <motion.div
                      key={game!.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                    >
                      {/* Game Image */}
                      <div className="relative aspect-video bg-gray-100">
                        {game!.image && (
                          <Image
                            src={game!.image}
                            alt={game!.name}
                            fill
                            className="object-cover"
                          />
                        )}
                        <button
                          onClick={() => removeFavorite(game!.id, 'game')}
                          className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                          title="Eliminar de favoritos"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1">
                          {game!.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {game!.provider}
                        </p>

                        {/* Game Stats */}
                        {game!.rtp && (
                          <div className="bg-gray-50 rounded-lg p-2 mb-3">
                            <p className="text-xs text-gray-500">RTP: {game!.rtp}%</p>
                          </div>
                        )}

                        {/* Actions */}
                        <Link
                          href={`/juegos/${game!.id}`}
                          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors"
                        >
                          <PlayCircle className="w-4 h-4" />
                          Jugar
                        </Link>

                        {/* Added date */}
                        <p className="text-xs text-gray-500 mt-3 text-center">
                          {new Date(game!.favorited_at).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
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
                    href="/juegos"
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