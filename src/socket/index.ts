import { Server } from 'http'
import * as socket from 'socket.io'

export class Socket {
  public io: socket.Server

  constructor(http: Server) {
    this.io = socket(http)
    this.connect()
  }

  public connect() {
    this.io.on('connection', (socket: socket.Socket) => {
      // tslint:disable-next-line: no-console
      console.info(` connected : ${socket.id}`)
      this.handlers(socket)
    })
  }

  public handlers(socket: socket.Socket) {
    socket.on('disconnect', () => {
      // tslint:disable-next-line: no-console
      console.info(`Socket disconnected : ${socket.id}`)
    })
  }
}
