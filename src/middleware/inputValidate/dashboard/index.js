import schemaGet from './schema/get.js'

import { errorResponse } from '../../../utils/response.js'

const inputValidate = (req, res, next) => {
  const input = { ...req.body, ...req.params, ...req.query }
  const options = {
    abortEarly: false
  }

  let schema = null
  switch (req.method.toLowerCase()) {
    case 'get':
      schema = schemaGet
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
