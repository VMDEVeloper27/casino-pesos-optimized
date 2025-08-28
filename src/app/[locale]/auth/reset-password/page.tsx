'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, Shield, KeyRound } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [tokenValid, setTokenValid] = useState(true);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError('Token no válido o expirado');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/es/auth/signin');
        }, 3000);
      } else {
        setError(data.error || 'Error al restablecer la contraseña');
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
        <div className="absolute inset-0 bg-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full filter blur-[120px] animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-600 rounded-full filter blur-[120px] animate-pulse delay-700" />
          </div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl p-8 md:p-12 max-w-md w-full border border-green-500/20 shadow-xl">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
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
                ¡Contraseña Actualizada!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-black/70 text-center mb-6"
              >
                Tu contraseña ha sido restablecida exitosamente. Serás redirigido al inicio de sesión...
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-red-500 rounded-full filter blur-[120px] animate-pulse" />
          </div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full border border-red-500/20 shadow-xl">
            <div className="text-center">
              <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-black mb-4">Enlace Inválido</h2>
              <p className="text-black/70 mb-6">
                Este enlace de restablecimiento es inválido o ha expirado. Por favor, solicita uno nuevo.
              </p>
              <button
                onClick={() => router.push('/es/auth/forgot-password')}
                className="bg-green-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-700 transition-all"
              >
                Solicitar Nuevo Enlace
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-600 rounded-full filter blur-[120px] animate-pulse delay-700" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative"
        >
          <div className="relative bg-white rounded-3xl p-8 md:p-12 max-w-md w-full border border-green-500/20 shadow-xl">
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
              </div>
            </motion.div>

            <h1 className="text-4xl font-black text-black text-center mb-3">
              Nueva Contraseña
            </h1>
            
            <p className="text-black/80 text-center mb-8 text-lg">
              Crea una contraseña segura para tu cuenta
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="flex items-center gap-2 text-black/90 mb-3 text-sm font-medium">
                  <Lock className="w-4 h-4 text-green-600" />
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-4 py-4 pr-12 bg-gray-100 border-2 border-gray-300 rounded-xl text-black placeholder-black/50 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="flex items-center gap-2 text-black/90 mb-3 text-sm font-medium">
                  <Lock className="w-4 h-4 text-green-600" />
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Repite la contraseña"
                    className="w-full px-4 py-4 pr-12 bg-gray-100 border-2 border-gray-300 rounded-xl text-black placeholder-black/50 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {password && (
                <div className="space-y-2 text-sm">
                  <div className={`flex items-center gap-2 ${password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="w-4 h-4" />
                    <span>Al menos 8 caracteres</span>
                  </div>
                  <div className={`flex items-center gap-2 ${password === confirmPassword && confirmPassword !== '' ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="w-4 h-4" />
                    <span>Las contraseñas coinciden</span>
                  </div>
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading || !password || !confirmPassword}
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
                      Actualizando...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Restablecer Contraseña
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-black/60 text-sm">
                ¿Recuerdas tu contraseña?{' '}
                <a href="/es/auth/signin" className="text-green-600 hover:text-green-700 font-bold transition-colors">
                  Iniciar Sesión
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}