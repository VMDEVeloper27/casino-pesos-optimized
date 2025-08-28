import { getCanonicalUrl } from '@/lib/canonical';
import { Metadata } from 'next';
import SignUpClient from './SignUpClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'es') {
    return {
      title: 'Registro | CasinosPesos',
      description: 'Crea tu cuenta gratis en CasinosPesos para acceder a bonos exclusivos y gestionar tus casinos favoritos',
      alternates: {
        canonical: getCanonicalUrl('/auth/signup', locale),
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  
  return {
    title: 'Sign Up | CasinosPesos',
    description: 'Create your free CasinosPesos account to access exclusive bonuses and manage your favorite casinos',
    alternates: {
      canonical: getCanonicalUrl('/auth/signup', locale),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SignUpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SignUpClient locale={locale} />;
}