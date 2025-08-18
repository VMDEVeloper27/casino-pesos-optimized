'use client';

import { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';
// import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  entityId: string;
  entityType: 'casino' | 'game';
  entityName?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function FavoriteButtonLocal({
  entityId,
  entityType,
  entityName = '',
  size = 'md',
  showLabel = false,
  className = ''
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storageKey = `favorites_${entityType}s`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const favorites = JSON.parse(stored);
      setIsFavorited(favorites.includes(entityId));
    }
  }, [entityId, entityType]);

  const toggleFavorite = async () => {
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
        // Toast notification removed - silent update
        console.log('Removed from favorites');
      } else {
        // Add to favorites
        favorites.push(entityId);
        localStorage.setItem(storageKey, JSON.stringify(favorites));
        setIsFavorited(true);
        // Toast notification removed - silent update
        console.log('Added to favorites');
      }
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('favoritesUpdated', { 
        detail: { entityType, entityId, isFavorited: !isFavorited } 
      }));
      
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={cn(
        "relative flex items-center justify-center rounded-full transition-all",
        "bg-white border-2 hover:scale-110 active:scale-95",
        isFavorited 
          ? "border-red-500 text-red-500 hover:border-red-600 hover:text-red-600" 
          : "border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-400",
        "shadow-md hover:shadow-lg",
        sizeClasses[size],
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      title={isFavorited ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      {isLoading ? (
        <Loader2 className={cn(iconSizes[size], "animate-spin")} />
      ) : (
        <Heart 
          className={cn(
            iconSizes[size],
            "transition-all",
            isFavorited && "fill-current"
          )} 
        />
      )}
      
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isFavorited ? 'En Favoritos' : 'Favorito'}
        </span>
      )}
      
      {/* Pulse animation when favorited */}
      {isFavorited && !isLoading && (
        <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-20"></span>
      )}
    </button>
  );
}