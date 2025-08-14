import { NextRequest, NextResponse } from 'next/server'
import { getAllGames } from '@/lib/game-database';

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
    
    // Get all games from the database
    let allGames = await getAllGames();
    let filteredGames = [...allGames];

    // Apply filters
    if (type) {
      filteredGames = filteredGames.filter(game => game.type === type)
    }

    if (provider) {
      filteredGames = filteredGames.filter(game => 
        game.provider.toLowerCase() === provider.toLowerCase()
      )
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredGames = filteredGames.filter(game =>
        game.name.toLowerCase().includes(searchLower) ||
        game.provider.toLowerCase().includes(searchLower) ||
        game.theme?.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting
    filteredGames.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'popularity':
          comparison = (a.popularity || 0) - (b.popularity || 0)
          break
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'rtp':
          comparison = (a.rtp || 0) - (b.rtp || 0)
          break
        case 'maxWin':
          comparison = (a.maxWin || 0) - (b.maxWin || 0)
          break
        default:
          comparison = (a.popularity || 0) - (b.popularity || 0)
      }

      return sortOrder === 'desc' ? -comparison : comparison
    })

    // Apply pagination
    const offset = (page - 1) * limit
    const total = filteredGames.length
    const paginatedGames = filteredGames.slice(offset, offset + limit)
    
    const response = {
      success: true,
      data: paginatedGames,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
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