/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { join } from 'path'
import chokidar from 'chokidar'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import { SRC_PATH, PORT } from '../src/common/env'
import webpackConfig from '../config/webpack'
import Server from '../src/server'

class DevServer extends Server {
  constructor () {
    super()

    this.compiler = webpack(webpackConfig)
    this.app.use([
      webpackDevMiddleware(this.compiler, {
        // logLevel: 'warn',
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
      }),
      webpackHotMiddleware(this.compiler, {
        // log: console.log, // default
        // path: '/__webpack_hmr', // default
        heartbeat: 5 * 1000,
      }),
    ])

    this.path = `${SRC_PATH}/client`

    this.fs = this.compiler.outputFileSystem
    this.template = join(this.compiler.outputPath, '../server/templates/index.ejs')
    this.watcher = chokidar.watch(this.path)
  }

  start (port, callback) {
    // this.watcher.on('change', () => {
    //   Object.keys(require.cache).forEach(key => { delete require.cache[key] })
    //   import(`${this.path}/app`).then(module => { this.App = module.default })
    // })
    super.start(port, callback)
  }
}

export default DevServer

/* Auto starting server when executed instead of imported */
if (require.main === module) {
  const server = new DevServer()
  server.start(PORT, console.info(`Self-started ｢dev｣ server on port ${PORT}`))
}
