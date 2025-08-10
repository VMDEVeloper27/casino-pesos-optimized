import { NextRequest, NextResponse } from 'next/server'
import type { APIResponse } from '@/types'

interface NewsletterSubscription {
  email: string
  firstName?: string
  preferences?: {
    bonusAlerts: boolean
    gameRecommendations: boolean
    casinoUpdates: boolean
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterSubscription = await request.json()
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      const response: APIResponse<null> = {
        success: false,
        error: 'Email inválido'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // TODO: Add to newsletter service (e.g., Mailchimp, SendGrid, etc.)
    // Newsletter subscription: body
    
    // Mock success response
    const response: APIResponse<{ message: string }> = {
      success: true,
      data: {
        message: 'Suscripción exitosa. ¡Gracias por unirte a nuestro newsletter!'
      }
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    
    const response: APIResponse<null> = {
      success: false,
      error: 'Error interno del servidor'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}