import schemaPost from './schema/post.js'

import { errorResponse } from '../../../utils/response.js'

const inputValidate = (req, res, next) => {
  const input = { ...req.body, ...req.params, ...req.query }
  const options = {
    abortEarly: false
  }

  const { error } = schemaPost.validate(input, options)

  if (error) {
    const message = error.details.map((detail) =>
      detail.message.replace(/(")|(")/g, '')
    )

    return errorResponse(res, { message, code: 400 })
  }

  return next()
}

export default inputValidate
