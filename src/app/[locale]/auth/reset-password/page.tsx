import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata-helpers';
import ResetPasswordClient from './ResetPasswordClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata(
    locale,
    '/auth/reset-password',
    'Restablecer Contraseña | CasinosPesos',
    'Reset Password | CasinosPesos',
    'Restablece tu contraseña de CasinosPesos de forma segura',
    'Reset your CasinosPesos password securely',
    {
      robots: {
        index: false,
        follow: false,
      }
    }
  );
}

export default async function ResetPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ResetPasswordClient locale={locale} />;
}