/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

import baseConfig from './webpack.base.config';

const NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');

module.exports = Object.assign({}, baseConfig, {
  target: 'node',
  devtool: false,
  entry: './src/server/index.ts',
  output: Object.assign({}, baseConfig.output, {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  }),
  resolve: Object.assign({}, baseConfig.resolve, {
    alias: Object.assign({}, baseConfig.resolve.alias, {
      fetch: 'isomorphic-fetch',
    }),
  }),
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': NODE_ENV,
      'process.env.VUE_ENV': '"server"',
    }),
  ],
});
