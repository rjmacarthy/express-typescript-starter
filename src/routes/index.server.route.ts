import { Express } from 'express'
import { indexController } from '../controllers/index.server.controller'

export default class IndexRoute {
  constructor(app: Express) {
    app.get('/', indexController.index)
    app.get('/msg', indexController.msg)
  }
}
