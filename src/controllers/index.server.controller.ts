import { Request, Response } from 'express';

export default class IndexController {
    public static read(req: Request, res: Response, next: Function): void {
        res.render('index', { title: 'Express' });
    }
}