import { Server } from 'http'
import * as socketIo from 'socket.io'

export class Socket {
  public io: socketIo.Server

  constructor(server: Server) {
    this.io = new socketIo.Server(server)
    this.connect()
  }

  public connect() {
    this.io.on('connection', (client: socketIo.Socket) => {
      // tslint:disable-next-line: no-console
      console.info(` connected : ${client.id}`)
      this.handlers(client)
    })
  }

  public handlers(client: socketIo.Socket) {
    client.on('disconnect', () => {
      // tslint:disable-next-line: no-console
      console.info(`Socket disconnected : ${client.id}`)
    })
  }
}
