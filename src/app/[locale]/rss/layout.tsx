import { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/canonical';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'RSS Feed | CasinosPesos',
    description: locale === 'es' ? 'Feed RSS de CasinosPesos' : 'CasinosPesos RSS Feed',
    alternates: {
      canonical: getCanonicalUrl('/rss', locale),
    },
  };
}

export default function RSSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}