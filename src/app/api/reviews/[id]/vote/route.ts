import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getToken } from 'next-auth/jwt';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reviewId } = await params;
    const token = await getToken({ req: request });
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { vote } = body;

    if (!vote || !['helpful', 'not_helpful'].includes(vote)) {
      return NextResponse.json({ error: 'Invalid vote type' }, { status: 400 });
    }

    // Check if user already voted
    const { data: existingVote } = await supabase
      .from('review_votes')
      .select('*')
      .eq('review_id', reviewId)
      .eq('user_id', token.id)
      .single();

    if (existingVote) {
      // Update existing vote
      if (existingVote.vote === vote) {
        // Remove vote if clicking the same button
        await supabase
          .from('review_votes')
          .delete()
          .eq('id', existingVote.id);

        // Update review counts
        const column = vote === 'helpful' ? 'helpful' : 'not_helpful';
        await supabase.rpc(`decrement_${column}`, { review_id: reviewId });

        return NextResponse.json({ message: 'Vote removed' });
      } else {
        // Change vote
        await supabase
          .from('review_votes')
          .update({ vote })
          .eq('id', existingVote.id);

        // Update review counts
        const oldColumn = existingVote.vote === 'helpful' ? 'helpful' : 'not_helpful';
        const newColumn = vote === 'helpful' ? 'helpful' : 'not_helpful';
        
        await supabase.rpc(`decrement_${oldColumn}`, { review_id: reviewId });
        await supabase.rpc(`increment_${newColumn}`, { review_id: reviewId });

        return NextResponse.json({ message: 'Vote updated' });
      }
    } else {
      // Create new vote
      await supabase
        .from('review_votes')
        .insert({
          review_id: reviewId,
          user_id: token.id,
          vote
        });

      // Update review counts
      const column = vote === 'helpful' ? 'helpful' : 'not_helpful';
      await supabase.rpc(`increment_${column}`, { review_id: reviewId });

      return NextResponse.json({ message: 'Vote recorded' });
    }
  } catch (error) {
    console.error('Error in POST /api/reviews/[id]/vote:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}