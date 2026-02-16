/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1d1d1d', // Validated User Request
        surface: '#262626', // Lighter than BG for Cards
        'surface-highlight': '#333333',
        brand: {
          dark: '#1d1d1d', // Text on Gold
          light: '#ffffff',
          gold: '#FFDD59', // Validated User Request
        },
        accent: {
          DEFAULT: '#FFDD59', // Primary Brand Color mapped to accent utility
          green: '#10B981', // Success
          red: '#EF4444', // Error
          orange: '#F59E0B', // Warning
        },
        glass: 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // Removed Serif as per protocol
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
    },
  },
  plugins: [],
}
