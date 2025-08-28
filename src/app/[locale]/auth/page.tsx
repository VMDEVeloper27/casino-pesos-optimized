import { getCanonicalUrl } from '@/lib/canonical';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'es') {
    return {
      title: 'Autenticación | CasinosPesos',
      description: 'Accede a tu cuenta de CasinosPesos o crea una nueva para gestionar tus casinos favoritos',
      alternates: {
        canonical: getCanonicalUrl('/auth', locale),
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  
  return {
    title: 'Authentication | CasinosPesos',
    description: 'Access your CasinosPesos account or create a new one to manage your favorite casinos',
    alternates: {
      canonical: getCanonicalUrl('/auth', locale),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AuthPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`./${locale}/auth/signin`);
}