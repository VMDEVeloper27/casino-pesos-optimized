'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, XCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'resent'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      const success = searchParams.get('success');
      const error = searchParams.get('error');
      
      // If already have success/error params, just show the status
      if (success === 'true') {
        setStatus('success');
        return;
      }
      
      if (error) {
        setStatus('error');
        switch (error) {
          case 'missing-token':
            setErrorMessage('No se proporcionó el token de verificación');
            break;
          case 'Invalid verification token':
            setErrorMessage('El token de verificación es inválido');
            break;
          case 'Email already verified':
            setErrorMessage('Este email ya ha sido verificado');
            break;
          case 'Verification token has expired':
            setErrorMessage('El token de verificación ha expirado. Por favor, solicita uno nuevo.');
            break;
          default:
            setErrorMessage('Error al verificar el email. Por favor, intenta de nuevo.');
        }
        return;
      }
      
      // If we have a token, verify it
      if (token) {
        try {
          const response = await fetch(`/api/auth/verify-email?token=${token}`);
          const data = await response.json();
          
          if (response.ok && data.success) {
            setStatus('success');
          } else {
            setStatus('error');
            setErrorMessage(data.error || 'Error al verificar el email');
          }
        } catch (err) {
          setStatus('error');
          setErrorMessage('Error al conectar con el servidor');
        }
      } else {
        setStatus('error');
        setErrorMessage('No se proporcionó token de verificación');
      }
    };

    verifyToken();
  }, [searchParams]);

  const handleResendVerification = async () => {
    if (!email) {
      setErrorMessage('Por favor, ingresa tu email');
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('resent');
      } else {
        setErrorMessage(data.error || 'Error al reenviar el email de verificación');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Verificación de Email
            </h2>
          </div>

          {/* Content based on status */}
          <div className="mt-8">
            {status === 'loading' && (
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">Verificando tu email...</p>
              </div>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ¡Email verificado exitosamente!
                </h3>
                <p className="text-gray-600 mb-6">
                  Tu cuenta ha sido verificada. Ya puedes iniciar sesión y disfrutar de todos los beneficios.
                </p>
                <Link
                  href="/es/auth/signin"
                  className="inline-flex items-center justify-center w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-semibold transition-all"
                >
                  Ir a Iniciar Sesión
                </Link>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <XCircle className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  Error en la verificación
                </h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                </div>

                {/* Resend verification form */}
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 text-center">
                    Si tu token ha expirado o necesitas un nuevo email de verificación:
                  </p>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Tu email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                      disabled={isResending}
                    />
                  </div>
                  <button
                    onClick={handleResendVerification}
                    disabled={isResending || !email}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Reenviando...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Reenviar email de verificación
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {status === 'resent' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ¡Email reenviado!
                </h3>
                <p className="text-gray-600 mb-6">
                  Hemos enviado un nuevo email de verificación a <strong>{email}</strong>. 
                  Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  No olvides revisar tu carpeta de spam o correo no deseado.
                </p>
                <Link
                  href="/es/auth/signin"
                  className="inline-flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-medium transition-all"
                >
                  Volver al inicio de sesión
                </Link>
              </motion.div>
            )}
          </div>

          {/* Footer links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600">
              <p>¿Necesitas ayuda?</p>
              <Link href="/support" className="font-medium text-green-600 hover:text-green-500">
                Contactar soporte
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}