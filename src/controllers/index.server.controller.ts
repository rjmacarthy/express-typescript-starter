import { Request, Response } from 'express'

export default class IndexController {
  public index(_: Request, res: Response): void {
    res.render('index', { title: 'Express' })
  }

  public msg(_: Request, res: Response): void {
    res.json({ msg: 'Hello!' })
  }
}

export const indexController = new IndexController()
