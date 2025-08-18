import { Metadata } from 'next';

interface SEOMetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  author,
  publishedTime,
  modifiedTime,
  locale = 'es_MX',
  canonicalUrl,
  noindex = false,
}: SEOMetaTagsProps): Metadata {
  const baseUrl = 'https://casinospesos.com';
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  return {
    title,
    description,
    keywords,
    authors: author ? [{ name: author }] : undefined,
    robots: noindex 
      ? { index: false, follow: false }
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
    openGraph: {
      title,
      description,
      type: ogType,
      url: canonicalUrl || baseUrl,
      siteName: 'CasinosPesos',
      locale,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && ogType === 'article' && { 
        authors: [author],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullOgImage],
      site: '@casinospesos',
      creator: '@casinospesos',
    },
    alternates: canonicalUrl ? {
      canonical: canonicalUrl,
      languages: {
        'es-MX': `${baseUrl}/es`,
        'en-US': `${baseUrl}/en`,
        'x-default': `${baseUrl}/es`,
      },
    } : undefined,
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    other: {
      'fb:app_id': process.env.NEXT_PUBLIC_FB_APP_ID || '',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'format-detection': 'telephone=no',
    },
  };
}

// Helper para páginas de casino
export function generateCasinoMetadata(casino: {
  name: string;
  description: string;
  slug: string;
  rating: number;
  bonus?: string;
  image?: string;
}): Metadata {
  return generateSEOMetadata({
    title: `${casino.name} - Reseña Completa 2024 | CasinosPesos`,
    description: `${casino.description} ⭐ Calificación: ${casino.rating}/5 ${casino.bonus ? `✅ Bono: ${casino.bonus}` : ''} ✅ Análisis experto y opiniones reales.`,
    keywords: `${casino.name}, ${casino.name} reseña, ${casino.name} opiniones, ${casino.name} bono, casino online méxico`,
    ogImage: casino.image || '/images/casinos/default.jpg',
    ogType: 'article',
    canonicalUrl: `https://casinospesos.com/es/casinos/${casino.slug}`,
  });
}

// Helper para páginas de blog
export function generateBlogMetadata(post: {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  tags?: string[];
}): Metadata {
  return generateSEOMetadata({
    title: `${post.title} | Blog CasinosPesos`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    ogImage: post.image || '/images/blog/default.jpg',
    ogType: 'article',
    author: post.author,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    canonicalUrl: `https://casinospesos.com/es/blog/${post.slug}`,
  });
}