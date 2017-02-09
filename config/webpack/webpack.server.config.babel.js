import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

import baseConfig from './webpack.base.config';

module.exports = Object.assign({}, baseConfig, {
  target: 'node',
  devtool: false,
  entry: './src/server/index.ts',
  output: Object.assign({}, baseConfig.output, {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  }),
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
    }),
  ],
});
