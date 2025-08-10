'use client';

import { motion } from 'framer-motion';
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
  return (
    <main className="min-h-screen bg-neutral-900 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Guías y Estrategias de Casino
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-300 max-w-2xl mx-auto"
          >
            Todo lo que necesitas saber para jugar de forma segura, responsable y maximizar tu diversión
          </motion.p>
        </div>

        {/* Featured Guide */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 text-8xl opacity-20">📚</div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-black fill-black" />
              <span className="text-black font-bold text-sm">GUÍA DESTACADA</span>
            </div>
            <h2 className="text-3xl font-bold text-black mb-2">
              Guía Definitiva para Principiantes 2024
            </h2>
            <p className="text-black/80 mb-6 max-w-2xl">
              Todo lo que necesitas saber antes de empezar a jugar en casinos online: 
              desde elegir el casino correcto hasta entender los bonos y jugar responsablemente.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-black/80 transition-colors flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Leer Guía Completa
              </button>
              <div className="flex items-center gap-4 text-black/70">
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
          <h2 className="text-2xl font-bold text-white mb-6">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                className="bg-neutral-800 hover:bg-neutral-700 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-sm font-semibold text-white">{category.name}</div>
                <div className="text-xs text-neutral-400">{category.count} guías</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Últimas Guías</h2>
            
            {guides.map((guide, index) => (
              <motion.article
                key={guide.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-neutral-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  guide.featured ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{guide.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-neutral-700 px-2 py-1 rounded text-xs text-neutral-300">
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
                          <span className="bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                            DESTACADO
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 hover:text-primary transition-colors">
                        <a href={`/es/guias/${guide.id}`}>{guide.title}</a>
                      </h3>
                      
                      <p className="text-neutral-300 mb-4">{guide.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-neutral-400">
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
                          <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors">
                            <Bookmark className="w-5 h-5 text-neutral-400 hover:text-white" />
                          </button>
                          <a 
                            href={`/es/guias/${guide.id}`}
                            className="bg-gradient-to-r from-primary to-accent text-black px-4 py-2 rounded-lg font-semibold hover:from-primary/90 hover:to-accent/90 transition-all flex items-center gap-1"
                          >
                            Leer
                            <ChevronRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
            
            {/* Load More */}
            <div className="text-center pt-8">
              <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                Cargar Más Guías
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Topics */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-neutral-800 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Temas Populares
              </h3>
              <div className="space-y-3">
                {popularTopics.map((topic, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-neutral-300 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    → {topic}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Help Box */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 border border-primary/30"
            >
              <HelpCircle className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">¿Necesitas Ayuda?</h3>
              <p className="text-neutral-300 mb-4 text-sm">
                Nuestro equipo de expertos está disponible 24/7 para resolver tus dudas
              </p>
              <button className="w-full bg-primary hover:bg-primary/90 text-black px-4 py-2 rounded-lg font-semibold transition-colors">
                Contactar Soporte
              </button>
            </motion.div>

            {/* Newsletter */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-neutral-800 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-2">📧 Newsletter</h3>
              <p className="text-neutral-300 mb-4 text-sm">
                Recibe las mejores guías y ofertas exclusivas
              </p>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="w-full bg-gradient-to-r from-primary to-accent text-black px-4 py-2 rounded-lg font-semibold hover:from-primary/90 hover:to-accent/90 transition-all">
                Suscribirse
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}