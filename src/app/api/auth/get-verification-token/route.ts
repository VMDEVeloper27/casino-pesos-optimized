import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/auth/get-verification-token?email=user@example.com
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    // Get the latest verification token for this email
    const { data: tokenData, error } = await supabase
      .from('email_verification_tokens')
      .select('token, expires_at')
      .eq('user_id', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error || !tokenData) {
      return NextResponse.json({ 
        error: 'No verification token found for this email',
        details: error 
      }, { status: 404 });
    }
    
    // Check if token is still valid
    const isExpired = new Date(tokenData.expires_at) < new Date();
    
    // Generate the verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/verify-email?token=${tokenData.token}`;
    
    return NextResponse.json({
      email,
      token: tokenData.token,
      verificationUrl,
      expiresAt: tokenData.expires_at,
      isExpired,
      message: isExpired 
        ? 'Token has expired. Please request a new verification email.' 
        : 'Use this link to verify your email'
    });
  } catch (error) {
    console.error('Error getting verification token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}