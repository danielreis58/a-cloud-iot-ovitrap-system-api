const { DB_USER, DB_PASS, DB_NAME, DB_HOST, DB_PORT } = process.env

export default {
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true
  }
}
