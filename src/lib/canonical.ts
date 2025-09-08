export function getCanonicalUrl(path: string, locale: string = 'es', headers?: Headers): string {
  // Always use the production domain
  const baseUrl = 'https://www.casinospesos.com';
  
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