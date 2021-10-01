import Joi from 'joi'

const validate = Joi.object({
  id: Joi.string().uuid().required(),

  name: Joi.string().min(4),
  profile_id: Joi.string().uuid()
})

export default validate
