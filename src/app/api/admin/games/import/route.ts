import { NextRequest, NextResponse } from 'next/server';
import { bulkImportGames, type Game } from '@/lib/game-database';
import { z } from 'zod';

const gameImportSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  provider: z.string(),
  type: z.enum(['slot', 'live', 'table', 'crash', 'instant', 'video-poker', 'card', 'jackpot']),
  category: z.enum(['new', 'hot', 'classic', 'tournament', 'game-show', 'jackpot', 'megaways', 'bonus-buy']).optional(),
  rtp: z.number().optional(),
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
  popularity: z.number(),
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

const bulkImportSchema = z.array(gameImportSchema);

// POST /api/admin/games/import - Bulk import games
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedGames = bulkImportSchema.parse(body);
    
    // Import games
    const importedCount = await bulkImportGames(validatedGames as Game[]);
    
    return NextResponse.json({
      message: `Successfully imported ${importedCount} games`,
      count: importedCount
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid input', 
          details: error.issues,
          message: 'Please check the format of your import data'
        },
        { status: 400 }
      );
    }
    
    console.error('Error importing games:', error);
    return NextResponse.json(
      { error: 'Failed to import games' },
      { status: 500 }
    );
  }
}