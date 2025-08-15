import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, reason } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find subscriber
    const { data: subscriber, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single();

    if (findError || !subscriber) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    // Update subscriber status
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
        unsubscribe_reason: reason || 'User requested'
      })
      .eq('email', email);

    if (updateError) {
      console.error('Error unsubscribing:', updateError);
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET method for unsubscribe links in emails
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email) {
    return new NextResponse(
      `
      <html>
        <body style="font-family: system-ui; text-align: center; padding: 50px;">
          <h1>Error</h1>
          <p>Invalid unsubscribe link</p>
        </body>
      </html>
      `,
      { 
        status: 400,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }

  // Simple token validation (in production, use proper token verification)
  const expectedToken = Buffer.from(email).toString('base64');
  if (token !== expectedToken) {
    return new NextResponse(
      `
      <html>
        <body style="font-family: system-ui; text-align: center; padding: 50px;">
          <h1>Error</h1>
          <p>Invalid unsubscribe link</p>
        </body>
      </html>
      `,
      { 
        status: 400,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }

  // Unsubscribe the user
  const { error } = await supabase
    .from('newsletter_subscribers')
    .update({
      status: 'unsubscribed',
      unsubscribed_at: new Date().toISOString(),
      unsubscribe_reason: 'Clicked unsubscribe link'
    })
    .eq('email', email);

  if (error) {
    return new NextResponse(
      `
      <html>
        <body style="font-family: system-ui; text-align: center; padding: 50px;">
          <h1>Error</h1>
          <p>Failed to unsubscribe. Please try again later.</p>
        </body>
      </html>
      `,
      { 
        status: 500,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }

  return new NextResponse(
    `
    <html>
      <body style="font-family: system-ui; text-align: center; padding: 50px;">
        <h1 style="color: #059669;">Unsubscribed Successfully</h1>
        <p>You have been unsubscribed from our newsletter.</p>
        <p>We're sorry to see you go!</p>
        <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #059669; color: white; text-decoration: none; border-radius: 5px;">
          Go to Homepage
        </a>
      </body>
    </html>
    `,
    { 
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    }
  );
}