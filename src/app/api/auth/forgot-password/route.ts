import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

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

    // Here you would send an email with the reset link
    // For now, we'll just return success
    const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/es/auth/reset-password?token=${resetToken}`;
    
    console.log('Reset link for', email, ':', resetLink);
    
    // TODO: Implement email sending with Gmail
    // await sendResetEmail(email, resetLink);

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