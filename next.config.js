/* eslint-disable */
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const { withPlugins } = require('next-compose-plugins');

module.exports = withPlugins([], {
  // no free advertising on my watch
  poweredByHeader: false,

  // env variables to propagate to the client (public info)
  env: {},
});
