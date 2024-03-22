/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {},
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant('aria-invalid', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `aria-invalid${separator}${className}`
          )}[aria-invalid="true"]`
        })
      })
    }),
  ],
}
