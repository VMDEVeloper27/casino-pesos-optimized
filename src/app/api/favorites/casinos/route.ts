import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// GET /api/favorites/casinos - Get user's favorite casinos
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('user_favorite_casinos')
      .select('casino_id, created_at')
      .eq('user_id', session.user.email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorite casinos:', error);
      return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
    }

    return NextResponse.json({ favorites: data || [] });
  } catch (error) {
    console.error('Error in GET /api/favorites/casinos:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/favorites/casinos - Add a casino to favorites
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { casinoId } = await request.json();
    
    if (!casinoId) {
      return NextResponse.json({ error: 'Casino ID is required' }, { status: 400 });
    }

    // Add to favorites
    const { data, error } = await supabase
      .from('user_favorite_casinos')
      .insert({
        user_id: session.user.email,
        casino_id: casinoId
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
        entity_type: 'casino',
        entity_id: casinoId,
        metadata: { casino_id: casinoId }
      });

    return NextResponse.json({ 
      message: 'Added to favorites',
      favorite: data 
    });
  } catch (error) {
    console.error('Error in POST /api/favorites/casinos:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/favorites/casinos - Remove a casino from favorites
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const casinoId = searchParams.get('casinoId');
    
    if (!casinoId) {
      return NextResponse.json({ error: 'Casino ID is required' }, { status: 400 });
    }

    // Remove from favorites
    const { error } = await supabase
      .from('user_favorite_casinos')
      .delete()
      .eq('user_id', session.user.email)
      .eq('casino_id', casinoId);

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
        entity_type: 'casino',
        entity_id: casinoId,
        metadata: { casino_id: casinoId }
      });

    return NextResponse.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Error in DELETE /api/favorites/casinos:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}