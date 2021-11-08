import { Server } from 'socket.io'
import { getFromToken } from './utils/auth.js'

const socketManager = (socket) => {
  const io = new Server(socket, { cors: { origin: '*' } })
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

  return io
}

export default socketManager
