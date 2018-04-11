/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import express  from 'express'
import morgan   from 'morgan'
import http     from 'http'
import fs       from 'fs'
import { join } from 'path'

// import React    from 'react'
// import { renderToString } from 'react-dom/server'
// import { StaticRouter } from 'react-router-dom'
import { render } from 'ejs'

import { PORT, SSL, DIST_PATH, APP_NAME } from '../common/env'
import { ForceSSLMiddleware } from './middleware'

class Server {
  constructor () {
    this.app = express()
    this.server = http.createServer(this.app)
    this.fs = fs
    this.template = join(DIST_PATH, 'server/templates/index.ejs')
    this.staticPath = join(DIST_PATH, 'static')

    this.app.disable('x-powered-by')
    this.app.use(morgan('combined'))

    SSL && this.app.use(ForceSSLMiddleware)

    this.app.set('view engine', 'ejs')
  }

  start (port, callback) {
    this.app.use(express.static(this.staticPath))

    this.app.get('*', (req, res, next) => {
    //   const { App } = this
    //   const context = {}
    //   const app = (
    //     <StaticRouter context={context} location={req.url}>
    //       <App />
    //     </StaticRouter>
    //   )
      this.fs.readFile(this.template, 'utf-8', (err, data) => {
        if (err) {
          next(err)
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          // res.end(render(data, { app: renderToString(app) }))
          res.end(render(data, { app: '', title: APP_NAME }))
        }
      })
    })

    this.server.listen(port, callback)
  }

  stop (callback) {
    this.server.close(callback)
  }
}

export default Server

/* Auto starting server when executed instead of imported */
if (require.main === module) {
  const server = new Server()
  server.start(PORT, console.info(`Self-started server on port ${PORT}`))
}
