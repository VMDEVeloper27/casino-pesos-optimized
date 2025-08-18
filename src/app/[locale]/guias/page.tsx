'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Award, BookOpen, Bookmark, ChevronRight, Clock, HelpCircle, TrendingUp, User } from 'lucide-react';

const guides = [
  {
    id: 1,
    title: 'Cómo Elegir el Mejor Casino Online en 2024',
    category: 'Principiantes',
    readTime: '10 min',
    author: 'Carlos Mendoza',
    date: '2024-01-15',
    image: '🎰',
    featured: true,
    excerpt: 'Guía completa para principiantes sobre cómo evaluar y elegir un casino online seguro y confiable en México.',
    difficulty: 'Fácil'
  },
  {
    id: 2,
    title: 'Estrategias Avanzadas de Blackjack',
    category: 'Estrategia',
    readTime: '15 min',
    author: 'Ana García',
    date: '2024-01-14',
    image: '🃏',
    featured: false,
    excerpt: 'Domina el blackjack con estrategias matemáticas probadas y aumenta tus probabilidades de ganar.',
    difficulty: 'Avanzado'
  },
  {
    id: 3,
    title: 'Gestión de Bankroll: La Clave del Éxito',
    category: 'Finanzas',
    readTime: '8 min',
    author: 'Roberto Silva',
    date: '2024-01-13',
    image: '💰',
    featured: true,
    excerpt: 'Aprende a gestionar tu presupuesto de juego de forma responsable y maximiza tu tiempo de entretenimiento.',
    difficulty: 'Intermedio'
  },
  {
    id: 4,
    title: 'Los Mejores Slots con RTP Alto',
    category: 'Juegos',
    readTime: '12 min',
    author: 'María López',
    date: '2024-01-12',
    image: '🎯',
    featured: false,
    excerpt: 'Descubre qué son los RTPs y cuáles son las tragamonedas con mejores porcentajes de retorno al jugador.',
    difficulty: 'Fácil'
  },
  {
    id: 5,
    title: 'Bonos de Casino: Términos y Condiciones Explicados',
    category: 'Bonos',
    readTime: '7 min',
    author: 'Diego Ramírez',
    date: '2024-01-11',
    image: '🎁',
    featured: false,
    excerpt: 'Todo lo que necesitas saber sobre rollover, requisitos de apuesta y cómo aprovechar los bonos.',
    difficulty: 'Fácil'
  },
  {
    id: 6,
    title: 'Juego Responsable: Señales y Recursos',
    category: 'Responsabilidad',
    readTime: '6 min',
    author: 'Laura Fernández',
    date: '2024-01-10',
    image: '🛡️',
    featured: true,
    excerpt: 'Identifica las señales de problemas con el juego y conoce los recursos de ayuda disponibles.',
    difficulty: 'Fácil'
  },
  {
    id: 7,
    title: 'Métodos de Pago Seguros para Casinos Online',
    category: 'Finanzas',
    readTime: '9 min',
    author: 'Carlos Mendoza',
    date: '2024-01-09',
    image: '💳',
    featured: false,
    excerpt: 'Conoce los métodos de pago más seguros y cómo proteger tu información financiera en casinos online.',
    difficulty: 'Fácil'
  },
  {
    id: 8,
    title: 'Torneos de Poker Online: Estrategias para Principiantes',
    category: 'Estrategia',
    readTime: '18 min',
    author: 'Ana García',
    date: '2024-01-08',
    image: '♠️',
    featured: false,
    excerpt: 'Aprende las estrategias básicas para participar en torneos de poker online y mejorar tu juego.',
    difficulty: 'Intermedio'
  },
  {
    id: 9,
    title: 'Casinos con Criptomonedas: Ventajas y Desventajas',
    category: 'Finanzas',
    readTime: '11 min',
    author: 'Roberto Silva',
    date: '2024-01-07',
    image: '₿',
    featured: false,
    excerpt: 'Todo lo que necesitas saber sobre jugar en casinos que aceptan Bitcoin y otras criptomonedas.',
    difficulty: 'Intermedio'
  },
  {
    id: 10,
    title: 'Análisis de Volatilidad en Slots Online',
    category: 'Juegos',
    readTime: '14 min',
    author: 'María López',
    date: '2024-01-06',
    image: '📊',
    featured: false,
    excerpt: 'Entiende qué es la volatilidad en las tragamonedas y cómo afecta tu estrategia de juego.',
    difficulty: 'Avanzado'
  },
  {
    id: 11,
    title: 'Licencias de Casino: Qué Significan y Por Qué Importan',
    category: 'Principiantes',
    readTime: '8 min',
    author: 'Diego Ramírez',
    date: '2024-01-05',
    image: '📄',
    featured: false,
    excerpt: 'Aprende a identificar y evaluar las licencias de casino para jugar de forma segura.',
    difficulty: 'Fácil'
  },
  {
    id: 12,
    title: 'Apps Móviles de Casino: Qué Buscar',
    category: 'Juegos',
    readTime: '10 min',
    author: 'Laura Fernández',
    date: '2024-01-04',
    image: '📱',
    featured: false,
    excerpt: 'Guía completa para elegir la mejor app de casino móvil y jugar desde tu teléfono.',
    difficulty: 'Fácil'
  }
];

