import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/favorites-email - Get user's favorites
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Use email directly as user identifier
    const userEmail = session.user.email;
    
    // Get favorites using email
    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error);
      return NextResponse.json({ favorites: [] });
    }

    return NextResponse.json({ favorites: favorites || [] });
  } catch (error) {
    console.error('Error in GET /api/favorites-email:', error);
    return NextResponse.json({ favorites: [] });
  }
}

// POST /api/favorites-email - Add to favorites
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { casinoId, gameId } = body;

    if (!casinoId && !gameId) {
      return NextResponse.json(
        { error: 'Either casinoId or gameId is required' },
        { status: 400 }
      );
    }

    const userEmail = session.user.email;
    const entityType = casinoId ? 'casino' : 'game';

    // Check if already favorited
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_email', userEmail)
      .eq(casinoId ? 'casino_id' : 'game_id', casinoId || gameId)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Already in favorites' },
        { status: 409 }
      );
    }

    // Create favorite
    const { data: favorite, error } = await supabase
      .from('favorites')
      .insert({
        user_email: userEmail,
        casino_id: casinoId || null,
        game_id: gameId || null,
        entity_type: entityType
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding to favorites:', error);
      return NextResponse.json(
        { error: 'Failed to add to favorites', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ favorite }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/favorites-email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/favorites-email - Remove from favorites
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const casinoId = searchParams.get('casinoId');
    const gameId = searchParams.get('gameId');

    if (!casinoId && !gameId) {
      return NextResponse.json(
        { error: 'Either casinoId or gameId is required' },
        { status: 400 }
      );
    }

    const userEmail = session.user.email;

    // Delete favorite
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_email', userEmail)
      .eq(casinoId ? 'casino_id' : 'game_id', casinoId || gameId);

    if (error) {
      console.error('Error removing from favorites:', error);
      return NextResponse.json(
        { error: 'Failed to remove from favorites' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/favorites-email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}