import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';
import { notifyNewUser } from '@/lib/admin-notifications';
import { createVerificationToken } from '@/lib/auth-helpers';
const { sendVerificationEmail } = require('@/lib/email-verification');

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with email_verified: false
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
        role: 'user',
        email_verified: false, // Add this field
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=059669&color=fff`
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Create verification token
    let verificationToken = '';
    try {
      verificationToken = await createVerificationToken(newUser.email);
    } catch (tokenError) {
      console.error('Error creating verification token:', tokenError);
    }

    // Send verification email via Gmail
    let emailSent = false;
    try {
      if (verificationToken) {
        emailSent = await sendVerificationEmail(
          newUser.email,
          newUser.name || 'Usuario',
          verificationToken
        );
      }
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue with registration even if email fails
      emailSent = false;
    }

    if (!emailSent) {
      console.log('Registration successful but email not sent for:', newUser.email);
    }

    // Send admin notification
    notifyNewUser({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: emailSent 
        ? 'Registration successful. Please check your email to verify your account.'
        : 'Registration successful. Email verification pending.',
      emailSent
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}