import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zwtadapqdlthqafdsloi.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dGFkYXBxZGx0aHFhZmRzbG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzE4NjIsImV4cCI6MjA3MDc0Nzg2Mn0.wZ-QRC2OTGOleS0gv-Xfa7t4okpJAFnXbXcW5uziyjU'
);

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email templates
const emailTemplates = {
  newCasino: (casinoName: string, bonus: string) => ({
    subject: `🎰 Nuevo Casino Disponible: ${casinoName}`,
    html: `
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
              <h1>🎰 ¡Nuevo Casino Disponible!</h1>
            </div>
            <div class="content">
              <h2>${casinoName} ahora está disponible</h2>
              <p>¡Tenemos excelentes noticias! Hemos agregado un nuevo casino a nuestra plataforma.</p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #10b981;">Bono de Bienvenida Exclusivo</h3>
                <p style="font-size: 24px; font-weight: bold; color: #059669;">${bonus}</p>
              </div>
              
              <p>Características destacadas:</p>
              <ul>
                <li>✅ Licencia oficial y regulación completa</li>
                <li>✅ Pagos rápidos y seguros</li>
                <li>✅ Amplia selección de juegos</li>
                <li>✅ Soporte en español 24/7</li>
              </ul>
              
              <center>
                <a href="${process.env.SITE_URL}/casinos/${casinoName.toLowerCase().replace(/\s+/g, '-')}" class="button">
                  Ver Casino
                </a>
              </center>
            </div>
            <div class="footer">
              <p>Estás recibiendo este email porque te suscribiste a las notificaciones de CasinosPesos.</p>
              <p><a href="${process.env.SITE_URL}/unsubscribe">Cancelar suscripción</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  newGame: (gameName: string, provider: string, rtp?: string) => ({
    subject: `🎮 Nuevo Juego Disponible: ${gameName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #8b5cf6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .game-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎮 ¡Nuevo Juego Disponible!</h1>
            </div>
            <div class="content">
              <div class="game-card">
                <h2>${gameName}</h2>
                <p><strong>Proveedor:</strong> ${provider}</p>
                ${rtp ? `<p><strong>RTP:</strong> ${rtp}%</p>` : ''}
              </div>
              
              <p>¡Prueba este nuevo juego ahora en modo demo gratis!</p>
              
              <center>
                <a href="${process.env.SITE_URL}/juegos/${gameName.toLowerCase().replace(/\s+/g, '-')}" class="button">
                  Jugar Ahora
                </a>
              </center>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  newBlogPost: (title: string, excerpt: string, slug: string) => ({
    subject: `📰 Nuevo Artículo: ${title}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📰 Nuevo Artículo en el Blog</h1>
            </div>
            <div class="content">
              <h2>${title}</h2>
              <p>${excerpt}</p>
              
              <center>
                <a href="${process.env.SITE_URL}/blog/${slug}" class="button">
                  Leer Artículo
                </a>
              </center>
            </div>
          </div>
        </body>
      </html>
    `
  }),
};

// Function to get subscribed users
export async function getSubscribedUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('email_notifications', true)
    .eq('email_verified', true);

  if (error) {
    console.error('Error fetching subscribed users:', error);
    return [];
  }

  return data || [];
}

// Function to queue email notifications
export async function queueEmailNotification(
  recipientEmail: string,
  template: string,
  data: any
) {
  const { error } = await supabase
    .from('email_queue')
    .insert({
      recipient_email: recipientEmail,
      subject: data.subject,
      template,
      data,
      status: 'pending'
    });

  if (error) {
    console.error('Error queuing email:', error);
  }
}

// Function to send email
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: `"CasinosPesos" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

// Function to notify users about new casino
export async function notifyNewCasino(casino: {
  id: string;
  name: string;
  bonus: {
    percentage: number;
    amount: number;
  };
}) {
  const subscribedUsers = await getSubscribedUsers();
  const bonusText = `${casino.bonus.percentage}% hasta $${casino.bonus.amount.toLocaleString()}`;
  const template = emailTemplates.newCasino(casino.name, bonusText);

  for (const user of subscribedUsers) {
    await queueEmailNotification(user.email, 'new_casino', {
      ...template,
      casinoId: casino.id,
      casinoName: casino.name,
    });
  }

  // Process email queue
  await processEmailQueue();
}

// Function to notify users about new game
export async function notifyNewGame(game: {
  id: string;
  name: string;
  provider: string;
  rtp?: string;
}) {
  const subscribedUsers = await getSubscribedUsers();
  const template = emailTemplates.newGame(game.name, game.provider, game.rtp);

  for (const user of subscribedUsers) {
    await queueEmailNotification(user.email, 'new_game', {
      ...template,
      gameId: game.id,
      gameName: game.name,
    });
  }

  // Process email queue
  await processEmailQueue();
}

// Function to notify users about new blog post
export async function notifyNewBlogPost(post: {
  title: string;
  excerpt: string;
  slug: string;
}) {
  const subscribedUsers = await getSubscribedUsers();
  const template = emailTemplates.newBlogPost(post.title, post.excerpt, post.slug);

  for (const user of subscribedUsers) {
    await queueEmailNotification(user.email, 'new_blog', {
      ...template,
      postSlug: post.slug,
    });
  }

  // Process email queue
  await processEmailQueue();
}

// Function to process email queue
export async function processEmailQueue() {
  const { data: pendingEmails, error } = await supabase
    .from('email_queue')
    .select('*')
    .eq('status', 'pending')
    .lt('attempts', 3)
    .limit(10);

  if (error || !pendingEmails) {
    console.error('Error fetching pending emails:', error);
    return;
  }

  for (const email of pendingEmails) {
    const result = await sendEmail(
      email.recipient_email,
      email.subject,
      email.data.html
    );

    if (result.success) {
      // Mark as sent
      await supabase
        .from('email_queue')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString()
        })
        .eq('id', email.id);
    } else {
      // Increment attempts
      await supabase
        .from('email_queue')
        .update({
          attempts: email.attempts + 1,
          status: email.attempts >= 2 ? 'failed' : 'pending'
        })
        .eq('id', email.id);
    }
  }
}