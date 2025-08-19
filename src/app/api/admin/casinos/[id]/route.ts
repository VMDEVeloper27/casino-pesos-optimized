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
      reviewCount: data.review_count || 0,
      established: data.established || new Date().getFullYear(),
      license: data.licenses?.join(', ') || '',
      bonus: data.bonus_percentage && data.bonus_amount 
        ? `${data.bonus_percentage}% hasta $${data.bonus_amount} MXN`
        : 'Sin bono',
      bonusExtra: data.bonus_free_spins 
        ? `+ ${data.bonus_free_spins} Giros Gratis`
        : '',
      promoCode: data.bonus_code || '',
      rollover: data.bonus_wagering || '30x',
      minDeposit: data.bonus_min_deposit || 100,
      games: data.games_total || 1000,
      providers: data.providers || [],
      withdrawal: data.withdrawal_time || '24-48 horas',
      paymentMethods: data.payment_methods || [],
      support: [
        data.support_email && 'Email',
        data.support_phone && 'Phone',
        data.live_chat_available && 'Live Chat'
      ].filter(Boolean),
      languages: data.languages || ['Español'],
      pros: data.pros || [],
      cons: data.cons || [],
      description: data.description || data.description_es || '',
      features: {
        liveCasino: data.features?.includes('live_casino') || false,
        mobileApp: data.features?.includes('mobile_app') || false,
        crypto: data.features?.includes('crypto') || false,
        sportsbook: data.features?.includes('sportsbook') || false,
        vipProgram: data.features?.includes('vip_program') || false,
      },
      status: data.status || 'pending',
      // Additional fields from DB
      websiteUrl: data.website_url || '',
      affiliateLink: data.affiliate_link || '',
      isActive: data.is_active ?? true,
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
    
    // Map fields to database columns - only include non-empty values
    const casinoData: any = {
      updated_at: new Date().toISOString()
    };
    
    // Required fields
    if (updatedCasino.name) casinoData.name = updatedCasino.name;
    if (updatedCasino.logo) casinoData.logo = updatedCasino.logo;
    if (updatedCasino.rating) casinoData.rating = updatedCasino.rating;
    
    // Optional fields - only add if they have values
    if (updatedCasino.id) casinoData.slug = updatedCasino.id;
    if (updatedCasino.established) casinoData.established = updatedCasino.established;
    if (updatedCasino.license) {
      casinoData.licenses = updatedCasino.license.split(',').map((l: string) => l.trim()).filter(Boolean);
    }
    
    // Bonus fields
    if (bonusPercentage !== null) casinoData.bonus_percentage = bonusPercentage;
    if (bonusAmount !== null) casinoData.bonus_amount = bonusAmount;
    if (bonusFreeSpins !== null) casinoData.bonus_free_spins = bonusFreeSpins;
    if (updatedCasino.promoCode) casinoData.bonus_code = updatedCasino.promoCode;
    if (updatedCasino.rollover) casinoData.bonus_wagering = updatedCasino.rollover;
    if (updatedCasino.minDeposit) casinoData.bonus_min_deposit = updatedCasino.minDeposit;
    
    // Games
    if (updatedCasino.games) casinoData.games_total = updatedCasino.games;
    
    // Other fields
    if (updatedCasino.withdrawal) casinoData.withdrawal_time = updatedCasino.withdrawal;
    if (updatedCasino.paymentMethods) casinoData.payment_methods = updatedCasino.paymentMethods;
    if (updatedCasino.languages) casinoData.languages = updatedCasino.languages;
    if (updatedCasino.pros) casinoData.pros = updatedCasino.pros;
    if (updatedCasino.cons) casinoData.cons = updatedCasino.cons;
    if (updatedCasino.description) casinoData.description = updatedCasino.description;
    if (updatedCasino.status) casinoData.status = updatedCasino.status;
    
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
    
    const { data, error } = await supabase
      .from('casinos')
      .update(casinoData)
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