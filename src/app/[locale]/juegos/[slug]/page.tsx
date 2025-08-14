import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GameDetail from './GameDetail';
import { getGameBySlug, getAllGames } from '@/lib/game-database';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const game = getGameBySlug(slug);
  
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

export async function generateStaticParams() {
  const games = await getAllGames();
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default async function GamePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return <GameDetail game={game} locale={locale} />;
}