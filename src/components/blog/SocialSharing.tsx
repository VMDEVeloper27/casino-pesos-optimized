'use client';

import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Copy, CheckCircle } from 'lucide-react';

interface SocialSharingProps {
  url: string;
  title: string;
}

export default function SocialSharing({ url, title }: SocialSharingProps) {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = (platform: string) => {
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-neutral-400 mr-2">Compartir:</span>
      <button
        onClick={() => handleShare('facebook')}
        className="p-2 bg-neutral-700 hover:bg-blue-600 rounded-lg transition-colors group"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4 text-neutral-300 group-hover:text-white" />
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="p-2 bg-neutral-700 hover:bg-sky-500 rounded-lg transition-colors group"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4 text-neutral-300 group-hover:text-white" />
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="p-2 bg-neutral-700 hover:bg-blue-700 rounded-lg transition-colors group"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4 text-neutral-300 group-hover:text-white" />
      </button>
      <button
        onClick={handleCopyLink}
        className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors group relative"
        aria-label="Copy link"
      >
        {copied ? (
          <CheckCircle className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-neutral-300 group-hover:text-white" />
        )}
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            ¡Copiado!
          </span>
        )}
      </button>
    </div>
  );
}