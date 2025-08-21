import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GameDetail from './GameDetail';
import { getAllGames, getGameDetailsBySlug } from '@/lib/game-database';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  
  // Try to fetch from game_details table first
  const gameDetails = await getGameDetailsBySlug(slug);
  
  if (gameDetails) {
    const isSpanish = locale === 'es';
    
    if (isSpanish) {
      return {
        title: gameDetails.meta_title || `${gameDetails.name} - Juega Gratis | Demo ${gameDetails.provider} | CasinosPesos`,
        description: gameDetails.meta_description || gameDetails.description || `Juega ${gameDetails.name} gratis. RTP ${gameDetails.rtp}%, Volatilidad ${gameDetails.volatility}, Max Win ${gameDetails.max_win}x. Demo sin registro.`,
        keywords: gameDetails.meta_keywords || [`${gameDetails.name.toLowerCase()}`, `${gameDetails.name.toLowerCase()} demo`, `${gameDetails.name.toLowerCase()} gratis`, `${gameDetails.provider.toLowerCase()}`, 'juegos casino'],
      };
    } else {
      return {
        title: gameDetails.meta_title || `${gameDetails.name} - Play Free | ${gameDetails.provider} Demo | CasinosPesos`,
        description: gameDetails.meta_description || gameDetails.description || `Play ${gameDetails.name} for free. RTP ${gameDetails.rtp}%, Volatility ${gameDetails.volatility}, Max Win ${gameDetails.max_win}x. No registration demo.`,
        keywords: gameDetails.meta_keywords || [`${gameDetails.name.toLowerCase()}`, `${gameDetails.name.toLowerCase()} demo`, `${gameDetails.name.toLowerCase()} free`, `${gameDetails.provider.toLowerCase()}`, 'casino games'],
      };
    }
  }
  
  // Fallback to regular games table
  const games = await getAllGames();
  const game = games.find(g => g.slug === slug);
  
  if (!game) {
    return {
      title: 'Juego no encontrado | CasinosPesos',
      description: 'El juego que buscas no está disponible.'
    };
  }
  
  const isSpanish = locale === 'es';
  
  if (isSpanish) {
    return {
      title: `${game.name} - Juega Gratis | Demo ${game.provider} | CasinosPesos`,
      description: game.description || `Juega ${game.name} gratis. RTP ${game.rtp}%, Volatilidad ${game.volatility}, Max Win ${game.maxWin}x. Demo sin registro.`,
      keywords: `${game.name.toLowerCase()}, ${game.name.toLowerCase()} demo, ${game.name.toLowerCase()} gratis, ${game.provider.toLowerCase()}, juegos casino`,
    };
  } else {
    return {
      title: `${game.name} - Play Free | ${game.provider} Demo | CasinosPesos`,
      description: game.description || `Play ${game.name} for free. RTP ${game.rtp}%, Volatility ${game.volatility}, Max Win ${game.maxWin}x. No registration demo.`,
      keywords: `${game.name.toLowerCase()}, ${game.name.toLowerCase()} demo, ${game.name.toLowerCase()} free, ${game.provider.toLowerCase()}, casino games`,
    };
  }
}

// Disable static generation for now to avoid build-time errors
// export async function generateStaticParams() {
//   const games = await getAllGames();
//   return games.map((game) => ({
//     slug: game.slug,
//   }));
// }

export default async function GamePage({ params }: PageProps) {
  try {
    const { locale, slug } = await params;
    
    // Always use getAllGames to get consistent data with game list
    const games = await getAllGames();
    const game = games.find(g => g.slug === slug);
    
    if (!game) {
      // Try game_details table as fallback
      const gameDetails = await getGameDetailsBySlug(slug);
      
      if (gameDetails) {
        // Transform game_details data to match Game interface
        const transformedGame = {
          id: gameDetails.game_id || gameDetails.id,
          name: gameDetails.name,
          slug: gameDetails.slug,
          provider: gameDetails.provider,
          type: gameDetails.type,
          category: gameDetails.category,
          rtp: gameDetails.rtp,
          volatility: gameDetails.volatility,
          maxWin: gameDetails.max_win,
          minBet: gameDetails.min_bet,
          maxBet: gameDetails.max_bet,
          paylines: gameDetails.paylines,
          reels: gameDetails.reels,
          rows: gameDetails.rows,
          features: gameDetails.features || [],
          theme: gameDetails.theme,
          releaseDate: gameDetails.release_date,
          popularity: gameDetails.popularity || 50,
          playCount: gameDetails.play_count,
          image: gameDetails.image,
          screenshots: gameDetails.screenshots,
          demoUrl: gameDetails.demo_url,
          embedUrl: gameDetails.embed_url,
          fullscreenMode: gameDetails.fullscreen_mode,
          mobileOptimized: gameDetails.mobile_optimized,
          availableAt: gameDetails.available_casinos || [],
          description: gameDetails.description,
          instructions: gameDetails.instructions,
          paytable: gameDetails.paytable,
          isNew: gameDetails.is_new,
          isFeatured: gameDetails.is_featured,
          isHot: gameDetails.is_hot,
          // Add additional detailed fields
          howToPlay: gameDetails.how_to_play,
          bonusFeatures: gameDetails.bonus_features,
          symbols: gameDetails.symbols,
          tipsStrategies: gameDetails.tips_strategies
        };
        
        return <GameDetail game={transformedGame} locale={locale} />;
      }
      
      notFound();
    }

    return <GameDetail game={game} locale={locale} />;
  } catch (error) {
    console.error('Error in GamePage:', error);
    notFound();
  }
}