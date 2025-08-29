// This file helps with tree-shaking and reduces bundle size
// Import only what we need from heavy libraries

// Lucide React - import specific icons only
export { 
  ChevronRight,
  Gift,
  Star,
  Shield,
  Clock,
  CreditCard,
  User,
  Trophy,
  Calendar,
  TrendingUp,
  ArrowRight,
  DollarSign,
  Percent,
  Award,
  Heart,
  Settings,
  Bell,
  Search,
  SlidersHorizontal,
  X,
  Check
} from 'lucide-react';

// Framer Motion - import only used features
export { 
  motion,
  AnimatePresence 
} from 'framer-motion';

// Reduce Radix UI imports
export type { ComponentPropsWithoutRef } from 'react';