import { Scheduler } from '../models/Scheduler';
import { Request, Response } from 'express'
import { Direction, Elevator, Status } from '../models/Elevator'
import { CustomEvaluator } from '../models/CustomEvaluator';



export default class IndexController {
  public async index(req: Request, res: Response, next: Function): Promise<void> {
    // IDE, STANDBY, 1
    const floors = 10;
    const e1 = new Elevator(floors, Status.Idle);
    const e2 = new Elevator(floors, Status.Idle);

    const elevators = [e1, e2];

    // e1.moveToFloor(8, Direction.Up);
    // e1.moveToFloor(2, Direction.Down);

    const evaluator = new CustomEvaluator();
    const engine = new Scheduler(evaluator, elevators);

    engine.run();

    engine.requestMove(1, 8);
    engine.requestMove(1, 2);

    res.json({
      ok: true, elevator: engine.whichElevator(1, floors)
    })
  }

  public msg(req: Request, res: Response): void {
    res.json({ msg: 'Hello!' })
  }
}

export const indexController = new IndexController()
