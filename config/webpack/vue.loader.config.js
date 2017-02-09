import cssnext from 'postcss-cssnext';

export default {
  preserveWhitespace: false,
  esModule: true,
  cssModules: {
    localIdentName: '[path][name]---[local]---[hash:base64:5]',
    camelCase: true,
  },
  postcss: [
    cssnext(),
  ],
};
