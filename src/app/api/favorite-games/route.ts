import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET - получить избранные игры пользователя
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // Получаем избранные игры
    const { data: favoriteGames, error } = await supabase
      .from('favorite_games')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch favorite games' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      favoriteGames: favoriteGames || [],
      count: favoriteGames?.length || 0
    });
  } catch (error) {
    console.error('Error in GET /api/favorite-games:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - добавить игру в избранное
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { gameId } = await request.json();
    
    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    const userEmail = session.user.email;

    // Проверяем, не добавлена ли игра уже
    const { data: existing } = await supabase
      .from('favorite_games')
      .select('id')
      .eq('user_email', userEmail)
      .eq('game_id', gameId)
      .single();

    if (existing) {
      return NextResponse.json(
        { message: 'Game already in favorites' },
        { status: 200 }
      );
    }

    // Добавляем в избранное
    const { data, error } = await supabase
      .from('favorite_games')
      .insert({
        user_email: userEmail,
        game_id: gameId
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to add to favorites' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Game added to favorites',
      favorite: data
    });
  } catch (error) {
    console.error('Error in POST /api/favorite-games:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - удалить игру из избранного
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    
    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    const userEmail = session.user.email;

    // Удаляем из избранного
    const { error } = await supabase
      .from('favorite_games')
      .delete()
      .eq('user_email', userEmail)
      .eq('game_id', gameId);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to remove from favorites' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Game removed from favorites'
    });
  } catch (error) {
    console.error('Error in DELETE /api/favorite-games:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}