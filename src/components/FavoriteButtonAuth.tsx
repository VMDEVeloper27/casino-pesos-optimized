'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

interface FavoriteButtonAuthProps {
  entityId: string;
  entityType: 'casino' | 'game';
  className?: string;
}

export default function FavoriteButtonAuth({ 
  entityId, 
  entityType, 
  className = '' 
}: FavoriteButtonAuthProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if item is favorited on mount and when session changes
  useEffect(() => {
    if (status === 'authenticated') {
      checkFavoriteStatus();
    }
  }, [status, entityId, entityType]);

  const checkFavoriteStatus = async () => {
    try {
      // Используем разные API для казино и игр
      const apiUrl = entityType === 'casino' 
        ? '/api/favorites-email' 
        : '/api/favorite-games';
      
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        
        if (entityType === 'casino') {
          const favorites = data.favorites || [];
          const isFav = favorites.some((fav: any) => 
            fav.casino_id === entityId
          );
          setIsFavorite(isFav);
        } else {
          const favoriteGames = data.favoriteGames || [];
          const isFav = favoriteGames.some((fav: any) => 
            fav.game_id === entityId
          );
          setIsFavorite(isFav);
        }
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If not authenticated, redirect to login
    if (status !== 'authenticated') {
      router.push('/auth/signin');
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
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
          setIsFavorite(false);
        } else {
          console.error('Failed to remove from favorites');
        }
      } else {
        // Add to favorites
        let apiUrl, body;
        
        if (entityType === 'casino') {
          apiUrl = '/api/favorites-email';
          body = { casinoId: entityId };
        } else {
          apiUrl = '/api/favorite-games';
          body = { gameId: entityId };
        }

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          setIsFavorite(true);
        } else {
          console.error('Failed to add to favorites');
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`p-2 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
        isFavorite ? 'text-red-500' : 'text-gray-400'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`w-5 h-5 transition-all ${isFavorite ? 'fill-current' : ''}`}
      />
    </button>
  );
}