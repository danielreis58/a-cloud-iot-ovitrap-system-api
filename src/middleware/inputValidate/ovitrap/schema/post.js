import Joi from 'joi'

const validate = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(4).required(),
  user_id: Joi.string().uuid().required(),
  company_id: Joi.string().uuid()
})

export default validate
