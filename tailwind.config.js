/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        squish: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(.85)' },
        }
      },
      animation: {
        squish: 'squish 2s ease-in-out infinite'
      },
      colors: {
        primary: 'rgb(131,58,180)'
      }
    },
  },
  plugins: [],
}

