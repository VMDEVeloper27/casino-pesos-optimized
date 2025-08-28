import { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/canonical';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'es' ? 'Contacto | CasinosPesos' : 'Contact | CasinosPesos',
    description: locale === 'es' ? 'Contáctanos para cualquier consulta' : 'Contact us for any inquiry',
    alternates: {
      canonical: getCanonicalUrl('/contacto', locale),
    },
  };
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}