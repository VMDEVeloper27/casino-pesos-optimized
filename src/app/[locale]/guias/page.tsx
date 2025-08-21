'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Award, 
  BookOpen, 
  Bookmark, 
  ChevronRight, 
  Clock, 
  HelpCircle, 
  TrendingUp, 
  User,
  Gamepad2,
  Brain,
  Shield,
  Gift,
  CreditCard,
  Baby,
  DollarSign,
  Target,
  BarChart3,
  Smartphone,
  FileCheck,
  Bitcoin,
  Zap,
  Trophy,
  Users,
  Star,
  Mail,
  ArrowRight,
  Hash,
  Calendar,
  Filter,
  Search
} from 'lucide-react';

const guides = [
  {
    id: 1,
    slug: 'como-elegir-mejor-casino-online-2025',
    title: 'Cómo Elegir el Mejor Casino Online en 2025',
    category: 'Principiantes',
    readTime: '12 min',
    author: 'Carlos Mendoza',
    date: '2025-08-21',
    icon: Target,
    featured: true,
    excerpt: 'Guía completa para principiantes sobre cómo evaluar y elegir un casino online seguro y confiable en México. Incluye verificación de licencias, métodos de pago, bonos y juego responsable.',
    difficulty: 'Fácil',
    color: 'green'
  },
  {
    id: 2,
    slug: 'estrategias-avanzadas-blackjack',
    title: 'Estrategias Avanzadas de Blackjack',
    category: 'Estrategia',
    readTime: '15 min',
    author: 'Ana García',
    date: '2025-01-14',
    icon: Brain,
    featured: false,
    excerpt: 'Domina el blackjack con estrategias matemáticas probadas y aumenta tus probabilidades de ganar.',
    difficulty: 'Avanzado',
    color: 'purple'
  },
  {
    id: 3,
    slug: 'gestion-bankroll-clave-exito',
    title: 'Gestión de Bankroll: La Clave del Éxito',
    category: 'Finanzas',
    readTime: '8 min',
    author: 'Roberto Silva',
    date: '2025-01-13',
    icon: DollarSign,
    featured: true,
    excerpt: 'Aprende a gestionar tu presupuesto de juego de forma responsable y maximiza tu tiempo de entretenimiento.',
    difficulty: 'Intermedio',
    color: 'blue'
  },
  {
    id: 4,
    slug: 'mejores-slots-rtp-alto',
    title: 'Los Mejores Slots con RTP Alto',
    category: 'Juegos',
    readTime: '12 min',
    author: 'María López',
    date: '2025-01-12',
    icon: Gamepad2,
    featured: false,
    excerpt: 'Descubre qué son los RTPs y cuáles son las tragamonedas con mejores porcentajes de retorno al jugador.',
    difficulty: 'Fácil',
    color: 'orange'
  },
  {
    id: 5,
    slug: 'bonos-casino-terminos-condiciones',
    title: 'Bonos de Casino: Términos y Condiciones Explicados',
    category: 'Bonos',
    readTime: '7 min',
    author: 'Diego Ramírez',
    date: '2025-01-11',
    icon: Gift,
    featured: false,
    excerpt: 'Todo lo que necesitas saber sobre rollover, requisitos de apuesta y cómo aprovechar los bonos.',
    difficulty: 'Fácil',
    color: 'red'
  },
  {
    id: 6,
    slug: 'juego-responsable-senales-recursos',
    title: 'Juego Responsable: Señales y Recursos',
    category: 'Responsabilidad',
    readTime: '6 min',
    author: 'Laura Fernández',
    date: '2025-01-10',
    icon: Shield,
    featured: true,
    excerpt: 'Identifica las señales de problemas con el juego y conoce los recursos de ayuda disponibles.',
    difficulty: 'Fácil',
    color: 'indigo'
  },
  {
    id: 7,
    slug: 'metodos-pago-seguros-casinos',
    title: 'Métodos de Pago Seguros para Casinos Online',
    category: 'Finanzas',
    readTime: '9 min',
    author: 'Carlos Mendoza',
    date: '2025-01-09',
    icon: CreditCard,
    featured: false,
    excerpt: 'Conoce los métodos de pago más seguros y cómo proteger tu información financiera en casinos online.',
    difficulty: 'Fácil',
    color: 'blue'
  },
  {
    id: 8,
    slug: 'torneos-poker-online-estrategias',
    title: 'Torneos de Poker Online: Estrategias para Principiantes',
    category: 'Estrategia',
    readTime: '18 min',
    author: 'Ana García',
    date: '2025-01-08',
    icon: Trophy,
    featured: false,
    excerpt: 'Aprende las estrategias básicas para participar en torneos de poker online y mejorar tu juego.',
    difficulty: 'Intermedio',
    color: 'purple'
  },
  {
    id: 9,
    slug: 'casinos-criptomonedas-ventajas-desventajas',
    title: 'Casinos con Criptomonedas: Ventajas y Desventajas',
    category: 'Finanzas',
    readTime: '11 min',
    author: 'Roberto Silva',
    date: '2025-01-07',
    icon: Bitcoin,
    featured: false,
    excerpt: 'Todo lo que necesitas saber sobre jugar en casinos que aceptan Bitcoin y otras criptomonedas.',
    difficulty: 'Intermedio',
    color: 'yellow'
  },
  {
    id: 10,
    slug: 'analisis-volatilidad-slots',
    title: 'Análisis de Volatilidad en Slots Online',
    category: 'Juegos',
    readTime: '14 min',
    author: 'María López',
    date: '2025-01-06',
    icon: BarChart3,
    featured: false,
    excerpt: 'Entiende qué es la volatilidad en las tragamonedas y cómo afecta tu estrategia de juego.',
    difficulty: 'Avanzado',
    color: 'orange'
  },
  {
    id: 11,
    slug: 'licencias-casino-significado-importancia',
    title: 'Licencias de Casino: Qué Significan y Por Qué Importan',
    category: 'Principiantes',
    readTime: '8 min',
    author: 'Diego Ramírez',
    date: '2025-01-05',
    icon: FileCheck,
    featured: false,
    excerpt: 'Aprende a identificar y evaluar las licencias de casino para jugar de forma segura.',
    difficulty: 'Fácil',
    color: 'green'
  },
  {
    id: 12,
    slug: 'apps-moviles-casino-que-buscar',
    title: 'Apps Móviles de Casino: Qué Buscar',
    category: 'Juegos',
    readTime: '10 min',
    author: 'Laura Fernández',
    date: '2025-01-04',
    icon: Smartphone,
    featured: false,
    excerpt: 'Guía completa para elegir la mejor app de casino móvil y jugar desde tu teléfono.',
    difficulty: 'Fácil',
    color: 'orange'
  }
];

