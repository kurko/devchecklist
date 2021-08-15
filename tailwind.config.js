module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require("@tailwindcss/typography")
  ],
}
