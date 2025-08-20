import { supabase } from './supabase';

const CASINO_LOGOS_BUCKET = 'casino-logos';
const GAME_IMAGES_BUCKET = 'game-images';

// Initialize storage buckets (run once)
export async function initializeStorageBuckets() {
  try {
    // Create casino logos bucket if it doesn't exist
    const { data: casinoBuckets } = await supabase.storage.listBuckets();
    
    if (!casinoBuckets?.find(b => b.name === CASINO_LOGOS_BUCKET)) {
      await supabase.storage.createBucket(CASINO_LOGOS_BUCKET, {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      });
    }
    
    if (!casinoBuckets?.find(b => b.name === GAME_IMAGES_BUCKET)) {
      await supabase.storage.createBucket(GAME_IMAGES_BUCKET, {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      });
    }
  } catch (error) {
    console.error('Error initializing storage buckets:', error);
  }
}

// Upload casino logo to Supabase Storage
export async function uploadCasinoLogo(file: File, casinoSlug: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${casinoSlug}-${Date.now()}.${fileExt}`;
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(CASINO_LOGOS_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(CASINO_LOGOS_BUCKET)
      .getPublicUrl(fileName);
    
    return publicUrl;
  } catch (error) {
    console.error('Error in uploadCasinoLogo:', error);
    return null;
  }
}

// Delete casino logo from Supabase Storage
export async function deleteCasinoLogo(url: string): Promise<boolean> {
  try {
    // Extract file path from URL
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    const { error } = await supabase.storage
      .from(CASINO_LOGOS_BUCKET)
      .remove([fileName]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteCasinoLogo:', error);
    return false;
  }
}

// Upload game image to Supabase Storage
export async function uploadGameImage(file: File, gameSlug: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${gameSlug}-${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(GAME_IMAGES_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      console.error('Error uploading game image:', error);
      return null;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(GAME_IMAGES_BUCKET)
      .getPublicUrl(fileName);
    
    return publicUrl;
  } catch (error) {
    console.error('Error in uploadGameImage:', error);
    return null;
  }
}

// List all casino logos
export async function listCasinoLogos() {
  try {
    const { data, error } = await supabase.storage
      .from(CASINO_LOGOS_BUCKET)
      .list();
    
    if (error) {
      console.error('Error listing files:', error);
      return [];
    }
    
    return data?.map(file => ({
      name: file.name,
      url: supabase.storage.from(CASINO_LOGOS_BUCKET).getPublicUrl(file.name).data.publicUrl,
      size: file.metadata?.size || 0,
      created: file.created_at
    })) || [];
  } catch (error) {
    console.error('Error in listCasinoLogos:', error);
    return [];
  }
}