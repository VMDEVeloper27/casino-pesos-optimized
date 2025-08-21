'use client';

import { motion } from 'framer-motion';
import { Rss, Copy, CheckCircle, ExternalLink, Bell, Mail, Smartphone } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function RSSPage() {
  const [copied, setCopied] = useState(false);
  
  const rssUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/rss` 
    : 'http://localhost:3002/rss';

  const handleCopyRSS = () => {
    navigator.clipboard.writeText(rssUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const rssReaders = [
    {
      name: 'Feedly',
      icon: '🟢',
      url: `https://feedly.com/i/subscription/feed/${encodeURIComponent(rssUrl)}`,
      description: 'Lector RSS popular y fácil de usar'
    },
    {
      name: 'Inoreader',
      icon: '🔵',
      url: `https://www.inoreader.com/add_feed/${encodeURIComponent(rssUrl)}`,
      description: 'Potente lector RSS con funciones avanzadas'
    },
    {
      name: 'The Old Reader',
      icon: '🟠',
      url: `https://theoldreader.com/feeds/subscribe?url=${encodeURIComponent(rssUrl)}`,
      description: 'Lector RSS clásico y simple'
    },
    {
      name: 'NewsBlur',
      icon: '🟡',
      url: `https://www.newsblur.com/?url=${encodeURIComponent(rssUrl)}`,
      description: 'Lector RSS con inteligencia artificial'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 text-white rounded-full mb-6">
            <Rss className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            RSS Feed
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mantente actualizado con nuestras últimas guías, estrategias y noticias sobre casinos online
          </p>
        </motion.div>

        {/* RSS URL Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 mb-8 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Rss className="w-5 h-5 text-orange-500" />
            URL del Feed RSS
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={rssUrl}
              readOnly
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-mono text-sm"
            />
            <button
              onClick={handleCopyRSS}
              className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                copied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copiar
                </>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Copia esta URL y pégala en tu lector RSS favorito para recibir actualizaciones automáticas
          </p>
        </motion.div>

        {/* Quick Subscribe Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Suscríbete con un Click</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {rssReaders.map((reader) => (
              <a
                key={reader.name}
                href={reader.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 hover:shadow-lg transition-all flex items-center gap-4 group"
              >
                <span className="text-3xl">{reader.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {reader.name}
                  </h3>
                  <p className="text-sm text-gray-600">{reader.description}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </a>
            ))}
          </div>
        </motion.div>


        {/* What is RSS Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">¿Qué es RSS?</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              RSS (Really Simple Syndication) es un formato que te permite recibir actualizaciones automáticas 
              de tus sitios web favoritos sin tener que visitarlos manualmente.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ventajas de usar RSS:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Recibe actualizaciones instantáneas cuando publiquemos nuevo contenido</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Lee todo desde tu lector RSS favorito sin visitar múltiples sitios</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Sin spam ni publicidad, solo el contenido que te interesa</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Organiza y categoriza tus fuentes de información</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Mobile Apps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            Apps Móviles RSS
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">iOS (iPhone/iPad)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Reeder 5</li>
                <li>• NetNewsWire (Gratis)</li>
                <li>• Feedly</li>
                <li>• Unread</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Android</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Feedly</li>
                <li>• Inoreader</li>
                <li>• FeedMe</li>
                <li>• Flym (Gratis)</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Recent Content Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-100 rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600" />
            Contenido Reciente en Nuestro Feed
          </h2>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Cómo Elegir el Mejor Casino Online en 2025
              </h3>
              <p className="text-sm text-gray-600">
                Guía completa para principiantes sobre cómo evaluar y elegir un casino online seguro...
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Estrategias Avanzadas de Blackjack
              </h3>
              <p className="text-sm text-gray-600">
                Domina el blackjack con estrategias matemáticas probadas y aumenta tus probabilidades...
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Gestión de Bankroll: La Clave del Éxito
              </h3>
              <p className="text-sm text-gray-600">
                Aprende a gestionar tu presupuesto de juego de forma responsable y maximiza tu tiempo...
              </p>
            </div>
          </div>
          <Link 
            href="/guias"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mt-4 transition-colors"
          >
            Ver todas las guías
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}