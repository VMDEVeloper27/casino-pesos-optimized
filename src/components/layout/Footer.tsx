import Link from 'next/link';
import { Shield, AlertCircle, FileText, Lock, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
            <div className="flex items-center gap-2 text-green-600">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">100% Seguro y Legal</span>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/es/privacidad" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/es/terminos" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/es/cookies" className="text-gray-600 hover:text-green-600 text-sm">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/es/afiliados" className="text-gray-600 hover:text-green-600 text-sm">
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
                <Link href="/es/metodos-pago" className="text-gray-600 hover:text-green-600 text-sm">
                  Métodos de Pago
                </Link>
              </li>
              <li>
                <Link href="/es/juego-responsable" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Juego Responsable
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@casinospesos.com" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@casinospesos.com
                </a>
              </li>
              <li>
                <a href="tel:+525555555555" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +52 55 5555 5555
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs text-gray-500">
                  Lun - Vie: 9:00 - 18:00<br />
                  Sáb - Dom: 10:00 - 16:00
                </p>
              </li>
            </ul>
          </div>
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
              <a href="https://www.jugarbien.org.mx" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                www.jugarbien.org.mx
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-50 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© {currentYear} CasinosPesos. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <Link href="/es/sitemap" className="hover:text-gray-700">
                Mapa del Sitio
              </Link>
              <span>•</span>
              <Link href="/es/rss" className="hover:text-gray-700">
                RSS
              </Link>
              <span>•</span>
              <span>Última actualización: {new Date().toLocaleDateString('es-MX')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}