'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  entityId: string;
  entityType: 'casino' | 'game';
  initialFavorited?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function FavoriteButton({
  entityId,
  entityType,
  initialFavorited = false,
  size = 'md',
  showLabel = false,
  className = ''
}: FavoriteButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch favorite status when component mounts if user is logged in
    if (session?.user?.email) {
      checkFavoriteStatus();
    }
  }, [session, entityId, entityType]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(`/api/favorites/${entityType}s`);
      if (response.ok) {
        const data = await response.json();
        const favoriteIds = data.favorites.map((f: any) => 
          entityType === 'casino' ? f.casino_id : f.game_id
        );
        setIsFavorited(favoriteIds.includes(entityId));
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleToggleFavorite = async () => {
    // Check if user is logged in
    if (status === 'unauthenticated' || !session) {
      toast.error('Debes iniciar sesión para agregar a favoritos');
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setIsLoading(true);
    
    try {
      const url = `/api/favorites/${entityType}s`;
      const method = isFavorited ? 'DELETE' : 'POST';
      
      const response = await fetch(
        isFavorited ? `${url}?${entityType}Id=${entityId}` : url,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: !isFavorited ? JSON.stringify({ 
            [`${entityType}Id`]: entityId 
          }) : undefined,
        }
      );

      if (response.ok) {
        setIsFavorited(!isFavorited);
        toast.success(
          isFavorited 
            ? `Eliminado de favoritos` 
            : `Agregado a favoritos`
        );
      } else {
        const error = await response.json();
        if (response.status === 401) {
          toast.error('Debes iniciar sesión');
          router.push('/auth/signin');
        } else if (response.status === 409) {
          toast.info('Ya está en tus favoritos');
          setIsFavorited(true);
        } else {
          toast.error(error.error || 'Error al actualizar favoritos');
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Error al actualizar favoritos');
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`
        relative inline-flex items-center justify-center
        ${showLabel ? 'gap-2 px-4 py-2' : sizeClasses[size]}
        ${showLabel ? 'rounded-lg' : 'rounded-full'}
        transition-all duration-200
        ${isFavorited 
          ? 'bg-red-500 text-white hover:bg-red-600' 
          : 'bg-white text-gray-600 hover:text-red-500 hover:bg-red-50 border border-gray-200'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      title={isFavorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      {isLoading ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : (
        <>
          <Heart 
            className={`${iconSizes[size]} ${isFavorited ? 'fill-current' : ''}`} 
          />
          {showLabel && (
            <span className="font-medium text-sm">
              {isFavorited ? 'En Favoritos' : 'Agregar'}
            </span>
          )}
        </>
      )}
    </button>
  );
}