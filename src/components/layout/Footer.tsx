'use client';

import Link from 'next/link';
import { Shield, AlertCircle, FileText, Lock, Mail, Phone, Rss } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { contactInfo } from '@/lib/contact-info';

const NewsletterForm = dynamic(() => import('@/components/NewsletterForm'), {
  ssr: false,
  loading: () => (
    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-lg animate-pulse">
      <div className="h-8 bg-green-500/30 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-green-500/20 rounded w-full mb-2"></div>
      <div className="h-10 bg-green-500/20 rounded w-full"></div>
    </div>
  )
});

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2025);
  const [lastUpdate, setLastUpdate] = useState('01/01/2025');
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setLastUpdate(new Date().toLocaleDateString('es-MX'));
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg border-4 border-white ring-2 ring-green-200">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CasinosPesos</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Tu guía confiable de casinos online en México. Comparamos y analizamos los mejores casinos con licencia SEGOB.
            </p>
            <div className="flex items-center gap-2 text-green-700">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-semibold">100% Seguro y Legal</span>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-green-600 text-sm">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/es/contacto" className="text-gray-600 hover:text-green-600 text-sm">
                  Divulgación de Afiliados
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/es/guias" className="text-gray-600 hover:text-green-600 text-sm">
                  Guías de Casino
                </Link>
              </li>
              <li>
                <Link href="/es/bonos" className="text-gray-600 hover:text-green-600 text-sm">
                  Mejores Bonos
                </Link>
              </li>
              <li>
                <Link href="/es/guias" className="text-gray-600 hover:text-green-600 text-sm">
                  Métodos de Pago
                </Link>
              </li>
              <li>
                <Link href="/es/guias" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Juego Responsable
                </Link>
              </li>
              <li>
                <Link href="/rss" className="text-gray-600 hover:text-orange-600 text-sm flex items-center gap-2">
                  <Rss className="w-4 h-4" />
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contactInfo.phoneClean}`} className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {contactInfo.phoneDisplay}
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs text-gray-700">
                  {contactInfo.businessHours.es}
                </p>
              </li>
              <li>
                <p className="text-xs text-gray-700">
                  {contactInfo.address.city}, {contactInfo.address.country}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <NewsletterForm locale="es" />
        </div>
      </div>

      {/* Responsible Gaming Bar */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-gray-900 font-semibold text-sm">Juega Responsablemente</p>
                <p className="text-gray-600 text-xs">El juego puede ser adictivo. Juega con moderación.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-white px-3 py-1 rounded-lg text-gray-900 font-bold text-sm border border-gray-200">+18</span>
              <a href="https://casinospesos.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                casinospesos.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-green-700 font-bold text-sm">C</span>
              </div>
              <p className="text-green-100 text-sm font-medium">
                © {currentYear} <span className="text-white font-semibold">CasinosPesos</span>. 
                <span className="text-green-200 ml-1">Todos los derechos reservados.</span>
              </p>
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              <Link 
                href="/sitemap.xml" 
                className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Sitemap</span>
              </Link>
              
              <span className="text-green-300 hidden md:inline">|</span>
              
              <Link 
                href="/rss" 
                className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-1.5"
              >
                <Rss className="w-4 h-4" />
                <span>RSS Feed</span>
              </Link>
              
              <span className="text-green-300 hidden md:inline">|</span>
              
              <div className="flex items-center gap-1.5 text-green-200">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-sm">
                  Actualizado: <span className="text-white font-medium">{lastUpdate}</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-green-600">
            <p className="text-center text-xs text-green-200">
              CasinosPesos es operado por <span className="text-green-100">Digital Gaming Solutions S.A. de C.V.</span> | 
              <span className="ml-1">Registro SEGOB: MX-2024-CGS-0012</span> | 
              <span className="ml-1">Ciudad de México, México</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}