/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: '350px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1200px',
    },
    colors: {
      'red' : 'rgb(225 45 45)',
      'blue': '#5392F9',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white': '#ffffff',
      'bronze' : '#CF7D4E',
      'silver' : '#BEC2C9',
      'gold' : '#ECC43A',
      'platinum' : '#7488E3',

    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }, 
      boxShadow: {
        '3xl': '0 0 10px 5px rgba(0, 0, 0, 0.3)'
      }
    }
  },
  plugins: [],
}