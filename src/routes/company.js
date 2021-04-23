import express from 'express'
import companyController from '../controllers/company.js'
import authenticateToken from '../middleware/auth/index.js'
import inputValidate from '../middleware/inputValidate/company/index.js'

const routes = express.Router()

routes.get(
  '/company',
  [authenticateToken, inputValidate],
  companyController.index
)
routes.get(
  '/company/:id',
  [authenticateToken, inputValidate],
  companyController.show
)
routes.post(
  '/company',
  [authenticateToken, inputValidate],
  companyController.create
)
routes.patch(
  '/company/:id',
  [authenticateToken, inputValidate],
  companyController.update
)
routes.delete(
  '/company/:id',
  [authenticateToken, inputValidate],
  companyController.delete
)

export default routes
