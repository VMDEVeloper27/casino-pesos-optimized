// CTA text variations for better engagement and SEO
export const ctaTexts = {
  es: [
    'Jugar Ahora',
    'Comenzar a Jugar',
    'Obtener Bono',
    'Reclamar Oferta',
    'Registrarse Ahora',
    'Abrir Cuenta',
    'Explorar Casino',
    'Ver Promociones',
    'Juega Ya',
    'Unirse Ahora'
  ],
  en: [
    'Play Now',
    'Start Playing',
    'Get Bonus',
    'Claim Offer',
    'Sign Up Now',
    'Open Account',
    'Explore Casino',
    'View Promotions',
    'Play Today',
    'Join Now'
  ]
} as const;

// Get a random CTA text
export function getRandomCTA(locale: 'es' | 'en' = 'es'): string {
  const texts = ctaTexts[locale];
  return texts[Math.floor(Math.random() * texts.length)];
}

// Get a specific CTA text by index
export function getCTAByIndex(index: number, locale: 'es' | 'en' = 'es'): string {
  const texts = ctaTexts[locale];
  return texts[index % texts.length];
}

// Get CTA text based on bonus type
export function getCTAByType(type: string, locale: 'es' | 'en' = 'es'): string {
  const typeMap: Record<string, { es: string; en: string }> = {
    welcome: { es: 'Obtener Bono', en: 'Get Bonus' },
    no_deposit: { es: 'Jugar Gratis', en: 'Play Free' },
    reload: { es: 'Recargar Ahora', en: 'Reload Now' },
    cashback: { es: 'Reclamar Cashback', en: 'Claim Cashback' },
    vip: { es: 'Unirse VIP', en: 'Join VIP' },
    default: { es: 'Jugar Ahora', en: 'Play Now' }
  };
  
  const text = typeMap[type] || typeMap.default;
  return text[locale];
}