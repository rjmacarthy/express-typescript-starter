"use strict";
/// <reference path="../typings/main.d.ts" />

import * as http from "http";
import config from "./config/config";


// Init the express application
const app = require("./config/express").default();

const server: http.Server = http.createServer(app);

server.listen(config.port);

server.on("error", () => {
  console.log("error starting server");
});

server.on("listening", () => {
  console.log("started on port " + config.port);
});