/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'
// import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import {
  SRC_PATH, DIST_PATH, MODULES_PATH, CONF_PATH,
  ENTRY, APP_NAME, BASE_URL, INDEX_TEMPLATE,
  NODE_ENV, DEV_MODE,
} from '../src/common/env'

const webpackConfig = {
  mode: NODE_ENV,
  entry: {
    app: [ENTRY],
  },
  output: {
    path: `${DIST_PATH}/static`,
    publicPath: '/',
    filename: DEV_MODE ? '[name].bundle.js' : '[name].[chunkhash].js',
    sourceMapFilename: DEV_MODE ? '[name].map.js' : '[name].[chunkhash].js.map',
  },
  resolve: {
    modules: [SRC_PATH, MODULES_PATH],
    extensions: [
      '.jsx',
      '.js',
      '.json',
      '.tsx',
      '.ts',
    ],
  },
  devtool: DEV_MODE ? 'inline-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // use: [
        //   'style-loader',
        //   // MiniCssExtractPlugin.loader,
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       modules: true,
        //       importLoaders: 2,
        //       sourceMap: true,
        //     },
        //   },
        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       sourceMap: true,
        //       config: {
        //         path: `${CONF_PATH}/postcss.config.js`,
        //       },
        //     },
        //   },
        //   {
        //     loader: 'sass-loader',
        //     options: {
        //       sourceMap: true,
        //       includePaths: [SRC_PATH],
        //     },
        //   },
        // ],
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'], // + eslint
        exclude: /node_modules/,
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.woff2?$/,
        loader: 'url-loader?name=fonts/[name].[ext]&limit=10000'
        + '&mimetype=application/font-woff',
      },
      {
        test: /fonts\/.+\.(ttf|eot|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: DEV_MODE ? 'styles/[name].css' : 'styles/[name].[hash].css',
    //   chunkFilename: DEV_MODE ? 'styles/[id].css' : 'styles/[id].[hash].css',
    // }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'API_SSL',
      'API_HOST',
      'API_PORT',
      'APP_NAME',
      'APP_DOMAIN',
    ]),
    new HtmlWebpackPlugin({
      title: 'Hot Module Reload'
    }),
    // new HtmlWebpackPlugin({
    //   hash: false,
    //   inject: true,
    //   filename: '../server/templates/index.ejs',
    //   title: APP_NAME,
    //   template: `html-loader!${INDEX_TEMPLATE}`,
    //   environment: NODE_ENV,
    // }),
    // new SWPrecacheWebpackPlugin({
    //   cacheId: APP_NAME,
    //   dontCacheBustUrlsMatching: /\.\w{8}\./,
    //   filename: 'service-worker.js',
    //   minify: true,
    //   navigateFallback: `${BASE_URL}/index.html`,
    //   staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    // }),
  ],
}

if (NODE_ENV !== 'production') {
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackConfig.entry.app.push('webpack-hot-middleware/client?timeout=10000')
} else {
  webpackConfig.plugins.push(new UglifyJsPlugin({
    sourceMap: true,
    parallel: true,
    uglifyOptions: {
      keep_classnames: false,
      keep_fnames: false,
      output: {
        comments: false,
        beautify: false,
      },
    },
  }))
}

export default webpackConfig
