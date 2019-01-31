const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './static/js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // new htmlWebpackPlugin({ template: './static/html/user/registration.html' }),
    // new htmlWebpackPlugin({ template: './static/html/index.html' }),
    /* eslint-disable new-cap */
    new htmlWebpackPlugin({
      // chunks: ['page1'],
      filename: './static/html/user/login.html',
      template: './static/html/user/login.html',
    }),
    new htmlWebpackPlugin({
      // chunks: ['page2'],
      filename: './static/html/user/registration.html',
      template: './static/html/user/registration.html',
    }),
    new htmlWebpackPlugin({
      filename: './static/html/user/home.html',
      template: './static/html/user/home.html',
    }),
    new htmlWebpackPlugin({
      filename: './static/html/note/notes.html',
      template: './static/html/note/notes.html',
    }),
    new htmlWebpackPlugin({
      filename: './static/html/trello/boards.html',
      template: './static/html/trello/boards.html',
    }),
    new htmlWebpackPlugin({
      filename: './static/html/trello/lists.html',
      template: './static/html/trello/lists.html',
    }),
    new htmlWebpackPlugin({
      filename: './static/html/slack/channels.html',
      template: './static/html/slack/channels.html',
    }),
    new htmlWebpackPlugin({
      filename: './static/html/slack/messages.html',
      template: './static/html/slack/messages.html',
    }),
  ],
  watch: true,
};
