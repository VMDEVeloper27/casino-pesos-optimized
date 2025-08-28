import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata-helpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata(
    locale,
    '/rss',
    'RSS Feed | Noticias de Casinos | CasinosPesos',
    'RSS Feed | Casino News | CasinosPesos',
    'Suscríbete al feed RSS de CasinosPesos. Últimas noticias, bonos y actualizaciones de casinos online en México',
    'Subscribe to CasinosPesos RSS feed. Latest news, bonuses and updates from online casinos in Mexico',
    {
      keywords: {
        es: 'rss feed casino, noticias casino mexico, actualizaciones casino, feed casinospesos',
        en: 'casino rss feed, mexico casino news, casino updates, casinospesos feed'
      }
    }
  );
}

export default function RSSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}