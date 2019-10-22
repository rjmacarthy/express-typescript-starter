import * as http from 'http'
import { DB_CONNECTION_STRING, PORT, USE_DB } from './var/config'
import { Socket } from './socket/index'
import app from './server'

const server: http.Server = new http.Server(app)
const socket = new Socket(server)

server.listen(PORT)

server.on('error', (e: Error) => {
  console.log('Error starting server' + e)
})

server.on('listening', () => {
  if (USE_DB) {
    console.log(
      `Server started on port ${PORT} on env ${process.env.NODE_ENV ||
        'dev'} dbcon ${DB_CONNECTION_STRING}`,
    )
  } else {
    console.log(
      `Server started on port ${PORT} on env ${process.env.NODE_ENV ||
        'dev'}`,
    )
  }
})

export default {
  server,
  socket,
}
