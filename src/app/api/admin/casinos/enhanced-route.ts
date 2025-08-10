import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@/lib/auth';
import { z } from 'zod';

const prisma = new PrismaClient();

// Enhanced GET with filtering, sorting, and pagination
export async function GET(req: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (status) {
      where.status = status;
    }
    
    const [casinos, total] = await Promise.all([
      prisma.casino.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          bonuses: {
            where: { isActive: true },
            take: 3,
          },
          reviews: {
            where: { isPublished: true },
            select: { overallRating: true },
          },
          _count: {
            select: {
              bonuses: true,
              reviews: true,
              games: true,
            },
          },
        },
      }),
      prisma.casino.count({ where }),
    ]);
    
    // Calculate average ratings
    const casinosWithStats = casinos.map(casino => ({
      ...casino,
      averageRating: casino.reviews.length > 0
        ? casino.reviews.reduce((acc, r) => acc + r.overallRating, 0) / casino.reviews.length
        : casino.rating,
    }));
    
    return NextResponse.json({
      casinos: casinosWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching casinos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch casinos' },
      { status: 500 }
    );
  }
}

// Enhanced POST with content versioning
const createCasinoSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  websiteUrl: z.string().url(),
  affiliateLink: z.string().url(),
  description: z.string().optional(),
  descriptionEs: z.string().optional(),
  descriptionEn: z.string().optional(),
  rating: z.number().min(0).max(10).optional(),
  established: z.number().optional(),
  features: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  currencies: z.array(z.string()).optional(),
  licenses: z.array(z.string()).optional(),
  supportedCountries: z.array(z.string()).optional(),
  restrictedCountries: z.array(z.string()).optional(),
  supportEmail: z.string().email().optional(),
  supportPhone: z.string().optional(),
  liveChatAvailable: z.boolean().optional(),
  supportHours: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const validatedData = createCasinoSchema.parse(body);
    
    // Create casino with audit logging
    const casino = await prisma.$transaction(async (tx) => {
      // Create the casino
      const newCasino = await tx.casino.create({
        data: {
          ...validatedData,
          status: 'DRAFT',
        },
      });
      
      // Create initial version
      await tx.contentVersion.create({
        data: {
          entityType: 'casino',
          entityId: newCasino.id,
          version: 1,
          data: newCasino,
          comment: 'Initial creation',
          createdById: user.id,
        },
      });
      
      // Create audit log
      await tx.auditLog.create({
        data: {
          action: 'CREATE',
          entityType: 'casino',
          entityId: newCasino.id,
          details: { name: newCasino.name },
          userId: user.id,
        },
      });
      
      return newCasino;
    });
    
    return NextResponse.json(casino, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating casino:', error);
    return NextResponse.json(
      { error: 'Failed to create casino' },
      { status: 500 }
    );
  }
}

// Bulk operations
export async function DELETE(req: NextRequest) {
  try {
    const user = await getSession();
    if (!user || user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN') {
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
      await tx.casino.deleteMany({
        where: {
          id: { in: ids },
        },
      });
      
      // Create audit logs for each deletion
      await tx.auditLog.createMany({
        data: ids.map(id => ({
          action: 'DELETE',
          entityType: 'casino',
          entityId: id,
          userId: user.id,
        })),
      });
    });
    
    return NextResponse.json({
      message: `Successfully deleted ${ids.length} casinos`,
    });
  } catch (error) {
    console.error('Error deleting casinos:', error);
    return NextResponse.json(
      { error: 'Failed to delete casinos' },
      { status: 500 }
    );
  }
}