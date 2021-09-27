require('dotenv').config()

const {
  LOCAL_DB_USER,
  LOCAL_DB_PASS,
  LOCAL_DB_NAME,
  LOCAL_DB_HOST,
  LOCAL_DB_PORT,
  PROD_DB_USER,
  PROD_DB_PASS,
  PROD_DB_NAME,
  PROD_DB_PORT
} = process.env

module.exports = Object.freeze({
  local: {
    username: LOCAL_DB_USER,
    password: LOCAL_DB_PASS,
    database: LOCAL_DB_NAME,
    host: LOCAL_DB_HOST,
    port: LOCAL_DB_PORT,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true
    }
  },
  prod: {
    username: PROD_DB_USER,
    password: PROD_DB_PASS,
    database: PROD_DB_NAME,
    host: 'localhost',
    port: PROD_DB_PORT,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true
    }
  }
})
