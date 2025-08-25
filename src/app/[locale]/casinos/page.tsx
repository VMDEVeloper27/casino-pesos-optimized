import CasinosClientWithFilters from './CasinosClientWithFilters';
import { getAllCasinos } from '@/lib/casino-database';
import { Suspense } from 'react';
import CasinosLoading from './loading';
import type { Metadata } from 'next';

export const revalidate = 300; // Revalidate every 5 minutes

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'es') {
    return {
      title: 'Todos los Casinos Online México 2025 | Lista Completa | CasinosPesos',
      description: 'Lista completa de +50 casinos online en México. Compara bonos, métodos de pago, juegos y licencias. Encuentra el casino perfecto para ti.',
      keywords: 'lista casinos mexico, todos los casinos online, comparar casinos mexico, casinos pesos mexicanos, mejores casinos 2025',
      alternates: {
        canonical: 'https://www.casinospesos.com/es/casinos',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es/casinos',
          'en-US': 'https://www.casinospesos.com/en/casinos',
        }
      },
      openGraph: {
        title: 'Todos los Casinos Online en México | Lista Completa 2025',
        description: 'Explora y compara +50 casinos online confiables en México. Bonos exclusivos y pagos rápidos.',
        url: 'https://www.casinospesos.com/es/casinos',
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Lista de Casinos Online México'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Todos los Casinos Online México 2025',
        description: 'Lista completa con +50 casinos confiables. Compara y elige el mejor.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  }
  
  return {
    title: 'All Online Casinos Mexico 2025 | Complete List | CasinosPesos',
    description: 'Complete list of 50+ online casinos in Mexico. Compare bonuses, payment methods, games and licenses. Find the perfect casino for you.',
    keywords: 'mexico casino list, all online casinos, compare casinos mexico, mexican peso casinos, best casinos 2025',
    alternates: {
      canonical: 'https://www.casinospesos.com/en/casinos',
      languages: {
        'es-MX': 'https://www.casinospesos.com/es/casinos',
        'en-US': 'https://www.casinospesos.com/en/casinos',
      }
    },
    openGraph: {
      title: 'All Online Casinos in Mexico | Complete List 2025',
      description: 'Explore and compare 50+ trusted online casinos in Mexico. Exclusive bonuses and fast payouts.',
      url: 'https://www.casinospesos.com/en/casinos',
      siteName: 'CasinosPesos',
      locale: 'en_US',
      type: 'website',
      images: [{
        url: 'https://www.casinospesos.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Online Casinos List Mexico'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'All Online Casinos Mexico 2025',
      description: 'Complete list with 50+ trusted casinos. Compare and choose the best.',
      images: ['https://www.casinospesos.com/logo.png'],
    }
  };
}

export default async function CasinosPage() {
  const casinos = await getAllCasinos();
  
  return (
    <Suspense fallback={<CasinosLoading />}>
      <CasinosClientWithFilters casinos={casinos} />
    </Suspense>
  );
}