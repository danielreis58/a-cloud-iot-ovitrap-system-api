import schemaGet from './schema/get.js'
import schemaShow from './schema/show.js'
import schemaPost from './schema/post.js'
import schemaPatch from './schema/put.js'
import schemaDel from './schema/delete.js'

import { errorResponse } from '../../../utils/response.js'

const inputValidate = (req, res, next) => {
  const input = { ...req.body, ...req.params, ...req.query }
  const options = {
    abortEarly: false
  }

  let schema = null
  switch (req.method.toLowerCase()) {
    case 'get':
      schema = req.params.id ? schemaShow : schemaGet
      break

    case 'post':
      schema = schemaPost
      break

    case 'patch':
      schema = schemaPatch
      break

    default:
      schema = schemaDel
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
