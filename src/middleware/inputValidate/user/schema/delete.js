import Joi from 'joi'

const validate = Joi.object({
  id: Joi.number().integer().required()
})

export default validate
