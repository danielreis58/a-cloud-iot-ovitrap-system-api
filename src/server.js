import './database/index.js'
import express from 'express'
import routes from './routes/index.js'

const app = express()

app.use(express.json())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400)
    return res.status(400).send({ status: 400, message: err.message })
  }
  return next()
})

app.use(routes)

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST)
