import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html, replyTo } = body;
    
    // Use fetch to send email via external service or use Node.js native modules
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'albertokiddi1992@gmail.com',
        pass: 'hhzqolhuickhpqxo',
      },
    });
    
    const info = await transporter.sendMail({
      from: 'CasinosPesos <albertokiddi1992@gmail.com>',
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      replyTo: replyTo || 'albertokiddi1992@gmail.com',
    });
    
    console.log('✅ Email sent via Gmail API:', info.messageId);
    
    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      accepted: info.accepted
    });
  } catch (error: any) {
    console.error('❌ Email API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}