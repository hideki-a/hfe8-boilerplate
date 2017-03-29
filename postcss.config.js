module.exports = (ctx) => ({
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      'browsers': [
        'last 2 versions',
        'ie 11',
        'Firefox ESR',
        'Android >= 4.2',
      ]
    },
    'perfectionist': ctx.env === 'development' ? {
      'indentChar': '\t',
      'indentSize': 1,
    } : {},
    cssnano: ctx.env === 'production' ? {} : false
  }
});
