'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'es', name: 'Español', flag: '🇲🇽' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export default function LanguageSwitcher() {
  // Temporarily disabled - showing only MX flag
  return (
    <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg">
      <Globe className="w-4 h-4" />
      <span>🇲🇽</span>
    </div>
  );
}