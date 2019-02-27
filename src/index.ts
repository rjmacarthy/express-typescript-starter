import * as http from 'http';
import config from './config/config';
import { Socket } from './socket/index';

const app = require('./config/express').default();

const server: http.Server = new http.Server(app);

new Socket(server);

server.listen(config.port);

server.on('error', (e: Error) => {
  console.log('Error starting server' + e);
});

server.on('listening', () => {
  if (config.useMongo) {
    console.log(`Server started on port ${config.port} on env ${process.env.NODE_ENV || 'dev'} dbcon ${config.mongodb}`);
  } else {
    console.log(`Server started on port ${config.port} on env ${process.env.NODE_ENV || 'dev'}`);
  }
});