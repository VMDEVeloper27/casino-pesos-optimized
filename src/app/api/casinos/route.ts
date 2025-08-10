import { NextRequest, NextResponse } from 'next/server'
import type { APIResponse, Casino, FilterOptions } from '@/types'

// Mock data - replace with actual database queries
const mockCasinos: Casino[] = [
  {
    id: '1',
    name: 'Spin Casino',
    slug: 'spin-casino',
    logo: '/images/casinos/spin-casino.png',
    rating: 4.8,
    reviewCount: 1250,
    bonusAmount: 10000,
    bonusType: 'deposit',
    features: ['Bono de Bienvenida', '600+ Juegos', 'Soporte 24/7'],
    paymentMethods: ['Visa', 'Mastercard', 'Oxxo', 'Spei'],
    licenses: ['Malta Gaming Authority'],
    pros: ['Excelente selección de juegos', 'Bonos generosos', 'Pagos rápidos'],
    cons: ['Límites de retiro semanales', 'Sin versión móvil nativa'],
    description: 'Spin Casino es uno de los casinos online más populares de México...',
    url: 'https://spincasino.com',
    termsUrl: 'https://spincasino.com/terms',
    isRecommended: true,
    country: ['MX', 'AR', 'CL'],
    currency: ['MXN', 'USD']
  }
]

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

    // Apply filters (mock implementation)
    let filteredCasinos = mockCasinos

    if (filters.rating) {
      filteredCasinos = filteredCasinos.filter(casino => casino.rating >= filters.rating!)
    }

    if (filters.country) {
      filteredCasinos = filteredCasinos.filter(casino => 
        casino.country.includes(filters.country!)
      )
    }

    if (filters.bonusType && filters.bonusType.length > 0) {
      filteredCasinos = filteredCasinos.filter(casino => 
        filters.bonusType!.includes(casino.bonusType)
      )
    }

    // Apply sorting
    filteredCasinos.sort((a, b) => {
      let comparison = 0
      
      switch (filters.sortBy) {
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'bonus':
          comparison = a.bonusAmount - b.bonusAmount
          break
        case 'alphabetical':
          comparison = a.name.localeCompare(b.name)
          break
        case 'newest':
          // For now, just use rating as fallback
          comparison = a.rating - b.rating
          break
        default:
          comparison = a.rating - b.rating
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison
    })

    // Apply pagination
    const total = filteredCasinos.length
    const paginatedCasinos = filteredCasinos.slice(offset, offset + limit)
    
    const response: APIResponse<Casino[]> = {
      success: true,
      data: paginatedCasinos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
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