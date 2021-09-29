import express from 'express'

import authRoute from './auth.js'
import companyRoute from './company.js'
import dashboardRoute from './dashboard.js'
import ovitrapRoute from './ovitrap.js'
import userRoute from './user.js'
import catchRoute from './catch.js'

const routes = express.Router()

routes.use(authRoute)
routes.use(companyRoute)
routes.use(dashboardRoute)
routes.use(ovitrapRoute)
routes.use(userRoute)
routes.use(catchRoute)

export default routes
