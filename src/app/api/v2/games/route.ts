import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/v2/games - получить все игры из Supabase
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const type = searchParams.get('type')
    const featured = searchParams.get('featured')
    const provider = searchParams.get('provider')
    
    let query = supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (limit) {
      query = query.limit(parseInt(limit))
    }
    
    if (type) {
      query = query.eq('type', type)
    }
    
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }
    
    if (provider) {
      query = query.eq('provider', provider)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch games from database' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}