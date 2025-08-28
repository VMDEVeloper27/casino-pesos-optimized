import { getCanonicalUrl } from '@/lib/canonical';
import { Metadata } from 'next';
import SignInClient from './SignInClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'es') {
    return {
      title: 'Iniciar Sesión | CasinosPesos',
      description: 'Accede a tu cuenta en CasinosPesos para gestionar tus casinos favoritos y bonos exclusivos',
      alternates: {
        canonical: getCanonicalUrl('/auth/signin', locale),
      },
      openGraph: {
        title: 'Iniciar Sesión | CasinosPesos',
        description: 'Accede a tu cuenta para gestionar tus casinos favoritos',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://casinospesos.com'}/es/auth/signin`,
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://casinospesos.com'}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'CasinosPesos - Iniciar Sesión'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Iniciar Sesión | CasinosPesos',
        description: 'Accede a tu cuenta en CasinosPesos',
        images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://casinospesos.com'}/og-image.jpg`],
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
    openGraph: {
      title: 'Sign In | CasinosPesos',
      description: 'Access your account to manage your favorite casinos',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://casinospesos.com'}/en/auth/signin`,
      siteName: 'CasinosPesos',
      locale: 'en_US',
      type: 'website',
      images: [{
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://casinospesos.com'}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'CasinosPesos - Sign In'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sign In | CasinosPesos',
      description: 'Access your CasinosPesos account',
      images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://casinospesos.com'}/og-image.jpg`],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SignInPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SignInClient locale={locale} />;
}