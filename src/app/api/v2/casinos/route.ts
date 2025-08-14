import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/v2/casinos - получить все казино из Supabase
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const featured = searchParams.get('featured')
    
    let query = supabase
      .from('casinos')
      .select('*')
      .eq('status', 'active')
      .order('rating', { ascending: false })
    
    if (limit) {
      query = query.limit(parseInt(limit))
    }
    
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch casinos from database' },
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