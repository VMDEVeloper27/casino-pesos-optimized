import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// Get single casino
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    
    const { data, error } = await supabase
      .from('casinos')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Casino not found' }, { status: 404 });
      }
      throw error;
    }
    
    // Map database fields to form fields
    const mappedData = {
      id: data.id || data.slug,
      name: data.name,
      logo: data.logo,
      rating: data.rating || 4.0,
      reviewCount: 0, // Field doesn't exist in DB
      established: data.established || new Date().getFullYear(),
      license: Array.isArray(data.licenses) ? data.licenses.join(', ') : '',
      bonus: data.bonus_percentage && data.bonus_amount 
        ? `${data.bonus_percentage}% hasta $${data.bonus_amount} MXN`
        : 'Sin bono',
      bonusExtra: data.bonus_free_spins 
        ? `+ ${data.bonus_free_spins} Giros Gratis`
        : '',
      promoCode: data.bonus_code || '',
      rollover: data.bonus_wagering ? `${data.bonus_wagering}x` : '30x',
      minDeposit: data.bonus_min_deposit || 100,
      games: data.games_total || 1000,
      providers: [], // Field doesn't exist in DB
      withdrawal: data.withdrawal_time || '24-48 horas',
      paymentMethods: data.payment_methods || [],
      support: [], // Fields don't exist in DB
      languages: ['Español'], // Field doesn't exist in DB
      pros: data.pros || [],
      cons: data.cons || [],
      description: '', // Field doesn't exist in DB
      features: {
        liveCasino: Array.isArray(data.features) && data.features.includes('live_casino'),
        mobileApp: Array.isArray(data.features) && data.features.includes('mobile_app'),
        crypto: Array.isArray(data.features) && data.features.includes('crypto'),
        sportsbook: Array.isArray(data.features) && data.features.includes('sportsbook') || 
                    Array.isArray(data.features) && data.features.includes('Deportes'),
        vipProgram: Array.isArray(data.features) && data.features.includes('vip_program'),
      },
      status: data.status || 'pending',
      // Additional fields from DB
      websiteUrl: '', // Field doesn't exist in DB
      affiliateLink: data.affiliate_link || '',
      isActive: true, // Field doesn't exist in DB
      isFeatured: data.is_featured || false,
    };
    
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Error fetching casino:', error);
    return NextResponse.json({ error: 'Failed to fetch casino' }, { status: 500 });
  }
}

// Update casino
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const updatedCasino = await request.json();
    
    console.log('Updating casino with ID:', id);
    console.log('Received data:', updatedCasino);
    
    // Parse bonus string if needed
    let bonusPercentage = null;
    let bonusAmount = null;
    let bonusFreeSpins = null;
    
    if (updatedCasino.bonus && typeof updatedCasino.bonus === 'string') {
      // Try to parse bonus like "100% hasta $30,000 MXN"
      const percentMatch = updatedCasino.bonus.match(/(\d+)%/);
      const amountMatch = updatedCasino.bonus.match(/\$([0-9,]+)/);
      if (percentMatch) bonusPercentage = parseInt(percentMatch[1]);
      if (amountMatch) bonusAmount = parseInt(amountMatch[1].replace(/,/g, ''));
    }
    
    if (updatedCasino.bonusExtra && typeof updatedCasino.bonusExtra === 'string') {
      // Try to parse extra bonus like "+ 200 Giros Gratis"
      const spinsMatch = updatedCasino.bonusExtra.match(/(\d+)\s*(Giros|Spins)/i);
      if (spinsMatch) bonusFreeSpins = parseInt(spinsMatch[1]);
    }
    
    // Map fields to database columns - include ALL fields, even empty ones
    const casinoData: any = {
      updated_at: new Date().toISOString(),
      // Basic fields - always update
      name: updatedCasino.name || '',
      logo: updatedCasino.logo || null, // Allow null for empty logo
      rating: parseFloat(updatedCasino.rating) || 4.0,
      slug: updatedCasino.id || id,
      established: parseInt(updatedCasino.established) || new Date().getFullYear(),
      licenses: updatedCasino.license 
        ? updatedCasino.license.split(',').map((l: string) => l.trim()).filter(Boolean)
        : [],
      
      // Bonus fields - always update
      bonus_percentage: bonusPercentage,
      bonus_amount: bonusAmount,
      bonus_free_spins: bonusFreeSpins,
      bonus_code: updatedCasino.promoCode || null,
      bonus_wagering: updatedCasino.rollover 
        ? parseInt(updatedCasino.rollover.toString().replace(/[^0-9]/g, '')) || null
        : null,
      bonus_min_deposit: parseInt(updatedCasino.minDeposit) || null,
      
      // Games  
      games_total: parseInt(updatedCasino.games) || 0,
      
      // Other fields
      withdrawal_time: updatedCasino.withdrawal || null,
      payment_methods: updatedCasino.paymentMethods || [],
      // Skip languages field as it doesn't exist in the database
      pros: updatedCasino.pros || [],
      cons: updatedCasino.cons || [],
      // Skip description field as it doesn't exist in the database
      status: updatedCasino.status || 'pending'
    };
    
    // Features
    if (updatedCasino.features) {
      const features = [];
      if (updatedCasino.features.liveCasino) features.push('live_casino');
      if (updatedCasino.features.mobileApp) features.push('mobile_app');
      if (updatedCasino.features.crypto) features.push('crypto');
      if (updatedCasino.features.sportsbook) features.push('sportsbook');
      if (updatedCasino.features.vipProgram) features.push('vip_program');
      casinoData.features = features;
    }
    
    console.log('Sending to Supabase:', casinoData);
    
    const { data, error } = await supabase
      .from('casinos')
      .update(casinoData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase update error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Casino not found' }, { status: 404 });
      }
      return NextResponse.json({ 
        error: error.message || 'Database update failed',
        details: error 
      }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating casino:', error);
    return NextResponse.json({ error: 'Failed to update casino' }, { status: 500 });
  }
}

