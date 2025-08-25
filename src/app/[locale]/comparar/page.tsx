import type { Metadata } from 'next';
import { getAllCasinos } from '@/lib/casino-database';
import CompararClientCompact from './CompararClientCompact';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ casinos?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  if (isSpanish) {
    return {
      title: 'Comparador de Casinos Online México 2025 | Análisis Detallado | CasinosPesos',
      description: 'Compara los mejores casinos online de México lado a lado. Analiza bonos hasta $50,000 MXN, RTP, métodos de pago OXXO/SPEI y velocidad de retiros.',
      keywords: 'comparar casinos mexico, comparador casinos online, mejor casino mexico, analisis casinos, casino vs casino, bonos comparacion',
      alternates: {
        canonical: 'https://www.casinospesos.com/es/comparar',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es/comparar',
          'en-US': 'https://www.casinospesos.com/en/compare',
        }
      },
      openGraph: {
        title: 'Comparador de Casinos Online México | Encuentra el Mejor',
        description: 'Herramienta para comparar casinos: bonos, pagos, retiros y juegos. Toma la mejor decisión.',
        url: 'https://www.casinospesos.com/es/comparar',
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Comparador de Casinos México'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Comparador de Casinos Online México 2025',
        description: 'Compara bonos, RTP, métodos de pago y más. Encuentra tu casino ideal.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  } else {
    return {
      title: 'Online Casino Comparison Mexico 2025 | Detailed Analysis | CasinosPesos',
      description: 'Compare the best online casinos in Mexico side by side. Analyze bonuses up to $50,000 MXN, RTP, OXXO/SPEI payment methods and withdrawal speed.',
      keywords: 'compare casinos mexico, online casino comparison, best casino mexico, casino analysis, casino vs casino, bonus comparison',
      alternates: {
        canonical: 'https://www.casinospesos.com/en/compare',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es/comparar',
          'en-US': 'https://www.casinospesos.com/en/compare',
        }
      },
      openGraph: {
        title: 'Online Casino Comparison Mexico | Find the Best',
        description: 'Tool to compare casinos: bonuses, payments, withdrawals and games. Make the best decision.',
        url: 'https://www.casinospesos.com/en/compare',
        siteName: 'CasinosPesos',
        locale: 'en_US',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Casino Comparison Mexico'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Online Casino Comparison Mexico 2025',
        description: 'Compare bonuses, RTP, payment methods and more. Find your ideal casino.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  }
}

export default async function CompararPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { casinos: casinoParam } = await searchParams;
  
  // Fetch all casinos from database
  const allCasinos = await getAllCasinos();
  
  // Parse selected casinos from URL parameter or use defaults
  const initialCasinos = casinoParam 
    ? casinoParam.split(',').filter(id => allCasinos.some(c => c.id === id)).slice(0, 4)
    : [];
  
  return (
    <Suspense fallback={<ComparisonLoading />}>
      <CompararClientCompact 
        allCasinos={allCasinos} 
        initialCasinos={initialCasinos}
        locale={locale}
      />
    </Suspense>
  );
}

function ComparisonLoading() {
  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
        </div>
        <div className="bg-white rounded-xl p-8">
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}