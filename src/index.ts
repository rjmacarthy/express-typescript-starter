require('dotenv').config()
import * as http from 'http'
import { DB, PORT } from './var/config'
import { Socket } from './socket/index'
import app from './server'

const server: http.Server = http.createServer(app)
const socket = new Socket(server)

server.listen(PORT)

server.on('error', (e: Error) => {
  console.log('Error starting server' + e)
})

server.on('listening', () => {
  if (DB) {
    console.log(
      `Server started on port ${PORT} on env ${process.env.NODE_ENV ||
        'dev'} dbcon ${DB}`,
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
