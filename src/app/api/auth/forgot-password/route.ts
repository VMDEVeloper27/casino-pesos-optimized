import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';
import { sendEmail } from '@/lib/gmail';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single();

    if (userError || !user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json(
        { message: 'Si el correo existe, recibirás instrucciones para restablecer tu contraseña.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Store reset token in database
    const { error: updateError } = await supabase
      .from('users')
      .update({
        reset_token: resetToken,
        reset_token_expiry: resetTokenExpiry.toISOString()
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating reset token:', updateError);
      return NextResponse.json(
        { error: 'Error al procesar la solicitud' },
        { status: 500 }
      );
    }

    // Send email with reset link
    const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.casinospesos.com'}/es/auth/reset-password?token=${resetToken}`;
    
    console.log('Sending reset link to', email, ':', resetLink);
    
    // Send email via Gmail
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .button:hover { background: #059669; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CasinosPesos</h1>
              <p>Restablecimiento de Contraseña</p>
            </div>
            <div class="content">
              <h2>Hola!</h2>
              <p>Hemos recibido una solicitud para restablecer tu contraseña en CasinosPesos.</p>
              <p>Si solicitaste este cambio, haz clic en el siguiente botón para crear una nueva contraseña:</p>
              <div style="text-align: center;">
                <a href="${resetLink}" class="button">Restablecer Contraseña</a>
              </div>
              <p style="font-size: 14px; color: #666;">O copia y pega este enlace en tu navegador:</p>
              <p style="font-size: 12px; word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 5px;">${resetLink}</p>
              <p><strong>Este enlace expirará en 1 hora por seguridad.</strong></p>
              <p>Si no solicitaste este cambio, puedes ignorar este correo y tu contraseña permanecerá sin cambios.</p>
              <div class="footer">
                <p>© 2024 CasinosPesos. Todos los derechos reservados.</p>
                <p>Este es un correo automático, por favor no respondas.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail({
      to: email,
      subject: '🔐 Restablecer tu contraseña - CasinosPesos',
      html: emailHtml,
    });

    return NextResponse.json(
      { message: 'Si el correo existe, recibirás instrucciones para restablecer tu contraseña.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}