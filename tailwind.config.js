/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        matrix: {
          green: '#00ff41',
          dark: '#0d1117',
        }
      },
      animation: {
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'glow': {
          '0%': { textShadow: '0 0 5px #00ff41, 0 0 10px #00ff41' },
          '100%': { textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41' }
        }
      }
    },
  },
  plugins: [],
}