interface Casino {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  bonus: string;
  minDeposit: number;
  paymentMethods: string[];
}

export function CasinoStructuredData({ casino }: { casino: Casino }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://casinospesos.com/es/casinos/${casino.id}`,
    "name": casino.name,
    "description": casino.description,
    "url": `https://casinospesos.com/es/casinos/${casino.id}`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MX"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": casino.rating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": casino.reviewCount
    },
    "offers": {
      "@type": "Offer",
      "description": casino.bonus,
      "url": `https://casinospesos.com/es/casinos/${casino.id}`,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": casino.minDeposit,
        "priceCurrency": "MXN"
      }
    },
    "paymentAccepted": casino.paymentMethods,
    "currenciesAccepted": ["MXN"],
    "areaServed": {
      "@type": "Country",
      "name": "Mexico"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{name: string, url: string}> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function FAQStructuredData({ faqs }: { faqs: Array<{question: string, answer: string}> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://casinospesos.com/#website",
    "name": "CasinosPesos",
    "description": "Los mejores casinos online que aceptan pesos mexicanos. Bonos exclusivos, métodos de pago locales y reseñas expertas.",
    "url": "https://casinospesos.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://casinospesos.com/es/casinos?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CasinosPesos",
      "logo": {
        "@type": "ImageObject",
        "url": "https://casinospesos.com/images/logo.png"
      }
    },
    "inLanguage": ["es-MX", "en-US"],
    "copyrightYear": "2024"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}