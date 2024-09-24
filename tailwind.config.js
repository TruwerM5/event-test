/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {
   
    extend: {
      colors: {
        primary: '#351768',
        'primary-dark': '#211536'
      },
      
      fontFamily: {
        'primary': ['montserrat'],
        DEFAULT: ['montserrat'],
      },
      fontSize: {
        DEFAULT: '16px',
        base: '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '40px'
      },
    },
  },
  plugins: [],
}

