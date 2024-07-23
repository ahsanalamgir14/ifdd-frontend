const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/assets/images/hero.png')",
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        ...defaultTheme.colors,
        primary: '#062172', // Couleur Bleu foncé
        accent: '#fdcd01', // Couleur jaune des liens inscriptions et connexion
        secondary: '#4878c0', // Couleur de base du sidebar de ma page carto
        'secondary-light': '#c5dbe8'
      }
      /* colors: {
        ...defaultTheme.colors,
        primary: '#255033',
        accent: '#fdcd01',
        secondary: '#70af85',
        'secondary-light': '#ecf8ed'
      } */
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
