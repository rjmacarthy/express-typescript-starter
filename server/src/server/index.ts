import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as logger from 'morgan'
import * as path from 'path'

const cors = require('cors');

import { ROUTES_DIR } from '../var/config'
import { globFiles } from '../helpers'

const app: express.Express = express()

app.use(cors); /* NEW */
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../../src/public')))

for (const route of globFiles(ROUTES_DIR)) {
  require(path.resolve(route)).default(app)
}

export default app
