import express from 'express'
import userController from '../controllers/user.js'
import authenticateToken from '../middleware/auth/index.js'
import inputValidate from '../middleware/inputValidate/user/index.js'

const routes = express.Router()

routes.get('/user', [authenticateToken, inputValidate], userController.index)
routes.get('/user/:id', [authenticateToken, inputValidate], userController.show)
routes.post('/user', [authenticateToken, inputValidate], userController.create)
routes.patch(
  '/user:id',
  [authenticateToken, inputValidate],
  userController.update
)
routes.delete(
  '/user/:id',
  [authenticateToken, inputValidate],
  userController.delete
)

export default routes
