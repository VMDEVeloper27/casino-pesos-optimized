import { Metadata } from 'next';
import { getCanonicalUrl } from './canonical';

interface OpenGraphConfig {
  title: string;
  description: string;
  locale: string;
  path: string;
  type?: 'website' | 'article';
  images?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }[];
}

export function generateOpenGraph(config: OpenGraphConfig): Metadata['openGraph'] {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://casinospesos.com';
  const defaultImage = {
    url: `${baseUrl}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: 'CasinosPesos - Los Mejores Casinos Online de México'
  };

  return {
    title: config.title,
    description: config.description,
    url: `${baseUrl}/${config.locale}${config.path}`,
    siteName: 'CasinosPesos',
    locale: config.locale === 'es' ? 'es_MX' : 'en_US',
    type: config.type || 'website',
    images: config.images || [defaultImage]
  };
}

export function generateTwitterCard(title: string, description: string, image?: string): Metadata['twitter'] {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://casinospesos.com';
  
  return {
    card: 'summary_large_image',
    site: '@casinospesos',
    creator: '@casinospesos',
    title,
    description,
    images: [image || `${baseUrl}/og-image.jpg`]
  };
}

export function generatePageMetadata(
  locale: string,
  path: string,
  esTitle: string,
  enTitle: string,
  esDescription: string,
  enDescription: string,
  options: {
    keywords?: { es?: string; en?: string };
    robots?: Metadata['robots'];
    type?: 'website' | 'article';
  } = {}
): Metadata {
  const isSpanish = locale === 'es';
  const title = isSpanish ? esTitle : enTitle;
  const description = isSpanish ? esDescription : enDescription;
  
  return {
    title,
    description,
    keywords: isSpanish ? options.keywords?.es : options.keywords?.en,
    alternates: {
      canonical: getCanonicalUrl(path, locale),
      languages: {
        'es-MX': getCanonicalUrl(path, 'es'),
        'en-US': getCanonicalUrl(path, 'en'),
      }
    },
    openGraph: generateOpenGraph({
      title,
      description,
      locale,
      path,
      type: options.type
    }),
    twitter: generateTwitterCard(title, description),
    robots: options.robots || {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    }
  };
}