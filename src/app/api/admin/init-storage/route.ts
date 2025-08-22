import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Используем service role key для админских операций
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function GET() {
  try {
    // Получаем список существующих buckets
    const { data: existingBuckets } = await supabaseAdmin.storage.listBuckets();
    
    const bucketsToCreate = [
      { name: 'casino-logos', public: true },
      { name: 'game-images', public: true },
      { name: 'blog-images', public: true }
    ];
    
    const results = [];
    
    for (const bucket of bucketsToCreate) {
      const exists = existingBuckets?.find(b => b.name === bucket.name);
      
      if (!exists) {
        const { data, error } = await supabaseAdmin.storage.createBucket(bucket.name, {
          public: bucket.public,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (error) {
          results.push({ bucket: bucket.name, status: 'error', error: error.message });
        } else {
          results.push({ bucket: bucket.name, status: 'created', data });
        }
      } else {
        results.push({ bucket: bucket.name, status: 'already exists' });
      }
    }
    
    return NextResponse.json({ 
      success: true,
      results,
      message: 'Storage buckets initialized' 
    });
  } catch (error) {
    console.error('Error initializing storage:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to initialize storage buckets' 
    }, { status: 500 });
  }
}