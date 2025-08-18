import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { notifyNewCasino } from '@/lib/email-notifications';

// Get all casinos
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('casinos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error reading casinos:', error);
    return NextResponse.json({ error: 'Failed to fetch casinos' }, { status: 500 });
  }
}

// Create new casino
export async function POST(request: NextRequest) {
  try {
    const newCasino = await request.json();
    
    // Generate ID if not provided
    if (!newCasino.id) {
      newCasino.id = newCasino.slug || newCasino.name.toLowerCase().replace(/\s+/g, '-');
    }
    
    // Map fields to database columns
    const casinoData = {
      id: newCasino.id,
      name: newCasino.name,
      slug: newCasino.slug || newCasino.id,
      logo: newCasino.logo,
      rating: newCasino.rating || 0,
      established: newCasino.established,
      affiliate_link: newCasino.affiliateLink || '',
      features: newCasino.features || [],
      bonus_type: newCasino.bonus?.type,
      bonus_amount: newCasino.bonus?.amount || 0,
      bonus_percentage: newCasino.bonus?.percentage || 0,
      bonus_free_spins: newCasino.bonus?.freeSpins || 0,
      bonus_min_deposit: newCasino.bonus?.minDeposit || 0,
      bonus_wagering: newCasino.bonus?.wageringRequirement || 0,
      bonus_code: newCasino.bonus?.code,
      games_total: newCasino.games?.total || 0,
      games_slots: newCasino.games?.slots || 0,
      games_live: newCasino.games?.live || 0,
      games_table: newCasino.games?.table || 0,
      payment_methods: newCasino.paymentMethods || [],
      withdrawal_time: newCasino.withdrawalTime,
      licenses: newCasino.licenses || [],
      currencies: newCasino.currencies || [],
      pros: newCasino.pros || [],
      cons: newCasino.cons || [],
      status: newCasino.status || 'active',
      is_featured: newCasino.isFeatured || false
    };
    
    const { data, error } = await supabase
      .from('casinos')
      .insert(casinoData)
      .select()
      .single();
    
    if (error) throw error;
    
    // Send email notifications to subscribed users
    await notifyNewCasino({
      id: data.id,
      name: data.name,
      bonus: {
        percentage: data.bonus_percentage || 0,
        amount: data.bonus_amount || 0
      }
    });
    
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating casino:', error);
    if (error.code === '23505') { // Unique violation
      return NextResponse.json({ error: 'Casino with this ID or slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create casino' }, { status: 500 });
  }
}