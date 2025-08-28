'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, Lock, Sparkles, Shield, KeyRound } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError(data.error || 'Error al enviar el correo');
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Premium animated background */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full filter blur-[120px] animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-600 rounded-full filter blur-[120px] animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-400 rounded-full filter blur-[120px] animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative"
          >
            {/* Success glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 blur-3xl" />
            
            <div className="relative bg-white rounded-3xl p-8 md:p-12 max-w-md w-full border border-green-500/20 shadow-xl">
              {/* Success animation */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-black text-center mb-4"
              >
                ¡Correo Enviado!
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <p className="text-black/90 text-center">
                  Hemos enviado las instrucciones a:
                </p>
                <div className="bg-green-500/10 border border-green-500 rounded-lg px-4 py-3">
                  <p className="text-green-600 font-medium text-center break-all">
                    {email}
                  </p>
                </div>
                <div className="flex items-start gap-3 bg-black/5 rounded-lg p-4 border border-green-500/30">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-black/70 text-sm">
                    Si no recibes el correo en 5 minutos, revisa tu carpeta de spam o solicita un nuevo enlace.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/es/auth/signin"
                  className="block w-full bg-green-600 text-white font-bold py-4 rounded-xl text-center shadow-lg hover:bg-green-700 transform hover:scale-[1.02] transition-all"
                >
                  Volver al Inicio de Sesión
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-600 rounded-full filter blur-[120px] animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-400 rounded-full filter blur-[120px] animate-pulse delay-1000" />
        </div>
        
        {/* Floating casino elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-20 right-20 text-6xl opacity-10"
          >
            🎰
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-32 left-20 text-6xl opacity-10"
          >
            🎲
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              x: [0, 15, 0]
            }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute top-1/3 right-1/4 text-5xl opacity-10"
          >
            ♠️
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 blur-3xl" />
          
          <div className="relative bg-white rounded-3xl p-8 md:p-12 max-w-md w-full border border-green-500/20 shadow-xl">
            {/* Back button */}
            <Link
              href="/es/auth/signin"
              className="inline-flex items-center gap-2 text-black/60 hover:text-green-600 mb-8 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Volver</span>
            </Link>

            {/* Icon with premium animation */}
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur-2xl opacity-50" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-full flex items-center justify-center shadow-xl">
                  <KeyRound className="w-12 h-12 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-green-400" />
              </div>
            </motion.div>

            {/* Title with gradient */}
            <h1 className="text-4xl font-black text-black text-center mb-3">
              Recupera tu Acceso
            </h1>
            
            <p className="text-black/80 text-center mb-8 text-lg">
              No te preocupes, te ayudaremos a recuperar tu cuenta en segundos
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: '⚡', text: 'Rápido' },
                { icon: '🔒', text: 'Seguro' },
                { icon: '✨', text: 'Fácil' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center border border-green-500/30"
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-black/70 text-xs">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-black/90 mb-3 text-sm font-medium">
                  <Mail className="w-4 h-4 text-green-600" />
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                    className="w-full px-4 py-4 bg-gray-100 border-2 border-gray-300 rounded-xl text-black placeholder-black/50 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  />
                  <AnimatePresence>
                    {email && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-start gap-3"
                >
                  <span className="text-lg">⚠️</span>
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading || !email}
                className="relative w-full bg-green-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-green-700 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Enviar Instrucciones
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
              <p className="text-black/60 text-center text-sm">
                ¿Recordaste tu contraseña?
              </p>
              <Link 
                href="/es/auth/signin" 
                className="block text-center text-green-600 hover:text-green-700 font-bold transition-colors"
              >
                Iniciar Sesión →
              </Link>
              <p className="text-black/40 text-center text-xs">
                ¿No tienes cuenta?{' '}
                <Link href="/es/auth/signup" className="text-black/60 hover:text-green-600 transition-colors">
                  Regístrate gratis
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}