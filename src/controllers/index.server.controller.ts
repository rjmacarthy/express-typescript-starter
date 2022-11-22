import { Request, Response } from 'express'
import { Direction, Elevator } from '../models/Elevator'



export default class IndexController {
  public async index(req: Request, res: Response, next: Function): Promise<void> {

    const e1 = new Elevator()
    const e2 = new Elevator()

    e1.moveToFloor(8, Direction.Up);
    e1.moveToFloor(2, Direction.Down);

    res.json({
      ok: true, data: [
        e1,
        e2,
      ]
    })
  }

  public msg(req: Request, res: Response): void {
    res.json({ msg: 'Hello!' })
  }
}

export const indexController = new IndexController()
