import { supabase } from './supabase';

// Define the complete Casino type (same as original)
export interface Casino {
  id: string;
  name: string;
  slug: string;
  logo: string;
  rating: number;
  established: number;
  affiliateLink: string;
  features: string[];
  bonus: {
    type: string;
    amount: number;
    percentage: number;
    freeSpins?: number;
    minDeposit: number;
    wageringRequirement: number;
    code?: string;
  };
  games: {
    total: number;
    slots: number;
    live: number;
    table: number;
  };
  paymentMethods: string[];
  withdrawalTime: string;
  licenses: string[];
  currencies: string[];
  pros: string[];
  cons: string[];
  status?: string;
  lastModified?: string;
}

// Transform Supabase data to Casino interface
function transformSupabaseToCasino(data: any): Casino {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    logo: data.logo || '/images/casino-placeholder.png',
    rating: data.rating || 0,
    established: data.established || 2020,
    affiliateLink: data.affiliate_link || '#',
    features: data.features || [],
    bonus: {
      type: data.bonus_type || 'welcome',
      amount: data.bonus_amount || 0,
      percentage: data.bonus_percentage || 100,
      freeSpins: data.bonus_free_spins || 0,
      minDeposit: data.bonus_min_deposit || 0,
      wageringRequirement: data.bonus_wagering || 0,
      code: data.bonus_code || ''
    },
    games: {
      total: data.games_total || 0,
      slots: data.games_slots || 0,
      live: data.games_live || 0,
      table: data.games_table || 0
    },
    paymentMethods: data.payment_methods || [],
    withdrawalTime: data.withdrawal_time || '24-48 horas',
    licenses: data.licenses || [],
    currencies: data.currencies || ['MXN'],
    pros: data.pros || [],
    cons: data.cons || [],
    status: data.status || 'active',
    lastModified: data.updated_at || new Date().toISOString()
  };
}

// Cache for client-side usage
let cachedCasinos: Casino[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 300000; // 5 minutes cache

// Fallback casino data with local images
function getCasinoFallbackData(): Casino[] {
  return [
    {
      id: 'caliente',
      name: 'Caliente',
      slug: 'caliente',
      logo: '/images/caliente-logo.png',
      rating: 4.8,
      established: 1916,
      affiliateLink: 'https://caliente.mx',
      features: ['Deportes', 'Casino en vivo', 'Apuestas rápidas'],
      bonus: {
        type: 'welcome',
        amount: 10000,
        percentage: 100,
        freeSpins: 100,
        minDeposit: 200,
        wageringRequirement: 30,
        code: 'CALIENTE2024'
      },
      games: {
        total: 2000,
        slots: 1500,
        live: 200,
        table: 300
      },
      paymentMethods: ['SPEI', 'OXXO', 'Tarjetas', 'Bitcoin'],
      withdrawalTime: '24-48 horas',
      licenses: ['SEGOB'],
      currencies: ['MXN'],
      pros: ['Marca mexicana establecida', 'Retiros rápidos', 'Excelente app móvil'],
      cons: ['Verificación puede tomar tiempo'],
      status: 'active',
      lastModified: new Date().toISOString()
    },
    {
      id: 'bet365',
      name: 'Bet365',
      slug: 'bet365',
      logo: '/images/bet365-logo.png',
      rating: 4.9,
      established: 2000,
      affiliateLink: 'https://bet365.mx',
      features: ['Líder mundial', 'Streaming en vivo', 'Cash out'],
      bonus: {
        type: 'welcome',
        amount: 3000,
        percentage: 100,
        freeSpins: 0,
        minDeposit: 100,
        wageringRequirement: 25,
        code: ''
      },
      games: {
        total: 3000,
        slots: 2000,
        live: 500,
        table: 500
      },
      paymentMethods: ['SPEI', 'Tarjetas', 'Skrill', 'Neteller'],
      withdrawalTime: '1-3 días',
      licenses: ['Gibraltar', 'Malta'],
      currencies: ['MXN', 'USD', 'EUR'],
      pros: ['Mejor plataforma deportiva', 'Streaming gratuito', 'Confiabilidad mundial'],
      cons: ['Interfaz puede ser compleja para principiantes'],
      status: 'active',
      lastModified: new Date().toISOString()
    },
    {
      id: 'codere',
      name: 'Codere',
      slug: 'codere',
      logo: '/images/codere-logo.png',
      rating: 4.7,
      established: 1980,
      affiliateLink: 'https://codere.mx',
      features: ['Marca española', 'Promociones frecuentes', 'Club VIP'],
      bonus: {
        type: 'welcome',
        amount: 5000,
        percentage: 200,
        freeSpins: 200,
        minDeposit: 200,
        wageringRequirement: 35,
        code: 'CODERE200'
      },
      games: {
        total: 1800,
        slots: 1400,
        live: 150,
        table: 250
      },
      paymentMethods: ['SPEI', 'OXXO', 'PayPal', 'Tarjetas'],
      withdrawalTime: '2-5 días',
      licenses: ['SEGOB', 'DGJS España'],
      currencies: ['MXN'],
      pros: ['Bonos generosos', 'Muchas promociones', 'Buen soporte'],
      cons: ['Retiros pueden ser lentos'],
      status: 'active',
      lastModified: new Date().toISOString()
    }
  ];
}

// Get all casinos from Supabase
export async function getAllCasinos(): Promise<Casino[]> {
  try {
    // Use cache on client side
    if (typeof window !== 'undefined') {
      const now = Date.now();
      if (cachedCasinos && (now - cacheTimestamp) < CACHE_DURATION) {
        return cachedCasinos;
      }
    }

    const { data, error } = await supabase
      .from('casinos')
      .select('*')
      .eq('status', 'active')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      // Use fallback data instead of throwing
      const fallbackData = getCasinoFallbackData();
      if (typeof window !== 'undefined') {
        cachedCasinos = fallbackData;
        cacheTimestamp = Date.now();
      }
      return fallbackData;
    }

    // Если данных нет, используем fallback
    if (!data || data.length === 0) {
      console.log('No casinos found in database, using fallback');
      const fallbackData = getCasinoFallbackData();
      if (typeof window !== 'undefined') {
        cachedCasinos = fallbackData;
        cacheTimestamp = Date.now();
      }
      return fallbackData;
    }

    const casinos = data.map(transformSupabaseToCasino);
    
    // Update cache
    if (typeof window !== 'undefined') {
      cachedCasinos = casinos;
      cacheTimestamp = Date.now();
    }

    return casinos;
  } catch (error) {
    console.error('Error getting casinos from Supabase:', error);
    // Return fallback data instead of empty array
    const fallbackData = getCasinoFallbackData();
    if (typeof window !== 'undefined') {
      cachedCasinos = fallbackData;
      cacheTimestamp = Date.now();
    }
    return fallbackData;
  }
}

