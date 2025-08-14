import { NextRequest, NextResponse } from 'next/server'
import type { APIResponse, Casino, FilterOptions } from '@/types'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  try {
    // Extract filter parameters
    const filters: FilterOptions = {
      bonusType: searchParams.getAll('bonusType'),
      rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined,
      gameTypes: searchParams.getAll('gameTypes'),
      paymentMethods: searchParams.getAll('paymentMethods'),
      country: searchParams.get('country') || undefined,
      currency: searchParams.get('currency') || undefined,
      sortBy: searchParams.get('sortBy') as FilterOptions['sortBy'] || 'rating',
      sortOrder: searchParams.get('sortOrder') as FilterOptions['sortOrder'] || 'desc'
    }

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = (page - 1) * limit

    // Build Supabase query
    let query = supabase
      .from('casinos')
      .select('*', { count: 'exact' })
      .eq('status', 'active')

    // Apply filters
    if (filters.rating) {
      query = query.gte('rating', filters.rating)
    }

    if (filters.bonusType && filters.bonusType.length > 0) {
      query = query.in('bonus_type', filters.bonusType)
    }

    if (filters.paymentMethods && filters.paymentMethods.length > 0) {
      query = query.contains('payment_methods', filters.paymentMethods)
    }

    if (filters.country) {
      query = query.contains('currencies', [filters.country === 'MX' ? 'MXN' : 'USD'])
    }

    // Apply sorting
    const orderColumn = filters.sortBy === 'bonus' ? 'bonus_amount' : 
                        filters.sortBy === 'alphabetical' ? 'name' : 'rating'
    query = query.order(orderColumn, { ascending: filters.sortOrder === 'asc' })

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      throw new Error(error.message)
    }

    // Transform data to match Casino interface
    const casinos: Casino[] = (data || []).map(casino => ({
      id: casino.id,
      name: casino.name,
      slug: casino.slug,
      logo: casino.logo || '/images/casino-placeholder.png',
      rating: casino.rating || 0,
      reviewCount: Math.floor(Math.random() * 1000 + 100), // Mock review count
      bonusAmount: casino.bonus_amount || 0,
      bonusType: casino.bonus_type || 'deposit',
      features: casino.features || [],
      paymentMethods: casino.payment_methods || [],
      licenses: casino.licenses || [],
      pros: casino.pros || [],
      cons: casino.cons || [],
      description: `${casino.name} es uno de los mejores casinos online disponibles en México.`,
      url: casino.affiliate_link || '#',
      termsUrl: '#',
      isRecommended: casino.is_featured || false,
      country: ['MX', 'AR', 'CL'],
      currency: casino.currencies || ['MXN', 'USD']
    }))
    
    const response: APIResponse<Casino[]> = {
      success: true,
      data: casinos,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching casinos:', error)
    
    const response: APIResponse<Casino[]> = {
      success: false,
      error: 'Error interno del servidor'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}