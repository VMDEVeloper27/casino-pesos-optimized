import { getCanonicalUrl } from '@/lib/canonical';
import { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'es') {
    return {
      title: 'Recuperar Contraseña | CasinosPesos',
      description: 'Recupera el acceso a tu cuenta de CasinosPesos de forma segura y rápida',
      alternates: {
        canonical: getCanonicalUrl('/auth/forgot-password', locale),
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  
  return {
    title: 'Forgot Password | CasinosPesos',
    description: 'Recover access to your CasinosPesos account safely and quickly',
    alternates: {
      canonical: getCanonicalUrl('/auth/forgot-password', locale),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ForgotPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ForgotPasswordClient locale={locale} />;
}