import pg from 'pg'
import dbConfig from '../config/indexES6.js'

const env = process.env.NODE_ENV || 'local'

const { Client } = pg

const { host, username: user, password, database, port } = dbConfig[env]

export const pgConnect = async () => {
  const config = {
    host,
    user,
    password,
    database,
    port
  }
  const client = new Client(config)
  await client.connect()

  return client
}
export const pgDisconnect = async (conn) => {
  conn.end()
}
