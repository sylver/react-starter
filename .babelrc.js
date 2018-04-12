var babelConfig = require('./config/babel.config.js')

module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV === 'production')
  return babelConfig()
}
