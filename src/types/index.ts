// Global type definitions for CasinosPesos

export interface Casino {
  id: string;
  name: string;
  slug: string;
  logo: string;
  rating: number;
  reviewCount: number;
  bonusAmount: number;
  bonusType: 'deposit' | 'no-deposit' | 'free-spins';
  features: string[];
  paymentMethods: string[];
  licenses: string[];
  pros: string[];
  cons: string[];
  description: string;
  url: string;
  termsUrl: string;
  isRecommended: boolean;
  country: string[];
  currency: string[];
}

export interface Game {
  id: string;
  name: string;
  slug: string;
  provider: string;
  type: 'slot' | 'table' | 'live' | 'jackpot';
  image: string;
  rating: number;
  volatility: 'low' | 'medium' | 'high';
  rtp: number;
  maxWin: number;
  minBet: number;
  maxBet: number;
  freePlay: boolean;
  demoUrl?: string;
  description: string;
  features: string[];
}

export interface Review {
  id: string;
  casinoId: string;
  userId: string;
  username: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  verified: boolean;
  date: string;
  helpful: number;
  gameTypes: string[];
}

export interface Bonus {
  id: string;
  casinoId: string;
  title: string;
  type: 'welcome' | 'deposit' | 'no-deposit' | 'free-spins' | 'reload' | 'cashback';
  amount: number;
  percentage: number;
  freeSpins: number;
  minDeposit: number;
  maxBonus: number;
  wagering: number;
  validDays: number;
  gamesToPlay: string[];
  promoCode?: string;
  terms: string;
  isActive: boolean;
  expiryDate: string;
}

export interface Provider {
  id: string;
  name: string;
  slug: string;
  logo: string;
  gameCount: number;
  description: string;
  established: string;
  licenses: string[];
  countries: string[];
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  country: string;
  currency: string;
  language: string;
  preferences: UserPreferences;
  createdAt: string;
  lastLogin: string;
}

export interface UserPreferences {
  newsletter: boolean;
  bonusAlerts: boolean;
  gameRecommendations: boolean;
  casinoUpdates: boolean;
  language: 'es' | 'en';
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  icon?: string;
}

export interface FilterOptions {
  bonusType?: string[];
  rating?: number;
  gameTypes?: string[];
  paymentMethods?: string[];
  country?: string;
  currency?: string;
  sortBy?: 'rating' | 'bonus' | 'newest' | 'alphabetical';
  sortOrder?: 'asc' | 'desc';
}

export type Locale = 'es' | 'en';

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}