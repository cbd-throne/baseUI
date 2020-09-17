const getWebpackConfig = require('./base.webpack.js')

const webpackConfig = getWebpackConfig(false);



module.exports = [...webpackConfig]