/* eslint-disable */

var resolve = require('path').resolve;
var PATH = process.env.DIST_PATH || resolve(__dirname, 'dist');

try {
  var { PORT } = require(`${PATH}/common/env`);
  var Server = require(`${PATH}/server`).default;
  var name = require('./package.json').name;
  var server = new Server();
  server.start(PORT, () => console.log(`${name} listening on port ${PORT}`));
} catch (error) {
  console.error('-- Unable to start the server --\n');
  console.error(error);
}
