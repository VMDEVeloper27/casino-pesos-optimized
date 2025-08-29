// Static casino data for faster initial load
// This data is generated at build time and updated periodically

import type { Casino } from './casino-database';

// Static casino data - update this periodically from database
export const staticCasinos: Casino[] = [
  {
    id: "1",
    name: "Bet365",
    slug: "bet365",
    logo: "/images/casinos/bet365.png",
    rating: 4.9,
    established: 2000,
    affiliateLink: "https://www.bet365.com",
    features: ["Live Streaming", "Cash Out", "Mobile App", "24/7 Support"],
    bonus: {
      type: "welcome",
      amount: 50000,
      percentage: 100,
      freeSpins: 50,
      minDeposit: 200,
      wageringRequirement: 35,
      code: "WELCOME365"
    },
    games: {
      total: 5000,
      slots: 3500,
      live: 300,
      table: 200
    },
    paymentMethods: ["OXXO", "SPEI", "PayPal", "Visa", "Mastercard"],
    withdrawalTime: "24-48 hours",
    licenses: ["MGA", "UKGC"],
    currencies: ["MXN", "USD", "EUR"],
    pros: ["Excelente app móvil", "Streaming en vivo", "Retiros rápidos"],
    cons: ["Verificación estricta"],
    status: "active",
    lastModified: "2024-01-15"
  },
  {
    id: "2",
    name: "Codere",
    slug: "codere",
    logo: "/images/casinos/codere.png",
    rating: 4.7,
    established: 1980,
    affiliateLink: "https://www.codere.mx",
    features: ["Licencia mexicana", "OXXO", "Bonos semanales"],
    bonus: {
      type: "welcome",
      amount: 35000,
      percentage: 200,
      minDeposit: 100,
      wageringRequirement: 30
    },
    games: {
      total: 3000,
      slots: 2000,
      live: 200,
      table: 150
    },
    paymentMethods: ["OXXO", "SPEI", "7-Eleven", "PayPal"],
    withdrawalTime: "2-5 días",
    licenses: ["SEGOB"],
    currencies: ["MXN"],
    pros: ["Licencia SEGOB", "Pagos locales", "Atención en español"],
    cons: ["Menos variedad de juegos"],
    status: "active",
    lastModified: "2024-01-15"
  },
  {
    id: "3",
    name: "Strendus",
    slug: "strendus",
    logo: "/images/casinos/strendus.png",
    rating: 4.6,
    established: 2007,
    affiliateLink: "https://www.strendus.com.mx",
    features: ["100% Mexicano", "Pagos OXXO", "App móvil"],
    bonus: {
      type: "deposit",
      amount: 10000,
      percentage: 100,
      freeSpins: 100,
      minDeposit: 200,
      wageringRequirement: 35
    },
    games: {
      total: 2500,
      slots: 1800,
      live: 150,
      table: 100
    },
    paymentMethods: ["OXXO", "SPEI", "Tarjetas", "PayPal"],
    withdrawalTime: "24-72 horas",
    licenses: ["SEGOB"],
    currencies: ["MXN"],
    pros: ["Casino mexicano", "Promociones locales", "Soporte 24/7"],
    cons: ["Interfaz mejorable"],
    status: "active",
    lastModified: "2024-01-15"
  },
  {
    id: "4",
    name: "Caliente",
    slug: "caliente",
    logo: "/images/casinos/caliente.png",
    rating: 4.5,
    established: 1916,
    affiliateLink: "https://www.caliente.mx",
    features: ["Tradición mexicana", "Locales físicos", "Apuestas deportivas"],
    bonus: {
      type: "welcome",
      amount: 25000,
      percentage: 100,
      minDeposit: 100,
      wageringRequirement: 40
    },
    games: {
      total: 2000,
      slots: 1500,
      live: 100,
      table: 80
    },
    paymentMethods: ["OXXO", "SPEI", "Efectivo en sucursales"],
    withdrawalTime: "1-3 días",
    licenses: ["SEGOB"],
    currencies: ["MXN"],
    pros: ["Marca reconocida", "Locales físicos", "Deportes"],
    cons: ["Menos juegos online"],
    status: "active",
    lastModified: "2024-01-15"
  },
  {
    id: "5",
    name: "PlayUZU",
    slug: "playuzu",
    logo: "/images/casinos/playuzu.png",
    rating: 4.8,
    established: 2016,
    affiliateLink: "https://www.playuzu.com",
    features: ["Sin requisitos de apuesta", "Retiros instantáneos", "Cashback"],
    bonus: {
      type: "no_wagering",
      amount: 10000,
      percentage: 100,
      freeSpins: 50,
      minDeposit: 200,
      wageringRequirement: 0
    },
    games: {
      total: 4000,
      slots: 3000,
      live: 250,
      table: 150
    },
    paymentMethods: ["PayPal", "Skrill", "Visa", "Mastercard"],
    withdrawalTime: "0-24 horas",
    licenses: ["MGA", "UKGC"],
    currencies: ["MXN", "USD", "EUR"],
    pros: ["Sin requisitos", "Retiros rápidos", "Transparente"],
    cons: ["Menos métodos locales"],
    status: "active",
    lastModified: "2024-01-15"
  },
  {
    id: "6",
    name: "LeoVegas",
    slug: "leovegas",
    logo: "/images/casinos/leovegas.png",
    rating: 4.7,
    established: 2011,
    affiliateLink: "https://www.leovegas.com",
    features: ["Rey del móvil", "App premiada", "Jackpots millonarios"],
    bonus: {
      type: "welcome",
      amount: 45000,
      percentage: 150,
      freeSpins: 200,
      minDeposit: 200,
      wageringRequirement: 35
    },
    games: {
      total: 3500,
      slots: 2500,
      live: 200,
      table: 120
    },
    paymentMethods: ["PayPal", "Skrill", "Neteller", "Visa"],
    withdrawalTime: "0-5 días",
    licenses: ["MGA", "UKGC", "Swedish"],
    currencies: ["MXN", "USD", "EUR"],
    pros: ["Mejor app móvil", "Jackpots progresivos", "Variedad"],
    cons: ["Pocos métodos mexicanos"],
    status: "active",
    lastModified: "2024-01-15"
  }
];

// Function to get static casinos (no DB call)
export function getStaticCasinos(): Casino[] {
  return staticCasinos;
}

// Function to get a single casino by ID
export function getStaticCasinoById(id: string): Casino | undefined {
  return staticCasinos.find(casino => casino.id === id);
}

// Function to get a single casino by slug
export function getStaticCasinoBySlug(slug: string): Casino | undefined {
  return staticCasinos.find(casino => casino.slug === slug);
}