// @ts-expect-error - Using JavaScript file for Gmail
import { sendEmail, ADMIN_EMAILS } from './gmail-working.js';
import { render } from '@react-email/render';
import AdminNotificationEmail from '@/emails/AdminNotificationEmail';

interface NotificationOptions {
  type: 'new_review' | 'new_contact' | 'new_subscriber' | 'new_user';
  title: string;
  details: Record<string, any>;
  actionUrl?: string;
  actionText?: string;
}

export async function notifyAdmins(options: NotificationOptions) {
  try {
    const emailHtml = render(
      AdminNotificationEmail({
        type: options.type,
        title: options.title,
        details: options.details,
        actionUrl: options.actionUrl,
        actionText: options.actionText,
      })
    );

    const result = await sendEmail({
      to: ADMIN_EMAILS,
      subject: `[Admin] ${options.title}`,
      html: emailHtml,
    });

    if (!result.success) {
      console.error('Failed to send admin notification:', result.error);
    }

    return result;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return { success: false, error };
  }
}

// Specific notification functions
export async function notifyNewReview(review: {
  casinoName: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
}) {
  return notifyAdmins({
    type: 'new_review',
    title: `Nueva reseña para ${review.casinoName}`,
    details: {
      casino: review.casinoName,
      usuario: review.userName,
      calificación: `${review.rating} estrellas`,
      título: review.title,
      comentario: review.comment.substring(0, 200) + (review.comment.length > 200 ? '...' : ''),
    },
    actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reviews`,
    actionText: 'Ver todas las reseñas',
  });
}

export async function notifyNewContact(contact: {
  name: string;
  email: string;
  subject: string;
  message: string;
  type?: string;
}) {
  return notifyAdmins({
    type: 'new_contact',
    title: 'Nuevo mensaje de contacto',
    details: {
      nombre: contact.name,
      email: contact.email,
      asunto: contact.subject,
      tipo: contact.type || 'general',
      mensaje: contact.message.substring(0, 200) + (contact.message.length > 200 ? '...' : ''),
    },
    actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/messages`,
    actionText: 'Ver mensajes',
  });
}

export async function notifyNewSubscriber(subscriber: {
  email: string;
  firstName?: string;
}) {
  return notifyAdmins({
    type: 'new_subscriber',
    title: 'Nuevo suscriptor al newsletter',
    details: {
      email: subscriber.email,
      nombre: subscriber.firstName || 'No proporcionado',
      fecha: new Date().toLocaleString('es-MX'),
    },
    actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/subscribers`,
    actionText: 'Ver suscriptores',
  });
}

export async function notifyNewUser(user: {
  name: string;
  email: string;
  role: string;
}) {
  return notifyAdmins({
    type: 'new_user',
    title: 'Nuevo usuario registrado',
    details: {
      nombre: user.name,
      email: user.email,
      rol: user.role,
      fecha: new Date().toLocaleString('es-MX'),
    },
    actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/users`,
    actionText: 'Ver usuarios',
  });
}