import express from 'express'
import authController from '../controllers/auth.js'
import inputValidate from '../middleware/inputValidate/auth/index.js'

const routes = express.Router()

routes.post('/login', inputValidate, authController.login)
routes.post('/logout', authController.logout)

export default routes
