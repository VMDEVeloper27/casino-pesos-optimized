// Helper function to get the correct image URL
// Handles both Supabase Storage URLs and legacy local URLs
export function getCasinoImageUrl(logo: string | null | undefined): string {
  if (!logo) {
    return '/images/casino-placeholder.png';
  }
  
  // If it's already a full URL (Supabase Storage or external)
  if (logo.startsWith('http://') || logo.startsWith('https://')) {
    return logo;
  }
  
  // If it's a local path starting with /
  if (logo.startsWith('/')) {
    return logo;
  }
  
  // Legacy format: just filename
  if (logo.includes('.')) {
    // Check if it's in uploads folder
    if (logo.includes('casino-')) {
      return `/uploads/casino-logos/${logo}`;
    }
    return `/images/${logo}`;
  }
  
  // Default fallback
  return '/images/casino-placeholder.png';
}

// Helper to check if image is from Supabase
export function isSupabaseImage(url: string): boolean {
  return url.includes('supabase.co') || url.includes('supabase.in');
}

// Helper to get game image URL
export function getGameImageUrl(image: string | null | undefined): string {
  if (!image) {
    return '/images/game-placeholder.jpg';
  }
  
  // If it's already a full URL
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  
  // If it's a local path
  if (image.startsWith('/')) {
    return image;
  }
  
  // Legacy format
  return `/images/games/${image}`;
}