import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata-helpers';
import ForgotPasswordClient from './ForgotPasswordClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata(
    locale,
    '/auth/forgot-password',
    'Recuperar Contraseña | Restablecer Acceso | CasinosPesos',
    'Reset Password | Recover Account Access | CasinosPesos',
    'Recupera el acceso a tu cuenta de CasinosPesos. Proceso seguro y rápido para restablecer tu contraseña',
    'Recover access to your CasinosPesos account. Secure and fast process to reset your password',
    {
      keywords: {
        es: 'recuperar contraseña, olvidé mi contraseña, restablecer acceso casino, recuperar cuenta',
        en: 'reset password, forgot password, recover casino access, recover account'
      },
      robots: {
        index: false,
        follow: false,
      }
    }
  );
}

export default async function ForgotPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ForgotPasswordClient locale={locale} />;
}