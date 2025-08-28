import { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/canonical';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'es' ? 'Guías de Casino | CasinosPesos' : 'Casino Guides | CasinosPesos',
    description: locale === 'es' ? 'Guías completas sobre casinos online' : 'Complete guides about online casinos',
    alternates: {
      canonical: getCanonicalUrl('/guias', locale),
    },
  };
}

export default function GuiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}