export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {
      flexbox: true,
      grid: true,
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'IE 11',
        'not dead'
      ],
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}
