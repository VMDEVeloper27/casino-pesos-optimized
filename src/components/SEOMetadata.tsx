import type { Metadata } from 'next';

export interface SEOMetadataProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  locale?: string;
  path?: string;
  noindex?: boolean;
  alternates?: {
    languages?: {
      [key: string]: string;
    };
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.casinospesos.com';
const DEFAULT_OG_IMAGE = '/logo.png';

export function generateSEOMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  locale = 'es',
  path = '',
  noindex = false,
  alternates
}: SEOMetadataProps): Metadata {
  const fullTitle = `${title} | CasinosPesos`;
  const canonicalUrl = canonical || `${SITE_URL}/${locale}${path}`;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: 'CasinosPesos' }],
    creator: 'CasinosPesos',
    publisher: 'CasinosPesos',
    metadataBase: new URL(SITE_URL),
    alternates: alternates || {
      canonical: canonicalUrl,
      languages: {
        'es-MX': `${SITE_URL}/es${path}`,
        'en-US': `${SITE_URL}/en${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'CasinosPesos',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      site: '@casinospesos',
      creator: '@casinospesos',
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    verification: {
      google: 'c16NUc0-PNfYe9xdpmPcsxHyw_Csh9OyYxBBGFJy2KI',
    },
  };
}

// SEO metadata configurations for all pages
export const seoConfig = {
  home: {
    es: {
      title: 'Mejores Casinos Online en Pesos Mexicanos 2025',
      description: 'Descubre los mejores casinos online que aceptan pesos mexicanos. Bonos exclusivos hasta $200,000 MXN, juegos en vivo y tragamonedas. Guías expertas y reseñas honestas.',
      keywords: 'casinos online mexico, casinos pesos mexicanos, mejores casinos mexico, bonos casino mexico, tragamonedas mexico',
    },
    en: {
      title: 'Best Online Casinos Accepting Mexican Pesos 2025',
      description: 'Discover the best online casinos accepting Mexican pesos. Exclusive bonuses up to $200,000 MXN, live games and slots. Expert guides and honest reviews.',
      keywords: 'online casinos mexico, mexican peso casinos, best casinos mexico, casino bonuses mexico, slots mexico',
    },
  },
  casinos: {
    es: {
      title: 'Lista Completa de Casinos Online en México',
      description: 'Explora nuestra lista completa de casinos online confiables en México. Comparamos bonos, métodos de pago, juegos y licencias para ayudarte a elegir.',
      keywords: 'lista casinos mexico, todos los casinos mexicanos, comparar casinos online, casinos confiables mexico',
    },
    en: {
      title: 'Complete List of Online Casinos in Mexico',
      description: 'Explore our complete list of trusted online casinos in Mexico. We compare bonuses, payment methods, games and licenses to help you choose.',
      keywords: 'mexico casino list, all mexican casinos, compare online casinos, trusted casinos mexico',
    },
  },
  comparar: {
    es: {
      title: 'Comparador de Casinos Online México',
      description: 'Compara los mejores casinos online de México lado a lado. Analiza bonos, RTP, métodos de pago y más para tomar la mejor decisión.',
      keywords: 'comparar casinos, comparador casinos mexico, mejor casino online, analisis casinos',
    },
    en: {
      title: 'Online Casino Comparison Mexico',
      description: 'Compare the best online casinos in Mexico side by side. Analyze bonuses, RTP, payment methods and more to make the best decision.',
      keywords: 'compare casinos, casino comparison mexico, best online casino, casino analysis',
    },
  },
  juegos: {
    es: {
      title: 'Juegos de Casino Online Gratis y con Dinero Real',
      description: 'Juega gratis o con dinero real en los mejores casinos de México. Tragamonedas, ruleta, blackjack, póker y juegos en vivo con crupieres reales.',
      keywords: 'juegos casino mexico, tragamonedas gratis, ruleta online, blackjack mexico, casino en vivo',
    },
    en: {
      title: 'Free and Real Money Online Casino Games',
      description: 'Play for free or real money at the best casinos in Mexico. Slots, roulette, blackjack, poker and live games with real dealers.',
      keywords: 'casino games mexico, free slots, online roulette, blackjack mexico, live casino',
    },
  },
  calculadora: {
    es: {
      title: 'Calculadora de Bonos de Casino - Requisitos de Apuesta',
      description: 'Calcula los requisitos de apuesta de cualquier bono de casino. Descubre cuánto necesitas apostar para retirar tus ganancias.',
      keywords: 'calculadora bonos casino, requisitos apuesta, rollover casino, calcular bono',
    },
    en: {
      title: 'Casino Bonus Calculator - Wagering Requirements',
      description: 'Calculate the wagering requirements of any casino bonus. Find out how much you need to bet to withdraw your winnings.',
      keywords: 'casino bonus calculator, wagering requirements, casino rollover, calculate bonus',
    },
  },
  'juego-responsable': {
    es: {
      title: 'Juego Responsable - Guía y Herramientas de Ayuda',
      description: 'Información sobre juego responsable, límites de depósito, autoexclusión y recursos de ayuda para problemas con el juego en México.',
      keywords: 'juego responsable, ludopatia ayuda, autoexclusion casino, limites deposito',
    },
    en: {
      title: 'Responsible Gaming - Guide and Help Tools',
      description: 'Information about responsible gaming, deposit limits, self-exclusion and help resources for gambling problems in Mexico.',
      keywords: 'responsible gaming, gambling help, casino self exclusion, deposit limits',
    },
  },
  'sobre-nosotros': {
    es: {
      title: 'Sobre CasinosPesos - Expertos en Casinos Online',
      description: 'Conoce al equipo de expertos detrás de CasinosPesos. Más de 10 años de experiencia analizando y reseñando casinos online en México.',
      keywords: 'sobre casinospesos, equipo expertos casino, quienes somos',
    },
    en: {
      title: 'About CasinosPesos - Online Casino Experts',
      description: 'Meet the team of experts behind CasinosPesos. Over 10 years of experience analyzing and reviewing online casinos in Mexico.',
      keywords: 'about casinospesos, casino expert team, who we are',
    },
  },
  terms: {
    es: {
      title: 'Términos y Condiciones de Uso',
      description: 'Términos y condiciones de uso del sitio web CasinosPesos. Lee nuestras políticas antes de usar nuestros servicios.',
      keywords: 'terminos condiciones, politicas uso, legal casinospesos',
    },
    en: {
      title: 'Terms and Conditions of Use',
      description: 'Terms and conditions of use for the CasinosPesos website. Read our policies before using our services.',
      keywords: 'terms conditions, usage policies, legal casinospesos',
    },
  },
  privacy: {
    es: {
      title: 'Política de Privacidad y Protección de Datos',
      description: 'Política de privacidad de CasinosPesos. Conoce cómo protegemos y manejamos tu información personal.',
      keywords: 'politica privacidad, proteccion datos, privacidad casinospesos',
    },
    en: {
      title: 'Privacy Policy and Data Protection',
      description: 'CasinosPesos privacy policy. Learn how we protect and handle your personal information.',
      keywords: 'privacy policy, data protection, casinospesos privacy',
    },
  },
  cookies: {
    es: {
      title: 'Política de Cookies',
      description: 'Información sobre el uso de cookies en CasinosPesos. Aprende cómo utilizamos las cookies para mejorar tu experiencia.',
      keywords: 'politica cookies, uso cookies, cookies casinospesos',
    },
    en: {
      title: 'Cookie Policy',
      description: 'Information about cookie usage on CasinosPesos. Learn how we use cookies to improve your experience.',
      keywords: 'cookie policy, cookie usage, casinospesos cookies',
    },
  },
};