/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.mustache',
    './assets/**/*.js'
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.green.400'),
              '&:hover': {
                color: theme('colors.green.300'),
              },
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.200'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.gray.700'),
            },
            table: {
              width: '75%',
              fontSize: theme('fontSize.sm')[0],
              lineHeight: theme('fontSize.sm')[1].lineHeight,
            },
            thead: {
              color: theme('colors.gray.100'),
              borderBottomColor: theme('colors.gray.600'),
            },
            'thead th': {
              paddingTop: theme('spacing.3'),
              paddingBottom: theme('spacing.3'),
              paddingLeft: theme('spacing.4'),
              paddingRight: theme('spacing.4'),
              backgroundColor: theme('colors.gray.700'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.700'),
            },
            'tbody tr:last-child': {
              borderBottomWidth: '0',
            },
            'tbody td': {
              paddingTop: theme('spacing.2'),
              paddingBottom: theme('spacing.2'),
              paddingLeft: theme('spacing.4'),
              paddingRight: theme('spacing.4'),
            },
            'tbody td:first-child': {
              paddingLeft: theme('spacing.4'),
            },
            'tbody td:last-child': {
              paddingRight: theme('spacing.4'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
