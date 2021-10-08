import schemaNew from './schema/new.js'
import schemaForgot from './schema/forgot.js'

import { errorResponse } from '../../../utils/response.js'

const inputValidate = (req, res, next) => {
  const input = { ...req.body, ...req.params, ...req.query }
  const options = {
    abortEarly: false
  }

  let schema = null
  switch (req.originalUrl) {
    case '/forgot-password':
      schema = schemaForgot
      break
    case '/new-password':
      schema = schemaNew
      break
    default:
      break
  }

  const { error } = schema.validate(input, options)

  if (error) {
    const message = error.details.map((detail) =>
      detail.message.replace(/(")|(")/g, '')
    )

    return errorResponse(res, { message, code: 400 })
  }

  return next()
}

export default inputValidate
