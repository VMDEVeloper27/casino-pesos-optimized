import { supabase } from './supabase';

export interface Game {
  id: string;
  name: string;
  slug: string;
  provider: string;
  type: 'slot' | 'live' | 'table' | 'crash' | 'instant' | 'video-poker' | 'card' | 'jackpot';
  category?: 'new' | 'hot' | 'classic' | 'tournament' | 'game-show' | 'jackpot' | 'megaways' | 'bonus-buy';
  rtp?: number;
  volatility?: 'low' | 'medium' | 'high' | 'very-high';
  maxWin?: number; // multiplier
  minBet?: number;
  maxBet?: number;
  paylines?: number;
  reels?: number;
  rows?: number;
  features?: string[];
  theme?: string;
  releaseDate?: string;
  popularity: number; // 1-100
  playCount?: number;
  image: string;
  screenshots?: string[];
  demoUrl?: string;
  embedUrl?: string; // For iframe embedding
  fullscreenMode?: boolean;
  mobileOptimized?: boolean;
  availableAt: string[]; // casino IDs
  description?: string;
  instructions?: string;
  paytable?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isHot?: boolean;
  // Extended fields from game_details table
  howToPlay?: {
    title: string;
    steps: string[];
  };
  bonusFeatures?: {
    title: string;
    features: Array<{
      name: string;
      description: string;
    }>;
  };
  symbols?: Array<{
    symbol: string;
    payout: string;
    description: string;
  }>;
  tipsStrategies?: {
    title: string;
    tips: string[];
  };
}

