import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Отключаем проверку типов и ESLint при сборке
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
  },
  
  // Enable experimental features and optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-icons',
      '@radix-ui/react-select',
      '@radix-ui/react-dialog',
      '@radix-ui/react-slot',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'framer-motion',
      'next-auth',
      '@supabase/supabase-js',
      '@prisma/client'
    ],
  },
  
  // Compression and performance optimization for desktop
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Optimize for desktop performance
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  
  // Optimize bundle size
  productionBrowserSourceMaps: false,
  
  // Environment variables
  env: {
    SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
  },

  // Webpack configuration to handle Node.js modules on client side
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      // Disable polyfills for modern browsers
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        buffer: false,
      };
      
      // Optimize chunks for production
      if (!dev) {
        config.optimization = {
          ...config.optimization,
          moduleIds: 'deterministic',
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              default: false,
              vendors: false,
              framework: {
                name: 'framework',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
                priority: 40,
                enforce: true,
              },
              lib: {
                test(module) {
                  return module.size() > 160000 &&
                    /node_modules[/\\]/.test(module.identifier());
                },
                name(module) {
                  const hash = require('crypto').createHash('sha1');
                  hash.update(module.identifier());
                  return hash.digest('hex').substring(0, 8);
                },
                priority: 30,
                minChunks: 1,
                reuseExistingChunk: true,
              },
              commons: {
                name: 'commons',
                chunks: 'all',
                minChunks: 3, // Increase to reduce commons size
                priority: 20,
                maxSize: 50000, // Split if larger than 50KB
              },
              shared: {
                name(module, chunks) {
                  return 'shared';
                },
                priority: 10,
                minChunks: 2,
                reuseExistingChunk: true,
              },
            },
            maxAsyncRequests: 25,
            maxInitialRequests: 25,
          },
        };
      }
    }
    
    // Remove moment.js locales
    config.plugins.push(
      new (require('webpack')).IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );
    
    return config;
  },

  // Add cache headers for static assets
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/:all*(js|css|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);