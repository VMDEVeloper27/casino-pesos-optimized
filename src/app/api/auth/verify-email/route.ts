import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null as any;

// POST /api/auth/verify-email - Send verification email
export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store verification token
    const { error: tokenError } = await supabase
      .from('email_verification_tokens')
      .upsert({
        user_id: email,
        token,
        expires_at: expiresAt.toISOString()
      });

    if (tokenError) {
      console.error('Error storing verification token:', tokenError);
      return NextResponse.json({ error: 'Failed to create verification token' }, { status: 500 });
    }

    // Send verification email
    const verificationUrl = `${process.env.SITE_URL}/verify-email?token=${token}`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✉️ Verifica tu Email</h1>
            </div>
            <div class="content">
              <h2>¡Bienvenido a CasinosPesos!</h2>
              <p>Por favor, verifica tu dirección de email para completar tu registro y recibir notificaciones importantes.</p>
              
              <center>
                <a href="${verificationUrl}" class="button">
                  Verificar Email
                </a>
              </center>
              
              <p style="color: #666; font-size: 14px;">
                O copia y pega este enlace en tu navegador:<br>
                <span style="word-break: break-all;">${verificationUrl}</span>
              </p>
              
              <p style="color: #666; font-size: 14px; margin-top: 20px;">
                Este enlace expira en 24 horas. Si no solicitaste esta verificación, puedes ignorar este email.
              </p>
            </div>
            <div class="footer">
              <p>© 2025 CasinosPesos. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Queue the email
    const { error: queueError } = await supabase
      .from('email_queue')
      .insert({
        recipient_email: email,
        subject: 'Verifica tu email - CasinosPesos',
        template: 'email_verification',
        data: { html: emailHtml },
        status: 'pending'
      });

    if (queueError) {
      console.error('Error queuing verification email:', queueError);
      return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Verification email sent',
      expiresAt: expiresAt.toISOString()
    });
  } catch (error) {
    console.error('Error in POST /api/auth/verify-email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/auth/verify-email - Verify email with token
export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Find verification token
    const { data: tokenData, error: tokenError } = await supabase
      .from('email_verification_tokens')
      .select('user_id, expires_at')
      .eq('token', token)
      .single();

    if (tokenError || !tokenData) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Token expired' }, { status: 400 });
    }

    // Update user as verified
    const { error: updateError } = await supabase
      .from('users')
      .update({ email_verified: true })
      .eq('email', tokenData.user_id);

    if (updateError) {
      console.error('Error updating user verification status:', updateError);
      return NextResponse.json({ error: 'Failed to verify email' }, { status: 500 });
    }

    // Delete used token
    await supabase
      .from('email_verification_tokens')
      .delete()
      .eq('token', token);

    return NextResponse.json({ 
      message: 'Email verified successfully',
      email: tokenData.user_id
    });
  } catch (error) {
    console.error('Error in GET /api/auth/verify-email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}