/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary color from design
        primary: {
          DEFAULT: '#ec6d13',
          50: '#fef7f4',
          100: '#fdeee6',
          200: '#fbd4c1',
          300: '#f9ba9c',
          400: '#f58d52',
          500: '#ec6d13',
          600: '#d45c0f',
          700: '#b14d0d',
          800: '#8f3e0b',
          900: '#753209',
        },
        // CulturaCart Brand Colors - Authentic Wanderlust Theme
        terracotta: {
          50: '#fef6f4',
          100: '#fde9e3',
          200: '#fbd0c3',
          300: '#f8b6a3',
          400: '#e59f88',
          500: '#C97C5D', // Main terracotta
          600: '#b66748',
          700: '#974f38',
          800: '#7a3f2d',
          900: '#643326',
        },
        sand: {
          50: '#fefdfb',
          100: '#fdfbf8',
          200: '#faf6ed',
          300: '#f7f1e2',
          400: '#f5edda',
          500: '#F2E8D5', // Main sand beige
          600: '#dac896',
          700: '#c2a85e',
          800: '#9d8847',
          900: '#7e6d38',
        },
        olive: {
          50: '#f6f7f5',
          100: '#eceeed',
          200: '#d0d4cd',
          300: '#b4bbad',
          400: '#94a08a',
          500: '#758467', // Main olive green
          600: '#65725a',
          700: '#53604a',
          800: '#434d3c',
          900: '#363f31',
        },
        ocean: {
          50: '#f3f6f9',
          100: '#e6ebf2',
          200: '#c0cee0',
          300: '#99b0cd',
          400: '#7290b9',
          500: '#4A6FA5', // Main ocean blue
          600: '#3f5f90',
          700: '#344f77',
          800: '#2a3f5f',
          900: '#22334e',
        },
        gold: {
          50: '#fcf9f1',
          100: '#f9f2e1',
          200: '#f3e0b5',
          300: '#edce89',
          400: '#e7bc5d',
          500: '#E0AA3E', // Main gold accent
          600: '#c99123',
          700: '#a8761c',
          800: '#875e17',
          900: '#6e4d13',
        },
        background: {
          DEFAULT: '#FAF9F6', // Off-white background
          light: '#FFFFFF',
          warm: '#F5F3EF',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'warm': '0 4px 12px rgba(201, 124, 93, 0.15)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
}
