import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as logger from 'morgan'
import * as path from 'path'

import { DB, MODELS_DIR, ROUTES_DIR } from '../var/config'
import { globFiles } from '../helpers'
import connect from '../database'

const app: express.Express = express()

for (const model of globFiles(MODELS_DIR)) {
  require(path.resolve(model))
}

DB && connect(DB)

app.set('views', path.join(__dirname, '../../src/views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../../src/public')))

for (const route of globFiles(ROUTES_DIR)) {
  require(path.resolve(route)).default(app)
}

export default app
