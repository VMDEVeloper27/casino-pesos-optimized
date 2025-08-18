'use client';

import { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';

interface FavoriteButtonProps {
  entityId: string;
  entityType: 'casino' | 'game';
  entityName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function FavoriteButtonSimple({
  entityId,
  entityType,
  entityName = '',
  size = 'md'
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storageKey = `favorites_${entityType}s`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const favorites = JSON.parse(stored);
        setIsFavorited(favorites.includes(entityId));
      } catch (e) {
        console.error('Error parsing favorites:', e);
      }
    }
  }, [entityId, entityType]);

  const toggleFavorite = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const storageKey = `favorites_${entityType}s`;
      const stored = localStorage.getItem(storageKey);
      const favorites = stored ? JSON.parse(stored) : [];
      
      if (isFavorited) {
        // Remove from favorites
        const updated = favorites.filter((id: string) => id !== entityId);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        setIsFavorited(false);
      } else {
        // Add to favorites
        if (!favorites.includes(entityId)) {
          favorites.push(entityId);
        }
        localStorage.setItem(storageKey, JSON.stringify(favorites));
        setIsFavorited(true);
      }
      
    } catch (error) {
      console.error('Error updating favorites:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const sizeStyles = {
    sm: { button: 'w-8 h-8', icon: 'w-4 h-4' },
    md: { button: 'w-10 h-10', icon: 'w-5 h-5' },
    lg: { button: 'w-12 h-12', icon: 'w-6 h-6' }
  };

  const { button: buttonSize, icon: iconSize } = sizeStyles[size];

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`
        ${buttonSize}
        relative flex items-center justify-center rounded-full
        bg-white border-2 transition-all duration-200
        ${isFavorited 
          ? 'border-red-500 text-red-500 hover:border-red-600 hover:text-red-600' 
          : 'border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-400'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95 cursor-pointer'}
        shadow-md hover:shadow-lg
      `}
      title={isFavorited ? "Quitar de favoritos" : "Añadir a favoritos"}
      aria-label={isFavorited ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      {isLoading ? (
        <Loader2 className={`${iconSize} animate-spin`} />
      ) : (
        <>
          <Heart 
            className={`${iconSize} transition-all duration-200`}
            fill={isFavorited ? 'currentColor' : 'none'}
          />
          {isFavorited && (
            <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-20"></span>
          )}
        </>
      )}
    </button>
  );
}