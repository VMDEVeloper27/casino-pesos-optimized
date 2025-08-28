export function getCanonicalUrl(path: string, locale: string = 'es'): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://casinospesos.com';
  
  // Remove any query parameters or hash fragments
  const cleanPath = path.split('?')[0].split('#')[0];
  
  // Ensure path starts with /
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  // Remove trailing slash unless it's the home page
  const pathWithoutTrailingSlash = normalizedPath === '/' 
    ? normalizedPath 
    : normalizedPath.replace(/\/$/, '');
  
  // Build the full URL
  const fullPath = locale === 'es' 
    ? pathWithoutTrailingSlash 
    : `/${locale}${pathWithoutTrailingSlash}`;
    
  return `${baseUrl}${fullPath}`;
}

export function generateCanonicalMetadata(path: string, locale: string = 'es') {
  return {
    alternates: {
      canonical: getCanonicalUrl(path, locale),
    },
  };
}