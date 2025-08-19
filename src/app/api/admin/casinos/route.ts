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
    
    // Map fields directly from form (they already have correct names)
    const casinoData = {
      id: newCasino.id || newCasino.slug || newCasino.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newCasino.name,
      slug: newCasino.slug || newCasino.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      logo: newCasino.logo || `/images/${newCasino.slug || newCasino.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-logo.png`,
      rating: newCasino.rating || 4.0,
      established: newCasino.established || new Date().getFullYear(),
      affiliate_link: newCasino.affiliate_link || '',
      features: newCasino.features || [],
      bonus_type: newCasino.bonus_type || 'welcome',
      bonus_amount: newCasino.bonus_amount || 0,
      bonus_percentage: newCasino.bonus_percentage || 100,
      bonus_free_spins: newCasino.bonus_free_spins || 0,
      bonus_min_deposit: newCasino.bonus_min_deposit || 100,
      bonus_wagering: newCasino.bonus_wagering || '30x',
      bonus_code: newCasino.bonus_code || '',
      games_total: newCasino.games_total || 1000,
      games_slots: newCasino.games_slots || 800,
      games_live: newCasino.games_live || 150,
      games_table: newCasino.games_table || 50,
      payment_methods: newCasino.payment_methods || [],
      withdrawal_time: newCasino.withdrawal_time || '24-48 horas',
      licenses: newCasino.licenses || [],
      currencies: newCasino.currencies || ['MXN', 'USD'],
      pros: newCasino.pros || [],
      cons: newCasino.cons || [],
      status: newCasino.status || 'active',
      is_featured: newCasino.is_featured || false
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