/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#111111', // Deep grey/almost black workspace
        surface: '#1A1A1A', // Elevated cards
        'surface-highlight': '#232323',
        brand: {
          dark: '#111111',
          light: '#ffffff',
          gold: '#FFDD59',
        },
        accent: {
          DEFAULT: '#FFDD59', 
          green: '#10B981', 
          red: '#EF4444', 
          orange: '#F59E0B', 
        },
        glass: 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        'btn': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem', // For Cards
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(197, 157, 95, 0.15)', // Gold Glow
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
