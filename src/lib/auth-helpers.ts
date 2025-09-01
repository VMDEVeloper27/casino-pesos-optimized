// Email verification helper functions for Supabase
import crypto from 'crypto';
import { supabase } from './supabase';

const VERIFICATION_TOKEN_EXPIRY_HOURS = 24;

// Generate verification token
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Get token expiry date
export function getVerificationTokenExpiry(): Date {
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + VERIFICATION_TOKEN_EXPIRY_HOURS);
  return expiry;
}

// Create and store verification token
export async function createVerificationToken(email: string): Promise<string> {
  const token = generateVerificationToken();
  const expiry = getVerificationTokenExpiry();
  
  // Store token in email_verification_tokens table
  const { error } = await supabase
    .from('email_verification_tokens')
    .upsert({
      user_id: email,
      token,
      expires_at: expiry.toISOString()
    });
    
  if (error) {
    console.error('Error storing verification token:', error);
    throw new Error('Failed to create verification token');
  }
  
  return token;
}

// Verify email token
export async function verifyEmailToken(token: string): Promise<{ success: boolean; email?: string; error?: string }> {
  try {
    // Find token
    const { data: tokenData, error: tokenError } = await supabase
      .from('email_verification_tokens')
      .select('user_id, expires_at')
      .eq('token', token)
      .single();
      
    if (tokenError || !tokenData) {
      return { success: false, error: 'Invalid verification token' };
    }
    
    // Check expiry
    if (new Date(tokenData.expires_at) < new Date()) {
      return { success: false, error: 'Verification token has expired' };
    }
    
    // Check if already verified
    const { data: user } = await supabase
      .from('users')
      .select('email_verified')
      .eq('email', tokenData.user_id)
      .single();
      
    if (user?.email_verified) {
      return { success: false, error: 'Email already verified' };
    }
    
    // Mark as verified
    const { error: updateError } = await supabase
      .from('users')
      .update({ email_verified: true })
      .eq('email', tokenData.user_id);
      
    if (updateError) {
      console.error('Error updating verification status:', updateError);
      return { success: false, error: 'Failed to verify email' };
    }
    
    // Delete used token
    await supabase
      .from('email_verification_tokens')
      .delete()
      .eq('token', token);
    
    return { success: true, email: tokenData.user_id };
  } catch (error) {
    console.error('Email verification error:', error);
    return { success: false, error: 'Verification failed' };
  }
}

// Resend verification email
export async function resendVerificationEmail(email: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    // Check user exists
    const { data: user, error } = await supabase
      .from('users')
      .select('email_verified')
      .eq('email', email)
      .single();
      
    if (error || !user) {
      return { success: false, error: 'User not found' };
    }
    
    if (user.email_verified) {
      return { success: false, error: 'Email already verified' };
    }
    
    // Create new token
    const token = await createVerificationToken(email);
    return { success: true, token };
  } catch (error) {
    console.error('Resend verification error:', error);
    return { success: false, error: 'Failed to resend verification email' };
  }
}