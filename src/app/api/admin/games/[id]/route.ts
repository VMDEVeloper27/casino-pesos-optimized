import { NextRequest, NextResponse } from 'next/server';
import { getGameById, updateGame, deleteGame } from '@/lib/game-database';
import { z } from 'zod';

const updateGameSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  provider: z.string().min(1).optional(),
  type: z.enum(['slot', 'live', 'table', 'crash', 'instant', 'video-poker', 'card', 'jackpot']).optional(),
  category: z.enum(['new', 'hot', 'classic', 'tournament', 'game-show', 'jackpot', 'megaways', 'bonus-buy']).optional().nullable(),
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
  popularity: z.number().min(0).max(100).optional(),
  playCount: z.number().optional(),
  image: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
  demoUrl: z.string().optional(),
  embedUrl: z.string().optional(),
  fullscreenMode: z.boolean().optional(),
  mobileOptimized: z.boolean().optional(),
  availableAt: z.array(z.string()).optional(),
  description: z.string().optional(),
  instructions: z.string().optional(),
  paytable: z.string().optional(),
  isNew: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isHot: z.boolean().optional(),
});

// GET /api/admin/games/[id] - Get a single game (by id or slug)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // First try to get by ID
    let game = await getGameById(id);
    
    // If not found by ID, try to find by slug
    if (!game) {
      const { getAllGames } = await import('@/lib/game-database');
      const allGames = await getAllGames();
      game = allGames.find(g => g.slug === id || g.id === id);
    }
    
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/games/[id] - Update a game (by id or slug)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    
    // Find game by id or slug to get the actual ID
    let game = await getGameById(id);
    if (!game) {
      const { getAllGames } = await import('@/lib/game-database');
      const allGames = await getAllGames();
      game = allGames.find(g => g.slug === id || g.id === id);
    }
    
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }
    
    // Validate input
    const validatedData = updateGameSchema.parse(body);
    
    // Update game using the actual ID
    const updatedGame = await updateGame(game.id, validatedData);
    
    if (!updatedGame) {
      return NextResponse.json(
        { error: 'Failed to update game' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(updatedGame);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Error updating game:', error);
    return NextResponse.json(
      { error: 'Failed to update game' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/games/[id] - Delete a game (by id or slug)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Find game by id or slug to get the actual ID
    let game = await getGameById(id);
    if (!game) {
      const { getAllGames } = await import('@/lib/game-database');
      const allGames = await getAllGames();
      game = allGames.find(g => g.slug === id || g.id === id);
    }
    
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }
    
    const deleted = await deleteGame(game.id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete game' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    return NextResponse.json(
      { error: 'Failed to delete game' },
      { status: 500 }
    );
  }
}