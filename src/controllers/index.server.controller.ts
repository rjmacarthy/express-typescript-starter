import { Scheduler } from '../models/Scheduler';
import { Request, Response } from 'express'
import { Direction, Elevator } from '../models/Elevator'
import { CustomEvaluator } from '../models/CustomEvaluator';



export default class IndexController {
  public async index(req: Request, res: Response, next: Function): Promise<void> {

    const e1 = new Elevator()
    const e2 = new Elevator()

    const elevators = [e1, e2];

    // e1.moveToFloor(8, Direction.Up);
    // e1.moveToFloor(2, Direction.Down);

    const evaluator = new CustomEvaluator();
    const engine = new Scheduler(evaluator, elevators, 10);


    res.json({
      ok: true, elevator: engine.whichElevator(1, 10)
    })
  }

  public msg(req: Request, res: Response): void {
    res.json({ msg: 'Hello!' })
  }
}

export const indexController = new IndexController()