const categories = [
  { name: 'Principiantes', icon: '👶', count: 15 },
  { name: 'Estrategia', icon: '🧠', count: 23 },
  { name: 'Juegos', icon: '🎮', count: 31 },
  { name: 'Bonos', icon: '🎁', count: 18 },
  { name: 'Finanzas', icon: '💳', count: 12 },
  { name: 'Responsabilidad', icon: '🛡️', count: 8 }
];

const popularTopics = [
  'Ruleta Europea vs Americana',
  'Métodos de Pago en México',
  'Torneos de Poker Online',
  'Licencias y Regulación',
  'Casinos con Criptomonedas',
  'Apps Móviles de Casino'
];

export default function GuiasPage() {
  const router = useRouter();
  const [visibleGuides, setVisibleGuides] = useState(6); // Show first 6 guides initially
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedGuides, setBookmarkedGuides] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setVisibleGuides(prev => Math.min(prev + 6, guides.length));
    setIsLoading(false);
  };

  const toggleBookmark = (guideId: number) => {
    setBookmarkedGuides(prev => 
      prev.includes(guideId) 
        ? prev.filter(id => id !== guideId)
        : [...prev, guideId]
    );
  };

  const handleSubscribe = async () => {
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const displayedGuides = guides.slice(0, visibleGuides);
  const hasMoreGuides = visibleGuides < guides.length;

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Guías y Estrategias de Casino
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Todo lo que necesitas saber para jugar de forma segura, responsable y maximizar tu diversión
          </motion.p>
        </div>

        {/* Featured Guide */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-12 relative overflow-hidden shadow-lg"
        >
          <div className="absolute top-0 right-0 text-8xl opacity-10 text-green-600">📚</div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-green-600 fill-green-600" />
              <span className="text-green-700 font-bold text-sm">GUÍA DESTACADA</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Guía Definitiva para Principiantes 2024
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Todo lo que necesitas saber antes de empezar a jugar en casinos online: 
              desde elegir el casino correcto hasta entender los bonos y jugar responsablemente.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/guias/guia-principiantes-2024" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 inline-flex">
                <BookOpen className="w-5 h-5" />
                Leer Guía Completa
              </Link>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  25 min lectura
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Por Expertos
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
              >
                <Link 
                  href={`/guias?categoria=${category.name.toLowerCase()}`}
                  className="bg-white hover:bg-gray-100 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 block"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="text-sm font-semibold text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.count} guías</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Últimas Guías</h2>
            
            {displayedGuides.map((guide, index) => (
              <motion.article
                key={guide.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  guide.featured ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{guide.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                          {guide.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          guide.difficulty === 'Fácil' ? 'bg-green-500/20 text-green-400' :
                          guide.difficulty === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {guide.difficulty}
                        </span>
                        {guide.featured && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                            DESTACADO
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                        <Link href={`/guias/${guide.id}`}>{guide.title}</Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4">{guide.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {guide.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {guide.author}
                          </span>
                          <span>{guide.date}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => toggleBookmark(guide.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Bookmark className={`w-5 h-5 ${bookmarkedGuides.includes(guide.id) ? 'text-green-600 fill-current' : 'text-gray-500 hover:text-gray-900'}`} />
                          </button>
                          <Link 
                            href={`/guias/${guide.id}`}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-1"
                          >
                            Leer
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
            
            {/* Load More */}
            {hasMoreGuides && (
              <div className="text-center pt-8">
                <button 
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Cargando...' : 'Cargar Más Guías'}
                </button>
                <p className="text-gray-600 text-sm mt-2">
                  Mostrando {visibleGuides} de {guides.length} guías
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Topics */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Temas Populares
              </h3>
              <div className="space-y-3">
                {popularTopics.map((topic, index) => (
                  <Link
                    key={index}
                    href={`/guias/tema/${topic.toLowerCase().replace(/ /g, '-')}`}
                    className="block text-gray-600 hover:text-gray-900 hover:translate-x-1 transition-all duration-200"
                  >
                    → {topic}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Help Box */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
            >
              <HelpCircle className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">¿Necesitas Ayuda?</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Nuestro equipo de expertos está disponible 24/7 para resolver tus dudas
              </p>
              <Link href="/contacto" className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors block text-center">
                Contactar Soporte
              </Link>
            </motion.div>

            {/* Newsletter */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">📧 Newsletter</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Recibe las mejores guías y ofertas exclusivas
              </p>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button 
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                {subscribed ? '✓ Suscrito' : 'Suscribirse'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}