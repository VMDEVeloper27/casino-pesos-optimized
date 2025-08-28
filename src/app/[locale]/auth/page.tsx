import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata-helpers';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata(
    locale,
    '/auth',
    'Autenticación | CasinosPesos',
    'Authentication | CasinosPesos',
    'Accede a tu cuenta de CasinosPesos o crea una nueva para gestionar tus casinos favoritos',
    'Access your CasinosPesos account or create a new one to manage your favorite casinos',
    {
      robots: {
        index: false,
        follow: false,
      }
    }
  );
}

export default async function AuthPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`./${locale}/auth/signin`);
}