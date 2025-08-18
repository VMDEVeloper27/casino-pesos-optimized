import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'editor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Получаем статистику из базы данных
    
    // Общее количество казино
    const { count: totalCasinos, error: casinosError } = await supabase
      .from('casinos')
      .select('*', { count: 'exact', head: true });

    if (casinosError) throw casinosError;

    // Активные бонусы (казино со статусом active)
    const { count: activeBonuses, error: bonusesError } = await supabase
      .from('casinos')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    if (bonusesError) throw bonusesError;

    // Последние 5 казино
    const { data: recentCasinos, error: recentError } = await supabase
      .from('casinos')
      .select('id, name, slug, rating, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (recentError) throw recentError;

    // Статистика посещений (пока моковые данные, можно интегрировать с Google Analytics)
    const totalVisits = Math.floor(Math.random() * 50000) + 10000;
    const visitsGrowth = (Math.random() * 30).toFixed(1);
    const conversionRate = (Math.random() * 5 + 1).toFixed(1);
    const conversionGrowth = (Math.random() * 2).toFixed(1);

    // Статистика по играм
    const { data: gamesStats, error: gamesError } = await supabase
      .from('casinos')
      .select('games_total, games_slots, games_live, games_table');

    let totalGames = 0;
    let totalSlots = 0;
    let totalLive = 0;
    let totalTable = 0;

    if (!gamesError && gamesStats) {
      gamesStats.forEach(casino => {
        totalGames += casino.games_total || 0;
        totalSlots += casino.games_slots || 0;
        totalLive += casino.games_live || 0;
        totalTable += casino.games_table || 0;
      });
    }

    // Топ казино по рейтингу
    const { data: topCasinos, error: topError } = await supabase
      .from('casinos')
      .select('id, name, slug, rating')
      .order('rating', { ascending: false })
      .limit(3);

    if (topError) throw topError;

    return NextResponse.json({
      stats: {
        totalCasinos: totalCasinos || 0,
        activeBonuses: activeBonuses || 0,
        totalVisits: totalVisits.toLocaleString(),
        visitsGrowth: `+${visitsGrowth}%`,
        conversionRate: `${conversionRate}%`,
        conversionGrowth: `+${conversionGrowth}%`,
        casinosGrowth: '+12%', // Можно рассчитать реально, сравнив с прошлым периодом
      },
      recentCasinos: recentCasinos || [],
      topCasinos: topCasinos || [],
      gamesStats: {
        total: totalGames,
        slots: totalSlots,
        live: totalLive,
        table: totalTable,
      },
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}