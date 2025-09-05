import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1920px',
      },
    },
    extend: {
      screens: {
        'xl': '1300px', // Override xl breakpoint to 1300px for menu
        '2xl': '1536px',
        '3xl': '1920px',
      },
      maxWidth: {
        '8xl': '1920px',
        '9xl': '2048px',
      },
      colors: {
        // Clean, Consistent Color Palette
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Primary - Deep Blue
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#EBF0F7",
          100: "#D6E0EF",
          200: "#ADC1DF",
          300: "#84A2CF",
          400: "#5B83BF",
          500: "#3B5998", // Main color
          600: "#2F477A",
          700: "#23355C",
          800: "#17233D",
          900: "#0C121F",
        },
        
        // Secondary - Light Blue
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#F2F4F8",
          100: "#E5E9F1",
          200: "#CBD2E3",
          300: "#B1BBD5",
          400: "#8B9DC3", // Main color
          500: "#7185A8",
          600: "#5A6B8A",
          700: "#43516C",
          800: "#2C364E",
          900: "#161C30",
        },
        
        // Accent - Light Gray
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#FAFBFC",
          100: "#F5F6F9",
          200: "#EBEDF3",
          300: "#DFE3EE", // Main color
          400: "#CDD3E3",
          500: "#BBC3D8",
          600: "#9BA6C2",
          700: "#7B89AC",
          800: "#5B6C96",
          900: "#3B4F80",
        },
        
        // Destructive (keeping for errors)
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          500: "#EF4444",
          600: "#DC2626",
        },
        
        // Muted
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        // Popover
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        // Card
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Simple grayscale
        gray: {
          50: "#FAFAFA",
          100: "#F7F7F7", // Background color
          200: "#EFEFEF",
          300: "#DFE3EE", // Accent color
          400: "#BFBFBF",
          500: "#8B9DC3", // Secondary color
          600: "#6B6B6B",
          700: "#4A4A4A",
          800: "#3B5998", // Primary color
          900: "#1A1A1A",
        },
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "pulse-slow": "pulse 2s ease-in-out infinite",
      },
      
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        pulse: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
        },
      },
      
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3b5998 0%, #2d4373 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #8b9dc3 0%, #7185a8 100%)',
        'gradient-light': 'linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%)',
        'gradient-accent': 'linear-gradient(135deg, #dfe3ee 0%, #cbd2e3 100%)',
      },
      
      boxShadow: {
        'soft': '0 2px 8px rgba(59, 89, 152, 0.08)',
        'medium': '0 4px 16px rgba(59, 89, 152, 0.15)',
        'large': '0 8px 32px rgba(59, 89, 152, 0.2)',
        'primary': '0 4px 16px rgba(59, 89, 152, 0.15)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
} satisfies Config

export default config