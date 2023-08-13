/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        squish: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(.85)' },
        },
        gradientAnimation: {
          '0%': {
            'background-position': '0% 0%'
          },
          '50%': {
            'background-position': '0% 50%'
          },
          '100%': {
            'background-position': '100% 50%'
          }
        }
      }
    },
    animation: {
      squish: 'squish 2s ease-in-out infinite',
      gradient: 'gradientAnimation 15s ease infinite'
    }
  },
  plugins: [],
}

