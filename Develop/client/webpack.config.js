const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders [DONE] and babel to webpack. [DONE]

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin' // CHANGE LATER?
      }),
      new WebpackPwaManifest({
        // FOR LATER! name: 'Text Editor' ??
      }),
      new InjectManifest ({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        // CSS loader
        {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        },
        // Babel
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
      ],
    },
  };
};
