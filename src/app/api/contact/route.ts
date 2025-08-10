import { NextRequest, NextResponse } from 'next/server'
import type { APIResponse } from '@/types'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  type?: 'general' | 'support' | 'business' | 'complaint'
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      const response: APIResponse<null> = {
        success: false,
        error: 'Todos los campos son requeridos'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      const response: APIResponse<null> = {
        success: false,
        error: 'Email inválido'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // TODO: Send email notification or save to database
    // Contact form submission: body
    
    // Mock success response
    const response: APIResponse<{ message: string }> = {
      success: true,
      data: {
        message: 'Mensaje enviado exitosamente. Te contactaremos pronto.'
      }
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error processing contact form:', error)
    
    const response: APIResponse<null> = {
      success: false,
      error: 'Error interno del servidor'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}