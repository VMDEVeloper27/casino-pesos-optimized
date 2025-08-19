import { Metadata } from 'next';
import BonusesClient from './BonusesClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  return {
    title: isSpanish ? 'Mis Bonos | Dashboard | CasinosPesos' : 'My Bonuses | Dashboard | CasinosPesos',
    description: isSpanish 
      ? 'Gestiona y rastrea tus bonos activos de casino'
      : 'Manage and track your active casino bonuses',
  };
}

export default async function BonusesPage({ params }: PageProps) {
  const { locale } = await params;
  
  return <BonusesClient locale={locale} />;
}