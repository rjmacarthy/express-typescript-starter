import { BuildingService } from './../services/BuildingService';
import { Request, Response } from 'express'



const _buildingService = new BuildingService();
export default class ElevatorController {

  public async index(req: Request, res: Response, next: Function): Promise<void> {
    // IDE, STANDBY, 1
    // const floors = 10;
    // const e1 = new Elevator(1);
    // const e2 = new Elevator(floors);

    // const elevators = [e1, e2];

    // // e1.moveToFloor(8, Direction.Up);
    // // e1.moveToFloor(2, Direction.Down);

    // const evaluator = new CustomEvaluator();
    // const engine = new Scheduler(evaluator, elevators, floors);

    // engine.run();
    // engine.requestMove(1, 8);
    // engine.requestMove(1, 2);
    // engine.requestMove(10, 1);
    // engine.requestMove(2, 10);

    res.json({
      ok: true,
      data: _buildingService.status()
    });
  }

  public which(req: Request, res: Response): Response<any> {

    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        ok: false,
        message: '[from, to] query params is required',
      });
    }

    try {
      const elevator = _buildingService.whichElevator(Number(from), Number(to));
      return res.json({ msg: 'Hello!', params: { from, to }, elevator })

    } catch (error) {
      console.error("ElevatorController.which: failure occurs", error);
      return res.status(500).send({ error: "Something went wrong" });
    }

  }
}

export const elevatorController = new ElevatorController();
