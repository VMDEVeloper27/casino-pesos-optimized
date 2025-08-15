import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactConfirmationEmailProps {
  name: string;
  subject: string;
  message: string;
}

export const ContactConfirmationEmail = ({
  name,
  subject,
  message,
}: ContactConfirmationEmailProps) => {
  const previewText = `Hemos recibido tu mensaje: ${subject}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>🎰 CasinosPesos</Heading>
          </Section>

          <Heading style={h2}>¡Hola {name}!</Heading>
          
          <Text style={text}>
            Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará y te responderemos
            en un plazo máximo de 24 horas.
          </Text>

          <Section style={messageBox}>
            <Text style={messageTitle}>Tu mensaje:</Text>
            <Text style={messageSubject}>
              <strong>Asunto:</strong> {subject}
            </Text>
            <Text style={messageContent}>
              <strong>Mensaje:</strong><br />
              {message}
            </Text>
          </Section>

          <Text style={text}>
            Si tu consulta es urgente, también puedes contactarnos por:
          </Text>

          <Section style={contactInfo}>
            <Text style={contactItem}>📧 Email directo: soporte@casinospesos.com</Text>
            <Text style={contactItem}>📱 WhatsApp: +52 55 1234 5678</Text>
            <Text style={contactItem}>🕒 Horario: 24/7</Text>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              Gracias por contactarnos. Tu opinión es muy importante para nosotros.
            </Text>
            <Text style={footerText}>
              © 2024 CasinosPesos. Todos los derechos reservados.
            </Text>
            <Text style={footerText}>
              Este es un mensaje automático, por favor no respondas a este email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactConfirmationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '5px',
  boxShadow: '0 5px 10px rgba(20,50,70,.2)',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#059669',
  padding: '20px 48px',
  borderRadius: '5px 5px 0 0',
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '40px',
  margin: '0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '32px',
  margin: '20px 0',
  padding: '0 48px',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 48px',
  marginBottom: '20px',
};

const messageBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 48px',
  border: '1px solid #e5e7eb',
};

const messageTitle = {
  color: '#059669',
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '12px',
};

const messageSubject = {
  color: '#111827',
  fontSize: '14px',
  lineHeight: '20px',
  marginBottom: '8px',
};

const messageContent = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  whiteSpace: 'pre-wrap' as const,
};

const contactInfo = {
  backgroundColor: '#ecfdf5',
  borderRadius: '8px',
  padding: '16px',
  margin: '20px 48px',
};

const contactItem = {
  color: '#047857',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '4px 0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '40px 48px',
};

const footer = {
  padding: '0 48px',
};

const footerText = {
  color: '#9ca3af',
  fontSize: '14px',
  lineHeight: '20px',
  marginBottom: '4px',
  textAlign: 'center' as const,
};