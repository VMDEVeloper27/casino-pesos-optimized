import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const casinoId = searchParams.get('casinoId');
    // Временно показываем все отзывы, включая pending
    // В продакшене следует показывать только approved
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('reviews')
      .select('*, review_responses(*)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by status if provided
    if (status) {
      query = query.eq('status', status);
    }

    // Filter by casino ID
    if (casinoId) {
      query = query.eq('casino_id', casinoId);
    }

    const { data: reviews, count, error } = await query;

    if (error) {
      console.error('Error fetching reviews:', error);
      // Если ошибка с таблицей, но данные есть - продолжаем
      if (!reviews && error.message?.includes('table')) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
      }
    }

    // Calculate average rating and distribution
    let averageRating = 0;
    let ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      averageRating = Math.round((totalRating / reviews.length) * 10) / 10;
      
      reviews.forEach(review => {
        ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
      });
    }

    return NextResponse.json({
      reviews: reviews || [],
      totalReviews: count || 0,
      averageRating,
      ratingDistribution,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / limit)
    });
  } catch (error) {
    console.error('Error in GET /api/reviews:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      casinoId,
      casinoName,
      rating,
      title,
      comment,
      pros = [],
      cons = []
    } = body;

    // Validate required fields
    if (!casinoId || !casinoName || !rating || !title || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    // Insert review
    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        casino_id: casinoId,
        casino_name: casinoName,
        user_id: token.id,
        user_name: token.name || 'Anonymous',
        rating,
        title,
        comment,
        pros,
        cons,
        status: 'approved', // Auto-approve reviews for now
        verified: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Review submitted successfully.',
      review
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/reviews:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}