const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

const babelOptions = {
  plugins: ['@vue/babel-plugin-jsx'],
}

module.exports = {
  mode: 'production',
  stats: 'verbose',
  entry: path.resolve(__dirname, '../packages/index.ts'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/',
    filename: 'index.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'BaseUI',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsxSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
  },
  externals: {
    vue: 'vue',
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}