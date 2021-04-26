import './database/index.js'
import express from 'express'
import routes from './routes/index.js'

const app = express()

app.use(express.json())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res
      .status(err.status)
      .send({ status: err.status, message: err.message })
  }
  return next()
})

app.use(routes)

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST)
