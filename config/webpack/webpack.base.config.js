import path from 'path';

import vueLoaderConfig from './vue.loader.config';

/**
 * baseDir
 *
 * `__dirname` is the releative path of this file,
 * so we use path.resolve to format the releative path
 * `__dirname + '../..'` to be an absolute path,
 * it is the root directory of this project.
 */
const baseDir = path.resolve(__dirname, '../..');

/**
 * baseConfig
 *
 * It is the base config of webpack.
 */
const baseConfig = {
  cache: true,
  /**
   * context
   *
   * The absolute path of base directory.
   */
  context: baseDir,
  devtool: '#source-map',
  entry: {
    app: './src/client/index.ts',
    vendor: [
      'es6-promise',
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync',
    ],
  },
  output: {
    path: path.resolve(baseDir, './dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      public: path.resolve(baseDir, './public'),
      'normalize.css': path.resolve(baseDir, './node_modules/normalize.css/normalize.css'),
    },
    extensions: [
      '.ts',
      '.vue',
      '.js',
    ],
    modules: [
      path.resolve(baseDir, './src'),
      'node_modules',
    ],
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: vueLoaderConfig,
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.pcss$/,
        use: [
          {
            loader: 'vue-style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
};

export default baseConfig;
