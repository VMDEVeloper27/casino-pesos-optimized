import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Test database connection and table existence
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .limit(1);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        hint: 'Please run the SQL from supabase-favorites-only.sql in your Supabase dashboard',
        details: error
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Favorites table exists and is accessible!',
      sample: data
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to database',
      details: error
    });
  }
}