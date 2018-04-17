/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import express    from 'express'
import morgan     from 'morgan'
import http       from 'http'
import fs         from 'fs'
import { join }   from 'path'
import { render } from 'ejs'

import React      from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import { PORT, SSL, DIST_PATH, APP_NAME, SSR } from '../common/env'
import { ForceSSLMiddleware } from './middleware'

class Server {
  constructor () {
    this.app = express()
    this.server = http.createServer(this.app)
    this.fs = fs
    this.basePath = DIST_PATH
    this.template = join(this.basePath, 'server/templates/index.ejs')
    this.staticPath = join(this.basePath, 'static')

    this.app.disable('x-powered-by')
    this.app.use(morgan('combined'))

    SSL && this.app.use(ForceSSLMiddleware)

    this.app.set('view engine', 'ejs')
  }

  start (port, callback) {
    this.app.use(express.static(this.staticPath))

    SSR && import(`${this.basePath}/client/app`)
      .then(module => { this.App = module.default })
      .catch(err => { throw new Error(`Unable to import App : ${err}`) })

    this.app.get('*', (req, res, next) => {
      const { App } = this
      const context = {}
      const app = (
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      )
      this.fs.readFile(this.template, 'utf-8', (err, template) => {
        if (err) {
          next(err)
        } else {
          const data = {
            app: SSR ? renderToString(app) : '',
            title: APP_NAME,
          }
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(render(template, data))
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
