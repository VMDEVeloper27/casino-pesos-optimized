import Image from 'next/image';

interface CasinoLogoProps {
  name: string;
  logo: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function CasinoLogo({ name, logo, size = 'md', className = '' }: CasinoLogoProps) {
  const sizeClasses = {
    sm: 'w-20 h-12',
    md: 'w-28 h-16',
    lg: 'w-36 h-20',
    xl: 'w-44 h-24'
  };

  const imageSizes = {
    sm: { width: 80, height: 48 },
    md: { width: 112, height: 64 },
    lg: { width: 144, height: 80 },
    xl: { width: 176, height: 96 }
  };

  // Check if logo is an actual image path
  const isImagePath = logo && (logo.startsWith('/') || logo.startsWith('http'));

  // Generate a consistent color based on the casino name
  const getGradientColors = (name: string) => {
    const colors = [
      { from: '#FFD700', to: '#FFA500' }, // Gold to Orange
      { from: '#FF6B6B', to: '#FF4757' }, // Red shades
      { from: '#4ECDC4', to: '#44A3AA' }, // Teal shades
      { from: '#A855F7', to: '#7C3AED' }, // Purple shades
      { from: '#10B981', to: '#059669' }, // Green shades
      { from: '#3B82F6', to: '#2563EB' }, // Blue shades
      { from: '#F59E0B', to: '#D97706' }, // Amber shades
      { from: '#EC4899', to: '#DB2777' }, // Pink shades
    ];
    
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  const gradientColors = getGradientColors(name);
  const gradientId = `gradient-${name.replace(/\s+/g, '-')}`;

  // Display actual image if available
  if (isImagePath) {
    return (
      <div className={`${sizeClasses[size]} ${className} relative overflow-hidden rounded-lg flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50`}>
        <Image
          src={logo}
          alt={`${name} Casino Logo - Juega en ${name} online con pesos mexicanos, bonos exclusivos y retiros rápidos`}
          title={`${name} - Casino online confiable en México`}
          width={imageSizes[size].width}
          height={imageSizes[size].height}
          className="object-contain p-2 w-full h-full"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
        />
      </div>
    );
  }

  // Fallback to text display
  const displayText = logo || name.split(' ')[0].substring(0, 3);
  
  return (
    <div className={`${sizeClasses[size]} ${className} relative overflow-hidden rounded-lg flex items-center justify-center`}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 50" 
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.from} />
            <stop offset="100%" stopColor={gradientColors.to} />
          </linearGradient>
        </defs>
        <rect width="100" height="50" fill={`url(#${gradientId})`} rx="8" />
        <text
          x="50"
          y="25"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="20"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          {displayText.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}