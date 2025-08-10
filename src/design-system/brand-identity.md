# CasinosPesos Brand Identity & Design System

## 🎨 Brand Identity

### Brand Personality
- **Trustworthy**: Reliable source for casino information
- **Professional**: Expert knowledge and analysis
- **Approachable**: User-friendly for beginners
- **Exciting**: Captures the thrill of gaming
- **Culturally Relevant**: Tailored for Latin American markets

### Brand Values
- Transparency in reviews
- Player safety first
- Responsible gambling advocacy
- Local market expertise
- Unbiased recommendations

## 🎨 Color Palette

### Primary Colors
```css
--primary-gold: #FFD700;        /* Main brand color - Trust & Premium */
--primary-gold-dark: #E6C200;   /* Hover states */
--primary-gold-light: #FFF3B8;  /* Backgrounds */

--secondary-purple: #4C1D95;    /* Luxury & Sophistication */
--secondary-purple-dark: #3B1674;
--secondary-purple-light: #6B46C1;
```

### Accent Colors
```css
--accent-emerald: #10B981;      /* Success, Bonuses */
--accent-red: #EF4444;          /* Alerts, Hot Offers */
--accent-blue: #3B82F6;         /* Information, Links */
--accent-orange: #F59E0B;       /* Warnings, Promotions */
```

### Neutral Colors
```css
--neutral-900: #111827;         /* Dark backgrounds */
--neutral-800: #1F2937;         /* Card backgrounds */
--neutral-700: #374151;         /* Borders dark */
--neutral-600: #4B5563;         /* Muted text */
--neutral-500: #6B7280;         /* Disabled states */
--neutral-400: #9CA3AF;         /* Placeholders */
--neutral-300: #D1D5DB;         /* Borders light */
--neutral-200: #E5E7EB;         /* Dividers */
--neutral-100: #F3F4F6;         /* Light backgrounds */
--neutral-50: #F9FAFB;          /* White alternative */
```

### Semantic Colors
```css
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

## 🔤 Typography

### Font Families
```css
--font-heading: 'Poppins', system-ui, sans-serif;  /* Headlines, CTAs */
--font-body: 'Inter', system-ui, sans-serif;       /* Body text */
--font-mono: 'JetBrains Mono', monospace;         /* Numbers, codes */
```

### Font Sizes
```css
--text-xs: 0.75rem;     /* 12px - Badges, labels */
--text-sm: 0.875rem;    /* 14px - Captions, meta */
--text-base: 1rem;      /* 16px - Body text */
--text-lg: 1.125rem;    /* 18px - Lead text */
--text-xl: 1.25rem;     /* 20px - Section titles */
--text-2xl: 1.5rem;     /* 24px - H3 */
--text-3xl: 1.875rem;   /* 30px - H2 */
--text-4xl: 2.25rem;    /* 36px - H1 */
--text-5xl: 3rem;       /* 48px - Hero */
--text-6xl: 3.75rem;    /* 60px - Display */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

## 📐 Spacing System

Using 8px grid system:
```css
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

## 🎯 Logo Design

### Primary Logo
- **Icon**: Golden peso symbol with playing card elements
- **Text**: "CasinosPesos" in Poppins Bold
- **Colors**: Gold gradient with purple accent

### Logo Variations
1. **Full Logo**: Icon + Text (horizontal)
2. **Stacked Logo**: Icon above text
3. **Icon Only**: For mobile/favicon
4. **Monochrome**: For single color uses

### Logo Usage
- Minimum size: 120px width (full logo)
- Clear space: 1x height around logo
- Never stretch or distort
- Always maintain contrast

## 🎴 Visual Elements

### Icons Style
- **Style**: Outline with 2px stroke
- **Size**: 16px, 20px, 24px, 32px
- **Library**: Lucide Icons + Custom casino icons

### Casino-Specific Icons
```
🎰 Slots
🃏 Cards  
🎲 Dice
💰 Money/Bonus
🎯 Roulette
🎪 Live Casino
⚡ Quick Games
🏆 Tournaments
```

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, #FFD700, #E6C200);
  color: #111827;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(255, 215, 0, 0.4);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: #FFD700;
  border: 2px solid #FFD700;
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 600;
}
```

### Cards

#### Casino Card
```css
.casino-card {
  background: linear-gradient(135deg, #1F2937, #111827);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.casino-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #FFD700, #10B981);
}
```

### Badges

#### Bonus Badge
```css
.badge-bonus {
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
```

#### Hot Badge
```css
.badge-hot {
  background: linear-gradient(135deg, #EF4444, #DC2626);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  animation: pulse 2s infinite;
}
```

## 📱 Responsive Breakpoints

```css
--mobile: 320px;
--mobile-lg: 425px;
--tablet: 768px;
--desktop: 1024px;
--desktop-lg: 1440px;
--desktop-xl: 1920px;
```

## 🎭 Animation Guidelines

### Micro-interactions
```css
/* Hover effects */
--transition-fast: 150ms ease;
--transition-base: 300ms ease;
--transition-slow: 500ms ease;

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

### Loading States
- Skeleton screens for content
- Spinning peso symbol for actions
- Progress bars for multi-step processes

## 🖼️ Image Guidelines

### Casino Logos
- Size: 200x100px
- Format: PNG with transparency
- Background: Always white or transparent

### Hero Images
- Size: 1920x600px
- Format: WebP with JPG fallback
- Overlay: Dark gradient for text readability

### Game Thumbnails
- Size: 300x200px
- Format: WebP
- Border-radius: 8px

### User Avatars
- Size: 40x40px, 80x80px
- Format: WebP
- Border-radius: 50%

## 🎮 Component Patterns

### Casino Comparison Table
- Sticky header on scroll
- Alternating row colors
- Hover highlight
- Mobile: Card stack view

### Bonus Calculator
- Step-by-step wizard
- Real-time calculation
- Visual progress indicator
- Clear result display

### Filter Panel
- Collapsible sections
- Chip-style selected filters
- Clear all option
- Mobile: Bottom sheet

### Rating Display
- 5-star system
- Half-star precision
- Numerical score
- Review count

## 🌙 Dark Mode

Primary dark theme with gold accents:
```css
.dark {
  --bg-primary: #111827;
  --bg-secondary: #1F2937;
  --bg-tertiary: #374151;
  --text-primary: #F9FAFB;
  --text-secondary: #E5E7EB;
  --text-muted: #9CA3AF;
}
```

## 📏 Grid System

12-column grid with responsive adjustments:
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 768px) {
  .container { padding: 0 24px; }
}

@media (min-width: 1024px) {
  .container { padding: 0 32px; }
}
```

## ✨ Special Effects

### Gold Shimmer
```css
.gold-shimmer {
  background: linear-gradient(
    90deg,
    #FFD700 0%,
    #FFF3B8 50%,
    #FFD700 100%
  );
  background-size: 200% 100%;
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Neon Glow
```css
.neon-glow {
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.6),
    0 0 30px rgba(255, 215, 0, 0.4);
}
```

## 🎯 Accessibility

- Minimum contrast ratio: 4.5:1 (AA)
- Focus indicators on all interactive elements
- Keyboard navigation support
- Screen reader friendly labels
- Alternative text for all images
- Proper heading hierarchy
- ARIA labels where needed

---

*Design System Version: 1.0*
*Last Updated: January 2024*