const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      'gray':{
        100:'#FAFAFA',
        200:'#DBDBDB'
      },
      'light-blue':'#0095f6',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red:colors.red,
    },
    extend: {},
  },
  plugins: [],
}
