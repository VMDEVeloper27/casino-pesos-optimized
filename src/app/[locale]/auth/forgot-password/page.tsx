'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            ¡Correo Enviado!
          </h2>
          
          <p className="text-white/80 text-center mb-6">
            Hemos enviado instrucciones para restablecer tu contraseña a {email}
          </p>
          
          <p className="text-white/60 text-sm text-center mb-6">
            Si no recibes el correo en unos minutos, revisa tu carpeta de spam.
          </p>
          
          <Link
            href="/es/auth/signin"
            className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 rounded-lg text-center hover:shadow-lg hover:shadow-yellow-500/30 transition-all"
          >
            Volver al Inicio de Sesión
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20"
      >
        <Link
          href="/es/auth/signin"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-black" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          ¿Olvidaste tu Contraseña?
        </h1>
        
        <p className="text-white/70 text-center mb-8">
          Ingresa tu correo electrónico y te enviaremos instrucciones para restablecerla.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-white/90 mb-2 text-sm font-medium">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:bg-white/20 transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Enviando...' : 'Enviar Instrucciones'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-white/60 text-center text-sm">
            ¿Recordaste tu contraseña?{' '}
            <Link href="/es/auth/signin" className="text-yellow-400 hover:text-yellow-300 font-medium">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}