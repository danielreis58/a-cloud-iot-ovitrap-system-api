import './database/index.js'
import express from 'express'
import routes from './routes/index.js'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST)
