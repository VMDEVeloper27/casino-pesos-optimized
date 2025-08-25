import Script from 'next/script';

interface SchemaOrgProps {
  type: 'Organization' | 'Review' | 'Product' | 'WebSite' | 'Article' | 'FAQPage';
  data: any;
}

export function SchemaOrg({ type, data }: SchemaOrgProps) {
  const generateSchema = () => {
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'CasinosPesos',
          url: 'https://www.casinospesos.com',
          logo: 'https://www.casinospesos.com/logo.png',
          description: 'Los mejores casinos online que aceptan pesos mexicanos',
          sameAs: [
            'https://twitter.com/casinospesos',
            'https://www.facebook.com/casinospesos'
          ],
          ...data
        };

      case 'Review':
        return {
          '@context': 'https://schema.org',
          '@type': 'Review',
          itemReviewed: {
            '@type': 'Product',
            name: data.casinoName,
            image: data.casinoLogo,
            description: data.casinoDescription,
            offers: {
              '@type': 'Offer',
              name: data.bonusName || 'Bono de Bienvenida',
              description: data.bonusDescription,
              price: '0',
              priceCurrency: 'MXN'
            }
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: data.rating,
            bestRating: '5',
            worstRating: '1'
          },
          author: {
            '@type': 'Organization',
            name: 'CasinosPesos'
          },
          reviewBody: data.reviewBody,
          datePublished: data.datePublished || new Date().toISOString(),
          ...data.additional
        };

      case 'Product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name,
          image: data.image,
          description: data.description,
          brand: {
            '@type': 'Brand',
            name: data.brand || 'CasinosPesos'
          },
          aggregateRating: data.rating ? {
            '@type': 'AggregateRating',
            ratingValue: data.rating,
            bestRating: '5',
            worstRating: '1',
            ratingCount: data.ratingCount || 1
          } : undefined,
          offers: data.bonus ? {
            '@type': 'Offer',
            url: data.url,
            priceCurrency: 'MXN',
            price: '0',
            priceValidUntil: data.validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: data.name
            }
          } : undefined,
          ...data.additional
        };

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'CasinosPesos',
          url: 'https://www.casinospesos.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://www.casinospesos.com/es/buscar?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          },
          ...data
        };

      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.headline,
          description: data.description,
          image: data.image || 'https://www.casinospesos.com/logo.png',
          author: {
            '@type': 'Organization',
            name: 'CasinosPesos',
            url: 'https://www.casinospesos.com'
          },
          publisher: {
            '@type': 'Organization',
            name: 'CasinosPesos',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.casinospesos.com/logo.png'
            }
          },
          datePublished: data.datePublished || new Date().toISOString(),
          dateModified: data.dateModified || new Date().toISOString(),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url
          },
          ...data.additional
        };

      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.questions?.map((q: any) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer
            }
          })),
          ...data.additional
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();

  if (!schema) return null;

  return (
    <Script
      id={`schema-org-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}

// Helper function for casino bonus schema
export function generateCasinoBonusSchema(casino: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: `${casino.name} - Bono de Bienvenida`,
    description: `${casino.bonus.percentage}% hasta $${casino.bonus.amount.toLocaleString()} MXN`,
    url: casino.affiliateLink,
    priceCurrency: 'MXN',
    price: '0',
    eligibleQuantity: {
      '@type': 'QuantitativeValue',
      minValue: casino.bonus.minDeposit,
      unitText: 'MXN'
    },
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: '0',
      priceCurrency: 'MXN',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: casino.bonus.wageringRequirement,
        unitText: 'x rollover'
      }
    },
    seller: {
      '@type': 'Organization',
      name: casino.name,
      image: casino.logo,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: casino.rating,
        bestRating: '5',
        worstRating: '1',
        ratingCount: casino.ratingCount || 100
      }
    },
    validFrom: new Date().toISOString(),
    validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    availability: 'https://schema.org/InStock',
    category: 'Casino Bonus'
  };
}

// Helper function for game schema
export function generateGameSchema(game: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.name,
    description: `${game.name} - ${game.type} by ${game.provider}`,
    image: game.image,
    creator: {
      '@type': 'Organization',
      name: game.provider
    },
    gamePlatform: 'Web',
    genre: game.type,
    applicationCategory: 'Game',
    aggregateRating: game.rating ? {
      '@type': 'AggregateRating',
      ratingValue: game.rating,
      bestRating: '5',
      worstRating: '1',
      ratingCount: game.ratingCount || 50
    } : undefined,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
      url: game.demoUrl || '#'
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'RTP',
        value: `${game.rtp}%`
      },
      {
        '@type': 'PropertyValue',
        name: 'Max Win',
        value: `${game.maxWin}x`
      },
      {
        '@type': 'PropertyValue',
        name: 'Volatility',
        value: game.volatility
      }
    ]
  };
}