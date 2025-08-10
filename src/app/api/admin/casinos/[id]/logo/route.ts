import { NextRequest, NextResponse } from 'next/server';
import { getAllCasinos, updateCasino } from '@/lib/casino-database';
import { convertUploadToWebP, deleteImage } from '@/lib/image-converter';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Get form data
    const formData = await request.formData();
    const file = formData.get('logo') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload JPEG, PNG, WebP, or SVG.' },
        { status: 400 }
      );
    }
    
    // Get the casino
    const casinos = await getAllCasinos();
    const casino = casinos.find(c => c.id === id);
    
    if (!casino) {
      return NextResponse.json(
        { error: 'Casino not found' },
        { status: 404 }
      );
    }
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert to WebP and save
    const logoPath = await convertUploadToWebP(buffer, file.name);
    
    // Delete old logo if it exists and is in uploads folder
    if (casino.logo && casino.logo.startsWith('/uploads/')) {
      await deleteImage(casino.logo);
    }
    
    // Update casino with new logo path
    const updatedCasino = await updateCasino(id, { logo: logoPath });
    
    if (!updatedCasino) {
      return NextResponse.json(
        { error: 'Failed to update casino' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      logo: logoPath,
      casino: updatedCasino
    });
  } catch (error) {
    console.error('Error uploading logo:', error);
    return NextResponse.json(
      { error: 'Failed to upload logo' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Get the casino
    const casinos = await getAllCasinos();
    const casino = casinos.find(c => c.id === id);
    
    if (!casino) {
      return NextResponse.json(
        { error: 'Casino not found' },
        { status: 404 }
      );
    }
    
    // Delete logo if it exists and is in uploads folder
    if (casino.logo && casino.logo.startsWith('/uploads/')) {
      await deleteImage(casino.logo);
    }
    
    // Update casino to remove logo
    const updatedCasino = await updateCasino(id, { logo: '' });
    
    if (!updatedCasino) {
      return NextResponse.json(
        { error: 'Failed to update casino' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      casino: updatedCasino
    });
  } catch (error) {
    console.error('Error deleting logo:', error);
    return NextResponse.json(
      { error: 'Failed to delete logo' },
      { status: 500 }
    );
  }
}