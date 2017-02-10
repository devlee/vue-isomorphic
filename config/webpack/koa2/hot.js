/* eslint-disable import/no-extraneous-dependencies */
import hotMiddleware from 'webpack-hot-middleware';
import { PassThrough } from 'stream';

export default (compiler, opts) => {
  const expressMiddleware = hotMiddleware(compiler, opts);

  return (ctx, next) => {
    const stream = new PassThrough();
    /* eslint-disable no-param-reassign */
    ctx.body = stream;
    return expressMiddleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (state, headers) => {
        ctx.state = state;
        ctx.set(headers);
      },
    }, next);
  };
};
