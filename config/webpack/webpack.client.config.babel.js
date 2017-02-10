/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLPlugin from 'html-webpack-plugin';
import SWPrecachePlugin from 'sw-precache-webpack-plugin';

import baseConfig from './webpack.base.config';
import vueLoaderConfig from './vue.loader.config';

const NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');

const clientConfig = Object.assign({}, baseConfig, {
  plugins: (baseConfig.plugins || []).concat([
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': NODE_ENV,
      'process.env.VUE_ENV': '"client"',
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    // generate output HTML
    new HTMLPlugin({
      template: 'src/index.template.html',
    }),
  ]),
});

if (process.env.NODE_ENV === 'production') {
  // vueLoaderConfig.loaders = {
  //   css: ExtractTextPlugin.extract({
  //     loader: 'css-loader',
  //     fallbackLoader: 'vue-style-loader',
  //   }),
  //   postcss: ExtractTextPlugin.extract({
  //     loader: 'css-loader!postcss-loader',
  //     fallbackLoader: 'vue-style-loader',
  //   }),
  // };

  clientConfig.plugins.push(
    new ExtractTextPlugin('styles.[hash].css'),
    // this is needed in webpack 2 for minifying CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new SWPrecachePlugin({
      cacheId: 'vue-isomorphic',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/],
    }));
}

export default clientConfig;
