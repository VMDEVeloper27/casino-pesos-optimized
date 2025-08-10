import { NextRequest, NextResponse } from 'next/server'
import type { APIResponse, Casino } from '@/types'

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
    description: 'Spin Casino es uno de los casinos online más populares de México con una amplia selección de juegos de los mejores proveedores. Ofrece bonos generosos y un excelente servicio al cliente.',
    url: 'https://spincasino.com',
    termsUrl: 'https://spincasino.com/terms',
    isRecommended: true,
    country: ['MX', 'AR', 'CL'],
    currency: ['MXN', 'USD']
  }
]

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Find casino by ID or slug
    const casino = mockCasinos.find(c => c.id === id || c.slug === id)
    
    if (!casino) {
      const response: APIResponse<Casino> = {
        success: false,
        error: 'Casino no encontrado'
      }
      
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: APIResponse<Casino> = {
      success: true,
      data: casino
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching casino:', error)
    
    const response: APIResponse<Casino> = {
      success: false,
      error: 'Error interno del servidor'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}