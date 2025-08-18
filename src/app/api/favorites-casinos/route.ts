import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET - получить избранные казино пользователя
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

    // Получаем избранные казино
    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch favorites' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      favorites: favorites || [],
      count: favorites?.length || 0
    });
  } catch (error) {
    console.error('Error in GET /api/favorites-casinos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - добавить казино в избранное
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { casinoId } = await request.json();
    
    if (!casinoId) {
      return NextResponse.json(
        { error: 'Casino ID is required' },
        { status: 400 }
      );
    }

    const userEmail = session.user.email;

    // Проверяем, не добавлено ли казино уже
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_email', userEmail)
      .eq('casino_id', casinoId)
      .single();

    if (existing) {
      return NextResponse.json(
        { message: 'Casino already in favorites' },
        { status: 200 }
      );
    }

    // Добавляем в избранное
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_email: userEmail,
        casino_id: casinoId
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
      message: 'Casino added to favorites',
      favorite: data
    });
  } catch (error) {
    console.error('Error in POST /api/favorites-casinos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - удалить казино из избранного
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
    const casinoId = searchParams.get('casinoId');
    
    if (!casinoId) {
      return NextResponse.json(
        { error: 'Casino ID is required' },
        { status: 400 }
      );
    }

    const userEmail = session.user.email;

    // Удаляем из избранного
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_email', userEmail)
      .eq('casino_id', casinoId);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to remove from favorites' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Casino removed from favorites'
    });
  } catch (error) {
    console.error('Error in DELETE /api/favorites-casinos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}