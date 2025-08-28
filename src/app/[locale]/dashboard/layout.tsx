import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata-helpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata(
    locale,
    '/dashboard',
    'Mi Panel | Favoritos y Bonos | CasinosPesos',
    'My Dashboard | Favorites and Bonuses | CasinosPesos',
    'Gestiona tus casinos favoritos, bonos guardados y preferencias de juego en tu panel personal de CasinosPesos',
    'Manage your favorite casinos, saved bonuses and gaming preferences in your personal CasinosPesos dashboard',
    {
      robots: {
        index: false,
        follow: false,
      }
    }
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}