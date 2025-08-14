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
    
    return NextResponse.json(data);
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
    
    // Map fields to database columns
    const casinoData = {
      name: updatedCasino.name,
      slug: updatedCasino.slug,
      logo: updatedCasino.logo,
      rating: updatedCasino.rating,
      established: updatedCasino.established,
      affiliate_link: updatedCasino.affiliateLink,
      features: updatedCasino.features,
      bonus_type: updatedCasino.bonus?.type,
      bonus_amount: updatedCasino.bonus?.amount,
      bonus_percentage: updatedCasino.bonus?.percentage,
      bonus_free_spins: updatedCasino.bonus?.freeSpins,
      bonus_min_deposit: updatedCasino.bonus?.minDeposit,
      bonus_wagering: updatedCasino.bonus?.wageringRequirement,
      bonus_code: updatedCasino.bonus?.code,
      games_total: updatedCasino.games?.total,
      games_slots: updatedCasino.games?.slots,
      games_live: updatedCasino.games?.live,
      games_table: updatedCasino.games?.table,
      payment_methods: updatedCasino.paymentMethods,
      withdrawal_time: updatedCasino.withdrawalTime,
      licenses: updatedCasino.licenses,
      currencies: updatedCasino.currencies,
      pros: updatedCasino.pros,
      cons: updatedCasino.cons,
      status: updatedCasino.status,
      is_featured: updatedCasino.isFeatured,
      updated_at: new Date().toISOString()
    };
    
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