const categories = [
  { name: 'Principiantes', icon: Baby, count: 15, color: 'green' },
  { name: 'Estrategia', icon: Brain, count: 23, color: 'purple' },
  { name: 'Juegos', icon: Gamepad2, count: 31, color: 'orange' },
  { name: 'Bonos', icon: Gift, count: 18, color: 'red' },
  { name: 'Finanzas', icon: CreditCard, count: 12, color: 'blue' },
  { name: 'Responsabilidad', icon: Shield, count: 8, color: 'indigo' }
];

const popularTopics = [
  'Ruleta Europea vs Americana',
  'Métodos de Pago en México',
  'Torneos de Poker Online',
  'Licencias y Regulación',
  'Casinos con Criptomonedas',
  'Apps Móviles de Casino'
];

const difficultyColors = {
  'Fácil': 'bg-green-100 text-green-700 border-green-200',
  'Intermedio': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Avanzado': 'bg-red-100 text-red-700 border-red-200'
};

const categoryColors: Record<string, string> = {
  'green': 'bg-green-500',
  'purple': 'bg-purple-500',
  'orange': 'bg-orange-500',
  'red': 'bg-red-500',
  'blue': 'bg-blue-500',
  'indigo': 'bg-indigo-500',
  'yellow': 'bg-yellow-500'
};

