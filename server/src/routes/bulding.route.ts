import { Express } from 'express'
import { buildingController } from '../controllers/building.controller'

export default class IndexRoute {
  constructor(app: Express) {


    app.post('/building/', buildingController.post)
    app.post('/building/:id/start', buildingController.start)
    app.post('/building/:id/stop', buildingController.stop)
    app.post('/building/:id/simulation', buildingController.startSimulation)



    app.get('/building/', buildingController.index)
    app.get('/building/:id', buildingController.get)
    app.get('/building/:id/which', buildingController.which)
    app.get('/building/:id/movePassenger', buildingController.movePassenger)
  }
}
