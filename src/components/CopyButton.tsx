'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
  variant?: 'icon' | 'button';
  label?: string;
}

export default function CopyButton({ text, className = '', variant = 'icon', label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleCopy}
        className={`p-2 rounded-lg transition-all ${
          copied 
            ? 'bg-green-100 text-green-600' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
        } ${className}`}
        title={copied ? 'Copiado!' : 'Copiar código'}
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        copied 
          ? 'bg-green-100 text-green-600' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copiado!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label || 'Copiar'}</span>
        </>
      )}
    </button>
  );
}