import Joi from 'joi'

const validate = Joi.object({
  id: Joi.number().integer().required(),

  name: Joi.string().min(4),
  profile_id: Joi.number().integer()
})

export default validate
