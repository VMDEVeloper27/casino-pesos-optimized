import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateVerificationToken, getVerificationTokenExpiry, verifyEmailToken, resendVerificationEmail } from '@/lib/auth-helpers';
const { sendVerificationEmail, sendWelcomeEmail } = require('@/lib/email-verification');

// POST /api/auth/verify-email - Resend verification email
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Resend verification using helper
    const result = await resendVerificationEmail(email);
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Get user name for email
    const { data: userData } = await supabase
      .from('users')
      .select('name')
      .eq('email', email)
      .single();
    
    const userName = userData?.name || 'Usuario';
    
    // Send verification email directly via Gmail
    const emailSent = await sendVerificationEmail(
      email,
      userName,
      result.token || ''
    );
    
    if (!emailSent) {
      console.error('Failed to send verification email via Gmail');
      return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Verification email sent',
      success: true
    });
  } catch (error) {
    console.error('Error in POST /api/auth/verify-email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/auth/verify-email - Verify email with token
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(
        new URL('/auth/verify-email?error=missing-token', request.url)
      );
    }

    // Verify token using helper
    const result = await verifyEmailToken(token);
    
    if (!result.success) {
      return NextResponse.redirect(
        new URL(`/auth/verify-email?error=${encodeURIComponent(result.error || 'verification-failed')}`, request.url)
      );
    }
    
    // Get user details for welcome email
    if (result.email) {
      const { data: user } = await supabase
        .from('users')
        .select('name')
        .eq('email', result.email)
        .single();
      
      if (user) {
        // Send welcome email
        await sendWelcomeEmail(result.email, user.name || 'Usuario');
      }
    }
    
    // Return JSON response instead of redirect
    return NextResponse.json({ 
      success: true,
      message: 'Email verified successfully',
      email: result.email
    });
  } catch (error) {
    console.error('Error in GET /api/auth/verify-email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}