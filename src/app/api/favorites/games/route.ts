import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// GET /api/favorites/games - Get user's favorite games
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('user_favorite_games')
      .select('game_id, created_at')
      .eq('user_id', session.user.email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorite games:', error);
      return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
    }

    return NextResponse.json({ favorites: data || [] });
  } catch (error) {
    console.error('Error in GET /api/favorites/games:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/favorites/games - Add a game to favorites
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId } = await request.json();
    
    if (!gameId) {
      return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
    }

    // Add to favorites
    const { data, error } = await supabase
      .from('user_favorite_games')
      .insert({
        user_id: session.user.email,
        game_id: gameId
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        return NextResponse.json({ error: 'Already in favorites' }, { status: 409 });
      }
      console.error('Error adding to favorites:', error);
      return NextResponse.json({ error: 'Failed to add to favorites' }, { status: 500 });
    }

    // Log activity
    await supabase
      .from('user_activity')
      .insert({
        user_id: session.user.email,
        activity_type: 'add_favorite',
        entity_type: 'game',
        entity_id: gameId,
        metadata: { game_id: gameId }
      });

    return NextResponse.json({ 
      message: 'Added to favorites',
      favorite: data 
    });
  } catch (error) {
    console.error('Error in POST /api/favorites/games:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/favorites/games - Remove a game from favorites
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    
    if (!gameId) {
      return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
    }

    // Remove from favorites
    const { error } = await supabase
      .from('user_favorite_games')
      .delete()
      .eq('user_id', session.user.email)
      .eq('game_id', gameId);

    if (error) {
      console.error('Error removing from favorites:', error);
      return NextResponse.json({ error: 'Failed to remove from favorites' }, { status: 500 });
    }

    // Log activity
    await supabase
      .from('user_activity')
      .insert({
        user_id: session.user.email,
        activity_type: 'remove_favorite',
        entity_type: 'game',
        entity_id: gameId,
        metadata: { game_id: gameId }
      });

    return NextResponse.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Error in DELETE /api/favorites/games:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}