export const games: Game[] = [
  // Popular Slots
  {
    id: 'gates-of-olympus',
    name: 'Gates of Olympus',
    slug: 'gates-of-olympus',
    provider: 'Pragmatic Play',
    type: 'slot',
    category: 'hot',
    rtp: 96.5,
    volatility: 'high',
    maxWin: 5000,
    reels: 6,
    rows: 5,
    paylines: 20,
    features: ['Tumble', 'Multipliers', 'Free Spins', 'Ante Bet'],
    theme: 'Ancient Greece',
    popularity: 98,
    playCount: 15420,
    availableAt: ['bet365', 'codere', 'caliente', 'betway', 'strendus'],
    description: 'Join Zeus in this highly volatile slot with tumbling reels and multipliers up to 500x.',
    image: 'https://img.freepik.com/free-photo/slot-machine-with-golden-coins_1142-50488.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vs20olympgate',
    mobileOptimized: true,
    isHot: true,
    minBet: 20,
    maxBet: 10000,
    releaseDate: '2021-02-13'
  },
  {
    id: 'sweet-bonanza',
    name: 'Sweet Bonanza',
    slug: 'sweet-bonanza',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.48,
    volatility: 'medium',
    maxWin: 21175,
    features: ['Tumble', 'Multipliers', 'Free Spins', 'Feature Buy'],
    theme: 'Candy',
    popularity: 95,
    availableAt: ['bet365', 'codere', 'betway', 'rushbet', 'strendus'],
    description: 'A sweet adventure with tumbling wins and multiplier bombs up to 100x.',
    image: '/images/games/sweet-bonanza.jpg'
  },
  {
    id: 'book-of-dead',
    name: 'Book of Dead',
    slug: 'book-of-dead',
    provider: "Play'n GO",
    type: 'slot',
    rtp: 96.21,
    volatility: 'high',
    maxWin: 5000,
    features: ['Free Spins', 'Expanding Symbols', 'Gamble Feature'],
    theme: 'Ancient Egypt',
    popularity: 92,
    availableAt: ['bet365', 'betway', 'leo-vegas', 'william-hill'],
    description: 'Join Rich Wilde on an Egyptian adventure with expanding symbols and big win potential.',
    image: '/images/games/book-of-dead.jpg'
  },
  {
    id: 'big-bass-bonanza',
    name: 'Big Bass Bonanza',
    slug: 'big-bass-bonanza',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.71,
    volatility: 'medium',
    maxWin: 2100,
    features: ['Free Spins', 'Wild Collector', 'Retrigger'],
    theme: 'Fishing',
    popularity: 90,
    availableAt: ['codere', 'caliente', 'betway', 'strendus', 'rushbet'],
    description: 'Cast your line for big wins with the fisherman wild collector feature.',
    image: '/images/games/big-bass-bonanza.jpg'
  },
  {
    id: 'starlight-princess',
    name: 'Starlight Princess',
    slug: 'starlight-princess',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.5,
    volatility: 'high',
    maxWin: 5000,
    features: ['Tumble', 'Multipliers', 'Free Spins', 'Ante Bet'],
    theme: 'Anime/Fantasy',
    popularity: 88,
    availableAt: ['bet365', 'codere', 'betway', 'strendus'],
    description: 'Magical anime-styled slot with tumbling reels and multipliers.',
    image: '/images/games/starlight-princess.jpg'
  },
  {
    id: 'aztec-gold-megaways',
    name: 'Aztec Gold Megaways',
    slug: 'aztec-gold-megaways',
    provider: 'iSoftBet',
    type: 'slot',
    rtp: 96.01,
    volatility: 'high',
    maxWin: 25000,
    features: ['Megaways', 'Cascading Reels', 'Free Spins', 'Multipliers'],
    theme: 'Aztec',
    popularity: 85,
    availableAt: ['caliente', 'rushbet', 'wplay', 'betsson'],
    description: 'Up to 117,649 ways to win in this Aztec-themed Megaways adventure.',
    image: 'https://img.freepik.com/free-photo/slot-machine-with-golden-coins_1142-50488.jpg'
  },
  {
    id: 'wolf-gold',
    name: 'Wolf Gold',
    slug: 'wolf-gold',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.01,
    volatility: 'medium',
    maxWin: 5000,
    features: ['Money Respin', 'Free Spins', 'Jackpot'],
    theme: 'Wildlife',
    popularity: 87,
    availableAt: ['bet365', 'codere', 'caliente', 'betway', 'strendus'],
    description: 'Hunt for the jackpot in this wildlife-themed slot with money collect feature.',
    image: 'https://img.freepik.com/free-photo/slot-machine-with-golden-coins_1142-50488.jpg'
  },

  // Popular Live Games
  {
    id: 'crazy-time',
    name: 'Crazy Time',
    slug: 'crazy-time',
    provider: 'Evolution',
    type: 'live',
    rtp: 96.08,
    volatility: 'high',
    maxWin: 20000,
    minBet: 10,
    maxBet: 5000,
    features: ['Bonus Games', 'Multipliers', 'Interactive'],
    popularity: 100,
    availableAt: ['bet365', 'codere', 'caliente', 'betway', 'rushbet', 'strendus'],
    description: 'The ultimate live game show with 4 exciting bonus rounds and massive multipliers.',
    image: 'https://img.freepik.com/free-photo/wheel-fortune-3d-illustration_1142-51733.jpg'
  },
  {
    id: 'lightning-roulette',
    name: 'Lightning Roulette',
    slug: 'lightning-roulette',
    provider: 'Evolution',
    type: 'live',
    rtp: 97.3,
    volatility: 'medium',
    maxWin: 500,
    minBet: 20,
    maxBet: 10000,
    features: ['Lightning Numbers', 'Multipliers up to 500x'],
    popularity: 94,
    availableAt: ['bet365', 'codere', 'betway', 'caliente', 'william-hill'],
    description: 'Electrifying roulette with random lightning strikes offering multipliers up to 500x.',
    image: 'https://img.freepik.com/free-photo/roulette-wheel-with-ball_1142-50423.jpg'
  },
  {
    id: 'monopoly-live',
    name: 'Monopoly Live',
    slug: 'monopoly-live',
    provider: 'Evolution',
    type: 'live',
    rtp: 96.23,
    volatility: 'medium',
    maxWin: 10000,
    minBet: 10,
    maxBet: 2500,
    features: ['3D Bonus Game', 'Multipliers', 'Interactive'],
    popularity: 91,
    availableAt: ['bet365', 'betway', 'leo-vegas', 'rushbet'],
    description: 'The classic board game comes to life with a 3D bonus round featuring Mr. Monopoly.',
    image: 'https://img.freepik.com/free-photo/wheel-fortune-3d-illustration_1142-51733.jpg'
  },
  {
    id: 'mega-ball',
    name: 'Mega Ball',
    slug: 'mega-ball',
    provider: 'Evolution',
    type: 'live',
    rtp: 95.05,
    volatility: 'low',
    maxWin: 1000000,
    minBet: 10,
    maxBet: 1000,
    features: ['Bingo-style', 'Multipliers', 'Multiple Cards'],
    popularity: 86,
    availableAt: ['codere', 'caliente', 'betway', 'strendus'],
    description: 'Bingo meets lottery in this exciting live game with multipliers up to 100x.',
    image: 'https://img.freepik.com/free-photo/bingo-balls-lottery-machine_1142-51678.jpg'
  },
  {
    id: 'dream-catcher',
    name: 'Dream Catcher',
    slug: 'dream-catcher',
    provider: 'Evolution',
    type: 'live',
    rtp: 96.58,
    volatility: 'low',
    maxWin: 40,
    minBet: 10,
    maxBet: 2500,
    features: ['Money Wheel', 'Simple Gameplay', 'Multipliers'],
    popularity: 83,
    availableAt: ['bet365', 'codere', 'caliente', 'betway', 'rushbet'],
    description: 'Simple and exciting money wheel game with multipliers.',
    image: 'https://img.freepik.com/free-photo/wheel-fortune-3d-illustration_1142-51733.jpg'
  },

  // Crash Games
  {
    id: 'aviator',
    name: 'Aviator',
    slug: 'aviator',
    provider: 'Spribe',
    type: 'crash',
    rtp: 97,
    volatility: 'medium',
    maxWin: 10000,
    minBet: 1,
    maxBet: 1000,
    features: ['Auto Cashout', 'Live Stats', 'Chat'],
    popularity: 96,
    availableAt: ['caliente', 'rushbet', 'wplay', 'betsson', 'strendus'],
    description: 'Watch the plane fly and cash out before it disappears for multiplier wins.',
    image: 'https://img.freepik.com/free-vector/airplane-sky-background_1142-51234.jpg'
  },
  {
    id: 'spaceman',
    name: 'Spaceman',
    slug: 'spaceman',
    provider: 'Pragmatic Play',
    type: 'crash',
    rtp: 96.5,
    volatility: 'medium',
    maxWin: 5000,
    minBet: 1,
    maxBet: 500,
    features: ['Auto Cashout', '50% Cashout', 'Chat'],
    popularity: 89,
    availableAt: ['bet365', 'codere', 'betway', 'strendus'],
    description: 'Join the spaceman on his journey to the stars with increasing multipliers.',
    image: 'https://img.freepik.com/free-vector/astronaut-space-background_1142-51345.jpg'
  },
  {
    id: 'jetx',
    name: 'JetX',
    slug: 'jetx',
    provider: 'SmartSoft Gaming',
    type: 'crash',
    rtp: 97,
    volatility: 'medium',
    maxWin: 10000,
    minBet: 1,
    maxBet: 500,
    features: ['Double Bet', 'Auto Withdraw', 'Statistics'],
    popularity: 84,
    availableAt: ['caliente', 'rushbet', 'wplay'],
    description: 'Jet-powered crash game with dual betting options.',
    image: 'https://img.freepik.com/free-vector/jet-plane-sky_1142-51456.jpg'
  },

  // Table Games
  {
    id: 'european-roulette',
    name: 'European Roulette',
    slug: 'european-roulette',
    provider: 'Multiple',
    type: 'table',
    rtp: 97.3,
    volatility: 'low',
    maxWin: 35,
    minBet: 1,
    maxBet: 5000,
    features: ['Single Zero', 'Classic Bets', 'Statistics'],
    popularity: 88,
    availableAt: ['bet365', 'codere', 'caliente', 'betway', 'rushbet', 'strendus'],
    description: 'Classic European roulette with single zero and 97.3% RTP.',
    image: 'https://img.freepik.com/free-photo/roulette-wheel-with-ball_1142-50423.jpg'
  },
  {
    id: 'blackjack-classic',
    name: 'Classic Blackjack',
    slug: 'blackjack-classic',
    provider: 'Multiple',
    type: 'table',
    rtp: 99.5,
    volatility: 'low',
    maxWin: 2.5,
    minBet: 5,
    maxBet: 2500,
    features: ['Split', 'Double Down', 'Insurance'],
    popularity: 90,
    availableAt: ['bet365', 'codere', 'caliente', 'betway', 'rushbet', 'strendus'],
    description: 'Traditional blackjack with standard rules and up to 99.5% RTP.',
    image: 'https://img.freepik.com/free-photo/playing-cards-chips-casino-table_1142-51567.jpg'
  },
  {
    id: 'baccarat',
    name: 'Baccarat',
    slug: 'baccarat',
    provider: 'Multiple',
    type: 'table',
    rtp: 98.94,
    volatility: 'low',
    maxWin: 8,
    minBet: 10,
    maxBet: 5000,
    features: ['Player/Banker/Tie', 'Side Bets', 'Roadmaps'],
    popularity: 82,
    availableAt: ['bet365', 'betway', 'leo-vegas', 'william-hill'],
    description: 'Classic baccarat with player, banker, and tie betting options.',
    image: 'https://img.freepik.com/free-photo/casino-chips-cards-table_1142-51678.jpg'
  },

  // More Popular Slots
  {
    id: 'sugar-rush',
    name: 'Sugar Rush',
    slug: 'sugar-rush',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.5,
    volatility: 'high',
    maxWin: 5000,
    features: ['Cluster Pays', 'Multiplier Spots', 'Free Spins'],
    theme: 'Candy',
    popularity: 93,
    availableAt: ['bet365', 'codere', 'betway', 'strendus'],
    description: 'Cluster pays slot with multiplier positions that increase with consecutive wins.',
    image: 'https://img.freepik.com/free-photo/colorful-candies-background_1142-51789.jpg'
  },
  {
    id: 'wanted-dead-or-a-wild',
    name: 'Wanted Dead or a Wild',
    slug: 'wanted-dead-or-a-wild',
    provider: 'Hacksaw Gaming',
    type: 'slot',
    rtp: 96.38,
    volatility: 'very-high',
    maxWin: 12500,
    features: ['Sticky Wilds', 'Multipliers', 'Three Bonus Games'],
    theme: 'Wild West',
    popularity: 91,
    availableAt: ['bet365', 'betway', 'leo-vegas'],
    description: 'Extreme volatility Western slot with three different free spin modes.',
    image: 'https://img.freepik.com/free-photo/wild-west-background_1142-51890.jpg'
  },
  {
    id: 'mental',
    name: 'Mental',
    slug: 'mental',
    provider: 'Nolimit City',
    type: 'slot',
    rtp: 96.08,
    volatility: 'very-high',
    maxWin: 66666,
    features: ['xWays', 'xSplit', 'Mental Transform'],
    theme: 'Horror',
    popularity: 87,
    availableAt: ['bet365', 'betway', 'rushbet'],
    description: 'Disturbing asylum-themed slot with innovative mechanics and massive win potential.',
    image: 'https://img.freepik.com/free-photo/dark-horror-background_1142-51901.jpg'
  },

  // Round 1: Popular Pragmatic Play Slots
  {
    id: 'the-dog-house',
    name: 'The Dog House',
    slug: 'the-dog-house',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.51,
    volatility: 'high',
    maxWin: 6750,
    reels: 5,
    rows: 3,
    paylines: 20,
    features: ['Sticky Wilds', 'Free Spins', 'Multipliers'],
    theme: 'Animals',
    popularity: 89,
    playCount: 8920,
    availableAt: ['bet365', 'codere', 'caliente', 'betway', 'strendus'],
    description: 'Cute dogs with sticky wild multipliers in free spins up to 3x.',
    image: 'https://img.freepik.com/free-photo/cute-dog-portrait_1142-51234.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vs20doghouse',
    mobileOptimized: true,
    minBet: 20,
    maxBet: 10000,
    releaseDate: '2019-06-27'
  },
  {
    id: 'fruit-party',
    name: 'Fruit Party',
    slug: 'fruit-party',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.47,
    volatility: 'medium',
    maxWin: 5000,
    reels: 7,
    rows: 7,
    features: ['Cluster Pays', 'Tumble', 'Random Multipliers'],
    theme: 'Fruits',
    popularity: 86,
    playCount: 7650,
    availableAt: ['bet365', 'codere', 'betway', 'rushbet'],
    description: 'Cluster pays fruit slot with random multipliers up to 256x.',
    image: 'https://img.freepik.com/free-photo/colorful-fruits-background_1142-51456.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vs20fruitparty',
    mobileOptimized: true,
    minBet: 20,
    maxBet: 10000,
    releaseDate: '2020-05-21'
  },
  {
    id: 'john-hunter-scarab-queen',
    name: 'John Hunter and the Tomb of the Scarab Queen',
    slug: 'john-hunter-scarab-queen',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.5,
    volatility: 'high',
    maxWin: 10500,
    reels: 5,
    rows: 3,
    paylines: 25,
    features: ['Free Spins', 'Expanding Symbols', 'Money Collect'],
    theme: 'Ancient Egypt',
    popularity: 84,
    playCount: 6890,
    availableAt: ['bet365', 'codere', 'caliente', 'strendus'],
    description: 'Adventure slot with expanding symbols and money collect feature.',
    image: 'https://img.freepik.com/free-photo/egyptian-pyramid-desert_1142-51678.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vs25scarabqueen',
    mobileOptimized: true,
    minBet: 25,
    maxBet: 12500,
    releaseDate: '2019-10-17'
  },
  {
    id: 'madame-destiny',
    name: 'Madame Destiny',
    slug: 'madame-destiny',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.49,
    volatility: 'high',
    maxWin: 900,
    reels: 5,
    rows: 3,
    paylines: 10,
    features: ['Free Spins', 'Wild Multipliers', 'Fortune Telling'],
    theme: 'Mystical',
    popularity: 83,
    playCount: 5670,
    availableAt: ['bet365', 'betway', 'codere', 'rushbet'],
    description: 'Fortune teller themed slot with 2x wild multipliers.',
    image: 'https://img.freepik.com/free-photo/crystal-ball-fortune-teller_1142-51890.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vs10madame',
    mobileOptimized: true,
    minBet: 10,
    maxBet: 5000,
    releaseDate: '2017-11-02'
  },
  {
    id: 'great-rhino',
    name: 'Great Rhino',
    slug: 'great-rhino',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.53,
    volatility: 'medium',
    maxWin: 500,
    reels: 5,
    rows: 3,
    paylines: 20,
    features: ['Super Respin', 'Free Spins', 'Wild Multipliers'],
    theme: 'Wildlife',
    popularity: 82,
    playCount: 5430,
    availableAt: ['codere', 'caliente', 'betway', 'strendus'],
    description: 'African safari themed slot with super respin feature.',
    image: 'https://img.freepik.com/free-photo/rhino-wildlife-africa_1142-52345.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vs20rhino',
    mobileOptimized: true,
    minBet: 20,
    maxBet: 10000,
    releaseDate: '2018-04-26'
  },
  {
    id: 'mustang-gold',
    name: 'Mustang Gold',
    slug: 'mustang-gold',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.53,
    volatility: 'medium',
    maxWin: 12000,
    reels: 5,
    rows: 3,
    paylines: 25,
    features: ['Money Collect', 'Free Spins', 'Jackpot'],
    theme: 'Wild West',
    popularity: 85,
    playCount: 6780,
    availableAt: ['bet365', 'codere', 'caliente', 'rushbet', 'strendus'],
    description: 'Wild horses with money collect and jackpot feature.',
    image: 'https://img.freepik.com/free-photo/wild-horses-running_1142-52678.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vs25mustang',
    mobileOptimized: true,
    minBet: 25,
    maxBet: 12500,
    releaseDate: '2019-04-25'
  },
  {
    id: 'chilli-heat',
    name: 'Chilli Heat',
    slug: 'chilli-heat',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.52,
    volatility: 'medium',
    maxWin: 1500,
    reels: 5,
    rows: 3,
    paylines: 25,
    features: ['Money Respin', 'Free Spins', 'Jackpot'],
    theme: 'Mexican',
    popularity: 81,
    playCount: 4890,
    availableAt: ['bet365', 'codere', 'caliente', 'betway'],
    description: 'Spicy Mexican themed slot with money respin feature.',
    image: 'https://img.freepik.com/free-photo/red-chili-peppers_1142-52890.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vs25chilliheat',
    mobileOptimized: true,
    minBet: 25,
    maxBet: 12500,
    releaseDate: '2018-09-06'
  },
  {
    id: 'gems-bonanza',
    name: 'Gems Bonanza',
    slug: 'gems-bonanza',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.51,
    volatility: 'high',
    maxWin: 10000,
    reels: 8,
    rows: 8,
    features: ['Cluster Pays', 'Tumble', 'Gold Fever', 'Spin Features'],
    theme: 'Gems',
    popularity: 87,
    playCount: 7230,
    availableAt: ['bet365', 'codere', 'betway', 'strendus'],
    description: 'Gem mining slot with tumbling reels and multiple features.',
    image: 'https://img.freepik.com/free-photo/colorful-gemstones-diamonds_1142-53123.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vs20goldfever',
    mobileOptimized: true,
    minBet: 20,
    maxBet: 10000,
    releaseDate: '2020-10-29'
  },
  {
    id: 'wild-west-gold',
    name: 'Wild West Gold',
    slug: 'wild-west-gold',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.51,
    volatility: 'high',
    maxWin: 10000,
    reels: 5,
    rows: 4,
    paylines: 40,
    features: ['Sticky Wilds', 'Free Spins', 'Wild Multipliers'],
    theme: 'Wild West',
    popularity: 88,
    playCount: 7890,
    availableAt: ['bet365', 'codere', 'caliente', 'betway', 'rushbet'],
    description: 'Western adventure with sticky wilds and multipliers.',
    image: 'https://img.freepik.com/free-photo/wild-west-town-sunset_1142-53456.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vs40wildwest',
    mobileOptimized: true,
    minBet: 40,
    maxBet: 20000,
    releaseDate: '2020-02-27'
  },
  {
    id: 'power-of-thor-megaways',
    name: 'Power of Thor Megaways',
    slug: 'power-of-thor-megaways',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.55,
    volatility: 'high',
    maxWin: 5000,
    features: ['Megaways', 'Tumble', 'Free Spins', 'Hammer Feature'],
    theme: 'Mythology',
    popularity: 85,
    playCount: 6340,
    availableAt: ['bet365', 'codere', 'betway', 'strendus'],
    description: 'Norse mythology Megaways slot with Thor hammer feature.',
    image: 'https://img.freepik.com/free-photo/thunder-lightning-storm_1142-53789.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vswaysrhino',
    mobileOptimized: true,
    minBet: 20,
    maxBet: 10000,
    releaseDate: '2021-04-15'
  },

  // Round 2: NetEnt Classic Slots
  {
    id: 'starburst',
    name: 'Starburst',
    slug: 'starburst',
    provider: 'NetEnt',
    type: 'slot',
    rtp: 96.09,
    volatility: 'low',
    maxWin: 500,
    reels: 5,
    rows: 3,
    paylines: 10,
    features: ['Expanding Wilds', 'Re-Spins', 'Win Both Ways'],
    theme: 'Space',
    popularity: 97,
    playCount: 25430,
    availableAt: ['bet365', 'codere', 'caliente', 'betway', 'rushbet', 'strendus'],
    description: 'The most popular slot ever - simple gameplay with expanding wilds.',
    image: 'https://img.freepik.com/free-photo/colorful-space-nebula_1142-54123.jpg',
    mobileOptimized: true,
    minBet: 10,
    maxBet: 1000,
    releaseDate: '2012-11-12'
  },
  {
    id: 'gonzos-quest',
    name: "Gonzo's Quest",
    slug: 'gonzos-quest',
    provider: 'NetEnt',
    type: 'slot',
    rtp: 95.97,
    volatility: 'medium',
    maxWin: 2500,
    reels: 5,
    rows: 3,
    paylines: 20,
    features: ['Avalanche', 'Multipliers', 'Free Falls'],
    theme: 'Adventure',
    popularity: 94,
    playCount: 18920,
    availableAt: ['bet365', 'betway', 'leo-vegas', 'william-hill'],
    description: 'Revolutionary avalanche mechanics with increasing multipliers.',
    image: 'https://img.freepik.com/free-photo/ancient-mayan-temple_1142-54234.jpg',
    mobileOptimized: true,
    minBet: 20,
    maxBet: 5000,
    releaseDate: '2010-07-21'
  },
  {
    id: 'dead-or-alive-2',
    name: 'Dead or Alive 2',
    slug: 'dead-or-alive-2',
    provider: 'NetEnt',
    type: 'slot',
    rtp: 96.82,
    volatility: 'very-high',
    maxWin: 111111,
    reels: 5,
    rows: 3,
    paylines: 9,
    features: ['Sticky Wilds', 'Three Bonus Modes', 'Extreme Volatility'],
    theme: 'Wild West',
    popularity: 92,
    playCount: 14560,
    availableAt: ['bet365', 'betway', 'leo-vegas', 'rushbet'],
    description: 'Extreme volatility slot with massive win potential.',
    image: 'https://img.freepik.com/free-photo/wild-west-saloon_1142-54345.jpg',
    mobileOptimized: true,
    minBet: 9,
    maxBet: 900,
    releaseDate: '2019-04-24'
  },
  {
    id: 'twin-spin',
    name: 'Twin Spin',
    slug: 'twin-spin',
    provider: 'NetEnt',
    type: 'slot',
    rtp: 96.56,
    volatility: 'medium',
    maxWin: 1080,
    reels: 5,
    rows: 3,
    paylines: 243,
    features: ['Twin Reels', 'Expanding Reels', '243 Ways'],
    theme: 'Classic',
    popularity: 89,
    playCount: 11230,
    availableAt: ['bet365', 'codere', 'betway', 'william-hill'],
    description: 'Modern take on classic slots with twin reel feature.',
    image: 'https://img.freepik.com/free-photo/neon-lights-casino_1142-54456.jpg',
    mobileOptimized: true,
    minBet: 25,
    maxBet: 12500,
    releaseDate: '2013-11-21'
  },
  {
    id: 'divine-fortune',
    name: 'Divine Fortune',
    slug: 'divine-fortune',
    provider: 'NetEnt',
    type: 'slot',
    category: 'jackpot',
    rtp: 96.59,
    volatility: 'medium',
    maxWin: 600,
    reels: 5,
    rows: 3,
    paylines: 20,
    features: ['Progressive Jackpot', 'Falling Wilds', 'Bonus Game'],
    theme: 'Ancient Greece',
    popularity: 88,
    playCount: 10780,
    availableAt: ['bet365', 'codere', 'caliente', 'betway'],
    description: 'Progressive jackpot slot with Greek mythology theme.',
    image: 'https://img.freepik.com/free-photo/greek-temple-columns_1142-54567.jpg',
    mobileOptimized: true,
    minBet: 20,
    maxBet: 10000,
    releaseDate: '2017-01-24'
  },
  {
    id: 'blood-suckers',
    name: 'Blood Suckers',
    slug: 'blood-suckers',
    provider: 'NetEnt',
    type: 'slot',
    rtp: 98.0,
    volatility: 'low',
    maxWin: 900,
    reels: 5,
    rows: 3,
    paylines: 25,
    features: ['Free Spins', 'Bonus Game', 'High RTP'],
    theme: 'Vampire',
    popularity: 86,
    playCount: 9450,
    availableAt: ['bet365', 'betway', 'leo-vegas'],
    description: 'Vampire themed slot with one of the highest RTPs.',
    image: 'https://img.freepik.com/free-photo/dark-vampire-castle_1142-54678.jpg',
    mobileOptimized: true,
    minBet: 25,
    maxBet: 12500,
    releaseDate: '2009-05-25'
  },
  {
    id: 'vikings',
    name: 'Vikings',
    slug: 'vikings',
    provider: 'NetEnt',
    type: 'slot',
    rtp: 96.05,
    volatility: 'medium',
    maxWin: 10000,
    reels: 5,
    rows: 3,
    paylines: 243,
    features: ['Hotspot', 'Shield Wall', 'Raid Spins'],
    theme: 'Vikings',
    popularity: 85,
    playCount: 8670,
    availableAt: ['bet365', 'codere', 'betway', 'rushbet'],
    description: 'Based on the TV series with multiple bonus features.',
    image: 'https://img.freepik.com/free-photo/viking-ship-sea_1142-54789.jpg',
    mobileOptimized: true,
    minBet: 20,
    maxBet: 10000,
    releaseDate: '2018-11-22'
  },
  {
    id: 'jumanji',
    name: 'Jumanji',
    slug: 'jumanji',
    provider: 'NetEnt',
    type: 'slot',
    rtp: 96.33,
    volatility: 'medium',
    maxWin: 504,
    reels: 5,
    rows: 3,
    paylines: 36,
    features: ['Board Game', 'Random Features', 'Four Bonus Games'],
    theme: 'Adventure',
    popularity: 87,
    playCount: 9890,
    availableAt: ['bet365', 'betway', 'leo-vegas', 'william-hill'],
    description: 'Board game adventure slot with multiple bonus features.',
    image: 'https://img.freepik.com/free-photo/jungle-adventure-scene_1142-54890.jpg',
    mobileOptimized: true,
    minBet: 10,
    maxBet: 2000,
    releaseDate: '2018-06-21'
  },
  {
    id: 'narcos',
    name: 'Narcos',
    slug: 'narcos',
    provider: 'NetEnt',
    type: 'slot',
    rtp: 96.23,
    volatility: 'medium',
    maxWin: 1506,
    reels: 5,
    rows: 3,
    paylines: 243,
    features: ['Walking Wilds', 'Drive-By', 'Locked Up'],
    theme: 'Crime',
    popularity: 84,
    playCount: 7890,
    availableAt: ['bet365', 'codere', 'betway'],
    description: 'Crime themed slot based on the Netflix series.',
    image: 'https://img.freepik.com/free-photo/crime-scene-money_1142-54901.jpg',
    mobileOptimized: true,
    minBet: 20,
    maxBet: 4000,
    releaseDate: '2019-05-23'
  },
  {
    id: 'finn-swirly-spin',
    name: 'Finn and the Swirly Spin',
    slug: 'finn-swirly-spin',
    provider: 'NetEnt',
    type: 'slot',
    rtp: 96.62,
    volatility: 'medium',
    maxWin: 500,
    features: ['Spiral Mechanics', 'Key Collection', 'Random Features'],
    theme: 'Irish',
    popularity: 83,
    playCount: 7230,
    availableAt: ['bet365', 'betway', 'leo-vegas'],
    description: 'Unique spiral reel mechanics with Irish theme.',
    image: 'https://img.freepik.com/free-photo/irish-leprechaun-gold_1142-55012.jpg',
    mobileOptimized: true,
    minBet: 10,
    maxBet: 2000,
    releaseDate: '2017-11-23'
  },

  // Round 3: More Live Casino Games
  {
    id: 'blackjack-party',
    name: 'Blackjack Party',
    slug: 'blackjack-party',
    provider: 'Evolution',
    type: 'live',
    rtp: 99.29,
    volatility: 'low',
    maxWin: 2.5,
    minBet: 5,
    maxBet: 2500,
    features: ['Party Atmosphere', 'Two Dealers', 'Bet Behind'],
    popularity: 83,
    availableAt: ['bet365', 'codere', 'betway', 'rushbet'],
    description: 'Fun party blackjack with two entertaining dealers.',
    image: 'https://img.freepik.com/free-photo/casino-blackjack-table_1142-55123.jpg'
  },
  {
    id: 'speed-baccarat',
    name: 'Speed Baccarat',
    slug: 'speed-baccarat',
    provider: 'Evolution',
    type: 'live',
    rtp: 98.94,
    volatility: 'low',
    maxWin: 8,
    minBet: 20,
    maxBet: 10000,
    features: ['27 Second Rounds', 'Fast Gameplay', 'Multiple Cameras'],
    popularity: 81,
    availableAt: ['bet365', 'betway', 'leo-vegas'],
    description: 'Lightning fast baccarat with 27 second round times.',
    image: 'https://img.freepik.com/free-photo/baccarat-cards-table_1142-55234.jpg'
  },
  {
    id: 'football-studio',
    name: 'Football Studio',
    slug: 'football-studio',
    provider: 'Evolution',
    type: 'live',
    rtp: 96.27,
    volatility: 'low',
    maxWin: 11,
    minBet: 10,
    maxBet: 5000,
    features: ['Football Theme', 'Simple Gameplay', 'Live Commentary'],
    popularity: 79,
    availableAt: ['codere', 'caliente', 'rushbet'],
    description: 'Simple card game with football commentary and atmosphere.',
    image: 'https://img.freepik.com/free-photo/football-stadium-lights_1142-55345.jpg'
  },
  {
    id: 'deal-or-no-deal',
    name: 'Deal or No Deal Live',
    slug: 'deal-or-no-deal',
    provider: 'Evolution',
    type: 'live',
    rtp: 95.42,
    volatility: 'medium',
    maxWin: 500,
    minBet: 10,
    maxBet: 1000,
    features: ['TV Show Format', 'Banker Offers', 'Briefcase Selection'],
    popularity: 85,
    availableAt: ['bet365', 'betway', 'william-hill'],
    description: 'Live version of the famous TV game show.',
    image: 'https://img.freepik.com/free-photo/briefcases-stage_1142-55456.jpg'
  },
  {
    id: 'xxxtreme-lightning-roulette',
    name: 'XXXtreme Lightning Roulette',
    slug: 'xxxtreme-lightning-roulette',
    provider: 'Evolution',
    type: 'live',
    rtp: 97.1,
    volatility: 'high',
    maxWin: 2000,
    minBet: 20,
    maxBet: 10000,
    features: ['Chain Lightning', 'Multipliers up to 2000x', 'Double Strikes'],
    popularity: 90,
    availableAt: ['bet365', 'codere', 'betway', 'caliente'],
    description: 'Extreme version of Lightning Roulette with chain multipliers.',
    image: 'https://img.freepik.com/free-photo/roulette-lightning-effect_1142-55567.jpg'
  },
  {
    id: 'boom-city',
    name: 'Boom City',
    slug: 'boom-city',
    provider: 'Pragmatic Play Live',
    type: 'live',
    rtp: 96.40,
    volatility: 'medium',
    maxWin: 20000,
    minBet: 10,
    maxBet: 2000,
    features: ['Dice Game', 'Bonus Squares', 'Multipliers'],
    popularity: 82,
    availableAt: ['codere', 'strendus', 'rushbet'],
    description: 'Dice-based live game show with bonus rounds.',
    image: 'https://img.freepik.com/free-photo/dice-explosion_1142-55678.jpg'
  },
  {
    id: 'sweet-bonanza-candyland',
    name: 'Sweet Bonanza CandyLand',
    slug: 'sweet-bonanza-candyland',
    provider: 'Pragmatic Play Live',
    type: 'live',
    rtp: 96.52,
    volatility: 'medium',
    maxWin: 20000,
    minBet: 10,
    maxBet: 5000,
    features: ['Candy Theme', 'Bonus Games', 'Sugar Bomb Feature'],
    popularity: 88,
    availableAt: ['bet365', 'codere', 'betway', 'strendus'],
    description: 'Live candy-themed wheel game with slot-style bonuses.',
    image: 'https://img.freepik.com/free-photo/candy-wheel-game_1142-55789.jpg'
  },
  {
    id: 'dragon-tiger',
    name: 'Dragon Tiger',
    slug: 'dragon-tiger',
    provider: 'Evolution',
    type: 'live',
    rtp: 96.72,
    volatility: 'low',
    maxWin: 11,
    minBet: 10,
    maxBet: 5000,
    features: ['Simple Rules', 'Fast Rounds', 'Asian Theme'],
    popularity: 80,
    availableAt: ['caliente', 'rushbet', 'wplay'],
    description: 'Simple Asian card game with dragon vs tiger.',
    image: 'https://img.freepik.com/free-photo/dragon-tiger-cards_1142-55890.jpg'
  },
  {
    id: 'cash-or-crash',
    name: 'Cash or Crash',
    slug: 'cash-or-crash',
    provider: 'Evolution',
    type: 'live',
    rtp: 99.59,
    volatility: 'medium',
    maxWin: 50000,
    minBet: 10,
    maxBet: 1000,
    features: ['Blimp Theme', 'Decision Points', 'High RTP'],
    popularity: 86,
    availableAt: ['bet365', 'betway', 'leo-vegas'],
    description: 'Virtual blimp climbing game with cash out decisions.',
    image: 'https://img.freepik.com/free-photo/airship-sky_1142-55901.jpg'
  },
  {
    id: 'side-bet-city',
    name: 'Side Bet City',
    slug: 'side-bet-city',
    provider: 'Evolution',
    type: 'live',
    rtp: 96.69,
    volatility: 'medium',
    maxWin: 1000,
    minBet: 5,
    maxBet: 2500,
    features: ['Poker Hands', 'Multiple Bets', 'Card Game'],
    popularity: 78,
    availableAt: ['codere', 'betway', 'william-hill'],
    description: 'Poker-based live game with multiple side bet options.',
    image: 'https://img.freepik.com/free-photo/poker-cards-chips_1142-56012.jpg'
  },

  // Round 4: Megaways Slots
  {
    id: 'bonanza-megaways',
    name: 'Bonanza Megaways',
    slug: 'bonanza-megaways',
    provider: 'Big Time Gaming',
    type: 'slot',
    rtp: 96.0,
    volatility: 'high',
    maxWin: 26000,
    features: ['117,649 Ways', 'Cascading Reels', 'Unlimited Multipliers'],
    theme: 'Mining',
    popularity: 93,
    availableAt: ['bet365', 'betway', 'leo-vegas', 'william-hill'],
    description: 'The original Megaways slot with unlimited win multipliers.',
    image: 'https://img.freepik.com/free-photo/gold-mining-cave_1142-56123.jpg'
  },
  {
    id: 'extra-chilli-megaways',
    name: 'Extra Chilli Megaways',
    slug: 'extra-chilli-megaways',
    provider: 'Big Time Gaming',
    type: 'slot',
    rtp: 96.82,
    volatility: 'high',
    maxWin: 20000,
    features: ['117,649 Ways', 'Feature Drop', 'Gamble Feature'],
    theme: 'Mexican',
    popularity: 91,
    availableAt: ['bet365', 'codere', 'caliente', 'betway'],
    description: 'Spicy Mexican market Megaways with feature buy option.',
    image: 'https://img.freepik.com/free-photo/mexican-market-chilis_1142-56234.jpg'
  },
  {
    id: 'white-rabbit-megaways',
    name: 'White Rabbit Megaways',
    slug: 'white-rabbit-megaways',
    provider: 'Big Time Gaming',
    type: 'slot',
    rtp: 97.24,
    volatility: 'high',
    maxWin: 37500,
    features: ['248,832 Ways', 'Extending Reels', 'Feature Drop'],
    theme: 'Fantasy',
    popularity: 89,
    availableAt: ['bet365', 'betway', 'rushbet'],
    description: 'Alice in Wonderland themed with extending reels feature.',
    image: 'https://img.freepik.com/free-photo/white-rabbit-wonderland_1142-56345.jpg'
  },
  {
    id: 'buffalo-king-megaways',
    name: 'Buffalo King Megaways',
    slug: 'buffalo-king-megaways',
    provider: 'Pragmatic Play',
    type: 'slot',
    rtp: 96.52,
    volatility: 'high',
    maxWin: 5000,
    features: ['200,704 Ways', 'Tumble', 'Wild Multipliers'],
    theme: 'Wildlife',
    popularity: 87,
    availableAt: ['bet365', 'codere', 'strendus'],
    description: 'American buffalo themed Megaways with tumbling reels.',
    image: 'https://img.freepik.com/free-photo/buffalo-prairie_1142-56456.jpg',
    embedUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=es&cur=MXN&gameSymbol=vswaysbufking'
  },
  {
    id: 'rainbow-riches-megaways',
    name: 'Rainbow Riches Megaways',
    slug: 'rainbow-riches-megaways',
    provider: 'Barcrest',
    type: 'slot',
    rtp: 95.99,
    volatility: 'medium',
    maxWin: 20000,
    features: ['117,649 Ways', 'Super Gem', 'Free Spins'],
    theme: 'Irish',
    popularity: 86,
    availableAt: ['bet365', 'betway', 'william-hill'],
    description: 'Irish luck Megaways with Super Gem feature.',
    image: 'https://img.freepik.com/free-photo/rainbow-pot-gold_1142-56567.jpg'
  },
  {
    id: 'fishin-frenzy-megaways',
    name: "Fishin' Frenzy Megaways",
    slug: 'fishin-frenzy-megaways',
    provider: 'Blueprint Gaming',
    type: 'slot',
    rtp: 95.02,
    volatility: 'medium',
    maxWin: 10000,
    features: ['15,625 Ways', 'Fishing Feature', 'Free Games'],
    theme: 'Fishing',
    popularity: 85,
    availableAt: ['bet365', 'codere', 'betway'],
    description: 'Popular fishing slot in Megaways format.',
    image: 'https://img.freepik.com/free-photo/fishing-boat-sea_1142-56678.jpg'
  },
  {
    id: 'rise-of-olympus-megaways',
    name: 'Rise of Olympus Megaways',
    slug: 'rise-of-olympus-megaways',
    provider: "Play'n GO",
    type: 'slot',
    rtp: 96.25,
    volatility: 'high',
    maxWin: 5000,
    features: ['15,625 Ways', 'God Powers', 'Grid Slot'],
    theme: 'Mythology',
    popularity: 88,
    availableAt: ['bet365', 'betway', 'leo-vegas'],
    description: 'Greek gods Megaways with special powers.',
    image: 'https://img.freepik.com/free-photo/mount-olympus-gods_1142-56789.jpg'
  },
  {
    id: 'safari-gold-megaways',
    name: 'Safari Gold Megaways',
    slug: 'safari-gold-megaways',
    provider: 'Blueprint Gaming',
    type: 'slot',
    rtp: 96.5,
    volatility: 'high',
    maxWin: 50000,
    features: ['117,649 Ways', 'Mystery Symbols', 'Free Spins'],
    theme: 'Wildlife',
    popularity: 84,
    availableAt: ['codere', 'caliente', 'rushbet'],
    description: 'African safari adventure with mystery symbols.',
    image: 'https://img.freepik.com/free-photo/african-safari-sunset_1142-56890.jpg'
  },
  {
    id: 'diamond-mine-megaways',
    name: 'Diamond Mine Megaways',
    slug: 'diamond-mine-megaways',
    provider: 'Blueprint Gaming',
    type: 'slot',
    rtp: 96.43,
    volatility: 'high',
    maxWin: 10000,
    features: ['117,649 Ways', 'Barrel Blast', 'Mystery Symbols'],
    theme: 'Mining',
    popularity: 83,
    availableAt: ['bet365', 'betway', 'strendus'],
    description: 'Diamond mining adventure with barrel blast feature.',
    image: 'https://img.freepik.com/free-photo/diamond-mine-cave_1142-56901.jpg'
  },
  {
    id: 'temple-tumble-megaways',
    name: 'Temple Tumble Megaways',
    slug: 'temple-tumble-megaways',
    provider: 'Relax Gaming',
    type: 'slot',
    rtp: 96.25,
    volatility: 'high',
    maxWin: 7767,
    features: ['46,656 Ways', 'Block Removal', 'Free Spins'],
    theme: 'Adventure',
    popularity: 82,
    availableAt: ['bet365', 'leo-vegas', 'william-hill'],
    description: 'Temple exploration with block destruction mechanics.',
    image: 'https://img.freepik.com/free-photo/ancient-temple-ruins_1142-57012.jpg'
  },

  // Round 5: Jackpot Slots
  {
    id: 'mega-moolah',
    name: 'Mega Moolah',
    slug: 'mega-moolah',
    provider: 'Microgaming',
    type: 'slot',
    category: 'jackpot',
    rtp: 88.12,
    volatility: 'medium',
    maxWin: 1000000,
    features: ['Progressive Jackpot', 'Wheel Bonus', 'Record Payouts'],
    theme: 'African Safari',
    popularity: 95,
    availableAt: ['bet365', 'betway', 'leo-vegas', 'william-hill'],
    description: 'The millionaire maker - famous for record-breaking jackpots.',
    image: 'https://img.freepik.com/free-photo/african-wildlife-sunset_1142-57123.jpg'
  },
  {
    id: 'mega-fortune',
    name: 'Mega Fortune',
    slug: 'mega-fortune',
    provider: 'NetEnt',
    type: 'slot',
    category: 'jackpot',
    rtp: 96.6,
    volatility: 'low',
    maxWin: 1000000,
    features: ['Three Jackpots', 'Luxury Theme', 'Wheel Bonus'],
    theme: 'Luxury',
    popularity: 92,
    availableAt: ['bet365', 'codere', 'betway', 'leo-vegas'],
    description: 'Luxury lifestyle progressive jackpot slot.',
    image: 'https://img.freepik.com/free-photo/luxury-yacht-champagne_1142-57234.jpg'
  },
  {
    id: 'hall-of-gods',
    name: 'Hall of Gods',
    slug: 'hall-of-gods',
    provider: 'NetEnt',
    type: 'slot',
    category: 'jackpot',
    rtp: 95.5,
    volatility: 'medium',
    maxWin: 500000,
    features: ['Three Jackpots', 'Shield Bonus', 'Expanding Wilds'],
    theme: 'Norse Mythology',
    popularity: 87,
    availableAt: ['bet365', 'betway', 'william-hill'],
    description: 'Norse gods progressive jackpot with shield bonus game.',
    image: 'https://img.freepik.com/free-photo/norse-gods-hall_1142-57345.jpg'
  },
  {
    id: 'arabian-nights',
    name: 'Arabian Nights',
    slug: 'arabian-nights',
    provider: 'NetEnt',
    type: 'slot',
    category: 'jackpot',
    rtp: 95.6,
    volatility: 'medium',
    maxWin: 500000,
    features: ['Progressive Jackpot', 'Free Spins', 'Arabian Theme'],
    theme: 'Arabian',
    popularity: 85,
    availableAt: ['bet365', 'codere', 'leo-vegas'],
    description: 'Classic Arabian themed progressive jackpot slot.',
    image: 'https://img.freepik.com/free-photo/arabian-palace-night_1142-57456.jpg'
  },
  {
    id: 'age-of-the-gods',
    name: 'Age of the Gods',
    slug: 'age-of-the-gods',
    provider: 'Playtech',
    type: 'slot',
    category: 'jackpot',
    rtp: 95.02,
    volatility: 'medium',
    maxWin: 100000,
    features: ['Four Jackpots', 'Free Games', 'God Powers'],
    theme: 'Mythology',
    popularity: 88,
    availableAt: ['bet365', 'william-hill'],
    description: 'Greek mythology with four progressive jackpots.',
    image: 'https://img.freepik.com/free-photo/greek-gods-temple_1142-57567.jpg'
  },
  {
    id: 'joker-millions',
    name: 'Joker Millions',
    slug: 'joker-millions',
    provider: 'Yggdrasil',
    type: 'slot',
    category: 'jackpot',
    rtp: 94.3,
    volatility: 'high',
    maxWin: 1000000,
    features: ['Progressive Jackpot', 'Freeze Feature', 'Column Multipliers'],
    theme: 'Fruits',
    popularity: 84,
    availableAt: ['bet365', 'betway', 'rushbet'],
    description: 'Classic fruit slot with progressive jackpot.',
    image: 'https://img.freepik.com/free-photo/joker-card-fruits_1142-57678.jpg'
  },
  {
    id: 'book-of-atem-wowpot',
    name: 'Book of Atem WowPot',
    slug: 'book-of-atem-wowpot',
    provider: 'Microgaming',
    type: 'slot',
    category: 'jackpot',
    rtp: 93.88,
    volatility: 'high',
    maxWin: 100000,
    features: ['WowPot Jackpot', 'Expanding Symbols', 'Free Spins'],
    theme: 'Ancient Egypt',
    popularity: 86,
    availableAt: ['bet365', 'betway', 'leo-vegas'],
    description: 'Egyptian adventure with WowPot progressive jackpot.',
    image: 'https://img.freepik.com/free-photo/egyptian-book-gold_1142-57789.jpg'
  },
  {
    id: 'major-millions',
    name: 'Major Millions',
    slug: 'major-millions',
    provider: 'Microgaming',
    type: 'slot',
    category: 'jackpot',
    rtp: 89.37,
    volatility: 'medium',
    maxWin: 1000000,
    features: ['Progressive Jackpot', 'Military Theme', 'Wild Multipliers'],
    theme: 'Military',
    popularity: 82,
    availableAt: ['betway', 'leo-vegas', 'william-hill'],
    description: 'Military themed progressive jackpot slot.',
    image: 'https://img.freepik.com/free-photo/military-medals-money_1142-57890.jpg'
  },
  {
    id: 'treasure-nile',
    name: 'Treasure Nile',
    slug: 'treasure-nile',
    provider: 'Microgaming',
    type: 'slot',
    category: 'jackpot',
    rtp: 92.11,
    volatility: 'low',
    maxWin: 100000,
    features: ['Progressive Jackpot', 'Egyptian Theme', 'Simple Gameplay'],
    theme: 'Ancient Egypt',
    popularity: 80,
    availableAt: ['betway', 'leo-vegas'],
    description: 'Classic Egyptian progressive jackpot slot.',
    image: 'https://img.freepik.com/free-photo/nile-river-pyramids_1142-57901.jpg'
  },
  {
    id: 'jackpot-giant',
    name: 'Jackpot Giant',
    slug: 'jackpot-giant',
    provider: 'Playtech',
    type: 'slot',
    category: 'jackpot',
    rtp: 94.22,
    volatility: 'medium',
    maxWin: 500000,
    features: ['Progressive Jackpot', 'Giant Bonus', 'Volcanic Theme'],
    theme: 'Fantasy',
    popularity: 81,
    availableAt: ['bet365', 'william-hill'],
    description: 'Giant themed progressive with volcanic eruptions.',
    image: 'https://img.freepik.com/free-photo/giant-volcano-eruption_1142-58012.jpg'
  },

  // Round 6: Classic/Fruit Slots
  {
    id: 'hot-fruits-100',
    name: 'Hot Fruits 100',
    slug: 'hot-fruits-100',
    provider: 'Amatic',
    type: 'slot',
    rtp: 96.0,
    volatility: 'medium',
    maxWin: 1000,
    reels: 5,
    rows: 4,
    paylines: 100,
    features: ['Classic Symbols', 'Gamble Feature', 'Hot Spins'],
    theme: 'Fruits',
    popularity: 78,
    availableAt: ['codere', 'caliente', 'rushbet'],
    description: 'Classic fruit slot with 100 paylines.',
    image: 'https://img.freepik.com/free-photo/fruit-slot-symbols_1142-58123.jpg'
  },
  {
    id: 'blazing-7s',
    name: 'Blazing 7s',
    slug: 'blazing-7s',
    provider: 'Barcrest',
    type: 'slot',
    rtp: 95.5,
    volatility: 'low',
    maxWin: 500,
    reels: 3,
    rows: 3,
    paylines: 5,
    features: ['Classic Gameplay', 'Bar Symbols', 'Lucky 7s'],
    theme: 'Classic',
    popularity: 76,
    availableAt: ['bet365', 'william-hill'],
    description: 'Traditional 3-reel slot with blazing sevens.',
    image: 'https://img.freepik.com/free-photo/slot-machine-sevens_1142-58234.jpg'
  },
  {
    id: 'super-hot-40',
    name: 'Super Hot 40',
    slug: 'super-hot-40',
    provider: 'EGT',
    type: 'slot',
    rtp: 95.81,
    volatility: 'medium',
    maxWin: 2000,
    reels: 5,
    rows: 4,
    paylines: 40,
    features: ['Expanding Wilds', 'Gamble Feature', 'Jackpot Cards'],
    theme: 'Fruits',
    popularity: 77,
    availableAt: ['codere', 'caliente', 'strendus'],
    description: 'Hot fruit slot with 40 fixed paylines.',
    image: 'https://img.freepik.com/free-photo/hot-fruits-fire_1142-58345.jpg'
  },
  {
    id: 'triple-diamond',
    name: 'Triple Diamond',
    slug: 'triple-diamond',
    provider: 'IGT',
    type: 'slot',
    rtp: 95.06,
    volatility: 'low',
    maxWin: 1199,
    reels: 3,
    rows: 3,
    paylines: 9,
    features: ['Wild Multipliers', 'Classic Style', 'Simple Rules'],
    theme: 'Classic',
    popularity: 75,
    availableAt: ['bet365', 'betway'],
    description: 'Classic 3-reel slot with diamond wild multipliers.',
    image: 'https://img.freepik.com/free-photo/triple-diamonds-slot_1142-58456.jpg'
  },
  {
    id: 'sizzling-hot-deluxe',
    name: 'Sizzling Hot Deluxe',
    slug: 'sizzling-hot-deluxe',
    provider: 'Novomatic',
    type: 'slot',
    rtp: 95.66,
    volatility: 'medium',
    maxWin: 5000,
    reels: 5,
    rows: 3,
    paylines: 5,
    features: ['Scatter Pays', 'Gamble Feature', 'Classic Fruits'],
    theme: 'Fruits',
    popularity: 79,
    availableAt: ['codere', 'caliente', 'rushbet'],
    description: 'Popular fruit slot with scatter star pays.',
    image: 'https://img.freepik.com/free-photo/sizzling-fruits-flames_1142-58567.jpg'
  },
  {
    id: 'lucky-lady-charm',
    name: "Lucky Lady's Charm",
    slug: 'lucky-lady-charm',
    provider: 'Novomatic',
    type: 'slot',
    rtp: 95.13,
    volatility: 'medium',
    maxWin: 9000,
    reels: 5,
    rows: 3,
    paylines: 10,
    features: ['Free Spins', 'Gamble Feature', 'Lucky Symbols'],
    theme: 'Luck',
    popularity: 81,
    availableAt: ['codere', 'caliente', 'strendus'],
    description: 'Lucky charm themed classic slot.',
    image: 'https://img.freepik.com/free-photo/lucky-charms-symbols_1142-58678.jpg'
  },
  {
    id: 'book-of-ra-classic',
    name: 'Book of Ra Classic',
    slug: 'book-of-ra-classic',
    provider: 'Novomatic',
    type: 'slot',
    rtp: 92.13,
    volatility: 'medium',
    maxWin: 5000,
    reels: 5,
    rows: 3,
    paylines: 9,
    features: ['Expanding Symbols', 'Free Games', 'Gamble Feature'],
    theme: 'Ancient Egypt',
    popularity: 90,
    availableAt: ['codere', 'caliente', 'rushbet'],
    description: 'The original Book slot that started it all.',
    image: 'https://img.freepik.com/free-photo/book-ra-egypt_1142-58789.jpg'
  },
  {
    id: 'ultra-hot',
    name: 'Ultra Hot',
    slug: 'ultra-hot',
    provider: 'Novomatic',
    type: 'slot',
    rtp: 95.17,
    volatility: 'low',
    maxWin: 750,
    reels: 3,
    rows: 3,
    paylines: 5,
    features: ['Classic Fruits', 'Simple Gameplay', 'Retro Style'],
    theme: 'Fruits',
    popularity: 74,
    availableAt: ['codere', 'strendus'],
    description: 'Ultra simple 3-reel fruit machine.',
    image: 'https://img.freepik.com/free-photo/ultra-hot-fruits_1142-58890.jpg'
  },
  {
    id: 'magic-fruits',
    name: 'Magic Fruits',
    slug: 'magic-fruits',
    provider: 'Wazdan',
    type: 'slot',
    rtp: 96.52,
    volatility: 'low',
    maxWin: 500,
    reels: 5,
    rows: 3,
    paylines: 5,
    features: ['Classic Style', 'Fruit Symbols', 'Simple Rules'],
    theme: 'Fruits',
    popularity: 73,
    availableAt: ['rushbet', 'wplay'],
    description: 'Simple fruit slot with magic touch.',
    image: 'https://img.freepik.com/free-photo/magic-fruits-sparkles_1142-58901.jpg'
  },
  {
    id: 'flaming-hot',
    name: 'Flaming Hot',
    slug: 'flaming-hot',
    provider: 'EGT',
    type: 'slot',
    rtp: 96.0,
    volatility: 'medium',
    maxWin: 1000,
    reels: 5,
    rows: 3,
    paylines: 40,
    features: ['Scatter Pays', 'Jackpot Cards', 'Classic Fruits'],
    theme: 'Fruits',
    popularity: 77,
    availableAt: ['codere', 'caliente'],
    description: 'Flaming hot fruits with jackpot cards bonus.',
    image: 'https://img.freepik.com/free-photo/flaming-hot-slots_1142-59012.jpg'
  },

  // Round 7: Instant Win & Scratch Cards
  {
    id: 'mines',
    name: 'Mines',
    slug: 'mines',
    provider: 'Spribe',
    type: 'instant',
    rtp: 97.0,
    volatility: 'medium',
    maxWin: 10000,
    features: ['Risk Selection', 'Instant Cash Out', 'Strategy Game'],
    popularity: 88,
    availableAt: ['caliente', 'rushbet', 'wplay'],
    description: 'Minesweeper-style instant win game.',
    image: 'https://img.freepik.com/free-photo/minesweeper-game_1142-59123.jpg'
  },
  {
    id: 'plinko',
    name: 'Plinko',
    slug: 'plinko',
    provider: 'Spribe',
    type: 'instant',
    rtp: 97.0,
    volatility: 'medium',
    maxWin: 1000,
    features: ['Risk Levels', 'Auto Play', 'Ball Drop'],
    popularity: 87,
    availableAt: ['caliente', 'rushbet', 'wplay', 'betsson'],
    description: 'Drop the ball and watch it bounce to wins.',
    image: 'https://img.freepik.com/free-photo/plinko-board-game_1142-59234.jpg'
  },
  {
    id: 'dice',
    name: 'Dice',
    slug: 'dice',
    provider: 'Spribe',
    type: 'instant',
    rtp: 97.0,
    volatility: 'low',
    maxWin: 100,
    features: ['Simple Rules', 'Quick Rounds', 'Adjustable Risk'],
    popularity: 85,
    availableAt: ['rushbet', 'wplay', 'betsson'],
    description: 'Simple dice prediction game.',
    image: 'https://img.freepik.com/free-photo/dice-game-table_1142-59345.jpg'
  },
  {
    id: 'goal',
    name: 'Goal',
    slug: 'goal',
    provider: 'Spribe',
    type: 'instant',
    rtp: 97.0,
    volatility: 'medium',
    maxWin: 200,
    features: ['Penalty Shootout', 'Instant Wins', 'Football Theme'],
    popularity: 83,
    availableAt: ['codere', 'caliente', 'rushbet'],
    description: 'Football penalty shootout instant game.',
    image: 'https://img.freepik.com/free-photo/football-penalty-goal_1142-59456.jpg'
  },
  {
    id: 'lucky-7',
    name: 'Lucky 7',
    slug: 'lucky-7',
    provider: 'NetEnt',
    type: 'instant',
    rtp: 94.0,
    volatility: 'low',
    maxWin: 5000,
    features: ['Scratch Card', 'Instant Win', 'Lucky Numbers'],
    popularity: 76,
    availableAt: ['bet365', 'betway'],
    description: 'Lucky number 7 scratch card game.',
    image: 'https://img.freepik.com/free-photo/lucky-seven-scratch_1142-59567.jpg'
  },
  {
    id: 'cash-buster',
    name: 'Cash Buster',
    slug: 'cash-buster',
    provider: 'Microgaming',
    type: 'instant',
    rtp: 95.0,
    volatility: 'low',
    maxWin: 10000,
    features: ['Scratch Card', 'Multiple Games', 'Instant Prizes'],
    popularity: 75,
    availableAt: ['betway', 'leo-vegas'],
    description: 'Cash busting scratch card with instant prizes.',
    image: 'https://img.freepik.com/free-photo/cash-scratch-card_1142-59678.jpg'
  },
  {
    id: 'keno',
    name: 'Keno',
    slug: 'keno',
    provider: 'Spribe',
    type: 'instant',
    rtp: 97.0,
    volatility: 'medium',
    maxWin: 10000,
    features: ['Number Selection', 'Multiple Draws', 'Quick Pick'],
    popularity: 79,
    availableAt: ['caliente', 'rushbet', 'wplay'],
    description: 'Classic keno number picking game.',
    image: 'https://img.freepik.com/free-photo/keno-lottery-balls_1142-59789.jpg'
  },
  {
    id: 'hi-lo',
    name: 'Hi-Lo',
    slug: 'hi-lo',
    provider: 'Spribe',
    type: 'instant',
    rtp: 97.0,
    volatility: 'low',
    maxWin: 100,
    features: ['Card Prediction', 'Risk Ladder', 'Simple Rules'],
    popularity: 77,
    availableAt: ['rushbet', 'wplay'],
    description: 'Predict if the next card is higher or lower.',
    image: 'https://img.freepik.com/free-photo/hi-lo-cards-game_1142-59890.jpg'
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    slug: 'wheel-of-fortune',
    provider: 'NetEnt',
    type: 'instant',
    rtp: 95.0,
    volatility: 'medium',
    maxWin: 5000,
    features: ['Spin Wheel', 'Instant Prizes', 'Bonus Rounds'],
    popularity: 82,
    availableAt: ['bet365', 'betway', 'leo-vegas'],
    description: 'Spin the wheel for instant prizes.',
    image: 'https://img.freepik.com/free-photo/fortune-wheel-spin_1142-59901.jpg'
  },
  {
    id: 'golden-ticket',
    name: 'Golden Ticket',
    slug: 'golden-ticket',
    provider: 'Microgaming',
    type: 'instant',
    rtp: 94.5,
    volatility: 'low',
    maxWin: 10000,
    features: ['Scratch Card', 'Golden Prizes', 'Multiple Chances'],
    popularity: 74,
    availableAt: ['betway', 'william-hill'],
    description: 'Golden ticket scratch card with multiple win chances.',
    image: 'https://img.freepik.com/free-photo/golden-ticket-scratch_1142-60012.jpg'
  },

  // Round 8: Video Poker & Card Games
  {
    id: 'jacks-or-better',
    name: 'Jacks or Better',
    slug: 'jacks-or-better',
    provider: 'NetEnt',
    type: 'video-poker',
    rtp: 99.54,
    volatility: 'low',
    maxWin: 4000,
    features: ['Classic Poker', 'High RTP', 'Double Feature'],
    popularity: 80,
    availableAt: ['bet365', 'betway', 'leo-vegas'],
    description: 'Classic video poker with jacks or better to win.',
    image: 'https://img.freepik.com/free-photo/video-poker-machine_1142-60123.jpg'
  },
  {
    id: 'deuces-wild',
    name: 'Deuces Wild',
    slug: 'deuces-wild',
    provider: 'Microgaming',
    type: 'video-poker',
    rtp: 99.37,
    volatility: 'low',
    maxWin: 5000,
    features: ['Wild Deuces', 'Multiple Hands', 'High RTP'],
    popularity: 78,
    availableAt: ['betway', 'william-hill'],
    description: 'Video poker where all 2s are wild.',
    image: 'https://img.freepik.com/free-photo/deuces-wild-poker_1142-60234.jpg'
  },
  {
    id: 'caribbean-stud',
    name: 'Caribbean Stud Poker',
    slug: 'caribbean-stud',
    provider: 'NetEnt',
    type: 'card',
    rtp: 97.83,
    volatility: 'medium',
    maxWin: 100,
    features: ['Progressive Jackpot', 'Side Bet', 'Dealer Qualification'],
    popularity: 76,
    availableAt: ['bet365', 'betway'],
    description: 'Caribbean stud poker against the dealer.',
    image: 'https://img.freepik.com/free-photo/caribbean-poker-table_1142-60345.jpg'
  },
  {
    id: 'three-card-poker',
    name: 'Three Card Poker',
    slug: 'three-card-poker',
    provider: 'Evolution',
    type: 'card',
    rtp: 96.63,
    volatility: 'low',
    maxWin: 100,
    features: ['Ante Bonus', 'Pair Plus', 'Simple Rules'],
    popularity: 77,
    availableAt: ['bet365', 'codere', 'betway'],
    description: 'Fast-paced poker with just three cards.',
    image: 'https://img.freepik.com/free-photo/three-card-poker_1142-60456.jpg'
  },
  {
    id: 'casino-holdem',
    name: 'Casino Hold\'em',
    slug: 'casino-holdem',
    provider: 'NetEnt',
    type: 'card',
    rtp: 97.84,
    volatility: 'low',
    maxWin: 100,
    features: ['Texas Hold\'em', 'AA Bonus', 'Community Cards'],
    popularity: 79,
    availableAt: ['bet365', 'betway', 'leo-vegas'],
    description: 'Texas Hold\'em against the casino.',
    image: 'https://img.freepik.com/free-photo/casino-holdem-table_1142-60567.jpg'
  },
  {
    id: 'all-american-poker',
    name: 'All American Poker',
    slug: 'all-american-poker',
    provider: 'NetEnt',
    type: 'video-poker',
    rtp: 99.38,
    volatility: 'low',
    maxWin: 4000,
    features: ['Enhanced Payouts', 'American Style', 'Double Feature'],
    popularity: 75,
    availableAt: ['bet365', 'betway'],
    description: 'American style video poker with enhanced payouts.',
    image: 'https://img.freepik.com/free-photo/american-poker-cards_1142-60678.jpg'
  },
  {
    id: 'pai-gow-poker',
    name: 'Pai Gow Poker',
    slug: 'pai-gow-poker',
    provider: 'Microgaming',
    type: 'card',
    rtp: 97.27,
    volatility: 'low',
    maxWin: 50,
    features: ['Two Hands', 'Joker Wild', 'Asian Poker'],
    popularity: 74,
    availableAt: ['betway', 'william-hill'],
    description: 'Asian poker variant with two hands.',
    image: 'https://img.freepik.com/free-photo/pai-gow-poker-table_1142-60789.jpg'
  },
  {
    id: 'red-dog',
    name: 'Red Dog',
    slug: 'red-dog',
    provider: 'NetEnt',
    type: 'card',
    rtp: 97.0,
    volatility: 'low',
    maxWin: 11,
    features: ['Simple Rules', 'Spread Betting', 'Quick Rounds'],
    popularity: 72,
    availableAt: ['bet365', 'leo-vegas'],
    description: 'Simple card game with spread betting.',
    image: 'https://img.freepik.com/free-photo/red-dog-cards_1142-60890.jpg'
  },
  {
    id: 'joker-poker',
    name: 'Joker Poker',
    slug: 'joker-poker',
    provider: 'Microgaming',
    type: 'video-poker',
    rtp: 98.47,
    volatility: 'low',
    maxWin: 5000,
    features: ['Joker Wild', 'Kings or Better', 'Double Feature'],
    popularity: 76,
    availableAt: ['betway', 'leo-vegas'],
    description: 'Video poker with joker as wild card.',
    image: 'https://img.freepik.com/free-photo/joker-poker-cards_1142-60901.jpg'
  },
  {
    id: 'aces-and-faces',
    name: 'Aces and Faces',
    slug: 'aces-and-faces',
    provider: 'Playtech',
    type: 'video-poker',
    rtp: 99.26,
    volatility: 'low',
    maxWin: 4000,
    features: ['Enhanced Aces', 'Face Card Bonus', 'Multiple Hands'],
    popularity: 73,
    availableAt: ['bet365', 'william-hill'],
    description: 'Video poker with bonus payouts for aces and face cards.',
    image: 'https://img.freepik.com/free-photo/aces-faces-poker_1142-61012.jpg'
  }
];

