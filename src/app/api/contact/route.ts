import { NextRequest, NextResponse } from 'next/server'
import type { APIResponse } from '@/types'
// @ts-ignore - Using JavaScript file for Gmail
import { sendEmail, ADMIN_EMAILS, DEFAULT_FROM_EMAIL } from '@/lib/gmail-working.js'
import { render } from '@react-email/render'
import ContactFormEmail from '@/emails/ContactFormEmail'
import ContactConfirmationEmail from '@/emails/ContactConfirmationEmail'
import { supabase } from '@/lib/supabase'

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

    // Save contact message to database
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
        type: body.type || 'general',
        status: 'pending'
      })
    
    if (dbError) {
      console.error('Error saving contact message:', dbError)
    }
    
    // Send email notification to admins
    const emailHtml = await render(
      ContactFormEmail({
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
        date: new Date().toLocaleString('es-MX', {
          dateStyle: 'full',
          timeStyle: 'short'
        })
      })
    )
    
    // Log email configuration for debugging
    console.log('Sending contact email:');
    console.log('- To:', ADMIN_EMAILS);
    console.log('- From:', DEFAULT_FROM_EMAIL);
    console.log('- Subject:', `[CasinosPesos] Nuevo mensaje de contacto: ${body.subject}`);
    console.log('- ReplyTo:', body.email);
    
    const emailResult = await sendEmail({
      to: ADMIN_EMAILS,
      subject: `[CasinosPesos] Nuevo mensaje de contacto: ${body.subject}`,
      html: emailHtml,
      replyTo: body.email
    })
    
    if (!emailResult.success) {
      console.error('Error sending email notification:', emailResult.error)
      // Still return success even if email fails (message was saved to DB)
    } else {
      console.log('Email sent successfully! ID:', emailResult.data?.id)
    }
    
    // Send confirmation email to user
    console.log('Sending confirmation email to user:', body.email);
    
    const confirmationHtml = await render(
      ContactConfirmationEmail({
        name: body.name,
        subject: body.subject,
        message: body.message
      })
    )
    
    const confirmationResult = await sendEmail({
      to: body.email,
      subject: `Confirmación: Hemos recibido tu mensaje - CasinosPesos`,
      html: confirmationHtml
    })
    
    if (!confirmationResult.success) {
      console.error('Error sending confirmation email to user:', confirmationResult.error)
    } else {
      console.log('Confirmation email sent to user successfully!')
    }
    
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