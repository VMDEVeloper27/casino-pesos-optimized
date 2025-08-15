import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface NewsletterWelcomeEmailProps {
  email: string;
  unsubscribeUrl?: string;
}

export const NewsletterWelcomeEmail = ({
  email,
  unsubscribeUrl = '#',
}: NewsletterWelcomeEmailProps) => {
  const previewText = '¡Bienvenido a CasinosPesos Newsletter!';

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>🎰 CasinosPesos</Heading>
          </Section>

          <Heading style={h2}>¡Bienvenido a nuestra Newsletter!</Heading>
          
          <Text style={text}>
            Gracias por suscribirte a la newsletter de CasinosPesos. A partir de ahora recibirás:
          </Text>

          <Section style={benefitsList}>
            <Text style={benefit}>✅ Los mejores bonos exclusivos de casinos online</Text>
            <Text style={benefit}>✅ Nuevos casinos verificados y seguros</Text>
            <Text style={benefit}>✅ Guías y estrategias para maximizar tus ganancias</Text>
            <Text style={benefit}>✅ Promociones especiales solo para suscriptores</Text>
          </Section>

          <Section style={buttonContainer}>
            <Button
              style={button}
              href="https://casinospesos.com/bonos"
            >
              Ver Bonos Exclusivos
            </Button>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footerText}>
              Este email fue enviado a {email}
            </Text>
            <Text style={footerText}>
              Si no te suscribiste a esta newsletter, puedes{' '}
              <Link href={unsubscribeUrl} style={link}>
                darte de baja aquí
              </Link>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              © 2024 CasinosPesos. Todos los derechos reservados.
            </Text>
            <Text style={footerText}>
              Juega con responsabilidad. 18+
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewsletterWelcomeEmail;

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
  textAlign: 'center' as const,
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 48px',
  marginBottom: '20px',
};

const benefitsList = {
  padding: '20px 48px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  margin: '0 24px 20px',
};

const benefit = {
  color: '#111827',
  fontSize: '15px',
  lineHeight: '24px',
  marginBottom: '12px',
};

const buttonContainer = {
  padding: '0 48px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#059669',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '40px 48px',
};

const link = {
  color: '#059669',
  textDecoration: 'underline',
};

const footer = {
  padding: '0 48px',
  marginTop: '32px',
};

const footerText = {
  color: '#9ca3af',
  fontSize: '14px',
  lineHeight: '20px',
  marginBottom: '4px',
  textAlign: 'center' as const,
};