// Synchronous version for client components (uses cache)
export function getAllCasinosSync(): Casino[] {
  // Return cached data if available
  if (cachedCasinos) {
    return cachedCasinos;
  }
  
  // Trigger async load for next time
  getAllCasinos();
  
  // Return empty array for first load
  return [];
}

// Get casino by ID
export async function getCasinoById(id: string): Promise<Casino | null> {
  try {
    const { data, error } = await supabase
      .from('casinos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return data ? transformSupabaseToCasino(data) : null;
  } catch (error) {
    console.error('Error getting casino by ID:', error);
    return null;
  }
}

// Get casino by slug
export async function getCasinoBySlug(slug: string): Promise<Casino | null> {
  try {
    // First try Supabase
    const { data, error } = await supabase
      .from('casinos')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      // If Supabase fails, fall back to local data
      console.warn('Supabase error, falling back to local data:', error.message);
      const localCasinos = await getAllCasinos();
      return localCasinos.find(c => c.slug === slug) || null;
    }

    return data ? transformSupabaseToCasino(data) : null;
  } catch (error) {
    console.error('Error getting casino by slug:', error);
    return null;
  }
}

// Get top casinos
export async function getTopCasinos(limit: number = 6): Promise<Casino[]> {
  try {
    const { data, error } = await supabase
      .from('casinos')
      .select('*')
      .eq('status', 'active')
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data || []).map(transformSupabaseToCasino);
  } catch (error) {
    console.error('Error getting top casinos:', error);
    return [];
  }
}

// Get featured casinos
export async function getFeaturedCasinos(): Promise<Casino[]> {
  try {
    const { data, error } = await supabase
      .from('casinos')
      .select('*')
      .eq('status', 'active')
      .eq('is_featured', true)
      .order('rating', { ascending: false });

    if (error) throw error;

    return (data || []).map(transformSupabaseToCasino);
  } catch (error) {
    console.error('Error getting featured casinos:', error);
    return [];
  }
}

