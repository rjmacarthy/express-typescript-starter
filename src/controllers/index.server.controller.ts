"use strict";
/// <reference path="../../typings/main.d.ts" />
import * as express from "express";

export default class IndexController {
    public static read(req: express.Request, res: express.Response, next: Function): void {
        res.render("index", { title: "Express" });
    }
}