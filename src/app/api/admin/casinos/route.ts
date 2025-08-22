import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdminAdmin } from '@/lib/supabaseAdmin-admin';

// Get all casinos
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
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
    const data = await request.json();
    
    // Extract bonus data (will be saved separately in future)
    const { bonuses, prosData, consData, ...formData } = data;
    
    // Generate slug if not provided
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Map form fields to database columns
    // Using the correct field names that match the database
    const casinoData = {
      // Basic info
      name: formData.name,
      slug: slug,
      logo: formData.logo || `/images/${slug}-logo.png`,
      website_url: formData.websiteUrl || '',  // Map websiteUrl to website_url
      affiliate_link: formData.affiliateLink || '',  // Map affiliateLink to affiliate_link
      rating: formData.rating || 4.0,
      established: formData.established || new Date().getFullYear(),
      
      // Descriptions
      description: formData.description || '',
      description_es: formData.descriptionEs || formData.description || '',
      description_en: formData.descriptionEn || '',
      
      // Arrays
      features: formData.features || [],
      languages: formData.languages || ['es', 'en'],
      currencies: formData.currencies || ['MXN', 'USD'],
      licenses: formData.licenses || [],
      supported_countries: formData.supportedCountries || ['MX'],
      restricted_countries: formData.restrictedCountries || [],
      
      // Support
      support_email: formData.supportEmail || '',
      support_phone: formData.supportPhone || '',
      live_chat_available: formData.liveChatAvailable || false,
      support_hours: formData.supportHours || '24/7',
      
      // Status
      is_active: formData.isActive ?? true,
      is_featured: formData.isFeatured || false,
      priority: formData.priority || 0,
      status: formData.status?.toLowerCase() || 'draft', // Convert to lowercase
      
      // SEO
      meta_title: formData.metaTitle || `${formData.name} - Casino Online México`,
      meta_description: formData.metaDescription || '',
      meta_keywords: formData.metaKeywords || [],
      
      // Payment methods (temporary - should be in separate table)
      payment_methods: formData.paymentMethods || [],
      
      // Pros and cons (temporary - should be in separate tables)
      pros: prosData || formData.pros || [],
      cons: consData || formData.cons || [],
      
      // Main bonus data (temporary - should be in separate table)
      bonus_type: bonuses?.[0]?.type?.toLowerCase() || 'welcome',
      bonus_amount: bonuses?.[0]?.amount || 0,
      bonus_percentage: bonuses?.[0]?.percentage || 100,
      bonus_free_spins: bonuses?.[0]?.freeSpins || 0,
      bonus_min_deposit: bonuses?.[0]?.minDeposit || 100,
      bonus_wagering: bonuses?.[0]?.wageringRequirement ? `${bonuses[0].wageringRequirement}x` : '30x',
      bonus_code: bonuses?.[0]?.bonusCode || '',
      
      // Games (default values - should be in separate table)
      games_total: 1000,
      games_slots: 800,
      games_live: 150,
      games_table: 50,
      
      // Additional field from old form
      withdrawal_time: '24-48 horas'
    };
    
    // Insert into database
    const { data: newCasino, error } = await supabaseAdmin
      .from('casinos')
      .insert(casinoData)
      .select()
      .single();
    
    if (error) throw error;
    
    // In future, here we would also create related records for:
    // - bonuses table
    // - casino_pros table  
    // - casino_cons table
    // - casino_payment_methods table
    // - games table
    
    return NextResponse.json(newCasino, { status: 201 });
  } catch (error: any) {
    console.error('Error creating casino:', error);
    
    if (error.code === '23505') { // Unique violation
      return NextResponse.json({ 
        error: 'Un casino con este slug ya existe' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Error al crear el casino: ' + (error.message || 'Unknown error')
    }, { status: 500 });
  }
}