// Partial update casino (PATCH)
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const partialUpdate = await request.json();
    
    // Map only provided fields
    const updateData: any = {
      updated_at: new Date().toISOString()
    };
    
    // Map fields if they exist in the request
    if (partialUpdate.name !== undefined) updateData.name = partialUpdate.name;
    if (partialUpdate.slug !== undefined) updateData.slug = partialUpdate.slug;
    if (partialUpdate.logo !== undefined) updateData.logo = partialUpdate.logo;
    if (partialUpdate.rating !== undefined) updateData.rating = partialUpdate.rating;
    if (partialUpdate.established !== undefined) updateData.established = partialUpdate.established;
    if (partialUpdate.affiliateLink !== undefined) updateData.affiliate_link = partialUpdate.affiliateLink;
    if (partialUpdate.features !== undefined) updateData.features = partialUpdate.features;
    if (partialUpdate.paymentMethods !== undefined) updateData.payment_methods = partialUpdate.paymentMethods;
    if (partialUpdate.withdrawalTime !== undefined) updateData.withdrawal_time = partialUpdate.withdrawalTime;
    if (partialUpdate.licenses !== undefined) updateData.licenses = partialUpdate.licenses;
    if (partialUpdate.currencies !== undefined) updateData.currencies = partialUpdate.currencies;
    if (partialUpdate.pros !== undefined) updateData.pros = partialUpdate.pros;
    if (partialUpdate.cons !== undefined) updateData.cons = partialUpdate.cons;
    if (partialUpdate.status !== undefined) updateData.status = partialUpdate.status;
    if (partialUpdate.isFeatured !== undefined) updateData.is_featured = partialUpdate.isFeatured;
    
    // Handle bonus object
    if (partialUpdate.bonus) {
      if (partialUpdate.bonus.type !== undefined) updateData.bonus_type = partialUpdate.bonus.type;
      if (partialUpdate.bonus.amount !== undefined) updateData.bonus_amount = partialUpdate.bonus.amount;
      if (partialUpdate.bonus.percentage !== undefined) updateData.bonus_percentage = partialUpdate.bonus.percentage;
      if (partialUpdate.bonus.freeSpins !== undefined) updateData.bonus_free_spins = partialUpdate.bonus.freeSpins;
      if (partialUpdate.bonus.minDeposit !== undefined) updateData.bonus_min_deposit = partialUpdate.bonus.minDeposit;
      if (partialUpdate.bonus.wageringRequirement !== undefined) updateData.bonus_wagering = partialUpdate.bonus.wageringRequirement;
      if (partialUpdate.bonus.code !== undefined) updateData.bonus_code = partialUpdate.bonus.code;
    }
    
    // Handle games object  
    if (partialUpdate.games) {
      if (partialUpdate.games.total !== undefined) updateData.games_total = partialUpdate.games.total;
      if (partialUpdate.games.slots !== undefined) updateData.games_slots = partialUpdate.games.slots;
      if (partialUpdate.games.live !== undefined) updateData.games_live = partialUpdate.games.live;
      if (partialUpdate.games.table !== undefined) updateData.games_table = partialUpdate.games.table;
    }
    
    const { data, error } = await supabase
      .from('casinos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Casino not found' }, { status: 404 });
      }
      throw error;
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error partially updating casino:', error);
    return NextResponse.json({ error: 'Failed to update casino' }, { status: 500 });
  }
}

// Delete casino
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    
    const { error } = await supabase
      .from('casinos')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Casino not found' }, { status: 404 });
      }
      throw error;
    }
    
    return NextResponse.json({ message: 'Casino deleted successfully' });
  } catch (error) {
    console.error('Error deleting casino:', error);
    return NextResponse.json({ error: 'Failed to delete casino' }, { status: 500 });
  }
}