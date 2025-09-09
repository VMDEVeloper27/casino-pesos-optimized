import type { Metadata } from 'next';
import GameBrowser from './GameBrowser';
import { getAllGames } from '@/lib/game-database';
import { getCanonicalUrl } from '@/lib/canonical';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string; provider?: string; search?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  if (isSpanish) {
    return {
      title: 'Juegos de Casino Online México 2025 | CasinosPesos',
      description: 'Juega +1000 juegos de casino online: tragamonedas, ruleta, blackjack, póker y casino en vivo. Prueba gratis o juega con dinero real en México.',
      keywords: 'juegos casino mexico, tragamonedas gratis, slots online, casino en vivo, ruleta online, blackjack mexico, crash games, aviator',
      alternates: {
        canonical: getCanonicalUrl('/juegos', locale),
        languages: {
          'es-MX': getCanonicalUrl('/juegos', 'es'),
          'en-US': getCanonicalUrl('/games', 'en'),
        }
      },
      openGraph: {
        title: 'Juegos de Casino Online | +1000 Juegos Gratis',
        description: 'Explora más de 1000 juegos de casino. Juega gratis o con dinero real en los mejores casinos de México.',
        url: 'https://www.casinospesos.com/es/juegos',
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Juegos de Casino Online México'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Juegos de Casino Online Gratis | CasinosPesos',
        description: 'Juega +1000 juegos de casino: slots, ruleta, blackjack y más.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  } else {
    return {
      title: 'Online Casino Games Free and Real Money 2025 | CasinosPesos',
      description: 'Play 1000+ online casino games: slots, roulette, blackjack, poker and live casino. Try for free or play with real money in Mexico.',
      keywords: 'casino games mexico, free slots, online slots, live casino, online roulette, blackjack mexico, crash games, aviator',
      alternates: {
        canonical: getCanonicalUrl('/games', locale),
        languages: {
          'es-MX': getCanonicalUrl('/juegos', 'es'),
          'en-US': getCanonicalUrl('/games', 'en'),
        }
      },
      openGraph: {
        title: 'Online Casino Games | 1000+ Free Games',
        description: 'Explore over 1000 casino games. Play for free or real money at the best casinos in Mexico.',
        url: 'https://www.casinospesos.com/en/games',
        siteName: 'CasinosPesos',
        locale: 'en_US',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Online Casino Games Mexico'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Online Casino Games Free | CasinosPesos',
        description: 'Play 1000+ casino games: slots, roulette, blackjack and more.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  }
}

export default async function JuegosPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { type, provider, search } = await searchParams;
  const games = await getAllGames();
  
  console.log(`Total games loaded: ${games.length}`);
  const uniqueProviders = [...new Set(games.map(g => g.provider))];
  console.log(`Unique providers: ${uniqueProviders.length}`);
  console.log('Providers:', uniqueProviders);
  
  // Подсчет игр по провайдерам
  const providerCounts = {};
  uniqueProviders.forEach(provider => {
    providerCounts[provider] = games.filter(g => g.provider === provider).length;
  });
  console.log('Games per provider:', providerCounts);
  
  // Проверка, все ли игры имеют провайдера
  const gamesWithoutProvider = games.filter(g => !g.provider);
  console.log(`Games without provider: ${gamesWithoutProvider.length}`);

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