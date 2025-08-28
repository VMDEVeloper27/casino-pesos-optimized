import { getCanonicalUrl } from '@/lib/canonical';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'es') {
    return {
      title: 'Iniciar Sesión | CasinosPesos',
      description: 'Accede a tu cuenta en CasinosPesos para gestionar tus casinos favoritos y bonos exclusivos',
      alternates: {
        canonical: getCanonicalUrl('/auth/signin', locale),
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  
  return {
    title: 'Sign In | CasinosPesos',
    description: 'Access your CasinosPesos account to manage your favorite casinos and exclusive bonuses',
    alternates: {
      canonical: getCanonicalUrl('/auth/signin', locale),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}