// File system operations removed - using static data only for Vercel deployment

// CRUD Operations
export async function getAllGames(): Promise<Game[]> {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching games from Supabase:', error.message || error);
      console.error('Falling back to static data');
      return games; // Fallback to static data
    }
    
    // Create a map of Supabase games by ID for quick lookup
    const supabaseGamesMap = new Map();
    if (data && data.length > 0) {
      data.forEach(game => {
        supabaseGamesMap.set(game.id, game);
      });
    }
    
    // Merge static games with Supabase data, preferring Supabase data
    const mergedGames = games.map(staticGame => {
      const supabaseGame = supabaseGamesMap.get(staticGame.id);
      
      if (supabaseGame) {
        // Merge Supabase data with static data, preferring Supabase
        return {
          ...staticGame,
          id: supabaseGame.id,
          name: supabaseGame.name || staticGame.name,
          slug: supabaseGame.slug || staticGame.slug,
          provider: supabaseGame.provider || staticGame.provider,
          type: supabaseGame.type || staticGame.type,
          category: supabaseGame.category || staticGame.category,
          rtp: supabaseGame.rtp ?? staticGame.rtp,
          volatility: supabaseGame.volatility || staticGame.volatility,
          maxWin: supabaseGame.max_win ?? staticGame.maxWin,
          minBet: supabaseGame.min_bet ?? staticGame.minBet,
          maxBet: supabaseGame.max_bet ?? staticGame.maxBet,
          popularity: staticGame.popularity || 50, // Keep static popularity
          image: supabaseGame.image || staticGame.image, // Prefer Supabase image
          demoUrl: supabaseGame.demo_url || staticGame.demoUrl,
          embedUrl: supabaseGame.embed_url || staticGame.embedUrl,
          mobileOptimized: supabaseGame.mobile_optimized ?? staticGame.mobileOptimized,
          availableAt: staticGame.availableAt, // Keep static data for now
          description: supabaseGame.description || staticGame.description,
          isNew: supabaseGame.is_new ?? staticGame.isNew,
          isFeatured: supabaseGame.is_featured ?? staticGame.isFeatured,
          isHot: supabaseGame.is_hot ?? staticGame.isHot,
          features: supabaseGame.features || staticGame.features || [],
          theme: supabaseGame.theme || staticGame.theme,
          releaseDate: supabaseGame.release_date || staticGame.releaseDate,
          paylines: supabaseGame.paylines ?? staticGame.paylines,
          reels: supabaseGame.reels ?? staticGame.reels,
          rows: supabaseGame.rows ?? staticGame.rows,
          screenshots: supabaseGame.screenshots || staticGame.screenshots,
          instructions: supabaseGame.instructions || staticGame.instructions,
          paytable: supabaseGame.paytable || staticGame.paytable,
          playCount: supabaseGame.play_count ?? staticGame.playCount,
          fullscreenMode: supabaseGame.fullscreen_mode ?? staticGame.fullscreenMode
        };
      }
      
      return staticGame;
    });
    
    // Add any Supabase games that don't exist in static data
    data?.forEach(supabaseGame => {
      if (!games.find(g => g.id === supabaseGame.id)) {
        mergedGames.push({
          id: supabaseGame.id,
          name: supabaseGame.name,
          slug: supabaseGame.slug,
          provider: supabaseGame.provider,
          type: supabaseGame.type,
          category: supabaseGame.category,
          rtp: supabaseGame.rtp,
          volatility: supabaseGame.volatility,
          maxWin: supabaseGame.max_win,
          minBet: supabaseGame.min_bet,
          maxBet: supabaseGame.max_bet,
          popularity: 50,
          image: supabaseGame.image || '/images/games/default.jpg',
          demoUrl: supabaseGame.demo_url,
          embedUrl: supabaseGame.embed_url,
          mobileOptimized: supabaseGame.mobile_optimized,
          availableAt: [],
          isNew: supabaseGame.is_new,
          isFeatured: supabaseGame.is_featured,
          isHot: supabaseGame.is_hot,
          features: supabaseGame.features || [],
          description: supabaseGame.description,
          theme: supabaseGame.theme,
          releaseDate: supabaseGame.release_date,
          paylines: supabaseGame.paylines,
          reels: supabaseGame.reels,
          rows: supabaseGame.rows,
          screenshots: supabaseGame.screenshots,
          instructions: supabaseGame.instructions,
          paytable: supabaseGame.paytable,
          playCount: supabaseGame.play_count,
          fullscreenMode: supabaseGame.fullscreen_mode
        });
      }
    });

    return mergedGames;
  } catch (error) {
    console.error('Error in getAllGames:', error);
    return games; // Fallback to static data
  }
}

