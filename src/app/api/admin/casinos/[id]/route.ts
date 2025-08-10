import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CASINOS_FILE = path.join(process.cwd(), 'data', 'casinos.json');

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// Get single casino
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const data = await fs.readFile(CASINOS_FILE, 'utf-8');
    const casinos = JSON.parse(data);
    const casino = casinos.find((c: any) => c.id === id);
    
    if (!casino) {
      return NextResponse.json({ error: 'Casino not found' }, { status: 404 });
    }
    
    return NextResponse.json(casino);
  } catch (error) {
    console.error('Error fetching casino:', error);
    return NextResponse.json({ error: 'Failed to fetch casino' }, { status: 500 });
  }
}

// Update casino
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const updatedCasino = await request.json();
    
    const data = await fs.readFile(CASINOS_FILE, 'utf-8');
    let casinos = JSON.parse(data);
    
    const index = casinos.findIndex((c: any) => c.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Casino not found' }, { status: 404 });
    }
    
    // Update casino
    updatedCasino.lastModified = new Date().toISOString();
    casinos[index] = { ...casinos[index], ...updatedCasino };
    
    // Save to file
    await fs.writeFile(CASINOS_FILE, JSON.stringify(casinos, null, 2));
    
    return NextResponse.json(casinos[index]);
  } catch (error) {
    console.error('Error updating casino:', error);
    return NextResponse.json({ error: 'Failed to update casino' }, { status: 500 });
  }
}

// Delete casino
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const data = await fs.readFile(CASINOS_FILE, 'utf-8');
    let casinos = JSON.parse(data);
    
    const index = casinos.findIndex((c: any) => c.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Casino not found' }, { status: 404 });
    }
    
    // Remove casino
    casinos.splice(index, 1);
    
    // Save to file
    await fs.writeFile(CASINOS_FILE, JSON.stringify(casinos, null, 2));
    
    return NextResponse.json({ message: 'Casino deleted successfully' });
  } catch (error) {
    console.error('Error deleting casino:', error);
    return NextResponse.json({ error: 'Failed to delete casino' }, { status: 500 });
  }
}