import { Server } from 'socket.io'
import { createServer } from 'http'
import { getFromToken } from './utils/auth.js'

const env = process.env.NODE_ENV || 'local'
const nodeEnvUpper = env.toUpperCase()

const SOCKET_PORT = process.env[`${nodeEnvUpper}_SOCKET_PORT`]
const URL = process.env[`${nodeEnvUpper}_FRONT_URL`]

const socket = createServer()
const io = new Server(socket, {
  cors: {
    origin: URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['authorization'],
    credentials: true
  }
})

io.on('connection', async (client) => {
  const { authorization } = client?.handshake?.headers || {}
  const { company } = await getFromToken(authorization, ['company'])

  console.log('===> %s Client connected ===> %s', company, client.id)
  client.join(company)

  client.on('disconnect', () => {
    console.log('===> %s Client disconnected ===> %s', company, client.id)
    client.leave(company)
  })
})

socket.listen(SOCKET_PORT, () => console.log(`Socket port ${SOCKET_PORT}`))

export default io