// Update casino (admin function)
export async function updateCasino(id: string, updates: Partial<Casino>): Promise<Casino | null> {
  try {
    // Transform Casino format to Supabase format
    const updateData: any = {};
    
    if (updates.name) updateData.name = updates.name;
    if (updates.slug) updateData.slug = updates.slug;
    if (updates.logo) updateData.logo = updates.logo;
    if (updates.rating !== undefined) updateData.rating = updates.rating;
    if (updates.established) updateData.established = updates.established;
    if (updates.affiliateLink) updateData.affiliate_link = updates.affiliateLink;
    if (updates.features) updateData.features = updates.features;
    if (updates.paymentMethods) updateData.payment_methods = updates.paymentMethods;
    if (updates.withdrawalTime) updateData.withdrawal_time = updates.withdrawalTime;
    if (updates.licenses) updateData.licenses = updates.licenses;
    if (updates.currencies) updateData.currencies = updates.currencies;
    if (updates.pros) updateData.pros = updates.pros;
    if (updates.cons) updateData.cons = updates.cons;
    if (updates.status) updateData.status = updates.status;
    
    if (updates.bonus) {
      if (updates.bonus.type) updateData.bonus_type = updates.bonus.type;
      if (updates.bonus.amount !== undefined) updateData.bonus_amount = updates.bonus.amount;
      if (updates.bonus.percentage !== undefined) updateData.bonus_percentage = updates.bonus.percentage;
      if (updates.bonus.freeSpins !== undefined) updateData.bonus_free_spins = updates.bonus.freeSpins;
      if (updates.bonus.minDeposit !== undefined) updateData.bonus_min_deposit = updates.bonus.minDeposit;
      if (updates.bonus.wageringRequirement !== undefined) updateData.bonus_wagering = updates.bonus.wageringRequirement;
      if (updates.bonus.code) updateData.bonus_code = updates.bonus.code;
    }
    
    if (updates.games) {
      if (updates.games.total !== undefined) updateData.games_total = updates.games.total;
      if (updates.games.slots !== undefined) updateData.games_slots = updates.games.slots;
      if (updates.games.live !== undefined) updateData.games_live = updates.games.live;
      if (updates.games.table !== undefined) updateData.games_table = updates.games.table;
    }

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('casinos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Clear cache after update
    if (typeof window !== 'undefined') {
      cachedCasinos = null;
    }

    return data ? transformSupabaseToCasino(data) : null;
  } catch (error) {
    console.error('Error updating casino:', error);
    return null;
  }
}

// Add new casino (admin function)
export async function addCasino(casino: Casino): Promise<Casino | null> {
  try {
    const casinoData = {
      id: casino.id,
      name: casino.name,
      slug: casino.slug,
      logo: casino.logo,
      rating: casino.rating,
      established: casino.established,
      affiliate_link: casino.affiliateLink,
      features: casino.features,
      bonus_type: casino.bonus.type,
      bonus_amount: casino.bonus.amount,
      bonus_percentage: casino.bonus.percentage,
      bonus_free_spins: casino.bonus.freeSpins,
      bonus_min_deposit: casino.bonus.minDeposit,
      bonus_wagering: casino.bonus.wageringRequirement,
      bonus_code: casino.bonus.code,
      games_total: casino.games.total,
      games_slots: casino.games.slots,
      games_live: casino.games.live,
      games_table: casino.games.table,
      payment_methods: casino.paymentMethods,
      withdrawal_time: casino.withdrawalTime,
      licenses: casino.licenses,
      currencies: casino.currencies,
      pros: casino.pros,
      cons: casino.cons,
      status: casino.status || 'active',
      is_featured: false
    };

    const { data, error } = await supabase
      .from('casinos')
      .insert(casinoData)
      .select()
      .single();

    if (error) throw error;

    // Clear cache after adding
    if (typeof window !== 'undefined') {
      cachedCasinos = null;
    }

    return data ? transformSupabaseToCasino(data) : null;
  } catch (error) {
    console.error('Error adding casino:', error);
    return null;
  }
}

// Delete casino (admin function)
export async function deleteCasino(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('casinos')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Clear cache after deletion
    if (typeof window !== 'undefined') {
      cachedCasinos = null;
    }

    return true;
  } catch (error) {
    console.error('Error deleting casino:', error);
    return false;
  }
}