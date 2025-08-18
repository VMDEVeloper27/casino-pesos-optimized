import CasinosClientWithFilters from './CasinosClientWithFilters';
import { getAllCasinos } from '@/lib/casino-database';
import { Suspense } from 'react';
import CasinosLoading from './loading';

export const revalidate = 300; // Revalidate every 5 minutes

export default async function CasinosPage() {
  const casinos = await getAllCasinos();
  
  return (
    <Suspense fallback={<CasinosLoading />}>
      <CasinosClientWithFilters casinos={casinos} />
    </Suspense>
  );
}