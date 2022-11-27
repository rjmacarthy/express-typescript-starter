import { Express } from 'express'
import { elevatorController } from '../controllers/elevator.controller'

export default class IndexRoute {
  constructor(app: Express) {
    app.get('/elevator/', elevatorController.index)
    app.get('/elevator/which', elevatorController.which)
  }
}
