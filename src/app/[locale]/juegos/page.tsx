import type { Metadata } from 'next';
import GameBrowser from './GameBrowser';
import { getAllGames } from '@/lib/game-database';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string; provider?: string; search?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  if (isSpanish) {
    return {
      title: 'Explorador de Juegos de Casino | +1000 Juegos | CasinosPesos',
      description: 'Descubre más de 1000 juegos de casino: tragamonedas, casino en vivo, crash games y más. Encuentra dónde jugar tus favoritos.',
      keywords: 'juegos casino, tragamonedas, slots, casino en vivo, crash games, aviator, crazy time',
    };
  } else {
    return {
      title: 'Casino Game Browser | 1000+ Games | CasinosPesos',
      description: 'Discover over 1000 casino games: slots, live casino, crash games and more. Find where to play your favorites.',
      keywords: 'casino games, slots, live casino, crash games, aviator, crazy time',
    };
  }
}

export default async function JuegosPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { type, provider, search } = await searchParams;
  const games = await getAllGames();

  return (
    <GameBrowser 
      locale={locale}
      initialType={type}
      initialProvider={provider}
      initialSearch={search}
      allGames={games}
    />
  );
}