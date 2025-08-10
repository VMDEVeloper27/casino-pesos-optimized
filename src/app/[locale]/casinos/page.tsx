import CasinosClient from './CasinosClient';
import { getAllCasinos } from '@/lib/casino-database';

export default async function CasinosPage() {
  const casinos = await getAllCasinos();
  
  return <CasinosClient casinos={casinos} />;
}