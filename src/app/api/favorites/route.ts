import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/favorites - Get user's favorites
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user ID from Supabase auth
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      // If no auth user, try to get by email
      const { data: userData, error: userError } = await supabase
        .from('auth.users')
        .select('id')
        .eq('email', session.user.email)
        .single();
      
      if (userError || !userData) {
        return NextResponse.json({ favorites: [] });
      }
    }

    const userId = authData?.user?.id;

    // Get user's favorites from Supabase
    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error);
      return NextResponse.json({ favorites: [] });
    }

    return NextResponse.json({ favorites: favorites || [] });
  } catch (error) {
    console.error('Error in GET /api/favorites:', error);
    return NextResponse.json(
      { error: 'Internal server error', favorites: [] },
      { status: 500 }
    );
  }
}

// POST /api/favorites - Add to favorites
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

    // Get user ID from Supabase auth
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userId = authData.user.id;
    const entityType = casinoId ? 'casino' : 'game';

    // Check if already favorited
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
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
        user_id: userId,
        casino_id: casinoId || null,
        game_id: gameId || null,
        entity_type: entityType
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding to favorites:', error);
      return NextResponse.json(
        { error: 'Failed to add to favorites' },
        { status: 500 }
      );
    }

    return NextResponse.json({ favorite }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/favorites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/favorites - Remove from favorites
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

    // Get user ID from Supabase auth
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userId = authData.user.id;

    // Delete favorite
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
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
    console.error('Error in DELETE /api/favorites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}