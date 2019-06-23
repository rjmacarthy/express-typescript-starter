import { Server } from 'http'
import * as socket from 'socket.io'

export class Socket {
  public io: socket.Server

  constructor(http: Server) {
    this.io = socket(http)
    this.connect()
  }

  public connect() {
    this.io.on('connection', (s: socket.Socket) => {
      // tslint:disable-next-line: no-console
      console.info(` connected : ${s.id}`)
      this.handlers(s)
    })
  }

  public handlers(s: socket.Socket) {
    s.on('disconnect', () => {
      // tslint:disable-next-line: no-console
      console.info(`Socket disconnected : ${s.id}`)
    })
  }
}
