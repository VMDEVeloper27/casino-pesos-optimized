import { NextRequest, NextResponse } from 'next/server';
import { getAllGames, createGame, type Game } from '@/lib/game-database';
import { z } from 'zod';

const gameSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  provider: z.string().min(1),
  type: z.enum(['slot', 'live', 'table', 'crash', 'instant', 'video-poker', 'card', 'jackpot']),
  category: z.enum(['new', 'hot', 'classic', 'tournament', 'game-show', 'jackpot', 'megaways', 'bonus-buy']).optional(),
  rtp: z.number().min(0).max(100).optional(),
  volatility: z.enum(['low', 'medium', 'high', 'very-high']).optional(),
  maxWin: z.number().optional(),
  minBet: z.number().optional(),
  maxBet: z.number().optional(),
  paylines: z.number().optional(),
  reels: z.number().optional(),
  rows: z.number().optional(),
  features: z.array(z.string()).optional(),
  theme: z.string().optional(),
  releaseDate: z.string().optional(),
  popularity: z.number().min(0).max(100),
  playCount: z.number().optional(),
  image: z.string(),
  screenshots: z.array(z.string()).optional(),
  demoUrl: z.string().optional(),
  embedUrl: z.string().optional(),
  fullscreenMode: z.boolean().optional(),
  mobileOptimized: z.boolean().optional(),
  availableAt: z.array(z.string()),
  description: z.string().optional(),
  instructions: z.string().optional(),
  paytable: z.string().optional(),
  isNew: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isHot: z.boolean().optional(),
});

// GET /api/admin/games - List all games with optional filtering
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type');
    const provider = searchParams.get('provider');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    
    let games = await getAllGames();
    
    // Apply filters
    if (type) {
      games = games.filter(game => game.type === type);
    }
    
    if (provider) {
      games = games.filter(game => game.provider === provider);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      games = games.filter(game => 
        game.name.toLowerCase().includes(searchLower) ||
        game.provider.toLowerCase().includes(searchLower) ||
        game.theme?.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by popularity by default
    games = games.sort((a, b) => b.popularity - a.popularity);
    
    // Apply limit if specified
    if (limit) {
      games = games.slice(0, parseInt(limit));
    }
    
    return NextResponse.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}

// POST /api/admin/games - Create a new game
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = gameSchema.parse(body);
    
    // Create new game
    const newGame = await createGame(validatedData);
    
    return NextResponse.json(newGame, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Error creating game:', error);
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    );
  }
}