/* eslint-disable import/no-extraneous-dependencies */
import cssnext from 'postcss-cssnext';

import atImport from 'postcss-import';

const isProd = process.env.NODE_ENV === 'production';

const localIdentName = isProd ? '[hash:base64:5]' : '[path][name]---[local]---[hash:base64:5]';

export default {
  preserveWhitespace: false,
  esModule: true,
  cssModules: {
    localIdentName,
    camelCase: true,
  },
  postcss: [
    atImport(),
    cssnext(),
  ],
};
