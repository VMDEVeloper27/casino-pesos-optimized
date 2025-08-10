import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getSession } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle file uploads
export async function POST(req: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }
    
    // Create upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    
    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.name);
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}${ext}`;
    const filepath = path.join(uploadDir, filename);
    
    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);
    
    // Get image dimensions if it's an image
    let width = null;
    let height = null;
    if (file.type.startsWith('image/')) {
      // In production, use sharp or similar library to get dimensions
      // For now, we'll use placeholder values
      width = 800;
      height = 600;
    }
    
    // Save to database
    const media = await prisma.media.create({
      data: {
        filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: `/uploads/${filename}`,
        width,
        height,
        uploadedById: user.id,
      },
    });
    
    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'UPLOAD',
        entityType: 'media',
        entityId: media.id,
        details: { filename: file.name, size: file.size },
        userId: user.id,
      },
    });
    
    return NextResponse.json(media);
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
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const folder = searchParams.get('folder') || '/';
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    const where: any = {
      folder,
    };
    
    if (search) {
      where.OR = [
        { originalName: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
        { caption: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          uploadedBy: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.media.count({ where }),
    ]);
    
    return NextResponse.json({
      media,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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
    const user = await getSession();
    if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get('ids')?.split(',') || [];
    
    if (ids.length === 0) {
      return NextResponse.json(
        { error: 'No IDs provided' },
        { status: 400 }
      );
    }
    
    // Delete with audit logging
    await prisma.$transaction(async (tx) => {
      // Get file info before deletion
      const files = await tx.media.findMany({
        where: { id: { in: ids } },
      });
      
      // Delete from database
      await tx.media.deleteMany({
        where: { id: { in: ids } },
      });
      
      // Create audit logs
      await tx.auditLog.createMany({
        data: files.map(file => ({
          action: 'DELETE',
          entityType: 'media',
          entityId: file.id,
          details: { filename: file.originalName },
          userId: user.id,
        })),
      });
      
      // TODO: Delete actual files from filesystem
      // files.forEach(file => {
      //   const filepath = path.join(process.cwd(), 'public', file.url);
      //   unlink(filepath).catch(console.error);
      // });
    });
    
    return NextResponse.json({
      message: `Successfully deleted ${ids.length} files`,
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    );
  }
}