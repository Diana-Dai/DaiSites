/* eslint-disable import/no-extraneous-dependencies */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [`${paths.src}/js/index.js`],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      title: 'home',
      favicon: `${paths.src}/assets/imgs/favicon.ico`,
      template: `${paths.src}/index.ejs`, // template file
      filename: 'index.html', // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader',
      },
      // Images: Copy image files to build folder
      // Produce all the background in css to a new file
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/background/[name][ext]',
        },
      },

      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[name][ext]',
        },
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: `${paths.src}`, // 指定检查的目录
        options: {
          // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
        },
      },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
    },
  },
};
