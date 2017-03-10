module.exports = (ctx) => ({
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      'browsers': [
        'last 2 versions',
        'ie 11',
        'Android >= 4.2',
      ]
    },
    'postcss-nesting': {},
    cssnano: ctx.env === 'production' ? {} : false
  }
});
