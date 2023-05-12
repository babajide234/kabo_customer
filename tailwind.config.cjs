/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {

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
