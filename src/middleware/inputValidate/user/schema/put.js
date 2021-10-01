import Joi from 'joi'

const validate = Joi.object({
  id: Joi.string().uuid().required(),

  name: Joi.string().min(3),
  email: Joi.string().email(),
  nickname: Joi.string(),
  profile_id: Joi.string().uuid()
})

export default validate
