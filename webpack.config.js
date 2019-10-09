const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  const { NODE_ENV } = process.env;
  const isProduction = NODE_ENV === 'production';

  // Build plugins
  const plugins = [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CopyWebpackPlugin([
      { from: './assets', to: 'assets' }
    ])
  ];

  if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (isProduction) {
    plugins.push(new CompressionPlugin({ deleteOriginalAssets: false }));
  }

  // Return configuration
  return {
    mode: isProduction ? 'production' : 'development',
    entry: { main: './src/index.js' },
    context: path.resolve(__dirname, './'),
    stats: 'normal',
    devtool: isProduction ? '' : 'eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      host: 'localhost',
      port: 8080,
      historyApiFallback: true,
      hot: true,
      inline: true,
      publicPath: '/',
      clientLogLevel: 'none',
      open: true,
      overlay: true,
    },
    output: {
      // contentHash enables us to cache until we alter our code, big benefit to our users.
      chunkFilename: '[name].[contenthash].js',
      // HMR needs a hash and won't work with contenthash
      filename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
    },
    optimization: {
      concatenateModules: process.env.NODE_ENV === 'production',
      splitChunks: {
        automaticNameDelimiter: '-',
        cacheGroups: {
          common: {
            chunks: 'all',
            name: 'common',
            test: /[\\/]src[\\/](common|global|layout)[\\/]/
          },
        },
      },
    },
    plugins,
    resolve: {
      mainFields: ['module', 'main', 'browser'],
      extensions: [".mjs", ".js", ".jsx"]
    },
    stats: "normal",
    module: {
      rules: [
        {
          // This is to support our `graphql` dependency, they expose a .mjs bundle instead of .js
          // Sneaky sneaky sir graphql.
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        }, {
          test: /\.js$|.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
  };
};
