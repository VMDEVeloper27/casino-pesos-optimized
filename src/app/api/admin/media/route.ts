import { NextRequest, NextResponse } from 'next/server';
import { 
  uploadCasinoLogo, 
  uploadGameImage, 
  uploadBlogImage,
  listCasinoLogos, 
  listGameImages, 
  listBlogImages,
  deleteCasinoLogo,
  deleteBlogImage 
} from '@/lib/supabase-storage';

// Simple auth check - in production, use proper authentication
async function checkAuth(req: NextRequest) {
  // For now, always return true. In production, check session/JWT
  return true;
}

// Handle file uploads to Supabase Storage
export async function POST(req: NextRequest) {
  try {
    const isAuthorized = await checkAuth(req);
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const casinoId = formData.get('casinoId') as string;
    const gameId = formData.get('gameId') as string;
    const blogId = formData.get('blogId') as string;
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
    
    let publicUrl: string | null = null;
    
    // Upload to Supabase Storage based on type
    console.log('Uploading file:', { type, casinoId, gameId, blogId, fileName: file.name });
    
    if (type === 'casino-logo' && casinoId) {
      publicUrl = await uploadCasinoLogo(file, casinoId);
    } else if (type === 'game-image' && gameId) {
      publicUrl = await uploadGameImage(file, gameId);
    } else if (type === 'blog-image' && (blogId || gameId)) {
      // Support both blogId and gameId for blog images (for compatibility)
      publicUrl = await uploadBlogImage(file, blogId || gameId);
    } else if (type === 'game-image' && casinoId) {
      // Fallback for compatibility
      publicUrl = await uploadGameImage(file, casinoId);
    } else {
      // Default to casino logo
      publicUrl = await uploadCasinoLogo(file, `general-${Date.now()}`);
    }
    
    console.log('Upload result:', publicUrl);
    
    if (!publicUrl) {
      console.error('Upload to Supabase Storage failed');
      return NextResponse.json(
        { error: 'Failed to upload file to Supabase Storage. Check if buckets are created and accessible.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      url: publicUrl,
      message: 'File uploaded successfully to Supabase Storage'
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// Get list of uploaded files from Supabase Storage
export async function GET(req: NextRequest) {
  try {
    const isAuthorized = await checkAuth(req);
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'casino-logos';
    
    if (type === 'all') {
      // Get files from all buckets
      const casinoLogos = await listCasinoLogos();
      const gameImages = await listGameImages();
      const blogImages = await listBlogImages();
      
      // Add bucket info to each file
      const casinoFiles = casinoLogos.map(f => ({ ...f, bucket: 'casino-logos' }));
      const gameFiles = gameImages.map(f => ({ ...f, bucket: 'game-images' }));
      const blogFiles = blogImages.map(f => ({ ...f, bucket: 'blog-images' }));
      
      const allFiles = [...casinoFiles, ...gameFiles, ...blogFiles];
      return NextResponse.json({ files: allFiles });
    } else if (type === 'casino-logos') {
      const files = await listCasinoLogos();
      return NextResponse.json({ files });
    } else if (type === 'game-images') {
      const files = await listGameImages();
      return NextResponse.json({ files });
    } else if (type === 'blog-images') {
      const files = await listBlogImages();
      return NextResponse.json({ files });
    }
    
    return NextResponse.json({ files: [] });
    
  } catch (error) {
    console.error('List files error:', error);
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    );
  }
}

// Delete file from Supabase Storage
export async function DELETE(req: NextRequest) {
  try {
    const isAuthorized = await checkAuth(req);
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get('url');
    
    if (!fileUrl) {
      return NextResponse.json(
        { error: 'No file URL provided' },
        { status: 400 }
      );
    }
    
    const success = await deleteCasinoLogo(fileUrl);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete file' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      message: 'File deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}