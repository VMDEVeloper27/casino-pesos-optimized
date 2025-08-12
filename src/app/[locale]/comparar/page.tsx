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
      title: 'Comparar Casinos Online en México | CasinosPesos',
      description: 'Compara los mejores casinos online de México lado a lado. Bonos, métodos de pago, retiros y más.',
      keywords: 'comparar casinos, mejores casinos mexico, comparador casinos, casino vs casino',
    };
  } else {
    return {
      title: 'Compare Online Casinos in Mexico | CasinosPesos',
      description: 'Compare the best online casinos in Mexico side by side. Bonuses, payment methods, withdrawals and more.',
      keywords: 'compare casinos, best casinos mexico, casino comparison, casino vs casino',
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