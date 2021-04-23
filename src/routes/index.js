import express from 'express'

import authRoute from './auth.js'
import companyRoute from './company.js'
import ovitrapRoute from './ovitrap.js'
import userRoute from './user.js'

const routes = express.Router()

routes.use(authRoute)
routes.use(companyRoute)
routes.use(ovitrapRoute)
routes.use(userRoute)

export default routes
