'use client';

import { useState, useEffect } from 'react';
import { X, Cookie, Shield, ChartBar, Target, Settings } from 'lucide-react';
import Link from 'next/link';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      applyPreferences(savedPreferences);
    }
  }, []);

  const applyPreferences = (prefs: CookiePreferences) => {
    // Aplicar preferencias de cookies
    if (prefs.analytics && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
    
    if (prefs.marketing && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_personalization: 'granted',
      });
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyPreferences(allAccepted);
    setShowBanner(false);
  };

  const acceptSelected = () => {
    // Сохраняем выбранные настройки
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyPreferences(preferences);
    setShowBanner(false);
  };

  const rejectAll = () => {
    // При отклонении сохраняем только необходимые куки
    const rejected = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setPreferences(rejected);
    localStorage.setItem('cookieConsent', JSON.stringify(rejected));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyPreferences(rejected);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Banner without blocking overlay */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 md:p-6 max-h-[90vh] overflow-y-auto">
        <div className="max-w-6xl mx-auto bg-white rounded-lg sm:rounded-2xl shadow-2xl border border-green-100 sm:border-2">
          <div className="p-4 sm:p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Cookie className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Configuración de Cookies
                </h2>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido. 
              Puedes aceptar todas las cookies o personalizar tus preferencias.
            </p>

            {/* Quick Actions (Mobile/Desktop) */}
            {!showDetails && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={rejectAll}
                  className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                >
                  Rechazar todas
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 py-2.5 sm:px-6 sm:py-3 bg-green-50 border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-100 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                >
                  Personalizar
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2.5 sm:px-6 sm:py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors flex-1 sm:flex-initial shadow-md hover:shadow-lg text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                >
                  Aceptar todas
                </button>
              </div>
            )}

            {/* Detailed Settings */}
            {showDetails && (
              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          Cookies Necesarias
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Esenciales para el funcionamiento del sitio. No se pueden desactivar.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="w-5 h-5 text-green-600 rounded cursor-not-allowed opacity-50 accent-green-600"
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1">
                      <ChartBar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          Cookies Analíticas
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Nos ayudan a entender cómo los usuarios interactúan con el sitio.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                      className="w-5 h-5 text-green-600 rounded cursor-pointer accent-green-600"
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          Cookies de Marketing
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Se utilizan para mostrar anuncios relevantes y medir campañas.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                      className="w-5 h-5 text-green-600 rounded cursor-pointer accent-green-600"
                    />
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1">
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          Cookies de Preferencias
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Recuerdan tus preferencias como idioma y región.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.preferences}
                      onChange={(e) => setPreferences({...preferences, preferences: e.target.checked})}
                      className="w-5 h-5 text-green-600 rounded cursor-pointer accent-green-600"
                    />
                  </div>
                </div>

                {/* Actions for detailed view */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                  <button
                    onClick={rejectAll}
                    className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  >
                    Rechazar todas
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2.5 sm:px-6 sm:py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  >
                    Volver
                  </button>
                  <button
                    onClick={acceptSelected}
                    className="px-4 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  >
                    Guardar preferencias
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2.5 sm:px-6 sm:py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors flex-1 sm:flex-initial shadow-md hover:shadow-lg text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  >
                    Aceptar todas
                  </button>
                </div>
              </div>
            )}

            {/* Footer Links */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                <Link href="/privacy" className="text-gray-700 hover:text-green-600 transition-colors">
                  Política de Privacidad
                </Link>
                <Link href="/cookies" className="text-gray-700 hover:text-green-600 transition-colors">
                  Política de Cookies
                </Link>
                <Link href="/terms" className="text-gray-700 hover:text-green-600 transition-colors">
                  Términos y Condiciones
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}