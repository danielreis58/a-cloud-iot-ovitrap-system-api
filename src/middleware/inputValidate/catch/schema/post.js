import Joi from 'joi'

const validate = Joi.object({
  id: Joi.string().uuid().required(),
  number: Joi.number().integer().required()
})

export default validate
