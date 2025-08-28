import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata-helpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata(
    locale,
    '/guias',
    'Guías de Casino | Estrategias y Consejos | CasinosPesos',
    'Casino Guides | Strategies and Tips | CasinosPesos',
    'Guías completas sobre casinos online, estrategias de juego, consejos de expertos y tutoriales para principiantes',
    'Complete guides about online casinos, gaming strategies, expert tips and tutorials for beginners',
    {
      keywords: {
        es: 'guías casino, estrategias casino, consejos juegos casino, tutoriales casino online',
        en: 'casino guides, casino strategies, casino game tips, online casino tutorials'
      }
    }
  );
}

export default function GuiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}