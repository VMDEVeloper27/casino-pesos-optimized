import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  try {
    const type = searchParams.get('type')
    const provider = searchParams.get('provider')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'popularity'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    // Build Supabase query
    let query = supabase
      .from('games')
      .select('*', { count: 'exact' })

    // Apply filters
    if (type) {
      query = query.eq('type', type)
    }

    if (provider) {
      query = query.ilike('provider', provider)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,provider.ilike.%${search}%,theme.ilike.%${search}%`)
    }

    // Apply sorting
    const orderColumn = sortBy === 'name' ? 'name' : 
                       sortBy === 'rtp' ? 'rtp' :
                       sortBy === 'maxWin' ? 'max_win' : 'created_at'
    query = query.order(orderColumn, { ascending: sortOrder === 'asc' })

    // Apply pagination
    const offset = (page - 1) * limit
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      throw new Error(error.message)
    }

    // Transform data to match existing interface
    const games = (data || []).map(game => ({
      id: game.id,
      name: game.name,
      slug: game.slug,
      provider: game.provider || 'Unknown',
      type: game.type || 'slot',
      image: game.image || '/images/game-placeholder.png',
      thumbnail: game.image || '/images/game-placeholder.png',
      rtp: game.rtp || 96,
      volatility: game.volatility || 'medium',
      maxWin: game.max_win || 10000,
      minBet: game.min_bet || 0.1,
      maxBet: game.max_bet || 100,
      features: game.features || [],
      theme: game.theme || 'classic',
      popularity: Math.floor(Math.random() * 100),
      isNew: game.is_new || false,
      isFeatured: game.is_featured || false,
      demoUrl: '#'
    }))
    
    const response = {
      success: true,
      data: games,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      }
    }

    // Set cache headers for better performance
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    })
  } catch (error) {
    console.error('Error fetching games:', error)
    
    const response = {
      success: false,
      error: 'Error interno del servidor'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}