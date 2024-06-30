/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.mustache',
    './assets/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
