import { Request, Response } from 'express';
import {IUser, User} from '../models/user.server.model';

export default class IndexController {
    public static read(req: Request, res: Response, next: Function): void {
        res.render('index', { title: 'Express' });
        const m = new User();
        
    }
}