export default function GuiasPage() {
  const router = useRouter();
  const [visibleGuides, setVisibleGuides] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedGuides, setBookmarkedGuides] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleLoadMore = async () => {
    setIsLoading(true);
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

  // Filter guides based on search and category
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = searchQuery === '' || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || guide.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const displayedGuides = filteredGuides.slice(0, visibleGuides);
  const hasMoreGuides = visibleGuides < filteredGuides.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-xl"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          
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
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Todo lo que necesitas saber para jugar de forma segura, responsable y maximizar tu diversión
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar guías..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* Featured Guide */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 mb-12 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <BookOpen className="w-64 h-64" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <span className="text-yellow-300 font-bold text-sm uppercase tracking-wide">Guía Destacada</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-100">
              Guía Definitiva para Principiantes 2025
            </h2>
            
            <p className="text-green-50 mb-8 max-w-2xl text-lg">
              Todo lo que necesitas saber antes de empezar a jugar en casinos online: 
              desde elegir el casino correcto hasta entender los bonos y jugar responsablemente.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <Link 
                href="/es/guias/guia-principiantes-2025" 
                className="bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Leer Guía Completa
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <div className="flex items-center gap-6 text-green-50">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">25 min lectura</span>
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Por Expertos</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Filter className="w-6 h-6 text-green-600" />
            Categorías
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.name;
              
              return (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * index }}
                  onClick={() => setSelectedCategory(isSelected ? null : category.name)}
                  className={`relative bg-white hover:shadow-lg rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border-2 ${
                    isSelected ? 'border-green-500 shadow-lg' : 'border-gray-200'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${categoryColors[category.color]} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${categoryColors[category.color].replace('bg-', 'text-')}`} />
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.count} guías</div>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory ? `Guías de ${selectedCategory}` : 'Últimas Guías'}
              </h2>
              <span className="text-sm text-gray-600">
                {filteredGuides.length} {filteredGuides.length === 1 ? 'guía' : 'guías'}
              </span>
            </div>
            
            {displayedGuides.map((guide, index) => {
              const Icon = guide.icon;
              
              return (
                <motion.article
                  key={guide.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border-2 ${
                    guide.featured ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${categoryColors[guide.color]} bg-opacity-10`}>
                        <Icon className={`w-7 h-7 ${categoryColors[guide.color].replace('bg-', 'text-')}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-medium text-gray-700">
                            {guide.category}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${difficultyColors[guide.difficulty as keyof typeof difficultyColors]}`}>
                            {guide.difficulty}
                          </span>
                          {guide.featured && (
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                              Destacado
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                          <Link href={`/es/guias/${guide.slug}`}>{guide.title}</Link>
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">{guide.excerpt}</p>
                        
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
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {guide.date}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => toggleBookmark(guide.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              aria-label="Guardar guía"
                            >
                              <Bookmark className={`w-5 h-5 ${
                                bookmarkedGuides.includes(guide.id) 
                                  ? 'text-green-600 fill-current' 
                                  : 'text-gray-400 hover:text-gray-600'
                              }`} />
                            </button>
                            <Link 
                              href={`/es/guias/${guide.slug}`}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
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
              );
            })}
            
            {/* Load More */}
            {hasMoreGuides && (
              <div className="text-center pt-8">
                <button 
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    <>
                      Cargar Más Guías
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-gray-600 text-sm mt-3">
                  Mostrando {displayedGuides.length} de {filteredGuides.length} guías
                </p>
              </div>
            )}
            
            {filteredGuides.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron guías</h3>
                <p className="text-gray-600">Intenta con otros términos de búsqueda o categorías</p>
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
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Temas Populares
              </h3>
              <div className="space-y-3">
                {popularTopics.map((topic, index) => (
                  <Link
                    key={index}
                    href={`/es/guias/tema/${topic.toLowerCase().replace(/ /g, '-')}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group"
                  >
                    <Hash className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                    <span className="group-hover:translate-x-1 transition-transform">{topic}</span>
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
              <Link 
                href="/contacto" 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all block text-center shadow-sm hover:shadow-md"
              >
                Contactar Soporte
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total de Guías</span>
                  <span className="font-bold text-gray-900">{guides.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Autores Expertos</span>
                  <span className="font-bold text-gray-900">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Lectores Mensuales</span>
                  <span className="font-bold text-gray-900">15K+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Calificación</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="font-bold text-gray-900 ml-1">4.9</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}