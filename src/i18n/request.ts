import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  
  // Ensure locale is always a string
  const finalLocale = locale || 'es';
  
  return {
    locale: finalLocale,
    messages: (await import(`../locales/${finalLocale}.json`)).default
  };
});