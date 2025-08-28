import { getCanonicalUrl } from '@/lib/canonical';
import { Metadata } from 'next';
import ResetPasswordClient from './ResetPasswordClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'es') {
    return {
      title: 'Restablecer Contraseña | CasinosPesos',
      description: 'Restablece tu contraseña de CasinosPesos de forma segura',
      alternates: {
        canonical: getCanonicalUrl('/auth/reset-password', locale),
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  
  return {
    title: 'Reset Password | CasinosPesos',
    description: 'Reset your CasinosPesos password securely',
    alternates: {
      canonical: getCanonicalUrl('/auth/reset-password', locale),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ResetPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ResetPasswordClient locale={locale} />;
}