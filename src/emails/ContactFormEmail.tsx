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

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export const ContactFormEmail = ({
  name,
  email,
  subject,
  message,
  date,
}: ContactFormEmailProps) => {
  const previewText = `Nuevo mensaje de contacto de ${name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>📧 Nuevo Mensaje de Contacto</Heading>
          
          <Section style={section}>
            <Text style={label}>Nombre:</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Link href={`mailto:${email}`} style={link}>
              {email}
            </Link>
          </Section>

          <Section style={section}>
            <Text style={label}>Asunto:</Text>
            <Text style={value}>{subject}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Mensaje:</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              Este mensaje fue enviado desde el formulario de contacto de CasinosPesos
            </Text>
            <Text style={footerText}>
              Fecha: {date}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormEmail;

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
};

const h1 = {
  color: '#059669',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
  padding: '0 48px',
};

const section = {
  padding: '0 48px',
  marginBottom: '16px',
};

const label = {
  color: '#6b7280',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  marginBottom: '4px',
};

const value = {
  color: '#111827',
  fontSize: '16px',
  marginTop: '4px',
};

const link = {
  color: '#059669',
  fontSize: '16px',
  textDecoration: 'underline',
};

const messageStyle = {
  color: '#111827',
  fontSize: '16px',
  lineHeight: '24px',
  marginTop: '4px',
  whiteSpace: 'pre-wrap' as const,
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  padding: '0 48px',
};

const footerText = {
  color: '#9ca3af',
  fontSize: '14px',
  marginBottom: '4px',
};