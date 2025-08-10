// Site constants for CasinosPesos

export const SITE_CONFIG = {
  name: 'CasinosPesos',
  description: 'Los mejores casinos online en México - Reseñas, bonos y guías completas',
  url: 'https://casinospesos.com',
  ogImage: '/images/og-image.jpg',
  keywords: ['casinos online', 'México', 'bonos casino', 'reseñas casino', 'juegos casino'],
  author: 'CasinosPesos Team',
  locale: 'es-MX',
} as const

export const NAVIGATION_ITEMS = [
  { label: 'Inicio', href: '/' },
  { 
    label: 'Casinos', 
    href: '/casinos',
    children: [
      { label: 'Todos los Casinos', href: '/casinos' },
      { label: 'Mejor Valorados', href: '/casinos/mejor-valorados' },
      { label: 'Bonos sin Depósito', href: '/casinos/sin-deposito' },
      { label: 'Casinos Nuevos', href: '/casinos/nuevos' },
    ]
  },
  { 
    label: 'Juegos', 
    href: '/juegos',
    children: [
      { label: 'Todos los Juegos', href: '/juegos' },
      { label: 'Tragamonedas', href: '/juegos/slots' },
      { label: 'Mesa', href: '/juegos/mesa' },
      { label: 'Casino en Vivo', href: '/juegos/vivo' },
      { label: 'Jackpots', href: '/juegos/jackpots' },
    ]
  },
  { 
    label: 'Bonos', 
    href: '/bonos',
    children: [
      { label: 'Todos los Bonos', href: '/bonos' },
      { label: 'Bonos de Bienvenida', href: '/bonos/bienvenida' },
      { label: 'Giros Gratis', href: '/bonos/giros-gratis' },
      { label: 'Sin Depósito', href: '/bonos/sin-deposito' },
    ]
  },
  { 
    label: 'Guías', 
    href: '/guias',
    children: [
      { label: 'Cómo Jugar', href: '/guias/como-jugar' },
      { label: 'Métodos de Pago', href: '/guias/pagos' },
      { label: 'Juego Responsable', href: '/guias/responsable' },
      { label: 'Términos y Condiciones', href: '/guias/terminos' },
    ]
  },
  { label: 'Blog', href: '/blog' },
] as const

export const PAYMENT_METHODS = [
  'Visa',
  'Mastercard',
  'Oxxo',
  'Spei',
  'PayPal',
  'Neteller',
  'Skrill',
  'Paysafecard',
  'Bitcoin',
  'Ethereum',
  'Banco Azteca',
  'Banorte',
  'BBVA',
  'Santander',
] as const

export const GAME_TYPES = [
  'Tragamonedas',
  'Blackjack',
  'Ruleta',
  'Baccarat',
  'Poker',
  'Casino en Vivo',
  'Jackpots Progresivos',
  'Video Poker',
  'Dados',
  'Keno',
] as const

export const CASINO_LICENSES = [
  'Malta Gaming Authority',
  'UK Gambling Commission',
  'Curacao eGaming',
  'Gibraltar Regulatory Authority',
  'Kahnawake Gaming Commission',
  'Alderney Gambling Control Commission',
  'Isle of Man Gambling Supervision Commission',
] as const

export const BONUS_TYPES = [
  'Bono de Bienvenida',
  'Bono de Depósito',
  'Bono sin Depósito',
  'Giros Gratis',
  'Bono de Recarga',
  'Cashback',
  'Programa VIP',
  'Torneo',
] as const

export const COUNTRIES = [
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'ES', name: 'España', flag: '🇪🇸' },
] as const

export const CURRENCIES = [
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
  { code: 'USD', name: 'Dólar Americano', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
] as const

export const VOLATILITY_LEVELS = [
  { value: 'low', label: 'Baja', description: 'Pagos frecuentes pero menores' },
  { value: 'medium', label: 'Media', description: 'Balance entre frecuencia y cantidad' },
  { value: 'high', label: 'Alta', description: 'Pagos grandes pero menos frecuentes' },
] as const

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/casinospesos',
  twitter: 'https://twitter.com/casinospesos',
  instagram: 'https://instagram.com/casinospesos',
  youtube: 'https://youtube.com/@casinospesos',
  telegram: 'https://t.me/casinospesos',
} as const

export const CONTACT_INFO = {
  email: 'contacto@casinospesos.com',
  support: 'soporte@casinospesos.com',
  business: 'negocios@casinospesos.com',
} as const

export const GAMBLING_RESOURCES = [
  {
    name: 'Jugadores Anónimos México',
    url: 'https://jugadoresanonimos.org.mx',
    phone: '55-5025-4550'
  },
  {
    name: 'GamCare',
    url: 'https://www.gamcare.org.uk',
    phone: '0808-8020-133'
  },
  {
    name: 'Gambling Therapy',
    url: 'https://www.gamblingtherapy.org',
    description: 'Apoyo online gratuito'
  }
] as const

export const API_ENDPOINTS = {
  casinos: '/api/casinos',
  games: '/api/games',
  bonuses: '/api/bonuses',
  reviews: '/api/reviews',
  providers: '/api/providers',
  search: '/api/search',
  newsletter: '/api/newsletter',
  contact: '/api/contact',
} as const

export const DEFAULT_PAGE_SIZE = 12
export const MAX_PAGE_SIZE = 100
export const DEFAULT_RATING = 0
export const MAX_RATING = 5

export const COOKIE_CONSENT_KEY = 'casinospesos-cookie-consent'
export const THEME_KEY = 'casinospesos-theme'
export const LANGUAGE_KEY = 'casinospesos-language'

export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[0-9\s\-\(\)]{10,}$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  url: /^https?:\/\/.+/,
} as const