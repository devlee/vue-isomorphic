/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';
import MFS from 'memory-fs';

import clientConfig from './webpack.client.config.babel';
import serverConfig from './webpack.server.config.babel';
import webpackDevMiddleware from './koa2/dev';
import webpackHotMiddleware from './koa2/hot';

export default function setupDevServer(app, opts) {
  // modify client config to work with hot middleware
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
  clientConfig.output.filename = '[name].js';
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin());

  // dev middleware
  const clientCompiler = webpack(clientConfig);
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
    },
  });
  app.use(devMiddleware);
  clientCompiler.plugin('done', () => {
    const fs = devMiddleware.fileSystem;
    const filePath = path.join(clientConfig.output.path, 'index.html');
    if (fs.existsSync(filePath)) {
      const index = fs.readFileSync(filePath, 'utf-8');
      opts.indexUpdated(index);
    }
  });

  // hot middleware
  app.use(webpackHotMiddleware(clientCompiler));

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS();
  const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename);
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    const statsJson = stats.toJson();
    statsJson.errors.forEach((err2) => { console.error(err2); });
    statsJson.warnings.forEach((err2) => { console.warn(err2); });
    opts.bundleUpdated(mfs.readFileSync(outputPath, 'utf-8'));
  });
}
