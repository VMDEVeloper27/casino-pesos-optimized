// Only import fs/path on server side
let fs: any;
let path: any;

if (typeof window === 'undefined') {
  fs = require('fs').promises;
  path = require('path');
}

// Define the complete Casino type
export interface Casino {
  id: string;
  name: string;
  slug: string;
  logo: string;
  rating: number;
  established: number;
  affiliateLink: string;
  features: string[];
  bonus: {
    type: string;
    amount: number;
    percentage: number;
    freeSpins?: number;
    minDeposit: number;
    wageringRequirement: number;
    code?: string;
  };
  games: {
    total: number;
    slots: number;
    live: number;
    table: number;
  };
  paymentMethods: string[];
  withdrawalTime: string;
  licenses: string[];
  currencies: string[];
  pros: string[];
  cons: string[];
  status?: string;
  lastModified?: string;
}

// VERIFIED LICENSED MEXICAN CASINOS ONLY - SEGOB/DGJS Permits
const allCasinos: Casino[] = [
  {
    id: 'bet365',
    name: 'Bet365 Casino',
    slug: 'bet365',
    logo: '/images/bet365-logo.png',
    rating: 4.9,
    established: 2001,
    affiliateLink: 'https://bet365.com',
    features: ['Licencia DGJS/DGAAD/DCRCA/P-01/2018', 'Live Casino', 'Mobile App', 'Quick Payouts'],
    bonus: {
      type: 'welcome',
      amount: 30000,
      percentage: 100,
      freeSpins: 200,
      minDeposit: 200,
      wageringRequirement: 15,
      code: 'PESOS365'
    },
    games: {
      total: 2000,
      slots: 1500,
      live: 200,
      table: 300
    },
    paymentMethods: ['PayPal', 'OXXO', 'Visa', 'Mastercard', 'SPEI'],
    withdrawalTime: '2-24 horas',
    licenses: ['SEGOB México (DGJS/DGAAD/DCRCA/P-01/2018)', 'Malta Gaming Authority'],
    currencies: ['MXN', 'USD', 'EUR'],
    pros: [
      'Licencia SEGOB oficial',
      'Retiros ultra-rápidos',
      'Excelente app móvil',
      'Soporte 24/7 en español'
    ],
    cons: [
      'Verificación obligatoria',
      'Límites conservadores'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'codere',
    name: 'Codere Casino',
    slug: 'codere',
    logo: '/images/codere-logo.png',
    rating: 4.8,
    established: 1980,
    affiliateLink: 'https://codere.mx',
    features: ['Licencia DGJS/2475/2025', 'OXXO', 'Salas Físicas', 'Deportes'],
    bonus: {
      type: 'welcome',
      amount: 3000,
      percentage: 200,
      freeSpins: 200,
      minDeposit: 100,
      wageringRequirement: 30,
      code: 'CODERE200'
    },
    games: {
      total: 1500,
      slots: 1200,
      live: 100,
      table: 200
    },
    paymentMethods: ['OXXO', 'SPEI', 'CoDi', 'Visa', 'Mastercard'],
    withdrawalTime: '24-48 horas',
    licenses: ['SEGOB México (DGJS/2475/2025)', 'España'],
    currencies: ['MXN'],
    pros: [
      'Licencia SEGOB oficial',
      'Salas físicas en México',
      'OXXO disponible',
      'Marca confiable'
    ],
    cons: [
      'Retiros pueden tardar',
      'App móvil mejorable'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'caliente',
    name: 'Caliente Casino',
    slug: 'caliente',
    logo: '/images/caliente-logo.png',
    rating: 4.7,
    established: 1916,
    affiliateLink: 'https://caliente.mx',
    features: ['Licencia DGG/SP/404/97', 'Más de 100 años', 'Deportes', 'OXXO'],
    bonus: {
      type: 'welcome',
      amount: 10000,
      percentage: 100,
      freeSpins: 100,
      minDeposit: 300,
      wageringRequirement: 25,
      code: 'CALIENTE100'
    },
    games: {
      total: 1800,
      slots: 1400,
      live: 150,
      table: 250
    },
    paymentMethods: ['PayPal', 'OXXO', 'SPEI', 'Visa', 'Mastercard', 'Astropay'],
    withdrawalTime: '12-36 horas',
    licenses: ['SEGOB México (DGG/SP/404/97)'],
    currencies: ['MXN', 'USD'],
    pros: [
      'Licencia SEGOB oficial',
      'Marca histórica',
      'Excelente sportsbook',
      'Muchos métodos de pago'
    ],
    cons: [
      'Interfaz anticuada',
      'Soporte limitado'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'betway',
    name: 'Betway Casino',
    slug: 'betway',
    logo: '/images/betway-logo.png',
    rating: 4.8,
    established: 2006,
    affiliateLink: 'https://betway.mx',
    features: ['Licencia DGJS/045/2017', 'eCOGRA certificado', 'Deportes y eSports', 'Cash Out'],
    bonus: {
      type: 'welcome',
      amount: 4000,
      percentage: 100,
      freeSpins: 50,
      minDeposit: 100,
      wageringRequirement: 35,
      code: 'BETWAY'
    },
    games: {
      total: 450,
      slots: 350,
      live: 60,
      table: 40
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'Neteller', 'Skrill'],
    withdrawalTime: '24-48 horas',
    licenses: ['SEGOB México (DGJS/045/2017)', 'Malta Gaming Authority'],
    currencies: ['MXN', 'USD'],
    pros: [
      'Licencia SEGOB oficial',
      'Marca internacional reconocida',
      'Excelente app móvil',
      'Retiros rápidos'
    ],
    cons: [
      'Catálogo de juegos limitado',
      'Bonos con requisitos estrictos'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'strendus',
    name: 'Strendus Casino',
    slug: 'strendus',
    logo: '/images/strendus-logo.png',
    rating: 4.6,
    established: 2006,
    affiliateLink: 'https://strendus.com.mx',
    features: ['Licencia DGJS/075/2018', 'Casino 100% mexicano', 'Torneos diarios', 'Programa VIP'],
    bonus: {
      type: 'welcome',
      amount: 1000,
      percentage: 100,
      freeSpins: 0,
      minDeposit: 100,
      wageringRequirement: 30,
      code: 'STRENDUS500'
    },
    games: {
      total: 1500,
      slots: 1200,
      live: 150,
      table: 150
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'Todito Cash'],
    withdrawalTime: '24-72 horas',
    licenses: ['SEGOB México (DGJS/075/2018)'],
    currencies: ['MXN'],
    pros: [
      'Licencia SEGOB oficial',
      'Casino 100% mexicano',
      'Torneos frecuentes',
      'Atención al cliente en español'
    ],
    cons: [
      'Bono de bienvenida modesto',
      'Sin app móvil dedicada'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'playuzu',
    name: 'PlayUZU Casino',
    slug: 'playuzu',
    logo: '/images/playuzu-logo.png',
    rating: 4.7,
    established: 2016,
    affiliateLink: 'https://playuzu.mx',
    features: ['Licencia DGJS/DCRCA/2501/2021', 'Sin rollover en giros', 'Cashback semanal', 'UZU Shop'],
    bonus: {
      type: 'welcome',
      amount: 0,
      percentage: 0,
      freeSpins: 80,
      minDeposit: 200,
      wageringRequirement: 0,
      code: ''
    },
    games: {
      total: 2500,
      slots: 2200,
      live: 200,
      table: 100
    },
    paymentMethods: ['OXXO', 'SPEI', 'PayPal', 'Visa', 'Mastercard', 'Skrill'],
    withdrawalTime: '24-48 horas',
    licenses: ['SEGOB México (DGJS/DCRCA/2501/2021)', 'Malta Gaming Authority'],
    currencies: ['MXN', 'USD', 'EUR'],
    pros: [
      'Licencia SEGOB oficial',
      'Giros sin requisitos de apuesta',
      'Programa de recompensas único',
      'Transparencia total'
    ],
    cons: [
      'Sin bono en efectivo',
      'Catálogo enfocado en slots'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'betsson',
    name: 'Betsson Casino',
    slug: 'betsson',
    logo: '/images/betsson-logo.png',
    rating: 4.8,
    established: 1963,
    affiliateLink: 'https://betsson.mx',
    features: ['Licencia DGJS/DCRCA/0688/2021', 'Empresa sueca cotizada', 'Múltiples premios', 'Streaming deportivo'],
    bonus: {
      type: 'welcome',
      amount: 5000,
      percentage: 100,
      freeSpins: 100,
      minDeposit: 200,
      wageringRequirement: 35,
      code: 'BETSSON'
    },
    games: {
      total: 2000,
      slots: 1700,
      live: 200,
      table: 100
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'Neteller', 'Skrill', 'PayPal'],
    withdrawalTime: '24-48 horas',
    licenses: ['SEGOB México (DGJS/DCRCA/0688/2021)', 'Sweden', 'Malta'],
    currencies: ['MXN', 'USD', 'EUR'],
    pros: [
      'Licencia SEGOB oficial',
      'Empresa con 60+ años de experiencia',
      'Excelente reputación internacional',
      'Múltiples productos de juego'
    ],
    cons: [
      'Interfaz puede ser compleja',
      'Verificación estricta'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'novibet',
    name: 'Novibet Casino',
    slug: 'novibet',
    logo: '/images/novibet-logo.png',
    rating: 4.6,
    established: 2010,
    affiliateLink: 'https://novibet.mx',
    features: ['Licencia DGJS/DCRCA/1121/2020', 'Súper cuotas', 'Apuestas en vivo', 'Cash Out'],
    bonus: {
      type: 'welcome',
      amount: 2000,
      percentage: 100,
      freeSpins: 30,
      minDeposit: 200,
      wageringRequirement: 30,
      code: 'NOVI2025'
    },
    games: {
      total: 3000,
      slots: 2500,
      live: 300,
      table: 200
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'Neteller', 'PayPal'],
    withdrawalTime: '24-72 horas',
    licenses: ['SEGOB México (DGJS/DCRCA/1121/2020)', 'Malta Gaming Authority'],
    currencies: ['MXN', 'USD'],
    pros: [
      'Licencia SEGOB oficial',
      'Excelentes cuotas deportivas',
      'Múltiples promociones',
      'App móvil de calidad'
    ],
    cons: [
      'Soporte limitado en horarios',
      'Proceso de verificación lento'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'winpot',
    name: 'Winpot Casino',
    slug: 'winpot',
    logo: '/images/winpot-logo.png',
    rating: 4.5,
    established: 2014,
    affiliateLink: 'https://winpot.mx',
    features: ['Licencia DGJS/1807/2023', '100% mexicano', 'Bingo online', 'Lotería mexicana'],
    bonus: {
      type: 'welcome',
      amount: 2000,
      percentage: 100,
      freeSpins: 20,
      minDeposit: 100,
      wageringRequirement: 25,
      code: 'WINPOT'
    },
    games: {
      total: 800,
      slots: 600,
      live: 100,
      table: 100
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'Todito Cash'],
    withdrawalTime: '24-48 horas',
    licenses: ['SEGOB México (DGJS/1807/2023)'],
    currencies: ['MXN'],
    pros: [
      'Licencia SEGOB oficial',
      'Casino 100% mexicano',
      'Juegos tradicionales mexicanos',
      'Soporte local excelente'
    ],
    cons: [
      'Catálogo limitado',
      'Sin app para iOS'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'ganabet',
    name: 'Ganabet Casino',
    slug: 'ganabet',
    logo: '/images/ganabet-logo.png',
    rating: 4.6,
    established: 2016,
    affiliateLink: 'https://ganabet.mx',
    features: ['Licencia DGJS/271/2018', 'TV Azteca partner', 'Apuestas deportivas', 'Aviator'],
    bonus: {
      type: 'welcome',
      amount: 1000,
      percentage: 100,
      freeSpins: 0,
      minDeposit: 100,
      wageringRequirement: 30,
      code: 'GANA100'
    },
    games: {
      total: 1200,
      slots: 1000,
      live: 100,
      table: 100
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'PayPal'],
    withdrawalTime: '24-48 horas',
    licenses: ['SEGOB México (DGJS/271/2018)'],
    currencies: ['MXN'],
    pros: [
      'Licencia SEGOB oficial',
      'Asociado con TV Azteca',
      'Aviator disponible',
      'Promociones frecuentes'
    ],
    cons: [
      'Catálogo limitado comparado con otros',
      'Bono modesto'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: '10bet',
    name: '10bet Casino',
    slug: '10bet',
    logo: '/images/10bet-logo.png',
    rating: 4.5,
    established: 2003,
    affiliateLink: 'https://10bet.mx',
    features: ['Licencia DGJS/DGAAD/DCRCA/P-01/2017', 'Múltiples idiomas', 'Casino móvil', 'Deportes virtuales'],
    bonus: {
      type: 'welcome',
      amount: 2000,
      percentage: 50,
      freeSpins: 0,
      minDeposit: 200,
      wageringRequirement: 35,
      code: '10BET'
    },
    games: {
      total: 1000,
      slots: 800,
      live: 100,
      table: 100
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'Neteller', 'Skrill'],
    withdrawalTime: '24-72 horas',
    licenses: ['SEGOB México (DGJS/DGAAD/DCRCA/P-01/2017)', 'UK Gambling Commission'],
    currencies: ['MXN', 'USD', 'EUR'],
    pros: [
      'Licencia SEGOB oficial',
      'Empresa con 20+ años',
      'Múltiples opciones de apuesta',
      'Interfaz multiidioma'
    ],
    cons: [
      'Bono con porcentaje bajo',
      'Catálogo limitado'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'winner',
    name: 'Winner Casino',
    slug: 'winner',
    logo: '/images/winner-logo.png',
    rating: 4.4,
    established: 2009,
    affiliateLink: 'https://winner.mx',
    features: ['Licencia DGG/SP/404/97', 'Playtech powered', 'Jackpots progresivos', 'VIP Club'],
    bonus: {
      type: 'welcome',
      amount: 6000,
      percentage: 150,
      freeSpins: 50,
      minDeposit: 350,
      wageringRequirement: 40,
      code: 'WINNER150'
    },
    games: {
      total: 1500,
      slots: 1200,
      live: 200,
      table: 100
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'PayPal', 'Neteller'],
    withdrawalTime: '48-96 horas',
    licenses: ['SEGOB México (DGG/SP/404/97)'],
    currencies: ['MXN', 'USD'],
    pros: [
      'Licencia SEGOB oficial',
      'Powered by Playtech',
      'Grandes jackpots',
      'Programa VIP exclusivo'
    ],
    cons: [
      'Retiros lentos',
      'Requisitos de apuesta altos'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'rushbet',
    name: 'RushBet Casino',
    slug: 'rushbet',
    logo: '/images/rushbet-logo.png',
    rating: 4.7,
    established: 2019,
    affiliateLink: 'https://rushbet.mx',
    features: ['Licencia SEGOB México', 'Rush Street Interactive', 'Grupo Multimedios', 'Cashback diario'],
    bonus: {
      type: 'welcome',
      amount: 3000,
      percentage: 100,
      freeSpins: 50,
      minDeposit: 200,
      wageringRequirement: 30,
      code: 'RUSH100'
    },
    games: {
      total: 2000,
      slots: 1700,
      live: 200,
      table: 100
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'PayPal', 'Skrill'],
    withdrawalTime: '24-48 horas',
    licenses: ['SEGOB México'],
    currencies: ['MXN', 'USD'],
    pros: [
      'Licencia SEGOB oficial',
      'Partner de Grupo Multimedios',
      'Cashback diario',
      'App móvil excelente'
    ],
    cons: [
      'Relativamente nuevo en México',
      'Menos promociones que competidores'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'bwin',
    name: 'Bwin Casino',
    slug: 'bwin',
    logo: '/images/bwin-logo.png',
    rating: 4.8,
    established: 1997,
    affiliateLink: 'https://bwin.mx',
    features: ['Licencia SEGOB México', 'Entain Group', 'Patrocinador deportivo', 'Live streaming'],
    bonus: {
      type: 'welcome',
      amount: 2000,
      percentage: 100,
      freeSpins: 0,
      minDeposit: 200,
      wageringRequirement: 35,
      code: 'BWIN100'
    },
    games: {
      total: 2500,
      slots: 2000,
      live: 300,
      table: 200
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'PayPal', 'Neteller', 'Skrill'],
    withdrawalTime: '24-48 horas',
    licenses: ['SEGOB México', 'Gibraltar', 'UK Gambling Commission'],
    currencies: ['MXN', 'USD', 'EUR'],
    pros: [
      'Licencia SEGOB oficial',
      'Marca global reconocida',
      'Streaming deportivo gratis',
      'Parte del grupo Entain'
    ],
    cons: [
      'Enfocado más en deportes',
      'Bono sin giros gratis'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'instabet',
    name: 'Instabet Casino',
    slug: 'instabet',
    logo: '/images/instabet-logo.png',
    rating: 4.5,
    established: 2017,
    affiliateLink: 'https://instabet.mx',
    features: ['Licencia SEGOB México', 'Apuestas rápidas', 'Insta Games', 'Múltiples deportes'],
    bonus: {
      type: 'welcome',
      amount: 1500,
      percentage: 100,
      freeSpins: 0,
      minDeposit: 100,
      wageringRequirement: 30,
      code: 'INSTA100'
    },
    games: {
      total: 1000,
      slots: 800,
      live: 100,
      table: 100
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'Todito Cash'],
    withdrawalTime: '24-72 horas',
    licenses: ['SEGOB México'],
    currencies: ['MXN'],
    pros: [
      'Licencia SEGOB oficial',
      'Interfaz simple y rápida',
      'Buenos límites de apuesta',
      'Atención al cliente 24/7'
    ],
    cons: [
      'Catálogo de juegos limitado',
      'Sin app para iOS'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'sportiumbet',
    name: 'Sportiumbet Casino',
    slug: 'sportiumbet',
    logo: '/images/sportiumbet-logo.png',
    rating: 4.6,
    established: 2019,
    affiliateLink: 'https://sportiumbet.mx',
    features: ['Licencia SEGOB México', 'Kings League partner', 'Cirsa Gaming', 'Apuestas en vivo'],
    bonus: {
      type: 'welcome',
      amount: 3000,
      percentage: 100,
      freeSpins: 0,
      minDeposit: 200,
      wageringRequirement: 30,
      code: 'SPORTIUM'
    },
    games: {
      total: 1500,
      slots: 1200,
      live: 200,
      table: 100
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'PayPal'],
    withdrawalTime: '24-48 horas',
    licenses: ['SEGOB México'],
    currencies: ['MXN', 'USD'],
    pros: [
      'Licencia SEGOB oficial',
      'Partner oficial Kings League',
      'Parte del grupo Cirsa',
      'Excelentes cuotas deportivas'
    ],
    cons: [
      'Más enfocado en deportes',
      'Sin giros gratis en bono'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'betcris',
    name: 'BetCris Casino',
    slug: 'betcris',
    logo: '/images/betcris-logo.png',
    rating: 4.7,
    established: 1985,
    affiliateLink: 'https://betcris.mx',
    features: ['Licencia SEGOB México', 'Líder en Latinoamérica', 'NFL partner', 'Cash Out'],
    bonus: {
      type: 'welcome',
      amount: 4000,
      percentage: 100,
      freeSpins: 50,
      minDeposit: 200,
      wageringRequirement: 35,
      code: 'CRIS100'
    },
    games: {
      total: 2000,
      slots: 1600,
      live: 250,
      table: 150
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'Bitcoin', 'PayPal'],
    withdrawalTime: '24-48 horas',
    licenses: ['SEGOB México', 'Costa Rica'],
    currencies: ['MXN', 'USD'],
    pros: [
      'Licencia SEGOB oficial',
      'Casi 40 años de experiencia',
      'Acepta criptomonedas',
      'Partner oficial NFL'
    ],
    cons: [
      'Interfaz puede mejorar',
      'Verificación estricta'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  },
  {
    id: 'playdoit',
    name: 'PlayDoit Casino',
    slug: 'playdoit',
    logo: '/images/playdoit-logo.png',
    rating: 4.5,
    established: 2020,
    affiliateLink: 'https://playdoit.mx',
    features: ['Licencia DGJS/2192/2023', 'Grupo Televisa', 'Doitbet powered', 'Aviator'],
    bonus: {
      type: 'welcome',
      amount: 2000,
      percentage: 100,
      freeSpins: 30,
      minDeposit: 100,
      wageringRequirement: 30,
      code: 'PLAY100'
    },
    games: {
      total: 1200,
      slots: 1000,
      live: 100,
      table: 100
    },
    paymentMethods: ['OXXO', 'SPEI', 'Visa', 'Mastercard', 'Todito Cash'],
    withdrawalTime: '24-48 horas',
    licenses: ['SEGOB México (DGJS/2192/2023)'],
    currencies: ['MXN'],
    pros: [
      'Licencia SEGOB oficial',
      'Respaldado por Televisa',
      'Aviator disponible',
      'Depósito mínimo bajo'
    ],
    cons: [
      'Relativamente nuevo',
      'Catálogo en crecimiento'
    ],
    status: 'active',
    lastModified: new Date().toISOString()
  }
];

// Database file path (only used on server)
const DB_FILE = typeof window === 'undefined' && path ? path.join(process.cwd(), 'data', 'casinos.json') : '';

// Get all casinos
// Synchronous version for client components
export function getAllCasinosSync(): Casino[] {
  return allCasinos;
}

export async function getAllCasinos(): Promise<Casino[]> {
  try {
    return allCasinos;
  } catch (error) {
    console.error('Error getting casinos:', error);
    return [];
  }
}

// Get casino by ID
export async function getCasinoById(id: string): Promise<Casino | null> {
  try {
    const casino = allCasinos.find(c => c.id === id);
    return casino || null;
  } catch (error) {
    console.error('Error getting casino by ID:', error);
    return null;
  }
}

// Get casino by slug (alias for getCasinoById since we use id as slug)
export async function getCasinoBySlug(slug: string): Promise<Casino | null> {
  try {
    const casino = allCasinos.find(c => c.id === slug || c.slug === slug);
    return casino || null;
  } catch (error) {
    console.error('Error getting casino by slug:', error);
    return null;
  }
}

// Get casinos by filters
export async function getCasinosByFilters(filters: {
  minRating?: number;
  licenses?: string[];
  paymentMethods?: string[];
  currencies?: string[];
}): Promise<Casino[]> {
  try {
    return allCasinos.filter(casino => {
      if (filters.minRating && casino.rating < filters.minRating) return false;
      if (filters.licenses && !filters.licenses.some(license => 
        casino.licenses.some(cl => cl.toLowerCase().includes(license.toLowerCase()))
      )) return false;
      if (filters.paymentMethods && !filters.paymentMethods.some(method => 
        casino.paymentMethods.includes(method)
      )) return false;
      if (filters.currencies && !filters.currencies.some(currency => 
        casino.currencies.includes(currency)
      )) return false;
      return true;
    });
  } catch (error) {
    console.error('Error filtering casinos:', error);
    return [];
  }
}

// Update a casino
export async function updateCasino(id: string, updates: Partial<Casino>): Promise<Casino | null> {
  try {
    const index = allCasinos.findIndex(c => c.id === id);
    
    if (index === -1) {
      console.error('Casino not found:', id);
      return null;
    }
    
    // Update the casino in memory
    allCasinos[index] = {
      ...allCasinos[index],
      ...updates,
      lastModified: new Date().toISOString()
    };
    
    // Optionally save to file for persistence
    await saveCasinosToFile();
    
    return allCasinos[index];
  } catch (error) {
    console.error('Error updating casino:', error);
    return null;
  }
}

// Add a new casino
export async function addCasino(casino: Casino): Promise<Casino | null> {
  try {
    // Check if casino already exists
    if (allCasinos.find(c => c.id === casino.id)) {
      console.error('Casino already exists:', casino.id);
      return null;
    }
    
    // Add to array
    allCasinos.push({
      ...casino,
      lastModified: new Date().toISOString()
    });
    
    // Optionally save to file for persistence
    await saveCasinosToFile();
    
    return casino;
  } catch (error) {
    console.error('Error adding casino:', error);
    return null;
  }
}

// Delete a casino
export async function deleteCasino(id: string): Promise<boolean> {
  try {
    const index = allCasinos.findIndex(c => c.id === id);
    
    if (index === -1) {
      console.error('Casino not found:', id);
      return false;
    }
    
    // Remove from array
    allCasinos.splice(index, 1);
    
    // Optionally save to file for persistence
    await saveCasinosToFile();
    
    return true;
  } catch (error) {
    console.error('Error deleting casino:', error);
    return false;
  }
}

// Save casinos to file for persistence
async function saveCasinosToFile(): Promise<void> {
  try {
    // Only save in development mode to avoid file system access in production
    if (process.env.NODE_ENV === 'development') {
      const dataDir = path.join(process.cwd(), 'data');
      const filePath = path.join(dataDir, 'casinos.json');
      
      // Ensure directory exists
      await fs.mkdir(dataDir, { recursive: true });
      
      // Write to file
      await fs.writeFile(
        filePath, 
        JSON.stringify(allCasinos, null, 2),
        'utf-8'
      );
      
      console.log('Casinos saved to file');
    }
  } catch (error) {
    console.error('Error saving casinos to file:', error);
    // Don't throw - this is optional persistence
  }
}

// Load casinos from file if it exists
async function loadCasinosFromFile(): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'development') {
      const filePath = path.join(process.cwd(), 'data', 'casinos.json');
      
      // Check if file exists
      try {
        await fs.access(filePath);
        const data = await fs.readFile(filePath, 'utf-8');
        const loadedCasinos = JSON.parse(data);
        
        // Merge with existing casinos (prefer file data)
        loadedCasinos.forEach((casino: Casino) => {
          const index = allCasinos.findIndex(c => c.id === casino.id);
          if (index !== -1) {
            allCasinos[index] = casino;
          } else {
            allCasinos.push(casino);
          }
        });
        
        console.log('Casinos loaded from file');
      } catch (error) {
        // File doesn't exist, use default data
        console.log('No casinos file found, using default data');
      }
    }
  } catch (error) {
    console.error('Error loading casinos from file:', error);
  }
}

// Initialize by loading from file if available
if (typeof window === 'undefined') {
  loadCasinosFromFile();
}

// Export the casinos array directly for backward compatibility
export { allCasinos };