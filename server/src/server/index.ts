import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as logger from 'morgan'
import * as path from 'path'

import * as cors from 'cors';

import { ROUTES_DIR } from '../var/config'
import { globFiles } from '../helpers'

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: process.env.API_URL,
  preflightContinue: false,
};

//use cors middleware

const app: express.Express = express()

app.use(cors(options));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../../src/public')))

for (const route of globFiles(ROUTES_DIR)) {
  require(path.resolve(route)).default(app)
}

export default app
