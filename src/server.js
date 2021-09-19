import './database/index.js'
import cors from 'cors'
import express from 'express'
import routes from './routes/index.js'

const env = process.env.NODE_ENV || 'local'
const nodeEnvUpper = env.toUpperCase()

const app = express()

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

app.listen(
  process.env[`${nodeEnvUpper}_API_PORT`],
  process.env[`${nodeEnvUpper}_API_HOST`],
  () =>
    console.log(
      '... port %d in %s mode %s',
      process.env[`${nodeEnvUpper}_API_PORT`],
      process.env[`${nodeEnvUpper}_API_HOST`],
      nodeEnvUpper
    )
)
