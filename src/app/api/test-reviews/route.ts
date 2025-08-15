import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Попробуем получить список таблиц
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    console.log('Available tables:', tables);
    
    // Попробуем простой запрос к reviews
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .limit(5);
    
    console.log('Reviews data:', data);
    console.log('Reviews error:', error);
    
    // Попробуем получить данные из users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, name')
      .limit(5);
    
    console.log('Users data:', users);
    console.log('Users error:', usersError);
    
    return NextResponse.json({
      tables: tables || [],
      reviews: data || [],
      reviewsError: error?.message || null,
      users: users || [],
      usersError: usersError?.message || null
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({ error: 'Test failed', details: error }, { status: 500 });
  }
}