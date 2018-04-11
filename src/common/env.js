import { resolve } from 'path'

/* webpack DefinePlugin is unable to do destructuring (yet)
 * https://github.com/webpack/webpack/issues/5392
 */
// const { env } = process

const ROOT = resolve(__dirname, '../../')

export const CONF_PATH = resolve(ROOT, process.env.CONF_PATH || 'config')
export const SRC_PATH = resolve(ROOT, process.env.SRC_PATH || 'src')
export const DIST_PATH = resolve(ROOT, process.env.DIST_PATH || 'dist')
export const MODULES_PATH = resolve(ROOT, 'node_modules')

export const ENTRY = resolve(SRC_PATH, 'client')
export const INDEX = resolve(SRC_PATH, 'server/templates/index.ejs')

export const LISTEN = process.env.LISTEN || '127.0.0.1'
export const PORT = process.env.PORT || 8888
export const SSL = process.env.SSL ? process.env.SSL === 'true' : true

export const BASE_URL = process.env.BASE_URL || 'http://localhost:8888'

export const NODE_ENV = process.env.NODE_ENV || 'production'
export const DEV_MODE = process.env.NODE_ENV !== 'production'

export const APP_NAME = process.env.APP_NAME || 'app'
export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'en'

export const API_SSL = process.env.API_SSL
  ? process.env.API_SSL === 'true'
  : false
export const API_HOST = process.env.API_HOST || 'localhost'
export const API_PORT = process.env.API_PORT || 3000
export const API_PATH_PREFIX = process.env.API_PATH_PREFIX || ''
