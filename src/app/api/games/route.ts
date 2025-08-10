import { NextRequest, NextResponse } from 'next/server'
import type { APIResponse, Game } from '@/types'

// Mock data - replace with actual database queries
const mockGames: Game[] = [
  {
    id: '1',
    name: 'Starburst',
    slug: 'starburst',
    provider: 'NetEnt',
    type: 'slot',
    image: '/images/games/starburst.jpg',
    rating: 4.7,
    volatility: 'low',
    rtp: 96.09,
    maxWin: 50000,
    minBet: 0.10,
    maxBet: 100,
    freePlay: true,
    demoUrl: '/games/starburst/demo',
    description: 'Una de las tragamonedas más populares de todos los tiempos...',
    features: ['Wilds Expansivos', 'Re-Spins', 'Gráficos Brillantes']
  },
  {
    id: '2',
    name: 'Book of Dead',
    slug: 'book-of-dead',
    provider: 'Play\'n GO',
    type: 'slot',
    image: '/images/games/book-of-dead.jpg',
    rating: 4.8,
    volatility: 'high',
    rtp: 94.25,
    maxWin: 5000,
    minBet: 0.01,
    maxBet: 100,
    freePlay: true,
    description: 'Aventura épica en el antiguo Egipto con giros gratis...',
    features: ['Giros Gratis', 'Símbolo Especial Expansivo', 'Jackpot']
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  try {
    const type = searchParams.get('type')
    const provider = searchParams.get('provider')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'rating'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    let filteredGames = mockGames

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
      filteredGames = filteredGames.filter(game =>
        game.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Apply sorting
    filteredGames.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'rtp':
          comparison = a.rtp - b.rtp
          break
        case 'maxWin':
          comparison = a.maxWin - b.maxWin
          break
        default:
          comparison = a.rating - b.rating
      }

      return sortOrder === 'desc' ? -comparison : comparison
    })

    // Apply pagination
    const offset = (page - 1) * limit
    const total = filteredGames.length
    const paginatedGames = filteredGames.slice(offset, offset + limit)
    
    const response: APIResponse<Game[]> = {
      success: true,
      data: paginatedGames,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching games:', error)
    
    const response: APIResponse<Game[]> = {
      success: false,
      error: 'Error interno del servidor'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}