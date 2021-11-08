import express from 'express'
import dashboardController from '../controllers/dashboard.js'
import authenticateToken from '../middleware/auth/index.js'
import inputValidate from '../middleware/inputValidate/dashboard/index.js'

const routes = express.Router()

routes.get(
  '/dashboard/:offset',
  [authenticateToken, inputValidate],
  dashboardController.index
)

export default routes
