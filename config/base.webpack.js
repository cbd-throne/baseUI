const { getProjcetPath, resolve } = require('./util')

const path = require('path')
const webpack = require('webpack')
const webpackBar = require('webpackbar')
const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将 CSS 提取到单独的文件中
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css文件
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); // 处理不同系统大小写问题
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const postcssConfig = require('./postcssConfig');

const svgRegex = /\.svg(\?v=\d+\.\d+\.\d+)?$/;
const svgOptions = {
  limit: 10000,
  minetype: 'image/svg+xml',
};

const imageOptions = {
  limit: 10000
}

function getWebpackConfig (modules) {
  const pkg = require(getProjcetPath('package.json'))
  const babelConfig = require('./babel.config.js')(modules || false)
  
  babelConfig.plugins.push([
    resolve('babel-plugin-import'),
    {
      style: true,
      libraryName: pkg.name,
      libraryDirectory: 'components',
    }
  ])

  const config = {
    devtool: 'source-map',

    output: {
      path: getProjcetPath('./dist/'),
      filename: '[name].js'
    },

    resolve: {
      modules: ['node_modules'],
      extensions: [
        '.web.tsx',
        '.web.ts',
        '.web.jsx',
        '.web.js',
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
      ],
      alias: {
        [pkg.name]: process.cwd(), // pck.name == baseui
      },
    },

    node: [
      'child_process',
      'cluster',
      'dgram',
      'dns',
      'fs',
      'module',
      'net',
      'readline',
      'repl',
      'tls',
    ].reduce(
      (acc, name) => ({
        ...acc,
        [name]: 'empty',
      }),
      {}
    ),

    module: {
      noParse: [/moment.js/], // webpack 不对这些文件进行解析
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/, // 不解析node_modules
          loader: resolve('babel-loader'),
          options: babelConfig
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: resolve('babel-loader'),
              options: babelConfig,
            },
            {
              loader: resolve('ts-loader'),
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css?$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ...postcssConfig,
                sourceMap: true,
              },
            }
          ]
        },
        {
          test: /\.less?$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ...postcssConfig,
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
                sourceMap: true,
              }
            }
          ]
        },
        {
          test: svgRegex,
          loader: 'url-loader',
          options: svgOptions,
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: 'url-loader',
          options: imageOptions
        }
      ]
    },

    plugins: [
      new CaseSensitivePathsPlugin(),
      new webpack.BannerPlugin(`
${pkg.name}======v${pkg.version}
      `),
      new webpackBar({
        name: 'baseui',
        color: '#2f54eb'
      })
    ],

    performance: {
      hints: false
    }
  }

  return config

}

getWebpackConfig.webpack = webpack
getWebpackConfig.svgRegex = svgRegex
getWebpackConfig.svgOptions = svgOptions;
getWebpackConfig.imageOptions = imageOptions;

module.exports = getWebpackConfig