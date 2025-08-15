import {
  Body,
  Button,
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

interface AdminNotificationEmailProps {
  type: 'new_review' | 'new_contact' | 'new_subscriber' | 'new_user';
  title: string;
  details: Record<string, any>;
  actionUrl?: string;
  actionText?: string;
}

export const AdminNotificationEmail = ({
  type,
  title,
  details,
  actionUrl,
  actionText = 'Ver en Admin Panel',
}: AdminNotificationEmailProps) => {
  const previewText = `[Admin] ${title}`;

  const getEmoji = () => {
    switch (type) {
      case 'new_review': return '⭐';
      case 'new_contact': return '📧';
      case 'new_subscriber': return '📬';
      case 'new_user': return '👤';
      default: return '🔔';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'new_review': return '#f59e0b';
      case 'new_contact': return '#3b82f6';
      case 'new_subscriber': return '#10b981';
      case 'new_user': return '#8b5cf6';
      default: return '#059669';
    }
  };

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={{ ...header, backgroundColor: getColor() }}>
            <Heading style={h1}>
              {getEmoji()} Notificación de Administrador
            </Heading>
          </Section>

          <Section style={content}>
            <Heading style={h2}>{title}</Heading>

            <Section style={detailsSection}>
              {Object.entries(details).map(([key, value]) => (
                <div key={key} style={detailRow}>
                  <Text style={detailLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:
                  </Text>
                  <Text style={detailValue}>
                    {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                  </Text>
                </div>
              ))}
            </Section>

            {actionUrl && (
              <Section style={buttonContainer}>
                <Button style={button} href={actionUrl}>
                  {actionText}
                </Button>
              </Section>
            )}
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              Esta es una notificación automática del sistema CasinosPesos Admin.
            </Text>
            <Text style={footerText}>
              Fecha: {new Date().toLocaleString('es-MX')}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AdminNotificationEmail;

const main = {
  backgroundColor: '#f3f4f6',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  maxWidth: '600px',
};

const header = {
  padding: '24px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0',
};

const content = {
  padding: '32px',
};

const h2 = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const detailsSection = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '24px',
};

const detailRow = {
  marginBottom: '12px',
};

const detailLabel = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 4px',
};

const detailValue = {
  color: '#111827',
  fontSize: '15px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const buttonContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#059669',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '0',
};

const footer = {
  padding: '24px',
  backgroundColor: '#f9fafb',
};

const footerText = {
  color: '#9ca3af',
  fontSize: '14px',
  margin: '0 0 4px',
  textAlign: 'center' as const,
};