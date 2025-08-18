'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">¡Algo salió mal!</h2>
        <p className="text-gray-600 mb-6">
          Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}