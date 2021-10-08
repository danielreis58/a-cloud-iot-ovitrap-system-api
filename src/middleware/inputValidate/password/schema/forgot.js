import Joi from 'joi'

const validate = Joi.object({
  email: Joi.string().email().required()
})

export default validate
