"use strict";
/// <reference path="../../typings/main.d.ts" />
import * as express from "express";
import IndexController from "../controllers/index.server.controller";

export default class IndexRoute {
	constructor(app : express.Express) {
		IndexRoute.activate(app);
	}
	
	public static activate (app : express.Express) : void {
		app.route("/")
			.get(IndexController.read);
	}
}