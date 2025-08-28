import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata-helpers';
import SignUpClient from './SignUpClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata(
    locale,
    '/auth/signup',
    'Crear Cuenta Gratis | Registro en CasinosPesos',
    'Create Free Account | Sign Up at CasinosPesos',
    'Regístrate gratis en CasinosPesos y accede a bonos exclusivos de hasta $50,000 MXN, comparador de casinos y guías expertas',
    'Sign up free at CasinosPesos and access exclusive bonuses up to $50,000 MXN, casino comparator and expert guides',
    {
      keywords: {
        es: 'registro casino, crear cuenta casinospesos, bonos exclusivos méxico, registro gratis casino',
        en: 'casino signup, create casinospesos account, exclusive mexico bonuses, free casino registration'
      },
      robots: {
        index: false,
        follow: false,
      }
    }
  );
}

export default async function SignUpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SignUpClient locale={locale} />;
}