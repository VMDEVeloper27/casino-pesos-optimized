// Email service for sending verification and notification emails
const nodemailer = require('nodemailer');
import { renderEmailTemplate } from './email-templates';

// Create transporter for Gmail
let transporter: any;

try {
  transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password (not regular password)
    },
  });
} catch (error) {
  console.error('Failed to create email transporter:', error);
  // Create a dummy transporter that will fail gracefully
  transporter = {
    sendMail: async () => {
      console.error('Email sending is not configured');
      return false;
    },
    verify: async () => false
  };
}

// Send verification email
export async function sendVerificationEmail(
  to: string,
  name: string,
  verificationToken: string
): Promise<boolean> {
  try {
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/verify-email?token=${verificationToken}`;
    
    const html = renderEmailTemplate('verification', {
      name,
      verificationUrl,
      expiryHours: 24,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"CasinosPesos" <noreply@casinospesos.com>',
      to,
      subject: 'Verifica tu cuenta en CasinosPesos',
      html,
      text: `Hola ${name},\n\nPor favor verifica tu email haciendo clic en el siguiente enlace:\n${verificationUrl}\n\nEste enlace expirará en 24 horas.\n\nSaludos,\nEl equipo de CasinosPesos`,
    };

    const info = await transporter.sendMail(mailOptions);
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}

// Send welcome email after verification
export async function sendWelcomeEmail(
  to: string,
  name: string
): Promise<boolean> {
  try {
    const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard`;
    
    const html = renderEmailTemplate('welcome', {
      name,
      dashboardUrl,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"CasinosPesos" <noreply@casinospesos.com>',
      to,
      subject: '¡Bienvenido a CasinosPesos!',
      html,
      text: `Hola ${name},\n\n¡Bienvenido a CasinosPesos!\n\nTu cuenta ha sido verificada exitosamente. Ahora puedes acceder a todas las funciones de nuestra plataforma.\n\nVisita tu dashboard: ${dashboardUrl}\n\nSaludos,\nEl equipo de CasinosPesos`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}

// Send password reset email
export async function sendPasswordResetEmail(
  to: string,
  name: string,
  resetToken: string
): Promise<boolean> {
  try {
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;
    
    const html = renderEmailTemplate('passwordReset', {
      name,
      resetUrl,
      expiryHours: 1,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"CasinosPesos" <noreply@casinospesos.com>',
      to,
      subject: 'Restablecer contraseña - CasinosPesos',
      html,
      text: `Hola ${name},\n\nHas solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:\n${resetUrl}\n\nEste enlace expirará en 1 hora.\n\nSi no solicitaste este cambio, ignora este mensaje.\n\nSaludos,\nEl equipo de CasinosPesos`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
}

// Test email configuration
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}