// Casino types matching Prisma schema exactly
export interface CasinoFormData {
  // Basic Information
  name: string;
  slug: string;
  logo: string;
  websiteUrl: string;
  affiliateLink: string;
  rating: number;
  established: number;
  description: string;
  descriptionEs: string;
  descriptionEn: string;
  
  // Features Arrays
  features: string[];
  languages: string[];
  currencies: string[];
  licenses: string[];
  supportedCountries: string[];
  restrictedCountries: string[];
  
  // Support
  supportEmail: string;
  supportPhone: string;
  liveChatAvailable: boolean;
  supportHours: string;
  
  // Status
  isActive: boolean;
  isFeatured: boolean;
  priority: number;
  status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  
  // Related data (will be handled separately)
  bonuses?: BonusFormData[];
  games?: GameFormData[];
  paymentMethods?: string[]; // IDs of payment methods
  pros?: string[];
  cons?: string[];
}

export interface BonusFormData {
  type: 'WELCOME' | 'NO_DEPOSIT' | 'RELOAD' | 'CASHBACK' | 'FREE_SPINS' | 'VIP' | 'HIGH_ROLLER' | 'REFERRAL';
  name: string;
  nameEs?: string;
  nameEn?: string;
  amount?: number;
  percentage?: number;
  maxBonus?: number;
  minDeposit?: number;
  freeSpins?: number;
  wageringRequirement?: number;
  bonusCode?: string;
  termsAndConditions?: string;
  validUntil?: string;
  isExclusive: boolean;
  isActive: boolean;
}

export interface GameFormData {
  category: 'SLOTS' | 'TABLE_GAMES' | 'LIVE_CASINO' | 'VIDEO_POKER' | 'SPORTS_BETTING' | 'LOTTERY' | 'SCRATCH_CARDS' | 'VIRTUAL_SPORTS';
  provider: string;
  count: number;
  popularTitles: string[];
}

// Default values for new casino
export const defaultCasinoData: CasinoFormData = {
  name: '',
  slug: '',
  logo: '',
  websiteUrl: '',
  affiliateLink: '',
  rating: 4.0,
  established: new Date().getFullYear(),
  description: '',
  descriptionEs: '',
  descriptionEn: '',
  features: [],
  languages: ['es', 'en'],
  currencies: ['MXN', 'USD'],
  licenses: [],
  supportedCountries: ['MX'],
  restrictedCountries: [],
  supportEmail: '',
  supportPhone: '',
  liveChatAvailable: false,
  supportHours: '24/7',
  isActive: true,
  isFeatured: false,
  priority: 0,
  status: 'DRAFT',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: [],
  bonuses: [],
  games: [],
  paymentMethods: [],
  pros: [],
  cons: []
};