import { NextRequest, NextResponse } from 'next/server';
import { getAllCasinos } from '@/lib/casino-database';

export async function GET(request: NextRequest) {
  try {
    const casinos = await getAllCasinos();
    
    // Extract and format bonuses from casinos
    const bonuses = casinos.map((casino, index) => ({
      id: index + 1,
      casino: casino.name.replace(' Casino', ''),
      type: getBonusType(casino.bonus),
      amount: typeof casino.bonus === 'object' 
        ? `${casino.bonus.percentage}% hasta $${casino.bonus.amount.toLocaleString()} MXN`
        : casino.bonus,
      extra: getExtraBonus(casino.bonus),
      code: typeof casino.bonus === 'object' ? casino.bonus.code || 'AUTO' : 'AUTO',
      rollover: typeof casino.bonus === 'object' ? `${casino.bonus.wageringRequirement}x` : '30x',
      minDeposit: typeof casino.bonus === 'object' ? casino.bonus.minDeposit : 200,
      maxBet: 500, // Default value as it's not in our data
      validFor: '30 días',
      rating: casino.rating,
      featured: index < 2 // Feature first two bonuses
    }));
    
    return NextResponse.json(bonuses);
  } catch (error) {
    console.error('Error fetching bonuses:', error);
    return NextResponse.json({ error: 'Failed to fetch bonuses' }, { status: 500 });
  }
}

function getBonusType(bonus: any): string {
  if (typeof bonus === 'string') return 'Bono de Bienvenida';
  
  switch (bonus.type) {
    case 'welcome': return 'Bono de Bienvenida';
    case 'no_deposit': return 'Bono Sin Depósito';
    case 'reload': return 'Bono de Recarga';
    case 'cashback': return 'Cashback';
    case 'free_spins': return 'Giros Gratis';
    default: return 'Bono de Bienvenida';
  }
}

function getExtraBonus(bonus: any): string {
  if (typeof bonus === 'string') return '';
  
  if (bonus.freeSpins) {
    return `+ ${bonus.freeSpins} Giros Gratis`;
  }
  
  return '';
}