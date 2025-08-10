import { NextRequest, NextResponse } from 'next/server';
import { getAllCasinos, updateCasino, addCasino } from '@/lib/casino-database';


// Get all casinos
export async function GET() {
  try {
    // Get all casinos from the unified database
    const casinos = await getAllCasinos();
    
    return NextResponse.json(casinos);
  } catch (error) {
    console.error('Error reading casinos:', error);
    return NextResponse.json({ error: 'Failed to fetch casinos' }, { status: 500 });
  }
}

// Create new casino
export async function POST(request: NextRequest) {
  try {
    const newCasino = await request.json();
    
    // Check if casino with same ID already exists
    const existing = await getAllCasinos();
    if (existing.find((c: any) => c.id === newCasino.id)) {
      return NextResponse.json(
        { error: 'Casino with this ID already exists' },
        { status: 400 }
      );
    }
    
    // Add new casino using the unified database
    const casino = await addCasino(newCasino);
    
    return NextResponse.json(casino, { status: 201 });
  } catch (error) {
    console.error('Error creating casino:', error);
    return NextResponse.json({ error: 'Failed to create casino' }, { status: 500 });
  }
}