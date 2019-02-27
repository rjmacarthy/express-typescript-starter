import { Server } from 'http';
import * as socket from 'socket.io';

export class Socket {
  io: socket.Server;

  constructor(http: Server) {
    this.io = socket(http);
    this.connect();
  }

  connect() {
    this.io.on('connection', (socket: socket.Socket) => {
      console.info(`Socket connected : ${socket.id}`)
      this.handlers(socket);
    });
  }

  handlers(socket: socket.Socket) {
    socket.on('disconnect', () => {
      console.info(`Socket disconnected : ${socket.id}`);
    });
  }
}