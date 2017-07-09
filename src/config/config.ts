import { sync } from "glob";
import { union } from "lodash";

export default class Config {
	public static port: number = 3000;
	public static routes: string = "./dist/routes/**/*.js";
	public static models: string = "./dist/models/**/*.js";

	public static globFiles(location: string): string[] {
		return union([], sync(location));
	}
}