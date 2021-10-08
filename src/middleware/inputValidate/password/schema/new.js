import Joi from 'joi'

const validate = Joi.object({
  password: Joi.string().required()
})

export default validate
