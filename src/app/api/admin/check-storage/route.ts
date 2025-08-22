import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Проверяем существующие buckets
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      return NextResponse.json({ 
        success: false,
        error: error.message 
      }, { status: 500 });
    }
    
    // Проверяем каждый bucket
    const bucketStatus = {
      'casino-logos': false,
      'game-images': false,
      'blog-images': false
    };
    
    buckets?.forEach(bucket => {
      if (bucket.name in bucketStatus) {
        bucketStatus[bucket.name as keyof typeof bucketStatus] = true;
      }
    });
    
    // Пробуем загрузить тестовый файл в blog-images если он существует
    let testUploadResult = null;
    if (bucketStatus['blog-images']) {
      const testFile = new Blob(['test'], { type: 'text/plain' });
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(`test-${Date.now()}.txt`, testFile, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) {
        testUploadResult = { success: false, error: error.message };
      } else {
        // Удаляем тестовый файл
        await supabase.storage.from('blog-images').remove([data.path]);
        testUploadResult = { success: true, message: 'Upload test successful' };
      }
    }
    
    return NextResponse.json({ 
      success: true,
      buckets: buckets?.map(b => b.name),
      bucketStatus,
      testUploadResult,
      message: 'Storage check complete' 
    });
  } catch (error) {
    console.error('Error checking storage:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to check storage' 
    }, { status: 500 });
  }
}