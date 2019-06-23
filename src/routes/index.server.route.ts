import { Express } from 'express'
import { indexController } from '../controllers/index.server.controller'

export default class IndexRoute {
  constructor(app: Express) {
    app.route('/').get(indexController.index)
    app.route('/msg').get(indexController.msg)
  }
}
