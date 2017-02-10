/* eslint-disable import/no-extraneous-dependencies */
import devMiddleware from 'webpack-dev-middleware';

export default (compiler, opts) => {
  const expressMiddleware = devMiddleware(compiler, opts);

  function koaMiddleware(ctx, next) {
    /* eslint-disable no-param-reassign */
    return expressMiddleware(ctx.req, {
      end: (content) => {
        ctx.body = content;
      },
      setHeader: (name, value) => {
        ctx.headers[name] = value;
      },
    }, next);
  }

  Object.keys(expressMiddleware).forEach((p) => {
    koaMiddleware[p] = expressMiddleware[p];
  });

  return koaMiddleware;
};
