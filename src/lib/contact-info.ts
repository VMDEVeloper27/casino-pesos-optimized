// Centralized contact information for consistency across the site
export const contactInfo = {
  phone: '+52 55 1234 5678', // Mexico City format
  phoneDisplay: '+52 (55) 1234-5678',
  phoneClean: '525512345678', // For tel: links
  email: 'info@casinospesos.com',
  supportEmail: 'soporte@casinospesos.com',
  privacyEmail: 'privacy@casinospesos.com',
  address: {
    street: 'Av. Paseo de la Reforma 296',
    colony: 'Col. Juárez',
    city: 'Ciudad de México',
    state: 'CDMX',
    postalCode: '06600',
    country: 'México',
    fullAddress: 'Av. Paseo de la Reforma 296, Col. Juárez, 06600 Ciudad de México, CDMX, México'
  },
  businessHours: {
    es: 'Lunes a Viernes: 9:00 AM - 6:00 PM (Hora de México)',
    en: 'Monday to Friday: 9:00 AM - 6:00 PM (Mexico Time)'
  },
  socialMedia: {
    twitter: '@casinospesos',
    facebook: 'casinospesos',
    instagram: 'casinospesos',
    telegram: 'casinospesos'
  }
};

// Helper function to format phone for display
export function formatPhone(locale: string = 'es'): string {
  return contactInfo.phoneDisplay;
}

// Helper function to get email by type
export function getEmail(type: 'general' | 'support' | 'privacy' = 'general'): string {
  switch(type) {
    case 'support':
      return contactInfo.supportEmail;
    case 'privacy':
      return contactInfo.privacyEmail;
    default:
      return contactInfo.email;
  }
}