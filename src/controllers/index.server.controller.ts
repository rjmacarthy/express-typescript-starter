import { Request, Response } from 'express';

export default class IndexController {
    public static read(req: Request, res: Response, next: Function): void {
        res.render('index', { title: 'Express' });
    }

    public static get(req: Request, res: Response): void {
        res.json({msg : 'Hello!'});
    }
}