export function getAllGamesSync(): Game[] {
  return games;
}

export async function getGameById(id: string): Promise<Game | undefined> {
  const allGames = await getAllGames();
  return allGames.find(game => game.id === id);
}

export async function createGame(gameData: Omit<Game, 'id'>): Promise<Game> {
  const allGames = await getAllGames();
  
  const newGame: Game = {
    ...gameData,
    id: `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
  
  games.push(newGame);
  // TODO: Save to Supabase
  
  return newGame;
}

export async function updateGame(id: string, updates: Partial<Game>): Promise<Game | null> {
  const allGames = await getAllGames();
  const gameIndex = allGames.findIndex(game => game.id === id);
  
  if (gameIndex === -1) {
    return null;
  }
  
  // Update in memory
  allGames[gameIndex] = {
    ...allGames[gameIndex],
    ...updates,
    id // Ensure ID doesn't change
  };
  
  // Update in Supabase
  try {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('games')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating game in Supabase:', error);
      // Still return the updated game from memory
    } else if (data) {
      console.log('Game updated in Supabase:', data);
    }
  } catch (error) {
    console.error('Error updating game in Supabase:', error);
  }
  
  return allGames[gameIndex];
}

export async function deleteGame(id: string): Promise<boolean> {
  const allGames = await getAllGames();
  const filteredGames = allGames.filter(game => game.id !== id);
  
  if (filteredGames.length === allGames.length) {
    return false; // Game not found
  }
  
  // TODO: Save to Supabase
  // For now, remove from static array
  const index = games.findIndex(g => g.id === id);
  if (index > -1) {
    games.splice(index, 1);
  }
  return true;
}

export async function bulkImportGames(newGames: Game[]): Promise<number> {
  const allGames = await getAllGames();
  
  // Add new games, avoiding duplicates by ID
  const existingIds = new Set(allGames.map(g => g.id));
  const gamesToAdd = newGames.filter(g => !existingIds.has(g.id));
  
  // Add to static array
  games.push(...gamesToAdd);
  // TODO: Save to Supabase
  
  return gamesToAdd.length;
}

// Helper functions
function getGamesSync(): Game[] {
  // Always return static games array
  // File system operations removed for Vercel deployment
  return games;
}

export function getGamesByType(type: Game['type']): Game[] {
  const allGames = getGamesSync();
  return allGames.filter(game => game.type === type);
}

export function getGamesByProvider(provider: string): Game[] {
  const allGames = getGamesSync();
  return allGames.filter(game => game.provider === provider);
}

export function getGamesByCasino(casinoId: string): Game[] {
  const allGames = getGamesSync();
  return allGames.filter(game => game.availableAt.includes(casinoId));
}

export function getPopularGames(limit: number = 10): Game[] {
  const allGames = getGamesSync();
  return [...allGames]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function searchGames(query: string): Game[] {
  const allGames = getGamesSync();
  const lowercaseQuery = query.toLowerCase();
  return allGames.filter(game => 
    game.name.toLowerCase().includes(lowercaseQuery) ||
    game.provider.toLowerCase().includes(lowercaseQuery) ||
    game.theme?.toLowerCase().includes(lowercaseQuery) ||
    game.features?.some(f => f.toLowerCase().includes(lowercaseQuery))
  );
}

export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  const allGames = await getAllGames();
  return allGames.find(game => game.slug === slug);
}

// Fetch detailed game data from game_details table
export async function getGameDetailsBySlug(slug: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('game_details')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      // Don't log error if table doesn't exist or no rows found - it's expected
      if (error.code !== 'PGRST116' && error.code !== '42P01') {
        console.error('Error fetching game details:', error);
      }
      return null;
    }

    return data;
  } catch (error) {
    // Silently return null for expected errors
    return null;
  }
}

// Synchronous version for client-side usage only
export function getGameBySlugSync(slug: string): Game | undefined {
  return games.find(game => game.slug === slug);
}

export function getUniqueProviders(): string[] {
  const allGames = getGamesSync();
  return [...new Set(allGames.map(game => game.provider))].sort();
}

export function getGameTypes(): Array<{ value: Game['type']; label: string; count: number }> {
  const allGames = getGamesSync();
  return [
    { value: 'slot', label: 'Tragamonedas', count: allGames.filter(g => g.type === 'slot').length },
    { value: 'live', label: 'Casino en Vivo', count: allGames.filter(g => g.type === 'live').length },
    { value: 'table', label: 'Juegos de Mesa', count: allGames.filter(g => g.type === 'table').length },
    { value: 'crash', label: 'Crash Games', count: allGames.filter(g => g.type === 'crash').length },
    { value: 'instant', label: 'Instantáneos', count: allGames.filter(g => g.type === 'instant').length }
  ];
}