import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// @ts-expect-error - Using JavaScript file for Gmail
import { sendEmail, ADMIN_EMAILS, DEFAULT_FROM_EMAIL } from '@/lib/gmail-working.js';
import { render } from '@react-email/render';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  read_time: number;
  featured_image?: string;
}

interface Subscriber {
  email: string;
  first_name?: string;
  preferences?: any;
}

// Email template for new blog post notification
function BlogPostNotificationEmail({ 
  post, 
  subscriber, 
  unsubscribeUrl 
}: { 
  post: BlogPost; 
  subscriber: Subscriber;
  unsubscribeUrl: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3003';
  const postUrl = `${siteUrl}/es/blog/${post.slug}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuevo Artículo en CasinosPesos</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    🎰 CasinosPesos Blog
                  </h1>
                  <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                    Nuevo artículo disponible
                  </p>
                </td>
              </tr>
              
              <!-- Greeting -->
              <tr>
                <td style="padding: 30px 30px 20px;">
                  <p style="margin: 0; color: #333333; font-size: 18px;">
                    Hola${subscriber.first_name ? ` ${subscriber.first_name}` : ''},
                  </p>
                  <p style="margin: 15px 0 0; color: #666666; font-size: 16px; line-height: 1.5;">
                    Tenemos un nuevo artículo que podría interesarte:
                  </p>
                </td>
              </tr>
              
              <!-- Article Card -->
              <tr>
                <td style="padding: 0 30px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
                    ${post.featured_image ? `
                    <tr>
                      <td>
                        <img src="${post.featured_image}" alt="${post.title}" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                      </td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td style="padding: 25px;">
                        <span style="display: inline-block; padding: 5px 12px; background-color: #10b981; color: #ffffff; font-size: 12px; font-weight: bold; border-radius: 4px; margin-bottom: 15px;">
                          ${post.category}
                        </span>
                        
                        <h2 style="margin: 15px 0; color: #333333; font-size: 22px; font-weight: bold; line-height: 1.3;">
                          ${post.title}
                        </h2>
                        
                        <p style="margin: 15px 0; color: #666666; font-size: 15px; line-height: 1.6;">
                          ${post.excerpt}
                        </p>
                        
                        <div style="margin: 20px 0; color: #999999; font-size: 14px;">
                          <span>✍️ ${post.author}</span>
                          <span style="margin-left: 15px;">⏱️ ${post.read_time} min de lectura</span>
                        </div>
                        
                        <a href="${postUrl}" style="display: inline-block; padding: 12px 30px; background-color: #10b981; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px; margin-top: 10px;">
                          Leer Artículo Completo →
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- More Articles -->
              <tr>
                <td style="padding: 30px; text-align: center;">
                  <p style="margin: 0 0 20px; color: #666666; font-size: 16px;">
                    ¿Quieres más contenido como este?
                  </p>
                  <a href="${siteUrl}/es/blog" style="display: inline-block; padding: 10px 25px; background-color: #f3f4f6; color: #333333; text-decoration: none; font-size: 15px; font-weight: bold; border-radius: 6px;">
                    Ver Todos los Artículos
                  </a>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e5e5;">
                  <p style="margin: 0 0 10px; color: #999999; font-size: 13px;">
                    Estás recibiendo este email porque te suscribiste a nuestro newsletter.
                  </p>
                  <a href="${unsubscribeUrl}" style="color: #10b981; text-decoration: none; font-size: 13px;">
                    Cancelar suscripción
                  </a>
                  <p style="margin: 15px 0 0; color: #999999; font-size: 12px;">
                    © 2024 CasinosPesos. Todos los derechos reservados.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // Verify this is an internal API call (you might want to add better auth)
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    // Basic security check
    if (origin && !origin.includes(host || 'localhost')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { post, subscribers }: { post: BlogPost; subscribers: Subscriber[] } = await request.json();

    if (!post || !subscribers || subscribers.length === 0) {
      return NextResponse.json({ 
        message: 'No subscribers to notify' 
      });
    }

    console.log(`📧 Sending blog post notifications for: ${post.title}`);
    console.log(`📬 Total subscribers: ${subscribers.length}`);

    let successCount = 0;
    let failCount = 0;

    // Send emails in batches to avoid overwhelming the server
    const batchSize = 5;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (subscriber) => {
        try {
          const unsubscribeToken = Buffer.from(subscriber.email).toString('base64');
          const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3003'}/api/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}&token=${unsubscribeToken}`;
          
          const emailHtml = BlogPostNotificationEmail({
            post,
            subscriber,
            unsubscribeUrl
          });

          const result = await sendEmail({
            to: subscriber.email,
            subject: `📚 Nuevo artículo: ${post.title}`,
            html: emailHtml
          });

          if (result.success) {
            successCount++;
            
            // Record notification in database
            await supabase
              .from('email_notifications')
              .insert({
                post_id: post.id,
                subscriber_email: subscriber.email,
                email_type: 'new_post',
                status: 'sent',
                sent_at: new Date().toISOString()
              });
          } else {
            failCount++;
            console.error(`Failed to send to ${subscriber.email}:`, result.error);
            
            // Record failure
            await supabase
              .from('email_notifications')
              .insert({
                post_id: post.id,
                subscriber_email: subscriber.email,
                email_type: 'new_post',
                status: 'failed',
                error_message: result.error
              });
          }
        } catch (error) {
          failCount++;
          console.error(`Error sending to ${subscriber.email}:`, error);
        }
      }));

      // Small delay between batches
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`✅ Notifications sent: ${successCount} success, ${failCount} failed`);

    // Send summary to admins
    const adminSummaryHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #10b981; margin-bottom: 20px;">📮 Resumen de Notificaciones del Blog</h2>
          <div style="border-left: 4px solid #10b981; padding-left: 20px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Artículo:</strong> ${post.title}</p>
            <p style="margin: 10px 0;"><strong>Autor:</strong> ${post.author}</p>
            <p style="margin: 10px 0;"><strong>Categoría:</strong> ${post.category}</p>
            <p style="margin: 10px 0;"><strong>Enviados con éxito:</strong> ${successCount}</p>
            <p style="margin: 10px 0;"><strong>Fallos:</strong> ${failCount}</p>
            <p style="margin: 10px 0;"><strong>Total de suscriptores:</strong> ${subscribers.length}</p>
          </div>
        </div>
      </div>
    `;

    await sendEmail({
      to: ADMIN_EMAILS,
      subject: `[CasinosPesos] Notificaciones de Blog Enviadas - ${post.title}`,
      html: adminSummaryHtml
    });

    return NextResponse.json({
      success: true,
      message: `Notifications sent to ${successCount} subscribers`,
      stats: {
        total: subscribers.length,
        success: successCount,
        failed: failCount
      }
    });

  } catch (error) {
    console.error('Error sending blog notifications:', error);
    return NextResponse.json({ 
      error: 'Failed to send notifications' 
    }, { status: 500 });
  }
}