import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata-helpers';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata(
    locale,
    '/contacto',
    'Contacto | CasinosPesos',
    'Contact | CasinosPesos',
    'Contáctanos para cualquier consulta sobre casinos online. Equipo experto disponible para ayudarte.',
    'Contact us for any inquiry about online casinos. Expert team available to help you.',
    {
      keywords: {
        es: 'contacto casinospesos, soporte casino, ayuda casino online',
        en: 'contact casinospesos, casino support, online casino help'
      }
    }
  );
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}