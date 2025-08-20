import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET single game
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Game not found' }, { status: 404 });
      }
      throw error;
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching game:', error);
    return NextResponse.json({ error: 'Failed to fetch game' }, { status: 500 });
  }
}

// PATCH - Update game (including image)
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const updates = await request.json();
    
    console.log('Updating game:', id, updates);
    
    // Update game in database
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
      console.error('Supabase error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Game not found' }, { status: 404 });
      }
      throw error;
    }
    
    console.log('Game updated successfully:', data);
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error updating game:', error);
    return NextResponse.json({ error: 'Failed to update game' }, { status: 500 });
  }
}

// PUT - Full update
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const gameData = await request.json();
    
    const { data, error } = await supabase
      .from('games')
      .update({
        ...gameData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Game not found' }, { status: 404 });
      }
      throw error;
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating game:', error);
    return NextResponse.json({ error: 'Failed to update game' }, { status: 500 });
  }
}

// DELETE game
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    
    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Game not found' }, { status: 404 });
      }
      throw error;
    }
    
    return NextResponse.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    return NextResponse.json({ error: 'Failed to delete game' }, { status: 500 });
  }
}