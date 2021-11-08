import './database/index.js'
import cors from 'cors'
import express from 'express'
import http from 'http'
import routes from './routes/index.js'
import socketController from './socket.js'

const env = process.env.NODE_ENV || 'local'
const nodeEnvUpper = env.toUpperCase()

const API_HOST = process.env[`${nodeEnvUpper}_API_HOST`]
const API_PORT = process.env[`${nodeEnvUpper}_API_PORT`]
const SOCKET_PORT = process.env[`${nodeEnvUpper}_SOCKET_PORT`]

const app = express()
const socket = http.createServer(app)

const io = socketController(socket)

app.set('socketIo', io)

app.use(express.json())

app.use(cors())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res
      .status(err.status)
      .send({ status: err.status, message: err.message })
  }
  return next()
})

app.use(routes)

app.listen(API_PORT, API_HOST, () =>
  console.log('API port %d in %s mode %s', API_PORT, API_HOST, nodeEnvUpper)
)

socket.listen(SOCKET_PORT, () => console.log(`Socket port ${SOCKET_PORT}`))
