/**
 * Campo Mapping between Database Schema and Forms
 * This file documents the correct field mappings between Prisma schema and form fields
 */

// Database Schema (Prisma) - All available fields in Casino model
export const DATABASE_SCHEMA = {
  // Basic Information
  id: 'string',
  name: 'string',
  slug: 'string',
  logo: 'string?',
  websiteUrl: 'string',
  affiliateLink: 'string',
  rating: 'float',
  established: 'int?',
  description: 'string?',
  descriptionEs: 'string?',
  descriptionEn: 'string?',
  
  // Arrays/Features
  features: 'string[]',
  languages: 'string[]',
  currencies: 'string[]',
  licenses: 'string[]',
  supportedCountries: 'string[]',
  restrictedCountries: 'string[]',
  
  // Support
  supportEmail: 'string?',
  supportPhone: 'string?',
  liveChatAvailable: 'boolean',
  supportHours: 'string?',
  
  // Status
  isActive: 'boolean',
  isFeatured: 'boolean',
  priority: 'int',
  status: 'ContentStatus',
  verifiedDate: 'DateTime?',
  publishedAt: 'DateTime?',
  
  // SEO
  metaTitle: 'string?',
  metaDescription: 'string?',
  metaKeywords: 'string[]',
  
  // Relations (stored in separate tables)
  bonuses: 'Bonus[]',
  games: 'Game[]',
  paymentMethods: 'CasinoPaymentMethod[]',
  reviews: 'Review[]',
  pros: 'CasinoPro[]',
  cons: 'CasinoCon[]',
  
  // Timestamps
  createdAt: 'DateTime',
  updatedAt: 'DateTime'
};

// Current Form Fields in /admin/casinos/new
export const NEW_CASINO_FORM_FIELDS = {
  // Basic Info (CORRECT)
  name: 'name',
  slug: 'slug',
  logo: 'logo',
  rating: 'rating',
  established: 'established',
  
  // INCORRECT MAPPINGS - These don't exist in DB
  affiliate_link: 'should be: affiliateLink',
  status: 'maps to: status (but uses different values)',
  is_featured: 'should be: isFeatured',
  
  // Arrays (PARTIALLY CORRECT)
  features: 'features', // ✓ CORRECT
  licenses: 'licenses', // ✓ CORRECT
  currencies: 'currencies', // ✓ CORRECT
  payment_methods: 'should be stored in CasinoPaymentMethod relation',
  
  // BONUS FIELDS - Should be in separate Bonus table
  bonus_type: 'Bonus.type',
  bonus_amount: 'Bonus.amount',
  bonus_percentage: 'Bonus.percentage',
  bonus_free_spins: 'Bonus.freeSpins',
  bonus_min_deposit: 'Bonus.minDeposit',
  bonus_wagering: 'Bonus.wageringRequirement',
  bonus_code: 'Bonus.bonusCode',
  
  // GAMES - Should be in separate Game table
  games_total: 'Game.count (sum)',
  games_slots: 'Game where category=SLOTS',
  games_live: 'Game where category=LIVE_CASINO',
  games_table: 'Game where category=TABLE_GAMES',
  
  // MISSING FIELDS IN FORM
  websiteUrl: 'NOT IN FORM',
  languages: 'NOT IN FORM',
  supportedCountries: 'NOT IN FORM',
  restrictedCountries: 'NOT IN FORM',
  supportEmail: 'NOT IN FORM',
  supportPhone: 'NOT IN FORM',
  liveChatAvailable: 'NOT IN FORM',
  supportHours: 'NOT IN FORM',
  isActive: 'NOT IN FORM (using status instead)',
  priority: 'NOT IN FORM',
  descriptionEs: 'NOT IN FORM',
  descriptionEn: 'NOT IN FORM',
  metaTitle: 'NOT IN FORM',
  metaDescription: 'NOT IN FORM',
  metaKeywords: 'NOT IN FORM',
  
  // Pros/Cons (stored differently)
  pros: 'should be CasinoPro[]',
  cons: 'should be CasinoCon[]',
  
  // Extra field not in DB
  withdrawal_time: 'NOT IN DATABASE'
};

// Correct field mapping for forms
export const CORRECT_FORM_MAPPING = {
  // Basic Information
  name: 'name',
  slug: 'slug', 
  logo: 'logo',
  websiteUrl: 'websiteUrl',
  affiliateLink: 'affiliateLink',
  rating: 'rating',
  established: 'established',
  description: 'description',
  descriptionEs: 'descriptionEs',
  descriptionEn: 'descriptionEn',
  
  // Features/Arrays
  features: 'features',
  languages: 'languages',
  currencies: 'currencies',
  licenses: 'licenses',
  supportedCountries: 'supportedCountries',
  restrictedCountries: 'restrictedCountries',
  
  // Support
  supportEmail: 'supportEmail',
  supportPhone: 'supportPhone',
  liveChatAvailable: 'liveChatAvailable',
  supportHours: 'supportHours',
  
  // Status
  isActive: 'isActive',
  isFeatured: 'isFeatured',
  priority: 'priority',
  status: 'status', // DRAFT, PENDING_REVIEW, APPROVED, PUBLISHED, ARCHIVED
  
  // SEO
  metaTitle: 'metaTitle',
  metaDescription: 'metaDescription',
  metaKeywords: 'metaKeywords'
};

// Separate forms/sections needed for related data
export const RELATED_DATA_FORMS = {
  bonuses: {
    table: 'Bonus',
    fields: {
      type: 'BonusType',
      name: 'string',
      nameEs: 'string?',
      nameEn: 'string?',
      amount: 'float?',
      percentage: 'int?',
      maxBonus: 'float?',
      minDeposit: 'float?',
      freeSpins: 'int?',
      wageringRequirement: 'int?',
      bonusCode: 'string?',
      termsAndConditions: 'string?',
      validUntil: 'DateTime?',
      isExclusive: 'boolean',
      isActive: 'boolean'
    }
  },
  games: {
    table: 'Game',
    fields: {
      category: 'GameCategory',
      provider: 'string',
      count: 'int',
      popularTitles: 'string[]'
    }
  },
  paymentMethods: {
    table: 'CasinoPaymentMethod',
    fields: {
      paymentMethodId: 'string',
      depositAvailable: 'boolean',
      withdrawalAvailable: 'boolean'
    }
  },
  pros: {
    table: 'CasinoPro',
    fields: {
      text: 'string',
      textEs: 'string?',
      textEn: 'string?',
      order: 'int'
    }
  },
  cons: {
    table: 'CasinoCon',
    fields: {
      text: 'string',
      textEs: 'string?',
      textEn: 'string?',
      order: 'int'
    }
  }
};