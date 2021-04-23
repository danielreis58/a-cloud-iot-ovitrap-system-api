import express from 'express'
import ovitrapController from '../controllers/ovitrap.js'
import authenticateToken from '../middleware/auth/index.js'
import inputValidate from '../middleware/inputValidate/ovitrap/index.js'

const routes = express.Router()

routes.get(
  '/ovitrap',
  [authenticateToken, inputValidate],
  ovitrapController.index
)
routes.get(
  '/ovitrap/:id',
  [authenticateToken, inputValidate],
  ovitrapController.show
)
routes.post(
  '/ovitrap',
  [authenticateToken, inputValidate],
  ovitrapController.create
)
routes.patch(
  '/ovitrap',
  [authenticateToken, inputValidate],
  ovitrapController.update
)
routes.delete(
  '/ovitrap',
  [authenticateToken, inputValidate],
  ovitrapController.delete
)

export default routes
