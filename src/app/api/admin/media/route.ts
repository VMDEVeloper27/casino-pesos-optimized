import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readdir, stat, unlink } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// Simple auth check - in production, use proper authentication
async function checkAuth(req: NextRequest) {
  // For now, always return true. In production, check session/JWT
  return true;
}

// Handle file uploads
export async function POST(req: NextRequest) {
  try {
    const isAuthorized = await checkAuth(req);
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const casinoId = formData.get('casinoId') as string;
    const type = formData.get('type') as string || 'general';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }
    
    // Determine upload directory based on type
    let uploadSubDir = 'general';
    if (type === 'casino-logo' && casinoId) {
      uploadSubDir = 'casino-logos';
    }
    
    // Create upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', uploadSubDir);
    await mkdir(uploadDir, { recursive: true });
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const ext = path.extname(file.name);
    let filename: string;
    
    if (type === 'casino-logo' && casinoId) {
      // For casino logos, use casinoId in filename for easy identification
      filename = `casino-${casinoId}-${timestamp}${ext}`;
    } else {
      filename = `${timestamp}-${randomStr}${ext}`;
    }
    
    const filepath = path.join(uploadDir, filename);
    
    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);
    
    // Return the public URL
    const publicUrl = `/uploads/${uploadSubDir}/${filename}`;
    
    return NextResponse.json({
      url: publicUrl,
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      type,
      casinoId,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// Get all media files
export async function GET(req: NextRequest) {
  try {
    const isAuthorized = await checkAuth(req);
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder') || 'general';
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    
    // Check if directory exists
    if (!existsSync(uploadDir)) {
      return NextResponse.json({ files: [] });
    }
    
    // Read directory contents
    const files = await readdir(uploadDir);
    const fileDetails = await Promise.all(
      files.map(async (filename) => {
        const filepath = path.join(uploadDir, filename);
        const stats = await stat(filepath);
        return {
          filename,
          url: `/uploads/${folder}/${filename}`,
          size: stats.size,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime,
        };
      })
    );
    
    // Sort by creation date (newest first)
    fileDetails.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return NextResponse.json({
      files: fileDetails,
      folder,
      total: fileDetails.length
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

// Delete media files
export async function DELETE(req: NextRequest) {
  try {
    const isAuthorized = await checkAuth(req);
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get('file');
    
    if (!fileUrl) {
      return NextResponse.json(
        { error: 'No file URL provided' },
        { status: 400 }
      );
    }
    
    // Extract path from URL (remove /uploads/ prefix)
    const relativePath = fileUrl.replace(/^\/uploads\//, '');
    const filepath = path.join(process.cwd(), 'public', 'uploads', relativePath);
    
    // Security check: ensure the path is within uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!filepath.startsWith(uploadsDir)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }
    
    // Check if file exists
    if (!existsSync(filepath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    
    // Delete the file
    await unlink(filepath);
    
    return NextResponse.json({
      message: 'File deleted successfully',
      file: fileUrl
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    );
  }
}