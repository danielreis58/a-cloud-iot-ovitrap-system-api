import pg from 'pg'
import dbConfig from '../config/indexES6.js'

const { Client } = pg

export const pgConnect = async () => {
  const config = {
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port
  }
  const client = new Client(config)
  await client.connect()

  return client
}
export const pgDisconnect = async (conn) => {
  conn.end()
}
