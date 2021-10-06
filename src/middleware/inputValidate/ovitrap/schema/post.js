import Joi from 'joi'

const validate = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(3).required(),
  user_id: Joi.string().uuid().required(),
  company_id: Joi.string().uuid(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
})

export default validate
