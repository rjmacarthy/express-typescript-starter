import { Express } from "express";
import IndexController from "../controllers/index.server.controller";

export default class IndexRoute {
	constructor(app: Express) {
		app.route("/")
			.get(IndexController.read);
	}
}