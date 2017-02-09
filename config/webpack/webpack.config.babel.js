import path from 'path';

/**
 * baseDir
 *
 * `__dirname` is the releative path of this file,
 * so we use path.resolve to format the releative path
 * `__dirname + '../..'` to be an absolute path,
 * it is the root directory of this project
*/
const baseDir = path.resolve(__dirname, '../..');

const base = {
  cache: true,
  /**
   * context
   * The absolute path of base directory.
   */
  context: baseDir,
  entry: {
    client: './src/client',
  },
  output: {
    path: path.resolve(baseDir, './dist'),
    filename: '[name]-[chunkhash].js',
  },
  resolve: {
    extensions: [
      '.ts',
      '.vue',
    ],
    modules: [
      path.resolve(baseDir, './src'),
      'node_modules',
    ],
  },
  module: {
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
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              esModule: true,
            },
          },
        ],
      },
    ],
  },
};

export default base;
