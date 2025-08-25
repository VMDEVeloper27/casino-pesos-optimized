import type { Metadata } from 'next';

const SITE_URL = 'https://www.casinospesos.com';
const DEFAULT_IMAGE = '/logo.png';

interface GenerateSEOProps {
  locale: string;
  path: string;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  keywordsEs: string;
  keywordsEn: string;
}

export function generateSEO({
  locale,
  path,
  titleEs,
  titleEn,
  descriptionEs,
  descriptionEn,
  keywordsEs,
  keywordsEn,
}: GenerateSEOProps): Metadata {
  const isSpanish = locale === 'es';
  const title = isSpanish ? titleEs : titleEn;
  const description = isSpanish ? descriptionEs : descriptionEn;
  const keywords = isSpanish ? keywordsEs : keywordsEn;
  const url = `${SITE_URL}/${locale}${path}`;
  const imageUrl = `${SITE_URL}${DEFAULT_IMAGE}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        'es-MX': `${SITE_URL}/es${path}`,
        'en-US': `${SITE_URL}/en${path}`,
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'CasinosPesos',
      locale: isSpanish ? 'es_MX' : 'en_US',
      type: 'website',
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      site: '@casinospesos',
      creator: '@casinospesos',
    },
    robots: {
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
  };
}