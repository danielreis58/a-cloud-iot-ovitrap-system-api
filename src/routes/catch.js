import express from 'express'
import ovitrapController from '../controllers/catch.js'
import inputValidate from '../middleware/inputValidate/catch/index.js'

const routes = express.Router()

routes.post('/catch/:id', [inputValidate], ovitrapController.create)

export default routes
