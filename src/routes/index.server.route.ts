import { Express } from 'express'
import { indexController } from '../controllers/index.server.controller'

class IndexRouter {
  register(app: Express) {
    app.get('/', indexController.index)
    app.get('/msg', indexController.msg)
  }
}

export default new IndexRouter()