import { NextRequest, NextResponse } from 'next/server'
import type { APIResponse } from '@/types'
// @ts-expect-error - Using JavaScript file for Gmail
import { sendEmail, ADMIN_EMAILS, DEFAULT_FROM_EMAIL } from '@/lib/gmail-working.js'
import { render } from '@react-email/render'
import NewsletterWelcomeEmail from '@/emails/NewsletterWelcomeEmail'
import { supabase } from '@/lib/supabase'

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

    // Check if email already exists
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', body.email)
      .single()
    
    if (existing) {
      const response: APIResponse<null> = {
        success: false,
        error: 'Este email ya está suscrito a nuestro newsletter'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    // Save to database
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: body.email,
        first_name: body.firstName,
        preferences: body.preferences || {
          bonusAlerts: true,
          gameRecommendations: true,
          casinoUpdates: true
        },
        status: 'active',
        subscribed_at: new Date().toISOString()
      })
    
    if (dbError) {
      console.error('Error saving newsletter subscription:', dbError)
      const response: APIResponse<null> = {
        success: false,
        error: 'Error al procesar la suscripción'
      }
      return NextResponse.json(response, { status: 500 })
    }
    
    // Send welcome email
    const unsubscribeToken = Buffer.from(body.email).toString('base64')
    const emailHtml = await render(
      NewsletterWelcomeEmail({
        email: body.email,
        unsubscribeUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3013'}/api/newsletter/unsubscribe?email=${encodeURIComponent(body.email)}&token=${unsubscribeToken}`
      })
    )
    
    // Log email configuration for debugging
    console.log('Sending newsletter welcome email:');
    console.log('- To:', body.email);
    console.log('- From:', DEFAULT_FROM_EMAIL);
    
    const emailResult = await sendEmail({
      to: body.email,
      subject: '¡Bienvenido a CasinosPesos Newsletter! 🎰',
      html: emailHtml
    })
    
    if (!emailResult.success) {
      console.error('Error sending welcome email:', emailResult.error)
    } else {
      console.log('Welcome email sent successfully! ID:', emailResult.data?.id)
    }
    
    // Send notification to admins about new subscription
    console.log('Sending admin notification for new newsletter subscription');
    
    const adminNotificationHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #10b981; margin-bottom: 20px;">🎰 Nueva Suscripción al Newsletter</h2>
          <div style="border-left: 4px solid #10b981; padding-left: 20px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Email:</strong> ${body.email}</p>
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${body.firstName || 'No proporcionado'}</p>
            <p style="margin: 10px 0;"><strong>Fecha:</strong> ${new Date().toLocaleString('es-MX', {
              dateStyle: 'full',
              timeStyle: 'short'
            })}</p>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Un nuevo usuario se ha suscrito al newsletter de CasinosPesos.
          </p>
        </div>
      </div>
    `
    
    const adminEmailResult = await sendEmail({
      to: ADMIN_EMAILS,
      subject: '[CasinosPesos] Nueva suscripción al Newsletter',
      html: adminNotificationHtml,
      replyTo: body.email
    })
    
    if (!adminEmailResult.success) {
      console.error('Error sending admin notification:', adminEmailResult.error)
    } else {
      console.log('Admin notification sent successfully!')
    }
    
    const response: APIResponse<{ message: string }> = {
      success: true,
      data: {
        message: 'Suscripción exitosa. ¡Revisa tu email para confirmar!'
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