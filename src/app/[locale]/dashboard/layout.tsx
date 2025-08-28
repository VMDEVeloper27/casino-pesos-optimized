import { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/canonical';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    alternates: {
      canonical: getCanonicalUrl('/dashboard', locale),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}