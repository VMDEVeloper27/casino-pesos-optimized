import { NextRequest, NextResponse } from 'next/server';
import { getBlogStats } from '@/lib/blog-database';

export async function GET(request: NextRequest) {
  try {
    const stats = await getBlogStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return NextResponse.json({ error: 'Failed to fetch blog stats' }, { status: 500 });
  }
}