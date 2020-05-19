const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: './',
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100
  },

  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }, {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
        }
      },
    ]
  }
};
