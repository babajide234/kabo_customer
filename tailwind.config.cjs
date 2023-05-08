/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg': "linear-gradient(180.36deg, rgba(255, 71, 11, .1) 74.08%, #FF470B 100.09%),url('../src/assets/bg.png')",
        'auth-bg': "url('../src/assets/bg.png')",
      },
      colors: {
        'default':'#F5F5F8',
        'dark':'#000000',
        'primary':'#0d0a63'
      }, 
      boxShadow:{
        'card': '0px 30px 60px rgba(57, 57, 57, 0.1)'
      }
    },
  },
  plugins: [],
}
