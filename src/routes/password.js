import express from 'express'
import passwordController from '../controllers/password.js'
import authenticateToken from '../middleware/auth/index.js'
import inputValidate from '../middleware/inputValidate/password/index.js'

const routes = express.Router()

routes.post('/forgot-password', inputValidate, passwordController.forgot)
routes.post(
  '/new-password',
  [authenticateToken, inputValidate],
  passwordController.new
)

export default routes
